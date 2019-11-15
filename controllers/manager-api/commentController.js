const dbTool = require("../../tools/DBTool");
const {ResultTemp} = require("../../tools/functions");

function getCommentsWithCourseID(course_id, callBack) {
    let sql = `select id, comment,score,insert_time from t_comments where course_id=?`;
    dbTool.execSQL_escape(sql, [course_id], function (comments) {
        let count_sql = "select count(*) as comment_count, avg(score) as avg_score from t_comments where course_id=?";
        dbTool.execSQL_escape(count_sql, [course_id], count_result => {
            callBack(ResultTemp(0, "获取课程成功", {
                comment_count: count_result[0].comment_count,
                avg_score: count_result[0].avg_score,
                comments: comments
            }))
        })
    })
}

module.exports = {
    getCommentsWithCourseID
};