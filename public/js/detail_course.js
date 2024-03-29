window.onload = function () {
    //导航面板切换
    var introMenu = document.getElementById('intro_menu');
    var outlineMenu = document.getElementById('outline_menu');
    var introPanel = document.getElementById('intro_panel');
    var outlinePanel = document.getElementById('outline_panel');
    introMenu.onclick = function (ev) {
        ev.preventDefault();
        introMenu.classList.add('active');
        outlineMenu.classList.remove('active');
        introPanel.style.display = 'block';
        outlinePanel.style.display = 'none';
    };
    outlineMenu.onclick = function (ev) {
        ev.preventDefault();
        introMenu.classList.remove('active');
        outlineMenu.classList.add('active');
        introPanel.style.display = 'none';
        outlinePanel.style.display = 'block';
    };

    var oStar = document.getElementById("star");
    var aLi = oStar.getElementsByTagName("li");
    var oUl = oStar.getElementsByTagName("ul")[0];
    var oSpan = oStar.getElementsByTagName("span")[1];
    // var oP = oStar.getElementsByTagName("p")[0];
    // var i = iScore = iStar = 0;
    //var iStar= 5;
    var aMsg = [
        "很不满意",
        "不满意",
        "一般",
        "满意",
        "非常满意"
    ];
    for (var i = 1; i <= aLi.length; i++) {
        aLi[i - 1].index = i;
        //鼠标移过显示分数
        aLi[i - 1].onclick = function () {
            fnPoint(this.index);
            //浮动层显示
            //  oP.style.display = "block";
            //计算浮动层位置
            //  oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";
            //匹配浮动层文字内容
            //   oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]
        };
        //鼠标离开后恢复上次评分
        /*    aLi[i - 1].onmouseout = function ()
             {
                 fnPoint();*!/
                  //关闭浮动层
                oP.style.display = "none"
              };*/
        //点击后进行评分处理
        /*        aLi[i - 1].onclick = function ()
                {
                    var iStar = this.index;
                   // oP.style.display = "none";
                   oSpan.innerHTML = "<strong>" + (iStar) + " 分</strong> (" + aMsg[iStar - 1].match(/\|(.+)/)[1] + ")"
                }*/
    }

    //评分处理
    function fnPoint(iArg) {
        //分数赋值
        // console.log(iArg);
        var iScore = iArg || iStar;
        for (var i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";
    }
};
