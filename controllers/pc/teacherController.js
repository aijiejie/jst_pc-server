const {execSQL} = require("../../tools/DBTool");

function getTeacher(cb) {
    execSQL("select * FROM t_teachers WHERE is_star=1 ORDER BY id DESC LIMIT 10;", cb)
}

function allTeachers(star = "%", kw = "%", page = "%", n, cb) {
    execSQL(`select * from (select * from( SELECT t_teachers.id,teacher_name,teacher_avatar,teacher_intro,is_star,COUNT(t_courses.teacher_id) as teacher_courses from t_teachers LEFT JOIN t_courses on t_courses.teacher_id=t_teachers.id where is_star like '%${star}%' GROUP BY t_teachers.id) AS ss where teacher_name like '%${kw}%') as pp limit ${n * (page - 1)},${n};`, cb);
}

function teacherNum(star, kw, cb) {
    execSQL(`select count(*) as num from (select * from( SELECT t_teachers.id,teacher_name,teacher_avatar,teacher_intro,is_star,COUNT(t_courses.teacher_id) as teacher_courses from t_teachers LEFT JOIN t_courses on t_courses.teacher_id=t_teachers.id where is_star like '%${star}%' GROUP BY t_teachers.id) AS ss where teacher_name like '%${kw}%') as nn;`, cb);
}

function getCategory(cb) {
    execSQL('SELECT * from t_category where category_type = "teachers";', cb);
}

function getParentID(c, cb) {
    let sql = 'select parent_id from t_category where id=' + c + ';';
    execSQL(sql, (results) => {
            cb(results)
        }
    );
}

function getChildren(c1, cb) {
    let sql = "";
    if (parseInt(c1) === 0) {
        sql = `select * from t_category where parent_id != 0 and category_type="teachers"`;
    } else {
        sql = 'select * from t_category where category_type="teachers" and parent_id = ' + c1;
    }
    execSQL(sql, (results) => {
        cb(results)
    })
}

function getCount(kw, c1, c2, star, cb) {
    let sql = "";
    if (parseInt(c1) === 0 && parseInt(c2) === 0) {
        sql = `select count(*) as count from t_teachers where teacher_name like "%${kw}%"`;
    } else {
        if (parseInt(c2) === 0) {
            sql = `select count(*) as count from t_teachers inner join t_category 
                on t_teachers.category_id = t_category.id 
                where t_category.parent_id = ${c1}
                and teacher_name like "%${kw}%"`
        } else {
            sql = `select count(*) as count from t_teachers 
                   where t_teachers.category_id = ${c2}
                   and teacher_name like "%` + kw + `%"`
        }
    }

    if (parseInt(star) !== -1) {
        sql = sql + " and is_star=" + star;
    }

    execSQL(sql, (results) => {
        cb(sql, results)
    })
}

function getTeachersPage(c1, c2, number, page, kw, star, cb) {
    let sql = "";
    if (parseInt(c1) === 0 && parseInt(c2) === 0) {
        sql = `select * from t_teachers where teacher_name like "%${kw}%"`;
    } else {
        if (parseInt(c2) === 0) {
            sql = `select * from t_teachers inner join t_category 
                on t_teachers.category_id = t_category.id 
                where t_category.parent_id = ${c1} and teacher_name like "%${kw}%"`;
        } else {
            sql = `select * from t_teachers 
                   where t_teachers.category_id = ${c2} and teacher_name like "%${kw}%"`;
        }
    }
    if (parseInt(star) !== -1) {
        sql = sql + " and is_star=" + star;
    }
    sql = sql +  " limit " + number * (page - 1) + ', ' + number;

    execSQL(sql, (results) => {
            cb(sql, results)
        }
    );
}

module.exports = {
    getTeacher,
    allTeachers,
    teacherNum,
    getCategory,
    getParentID,
    getChildren,
    getCount,
    getTeachersPage
};