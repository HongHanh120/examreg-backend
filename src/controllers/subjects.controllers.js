const responseUtil = require("../utils/response.util");
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");

const subject = require("../models/subjects.models");

async function createSubject(req, res) {
    const {
        name,
        subject_code,
        credit
    } = req.body;
    try {
        if (!subject_code)
            throw new Error("Subject_code field is missing");
        if (!name)
            throw new Error("Name field is missing");
        if (!credit)
            throw new Error("Credit field is missing");

        const [existedSubject] = await subject.getSubjectByCourseCode(subject_code);
        if (existedSubject.length)
            throw new Error("Course code is existed");

        await subject.createSubject(name, subject_code, credit);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function deleteSubject(req, res) {
    const {subject_code} = req.query;
    try {
        if (!subject_code)
            throw new Error("Subject_code field is missing");
        const [existedSubject] = await subject.getSubjectByCourseCode(subject_code);
        if (!existedSubject.length)
            throw new Error("This subject is not existed");
        await subject.deleteSubjectById(subject_code);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function updateSubject(req, res) {
    const {
        name,
        subject_code,
        credit
    } = req.body;
    try {
        if (!subject_code)
            throw new Error("Subject code field is missing");
        if (!name)
            throw new Error("Name field is missing");
        if (!credit)
            throw new Error("Credit field is missing");

        const [existedSubject] = await subject.getSubjectByCourseCode(subject_code);
        if (!existedSubject.length)
            throw new Error("This subject is not existed");

        await subject.updateSubject(name, subject_code, credit);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getAllSubject(req, res) {
    try {
        [subjects] = await subject.getAllSubjects();
        res.json(responseUtil.success({data: {subjects: subjects}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getSubjectByKeyword(req, res) {
    const {keywords} = req.query;
    try {
        let results = [];
        if (keywords)
            [results] = await subject.findSubjectByKeyword(keywords);
        else
            [results] = await subject.getAllSubjects();

        res.json(responseUtil.success({data: {subjects: results}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getInformation(req, res) {
    const {subjectCode} = req.query;
    try {
        if (!subjectCode)
            throw new Error("Subject-code field is missing");

        let [existedSubject] = await subject.getSubjectByCourseCode(subjectCode);
        if (!existedSubject.length)
            throw new Error("This subject is not existed");
        existedSubject = existedSubject[0];

        res.json(responseUtil.success({data: {existedSubject}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function importSubjects(req, res) {
    const file = req.file;
    try {
        if (!file)
            throw new Error("Please upload a file");
        const filePath = req.file.path;
        const subjectSheet = excelToJson({
            sourceFile: filePath,
            columnToKey: {
                B: "subject_code",
                C: "name",
                D: "credit"
            }
        });
        const firstSheet = Object.keys(subjectSheet)[0];
        const subjects = subjectSheet[firstSheet].slice(1, subjectSheet[firstSheet].length);

        let existedSubjects = [];
        for (let element of subjects) {
            const [existedSubject] = await subject.getSubjectByCourseCode(element.subject_code);
            if (existedSubject.length)
                existedSubjects.push({sub: element.subject_code});
            else {
                let {subject_code, name, credit} = element;
                await subject.createSubject(name, subject_code, credit);
            }
        }
        if (existedSubjects.length)
            throw new Error("Subject_code is existed: " + JSON.stringify(existedSubjects));
        fs.unlinkSync(filePath);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getSubjectsInExam(req, res) {
    const {examination_id} = req.tokenData;
    try {
        let [subjects] = await subject.getSubjects(examination_id);
        console.log(subjects);

        res.json(responseUtil.success({data: {subjects}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    createSubject,
    updateSubject,
    deleteSubject,
    getAllSubject,
    getSubjectByKeyword,
    getInformation,
    importSubjects,
    getSubjectsInExam
};
