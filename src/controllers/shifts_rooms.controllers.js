const responseUtil = require("../utils/response.util");
const shift_room = require("../models/shifts_rooms.models");
const shift = require("../models/shifts.models");
const room = require("../models/rooms.models");
const subject = require("../models/subjects.models");
const classes = require("../models/classes.models");

async function create(req, res) {
    const {id, examination_id} = req.tokenData;
    const {
        shift_id,
        room_id,
        subject_code
    } = req.body;
    try {
        if (!shift_id)
            throw new Error("Shift_id field is missing");
        if (!room_id)
            throw new Error("Room_id time field is missing");
        if (!subject_code)
            throw new Error("Subject_code field is missing");

        const [checkSubject] = await classes.checkSubject(subject_code, examination_id);
        if (!checkSubject.length)
            throw new Error("This examination does not have this subject");

        const [existedShift] = await shift.getShiftById(shift_id);
        if (!existedShift.length)
            throw new Error("This shift is not existed");
        const [existedRoom] = await room.getRoomById(room_id);
        if (!existedRoom.length)
            throw new Error("This room is not existed");
        const [existedSubject] = await subject.getSubjectByCourseCode(subject_code);
        if (!existedSubject.length)
            throw new Error("This subject is not existed");

        const [existedShiftRoom] = await shift_room.checkShiftRoom(shift_id, room_id);
        if (existedShiftRoom.length)
            throw new Error("This shift is full in this room");

        // const [existedDuplication] = await shift_room.checkDuplication(shift_id, room_id, subject_code);
        // if(existedDuplication.length)
        //     throw new Error("This subject is existed in shift_room ");

        let [current_slot] = await room.getRoomById(room_id);
        current_slot = current_slot[0].slot;

        await shift_room.create(shift_id, room_id, current_slot, subject_code, id);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function update(req, res) {
    const {id, examination_id} = req.tokenData;
    const {
        shift_room_id,
        shift_id,
        room_id,
        subject_code,
        current_slot
    } = req.body;
    try {
        let [creator_id] = await shift_room.getShiftRoomById(shift_room_id);
        creator_id = creator_id[0].creator_id;
        if (creator_id !== id)
            throw new Error("You haven't privilege to use this action");

        if (!shift_room_id)
            throw new Error("Shift_room_id field is missing");
        if (!shift_id)
            throw new Error("Shift_id field is missing");
        if (!room_id)
            throw new Error("Room_id time field is missing");
        if (!subject_code)
            throw new Error("Subject_code field is missing");
        if (!current_slot)
            throw new Error("Current_slot field is missing");

        const [existedShift] = await shift.getShiftById(shift_id);
        if (!existedShift.length)
            throw new Error("This shift is not existed");
        const [existedRoom] = await room.getRoomById(room_id);
        if (!existedRoom.length)
            throw new Error("This room is not existed");
        const [existedSubject] = await subject.getSubjectByCourseCode(subject_code);
        if (!existedSubject.length)
            throw new Error("This subject is not existed");


        const [checkSubject] = await classes.checkSubject(subject_code, examination_id);
        if (!checkSubject.length)
            throw new Error("This examination does not have this subject");

        const [existedShiftRoom] = await shift_room.checkShiftRoom(shift_id, room_id);
        if (existedShiftRoom.length)
            throw new Error("This shift is full in this room");

        // const [existedDuplication] = await shift_room.checkDuplication(shift_id, room_id, subject_code);
        // if(existedDuplication.length)
        //     throw new Error("This subject is existed in shift_room ");

        await shift_room.update(shift_room_id, shift_id, room_id, current_slot, subject_code);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function deleteShiftRoom(req, res) {
    const {id} = req.tokenData;
    const {
        shift_room_id
    } = req.query;
    try {
        let [creator_id] = await shift_room.getShiftRoomById(shift_room_id);
        creator_id = creator_id[0].creator_id;
        if (creator_id !== id)
            throw new Error("You haven't privilege to use this action");

        if (!shift_room_id)
            throw new Error("Shift_room_id field is missing");

        const [existed] = await shift_room.getShiftRoomById(shift_room_id);
        if (!existed.length)
            throw new Error("Shift_room is not existed");

        await shift_room.deleteById(shift_room_id);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getInformation(req, res) {
    const {shift_room_id} = req.query;
    try {
        if (!shift_room_id)
            throw new Error("Shift_room_id field is missing");

        let [existedShiftRoom] = await shift_room.getShiftRoomById(shift_room_id);
        if (!existedShiftRoom.length)
            throw new Error("This shift is not existed");

        existedShiftRoom = existedShiftRoom[0];

        res.json(responseUtil.success({data: {existedShiftRoom}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getList(req, res) {
    const {examination_id} = req.tokenData;
    try {
        const [rows] = await shift_room.getAll(examination_id);

        let block = false;
        let reg = false;
        let results = [];

        for (let i = 0; i < rows.length; i++) {
            let id = rows[i].id;
            let shift_id = rows[i].shift_id;
            let room_id = rows[i].room_id;
            let current_slot = rows[i].current_slot;
            let subject_code = rows[i].subject_code;
            let creator_id = rows[i].creator_id;
            let room_name = rows[i].room_name;
            let slot = rows[i].slot;
            let shift_name = rows[i].shift_name;
            let start_time = rows[i].start_time;
            let time = rows[i].time;
            let examination_id = rows[i].examination_id;

            let row = {id, shift_id, room_id, current_slot, subject_code,
                creator_id, room_name, slot, shift_name, start_time, time,
                examination_id, block, reg};
            results.push(row);
        }

        res.json(responseUtil.success({data: {results}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    create,
    update,
    deleteShiftRoom,
    getInformation,
    getList
};
