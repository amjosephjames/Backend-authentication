const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  signinUser,
} = require("../controller/userController");

router.route("/signin").post(signinUser);
router.route("/create").post(createUser);
router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/:id/update").patch(updateUser);
router.route("/:id/delete").delete(deleteUser);

module.exports = router;
