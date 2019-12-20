const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("config");

const accountsRoute = require("./routes/accounts.routes");
const studentsRoute = require("./routes/students.routes");
// const subjectsRoute = require("./routes/subjects.routes");
const examinationsRoute = require("./routes/examinations.routes");
const classesRoute = require("./routes/classes.routes");

const appExpress = express();

appExpress.use(bodyParser.json());
appExpress.use(bodyParser.urlencoded({extended: false}));
appExpress.use(morgan("combined"));

appExpress.use("/api/v1/accounts/", accountsRoute);
appExpress.use("/api/v1/students/", studentsRoute);
// appExpress.use("/api/v1/subjects/", subjectsRoute);
appExpress.use("/api/v1/examinations/", examinationsRoute);
appExpress.use("/api/v1/classes/", classesRoute);

appExpress.use("api/v1", (req, res) => {
    res.send("examreg-backend");
});

module.exports = appExpress;
