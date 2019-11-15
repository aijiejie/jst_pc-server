const dbTool = require("../../tools/DBTool");
const {ResultTemp} = require("../../tools/functions");

function getShortCategory(callBack) {
    let sql = `select id, category_name from t_category where category_type = "courses"`;
    dbTool.execSQL(sql, function (result) {
        if (result.length > 0) {
            callBack(ResultTemp(0, "所属分类获取成功", result))
        } else {
            callBack(ResultTemp(0, "无数据", result))
        }
    })
}

function getCategoryWithParentID(parent_id, category_type, callBack) {
    let sql = `select * from t_category where category_type = "${category_type}" and parent_id=${parent_id}`;
    dbTool.execSQL(sql, function (result) {
        if (result.length > 0) {
            callBack(ResultTemp(0, "获取分类成功", result))
        } else {
            callBack(ResultTemp(0, "无数据", result))
        }
    })
}

function deleteCategoryWithID(id, callBack) {
    let sql = `delete from t_category where id=${id};`;
    dbTool.execSQL(sql, function (result) {
        if (result.affectedRows > 0) {
            callBack(ResultTemp(0, "删除成功", {id}))
        } else {
            callBack(ResultTemp(0, "该记录不存在", {id}))
        }
    })
}

function addCategory(category_name, parent_id, category_type, callBack) {
    let sql = `insert into t_category (category_name, parent_id, category_type) values (?, ?, ?);`;
    dbTool.execSQL_escape(sql, [category_name, parent_id, category_type], function (result) {
        if (result.affectedRows > 0) {
            callBack(ResultTemp(0, "新增分类成功", {id: result.insertId}))
        } else {
            callBack(ResultTemp(1, "新增分类失败", {}))
        }
    })
}

function updateCategory(id, category_name, parent_id, callBack) {
    let sql = `update t_category set category_name=?, parent_id=? where id=?`;
    dbTool.execSQL_escape(sql, [category_name, parent_id, id], function (result) {
        if (result.affectedRows > 0) {
            callBack(ResultTemp(0, "修改成功", {id}))
        } else {
            callBack(ResultTemp(1, "修改失败", {id}))
        }
    })
}

function getCategoryCourseCount(callBack) {
    let sql = "select t_category.category_name, count(t_courses.id) as course_count " +
        "from t_category left join t_courses on t_courses.category_id=t_category.id where t_category.category_type =" + ' "courses" ' +
        "group by t_category.id ";
    dbTool.execSQL(sql, (result) => {
        if (result.length > 0) {
            callBack(ResultTemp(0, "获取数据成功", result))
        } else {
            callBack(ResultTemp(0, "无数据", result))
        }
    })
}

module.exports = {
    getCategoryWithParentID,
    deleteCategoryWithID,
    addCategory,
    updateCategory,
    getShortCategory,
    getCategoryCourseCount
};