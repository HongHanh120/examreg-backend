const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const config = require("config");

const accountsRoute = require("./routes/accounts.routes");
const subjectRoute = require("./routes/subject.routes");

const appExpress = express();

appExpress.use(bodyParser.json());
appExpress.use(bodyParser.urlencoded({extended: false}));
appExpress.use(morgan('combined'));

appExpress.use("/api/v1/accounts/", accountsRoute);

appExpress.use("/api/v1/subjects/", subjectRoute);

appExpress.use('api/v1', (req, res) => {
    res.send('examreg-backend');
});

module.exports = appExpress;
