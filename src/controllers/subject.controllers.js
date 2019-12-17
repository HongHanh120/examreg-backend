const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const responseUtil = require('../utils/response.util');
const subject = require('../models/subject.models');
const account = require('../models/accounts.models');


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


        await subject.createSubject(name,course_code,credit)
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

};



async function deleteSubject(req, res) {
    const {
        course_code
    } = req.body;

    try {
        if (!course_code)
            throw new Error('course_code field is missing');



        const [existedSubject] = await subject.getSubjectbycourse_code(course_code);
        if (!existedSubject.length)
            throw new Error('have not created');

        await subject.deleteSubject(course_code)
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

};



async function updateSubject(req, res) {
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
        if (!existedSubject.length)
            throw new Error('have not created');

        await subject.updateSubject(name,course_code,credit)
        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

module.exports = {
    createSubject,
    updateSubject,
    deleteSubject

};
