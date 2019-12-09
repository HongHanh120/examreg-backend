const dbPool = require('../db');
const config = require("config");

exports.createRoom = async (room = {}) => {
    const {name} = room;
    const query = `INSERT INTO rooms(name, slot) VALUES ("${name}", 35)`;
    const [temp_id] = await dbPool.query(query);
    return temp_id;
};

exports.getAllRoom = async (params = {name}) => {
    console.log(params);
    const name = params;
    console.log(name);
    const query = `SELECT * FROM rooms WHERE name = "${name}"`;
    const [temp_id] = await dbPool.query(query);
    return temp_id;
};
