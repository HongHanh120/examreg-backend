const responseUtil = require("../utils/response.util");
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
    const {id} = req.body;
    try {
        if (!id)
            throw new Error("Id field is missing");
        const [existedSubject] = await subject.getSubjectById(id);
        if (!existedSubject.length)
            throw new Error("This subject is not existed");
        await subject.deleteSubjectById(id);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function deleteSubjects(req, res) {
    const {id} = req.body;
    try {
        if (!id)
            throw new Error("Id field is missing");
        let existedSubjects = [];
        let notExistedSubjects = [];
        for (let i = 0; i < id.length; i++) {
            const [existedSubject] = await subject.getSubjectById(id[i]);
            if (existedSubject.length)
                existedSubjects.push(id[i]);
            else
                notExistedSubjects.push(id[i]);
        }
        for (let i = 0; i < existedSubjects.length; i++) {
            await subject.deleteSubjectById(existedSubjects[i]);
        }
        if (notExistedSubjects.length)
            throw new Error("These subjects is not existed:" + JSON.stringify(notExistedSubjects));

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
};

async function updateSubject(req, res) {
    const {
        id,
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
        if (!id)
            throw new Error("Id field is missing");

        const [existedSubject] = await subject.getSubjectById(id);
        if (!existedSubject.length)
            throw new Error("This subject is not existed");

        const [duplication] = await subject.getSubjectByCourseCode(subject_code);
        if (duplication.length)
            throw new Error("This subject is existed");

        await subject.updateSubject(id, name, subject_code, credit);

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
        if (!keywords)
            throw new Error("Keywords is missing");

        [subjects] = await subject.getSubjectByKeyword(keywords);
        res.json(responseUtil.success({data: {subjects: subjects}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getInformation(req, res) {
    const {id} = req.query;
    try {
        if (!id)
            throw new Error("Id field is missing");
        let [existedSubject] = await subject.getSubjectById(id);
        if (!existedSubject.length)
            throw new Error("This subject is not existed");
        existedSubject = existedSubject[0];
        res.json(responseUtil.success({data: {existedSubject}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    createSubject,
    updateSubject,
    deleteSubject,
    deleteSubjects,
    getAllSubject,
    getSubjectByKeyword,
    getInformation
};
