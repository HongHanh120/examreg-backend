const responseUtil = require("../utils/response.util");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const classModel = require("../models/classes.models");
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
            const [existedClassCode] = await classModel.verifyExistedClass(subjectClass.class_code, examination_id, subjectClass.subject_id);
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
        if (!subject_id)
            throw new Error("Subject_id field is missing");

        const [existedSubject] = await subjectModel.getSubjectById(subject_id); //kiem tra subject co ton tai k
        if (!existedSubject.length)
            throw new Error("This subject is not existed");
        const [existedClass] = await classModel.verifyExistedClass(class_code, examination_id, subject_id);
        if (existedClass.length)
            throw new Error("This class is existed");

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

        const [existedSubject] = await subjectModel.getSubjectById(subject_id);//kiem tra subject co ton tai k
        if (!existedSubject.length)
            throw new Error("This subject is not existed");
        const [existedClass] = await classModel.getClassById(id);
        if (!existedClass.length)
            throw new Error("This class is not existed in this examination");

        await classModel.updateClass(id, class_code, subject_id);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

async function deleteClasses(req, res) {
    const {id} = req.body;
    try {
        if (!id) throw new Error("Id field is missing");
        let existedClasses = [];
        let notExistedClasses = [];
        for (let i = 0; i < id.length; i++) {
            const [existedClass] = await classModel.getClassById(id[i]);
            if (existedClass.length)
                existedClasses.push(id[i]);
            else
                notExistedClasses.push(id[i]);
        }
        for (let i = 0; i < existedClasses.length; i++) {
            await classModel.deleteClassById(existedClasses[i]);
        }
        if(notExistedClasses.length)
            throw new Error("These classes is not existed: " + JSON.stringify(notExistedClasses));
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
};

async function deleteClass(req, res) {
    const {id} = req.body;
    try {
        if (!id) throw new Error("Id field is missing");

        const [existedClass] = await classModel.getClassById(id);
        if (!existedClass.length)
            throw new Error("This class is not existed in this examination");
        await classModel.deleteClassById(id);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
};

async function getClassByKeyword(req, res) {
    const {keywords} = req.params;
    try {
        if (!keywords)
            throw new Error("Keywords is missing");

        [classes] = await classModel.getClassByKeyWord(keywords);
        res.json(responseUtil.success({data: {classes: classes}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    importClasses,
    createClass,
    deleteClass,
    deleteClasses,
    getAllClass,
    updateClass,
    getClassByKeyword
};
