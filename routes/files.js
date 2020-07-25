const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const auth = require("../middleware/auth");
const multer = require('multer');
const sharp = require('sharp');
const avatars = multer({
  // dest:'images',
  limits: {
    fileSize: "1000000"
  },
  fileFilter(req, file, cb){
    if (!file.originalname.match(/\.(jpg|png|jpeg|webp)$/)) {
      return cb(new Error("File extension not valid"));
    }

    cb(undefined, true)
  }
});

const upload = multer({
  dest:'images',
  limits: {
    fileSize: "10000000"
  },
  fileFilter(req, file, cb){
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error("File extension not valid"));
    }

    cb(undefined, true)
  }
});

router.post("/upload", auth ,upload.single('upload'), (req, res) => {
  console.log(chalk.whiteBright.inverse.bold("Uploading a file"));
  // When toy remove dest:'images' from config we can get the image on data to save in database.
  // req.file.buffer // console.log(req.file.buffer);
  res.send();
},
(error, req, res, next) => {
  res.status(400).send({error: error.message});
});

router.post("/avatar", auth ,avatars.single('avatar'), async (req, res) => {
  console.log(chalk.redBright.inverse.bold("Uploading an avatar:", req.file.originalname));

  // resizing image before to save in the db
  req.user.avatar = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();

  await req.user.save();

  res.send();
},
(error, req, res, next) => {
  res.status(400).send({error: error.message});
});

router.delete("/avatar", auth , async (req, res) => {
  console.log(chalk.cyan.inverse.bold("Delete avatar"));
  req.user.avatar = null;
  await req.user.save();
  res.send();
},
(error, req, res, next) => {
  res.status(400).send({error: error.message});
});

module.exports = router;