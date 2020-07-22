const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const User = require('../models/index').user;
const auth = require('../middleware/auth')

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Request params: ",req.params);
  console.log("Request query data: ",req.query);
  console.log("Request body data: ",req.body,"\n");
  next();
});

// service to get all registers in page format
router.get('/getAll', async (req, res) => {
  console.log(chalk.greenBright("Executing Query"));
  
  const params = {page, size} = req.query;

	let options = {
    attributes : ["idUser", "username", "name", "lastname", "email"],
    offset: (+page - 1) * +size,
    limit: +size
  };
  
  try {
    const users = await User.findAndCountAll(options);

    if(!users){
      res.status(503).json({ message: 'Not found', error: "404"});
    }
    else{
      let strResp = JSON.stringify(users);
      let resp = JSON.parse(strResp);
      let lastPage = parseInt(Math.ceil(resp.count/+size));
      let response = {last_page:lastPage, data:resp.rows};

      res.status(200).json(response);
    }

  } catch (err) {
    console.log(err);
		res.status(503).json({ message: 'An error has occurred, try again.', error: err });
  }

});

// service to get one register
// it gets the register id and return the register
router.get('/', auth ,async (req, res) => {
	console.log(chalk.greenBright("Executing Query"));

	const userData = {idUser} = req.query;

	let options = {
		where : userData
  };
  
  console.log(options);
  try {
    const user = await User.findOne(options);

    if(!user){
      res.status(503).json({ message: 'Not found', error: "404"});
    }
    else{
      res.status(200).json(user);
    }

  } catch (err) {
    console.log(err);
		res.status(503).json({ message: 'An error has occurred, try again.', error: err });
  }

});

// service to get one register
// it gets the register id and return the register
router.get('/getMyData', auth ,async (req, res) => {
	console.log(chalk.greenBright("Executing getMydata"));

  try {
    const userPublicdata = req.user.getPublicData();
    console.log(userPublicdata);
    res.status(200).json(userPublicdata);
  } catch (err) {
    console.log(err);
		res.status(503).json({ message: 'An error has occurred, try again.', error: err });
  }

});

// Service to create a register
// It gets all the fields and return the object crated in DB
router.post('/', (req, res) => {
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

// Service to update data from an existing register
// It gets data to get changed and return if it was succeful or not
router.put("/", auth, (req, res) => {
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

// Service to delete a register (hard delete)
// it gets the id of the register and return succesful or not
router.delete("/", auth, (req, res) => {
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