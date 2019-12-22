const dbPool = require("../db");

async function getShiftByName(name, time) {
    const [rows] = await dbPool.query(`SELECT * 
                                       FROM shifts
                                       WHERE name = "${name}" AND time = ${time}`);
    return [rows];
}

async function createShift(name, start_time, time, examination_id) {
    await dbPool.query(`INSERT INTO shifts (name, start_time, time, examination_id) 
                        VALUES ("${name}", ${start_time}, ${time}, ${examination_id})`);

}

async function getShiftById(id) {
    const [rows] = await dbPool.query(`SELECT * 
                                       FROM shifts
                                       WHERE id = ${id}`);
    return [rows];
}

async function updateShift(id, name, start_time, time){
    await dbPool.query(`UPDATE shifts 
                        SET name = "${name}",
                            start_time = ${start_time},
                            time = ${time}
                        WHERE id = ${id}`);
}

async function deleteShiftById(id) {
    await dbPool.query(`DELETE FROM shifts 
                        WHERE id = ${id}`);
}

async function getAllShifts(offset, limit) {
    const [rows] = await dbPool.query(`SELECT * 
                                       FROM shifts
                                       LIMIT ${limit}
                                       OFFSET ${offset}`);
    return [rows];
}

module.exports = {
    getShiftByName,
    createShift,
    getShiftById,
    updateShift,
    deleteShiftById,
    getAllShifts
};
