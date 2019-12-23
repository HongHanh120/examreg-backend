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
    const [rows] = await dbPool.query(`SELECT shifts_rooms.id, shifts_rooms.current_slot, shifts_rooms.subject_code, 
                                            shifts_rooms.creator_id, rooms.name AS room_name, rooms.slot, 
                                            shifts.name AS shift_name, shifts.start_time, shifts.time, 
                                            shifts.examination_id, shifts.id AS shift_id, rooms.id AS room_id
                                        FROM shifts_rooms
                                        INNER JOIN shifts ON shifts_rooms.shift_id = shifts.id
                                        INNER JOIN rooms ON rooms.id = shifts_rooms.room_id`);
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
