const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const User = require('../models/index').user;

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log("Request params: ",req.params);
  console.log("Request query data: ",req.query);
  console.log("Request body data: ",req.body,"\n");
  next();
});

router.get('/getAll', function (req, res) {
  console.log(chalk.greenBright("Executing Query"));
  
  const params = {page, size} = req.query;

	let options = {
    attributes : ["idUser", "username", "name", "lastname", "email"],
    offset: (+page - 1) * +size,
    limit: +size
	};

	User.findAndCountAll(options)
	.then(obj => {
		if(!obj){
			res.status(503).json({ message: 'Not found', error: "404"});
		}
		else{
      let strResp = JSON.stringify(obj);
      let resp = JSON.parse(strResp);
      let lastPage = parseInt(Math.ceil(resp.count/+size));
      let response = {last_page:lastPage, data:resp.rows};

      res.status(200).json(response);
		}
	})
	.catch(err => {
		console.log(err);
		res.status(503).json({ message: 'An error has occurred, try again.', error: err });
	});
});

router.get('/', function (req, res) {
	console.log(chalk.greenBright("Executing Query"));

	const userData = {idUser} = req.query;

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

router.post('/', function (req, res) {
	console.log(chalk.greenBright("Executing Create"));

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


router.put("/", function (req, res) {
  console.log(chalk.blueBright("Executing Update"));

  const userData = ({
    username,
    name,
    lastname,
    email,
    password,
    token,
    idUser,
  } = req.body);

  let response = {
    message: "Something was wrong",
    error: "0",
  };

  const options = { where: { idUser: idUser } };

  // console.log(userData, options);

  User.update({ username, name, lastname, email, password }, options)
    .then((obj) => {
      if (obj[0] === 0) {
        response.message = "id not found";
        response.error = "404";
        res.status(503).json(response);
      } else {
        response.message = "Update successful";
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      response.error = err;
      res.status(503).json(response);
    });
});

router.delete("/", function (req, res) {
  console.log(chalk.redBright("Executing delete"));

  const userData = ({ idUser } = req.body);

  let response = {
    message: "Something was wrong",
  };

  const options = { where: { idUser: idUser } };

  // console.log(userData, options);

  User.destroy(options)
    .then((obj) => {
      console.log(obj);
      if (obj === 0) {
        response.message = "id not found";
        response.error = "404";
        res.status(503).json(response);
      } else {
        response.message = "Deleted successful";
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      response.error = err;
      res.status(503).json(response);
    });
});

module.exports = router;