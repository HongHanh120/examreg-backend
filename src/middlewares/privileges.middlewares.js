const responseUtil = require('../utils/response.util');
const account = require('../models/accounts.models');
const rolePrivilege = require('../models/roles_privileges.models');

function verify(privilege) {
    return async (req, res, next) => {
        try {
            const id = req.tokenData;
            const [user] = await account.getUserById(id);
            if (!user.length)
                throw new Error('User isn\'t existed');
            const user_role = user[0].role_id;
            const [rolePrivileges] = await rolePrivilege.getRolePrivilege(user_role, privilege);
            if (!rolePrivileges.length)
                throw new Error('You haven\'t been granted privilege for this action');
            next();
        } catch (err) {
            res.json(responseUtil.fail({reason: err.message}));
        }
    };
}

module.exports = {
    verify
};
