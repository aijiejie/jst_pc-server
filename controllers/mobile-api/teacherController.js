const dbTool = require("../../tools/dbTool");

/**
 * 星级讲师
 * @param kw
 * @param callBack
 */
function getStarTeacher(kw, callBack) {
    let sql = "select * from t_teachers where teacher_name like '%" + kw + "%' and is_star=1";
    // console.log(sql);
    dbTool.execSQL(sql, function (result) {
        // console.log(result);
        callBack(result)
    })
}

function getNormalTeacher(kw, callBack) {
    let sql = "select * from t_teachers where teacher_name like '%" + kw + "%' and is_star=0";
    // console.log(sql);
    dbTool.execSQL(sql,function (result) {
        callBack(result)
    })
}

function getAllTeacher(kw,callBack) {
    let sql = "select t_teachers.id, teacher_name, teacher_avatar, teacher_intro, is_star, count(t_courses.id) as course_count from t_teachers LEFT JOIN t_courses on t_courses.teacher_id = t_teachers.id " + " where teacher_name like '%" + kw + "%' " + " GROUP BY t_teachers.id";
    dbTool.execSQL(sql, function (result) {
        callBack(result)
    })
}

function getTeacherWithID(id, callBack) {
    let sql1 = "select * from t_teachers where id=" + id;
    dbTool.execSQL(sql1, function (results) {
        if (results.length > 0) {
            let teacher = results[0];
            let sql2 = "select t_courses.id as course_id, course_title,course_img, excellent_course, is_focus, COUNT(t_comments.score) as com_count , IFNULL(AVG(t_comments.score),0) as com_avg from t_courses left JOIN t_comments on t_comments.course_id=t_courses.id where teacher_id=" + id + " GROUP BY t_courses.id;";
            dbTool.execSQL(sql2, function (courses) {
                teacher.allCourse = courses;
                callBack(teacher)
            })
        }
    })
}

module.exports = {
    getStarTeacher,
    getAllTeacher,
    getNormalTeacher,
    getTeacherWithID
};