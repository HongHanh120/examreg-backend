const dbPool = require("../db");
const config = require("config");

async function deleteExambyId(id) {
    await dbPool.query(`DELETE
                            FROM examinations 
                            WHERE 
                            id="${id}"`);
}

async function updateExam(id, name) {
    await dbPool.query(`UPDATE examinations 
                            SET 
                            name="${name}"
                            WHERE 
                            id = "${id}"
                            `);
}

async function createExam(name) {
    await dbPool.query(`INSERT INTO examinations (name) VALUES ( "${name}");`);

}

async function getExambyName(name) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM examinations
                                         WHERE name = "${name}"`);
    return [rows];
}

async function getExamById(id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM examinations
                                         WHERE id = "${id}"`);
    return [rows];
}

async function getAllExam() {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM examinations
                                         `);
    return [rows];
}

async function getExambyKeyWord(keywords) {

    const [rows] = await dbPool.query(`SELECT * 
                                             FROM examinations
                                             where MATCH(name)
                                             AGAINST('+${keywords}*' IN boolean MODE)
                                             limit 6`);
    return [rows];
}

module.exports = {
    // deleteExambyId,
    // updateExam,
    // createExam,
    // getExambyName,
    getExamById,
    // getAllExam,
    // getExambyKeyWord
};
