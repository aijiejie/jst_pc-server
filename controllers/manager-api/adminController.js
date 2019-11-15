const dbTool = require("../../tools/DBTool");
const {ResultTemp} = require("../../tools/functions");

function checkLogin(account, password, callBack) {
    let sql = `select account, name from t_admin where account=? and password=?`;
    dbTool.execSQL_escape(sql, [account, password], function (result) {
        if (result.length > 0) {
            callBack(ResultTemp(0, "登录成功", result[0]))
        } else {
            callBack(ResultTemp(1, "用户名或密码错误", {}))
        }
    })
}

module.exports = {
    checkLogin
};
