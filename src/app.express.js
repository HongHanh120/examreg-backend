const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("config");
const cors = require("cors");

const accountsRoute = require("./routes/accounts.routes");
const studentsRoute = require("./routes/students.routes");
const subjectsRoute = require("./routes/subjects.routes");
const examinationsRoute = require("./routes/examinations.routes");
const classesRoute = require("./routes/classes.routes");
const roomsRoute = require("./routes/rooms.routes");
const shiftsRoute = require("./routes/shifts.routes");
const classesStudentsRoute = require("./routes/classes_students.routes");
const shiftsRoomsRoute = require("./routes/shifts_rooms.routes");
const shiftsRoomsStudentsRoute = require("./routes/shifts_rooms_students.routes");

const appExpress = express();

appExpress.use(cors());
appExpress.use(bodyParser.json());
appExpress.use(bodyParser.urlencoded({extended: false}));
appExpress.use(morgan("combined"));

appExpress.use("/api/v1/accounts/", accountsRoute);
appExpress.use("/api/v1/students/", studentsRoute);
appExpress.use("/api/v1/subjects/", subjectsRoute);
appExpress.use("/api/v1/examinations/", examinationsRoute);
appExpress.use("/api/v1/classes/", classesRoute);
appExpress.use("/api/v1/rooms/", roomsRoute);
appExpress.use("/api/v1/shifts/", shiftsRoute);
appExpress.use("/api/v1/classesStudents/", classesStudentsRoute);
appExpress.use("/api/v1/shiftsRooms", shiftsRoomsRoute);
appExpress.use("/api/v1/shiftsRoomsStudents", shiftsRoomsStudentsRoute);

appExpress.use("api/v1", (req, res) => {
    res.send("examreg-backend");
});

module.exports = appExpress;
