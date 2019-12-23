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
    await dbPool.query(`INSERT INTO shifts_rooms_students(shift_room_id, student_id) 
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

async function getStudentInRoom(examination_id, shift_room_id){
    const [rows] = await dbPool.query(`SELECT accounts.id, accounts.username, accounts.fullname, accounts.date_of_birth,
                                              shifts_rooms.id
                                      FROM shifts_rooms_students
                                      INNER JOIN shifts_rooms ON shifts_rooms.id = shifts_rooms_students.shift_room_id
                                      INNER JOIN classes_students ON shifts_rooms_students.student_id = classes_students.id
                                      INNER JOIN accounts ON accounts.id = classes_students.account_id
                                      INNER JOIN shifts ON shifts.id = shifts_rooms.shift_id
                                      WHERE shifts_rooms.id = ${shift_room_id} AND shifts.examination_id = ${examination_id}`);
    return [rows];
}

async function getSubjectInReg(id, examination_id){
    const [rows] = await dbPool.query(`SELECT rooms.name AS room, shifts.name AS shift, shifts.start_time, shifts.time, shifts_rooms.subject_code,
                                            shifts_rooms_students.id
                                      FROM shifts_rooms_students
                                      INNER JOIN shifts_rooms ON shifts_rooms.id = shifts_rooms_students.shift_room_id
                                      INNER JOIN classes_students ON shifts_rooms_students.student_id = classes_students.id
                                      INNER JOIN rooms ON rooms.id = shifts_rooms.room_id
                                      INNER JOIN shifts ON shifts.id = shifts_rooms.shift_id
                                      WHERE classes_students.account_id = ${id} AND shifts.examination_id = ${examination_id}`);
    return [rows];
}

async function getCurrentSlot(shift_room_id){
    const current_slot = await dbPool.query(`SELECT COUNT(*)
                                             FROM shifts_rooms_students
                                             WHERE shift_room_id = ${shift_room_id}
                                             GROUP BY(shift_room_id)`);
    return current_slot;
}

module.exports = {
    checkShiftRoom,
    checkExist,
    create,
    getById,
    deleteById,
    getAccountId,
    getStudentInRoom,
    getSubjectInReg,
    getCurrentSlot
};
