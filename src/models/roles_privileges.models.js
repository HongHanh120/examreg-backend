const dbPool = require('../db');
const config = require('config');

async function getRolePrivilege(role_id, privilege_id) {
    await dbPool.query(`SELECT *
                            FROM roles_privileges
                            WHERE role_id = ${role_id} AND privilege = ${privilege_id}`);
}

module.exports = {
    getRolePrivilege
};
