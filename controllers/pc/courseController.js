const {execSQL} = require("../../tools/DBTool");

function getNavCourse(cb) {
    execSQL("select id,course_title,focus_img from t_courses where is_focus=1 limit 5", cb);
}

function getExcellentCourse(cb) {
    execSQL("SELECT a.id as id, course_title,course_img,course_hour,excellent_course,teacher_name from t_courses a LEFT JOIN t_teachers b ON a.teacher_id=b.id where a.excellent_course=1 limit 8;", cb)
}

function getDetailCourse(cb) {
    execSQL("select t_courses.id,course_title,course_img,count(t_comments.id)as comment_count ,teacher_intro,course_goals,course_for_people,content_img, IFNULL(AVG(t_comments.score),0) as avg_score,t_category.category_name, t_teachers.id as teacher_id,t_teachers.teacher_name,t_teachers.teacher_avatar from t_courses LEFT JOIN t_comments on t_comments.course_id = t_courses.id LEFT JOIN t_category on t_courses.category_id= t_category.id LEFT JOIN t_teachers on t_courses.teacher_id = t_teachers.id GROUP BY t_courses.id;", cb);
}

function getComments(cb) {
    execSQL("SELECT * from t_comments ORDER BY insert_time DESC;", cb);
}

function getOutline(cb) {
    execSQL("SELECT * from t_dg;", cb);
}

function insertComments(content, id, time, cb) {
    execSQL(`INSERT INTO t_comments (comment,score,course_id,insert_time) values ("${content}",1,${id},"${time}");`, cb);
}

function getPageComments(id, cb) {
    execSQL(`SELECT count(*)as num  from t_comments WHERE course_id=${id};`, cb);
}

function getCategory(cb) {
    execSQL('SELECT * from t_category where category_type = "courses";', cb);
}

function getCount(kw, c1, c2, cb) {
    c1 = parseInt(c1);
    c2 = parseInt(c2);
    let sql = "";

    if (c1 === 0 && c2 === 0) {
        sql = `select count(*) as count from t_courses where course_title like "%${kw}%"`;
    } else if (c1 !== 0 && c2 === 0) {
        sql = `select count(*) as count 
                from t_courses inner join t_category 
                on t_courses.category_id = t_category.id 
                where t_category.parent_id = ${c1}
                and course_title like "%${kw}%"`
    } else {
        sql = `select count(*) as count from t_courses 
                   where t_courses.category_id = ${c2}
                   and course_title like "%${kw}%"`
    }

    execSQL(sql, (results) => {
        cb(sql, results)
    })
}

function getCoursesPage(c1, c2, number, page, kw, cb) {
    let sql = "";
    if (parseInt(c1) === 0 && parseInt(c2) === 0) {
        sql = `select * from t_courses where course_title like "%` + kw + `%" limit `
            + number * (page - 1) + ', ' + number;
    } else {
        if (parseInt(c2) === 0) {
            sql = `select * from t_courses inner join t_category 
                on t_courses.category_id = t_category.id 
                where t_category.parent_id = ${c1}
                and course_title like "%${kw}%" limit `
                + number * (page - 1) + ', ' + number;
        } else {
            sql = `select * from t_courses 
                   where t_courses.category_id = ${c2}
                   and course_title like "%` + kw + `%" limit `
                + number * (page - 1) + ', ' + number;
        }
    }
    execSQL(sql, (results) => {
            cb(sql, results)
        }
    );
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
        sql = `select * from t_category where parent_id != 0 and category_type="courses"`;
    } else {
        sql = 'select * from t_category where category_type="courses" and parent_id = ' + c1;
    }
    execSQL(sql, (results) => {
        cb(results)
    })
}

function getC1CoursesPage(c1, number, page, kw, cb) {
    let sql = 'select * from t_courses where course_title like "%' + kw + '%" limit '
        + number * (page - 1) + ', ' + number;
    if (parseInt(c1) !== 0) {
        sql = `select * from t_courses inner join t_category 
                on t_courses.category_id = t_category.id 
                where t_category.parent_id = ${c1}
                and course_title like "%${kw}%"
                limit ` + number * (page - 1) + `,` + number;
    }
    execSQL(sql, (results) => {
        cb(sql, results)
    })
}

module.exports = {
    getNavCourse,
    getExcellentCourse,
    getDetailCourse,
    getComments,
    getOutline,
    insertComments,
    getPageComments,
    getCategory,
    getCount,
    getCoursesPage,
    getParentID,
    getChildren,
    getC1CoursesPage
};