function animate(toLeft, toRight, uls, callback) {
    for (var i = 0; i < uls.length; i++) {
        uls[i].setAttribute('data-json', i);
    }
    var now = 0;
    // 初始让左侧箭头隐藏
    if (now == 0) {
        toLeft.style.display = 'none';
    }
    // 给该区域的左右箭头注册点击事件
    // 移动元素是uls的父元素
    toLeft.addEventListener('click', function () {
        now--;
        callback && callback(now);
        uls[0].parentNode.style.left = uls[0].offsetWidth - uls[now + 1].offsetLeft + 'px';
        // 如果移动到最左侧则让左箭头消失
        if (now == 0) {
            this.style.display = 'none';
        } else {
            this.style.display = 'block';
        }
        // 如果移动到最右侧则让右箭头消失
        if (now == uls.length - 1) {
            toRight.style.display = 'none';
        } else {
            toRight.style.display = 'block';
        }
    });
    toRight.addEventListener('click', function () {
        now++;
        callback && callback(now);
        uls[0].parentNode.style.left = -uls[now - 1].offsetLeft - uls[0].offsetWidth + 'px';
        // 如果移动到最右侧则让右箭头消失
        if (now == uls.length - 1) {
            this.style.display = 'none';
        } else {
            this.style.display = 'block';
        }
        // 如果移动到最左侧则让左箭头消失
        if (now == 0) {
            toLeft.style.display = 'none';
        } else {
            toLeft.style.display = 'block';
        }
    });
    callback && callback(now);
}