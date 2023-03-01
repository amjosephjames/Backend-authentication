const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// const port = 2008;
// const db = require("./utils/db");
// db;
const connectDB = require("./utils/db");
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

app.use("/api/user", require("./router/userRouter"));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "welcome to my auth api" });
});

const PORT = process.env.PORT;

const start = async () => {
  const lifeURI =
    "mongodb+srv://joseph4231:Barca4231@cluster0.zrkxc.mongodb.net/authdb?retryWrites=true&w=majority";
  try {
    await connectDB(lifeURI);
    console.log("connected");
    app.listen(PORT, () => console.log(`Server is listening on Port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
