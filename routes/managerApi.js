const express = require('express');
const adminController = require("../controllers/manager-api/adminController");
const teacherController = require("../controllers/manager-api/teacherController");
const categoryController = require("../controllers/manager-api/categoryController");
const courseController = require("../controllers/manager-api/courseController");
const commentController = require("../controllers/manager-api/commentController");
const dgController = require("../controllers/manager-api/dgController");
const {teacher_up, course_up} = require("../controllers/manager-api/uploadImg");
const router = express.Router();
const {ResultTemp} = require("../tools/functions");

// 1. 登录接口
router.post('/check_login', function (req, res, next) {
    let account = req.body.account;
    let password = req.body.password;
    adminController.checkLogin(account, password, (result) => {
        res.send(result);
    })
});

// 2.1 讲师接口
router.get('/get_all_teacher', function (req, res, next) {
    teacherController.getAllTeacher((result) => {
        res.send(result)
    })
});

// 2.2 上传讲师头像
router.post('/upload_teacher_img', teacher_up.single('file'), function (req, res, next) {
    res.send({
        status: 0,
        msg: "头像上传成功",
        data: {
            name: "assets/images/teacher_avatars/" + req.file.filename,
        }
    })
});

// 2.3 讲师信息新增
router.post('/add_teacher', function (req, res, next) {
    const {teacher_name, teacher_avatar, teacher_intro, is_star} = req.body;
    teacherController.addTeacher(teacher_name, teacher_avatar, teacher_intro, is_star, result => {
        res.send(result);
    })
});

// 更新讲师
router.post('/update_teacher', function (req, res, next) {
    const {id, teacher_name, teacher_avatar, teacher_intro, is_star} = req.body;
    teacherController.updateTeacher(id, teacher_name, teacher_avatar, teacher_intro, is_star, result => {
        res.send(result);
    })
});

// 删除讲师
router.post('/delete_teacher', function (req, res, next) {
    const {id} = req.body;
    teacherController.deleteTeacher(id, result => {
        res.send(result);
    })
});

// 获取课程分类
router.get("/get_category", (req, resp, next) => {
    const parent_id = req.query.parent_id || 0;
    const category_type = "courses";
    categoryController.getCategoryWithParentID(parent_id, category_type, (result) => {
        resp.send(result);
    })
});

// 删除分类
router.get("/delete_category", (req, resp, next) => {
    const {id} = req.query;
    if (!id) {
        resp.send(ResultTemp(1, "请输入id", {}))
        return;
    }
    categoryController.deleteCategoryWithID(id, (result) => {
        resp.send(result);
    })
});

// 新增分类
router.post("/add_category", (req, resp, next) => {
    const {parent_id, category_name} = req.body;
    const category_type = "courses";
    categoryController.addCategory(category_name, parent_id, category_type, (result) => {
        resp.send(result);
    })
});

// 编辑分类
router.post("/update_category", (req, resp, next) => {
    const {id, parent_id, category_name} = req.body;
    categoryController.updateCategory(id, category_name, parent_id, (result) => {
        resp.send(result);
    })
});

// 获取分类+课程个数
router.get("/category_course_count", (req, resp, next) => {
    categoryController.getCategoryCourseCount((result) => {
        resp.send(result);
    })
});


// ----------课程相关接口-----------
// 分页获取课程
router.get("/course_list", (req, resp, next) => {
    let pageNum = req.query.page_num || 1;
    let pageSize = req.query.page_size || 4;
    courseController.getAllCourse(pageNum, pageSize, result => {
        resp.send(result);
    })
});

// 课程所属讲师列表获取
router.get("/short_teacher_list", (req, resp, next) => {
    teacherController.getShortTeacher(result => {
        resp.send(result);
    })
});

// 课程所属分类列表获取
router.get("/short_category_list", (req, resp, next) => {
    categoryController.getShortCategory(result => {
        resp.send(result);
    })
});

// 设置/取消 为热点课程
router.get("/set_hot_course", (req, resp, next) => {
    let id = req.query.id;
    let excellent_course = req.query.excellent_course || 0;
    courseController.setHotCourse(id, excellent_course, result => {
        resp.send(result);
    })
});

// 设置/取消 为焦点课程
router.get("/set_focus_course", (req, resp, next) => {
    let id = req.query.id;
    let is_focus = req.query.is_focus || 0;
    courseController.setFocusCourse(id, is_focus, result => {
        resp.send(result);
    })
});

// 删除课程
router.get("/delete_course", (req, resp, next) => {
    let id = req.query.id;
    courseController.deleteCourse(id, result => {
        resp.send(result);
    })
});

// 获取评论信息
router.get("/get_comments", (req, resp, next) => {
    let course_id = req.query.course_id;
    commentController.getCommentsWithCourseID(course_id, result => {
        resp.send(result);
    })
});

// 获取大纲数据
router.get("/get_dgs", (req, resp, next) => {
    let course_id = req.query.course_id;
    dgController.getDGWithCourseID(course_id, result => {
        resp.send(result);
    })
});

// 删除大纲-id
router.get("/delete_dg", (req, resp, next) => {
    let id = req.query.id;
    dgController.deleteDG(id, result => {
        resp.send(result);
    })
});

// 添加大纲
router.post("/add_dg", (req, resp, next) => {
    const {title, course_id} = req.body;
    dgController.addDG(title, course_id, result => {
        resp.send(result);
    })
});

// 上传课程图片
router.post('/upload_course_img', course_up.single('file'), function (req, res, next) {
    res.send({
        status: 0,
        msg: "上传课程图片成功",
        data: {
            name: "assets/images/course_images/" + req.file.filename,
        }
    })
});

// 添加课程
router.post('/add_course', function (req, res, next) {
    const {course_title, course_intro, course_img, course_goals, course_for_people, teacher_id, focus_img, category_id} = req.body;
    courseController.addCourse(course_title, course_intro, course_img, course_goals, course_for_people, teacher_id, focus_img, category_id, result => {
        res.send(result);
    })

});

// 更新课程
router.post('/update_course', function (req, res, next) {
    const {id, course_title, course_intro, course_img, course_goals, course_for_people, teacher_id, focus_img, category_id} = req.body;
    courseController.updateCourse(id, course_title, course_intro, course_img, course_goals, course_for_people, teacher_id, focus_img, category_id, result => {
        res.send(result);
    })

});

module.exports = router;