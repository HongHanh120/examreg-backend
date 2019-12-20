const responseUtil = require("../utils/response.util");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const classModel = require("../models/classes.models");
const examModel = require("../models/examinations.models");
const subjectModel = require("../models/subjects.models");

async function importClasses(req, res) {
    const {examination_id} = req.tokenData;
    console.log(examination_id);
    const file = req.file;
    console.log(file);
    try {
        if (!file)
            throw new Error("Please upload a file");
        const filePath = req.file.path;
        const classSheet = excelToJson({
            sourceFile: filePath,
            columnToKey: {
                B: "class_code",
                C: "examination_id",
                D: "subject_id"
            }
        });
        const firstSheet = Object.keys(classSheet)[0];
        const classes = classSheet[firstSheet].slice(1, classSheet[firstSheet].length);

        let existedClasses = [];
        for (let subjectClass of classes) {
            const [existedClassCode] = await classModel.verifyExistedClass(subjectClass.class_code, examination_id);
            if (existedClassCode.length)
                existedClasses.push({classCode: subjectClass.class_code});
            else {
                let {class_code, examination_id, subject_id} = subjectClass;
                await classModel.createClass(class_code, examination_id, subject_id);
            }
        }
        if (existedClasses.length)
            throw new Error("Class code is existed: " + JSON.stringify(existedClasses));
        fs.unlinkSync(filePath);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function createClass(req, res) {
    const {examination_id} = req.tokenData;
    const {
        class_code,
        subject_id
    } = req.body;
    try {
        if (!class_code)
            throw new Error("Class_code field is missing");
        if (!examination_id)
            throw new Error("Examination_id field is missing");
        if (!subject_id)
            throw new Error("Subject_id field is missing");

        const [existedClass] = await classModel.getClassByClassCode(class_code, examination_id);
        if (existedClass.length)
            throw new Error("This class is existed");
        const [existedSubject] = await subjectModel.getSubjectById(subject_id); //kiem tra subject co ton tai k
        if (!existedSubject.length)
            throw new Error("This subject is not existed");
        const [existedExamination] = await examModel.getExamById(examination_id);//kiem tra exam ton tai k
        if (!existedExamination.length)
            throw new Error("This examination is not existed");//

        await classModel.createClass(class_code, examination_id, subject_id);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

async function getAllClass(req, res) {
    const {examination_id} = req.tokenData;
    try {
        const [rows] = await classModel.getAllClass(examination_id);
        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function updateClass(req, res) {
    const {examination_id} = req.tokenData;
    const {
        id,
        class_code,
        subject_id
    } = req.body;

    try {
        if (!class_code)
            throw new Error("Class_code field is missing");
        if (!subject_id)
            throw new Error("Subject_id field is missing");
        if (!id)
            throw new Error("Id field is missing");

        const [existedClass] = await classModel.getClassById(id, examination_id);
        if (!existedClass.length)
            throw new Error("This class is not existed in this examination");
        const [existedSubject] = await subjectModel.getSubjectById(subject_id);//kiem tra subject co ton tai k
        if (!existedSubject.length)
            throw new Error("Subject is not existed");

        await classModel.updateClass(id, class_code, subject_id);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}


// async function deleteClasses(req, res) {
//     const {id} = req.body;
//     try {
//         if (!id) throw new Error("Id field is missing");
//         id.forEach(element => deleteExambyId(element));
//
//         res.json(responseUtil.success({data: {}}));
//     } catch (err) {
//         res.json(responseUtil.fail({reason: err.message}));
//     }
// };
//
// async function deleteExambyId(id) {
//     await class_model.deleteClassbyId(id);
// };
//
//


//
// async function getClassbyKeyword(req, res) {
//     const {
//         keywords
//     } = req.query;
//
//     try {
//         if (!keywords)
//             throw new Error("keywords querry is missing");
//
//         [classes] = await subject.getClassbyKeyWord(keywords);
//         res.json(responseUtil.success({data: {classes: classes}}
//             )
//         );
//     } catch (err) {
//         res.json(responseUtil.fail({reason: err.message}));
//     }
//
// }

module.exports = {
    importClasses,
    createClass,
    // deleteClasses
    getAllClass,
    updateClass,
    // getClassByKeyword
};
