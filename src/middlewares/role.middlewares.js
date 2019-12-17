const db = require("../db");
const responseUtil = require("../utils/response.util");
const jwt = require('jsonwebtoken');
const secretKey = require('config').get('SECRET_KEY');
const accountmodel = require("../models/accounts.models")

async function verify_isNotAdmin(req, res, next) {
    try {
        const {username} = req.tokenData
        if (!username) throw new Error("username missing affter verify token");
        const [user_row] = await accountmodel.getUserByUsername(username);
        const user_role = user_row[0].role_id
        if (user_role === 2)  //=2 is not admin
        {
            throw new Error("you are student you haven't privilege to use this function");
        }
        next();

    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}))
    }
}


module.exports = {
    verify_isNotAdmin
};