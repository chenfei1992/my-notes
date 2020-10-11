# CSS集中营
## :ram: sticky属性值
`sticky`跟前面四个属性值都不一样，它会产生动态效果，很像`relative`和`fixed`的结合：一些时候是`relative`定位（定位基点是自身默认位置），另一些时候自动变成`fixed`定位（定位基点是视口）。
因此，它能够形成“动态固定”的效果。比如，网页的搜索工具栏，初始加载时在自己的默认位置（relative定位）。页面向下滚动时，工具栏变成固定位置，始终停留在页面头部（fixed定位）
等到页面重新向上滚动回到原位，工具栏也会回到默认位置。
`sticky`生效的前提是，必须搭配top、bottom、left、right这四个属性一起使用，不能省略，否则等同于relative定位，不产生“动态固定”的效果。原因是这四个属性用来定义“偏移距离”，浏览器把它当作sticky的生效门槛
## -webkit-line-clamp
可以把 块容器 中的内容限制为指定的行数。并且在超过行数后，在最后一行显示"..."
```js
display: -webkit-box; /*值必须为-webkit-box或者-webkit-inline-box*/
-webkit-box-orient: vertical; /*值必须为vertical*/
-webkit-line-clamp: 2; /*值为数字，表示一共显示几行*/
overflow: hidden;
```
## caret-color
用来定义插入光标（caret）的颜色，这里说的插入光标，就是那个在网页的可编辑器区域内，用来指示用户的输入具体会插入到哪里的那个一闪一闪的形似竖杠 | 的东西。
```js
caret-color: red;
```
## clip-path / shape-outside
clip-path 属性使用裁剪方式创建元素的可显示区域。区域内的部分显示，区域外的隐藏。类似的裁剪还有 svg 的 clipPath。
clip-path 的取值有以下几种图形
  + inset(xxx): 裁剪为长方形
  + circle(xx): 裁剪为原型
  + ellipse(xxx): 裁剪为椭圆
  + polygon(xx): 裁剪为多边形
  + none: 不裁剪
### 圆形裁剪
```js
clip-path: circle(40%); //半径为40%，圆心默认为中心
```
### 椭圆裁剪
```js
clip-path: ellipse(130px 140px at 10% 20%);
```
### 多边形裁剪
```js
clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
```
shape-outside 定义了一个可以是 非矩形的形状，相邻的内联内容应围绕该形状进行包裹。默认情况下，内联内容包围其矩形边距;
### 默认矩形环绕
```js
clip-path: none;
shape-outside: none
```
### 圆形环绕
```js
clip-path: circle(40%);
shape-outside: circle(40%);
```
### 椭圆环绕
```js
clip-path: ellipse(130px 140px at 10% 20%);
shape-outside: ellipse(130px 140px at 20% 20%);
```
### 多变性环绕
```js
clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
shape-outside: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
```
## CSS3实现一个扇形
```js
<div class="sector"></div>
.sector {
  width: 0;
  height: 0;
  border-width: 50px;
  border-style: solid;
  border-color: #f00 transparent transparent;
  border-radius: 50px;
}
```
## CSS3实现一个三角形
```js
<div class="sector"></div>
.sector {
  width: 0;
  height: 0;
  border-width: 50px;
  border-style: solid;
  border-color: #f00 transparent transparent;
}
```