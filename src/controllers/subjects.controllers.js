const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const responseUtil = require('../utils/response.util');
const subject = require('../models/subjects.models');


async function createSubject(req, res) {
    const {
        name,
        course_code,
        credit
    } = req.body;
    try {
        if (!course_code)
            throw new Error('course_code field is missing');
        if (!name)
            throw new Error('name field is missing');
        if (!credit)
            throw new Error('credit field is missing');

        const [existedSubject] = await subject.getSubjectbycourse_code(course_code);
        if (existedSubject.length)
            throw new Error('coursecode is existed');


        await subject.createSubject(name, course_code, credit)
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

};


async function deleteSubject(req, res) {
    const {
        id
    } = req.body;

    console.log('dsd');
    try {
        if (!id) throw new Error('id field is missing');
        id.forEach(element => deleteSubjectbyId(element));

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

};

async function deleteSubjectbyId(id) {
    await subject.deleteSubjectbyid(id);
};

async function updateSubject(req, res) {
    const {
        id,
        name,
        course_code,
        credit
    } = req.body;

    try {
        if (!course_code)
            throw new Error('course_code field is missing');
        if (!name)
            throw new Error('name field is missing');
        if (!credit)
            throw new Error('credit field is missing');
        if (!id)
            throw new Error('id field is missing');
        const [existedSubject] = await subject.getSubjectbyid(id);
        if (!existedSubject.length)
            throw new Error('have not created');

        await subject.updateSubject(id, name, course_code, credit)

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

async function getAllSubject(req, res) {

    try {
        [subjects] = await subject.getAllSubjects()
        res.json(responseUtil.success({data: {subjects: subjects}}
            )
        );
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

async function getSubjectbyKeyword(req, res) {
    const {
        keywords
    } = req.query;

    try {
        if (!keywords)
            throw new Error('keywords querry is missing');

        [subjects] = await subject.getSubjectbyKeyWord(keywords)
        res.json(responseUtil.success({data: {subjects: subjects}}
            )
        );
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

module.exports = {
    createSubject,
    updateSubject,
    deleteSubject,
    getAllSubject,
    getSubjectbyKeyword

};
