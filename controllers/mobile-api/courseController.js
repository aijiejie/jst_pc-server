const dbTool = require("../../tools/dbTool");

/**
 * 焦点课程
 * @param callBack
 */
function getFocusCourse(callBack) {
    let sql = "select id,course_title,focus_img from t_courses where is_focus=1 limit 5;";
    dbTool.execSQL(sql, function (result) {
        callBack(result)
    })
}

/**
 * 热门课程
 * @param callBack
 */
function getHotCourse(callBack) {
    let sql = `
        SELECT 
        a.id as course_id, 
        course_title,
        course_img,
        course_hour,
        excellent_course,
        teacher_name ,
        COUNT(c.score) as com_count , 
        IFNULL(AVG(c.score),0) as com_avg 
        FROM t_courses a LEFT JOIN t_teachers b 
        ON a.teacher_id=b.id 
        LEFT JOIN t_comments c
        ON c.course_id=a.id 
        WHERE a.excellent_course=1 GROUP BY a.id
    `;
    dbTool.execSQL(sql, function (result) {
        callBack(result)
    })
}

/**
 * 获取所有课程
 * @param kw
 * @param categoryID
 * @param callBack
 */
function getAllCourse(kw = "%", categoryID = 0, callBack) {
    let categoryStr = categoryID == 0 ? "" : " and category_id=" + categoryID;
    // console.log(sql);
    let sql = `select 
        t_courses.id as course_id, 
        course_title,
        course_img, 
        course_intro,
        excellent_course, 
        is_focus, 
        category_id,
        COUNT(t_comments.score) as com_count , 
        IFNULL(AVG(t_comments.score),0) as com_avg 
        from t_courses left JOIN t_comments 
        on t_comments.course_id=t_courses.id 
        where course_title like '%` + kw + `%'` + categoryStr + ` GROUP BY t_courses.id`;
    dbTool.execSQL(sql, function (result) {
        callBack(result)
    })
}

function getCourseWithID(id, callBack) {
    let sql = "select t_courses.id, course_title, course_intro, course_img, course_goals, course_for_people, t_courses.category_id, category_name, teacher_id,teacher_name, teacher_avatar, teacher_intro, COUNT(score) as com_count, avg(score) as com_score from t_courses left join t_teachers on t_teachers.id = t_courses.teacher_id left JOIN t_comments on t_comments.course_id = t_courses.id LEFT JOIN t_category on t_category.id=t_courses.category_id where t_courses.id = " + id;
    dbTool.execSQL(sql, function (result) {
        if (result.length > 0) {
            let course = result[0];
            let sql2 = "select id, comment, score, DATE_FORMAT(insert_time,'%Y-%m-%d %H:%i:%s') as insert_time from t_comments where course_id="+id + " order by insert_time desc";
            dbTool.execSQL(sql2, function (comments) {
                course.comments = comments;
                let sql3 = "select * from t_dg where course_id="+id;
                dbTool.execSQL(sql3, function (dgs) {
                    course.dgs = dgs;
                    callBack(course);
                })
            })
        }
    })
}

module.exports = {
    getFocusCourse,
    getHotCourse,
    getAllCourse,
    getCourseWithID
};
