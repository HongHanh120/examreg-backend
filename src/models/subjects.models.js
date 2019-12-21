const dbPool = require("../db");
const config = require("config");

async function deleteSubjectById(id) {
    await dbPool.query(`DELETE FROM subjects 
                        WHERE id = ${id}`);
}

async function updateSubject(id, name, subject_code, credit) {
    await dbPool.query(`UPDATE subjects 
                        SET name = "${name}",
                            subject_code = "${subject_code}",
                            credit = ${credit}
                        WHERE id = ${id}`);
}

async function createSubject(name, subject_code, credit) {
    await dbPool.query(`INSERT INTO subjects (name, subject_code, credit) 
                        VALUES ("${name}", "${subject_code}", ${credit})`);

}

async function getSubjectByCourseCode(subject_code) {
    const [rows] = await dbPool.query(`SELECT * 
                                       FROM subjects
                                       WHERE subject_code = "${subject_code}"`);
    return [rows];
}

async function getSubjectById(id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM subjects
                                         WHERE id = ${id}`);
    return [rows];
}

async function getAllSubjects() {
    const [rows] = await dbPool.query(`SELECT * 
                                       FROM subjects`);
    return [rows];
}

async function getSubjectByKeyword(keywords) {

    const [rows] = await dbPool.query(`SELECT subjects.name, subjects.subject_code 
                                       FROM subjects
                                       WHERE MATCH(name) AGAINST('+${keywords}*' IN boolean MODE)
                                       OR MATCH(subject_code) AGAINST('+${keywords}*' IN boolean MODE)
                                       LIMIT 10`);
    return [rows];
}

module.exports = {
    deleteSubjectById,
    updateSubject,
    createSubject,
    getSubjectByCourseCode,
    getAllSubjects,
    getSubjectById,
    getSubjectByKeyword
};
