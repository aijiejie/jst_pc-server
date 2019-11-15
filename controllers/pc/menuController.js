const {execSQL} = require("../../tools/DBTool");

function getMenu(cb) {
    execSQL("select * from t_menus", (result) => {
        cb(result)
    })
}

// 获取热词、关键词
function getKeywords(cb) {
    execSQL("select * from t_keywords",(results_keyword)=>{
        cb(results_keyword)
        // console.log(results_keyword);
    })
}

function getNavMenuTeachers(cb) {
    let execSQL_async = (sql) => {
        return new Promise((resolve, reject) => {
            execSQL(sql, (children) => {
                resolve(children);
            })
        })
    };

    execSQL(`SELECT * FROM t_category WHERE parent_id=0 and category_type="teachers"`, async (results) => {
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            let sql = "select * from t_category where parent_id = " + result.id;
            let children = await execSQL_async(sql);
            result.children = children;
        }
        cb(results);
    });
}

function getNavMenuCourses(cb) {
    let execSQL_async = (sql) => {
        return new Promise((resolve, reject) => {
            execSQL(sql, (children) => {
                resolve(children);
            })
        })
    };

    execSQL(`SELECT * FROM t_category WHERE parent_id=0 and category_type="courses"`, async (results) => {
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            let sql = "select * from t_category where parent_id = " + result.id;
            let children = await execSQL_async(sql);
            result.children = children;
        }
        cb(results);
    });
}

module.exports = {
    getMenu,
    getNavMenuTeachers,
    getNavMenuCourses,
    getKeywords
};
