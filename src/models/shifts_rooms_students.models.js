const dbPool = require("../db");

async function checkShiftRoom(shift_room_id, examination_id) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM shifts_rooms
                                            INNER JOIN shifts ON shifts.id = shifts_rooms.shift_id
                                            WHERE shifts.examination_id = ${examination_id}
                                            AND shifts_rooms.id = ${shift_room_id}`);
    return [rows];
}

async function checkExist(shift_room_id, student_id) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM shifts_rooms_students
                                            INNER JOIN classes_students ON classes_students.id = shifts_rooms_students.student_id
                                            WHERE shifts_rooms_students.shift_room_id = ${shift_room_id}
                                            AND classes_students.id = ${student_id}`);
    return [rows];
}

async function create(shift_room_id, student_id) {
    await dbPool.query(`INSERT INTO shifts_rooms_students (shift_room_id, student_id) 
                            VALUES (${shift_room_id}, ${student_id})`);
}

async function getById(id) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM shifts_rooms_students
                                            WHERE id = ${id}`);
    return [rows];
}

async function deleteById(id) {
    await dbPool.query(`DELETE FROM shifts_rooms_students
                            WHERE id = ${id}`);
}

async function getAccountId(student_id) {
    const [rows] = await dbPool.query(`SELECT *, classes_students.account_id
                                      FROM shifts_rooms_students
                                      INNER JOIN classes_students ON classes_students.id = shifts_rooms_students.student_id
                                      WHERE classes_students.id = ${student_id}`);
    return [rows];
}

module.exports = {
    checkShiftRoom,
    checkExist,
    create,
    getById,
    deleteById,
    getAccountId
};
