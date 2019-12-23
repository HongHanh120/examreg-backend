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

async function getStudentsInClass(examination_id, class_code_id) {
    const [rows] = await dbPool.query(`SELECT classes_students.student_code, accounts.fullname, 
                                                   accounts.course_class, accounts.date_of_birth,
                                                   classes_students.eligibility, classes_students.class_code_id
                                            FROM classes_students
                                            INNER JOIN accounts ON classes_students.account_id = accounts.id
                                            INNER JOIN classes ON classes_students.class_code_id = classes.id
                                            WHERE classes.examination_id = ${examination_id} AND classes_students.class_code_id = ${class_code_id}`);
    return [rows];
}

async function getStudentByAccountId(account_id){
    const [rows] = await dbPool.query(`SELECT *
                                       FROM classes_students
                                       WHERE account_id = ${account_id}`);
    return [rows];
}

async function getSubject(examination_id, account_id){
    const [rows] = await dbPool.query(`SELECT subjects.*, classes_students.eligibility, classes.class_code
                                       FROM subjects
                                       INNER JOIN classes ON classes.subject_code = subjects.subject_code
                                       INNER JOIN classes_students ON classes.id = classes_students.class_code_id
                                       WHERE classes_students.account_id = ${account_id} AND classes.examination_id = ${examination_id}`);
    return [rows];
}

async function getASubject(examination_id, account_id, subject_code){
    const [rows] = await dbPool.query(`SELECT subjects.*, classes_students.eligibility, classes.class_code
                                       FROM subjects
                                       INNER JOIN classes ON classes.subject_code = subjects.subject_code
                                       INNER JOIN classes_students ON classes.id = classes_students.class_code_id
                                       WHERE classes_students.account_id = ${account_id} AND classes.examination_id = ${examination_id}
                                                AND classes.subject_code = "${subject_code}"`);
    return [rows];
}

module.exports = {
    verifyDuplication,
    create,
    checkSubjectCode,
    getStudentById,
    getStudentsInClass,
    getStudentByAccountId,
    getSubject,
    getASubject
};
