const responseUtil = require('../utils/response.util');
const account = require('../models/accounts.models');

async function verify(req, res, next) {
    try {
        const {affectedUserRole} = req;
        const {id} = req.tokenData;
        if (!affectedUserRole) throw new Error('Please enter user whom affected of this action');
        const [user] = await account.getUserById(id);
        const user_role = user[0].role_id;
        if (user_role === 1
            && (affectedUserRole === 1 || affectedUserRole === 3))  // = 1 is admin, 3 is super admin
            throw new Error("You haven't privilege to use this action");
        next();
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    verify
};
