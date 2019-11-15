// 取 轮播对象
var panel = document.getElementById('nav_panel');
// console.log(panel);
// 取 轮播对象图片
var panelImg = document.getElementById('nav_img');
// console.log(panelImg);
// 取 列表ul项
var circleLi = panel.getElementsByClassName('indicator')[0];
// 取列表li项
var circleLis = circleLi.getElementsByTagName("li");
// console.log(circleLis);
var circleLiImg = circleLi.getElementsByTagName('img');
// console.log(circleLiImg);
// 声明 左按钮
var moveLeft = document.getElementById('move_left');
// 声明 右按钮
var moveRight = document.getElementById('move_right');
// 默认图片索引值 及默认图片
var panelImg_num = 0;
panelImg.src = circleLiImg[panelImg_num].src;
circleLis[panelImg_num].style.border = "3px solid rgba(0, 0, 0, 0.1)";
circleLis[panelImg_num].style.backgroundColor = "#fff";

// 取 上方背景Dom
var bk = document.getElementsByClassName('bk')[0];

// 动态设置 导航面板标题底部边框
var titleCourse = document.querySelectorAll('#nav_panel .left .h3')[0];
var itemsCourse = document.querySelectorAll('#items_course > li');
var titleTeacher = document.querySelectorAll('#nav_panel .left .h3')[1];
var itemsTeacher = document.querySelectorAll('#items_teacher > li');

for (var i = 0; i < itemsCourse.length; i++) {
    itemsCourse[i].onmouseover = function () {
        titleCourse.style.borderBottom = '2px solid #e1251b';
    };
    itemsCourse[i].onmouseleave = function () {
        titleCourse.style.borderBottom = 'none';
    };
}
for (var j = 0; j < itemsTeacher.length; j++) {
    itemsTeacher[j].onmouseover = function () {
        titleTeacher.style.borderBottom = '2px solid #e1251b';
    };
    itemsTeacher[j].onmouseleave = function () {
        titleTeacher.style.borderBottom = 'none';
    };
}

// 定时函数
var timer = setInterval(function () {
    panelImg_num += 1;
    circleLis[panelImg_num - 1].style.border = "1px solid rgba(0, 0, 0, 0.05)";
    circleLis[panelImg_num - 1].style.backgroundColor = "rgba(255, 255, 255, 0.4)";
    if (panelImg_num === circleLiImg.length) {
        panelImg_num = 0;
    }
    panelImg.src = circleLiImg[panelImg_num].src;
    bk.style.backgroundImage = 'url("' + panelImg.src + '")';
    circleLis[panelImg_num].style.border = "3px solid rgba(0, 0, 0, 0.1)";
    circleLis[panelImg_num].style.backgroundColor = "#fff";
    // console.log(circleLiImg[panelImg_num]);
}, 5000);

// 点击左按钮事件
moveLeft.onclick = function (ev) {
    for (var i = 0; i < circleLis.length; i++) {
        circleLis[i].style.border = "1px solid rgba(0, 0, 0, 0.05)";
        circleLis[i].style.backgroundColor = "rgba(255, 255, 255, 0.4)";
    }
    panelImg_num -= 1;
    if (panelImg_num === -1) {
        panelImg_num = circleLiImg.length - 1
    }
    panelImg.src = circleLiImg[panelImg_num].src;
    bk.style.backgroundImage = 'url("' + panelImg.src + '")';
    circleLis[panelImg_num].style.border = "3px solid rgba(0, 0, 0, 0.1)";
    circleLis[panelImg_num].style.backgroundColor = "#fff";
    // console.log(panelImg_num);
};

// 点击右按钮事件
moveRight.onclick = function (ev) {
    for (var i = 0; i < circleLis.length; i++) {
        circleLis[i].style.border = "1px solid rgba(0, 0, 0, 0.05)";
        circleLis[i].style.backgroundColor = "rgba(255, 255, 255, 0.4)";
    }
    panelImg_num += 1;
    if (panelImg_num === circleLiImg.length) {
        panelImg_num = 0;
    }
    panelImg.src = circleLiImg[panelImg_num].src;
    bk.style.backgroundImage = 'url("' + panelImg.src + '")';
    circleLis[panelImg_num].style.border = "3px solid rgba(0, 0, 0, 0.1)";
    circleLis[panelImg_num].style.backgroundColor = "#fff";
    // console.log(panelImg_num);
};

// 鼠标移入onmouseover事件
function displayOver(img) {
    for (var i = 0; i < circleLis.length; i++) {
        circleLis[i].style.border = "1px solid rgba(0, 0, 0, 0.05)";
        circleLis[i].style.backgroundColor = "rgba(255, 255, 255, 0.4)";
    }
    // console.log(img.getAttribute('index'));
    img.style.border = "3px solid rgba(0, 0, 0, 0.1)";
    img.style.backgroundColor = "#fff";
    panelImg_num = img.getAttribute('index') - 1;
    panelImg.src = circleLiImg[panelImg_num].src;
    bk.style.backgroundImage = 'url("' + panelImg.src + '")';
}