const dbPool = require("../db");
const config = require("config");

async function createExamination(name) {
    await dbPool.query(`INSERT INTO examinations(name) 
                        VALUES ("${name}")`);
}

async function getExaminationByName(name) {
    const [rows] = await dbPool.query(`SELECT * 
                                       FROM examinations
                                       WHERE name = "${name}"`);
    return [rows];
}

async function getExaminationById(id) {
    const [rows] = await dbPool.query(`SELECT * 
                                       FROM examinations
                                       WHERE id = ${id}`);
    return [rows];
}

async function getAllExaminations(offset, limit) {
    const [rows] = await dbPool.query(`SELECT * 
                                       FROM examinations
                                       LIMIT ${limit}
                                       OFFSET ${offset}`);
    return [rows];
}

async function updateExamination(id, name) {
    await dbPool.query(`UPDATE examinations 
                        SET name ="${name}"
                        WHERE id = ${id}`);
}

async function getExaminationByKeyword(offset, limit, keywords) {
    const [rows] = await dbPool.query(`SELECT * 
                                       FROM examinations
                                       WHERE MATCH(name)
                                       AGAINST('+${keywords}*' IN boolean MODE)
                                       LIMIT ${limit}
                                       OFFSET ${offset}`);
    return [rows];
}

async function deleteExaminationById(id) {
    await dbPool.query(`DELETE FROM examinations 
                        WHERE id = ${id}`);
}

module.exports = {
    getExaminationById,
    createExamination,
    getExaminationByName,
    getAllExaminations,
    updateExamination,
    deleteExaminationById,
    getExaminationByKeyword
};
