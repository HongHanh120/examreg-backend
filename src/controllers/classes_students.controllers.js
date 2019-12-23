const responseUtil = require("../utils/response.util");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const account = require("../models/accounts.models");
const classes = require("../models/classes.models");
const classStudent = require("../models/classes_students.models");

async function importClassesStudents(req, res) {
    const {examination_id} = req.tokenData;
    const file = req.file;
    try {
        if (!file)
            throw new Error("Please upload a file");
        const filePath = req.file.path;
        const classesStudentsSheet = excelToJson({
            sourceFile: filePath,
            columnToKey: {
                B: "student_code",
                C: "class_code_id",
                D: "eligibility"
            }
        });
        const firstSheet = Object.keys(classesStudentsSheet)[0];
        const class_students = classesStudentsSheet[firstSheet].slice(1, classesStudentsSheet[firstSheet].length);

        let existedElements = [];
        for (let class_student of class_students) {

            let subject_code = class_student.class_code_id.slice(0, 7);
            let class_code = class_student.class_code_id.slice(8);
            let [rows] = await classes.getId(class_code, subject_code);
            class_student.class_code_id = rows[0].id;

            const [existedStudent] =
                await classStudent.verifyDuplication(class_student.student_code,
                    class_student.class_code_id,
                    examination_id);
            const [existedSubject] =
                await classStudent.checkSubjectCode(class_student.student_code,
                    subject_code, examination_id);

            if (existedStudent.length)
                existedElements.push({class_student});
            else if (existedSubject.length)
                existedElements.push({class_student});
            else {
                let [account_id] = await account.getUserByUsername(class_student.student_code);
                account_id = account_id[0];
                let {student_code, class_code_id, eligibility} = class_student;
                await classStudent.create(student_code, class_code_id, eligibility, account_id.id);
            }
        }
        if (existedElements.length)
            throw new Error("Student is existed: " + JSON.stringify(existedElements));

        fs.unlinkSync(filePath);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getStudentsOfClass(req, res) {
    const {examination_id} = req.tokenData;
    const {class_code_id} = req.query;
    try {
        if (!class_code_id)
            throw new Error("Class_code_id field is missing");

        const [rows] = await classStudent.getStudentsInClass(examination_id, class_code_id);
        res.json(responseUtil.success({data: {rows}}));

    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getSubjectsOfStudent(req, res) {
    const {id} = req.tokenData;
    const {examination_id} = req.tokenData;
    try {
        if (!id)
            throw new Error("Id field is missing");

        let [existedStudent] = await classStudent.getStudentByAccountId(id);
        if (!existedStudent.length)
            throw new Error("Student is not existed");

        let [information] = await account.getInformation(id);

        let subjects = [];
        let [rows] = await classStudent.getSubject(examination_id, id);
        for (let i = 0; i < rows.length; i++) {
            let subject_code = rows[i].subject_code;
            let name = rows[i].name;
            let class_code = rows[i].class_code;
            let credit = rows[i].credit;
            let eligibility = rows[i].eligibility;

            let subject_class = subject_code + " " + class_code.toString();
            let subject = {subject_code, name, subject_class, credit, eligibility};
            subjects.push(subject);
        }

        res.json(responseUtil.success({data: {information, subjects}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    importClassesStudents,
    getStudentsOfClass,
    getSubjectsOfStudent
};
