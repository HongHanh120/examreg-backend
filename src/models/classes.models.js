const dbPool = require("../db");

async function createClass(class_code, examination_id, subject_code) {
    await dbPool.query(`INSERT INTO classes ( class_code, examination_id, subject_code) 
                            VALUES ( ${class_code}, ${examination_id}, "${subject_code}");`);

}

async function verifyExistedClass(class_code, examination_id, subject_code) {
    const [rows] = await dbPool.query(`SELECT * FROM classes
                                            WHERE class_code = ${class_code}
                                            AND examination_id = ${examination_id}
                                            AND subject_code = "${subject_code}"`);
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

async function updateClass(id, class_code, subject_code) {
    await dbPool.query(`UPDATE classes
                        SET class_code = ${class_code},
                            subject_code = "${subject_code}"
                        WHERE id = ${id}`);
}

async function getClassByKeyWord(examination_id, keywords) {
    const [rows] = await dbPool.query(`SELECT subjects.name, subjects.subject_code, classes.class_code, classes.examination_id
                                       FROM classes
                                       INNER JOIN subjects ON classes.subject_code = subjects.subject_code
                                       WHERE MATCH(subjects.name) AGAINST('+${keywords}*' IN boolean MODE)
                                       OR MATCH(subjects.subject_code) AGAINST('+${keywords}*' IN boolean MODE)`);
    return [rows];
}

async function getId(class_code, subject_code) {
    const [rows] = await dbPool.query(`SELECT id
                                            FROM classes
                                            WHERE class_code = ${class_code} AND subject_code = "${subject_code}"`);
    return [rows];
}

async function checkSubject(subject_code, examination_id) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM classes
                                            WHERE subject_code = "${subject_code}"
                                            AND examination_id = ${examination_id}`);
    return [rows];
}

module.exports = {
    createClass,
    getClassById,
    getAllClass,
    updateClass,
    verifyExistedClass,
    deleteClassById,
    getClassByKeyWord,
    getId,
    checkSubject
};
