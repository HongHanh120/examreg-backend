const dbPool = require("../db");

async function checkShiftRoom(shift_id, room_id) {
    const [rows] = await dbPool.query(`SELECT *
                                    FROM shifts_rooms
                                    WHERE shift_id = ${shift_id}
                                    AND room_id = ${room_id}`);
    return [rows];
}

async function checkDuplication(shift_id, room_id, subject_code){
    const [rows] = await dbPool.query(`SELECT *
                                    FROM shifts_rooms
                                    WHERE shift_id = ${shift_id}
                                    AND room_id = ${room_id}
                                    AND subject_code = "${subject_code}"`);
    return [rows];
}

async function create(shift_id, room_id, current_slot, subject_code, creator_id) {
    await dbPool.query(`INSERT INTO shifts_rooms(shift_id, room_id, current_slot, subject_code, creator_id)
                            VALUES (${shift_id}, ${room_id}, ${current_slot}, "${subject_code}", ${creator_id})`);
}

async function getShiftRoomById(shift_room_id) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM shifts_rooms
                                            WHERE id = ${shift_room_id}`);
    return [rows];
}

async function update(id, shift_id, room_id, current_slot, subject_code) {
    await dbPool.query(`UPDATE shifts_rooms 
                        SET shift_id = "${shift_id}",
                            room_id = ${room_id},
                            current_slot = ${current_slot},
                            subject_code = "${subject_code}"
                        WHERE id = ${id}`);
}

async function deleteById(id) {
    await dbPool.query(`DELETE FROM shifts_rooms
                            WHERE id = ${id}`);
}

async function getAll() {
    const [rows] = await dbPool.query(`SELECT * 
                                        FROM shifts_rooms`);
    return [rows];
}

module.exports = {
    checkShiftRoom,
    checkDuplication,
    create,
    getShiftRoomById,
    update,
    deleteById,
    getAll
};
