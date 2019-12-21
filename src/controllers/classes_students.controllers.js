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

        let existedStudents = [];
        for (let class_student of class_students) {

            let subject_code = class_student.class_code_id.slice(0, 7);
            let class_code = class_student.class_code_id.slice(8);
            let [rows] = await classes.getId(class_code, subject_code);
            class_student.class_code_id = rows[0].id;

            const [existedStudent] = await classStudent.verifyDuplication(class_student.student_code, class_student.class_code_id, examination_id);
            if (existedStudent.length)
                existedStudents.push({class_student});
            else {
                let [account_id] = await account.getUserByUsername(class_student.student_code);
                account_id = account_id[0];
                let {student_code, class_code_id, eligibility} = class_student;
                await classStudent.create(student_code, class_code_id, eligibility, account_id.id);
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

module.exports = {
    importClassesStudents
};
