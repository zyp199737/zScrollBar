# zScrollBar
zScrollBar是一个仿照pc端滚动条的插件，实现了拖动滑块带动左侧文本滚动或者拖拽左侧文本右侧滚动条滑块相应滚动的功能。
### 使用场景：
>移动端web
### 创建原因：
>给ios下overflow：auto/scroll滚动卡顿的bug的解决方案。
### 配置参数：
```javascript
 var scroll = new zScroll({
      id: 'scroll', //容器id
      containerHeight: 280, //容器高度
      hideBlock:false //隐藏滑块
    });
```
### 使用方法
>step 1:首先在头部引入样式表zscroll.css
```html
<link rel="stylesheet" type="text/css" href="./css/zscroll.css">
```
>step 2:在body最后面引入脚本文件zscroll.js
```html
<script type="text/javascript" src="./js/zscroll.js"></script>
```
>step 3:初始化zScroll实例对象。
```javascript
var scroll = new zScroll({
      id: 'scroll',
      containerHeight: 280,
      hideBlock:false
    });
```
