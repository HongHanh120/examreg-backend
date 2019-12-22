const responseUtil = require("../utils/response.util");
const examination = require("../models/examinations.models");

async function createExamination(req, res) {
    const {
        name
    } = req.body;
    try {
        if (!name)
            throw new Error("Name field is missing");

        const [existedExam] = await examination.getExaminationByName(name);
        if (existedExam.length)
            throw new Error("This examination is existed");

        await examination.createExamination(name);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getInformation(req, res) {
    const {id} = req.query;
    try {
        if (!id)
            throw new Error("Id field is missing");

        const [existedExam] = await examination.getExaminationById(id);
        if (!existedExam.length)
            throw new Error("This examination is not existed");
        let [rows] = await examination.getExaminationById(id);
        rows = rows[0];
        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getAllExaminations(req, res) {
    try {
        let {page, pageSize} = req.query;
        if (!page) page = 1;
        if (!pageSize) pageSize = 20;
        const offset = (page - 1) * pageSize;
        const limit = Number(pageSize);

        [exams] = await examination.getAllExaminations(offset, limit);
        res.json(responseUtil.success({data: {exams: [exams]}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

async function updateExamination(req, res) {
    const {
        id,
        name
    } = req.body;
    try {
        if (!id)
            throw new Error("Id field is missing");
        if (!name)
            throw new Error("Name field is missing");

        const [existedExam] = await examination.getExaminationById(id);
        if (!existedExam.length)
            throw new Error("This examination is not existed");

        await examination.updateExamination(id, name);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function deleteExamination(req, res) {
    const {id} = req.query;
    try {
        if (!id)
            throw new Error("Id field is missing");
        const [existedExamination] = await examination.getExaminationById(id);
        if (!existedExamination.length)
            throw new Error("This examination is not existed");
        await examination.deleteExaminationById(id);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getExaminationByKeyword(req, res) {
    const {keywords} = req.query;
    try {
        let {page, pageSize} = req.query;
        if (!page) page = 1;
        if (!pageSize) pageSize = 20;
        const offset = (page - 1) * pageSize;
        const limit = Number(pageSize);

        let rows = [];
        if (keywords)
            [rows] = await examination.getExaminationByKeyword(offset, limit, keywords);
        else
            [rows] = await examination.getAllExaminations(offset, limit);
        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    createExamination,
    getAllExaminations,
    updateExamination,
    deleteExamination,
    getExaminationByKeyword,
    getInformation
};
