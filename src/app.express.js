const express = require('express');
const bodyParser = require('body-parser');

const appExpress = express();

appExpress.use(bodyParser.json());
appExpress.use(bodyParser.urlencoded({extended: false}));

appExpress.use('api/v1', (req, res) => {
    res.send('examreg-backend');
});

module.exports = appExpress;