const jwt = require('jsonwebtoken');
const secretKey = require("config").get("EXAMINATION_SECRET_KEY");

function verify(req, res, next) {
    const examination_token = req.headers['examination-token'];

    if(examination_token) {
        jwt.verify(examination_token, secretKey, (err, decoded) => {
            if(err) {
                return res.json({
                    success: false,
                    status: 202,
                    reason: "Examination_token is invalid"
                });
            }
            else {
                req.tokenData = decoded;
                next();
            }
        })
    }
    else {
        return res.status(403).json({
            success: false,
            reason: "Examination token is invalid",
        })
    }
}

module.exports = {
    verify
};
