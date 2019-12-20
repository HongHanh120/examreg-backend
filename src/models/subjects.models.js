const dbPool = require("../db");
const config = require("config");

async function deleteSubjectbyid(id) {
    await dbPool.query(`DELETE
                            FROM subjects 
                            WHERE 
                            id="${id}"`);
}

async function updateSubject(id, name, course_code, credit) {
    await dbPool.query(`UPDATE subjects 
                            SET 
                            name="${name}",
                            course_code="${course_code}",
                            credit="${credit}"
                            WHERE 
                            id = "${id}"
                            `);
}

async function createSubject(name, course_code, credit) {
    await dbPool.query(`INSERT INTO subjects (name, course_code, credit) 
                               VALUES ("${name}", "${course_code}", ${credit});`);

}

async function getSubjectbycourse_code(course_code) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM subjects
                                         WHERE course_code = "${course_code}"`);
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
                                         FROM subjects
                                         `);
    return [rows];
}

async function getSubjectbyKeyWord(keywords) {

    const [rows] = await dbPool.query(`SELECT * 
                                             FROM subjects
                                             where MATCH(name)
                                             AGAINST('+${keywords}*' IN boolean MODE)
                                             limit 6`);
    return [rows];
}

module.exports = {
    // deleteSubjectbyid,
    // updateSubject,
    // createSubject,
    // getSubjectbycourse_code,
    // getAllSubjects,
    getSubjectById,
    // getSubjectbyKeyWord
};
