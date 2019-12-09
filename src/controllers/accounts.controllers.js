const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const responseUtil = require('../utils/response.util');

const account = require('../models/accounts.models');

async function login(req, res) {
    const {
        username,
        password
    } = req.body;
    try {
        let [user] = await account.getUserByUsername(username);
        if (!user.length)
            throw new Error('User name or password is incorrect');
        console.log(user);
        user = user[0];
        console.log(password);
        const hashPassword = user.password;
        console.log(hashPassword);
        const checkPass = bcrypt.compareSync(password, hashPassword);
        console.log(checkPass);

        if (!checkPass)
            throw new Error('User name or password is incorrect');

        const twentyFourHours = 24 * 60 * 60 * 100;

        const token = jwt.sign({
                id: user.id,
                username: user.username
            },
            config.get('SECRET_KEY'), {
                expiresIn: twentyFourHours
            }
        );

        res.json(responseUtil.success({data: {token}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
};

async function register(req, res) {
    const {
        username,
        password,
        re_password,
        date_of_birth,
        fullname,
        email
    } = req.body;

    try {
        if (username.length < 8)
            throw new Error('Username must greater than 8 characters');
        if (password.length < 8)
            throw new Error('Password mush greater than 8 characters');
        if (password !== re_password)
            throw new Error('Your password and confirmation passwork do not match');
        if (!date_of_birth)
            throw new Error('Date of birth field is missing');
        if (!fullname)
            throw new Error('Fullname field is missing');
        if (!email)
            throw new Error('Email field is missing');

        const [existedUser] = await account.getUserByUsername(username);
        // console.log(existedUser.length);
        const [existedEmail] = await account.getUserByEmail(email);
        // console.log(existedEmail.length);
        if (existedUser.length)
            throw new Error("Username is existed");
        if(existedEmail.length)
            throw new Error("Email is existed");

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);

        await account.createUser(username, hashPassword, date_of_birth, fullname, email);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    login,
    register
};
