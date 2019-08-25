const RouterHelper = require("../app/helpers/RouterHelper");
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secretkey';

module.exports = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        jwt.verify(bearer[1], TOKEN_SECRET, (err, authData) => {
            if (err)
                RouterHelper.sendResponse(res, 401, 'Unauthorized');
            else {
                req.locals = authData;
                next();
            }
        });
    } else
        RouterHelper.sendResponse(res, 499, 'Token required');
};