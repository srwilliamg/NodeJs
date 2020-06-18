const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const auth = require("../middleware/auth");
const User = require("../models/index").user;

router.post("/logIn", (req, res) => {
  console.log(chalk.whiteBright.bold("Logging in"));

  const userData = ({ email, password } = req.body);

  User.findOne(userData)
    .then((obj) => {
      console.log(obj);
      obj.generateToken();
      console.log(obj);
      res.status(200).json(obj);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(503)
        .json({ message: "An error has occurred, try again.", error: err });
    });
});

router.post("/logout", auth, (req, res) => {
  console.log(chalk.white.bold("Logging out"));

  const user = req.user;
  user.token = "";
  user.save();

  res.status(200).json({ message: "OK", error: "0" });
});

module.exports = router;