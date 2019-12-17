const dbPool = require('../db');
const config = require('config');

async function deleteSubject(course_codename) {
    await dbPool.query(`DELETE
                            FROM subjects 
                            WHERE 
                            course_code="${course_code}"`);
}

async function updateSubject(name,course_code,credit) {
    await dbPool.query(`UPDATE subjects 
                            SET 
                            name="${name}"
                            WHERE 
                            course_code = "${course_code}"
                            `);
}

async function createSubject(name,course_code,credit) {
    await dbPool.query(`INSERT INTO subjects (name, course_code, credit) 
                               VALUES ("${name}", "${course_code}", ${credit});`);

}

async function getSubjectbycourse_code(course_code) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM subjects
                                         WHERE course_code = "${course_code}"`);
    return [rows];
}
module.exports = {
    deleteSubject,
    updateSubject,
    createSubject,
    getSubjectbycourse_code
};