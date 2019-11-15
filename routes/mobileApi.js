const express = require('express');
const router = express.Router();
const courseController = require("../controllers/mobile-api/courseController");
const teacherController = require("../controllers/mobile-api/teacherController");
const categoryController = require("../controllers/mobile-api/categoryController");
const newsController = require("../controllers/mobile-api/newsController");
const {ResultTemp} = require("../tools/functions");

// 1. 获取首页焦点图
router.get("/focus_course", (req, resp) => {
    courseController.getFocusCourse(result => {
        resp.send(ResultTemp(0, "获取焦点图成功", result));
    })
});

// 2. 获取热门课程
router.get("/hot_course", (req, resp) => {
    courseController.getHotCourse(result => {
        resp.send(ResultTemp(0, "获取热门课程成功", result));
    })
});

// 3. 星级讲师
router.get("/star_teacher", (req, resp) => {
    let kw = req.query.kw || "";
    teacherController.getStarTeacher(kw, result => {
        resp.send(ResultTemp(0, "获取讲师成功", result));
    })
});

// 4. 所有讲师
router.get("/all_teacher", (req, resp) => {
    let kw = req.query.kw || "";
    teacherController.getAllTeacher(kw, result => {
        resp.send(ResultTemp(0, "获取讲师成功", result));
    })
});

// 5.普通讲师
router.get("/normal_teacher", (req, resp) => {
    let kw = req.query.kw || "";
    teacherController.getNormalTeacher(kw, result => {
        resp.send(ResultTemp(0, "获取讲师成功", result));
    })
});

// 6. 所有课程
router.get("/all_course", (req, resp) => {
    let cid = req.query.cid || 0;
    let kw = req.query.kw || "";
    courseController.getAllCourse(kw, cid, result => {
        resp.send(ResultTemp(0, "获取课程成功", result));
    })
});

// 7. 所有课程分类
router.get("/all_category", (req, resp) => {
    categoryController.getCategory(result => {
        resp.send(ResultTemp(0, "获取分类成功", result));
    });
});

// 8. 单个课程
router.get("/get_course/:id", (req, resp) => {
    let id = parseInt(req.params.id) || 0;
    courseController.getCourseWithID(id, result => {
        resp.send(ResultTemp(0, "获取特定课程成功", result));
    })
});

// 9. 单个老师
router.get("/get_teacher/:id", (req, resp) => {
    let id = parseInt(req.params.id) || 0;
    teacherController.getTeacherWithID(id, result => {
        resp.send(ResultTemp(0, "获取特定老师成功", result));
    })
});

// 10. 所有新闻
router.get("/all_news", (req, resp) => {
    let kw = req.query.kw || "";
    newsController.getNewsAll(kw, result => {
        resp.send(ResultTemp(0, "获取新闻成功", result));
    });
});

// 11. 单个新闻
router.get("/get_news/:id", (req, resp) => {
    let id = parseInt(req.params.id) || 0;
    newsController.getNewsDetail(id, result => {
        resp.send(ResultTemp(0, "获取特定新闻成功", result));
    })
});

module.exports = router;