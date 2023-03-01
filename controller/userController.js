const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName,
      email,
      password: hashed,
    });
    return res.status(201).json({ message: "user created", data: user });
  } catch (error) {
    console.log(error);
  }
};
const getUsers = async (req, res) => {
  try {
    const user = await userModel.find();
    return res.status(200).json({ message: "all users", data: user });
  } catch (error) {
    console.log(error);
  }
};
const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    return res.status(200).json({ message: "single user", data: user });
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async (req, res) => {
  try {
    const { userName, email } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { userName, email },
      { new: true }
    );
    return res.status(200).json({ message: `updated`, data: user });
  } catch (error) {
    console.log(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: `Delete` });
  } catch (error) {
    console.log(error);
  }
};

const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });

    if (findUser) {
      const checkPassword = await bcrypt.compare(password, findUser.password);

      if (checkPassword) {
        const { ...info } = findUser._doc;

        return res
          .status(200)
          .json({ message: `welcome back ${findUser.userName}`, data: info });
      } else {
        return res.status(404).json({ message: `password isn't correct` });
      }
    } else {
      return res.status(404).json({ message: `user doesn't exist` });
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signinUser,
};
