const dbTool = require("../../tools/DBTool");
const {ResultTemp} = require("../../tools/functions");

function setHotCourse(id, excellent_course, callBack) {
    let sql = `update t_courses set excellent_course=? where id=?`;
    dbTool.execSQL_escape(sql, [excellent_course, id], function (result) {
        if (result.affectedRows > 0) {
            callBack(ResultTemp(0, "重置热点课程成功", {id}))
        } else {
            callBack(ResultTemp(0, "记录不存在", {id}))
        }
    })
}

function setFocusCourse(id, is_focus, callBack) {
    let sql = `update t_courses set is_focus=? where id=?`;
    dbTool.execSQL_escape(sql, [is_focus, id], function (result) {
        if (result.affectedRows > 0) {
            callBack(ResultTemp(0, "设为焦点课程成功", {id}))
        } else {
            ResultTemp(0, "记录不存在", {id})
        }
    })
}

function deleteCourse(id, callBack) {
    let sql = `delete from t_courses where id=?`;
    dbTool.execSQL_escape(sql, [id], function (result) {
        if (result.affectedRows > 0) {
            callBack(ResultTemp(0, "删除课程成功", {id}))
        } else {
            callBack(ResultTemp(0, "记录不存在", {id}))
        }
    })
}

function getAllCourse(pageNum = 1, pageSize = 4, callBack) {
    let sql = `select * from t_courses limit ${(pageNum - 1) * pageSize}, ${pageSize}`;
    dbTool.execSQL(sql, function (courses) {
        let count_sql = "select count(*) as total_course_count from t_courses;";
        dbTool.execSQL(count_sql, count_result => {
            callBack(
                ResultTemp(0, "课程列表获取成功", {
                    total_size: count_result[0].total_course_count,
                    page_num: pageNum,
                    page_size: pageSize,
                    current_page_courses: courses
                })
            )
        });

    })
}

function addCourse(course_title, course_intro, course_img, course_goals, course_for_people, teacher_id, focus_img, category_id, callBack) {

    let sql = `insert into t_courses (course_title, course_intro, course_img, course_goals, course_for_people, teacher_id, is_focus, focus_img, excellent_course, category_id) values (?,?,?,?,?,?,?,?,?,?);`

    dbTool.execSQL_escape(sql, [course_title, course_intro, course_img, course_goals, course_for_people, teacher_id, 0, focus_img, 0, category_id], function (result) {
        if (result.affectedRows > 0) {
            callBack(ResultTemp(0, "添加课程成功!", {id: result.insertId}))
        } else {
            callBack(ResultTemp(1, "添加课程失败!", {}))
        }
    })
}

function updateCourse(id, course_title, course_intro, course_img, course_goals, course_for_people, teacher_id, focus_img, category_id, callBack) {

    let sql = `update t_courses set course_title=?, course_intro=?, course_img=?, course_goals=?, course_for_people=?, teacher_id=?, focus_img=?, category_id=? where id = ?;`

    dbTool.execSQL_escape(sql, [course_title, course_intro, course_img, course_goals, course_for_people, teacher_id, focus_img, category_id, id], function (result) {
        if (result.affectedRows > 0) {
            callBack(ResultTemp(0, "更新课程成功!", {id}))
        } else {
            callBack(ResultTemp(0, "记录不存在", {id}))
        }
    })
}

module.exports = {
    getAllCourse,
    setHotCourse,
    setFocusCourse,
    deleteCourse,
    addCourse,
    updateCourse,
};
