const dbPool = require("../db");

async function getRoomByName(name) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM rooms
                                            WHERE name = "${name}"`);
    return [rows];
}

async function createRoom(name, slot) {
    await dbPool.query(`INSERT INTO rooms(name, slot)
                            VALUES ("${name}", ${slot})`);
}

async function getRoomById(id) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM rooms
                                            WHERE id = ${id}`);
    return [rows];
}

async function updateRoom(id, name, slot) {
    await dbPool.query(`UPDATE rooms
                        SET name = "${name}",
                            slot = ${slot}
                        WHERE id = ${id}`);
}

async function getAllRoom(offset, limit){
    const [rows] = await dbPool.query(`SELECT *
                                       FROM rooms
                                       LIMIT ${limit}
                                       OFFSET ${offset}`);
    return [rows];
}

async function deleteRoomById(id) {
    await dbPool.query(`DELETE FROM rooms
                            WHERE id = ${id}`)
}

module.exports = {
    getRoomByName,
    createRoom,
    getRoomById,
    updateRoom,
    getAllRoom,
    deleteRoomById
};
