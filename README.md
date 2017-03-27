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
