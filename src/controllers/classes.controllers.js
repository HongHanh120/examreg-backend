const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const responseUtil = require('../utils/response.util');
const class_model = require('../models/classes.models');
const exam_model = require("../models/exams.models");
const subject_model = require("../models/subjects.models")

async function createClass(req, res) {
    const {
        class_code,
        examination_id,
        subject_id
    } = req.body;
    try {
        if (!class_code)
            throw new Error('class_code field is missing');
        if (!examination_id)
            throw new Error('examination_id field is missing');
        if (!subject_id)
            throw new Error('subject_id field is missing');

        const [existedClass] = await class_model.getClassbyClass_code(class_code);
        if (existedClass.length)
            throw new Error('Class is existed');
        const [existedSubject] = await subject_model.getSubjectbyid(subject_id);//kiem tra subject co ton tai k
        if (!existedClass.length)
            throw new Error('subject is not existed');
        const [existedExam] = await exam_model.getExambyid(examination_id);//kiem tra exam ton tai k
        if (!existedExam.length)
            throw new Error('examination is not existed');//

        await class_model.createClass(class_code, examination_id, subject_id);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

};


async function deleteClasses(req, res) {
    const {
        id
    } = req.body;


    try {

        if (!id) throw new Error('id field is missing');

        id.forEach(element => deleteExambyId(element));

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

};

async function deleteExambyId(id) {
    await class_model.deleteClassbyId(id);
};


async function updateClass(req, res) {
    const {
        id,
        class_code,
        examination_id,
        subject_id
    } = req.body;

    try {
        if (!class_code)
            throw new Error('class_code field is missing');
        if (!examination_id)
            throw new Error('examination_id field is missing');
        if (!subject_id)
            throw new Error('subject_id field is missing');
        if (!id)
            throw new Error('id field is missing');

        const [existed] = await class_model.getClassbyid(id);
        if (!existed.length)
            throw new Error('have not created');
        const [existedSubject] = await subject_model.getSubjectbyid(subject_id);//kiem tra subject co ton tai k
        if (!existedClass.length)
            throw new Error('subject is not existed');
        const [existedExam] = await exam_model.getExambyid(examination_id);//kiem tra exam ton tai k
        if (!existedExam.length)
            throw new Error('examination is not existed');//

        await class_model.updateClass(id, class_code, examination_id, subject_id);
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

async function getAllClass(req, res) {

    try {
        [exams] = await class_model.getAllClass();
        res.json(responseUtil.success({data: {classes: [exams]}}
            )
        );
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

async function getClassbyKeyword(req, res) {
    const {
        keywords
    } = req.query;

    try {
        if (!keywords)
            throw new Error('keywords querry is missing');

        [classes] = await subject.getClassbyKeyWord(keywords)
        res.json(responseUtil.success({data: {classes: classes}}
            )
        );
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

module.exports = {
    createClass,
    deleteClasses,
    getAllClass,
    updateClass,
    getClassbyKeyword
};