const dbPool = require("../db");
const config = require("config");

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
    return [rows];
}

async function getAllAdmin() {
    const [rows] = await dbPool.query(`SELECT username, fullname, date_of_birth, course_class, email, role_id
                                        FROM accounts
                                        WHERE role_id = 1 OR role_id = 3`);
    return [rows];
}

async function getAllAccounts() {
    const [rows] = await dbPool.query(`SELECT username, fullname, date_of_birth, course_class, email, role_id
                                        FROM accounts`);
    return [rows];
}

async function updateInformation(id, fullname, date_of_birth, email) {
    await dbPool.query(`UPDATE accounts
                            SET fullname = "${fullname}",
                                date_of_birth = ${date_of_birth},
                                email = "${email}"
                            WHERE id = ${id}`);
}

async function deleteUserById(id) {
    await dbPool.query(`DELETE FROM accounts
                            WHERE id = ${id}`);
}

async function changeRole(id) {
    await dbPool.query(`UPDATE accounts
                            SET role_id = 1
                            WHERE id = ${id}`);
}

async function getRole(username) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM accounts
                                            WHERE username = "${username}"`);
    return [rows];
}

async function getUserByKeyword(keywords, role_id){
    const [rows] = await dbPool.query(`SELECT id, username, fullname, course_class, date_of_birth, email
                                       FROM accounts
                                       WHERE (MATCH(fullname) AGAINST("+${keywords}*" IN boolean MODE)
                                       OR MATCH(username) AGAINST("+${keywords}*" IN boolean MODE)
                                       OR MATCH(course_class) AGAINST("+${keywords}*" IN boolean MODE)
                                       OR MATCH(email) AGAINST("+${keywords}*" IN boolean MODE))
                                       AND role_id = ${role_id}`);
    return [rows];
}

async function getNotEligibilityStudent() {
    // const [rows] = await dbPool.query(`SELECT accounts.id, accounts.username, accounts.fullname, accounts.course_class,
    //                                                classes_students.class_code_id,
    //                                         FROM accounts
    //                                         INNER JOIN classes_students ON accounts.id = classes_students.account_id
    //                                         INNER JOIN classes
    //                                         WHERE `)
}

module.exports = {
    getUserById,
    getUserByUsername,
    getUserByEmail,
    createUser,
    updatePassword,
    getAllStudent,
    getAllAdmin,
    getAllAccounts,
    updateInformation,
    deleteUserById,
    changeRole,
    getRole,
    getUserByKeyword
};


