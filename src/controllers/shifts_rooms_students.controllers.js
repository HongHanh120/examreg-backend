const responseUtil = require("../utils/response.util");
const shift_room_student = require("../models/shifts_rooms_students.models");
const shift_room = require("../models/shifts_rooms.models");
const student = require("../models/classes_students.models");

async function create(req, res) {
    const {examination_id} = req.tokenData;
    const {
        shift_room_id,
        student_id
    } = req.body;
    try {
        if (!shift_room_id)
            throw new Error("Shift_room_id field is missing");
        if (!student_id)
            throw new Error("Student_id time field is missing");

        const [existedShiftRoom] = await shift_room.getShiftRoomById(shift_room_id);
        if (!existedShiftRoom.length)
            throw new Error("This shift_room is not existed");
        const [existedStudent] = await student.getStudentById(student_id);
        if (!existedStudent.length)
            throw new Error("This student is not existed");

        const [existInExamination] = await shift_room_student.checkShiftRoom(shift_room_id, examination_id);
        if (!existInExamination.length)
            throw new Error("This examination does not have this shift_room");

        const [exist] = await shift_room_student.checkExist(shift_room_id, student_id);
        if (exist.length)
            throw new Error("This shift_room_student is existed");

        await shift_room_student.create(shift_room_id, student_id);
        res.json(responseUtil.success({data: {}}));

    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function deleteShiftRoomStudent(req, res) {
    const {id} = req.tokenData;
    const {shift_room_student_id} = req.query;
    try {
        if (!shift_room_student_id)
            throw new Error("Id field is missing");

        const [checkExist] = await shift_room_student.getById(shift_room_student_id);
        if (!checkExist.length)
            throw new Error("This shift_room_student is not existed");

        const student_id = checkExist[0].student_id;
        let [account_id] = await shift_room_student.getAccountId(student_id);
        account_id = account_id[0].account_id;

        if (id !== account_id)
            throw new Error("You haven't privilege to use this action");

        await shift_room_student.deleteById(shift_room_student_id);
        res.json(responseUtil.success({data: {}}));

    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    create,
    deleteShiftRoomStudent
};
