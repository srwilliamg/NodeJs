const express = require("express");
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/get', function (req, res) {
  res.send('Hello world in a get');
});

router.post('/post', function (req, res) {
  res.send('Hello world in a post');
});

module.exports = router;