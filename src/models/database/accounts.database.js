const dbPool = require('../../db');
const config = require('config');

async function getUserByUsername(username) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM accounts
                                         WHERE username = "${username}"`);
    return [rows];
}

async function getUserByEmail(email) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM accounts
                                         WHERE email = "${email}"`);
    return [rows];
}

async function createUser(username, hashPassword, date_of_birth, fullname, email) {
    await dbPool.query(`INSERT INTO accounts(username, password, date_of_birth, fullname, email, role_id)
                            VALUES("${username}", "${hashPassword}", "${date_of_birth}", "${fullname}", "${email}", 1)`);
}

module.exports = {
    getUserByUsername,
    getUserByEmail,
    createUser
};


