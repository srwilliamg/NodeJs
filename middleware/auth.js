const jwt = require('jsonwebtoken');
const serverConfig = require('../config/serverConfig').user;
const User = require('../models/index').user;

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, serverConfig.secretKey);
        
        const user = await User.findOne({'where':{ idUser: decoded.idUser, 'token': token }});

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({
            message: 'Please authenticate.',
            error:"401" 
        });
    }
}

module.exports = auth;