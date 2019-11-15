const {execSQL} = require("../../tools/DBTool");

function getNewsDetail(id, cb) {
    execSQL("select * from t_news where id=" + id + ";", (results) => {
        cb(results)
    })
}

function getNewsAll(kw, cb) {
    let sql = 'select * from t_news where news_title like "%' + kw + '%" order by news_time desc';
    // cb(sql);
    execSQL(sql, (results) => {
            cb(results)
        }
    );
}

module.exports = {
    getNewsDetail,
    getNewsAll
};