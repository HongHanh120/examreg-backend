const responseUtil = require("../utils/response.util");
const excelToJson = require("convert-excel-to-json");
const brcypt = require("bcrypt");
const fs = require("fs");

const account = require("../models/accounts.models");
const classes = require("../models/classes.models");
const class_student = require("../models/classes_students.models");
const shift_room_student = require("../models/shifts_rooms_students.models");
const shift_room = require("../models/shifts_rooms.models");

async function importStudents(req, res) {
    const file = req.file;
    try {
        if (!file)
            throw new Error("Please upload a file");
        const filePath = req.file.path;
        const studentsSheet = excelToJson({
            sourceFile: filePath,
            columnToKey: {
                B: "MSSV",
                C: "fullname",
                D: "course_class",
                E: "date_of_birth",
                F: "email"
            }
        });
        const firstSheet = Object.keys(studentsSheet)[0];
        const students = studentsSheet[firstSheet].slice(1, studentsSheet[firstSheet].length);
        students.map(student => {
            let date = new Date(student.date_of_birth);
            student.date_of_birth = date.getTime() / 1000;
        });

        let existedStudents = [];
        for (let student of students) {
            const [existedStudent] = await account.getUserByUsername(student.MSSV);
            if (existedStudent.length)
                existedStudents.push({MSSV: student.MSSV});
            else {
                let salt = await brcypt.genSalt(10);
                let {MSSV, fullname, course_class, date_of_birth, email} = student;
                let hashPassword = await brcypt.hash(MSSV.toString(), salt);
                await account.createUser(MSSV, hashPassword, fullname, date_of_birth, course_class, email);
            }
        }
        if (existedStudents.length)
            throw new Error("Student is existed: " + JSON.stringify(existedStudents));

        fs.unlinkSync(filePath);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getStudentList(req, res) {
    const {keywords} = req.query;
    try {
        let rows = [];
        if (keywords)
            [rows] = await account.getUserByKeyword(keywords, 2);
        else
            [rows] = await account.getAllStudent();
        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getSubjectOfRegister(req, res) {
    const {examination_id, id} = req.tokenData;
    try {
        let [existedStudent] = await class_student.getStudentByAccountId(id);
        if (!existedStudent.length)
            throw new Error("Student is not existed");

        const [result] = await shift_room_student.getSubjectInReg(id, examination_id);

        res.json(responseUtil.success({data: {result}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function registerExam(req, res) {
    const {examination_id, id} = req.tokenData;
    const {shift_room_id} = req.body;
    try {
        if (!shift_room_id)
            throw new Error("Shift_room_id field is missing");

        let [existedShiftRoom] = await shift_room.getShiftRoomById(shift_room_id);
        if (!existedShiftRoom.length)
            throw new Error("This shift_room is not existed");
        let subject_code = existedShiftRoom[0].subject_code;
        let slot = existedShiftRoom[0].current_slot;

        let [existedStudent] = await class_student.getStudentByAccountId(id);
        if (!existedStudent.length)
            throw new Error("Student is not existed");
        const student_id = existedStudent[0].id;

        let [registeredSubject] = await shift_room_student.getSubjectInReg(id, examination_id);
        for (let i = 0; i < registeredSubject.length; i++) {
            if (registeredSubject[i].id === shift_room_id ||
                registeredSubject[i].subject_code === subject_code)
                throw new Error("This subject is registered");
        }
        let current_slot = await shift_room_student.getCurrentSlot(shift_room_id);
        if(current_slot >= slot)
            throw new Error("This room is full");

        const [subject] = await class_student.getASubject(examination_id, id, subject_code);
        if(!subject.length)
            throw new Error("This subject is not invalid");

        const [checkEligibility] = await account.getNotEligibleStudent(examination_id);
        for(let i = 0; i < checkEligibility.length; i++){
            let account_id = checkEligibility[i].id;
            let subjectCode = checkEligibility[i].subject_code;
            if(account_id === id && subject_code === subjectCode)
                throw new Error("You is blocked to register this subject")
        }

        await shift_room_student.create(shift_room_id, student_id);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function deleteSubject(req, res){
    const {id} = req.tokenData;
    const {shift_room_student_id} = req.query;
    try {
        if (!shift_room_student_id)
            throw new Error("Shift_room_student_id field is missing");
        let [existed] = await shift_room_student.getById(shift_room_student_id);
        if(!existed.length)
            throw new Error("Shift_room_student_id is not existed");

        let [existedStudent] = await class_student.getStudentByAccountId(id);
        if (!existedStudent.length)
            throw new Error("Student is not existed");

        await shift_room_student.deleteById(shift_room_student_id);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    importStudents,
    getStudentList,
    getSubjectOfRegister,
    registerExam,
    deleteSubject
};
