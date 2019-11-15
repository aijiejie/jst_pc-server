const express = require('express');
const menuController = require("../controllers/pc/menuController");
const teacherController = require("../controllers/pc/teacherController");
const courseController = require("../controllers/pc/courseController");
const newsController = require("../controllers/pc/newsController");
const tDetail = require("../controllers/pc/tDetailController");
const router = express.Router();
const {getFormatTime, getFormatTimeNews} = require("../tools/functions");

/* 首页 */
router.get('/', function (req, res, next) {
    menuController.getMenu((menus) => {
        menuController.getNavMenuTeachers((nav_menus_teachers) => {
            menuController.getNavMenuCourses((nav_menus_courses) => {
                courseController.getNavCourse((focus_course) => {
                    courseController.getExcellentCourse((excellent_course) => {
                        teacherController.getTeacher((star_teacher) => {
                            // console.log(excellent_course);
                            newsController.getNewsTen(latestNews => {
                                menuController.getKeywords((keyWords) => {
                                    for (let i = 0; i < latestNews.length; i++) {
                                        latestNews[i].news_time = getFormatTimeNews(latestNews[i].news_time);
                                        // console.log(latestNews[i]);
                                    }
                                    res.render('index', {
                                        indexMenus: menus,
                                        navMenusTeachers: nav_menus_teachers,
                                        navMenusCourses: nav_menus_courses,
                                        current: '/',
                                        navCourses: focus_course,
                                        excellentCourses: excellent_course,
                                        starTeachers: star_teacher,
                                        latestNews: latestNews,
                                        keyWords: keyWords
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
});

/* 首页搜索 */
router.get("/search", (req, resp, next) => {
    let option = req.query.option;
    let kw = req.query.kw;
    if (option === '课程') {
        resp.redirect("/courses?option=" + option + "&kw=" + kw)
    } else {
        resp.redirect("/teachers?option=" + option + "&kw=" + kw)
    }
});

/* 课程列表页 */
router.get("/courses", (req, res, next) => {
    let c1 = req.query.c1 || "0";
    let c2 = req.query.c2 || "0";
    let kw = req.query.kw || "";
    let page = parseInt(req.query.page || "1");
    menuController.getMenu((menus) => {
        courseController.getCategory((types) => {
            courseController.getChildren(c1, (resultsChildren) => {
                courseController.getCount(kw, c1, c2, (sql, results) => {
                    courseController.getParentID(c2, (resultsParentID) => {
                        if (resultsParentID.length) {
                            c1 = resultsParentID[0].parent_id;
                        }

                        // console.log(sql);
                        // console.log(results);
                        const number = 5;
                        let coursesCount = results[0].count;
                        let pagesCount = Math.ceil(results[0].count / number);
                        courseController.getCoursesPage(c1, c2, number, page, kw, (sql, coursesPage) => {
                            // console.log(sql);
                            // console.log(coursesPage);
                            for (let i = 0; i < coursesPage.length; i++) {
                                if (coursesPage[i].course_intro.length > 66) {
                                    coursesPage[i].course_intro = coursesPage[i].course_intro.substr(0, 120) + "...";
                                }
                            }
                            res.render('courses', {
                                kw,
                                menus,
                                types,
                                coursesPage,
                                coursesCount,
                                pagesCount,
                                resultsChildren,
                                current: '/courses',
                                currentPage: page,
                                currentC1: c1,
                                currentC2: c2
                            });
                        });
                    })
                })
            })
        })
    })
});

/* 首页热词 */
router.get("/courses", (req, res, next) => {
    menuController.getMenu((menus) => {
        res.render('courses', {menus: menus, current: '/courses'});
    })
});

/* 讲师列表页 */
router.get('/teachers/', function (req, res, next) {
    let c1 = req.query.c1 || "0";
    let c2 = req.query.c2 || "0";
    let star = req.query.star || "-1";
    let kw = req.query.kw || "";
    let page = parseInt(req.query.page || "1");
    menuController.getMenu((menus) => {
        teacherController.getCategory((types) => {
            teacherController.getChildren(c1, (resultsChildren) => {
                teacherController.getCount(kw, c1, c2, star, (sql, nums) => {
                    teacherController.getParentID(c2, (resultsParentID) => {
                        if (resultsParentID.length) {
                            c1 = resultsParentID[0].parent_id;
                        }
                        // console.log(resultsParentID);
                        // console.log(sql);
                        const number = 10;
                        let teachersCount = nums[0].count;
                        let pageN = Math.ceil(nums[0].count / number);
                        teacherController.getTeachersPage(c1, c2, number, page, kw, star, (sql, teachersPage) => {
                            // console.log(sql);
                            res.render('teachers', {
                                kw,
                                menus,
                                nums,
                                types,
                                teachersPage,
                                teachersCount,
                                pageN,
                                resultsChildren,
                                current: '/teachers',
                                currentPage: page,
                                currentC1: c1,
                                currentC2: c2,
                                currentStar: star
                            })
                        })
                    })
                })
            })
        });
    })
});

/* 新闻列表页 */
router.get('/news', function (req, res, next) {
    let page = parseInt(req.query.page || "1");
    let kw = req.query.kw || "";
    menuController.getMenu((menus) => {
        newsController.getCount(kw, (results) => {
            // console.log(results);
            // console.log(sql);
            const number = 5;
            let newsCount = results[0].count;
            let pagesCount = Math.ceil(results[0].count / number);
            newsController.getNewsPage(number, page, kw, (newsPage) => {
                // console.log(newsPage);
                for (let i = 0; i < newsPage.length; i++) {
                    newsPage[i].news_time = getFormatTimeNews(newsPage[i].news_time);
                    if (newsPage[i].news_intro.length > 150) {
                        newsPage[i].news_intro = newsPage[i].news_intro.substr(0, 150) + "...";
                    }
                }
                res.render('news', {
                    kw,
                    menus,
                    newsPage,
                    newsCount,
                    pagesCount,
                    current: '/news',
                    currentPage: page
                });
            });
        });
    });
});

/* 课程详情页 */
router.get('/detail_course/:id', function (req, res, next) {
    let id = parseInt(req.params.id);
    let page = req.query.page || "1";
    menuController.getMenu((menus) => {
        courseController.getDetailCourse((course_detail) => {
            courseController.getComments((course_comments) => {
                let theComment = [];
                for (let i = 0; i < course_comments.length; i++) {
                    // console.log("----", req.params.id);
                    let temp = course_comments[i];
                    if (temp.course_id === id) {
                        theComment.push(temp);
                    }
                }
                // console.log(theComment);
                courseController.getOutline((course_outline) => {
                    let theOutline = [];
                    for (let i = 0; i < course_outline.length; i++) {
                        let temp = course_outline[i];
                        if (temp.course_id === id) {
                            theOutline.push(temp);
                        }
                    }
                    courseController.getPageComments(id, (count) => {
                        let pageNum = Math.ceil(count[0].num / 4);
                        res.render('detail_course', {
                            courses: course_detail[id - 1],
                            comments: theComment,
                            dg: theOutline,
                            menus: menus,
                            currentPath: `/detail_course/${id}`,
                            courseID: id,
                            page,
                            pageN: pageNum,
                        });
                    });
                });
            });
        })
    });
});

/* 添加评论路由 */
router.post("/detail_course/:id", (req, resp) => {
    let id = parseInt(req.params.id);
    req.body.time = getFormatTime(new Date());
    // console.log(req.body.time);
    let thisTime = req.body.time;
    let content = req.body.content;

    courseController.insertComments(content, id, thisTime, () => {
        console.log("插入成功");
    });
    //2.保存
    //resp.send(保存数据成功)
    //告诉客户端重新请求另外一个地址
    // resp.redirect(`/detail_course/${id}`);
});

/* 讲师详情页 */
router.get('/detail_teacher/:id', (req, res, next) => {
    menuController.getMenu((menuInfo) => {
        tDetail.getTeacherInfo(req.params.id, (tInfo) => {
            tDetail.getTeacherCourse(req.params.id, (cInfo) => {
                tDetail.getCourseScore(req.params.id, (sql, Score) => {
                    // console.log(sql);
                    // console.log(cInfo.length);
                    // console.log(Score.length);
                    res.render("detail_teacher", {menus: menuInfo, tInfo: tInfo[0], cInfo: cInfo, Score: Score})
                })
            })
        })
    })
});

/* 新闻详情页 */
router.get('/detail_news/:id', function (req, res, next) {
    let id = req.params.id;
    menuController.getMenu((menus) => {
        newsController.getNewsDetail(id, (results) => {
            let news = results[0];
            let news_time = getFormatTime(news.news_time);
            res.render('detail_news', {
                menus: menus,
                news_time: news_time,
                news: news
            });
        });
    })
});

module.exports = router;