// 等文档内容完全加载完成再触发交互效果
window.addEventListener("load", function () {
    // 获取元素
    var header = document.querySelector('.header');
    var close = document.querySelector('.close');
    var input = document.querySelector('input');
    var triangle = document.querySelector('.triangle');
    var square = document.querySelector('.square');
    var spans = document.querySelector('.topnav').querySelectorAll('span');
    var divs = document.querySelector('.topnav').querySelectorAll('div');
    var focus = document.querySelector('.focus');
    var arrowLefts = document.querySelectorAll('.arrow-l');
    var arrowRights = document.querySelectorAll('.arrow-r');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    // 顶部广告关闭
    close.addEventListener('click', function () {
        // 顶部广告关闭的同时让header的高度发生同步变化
        header.style.height = header.offsetHeight - header.children[0].offsetHeight + 'px';
        header.children[0].style.display = 'none';
    });
    // 顶部搜索框变成固定定位
    document.addEventListener('scroll', function () {
        // 顶部区域的总高度
        var height = header.children[0].offsetHeight + header.children[1].offsetHeight;
        // window.pageYOffset获取页面被滚去的距离
        if (window.pageYOffset >= header.children[0].offsetHeight) {
            header.children[1].style.position = 'fixed';
            header.children[1].style.width = '100%';
            header.children[1].style.top = 0;
        } else {
            // 盒子变成相对定位,避免压住没有关闭的广告
            header.children[1].style.position = 'relative';
        }
    });
    // input获得焦点事件的注册
    input.addEventListener('focus', function () {
        if (this.value == '搜索感兴趣的课程') {
            this.value = '';
        }
        this.style.color = 'black';
    });
    // input失去焦点事件的注册
    input.addEventListener('blur', function () {
        if (this.value == '') {
            this.value = '搜索感兴趣的课程';
        }
        this.style.color = '#b8b8b8';
    });
    // 侧边栏模块
    var aside = document.querySelector('aside');
    for (let i = 4; i <= 6; i++) {
        aside.children[i].addEventListener('mouseover', function () {
            this.className = 'after';
            switch (i) {
                case 4: this.innerHTML = '反馈意见';
                    break;
                case 5: this.innerHTML = '手机课堂';
                    break;
                case 6: this.innerHTML = '返回顶部';
            }
        })
    }
    for (let i = 4; i <= 6; i++) {
        aside.children[i].addEventListener('mouseleave', function () {
            this.className = '';
            switch (i) {
                case 4: this.innerHTML = '&#xe61d;';
                    break;
                case 5: this.innerHTML = '&#xe606;';
                    break;
                case 6: this.innerHTML = '&#xe612;';
            }
        })
    }
    var asideDiv = aside.querySelector('div');
    var asideSpan = aside.querySelector('span');
    aside.children[5].addEventListener('mouseover', function () {
        if (window.pageYOffset == 0) {
            asideDiv.style.bottom = -44 + 'px';
            asideSpan.style.bottom = 14 + 'px';
        } else {
            asideDiv.style.bottom = -10 + 'px';
            asideSpan.style.bottom = 54 + 'px';
        }
        asideDiv.style.display = 'block';
        asideSpan.style.display = 'block';
    })
    aside.children[5].addEventListener('mouseleave', function () {
        asideDiv.style.display = 'none';
        asideSpan.style.display = 'none';
    })
    document.addEventListener('scroll', function () {
        if (window.pageYOffset > 0) {
            aside.children[6].style.display = 'block';
        } else {
            aside.children[6].style.display = 'none';
        }
    })
    aside.children[6].addEventListener('click', function () {
        var time = setInterval(function () {
            var step = -window.pageYOffset / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == 0) {
                clearInterval(time);
            }
            window.scroll(0, window.pageYOffset + step);
        }, 10)
    })
    // 顶部下拉菜单的制作
    // 鼠标经过与离开事件的制作
    spans[0].addEventListener('mouseenter', function () {
        triangle.style.display = 'block';
        divs[0].style.display = 'block';
    });
    spans[0].addEventListener('mouseleave', function () {
        triangle.style.display = 'none';
        divs[0].style.display = 'none';
    });
    spans[5].addEventListener('mouseenter', function () {
        square.style.display = 'block';
        divs[1].style.display = 'block';
    });
    spans[5].addEventListener('mouseleave', function () {
        square.style.display = 'none';
        divs[1].style.display = 'none';
    });
    // nav中的焦点图的制作start
    focus.addEventListener('mouseenter', function () {
        clearInterval(timer);
        timer = null;//释放空间
        arrowLefts[0].style.display = 'block';
        arrowRights[0].style.display = 'block';
    });
    focus.addEventListener('mouseleave', function () {
        // 鼠标离开重新设置定时器
        timer = setInterval(function () {
            arrowRights[0].click();
        }, 3000);
        arrowLefts[0].style.display = 'none';
        arrowRights[0].style.display = 'none';
    });
    //自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        arrowRights[0].click();
    }, 3000);
    var line = 0;
    // 动态生成小条行
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        ol.appendChild(li);
        li.addEventListener('click', function () {
            // 小条行排他思想
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
                ul.children[i].style.animation = 'none';
            }
            line = this.getAttribute('data-index');
            this.className = 'current';
            ul.style.left = -this.getAttribute('data-index') * ul.children[0].offsetWidth + 'px';
            fadeIn(ul.children[this.getAttribute('data-index')]);
        });
    };
    var max = (ol.children.length - 1) * ul.children[0].offsetWidth;
    ol.children[0].className = 'current';
    var flag = true;//控制左右箭头点击速度的变量
    // 左右箭头点击事件
    arrowLefts[0].addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (ul.offsetLeft < 0) {
                ul.style.left = ul.offsetLeft + ul.children[0].offsetWidth + 'px';
            } else {
                ul.style.left = -max + 'px';
            }
            for (var i = 0; i < ul.children.length; i++) {
                ul.children[i].style.animation = 'none';
            }
            line--;
            if (line < 0) {
                line = ol.children.length - 1;
            }
            fadeIn(ul.children[line], function () {
                flag = true;
            });
            lineChange();
        }
    })
    arrowRights[0].addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (ul.offsetLeft <= -max) {
                ul.style.left = 0 + 'px';
            } else {
                ul.style.left = ul.offsetLeft - ul.children[0].offsetWidth + 'px';
            }
            for (var i = 0; i < ul.children.length; i++) {
                ul.children[i].style.animation = 'none';
            }
            line++;
            if (line > ol.children.length - 1) {
                line = 0;
            }
            fadeIn(ul.children[line], function () {
                flag = true;
            });
            lineChange();
        }
    });
    // 小条行变化函数
    function lineChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[line].className = 'current';
    };
    // 淡入函数
    function fadeIn(elem, callback) {
        var j = 0;
        elem.style.animation = 'fadein .8s forwards';
        var wait = setInterval(function () {
            var i = 1;
            j = i + j;
            if (j >= 8) {
                clearInterval(wait);
                callback && callback();
            }
        }, 100);
    };
    // nav中的焦点图的制作end
    // nav左侧导航start
    var more = document.querySelector('.more');
    var leftsidebar = document.querySelector('.leftsidebar');
    var lis = leftsidebar.querySelectorAll('li');
    more.addEventListener('mouseenter', function () {
        lis[9].innerHTML = '<a href="javascript:;">经济管理 </a>' + '<a href="javascript:;">经济 </a>' + '<span>/</span>' + '<a href="javascript:;">金融 </a>' + '<span>/</span>' + '<a href="javascript:;" title="电商与贸易">电商与贸易</a>';
        leftsidebar.style.height = 736 + 'px';
        leftsidebar.children[0].style.height = 716 + 'px';
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.animation = 'move .2s forwards';
        }
    });
    leftsidebar.addEventListener('mouseleave', function () {
        lis[9].innerHTML = '<a href="javascript:;">更多</a>' + '<span>&#xe665;</span>';
        this.style.height = 360 + 'px';
        leftsidebar.children[0].style.height = 340 + 'px';
        for (var i = 0; i < lis.length; i++) {
            lis[i].style.animation = 'none';
        }
    })
    // nav左侧导航end
    // 复制插入节点函数
    function copy(j, k, eleCopy, eleInsert) {
        for (let i = j; i <= k; i++) {
            // 复制节点
            var li = eleCopy.cloneNode(true);
            // 插入节点
            eleInsert.appendChild(li);
        }
    };
    // 最近直播模块
    var liveBroadcast = document.querySelector('.live-broadcast');
    var uls = liveBroadcast.querySelectorAll('ul');
    copy(3, 8, uls[0].children[1], uls[0]);
    copy(1, 2, uls[0], liveBroadcast.children[3].children[0]);
    // 重新赋值,使uls包含新创建的ul节点
    uls = liveBroadcast.querySelectorAll('ul');
    var toLefts = document.querySelectorAll('.toLeft');
    var toRights = document.querySelectorAll('.toRight');
    animate(toLefts[0], toRights[0], uls);
    // 编辑推荐模块
    var recommendUls = document.querySelector('#first').querySelectorAll('ul');
    copy(3, 5, recommendUls[0].children[1], recommendUls[0]);
    copy(1, 2, recommendUls[0], recommendUls[0].parentNode)
    // 重新赋值,使recommendUls包含新创建的ul节点
    recommendUls = document.querySelector('#first').querySelectorAll('ul');
    animate(toLefts[1], toRights[1], recommendUls);
    // 编辑推荐下半部分
    var recomBottomUls = document.querySelector('#second').querySelectorAll('ul');
    animate(toLefts[2], toRights[2], recomBottomUls);
    // 本周课程排行模块
    var rankingOl = document.querySelector('.ranking').querySelector('ol');
    // 获取目标元素并且使用函数注册事件
    var leftDiv = document.querySelector('#left');
    var middleDiv = document.querySelector('#middle');
    var rightDiv = document.querySelector('#right');
    var leftLis = leftDiv.querySelectorAll('li');
    copy(1, 2, leftLis[0], leftLis[0].parentNode);
    leftLis = leftDiv.querySelectorAll('li');
    var middleLis = middleDiv.querySelectorAll('li');
    copy(1, 2, middleLis[0], middleLis[0].parentNode);
    middleLis = middleDiv.querySelectorAll('li');
    var rightLis = rightDiv.querySelectorAll('li');
    copy(1, 2, rightLis[0], rightLis[0].parentNode);
    rightLis = rightDiv.querySelectorAll('li');
    animate(arrowLefts[1], arrowRights[1], leftLis, function (now) {
        leftDiv.onmouseover = function () {
            if (now == 0) {
                arrowRights[1].style.display = 'block';
            } else if (now == uls.length - 1) {
                arrowLefts[1].style.display = 'block';
            } else {
                arrowRights[1].style.display = 'block';
                arrowLefts[1].style.display = 'block';
            }
        };
        leftDiv.onmouseleave = function () {
            arrowRights[1].style.display = 'none';
            arrowLefts[1].style.display = 'none';
        };
    });
    animate(arrowLefts[2], arrowRights[2], middleLis, function (now) {
        middleDiv.onmouseover = function () {
            if (now == 0) {
                arrowRights[2].style.display = 'block';
            } else if (now == uls.length - 1) {
                arrowLefts[2].style.display = 'block';
            } else {
                arrowRights[2].style.display = 'block';
                arrowLefts[2].style.display = 'block';
            }
        };
        middleDiv.onmouseleave = function () {
            arrowRights[2].style.display = 'none';
            arrowLefts[2].style.display = 'none';
        };
    });
    animate(arrowLefts[3], arrowRights[3], rightLis, function (now) {
        // 用传统事件注册事件,避免之前注册的事件对后面注册的事件产生影响
        rightDiv.onmouseover = function () {
            if (now == 0) {
                arrowRights[3].style.display = 'block';
            } else if (now == uls.length - 1) {
                arrowLefts[3].style.display = 'block';
            } else {
                arrowRights[3].style.display = 'block';
                arrowLefts[3].style.display = 'block';
            }
        };
        rightDiv.onmouseleave = function () {
            arrowRights[3].style.display = 'none';
            arrowLefts[3].style.display = 'none';
        };
    });
    // 评价模块
    var evaluateUls = document.querySelector('.evaluate').querySelectorAll('ul');
    for (let i = 1; i <= 3; i++) {
        var li = evaluateUls[0].children[0].cloneNode(true);
        evaluateUls[0].appendChild(li);
    }
    if (1) {
        var ulFresh = evaluateUls[0].cloneNode(true);
        evaluateUls[0].parentNode.appendChild(ulFresh);
    }
    evaluateUls = document.querySelector('.evaluate').querySelectorAll('ul');
    animate(toLefts[3], toRights[3], evaluateUls);
    // 课程模块
    var famous = document.querySelector('.famous');
    var tabCon = famous.querySelectorAll('.tab-con');
    for (var i = 0; i < tabCon.length; i++) {
        tabCon[i].setAttribute('data-num', 5);
    }
    var tabLists = document.querySelectorAll('.tab-list');
    // 给li添加自定义属性
    for (var i = 0; i < tabLists.length; i++) {
        var tabListLis = tabLists[i].querySelectorAll('li');
        for (var j = 0; j < tabListLis.length; j++) {
            tabListLis[j].setAttribute('data-index', j);
            tabListLis[j].children[0].addEventListener('mouseover', function () {
                // 获取li
                var tabListParent = this.parentNode;
                // 获取ul
                var tabListGrandparent = tabListParent.parentNode;
                // 获取div
                var tabList = tabListGrandparent.parentNode;
                var tabListSpans = tabListGrandparent.querySelectorAll('span');
                for (var k = 0; k < tabListSpans.length; k++) {
                    tabListSpans[k].className = '';
                }
                this.className = 'present';
                var tab = tabList.parentNode;
                for (var i = 0; i < tab.children.length - 1; i++) {
                    if (this.parentNode.getAttribute('data-index') == i) {
                        var son = tab.children[i + 1];
                        if (son.getAttribute('data-num') && son.children.length < 5) {
                            copy(1, 4, son.children[0], son);
                        } else if (son.children.length < 10 && !(son.getAttribute('data-num'))) {
                            copy(1, 9, son.children[0], son);
                        };
                        son.style.display = 'flex';
                    } else {
                        tab.children[i + 1].style.display = 'none';
                    }
                }
            })
        }
    }
    toRights[4].style.top = 28 + 'px';
    toLefts[4].style.top = 28 + 'px';
    var excellentUls = document.querySelector('#bottom').querySelectorAll('ul');
    animate(toLefts[4], toRights[4], excellentUls);
    // 底部二维码模块
    var follow = document.querySelector('.follow');
    var followA = follow.querySelector('a');
    followA.addEventListener('mouseenter', function () {
        followA.children[0].style.display = 'inline-block';
        followA.children[1].style.display = 'inline-block';
    })
    followA.addEventListener('mouseleave', function () {
        followA.children[0].style.display = 'none';
        followA.children[1].style.display = 'none';
    })
});