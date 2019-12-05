const dbPool = require('../db');
const config = require("config");

exports.createRoom = async (room = {}) => {
    const {name} = room;
    const query = `INSERT INTO rooms(name, slot) VALUES ("${name}", 35)`;
    const [temp_id] = await dbPool.query(query);
    return temp_id;
};

exports.getAllRoom = async (params = {}) => {
    const query = `SELECT * FROM rooms`;
    const [temp_id] = await dbPool.query(query);
    return temp_id;
};
