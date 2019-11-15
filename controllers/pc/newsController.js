const {execSQL} = require("../../tools/DBTool");

function getNewsDetail(id, cb) {
    execSQL("select * from t_news where id=" + id + ";", (results) => {
        cb(results)
    })
}

function getNewsTen(cb) {
    execSQL("select * from t_news order by news_time desc limit 10;", (results) => {
        cb(results)
    })
}

function getCount(kw, cb) {
    let sql = 'select count(*) as count from t_news where news_title like "%' + kw + '%";';
    execSQL(sql, (results) => {
        cb(results)
    })
}

function getNewsPage(number, page, kw, cb) {
    let sql = 'select * from t_news where news_title like "%' + kw + '%" order by news_time desc limit '
        + number * (page - 1) + ', ' + number;
    // cb(sql);
    execSQL(sql, (results) => {
            cb(results)
        }
    );
}

module.exports = {
    getNewsDetail,
    getNewsTen,
    getCount,
    getNewsPage
};