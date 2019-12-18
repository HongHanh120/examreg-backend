const dbPool = require('../db');
const config = require('config');

async function deleteClassbyId(id) {
    await dbPool.query(`DELETE
                            FROM classes 
                            WHERE 
                            id="${id}"`);
}

async function updateClass(id, class_code, examination_id, subject_id) {
    await dbPool.query(`UPDATE classes
                            SET
                            class_code="${class_code}",
                            examination_id="${examination_id}",
                            subject_id="${subject_id}"
                            WHERE
                            id = "${id}"
                            `);
}

async function createClass(class_code, examination_id, subject_id) {
    console.log(`INSERT INTO classes ( class_code, examination_id, subject_id) 
                            VALUES ( "${class_code}", "${examination_id}", "${subject_id}");`);
    await dbPool.query(`INSERT INTO classes ( class_code, examination_id, subject_id) 
                            VALUES ( "${class_code}", "${examination_id}", "${subject_id}");`);

}

async function getClassbyClass_code(class_code) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM classes
                                         WHERE class_code = "${class_code}"`);
    return [rows];
}

async function getClassbyid(id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM classes
                                         WHERE id = "${id}"`);
    return [rows];
}

async function getAllClass() {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM classes
                                         `);
    return [rows];
}

async function getClassbyKeyWord(keywords) {

    const [rows] = await dbPool.query(`SELECT * 
                                             FROM classes
                                             where MATCH(name)
                                             AGAINST('+${keywords}*' IN boolean MODE)
                                             limit 6`);
    return [rows];
}

module.exports = {
    deleteClassbyId,
    createClass,
    getClassbyClass_code,
    getClassbyid,
    getAllClass,
    updateClass,
    getClassbyKeyWord
};