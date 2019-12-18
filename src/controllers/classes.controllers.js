const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const responseUtil = require('../utils/response.util');
const class_model = require('../models/classes.models');


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


// async function updateClass(req, res) {
//     const {
//         id,
//         new_name
//     } = req.body;
//
//     try {
//         if (!id)
//             throw new Error('id field is missing');
//         if (!new_name)
//             throw new Error('name field is missing');
//
//
//         const [existedExam] = await exam_model.getExambyid(id);
//         if (!existedExam.length)
//             throw new Error('have not created');
//
//         await exam_model.updateExam(id, new_name);
//         res.json(responseUtil.success({data: {}}));
//     } catch (err) {
//         res.json(responseUtil.fail({reason: err.message}));
//     }
//
// }

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

module.exports = {
    createClass,
    deleteClasses,
    getAllClass
};