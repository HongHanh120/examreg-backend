const dbPool = require("../db");

async function verifyDuplication(student_code, class_code_id, examination_id) {
    const [rows] = await dbPool.query(`SELECT * FROM classes_students
                                       INNER JOIN classes ON classes_students.class_code_id = classes.id
                                       WHERE classes_students.class_code_id = ${class_code_id}
                                       AND classes.examination_id = ${examination_id}
                                       AND classes_students.student_code = ${student_code}`);
    return [rows];
}

async function create(student_code, class_code_id, eligibility, account_id) {
    await dbPool.query(`INSERT INTO classes_students(student_code, class_code_id, eligibility, account_id)
                            VALUES(${student_code}, ${class_code_id}, ${eligibility}, ${account_id})`);
}

async function checkSubjectCode(student_code, subject_code, examination_id) {
    const [rows] = await dbPool.query(`SELECT * FROM classes_students
                            INNER JOIN classes ON classes_students.class_code_id = classes.id
                            WHERE classes_students.student_code = ${student_code}
                            AND classes.subject_code = "${subject_code}"
                            AND classes.examination_id = ${examination_id}`);
    return [rows];
}

async function getStudentById(id) {
    const [rows] = await dbPool.query(`SELECT *
                                            FROM classes_students
                                            WHERE id = ${id}`);
    return [rows];
}

module.exports = {
    verifyDuplication,
    create,
    checkSubjectCode,
    getStudentById
};
