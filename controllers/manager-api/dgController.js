const dbTool = require("../../tools/DBTool");
const {ResultTemp} = require("../../tools/functions");

function getDGWithCourseID(course_id, callBack) {
    let sql = `select id, title from t_dg where course_id=?`;
    dbTool.execSQL_escape(sql, [course_id], function (dgs) {
        if (dgs.length > 0) {
            callBack(ResultTemp(0, "获取大纲成功", dgs))
        } else {
            callBack(ResultTemp(0, "数据为空", dgs))
        }
    })
};

function addDG(title, course_id, callBack) {
    // console.log(title, course_id);
    let sql = `insert into t_dg (title, course_id) values (?, ?);`;
    // console.log(sql);
    dbTool.execSQL_escape(sql, [title, course_id], function (result) {
        if (result.affectedRows > 0) {
            callBack(ResultTemp(0, "新增大纲成功", {id: result.insertId}))
        } else {
            callBack(ResultTemp(1, "新增大纲失败", {}))
        }
    })
}

function deleteDG(dg_id, callBack) {
    let sql = `delete from t_dg where id = ?`;
    dbTool.execSQL_escape(sql, [dg_id], function (result) {
        if (result.affectedRows > 0) {
            callBack(ResultTemp(0, "删除大纲成功", {dg_id}))
        } else {
            callBack(ResultTemp(0, "记录不存在", {dg_id}))
        }
    })
}

module.exports = {
    getDGWithCourseID,
    addDG,
    deleteDG,
};
