const dbPool = require("../db");

async function deleteClassbyId(id) {
    await dbPool.query(`DELETE
                            FROM classes 
                            WHERE 
                            id="${id}"`);
}

async function updateClass(id, class_code, subject_id) {
    await dbPool.query(`UPDATE classes
                        SET class_code = "${class_code}",
                            subject_id = ${subject_id}
                        WHERE id = ${id}`);
}

async function createClass(class_code, examination_id, subject_id) {
    await dbPool.query(`INSERT INTO classes ( class_code, examination_id, subject_id) 
                            VALUES ( "${class_code}", ${examination_id}, ${subject_id});`);

}

async function verifyExistedClass(class_code, examination_id, subject_id) {
    const [rows] = await dbPool.query(`SELECT * FROM classes
                                            WHERE class_code = ${class_code}
                                            AND examination_id = ${examination_id}
                                            AND subject_id = ${subject_id}`);
    return [rows];
}

// async function getClassByClassCode(class_code, examination_id) {
//     const [rows] = await dbPool.query(`SELECT *
//                                          FROM classes
//                                          WHERE class_code = "${class_code}" AND examination_id = ${examination_id}`);
//     return [rows];
// }

async function getClassById(id, examination_id) {
    const [rows] = await dbPool.query(`SELECT * 
                                         FROM classes
                                         WHERE id = ${id} AND examination_id = ${examination_id}`);
    return [rows];
}

async function getAllClass(examination_id) {
    const [rows] = await dbPool.query(`SELECT * FROM classes
                                        WHERE examination_id = ${examination_id}`);
    return [rows];
}

async function getClassbyKeyWord(keywords) {

    const [rows] = await dbPool.query(`SELECT * 
                                             FROM classes
                                             WHERE MATCH(name)
                                             AGAINST('+${keywords}*' IN boolean MODE)
                                             LIMIT 10`);
    return [rows];
}

module.exports = {
    // deleteClassbyId,
    createClass,
    // getClassByClassCode,
    getClassById,
    getAllClass,
    updateClass,
    verifyExistedClass,
    // getClassbyKeyWord
};
