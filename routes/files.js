const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const auth = require("../middleware/auth");
const multer = require('multer');
const upload = multer({
  dest:'images',
  limits: {
    fileSize: "100000000"
  },
  fileFilter(req, file, cb){
    if (!file.originalname.match(/\.(jpg|png)$/)) {
      return cb(new Error("File extension not valid"));
    }

    cb(undefined, true)
  }
});


router.post("/upload", auth ,upload.single('upload'), (req, res) => {
  console.log(chalk.whiteBright.inverse.bold("Uploading"));
  res.send();
},
(error, req, res, next) => {
  res.status(400).send({error: error.message});
});

module.exports = router;