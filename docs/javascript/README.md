## Array
### Array.slice()
slice()方法可从已有的数组中返回选定的元素
arrayObject.slice(start,end)
| 参数 | 描述 |
| --- | ---- |
| start | 必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1指最后一个元素，-2指倒数第二个元素，以此类推 |
| end  | 可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从start到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。 |
返回一个新的数组，包含从start到end（不包含该元素）的arrayObject中的元素。
请注意，该方法并不会修改数组，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法Array.splice().
### Array.from()
Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
```js
let arrayLike = {
  0: 'tom',
  1: '65',
  2: '男',
  3: ['jane','john','Mary'],
  'length': 4
}
let arr = Array.from(arrayLike)
console.log(arr)   // ['tom','65','男',['jane','john','Mary']]
```
Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
```js
let arr = [12,45,9797,564]
let set = new Set(arr)
console.log(Array.from(set,item => item + 1))  // [13,46,9798,565]
```
将字符串转换为数组
```js
let str = 'hello world!';
console.log(Array.from(str))
// ['h','e','l','l','o',' ','w','o','r','l','d','!']
```
### Array.reduce()
```js
arr.reduce(callback,[initialValue])
```
reduce为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用reduce的数组
```js
callback (执行数组中每个值的函数，包含四个参数)
  1、previousValue（上一次调用回调返回的值，或者是提供的初始值（initialValue））
  2、currentValue（数组中当前被处理的元素）
  3、index（当前元素的数组中的索引）
  4、array（调用reduce的数组）

initialValue（作为第一次调用callback的第一个参数）
```
```js
var arr = [1,2,3,4];
var sum = arr.reduce(function(prev,cur,index,arr){
  console.log(prev,cur,index);
  return prev + cur;
})
console.log(arr,sum);
// 1,2,1
// 3,3,2
// 6,4,3
// [1,2,3,4] 10

var sum1 = arr.reduce(function(prev,cur,index,arr){
  console.log(prev,cur,index);
  return prev + cur;
},0)
console.log(arr,sum1)
// 0,1,0
// 1,2,1
// 3,3,2
// 6,4,3
// [1,2,3,4] 10
```
::: tip
如果这个数组为空，运用reduce会报错，但是我们设置了初始值就不会报错
:::
#### reduce的高级用法
1、计算数组中每个元素出现的次数
```js
let names = ['Alice','Bob','Tiff','Bruce','Alice'];
let nameNum = names.reduce((prev,cur)=>{
  if(cur in prev){
    prev[cur]++
  }else{
    prev[cur] = 1
  }
  return prev
},{})
console.log(nameNum)  // {Alice: 2,Bob: 1,Tiff: 1, Bruce: 1}
```
2、数组去重
```js
let arr = [1,2,3,4,4,4,1];
let newArr = arr.reduce(function(pre,cur){
  if(!pre.includes(cur)){
    pre.push(cur)
  }
  return pre
},[])
console.log(newArr)
```
3、将多维数组转换为一维
```js
let arr = [[0,1],[2,3],[4,[5,[6,7]]]];
let newArr = function(arr){
  return arr.reduce((pre,cur) => pre.concat(Array.isArray(cur)?newArr(cur):cur),[])
}
console.log(newArr(arr))
```
### Array.some()
定义和用法
some() 方法用于检测数组中的元素是否满足指定条件（函数提供）
some() 方法会依次执行数组的每个元素：
  + 如果有一个元素满足条件，则表达式返回true，剩余的元素不会再执行检测。
  + 如果没有满足条件的元素，则返回false。
注意：some()不会对空数组进行检测。
注意：some()不会改变原始数组。
语法：
```js
array.some(function(currentValue,index,arr),thisValue)
currentValue: 必须。当前元素的值
index: 可选。当前元素的索引值
arr: 可选元素属于的数组对象
thisValue: 可选。对象作为该执行回调时使用，传递给函数，用作“this”的值。如果省略了thisValue，“this”的值为“undefined”
```
```js
var ages = [3,10,18,20];
function checkAdult(age){
  return age >= 18;
}
ages.some(checkAdult);   // true
```

## History
History接口不继承于任何属性
### History.length(只读)
返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页。例如，在一个新的选项卡加载的一个页面中，这个属性返回1.
### History.scrollRestoration
允许web应用程序在历史导航上显示地设置默认滚动恢复行为。此属性可以是自动的（auto）或者手动的（manual）
### History.state（只读）
返回一个表示历史堆栈顶部的状态值。这是一种可以不必等待popstate事件而查看状态的方式
### History.back()
前往上一页，用户可点击浏览器左上角的返回按钮模拟此方法。等价于history.go(-1)
当浏览器会话历史记录处于第一页时调用此方法没有效果，而且也不会报错
### History.forward()
在浏览器历史记录里前往下一页，用户可点击浏览器左上角的前进按钮模拟此方法。等价于history.go(1)
### History.pushState()
按指定的名称和URL（如果提供该参数）将数据push进会话历史栈，数据被DOM进行不透明处理；你可以指定任何可以被序列化的JavaScript对象。注意到Firefox现在忽略了这个title参数
### History.replaceState()
按指定的数据，名称和URL（如果提供该参数），更新历史栈上最新的入口。这个数据被DOM进行了不透明处理。你可以指定任何可以被序列化的JavaScript对象。注意到Firefox现在忽略了这个title参数。
### window.onpopstate
每当处于激活状态的历史记录条目发生变化时，popstate事件就会在对应window对象上触发。如果当前处于激活状态的历史记录条目是由history.pushState()方法创建，或者由history.replaceState()方法修改过的，则popstate事件对象的state属性包含了这个历史记录条目的state对象的一个拷贝。
调用history.pushState()或者history.replaceState()不会触发popstate事件. popstate事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮(或者在JavaScript中调用history.back()、history.forward()、history.go()方法).
当网页加载时,各浏览器对popstate事件是否触发有不同的表现,Chrome 和 Safari会触发popstate事件, 而Firefox不会.
假如当前网页地址为`http://example.com/example.html`,则运行下述代码后:
```js
window.onpopstate = function(event){
  alert("location: "+ document.location + ",state:" + JSON.stringify(event.state))
}
//  绑定事件处理函数
//添加并激活一个历史记录条目 http://example.com/example.html?page=1,条目索引为1
history.pushState({page:1},"title1","?page=1");
//添加并激活一个历史记录条目 http://example.com/example.html?page=2,条目索引为2
history.pushState({page:2},"title2","?page=2");
//修改当前激活的历史记录条目 http://ex..?page=2 变为 http://ex..?page=3,条目索引为3
history.replaceState({page:3},"title3","?page=3");
// 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back();
// 弹出 "location: http://example.com/example.html, state: null
history.back();
// 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}
history.go(2);
```
## Object
### Object.prototype
该属性是所有对象的原型（包括Object对象本身），语言中的其他对象正是通过对该属性上添加东西来实现它们之间的继承关系的。所以要小心使用
经常会有类似的封装http到原型`Vue.prototype`,一般人是这样封装的，但容易被篡改。
熟悉`Object.defineProperty`或者说熟悉对象API的人，一般如下代码写的，则不会出现被修改的问题。
```js
function Vue(){}
function http(){}
Object.defineProperty(Vue.prototype,'$http',{
  get(){
    return http
  }
})
var vm = new Vue();
vm.$http();
vm.$http = 1; // 这里无法修改
vm.$http()      // 调用正常
```
vue-router源码里就是类似这样写的，`this.$router`,`this.$route`无法修改
```js
Object.defineProperty(Vue.prototype,'$router',{
  get(){return this._routerRoot._router}
})
Object.defineProperty(Vue.prototype,'$route',{
  get(){return this._routerRoot._route}
})
```
创建对象的两种方式：
```js
var o = new Object();
var o = {};      // 推荐
```
该构造器可以接受任何类型的参数，并且会自动识别参数的类型，并选择更合适的构造器来完成相关操作：
```js
var o = new Object('sdbs');
o.constructor;  // f String(){[native code]}
var n = new Object(123);
n.constructor;   // f Number(){[native code]}
```
### Object.prototype.constructor
该属性指向用来构造该函数对象的构造器，在这里为`Object()`
```js
Object.prototype.constructor === Object;  // true
var o = new Object();
o.constructor === Object;  // true
```
### Object.prototype.toString(radix)
该方法返回的是一个用于描述目标对象的字符串。特别地，当目标是一个Number对象时，可以传递一个用于进制数的参数`radix`,该参数`radix`，该参数的默认值为10
```js
var o = {prop:1};
o.toString();   // '[object Object]'
var n = new Number(255);
n.toString();  // '255'
n.toString(16);   // 'ff'
```
### Object.prototype.toLocaleString()
该方法的作用与toString()基本相同，只不过它做一些本地化处理。该方法会根据当前对象的不同而被重写，例如Date(),Number(),Array(),它们的值都会以本地化的形式输出。当然，对于包括Object()在内的其他大多数对象来说，该方法与toString()是基本相同的。在浏览器环境下，可以通过BOM对象Navigator的language属性（在IE中则是userLanguage）来了解当前所使用的语言：
### Object.prototype.valueOf()
该方法返回的是用于基本类型所表示的this值，如果它可以用于基本类型表示的话，如果Number对象返回的是它的基本数值，而Date对象返回的是一个时间戳。如果无法用基本数据类型表示，该方法会返回this本身
```js
var o = {};
typeof o.valueOf();   // object
o.valueOf() === o   // true

var n = new Number(101);
typeof n    // object
typeof n.valueOf();   // number
n.valueOf()  === n   // false

var d = new Date();
typeof d.valueOf();   // number
d.valueOf()      // 1503146772355
```
### Object.prototype.hasOwnProperty(prop)
该方法仅在目标属性为对象自身属性时返回true，而当该属性是从原型链中继承而来或根本不存在时，返回false
```js
var o = {prop:1};
o.hasOwnProperty('prop');   // true
o.hasOwnProperty('toString');  // false
o.hasOwnProperty('formString);  // false
```
### Object.prototype.isPrototypeOf(obj)
如果目标对象是当前对象的原型，该方法就会返回true，而且，当前对象所在原型上的所有对象都能通过该测试，并不局限与它的直系关系。
```js
var s = new String('');
Object.prototype.isPrototypeOf(s);  // true
String.prototype.isPrototypeOf(s);  // true
Array.prototype.isPrototypeOf(s);   // false
```
### Object.prototype.propertyIsEnumerable(prop)
如果目标属性能在`for in`循环中被显示出来，该方法就返回`true`。指对应的key值是否可枚举
```js
var a = [1,2,3];
a.propertyIsEnumerable('length');  // false
a.propertyIsEnumerable(0);    // true
```
### Object.defineProperty()与Object.defineProperties
该方法的作用与defineProperty()基本相同，只不过它可以用来一次定义多个属性。
```js
Object.defineProperties({},{
  'color':{
    value:'transparent',
    writable: true
  },
  'name':{
    value:'xzq',
    writable: false
  }
})
```
### Object.getPrototypeOf(obj)
之前在ES3中，我们往往需要通过`Object.prototype.isPrototypeOf()`去猜测某个给定的对象的原型是什么，如今在ES5中，我们可以直接询问该对象“你的原型是什么”
```js
Object.getPrototypeOf([]) === Array.prototype;  // true
Object.getPrototypeOf(Array.prototype) === Object.prototype;  // true
Object.getPrototypeOf(Object.prototype) === null;  // true
```
### Object.create(obj,descr)
该方法主要用于创建一个新对象，并为其设置原型，用（上述）属性描述符来定义对象的原型属性。
```js
var parent = {hi: 'Hello'};
var o = Object.create(parent,{
  prop: {
    value: 1
  }
});
o.hi   // 'Hello'
// 获得它的原型
Object.getPrototypeOf(parent) === Object.prototype;  // true
Object.getPrototypeOf(o);   // {hi:"Hello"} // 说明o的原型是{hi:"Hello"}
o.hasOwnProperty('hi');   // false
o.hasOwnProperty('prop');   // true 说明prop是原型上的自身上的属性
```
```js
var o = Object.create(null);
typeof o.toString();   // 'undefined'
```
### Object.getOwnPropertyDesciptor(obj, property) (ES5)
该方法可以让我们详细查看一个属性的定义。甚至可以通过它一窥那些内置的，之前不可见的隐藏属性。
```js
Object.getOwnPropertyDescriptor(Object.prototype, 'toString');
// {writable: true, enumerable: false, configurable: true, value: ƒ toString()}
```
### Object.getOwnPropertyNames(obj)
该方法返回一个数组，其中包含了当前对象所有属性的名称（字符串），不论它们是否可枚举。当然，也可以用`Object.keys()` 来单独返回可枚举的属性。
```js
Object.getOwnPropertyNames(Object.prototype);
// ["__defineGetter__", "__defineSetter__", "hasOwnProperty", "__lookupGetter__", "__lookupSetter__", "propertyIsEnumerable", "toString", "valueOf", "__proto__", "constructor", "toLocaleString", "isPrototypeOf"]
Object.keys(Object.prototype);
// []
Object.getOwnPropertyNames(Object);
// ["length", "name", "arguments", "caller", "prototype", "assign", "getOwnPropertyDescriptor", "getOwnPropertyDescriptors", "getOwnPropertyNames", "getOwnPropertySymbols", "is", "preventExtensions", "seal", "create", "defineProperties", "defineProperty", "freeze", "getPrototypeOf", "setPrototypeOf", "isExtensible", "isFrozen", "isSealed", "keys", "entries", "values"]
Object.keys(Object);
// []
```
### Object.preventExtensions(obj)和Object.isExtensible(obj)
`preventExtensions()`方法用于禁止向某一对象添加更多属性，而`isExtensible()`方法则用于检查某对象是否还可以被添加属性。
```js
var deadline = {};
Object.isExtensible(deadline);   // true
deadline.date = 'yesterday'; 
Object.preventExtensions(deadline);
Object.isExtensible(deadline);      // false
deadline.date = 'today';
deadline.date     // today
deadline.report = true;
deadline.report      // undefined
```
### Object.seal(obj) 与 Object.isSeal(obj)
`seal()`方法可以让一个对象密封，并返回被密封后的对象。`seal()`方法的作用与`preventExtensions()`基本相同，但除此之外，它还会将现有属性设置成不可配置。也就是说，在这种情况下，我们只能变更现有属性的值，但不能删除或（用`defineProperty()`）重新配置这些属性，例如不能将一个可枚举的属性改成不可枚举。
```js
var person = {legs:2};
// person === Object.seal(person)   // true
Object.isSealed(person);   // true
Object.getOwnPropertyDescriptor(person,'legs');
// {value:2,writable:true,enumerable:true,configurable:false}
delete person.legs;   // false 
Object.defineProperty(person,'legs',{value:2});
person.legs   // 2
person.legs = 1;
person.legs   // 1
Object.defineProperty(person, "legs", { get: function() { return "legs"; } });
// 抛出TypeError异常
```
### Object.isFrozen(obj)
freeze()方法用于执行一切不受seal()方法限制的属性值变更。Object.freeze() 方法可以冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。
```js
var deadline = Object.freeze({date: 'yesterday'});
deadline.date = 'tomorrow';
deadline.excuse = 'lame';
deadline.date; // 'yesterday'
deadline.excuse; // undefined
Object.isSealed(deadline); // true;
Object.isFrozen(deadline); // true
Object.getOwnPropertyDescriptor(deadline, 'date');
// {value: "yesterday", writable: false, enumerable: true, configurable: false} (不可配置，不可写)
Object.keys(deadline); // ['date'] (可枚举)
```
### Object.keys(obj)
该方法是一种特殊的for-in循环。它只返回当前对象的属性（不像for-in），而且这些属性也必须是可枚举的（这点和Object.getOwnPropertyNames()不同，不论是否可以枚举）。返回值是一个字符串数组。
```js
Object.prototype.customProto = 101;
Object.getOwnPropertyNames(Object.prototype);
// [..., "constructor", "toLocaleString", "isPrototypeOf", "customProto"]
Object.keys(Object.prototype); // ['customProto']
var o = {own: 202};
o.customProto; // 101
Object.keys(o); // ['own']
```
### Object.is(value1,value2)
该方法用来比较两个值是否严格相等。它与严格比较运算符（===）的行为基本一致。不同之处只有两个：一是+0不等于-0，而是NaN等于自身。
```js
Object.is('若川', '若川'); // true
Object.is({},{}); // false
Object.is(+0, -0); // false
+0 === -0; // true
Object.is(NaN, NaN); // true
NaN === NaN; // false
```
ES5可以通过以下代码部署Object.is
```js
Object.defineProperty(Object,'is',{
  value:function(x,y){
    //  针对 +0、-0
    if(x === y){
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对 NaN
    return x !== x || y !== y 
  },
  configurable: true,
  enumerable: false,
  writable: true
})
```
## Intl
`Intl`对象时ECMAScript国际化API的一个命名空间，它提供了精确的字符串对比、数字格式化，和日期时间格式化。`Collator`,`NumberFormat`和`DateTimeFormat`对象的构造函数是`Intl`对象的属性。
### 属性
**Intl.Collator**
  collators的构造函数，用于启用对语言敏感的字符串比较的对象
  ```js
  function letterSort(lang,letters){
    letters.sort(new Intl.Collator(lang).compare)
    return letters
  }
  console.log(lettersSort('de',['a','z','ä']))
  // expected output: Array ["a", "ä", "z"]
  console.log(letterSort('sv', ['a', 'z', 'ä']));
  // expected output: Array ["a", "z", "ä"]
  ```
**Intl.DateTimeFormat**
  用于启用语言敏感的日期和时间格式的对象的构造函数
  ```js
  const date = new Date(Date.UTC(2012,11,20,3,0,0))
  console.log(new Intl.DateTimeFormat('en-US').format(date))
  // expected output: '12/20/2012'
  console.log(new Intl.DateTimeFormat('en-GB').format(date))
  // expected output: '20/12/2012'
  console.log(new Intl.DateTimeFormat(['ban','id']).format(date))
  // expected output: '20/12/2012'
  ```
**Intl.ListFormat**
  Constructor for objects that enable language-sensitive list formatting
  ```js
  const vehicles = ['Motorcycle', 'Bus', 'Car'];
  const formatter = new Intl.ListFormat('en', { style: 'long', type: 'conjunction' });
  console.log(formatter.format(vehicles));
  // expected output: "Motorcycle, Bus, and Car"
  const formatter2 = new Intl.ListFormat('de', { style: 'short', type: 'disjunction' });
  console.log(formatter2.format(vehicles));
  // expected output: "Motorcycle, Bus oder Car"
  const formatter3 = new Intl.ListFormat('en', { style: 'narrow', type: 'unit' });
  console.log(formatter3.format(vehicles));
  // expected output: "Motorcycle Bus Car"
  ```
**Intl.NumberFormat**
  用于启用语言敏感数字格式的对象的构造函数
  ```js
  new Intl.NumberFormat([locales[, options]])
  Intl.NumberFormat.call(this[, locales[, options]])
  ```
**Intl.PluralRules**
  用于启用多种敏感格式和多种语言语言规则的对象的构造函数
  ```js
  new Intl.PluralRules([locales[, options]]) Intl.PluralRules.call(this[, locales[, options]])
  ```
**Intl.RelativeTimeFormat**
  Constructor for objects that enable language-sensitive relative time formatting
  ```js
  const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
  console.log(rtf1.format(3, 'quarter'));
  //expected output: "in 3 qtrs."
  console.log(rtf1.format(-1, 'day'));
  //expected output: "1 day ago"
  const rtf2 = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
  console.log(rtf2.format(2, 'day'));
  //expected output: "pasado mañana"
  ```
### 方法
**Intl.getCanonicalLocales()**
  返回规范区域名称
  ```js
  console.log(Intl.getCanonicalLocales('EN-US'));
  // expected output: Array ["en-US"]
  console.log(Intl.getCanonicalLocales(['EN-US', 'Fr']));
  // expected output: Array ["en-US", "fr"]
  try {
    Intl.getCanonicalLocales('EN_US');
  } catch (err) {
    console.log(err);
    // expected output: RangeError: invalid language tag: EN_US
  }
  ```
## Event
### 构造器
`Event()`
  创建并返回一个`Event`对象
### 属性
`Event.bubbles`(只读)
  一个布尔值，用来表示该事件是否会在DOM中冒泡。

`Event.cancelBubble`
  `Event.stopPropagation()`的历史别名。在事件处理器函数返回之前，将此属性的值设置为true，亦可阻止事件继续冒泡。

`Event.cancelable`(只读)
  一个布尔值，表示事件是否可以取消

`Event.composed`(只读)
  一个布尔值，表示事件是否可以穿过Shadow DOM和常规DOM之间的隔阂进行冒泡

`Event.currentTarget`(只读)
  对事件当前注册的目标的引用。

`Event.deepPath`
  一个由事件流所经过的DOM节点组成的数组

`Event.defaultPrevented`(只读)
  一个布尔值，表示`event.preventDefault()`方法是否取消了事件的默认行为

`Event.eventPhase`(只读)
  表示事件流正被处理到了哪个阶段
  ```js
  var phase = event.eventPhase
  // 返回一个代表当前执行阶段的整数值，下面列出了不同的执行阶段
  ```
  #### 事件阶段常量
  | 常量        | 值                       | 描述 |
  | ----------- | -------------------------- | ---- |
  | Event.NODE     | 0       | 这个时间，没有事件正在被处理 |
  | Event.CAPTURING_PHASE   | 1       | 事件正在被目标元素的祖先对象处理。这个处理过程从`Window`开始，然后`Document`,然后是`HTMLHtmlElement`,一直这样，直到目标元素的父元素。通过`EventTarget.addEventListener()`注册为捕获模式的`Event listeners`被调用。 |
  | Event.AT_TARGET | 2 | 事件对象已经抵到`the event's target`为了这个阶段注册的事件监听被调用。如果`Event.bubbled`的值为false，对事件对象的处理在这个阶段后就会结束     |
  | Event.BUBBLING_PHASE  | 3               | 事件对象逆向向上传播回目标元素的祖先元素，从父亲元素开始，并且最终到达包含元素`Window`。这就是冒泡，并且只有`Event.bubbles`值为true的时候才会发生。为这个阶段注册的`Event listeners`在这个过程中被触发     |

`Event.returnValue`
  旧版Internet Explorer引入的一个非标准历史属性，为保证依赖此属性的网页正常运作，此属性最终被收入规范。可用`Event.preventDefault()`与`Event.defaultPrevented`代替，但由于已进入规范，也可以使用此属性。

`Event.srcElement`
  旧版Internet Explorer对`Event.target`的非标准别称，出于兼容原因，一些其他浏览器也支持此别称。

`Event.target`(只读)
  对事件原始目标的引用，这里的原始目标指最初派发（dispatch）事件时指定的目标。

`Event.timeStamp`(只读)
  事件创建时的时间戳（精度为毫秒）。按照规范，这个时间戳是Unix纪元起经过的毫秒数，但实际上，在不同的浏览器中，对此时间戳的定义也有所不同。另外，规范正在将其修改为`DOMHighResTimeStamp`

`Event.type`(只读)
  事件的类型，不区分大小写

`Event.isTrusted`(只读)
  表示事件是由浏览器（例如用户点击）发起的，还是由脚本（使用事件创建方法，例如`Event.initEvent`）发出的。true：用户行为触发，false：非用户行为触发

### 方法
`Event.createEvent()`
  创建一个新事件，如果使用此方法创建事件，则必须调用其自身`initEvent()`方法，对其进行初始化。

`Event.composedPath()`
  返回事件的路径（将在该对象上调用监听器）。如果阴影根节点（shadow root）创建时`ShadowRoot.mode`值为closed，那么路径不会包括该根节点下阴影树（shadow tree）的节点。

`event.preventDefault`
  取消事件（如果该事件可取消）

`event.stopImmediatePropagation`
  对这个特定的事件而言，没有其他监听器被调用。这个事件既不会添加到相同的元素上，也不会添加到以后将要遍历的元素上（例如在捕获阶段）

`event.stopPropagation`
  停止冒泡，阻止事件在DOM中继续冒泡。