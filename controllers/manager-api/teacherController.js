const dbTool = require("../../tools/DBTool");
const {ResultTemp} = require("../../tools/functions");

function getShortTeacher(callBack) {
    let sql = "select id, teacher_name from t_teachers";
    dbTool.execSQL(sql, function (result) {
        if (result.length > 0) {
            callBack(ResultTemp(0, "所属讲师获取成功", result))
        } else {
            ResultTemp(0, "无数据", result)
        }
    })
}

function getAllTeacher(callBack) {
    let sql = "select id, teacher_name, teacher_avatar, teacher_intro, is_star from t_teachers";
    dbTool.execSQL(sql, function (result) {
        callBack(ResultTemp(0, "获取列表成功", result))
    })
}

function addTeacher(teacher_name, teacher_avatar, teacher_intro, is_star, cb) {
    let sql = "insert into t_teachers (teacher_name, teacher_avatar, teacher_intro, is_star) values (?, ?, ?, ?);"
    dbTool.execSQL_escape(sql, [teacher_name, teacher_avatar, teacher_intro, is_star], function (result) {
        if (result.affectedRows > 0) {
            cb(ResultTemp(0, "新增成功", {id: result.insertId}));
        } else {
            cb(ResultTemp(1, "新增失败", {}));
        }
    });
}

function updateTeacher(id, teacher_name, teacher_avatar, teacher_intro, is_star, cb) {
    let sql = "update t_teachers set teacher_name=?, teacher_avatar=?, teacher_intro=?, is_star=? where id=?;"
    dbTool.execSQL_escape(sql, [teacher_name, teacher_avatar, teacher_intro, is_star, id], function (result) {
        if (result.affectedRows > 0) {
            cb(ResultTemp(0, "更新成功", {id, teacher_name, teacher_avatar, teacher_intro, is_star}));
        } else {
            cb(ResultTemp(1, "更新失败", {}));
        }
    });
}

function deleteTeacher(id, cb) {
    let sql = "delete from t_teachers where id=?";
    dbTool.execSQL_escape(sql, [id], function (result) {
        if (result.affectedRows > 0) {
            cb(ResultTemp(0, "删除成功", {id}));
        } else {
            cb(ResultTemp(0, "记录不存在", {id}));
        }
    });
}

module.exports = {
    getAllTeacher,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    getShortTeacher
};
