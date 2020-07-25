"use strict";
const jwt = require('jsonwebtoken');
const serverConfig = require('../config/serverConfig.json');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      token: DataTypes.STRING,
      avatar: {
        type: DataTypes.BLOB,
        allowNull: true,
        get() {
          let avatar = this.getDataValue('avatar');
          if(avatar){
            return avatar.toString('base64');
          }
          else{
            return null;
          }
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
        isDate: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW,
        validate: {
          isDate: true,
        },
      },
    },
    {}
  );
  user.associate = function (models) {
    // associations can be defined here
  };

  user.prototype.generateToken = async function() {
    const user = this;
    const token = jwt.sign({ idUser: user.idUser.toString() }, serverConfig.secretKey,  { expiresIn: 60 * 60 });

    user.token = token;
    await user.save();

    return token
  }

  user.prototype.getPublicData = function() {
    const user = this;
    let userObject = user.toJSON();
    delete userObject.password;
    delete userObject.token;

    return userObject
  }

  return user;
};
