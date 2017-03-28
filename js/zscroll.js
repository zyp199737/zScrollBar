/**
 * [zScroll description]
 * author:zhyp;
 * options={
 *   id: 'scroll',  //容器id
 *   containerHeight: 280, //容器高度
 *  hideBlock:true 是否隐藏滑块，//默认显示滑块
 *};
 */
function zScroll(options) {
  this.options = options || {};
  if (this.options.id) {
    this.container = document.getElementById(this.options.id);
    this.container.className=this.container.className+' z-scroll';
    if (this.options.containerHeight) {
      this.container.style.height = this.options.containerHeight + 'px'
    } else {
      this.options.containerHeight = this.container.offsetHeight;
    }
    this.render(); //加载内容
    this.swiperPanel = this.container.children[1].children[0];
    this.shank = this.container.children[0];
    this.swiperBlock = this.shank.children[0];
    if (this.options.hideBlock) {
      this.shank.style.display = 'none';
      this.swiperPanel.parentNode.style.marginRight = 0;
    } else {
      /** [if description]设置滑块宽度 */
      if (!isNaN(this.options.blockWidth)) {
        this.shank.style.width = (this.options.blockWidth + 2) + 'px';
        this.swiperBlock.style.width = this.options.blockWidth + 'px';
        this.swiperPanel.parentNode.style.marginRight = (this.options.blockWidth + 5) + 'px';
      }
    }
    this.initBlockPosition();
  } else {
    console.log('add the id of element');
  }
};
/** [render description]渲染 */
zScroll.prototype.render = function() {
  var content = this.container.innerHTML;
  this.container.innerHTML = '<div class="z-scroll-shank"><span class="z-scroll-block"></span></div><div class="z-scroll-box"><div class="z-scroll-content">' + content + '</div></div>';
};
/** [initBlockPosition description]初始化滑块位置 */
zScroll.prototype.initBlockPosition = function() {
  if (this.shank && this.swiperBlock) {
    var shank_ht = this.shank.offsetHeight;
    if (!shank_ht) {
      shank_ht = this.options.containerHeight;
    }
    this.swiperBlock.style.webkitTransform = 'translateY(-' + shank_ht + 'px)';
    this.swiperPanel.style.webkitTransform = 'translateY(0px)';
    this.moveBlock(shank_ht);
  }
};
/** [moveBlock description]移动滑块位置 */
zScroll.prototype.moveBlock = function(shank_ht) {
  var _this = this;
  this.startY = 0;
  this.y = 0;
  this.startPanelY = 0;
  this.panelY = 0;
  this.aboveY = -shank_ht;
  this.abovePanelY = 0;
  this.timeRange = 0;
  if (_this.container) {
    _this.container.addEventListener('touchstart', function(e) {
      e.preventDefault();
      var target = e.target || e.srcElement,
        swipePanelClass = _this.swiperPanel.className;
      if (target.className == _this.swiperBlock.className) {
        _this.touchStart.call(_this, e);
        // _this.swiperPanel.className = _this.swiperPanel.className.replace('zscroll', '');
      } else if (_this.swiperPanel.contains(target)) {
        _this.touchStartPanel.call(_this, e);
        // if (swipePanelClass.indexOf('zscroll') < 0) {
        //   _this.swiperPanel.className = swipePanelClass + ' zscroll';
        // }
      }
    });
    _this.container.addEventListener('touchmove', function(e) {
      e.preventDefault();
      var target = e.target || e.srcElement;
      if (target.className == _this.swiperBlock.className) {
        _this.touchMove.call(_this, e);
      } else if (_this.swiperPanel.contains(target)) {
        _this.touchMovePanel.call(_this, e);
      }
    });
    _this.container.addEventListener('touchend', function(e) {
      e.preventDefault();
      var target = e.target || e.srcElement;
      if (target.className == _this.swiperBlock.className) {
        _this.touchEnd.call(_this, e);
      } else if (_this.swiperPanel.contains(target)) {
        _this.touchEndPanel.call(_this, e);
      }
      return true;
    });
  }
};
zScroll.prototype.touchStart = function(e) {
  var touch = e.touches[0];
  this.startY = touch.pageY;
};
zScroll.prototype.touchMove = function(e) {
  var touch = e.touches[0],
    shank_ht = this.shank.offsetHeight,
    block_ht = this.swiperBlock.offsetHeight;
  this.y = parseInt(this.aboveY + touch.pageY - this.startY);
  if (this.y <= -block_ht && this.y >= -shank_ht) {
    this.swiperBlock.style.webkitTransform = 'translateY(' + this.y + 'px)';
    this.moveSwipePanel();
  } else {
    if (this.y < -shank_ht) {
      this.y = -shank_ht;
      this.swiperBlock.style.webkitTransform = 'translateY(' + this.y + 'px)';
      this.moveSwipePanel();
    } else if (this.y > -block_ht) {
      this.y = -block_ht;
      this.swiperBlock.style.webkitTransform = 'translateY(' + this.y + 'px)';
      this.moveSwipePanel();
    }
  }
};
zScroll.prototype.touchEnd = function(e) {
  var cssPanel = this.swiperPanel.style.webkitTransform,
    cssBlock = this.swiperBlock.style.webkitTransform;
  this.aboveY = cssBlock ? parseInt(cssBlock.split('(')[1].split(')')[0].replace('px', '')) : -this.shank.offsetHeight;
  this.abovePanelY = cssPanel ? parseInt(cssPanel.split('(')[1].split(')')[0].replace('px', '')) : 0;
};
/** [moveSwipePanel description]移动内容 */
zScroll.prototype.moveSwipePanel = function() {
  var shank_ht = this.shank.offsetHeight;
  var x1 = this.swiperPanel.offsetHeight - shank_ht,
    x2 = shank_ht - this.swiperBlock.offsetHeight;
  if (x2 != 0) {
    var y2 = parseInt(x1 / x2 * (this.y + shank_ht));
    this.swiperPanel.style.webkitTransform = 'translateY(' + -y2 + 'px)';
  }
};


/** [touchStartBlock description]面板滑动事件 */
zScroll.prototype.touchStartPanel = function(e) {
  var touch = e.touches[0];
  this.startPanelY = touch.pageY;
  this.timeRange = e.timeStamp || Date.now();
};
zScroll.prototype.touchMovePanel = function(e) {
  var touch = e.touches[0],
    shank_ht = this.swiperPanel.parentNode.offsetHeight,
    panel_ht = this.swiperPanel.offsetHeight,
    swipePanelClass = this.swiperPanel.className;
  this.panelY = parseInt(this.abovePanelY + touch.pageY - this.startPanelY);
  if (this.panelY <= 0 && this.panelY >= -(panel_ht - shank_ht)) {
    this.swiperPanel.style.webkitTransform = 'translateY(' + this.panelY + 'px)';
    this.moveSwipeBlock();
  } else {
    if (this.panelY > 0) {
      this.panelY = 0;
      this.swiperPanel.style.webkitTransform = 'translateY(' + this.panelY + 'px)';
      this.moveSwipeBlock();
    } else if (this.panelY < -(panel_ht - shank_ht)) {
      this.panelY = -(panel_ht - shank_ht);
      this.swiperPanel.style.webkitTransform = 'translateY(' + this.panelY + 'px)';
      this.moveSwipeBlock();
    }
  }
};
zScroll.prototype.touchEndPanel = function(e) {
  var cssPanel = this.swiperPanel.style.webkitTransform,
    cssBlock = this.swiperBlock.style.webkitTransform;
  this.aboveY = cssBlock ? parseInt(cssBlock.split('(')[1].split(')')[0].replace('px', '')) : -this.shank.offsetHeight;
  this.abovePanelY = cssPanel ? parseInt(cssPanel.split('(')[1].split(')')[0].replace('px', '')) : 0;
};
/** [moveSwipePanel description]移动内容 */
zScroll.prototype.moveSwipeBlock = function() {
  var shank_ht = this.swiperPanel.parentNode.offsetHeight;
  var x1 = this.swiperPanel.offsetHeight - shank_ht,
    x2 = shank_ht - this.swiperBlock.offsetHeight;
  if (x1 != 0) {
    var y2 = parseInt(x2 * this.panelY / x1 + shank_ht);
    if (Math.abs(y2) <= shank_ht) {
      this.swiperBlock.style.webkitTransform = 'translateY(' + -y2 + 'px)';
    }
  }
};
// ----  其他 -------//
/** [addStyle description]添加样式 */
zScroll.prototype.addStyle = function(el, classStyle) {
  if (typeof classStyle == 'object' && el) {
    for (var name in classStyle) {
      el.style[name] = classStyle[name];
    }
  }
};