const RouterHelper = require("../app/helpers/RouterHelper");
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secretkey';

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        try {
            req.locals = jwt.verify(bearer[1], TOKEN_SECRET);
            next();
        } catch {
            RouterHelper.sendResponse(res, 401, 'Unauthorized');
        }
    } else
        RouterHelper.sendResponse(res, 499, 'Token required');
};

const signToken = (user) => {
    return {
        token: jwt.sign({user}, TOKEN_SECRET)
    }
};

module.exports = {verifyToken, signToken};