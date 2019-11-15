const {execSQL} = require('../../tools/DBTool.js');


//取出讲师信息
function getTeacherInfo(id, cb) {
    execSQL('SELECT * FROM t_teachers WHERE id=' + id + ';', (results) => {
        cb(results)
    })

    /*  execSQL('SELECT * FROM t_teachers WHERE id=1;',cb);*/
}

//取出讲师的课程列表
function getTeacherCourse(id, cb) {
    execSQL('SELECT a.* FROM t_courses a,t_teachers b WHERE b.id=' + id + ' AND a.teacher_id=b.id;', (results) => {
        cb(results)
    })
}

function getCourseScore(id, cb) {
    let sql = 'SELECT c.id,c.teacher_name,a.course_title,b.comment,ROUND(AVG(b.score),1) as avgScore FROM t_courses a,t_comments b,t_teachers c WHERE c.id=' + id + ' AND b.course_id=a.id AND c.id=a.teacher_id GROUP BY a.id;';
    execSQL(sql, (results) => {
        cb(sql, results);
    })
}

module.exports = {
    getTeacherInfo,
    getTeacherCourse,
    getCourseScore
}