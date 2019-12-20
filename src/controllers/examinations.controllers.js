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

async function getAllExaminations(req, res) {
    try {
        [exams] = await examination.getAllExaminations();
        res.json(responseUtil.success({data: {exams: [exams]}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }

}

// async function updateExamination(req, res) {
//     const {
//         id,
//         new_name
//     } = req.body;
//
//     try {
//         if (!id)
//             throw new Error("id field is missing");
//         if (!new_name)
//             throw new Error("name field is missing");
//
//
//         const [existedExam] = await exam_model.getExambyid(id);
//         if (!existedExam.length)
//             throw new Error("have not created");
//
//         await exam_model.updateExam(id, new_name);
//         res.json(responseUtil.success({data: {}}));
//     } catch (err) {
//         res.json(responseUtil.fail({reason: err.message}));
//     }
//
// }
//
// async function deleteExaminations(req, res) {
//     const {
//         id
//     } = req.body;
//
//
//     try {
//
//         if (!id) throw new Error("id field is missing");
//
//         id.forEach(element => deleteExambyId(element));
//
//         res.json(responseUtil.success({data: {}}));
//     } catch (err) {
//         res.json(responseUtil.fail({reason: err.message}));
//     }
//
// };
//
// async function deleteExamination(id) {
//     await exam_model.deleteExambyId(id);
// };
//
// async function getExaminationByKeyword(req, res) {
//     const {
//         keywords
//     } = req.query;
//
//     try {
//         if (!keywords)
//             throw new Error("keywords querry is missing");
//
//         [exams] = await exam_model.getExambyKeyWord(keywords);
//         res.json(responseUtil.success({data: {exams: [exams]}}
//             )
//         );
//     } catch (err) {
//         res.json(responseUtil.fail({reason: err.message}));
//     }
//
// }

module.exports = {
    createExamination,
    getAllExaminations,
    updateExamination,
    deleteExamination,
    deleteExaminations,
    getExaminationByKeyword
};
