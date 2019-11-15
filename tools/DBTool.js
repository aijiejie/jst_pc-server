const mysql = require("mysql");
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '123456',
    database: 'yst-1106'
});

function execSQL(sql, cb) {
    pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        cb(results)
    })
}

function execSQL_promise(sql) {
    return new Promise(resolve => {
        pool.query(sql, function (error, results, fields) {
            if (error) throw error;
            resolve(results, fields);
        });
    })
}

function execSQL_escape(sql, params, callBack) {
    pool.query(sql, params, function (error, results, fields) {
        if (error) throw error;
        callBack(results, fields);
    });
}

module.exports = {
    execSQL,
    execSQL_escape,
    execSQL_promise
};