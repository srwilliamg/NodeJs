const express = require("express");
const router = express.Router();
const chalk = require("chalk");
const nodemailer = require("nodemailer");
const auth = require("../middleware/auth");
// create you own account.json with your credentials
const account = require("../config/account.json");

router.post("/send", auth, async (req, res) => {
  console.log(chalk.magenta.inverse.bold("Sending mail"));

    console.log(account);
    let transporter = nodemailer.createTransport(account);

    let message = {
      from: account.auth.user,
      to: req.user.email,
      subject: `For ${req.user.name} ${req.user.lastname}`,
      text: `Hello`,
      html: `
      <div style="text-align: center;margin: 1em"><img src="cid:avatar" width="150" height="150" /></div>
      <div style="margin: 0em 0em 8em 4em;">
      <p>Hello ${req.user.name} this is your data:</p>
      <ul>
      <li><strong>Username</strong>: ${req.user.username}</li>
      <li><strong>Password</strong>: ${req.user.password}</li>
      <li><strong>Email</strong>: ${req.user.email}</li>
      </ul>
      </div>
      `,
      attachments: [
        { 
          filename: 'avatar.png',
          content: req.user.avatar,
          encoding: 'base64',
          cid: 'avatar'
        }
      ]
    };

    transporter.sendMail(message, (error, info) => {
      if (error) {
        console.log('Error occurred');
        console.log(error.message);
      }
      else{
        console.log(info);
        console.log('Message sent successfully!');
      }
      transporter.close();
    });
    
    res.send();
});

module.exports = router;