const app = require("./app.express");
const server = require("http").createServer(app);
const config = require("config");
const jwt = require("jsonwebtoken");
const dbPool = require("./db");

const port = config.get("PORT");

server.listen(port, () => {
    console.log("Server is running on port: ", port);
});

module.exports = server;