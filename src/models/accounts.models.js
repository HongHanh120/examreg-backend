const dbPool = require('../db');
const config = require('config');

async function getUserById(id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM accounts
                                         WHERE id = "${id}"`);
    return [rows];
}

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

async function createUser(username, hashPassword, fullname, date_of_birth, course_class, email) {
    await dbPool.query(`INSERT INTO accounts(username, password, fullname, date_of_birth, course_class, email, role_id)
                            VALUES("${username}", "${hashPassword}", "${fullname}", ${date_of_birth}, "${course_class}", "${email}", 2)`);
}

async function updatePassword(id, new_password) {
    await dbPool.query(`UPDATE accounts
                            SET password = "${new_password}"
                            WHERE id = ${id}`);
}

async function getAllStudent() {
    const [rows] = await dbPool.query(`SELECT username, fullname, date_of_birth, course_class, email
                                        FROM accounts
                                        WHERE role_id = 2`);
    return [rows]
}

module.exports = {
    getUserById,
    getUserByUsername,
    getUserByEmail,
    createUser,
    updatePassword,
    getAllStudent
};


