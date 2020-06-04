const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const User = require('../models/index').user;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/query', function (req, res) {
	const userData = {idUser} = req.body;

	let options = {
		where : userData
	};

	console.log(options);

	User.findOne(options)
	.then(obj => {
		if(!obj){
			res.status(503).json({ message: 'Not found', error: "404"});
		}
		else{
			res.status(200).json(obj);
		}
	})
	.catch(err => {
		console.log(err);
		res.status(503).json({ message: 'An error has occurred, try again.', error: err });
	});
});

router.post('/insert', function (req, res) {

	const userData = {
		username,
		name,
		lastname,
		email,
		password,
		token
	} = req.body;

	User.create(userData)
	.then(obj => {
		console.log(obj);
		res.status(200).json(obj);
	})
	.catch(err => {
		console.log(err);
		res.status(503).json({ message: 'An error has occurred, try again.', error: err });
	});

});

module.exports = router;