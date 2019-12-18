const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const responseUtil = require('../utils/response.util');
const exam_model = require('../models/exams.models');


async function createExam(req, res) {
    const {
        name
    } = req.body;
    try {
        if (!name)
            throw new Error('name field is missing');

        const [existedExam] = await exam_model.getExambyName(name);
        if (existedExam.length)
            throw new Error('examination is existed');


        await exam_model.createExam(name)
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

};


async function deleteExams(req, res) {
    const {
        id
    } = req.body;


    try {

        if (!id)  throw new Error('id field is missing');

        id.forEach(element => deleteExambyId(element));

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

};
async function deleteExambyId(id) {
    await exam_model.deleteExambyId(id);
};


async function updateExam(req, res) {
    const {
        id,
        new_name
    } = req.body;

    try {
        if (!id)
            throw new Error('id field is missing');
        if (!new_name)
            throw new Error('name field is missing');


        const [existedExam] = await exam_model.getExambyid(id);
        if (!existedExam.length)
            throw new Error('have not created');

        await exam_model.updateExam(id, new_name);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

async function getAllExam(req, res) {

    try {
        [exams] = await exam_model.getAllExam()
        res.json(responseUtil.success({data: {exams: [exams]}}
            )
        );
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

module.exports = {
    createExam,
    updateExam,
    deleteExams,
    getAllExam
};