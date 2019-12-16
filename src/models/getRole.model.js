const dbPool = require('../db');
const config = require('config');


async function getAdminRole(account_id) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM accounts
                                            WHERE id="${account_id}" and role_id=1;`);
    return [rows];
}
async function getUserRole(account_id) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM accounts
                                            WHERE id="${account_id}" and role_id=2;`);
    return [rows];
}
async function getSuperAdminRole(account_id) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM accounts
                                            WHERE id="${account_id}" and role_id=3;`);
    return [rows];
}
module.exports = {
    getAdminRole,
    getUserRole,
    getSuperAdminRole
};


