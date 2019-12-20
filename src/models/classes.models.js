const dbPool = require("../db");

async function createClass(class_code, examination_id, subject_id) {
    await dbPool.query(`INSERT INTO classes ( class_code, examination_id, subject_id) 
                            VALUES ( ${class_code}, ${examination_id}, ${subject_id});`);

}

async function verifyExistedClass(class_code, examination_id, subject_id) {
    const [rows] = await dbPool.query(`SELECT * FROM classes
                                            WHERE class_code = ${class_code}
                                            AND examination_id = ${examination_id}
                                            AND subject_id = ${subject_id}`);
    return [rows];
}

async function getClassById(id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM classes
                                         WHERE id = ${id}`);
    return [rows];
}

async function getAllClass(examination_id) {
    const [rows] = await dbPool.query(`SELECT * FROM classes
                                        WHERE examination_id = ${examination_id}`);
    return [rows];
}

async function deleteClassById(id) {
    await dbPool.query(`DELETE FROM classes 
                        WHERE id = ${id}`);
}

async function updateClass(id, class_code, subject_id) {
    await dbPool.query(`UPDATE classes
                        SET class_code = ${class_code},
                            subject_id = ${subject_id}
                        WHERE id = ${id}`);
}

async function getClassByKeyWord(keywords) {
    const [rows] = await dbPool.query(`SELECT subjects.name, subjects.subject_code, classes.class_code, classes.examination_id
                                       FROM classes
                                       INNER JOIN subjects ON classes.subject_id = subjects.id
                                       WHERE MATCH(subjects.name) AGAINST('+${keywords}*' IN boolean MODE)
                                       OR MATCH(subjects.subject_code) AGAINST('+${keywords}*' IN boolean MODE)
                                       LIMIT 10`);
    return [rows];
}

module.exports = {
    createClass,
    getClassById,
    getAllClass,
    updateClass,
    verifyExistedClass,
    deleteClassById,
    getClassByKeyWord
};
