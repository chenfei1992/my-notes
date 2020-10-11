## Flow
### Maybe types(判断类型)
在前面加一个问号创建类型:    ?string?number
除了判断的类型之外，也可以是null 或者 void（undefined）
```js
// @flow
function acceptsMaybeString(value: ?string){

}
acceptsMaybeString('bae');    // works
acceptsMaybeString(undefined);    // works
acceptsMaybeString(null);    // works
acceptsMaybeString();    // works
```
### 可选对象属性
```js
// @flow
function acceptsObject(value: {foo?: string}){

}
acceptsObject({ foo: "bar" });     // Works!
acceptsObject({ foo: undefined }); // Works!
acceptsObject({ foo: null });      // Error!
acceptsObject({});                 // Works!
```
### 可选函数参数
```js
// @flow
function acceptsOptionalString(value?: string){

}
acceptsOptionalString('bar');   // works
acceptsOptionalString(undefined); // works
acceptsOptionalString(null);   // error
acceptsOptionalString();   // works
```
### 具有默认值的函数参数
```js
// @flow
function acceptsOptionalString(value: string = 'foo'){

}
acceptsOptionalString('bar');   // works
acceptsOptionalString(undefined); // works
acceptsOptionalString(null);   // Error
acceptsOptionalString();    // works
```
### Literal Types（绝对类型）
flow不仅可以使用原始类型，还可以使用值作为类型注释
```js
// @flow
function acceptsTwo(value: 2){

}
acceptsTwo(2);  // works
// $ExpectError
acceptsTwo(3);   // Error
// $ExpectError
acceptsTwo('2');  // Error
```
多个值
```js
// @flow
function getColor(name: 'success' | 'warning' | 'danger'){
  switch(name){
    case 'success': return 'green';
    case 'warning': return 'yellow';
    case 'danger': return 'red';
  }
}
getColor('success');  // works
getColor('danger');   // works
// $ExpectError
getColor('error');  // Error
```
### Mixed Types(混合型)
单一类型
```js
function square(n: number){
  return n * n
}
```
多种类型
```js
function stringifyBasicValue(value: string | number){
  return '' + value
}
```
基于另一种类型的类型
返回值的类型与传入函数中的值的类型相同
```js
function identity<T>(value: T): T {
  return value;
}
```
以上三种比较常用的类型
### 任意类型即混合型
```js
function getTypeOf(value: mixed): string {
  return typeof value;
}
```
### 进得去出不来
混合类型将接受所有的值
```js
//@flow
function stringify(value: mixed){

}
stringify('foo');
stringify(3.14);
stringify(null);
stringify({});
```
当你尝试使用一个混合类型的值时，你必须首先弄清楚实际的类型是什么，否则将以错误告终。
```js
// @flow
function  stringify(value: mixed){
  // $ExpectError
  return '' + value;  // Error
}
stringify('foo');
```
你必须来判断他是哪种值，代码才能运行
```js
// @flow
function stringify(value: mixed){
  if(typeof value === 'string'){
    return ''+value;   // works
  }else{
    return ''
  }
}
stringify('foo')
```
### Any Types(任何类型)
如何你想要一种不进行类型检测的方法。可以使用任何类型，但是要尽量避免使用，这是完全不安全的。
```js
// @flow
function add(one: any,two: any): number {
  return one + two;
}
add(1,2);   // works
add('1','2');  // works
add({},[]);   // works
```
即使导致运行错误的代码也不会被捕获：
```js
// @flow
function getNestedProperty(obj: any){
  return obj.foo.bar.baz
}
getNestedProperty({})
```
只有几种情况可以考虑使用：
+ 当您正在将现有代码转换为使用流类型的过程中，并且您当前在检查代码类型时被阻塞(可能需要首先转换其他代码)。
+ 当您确定您的代码正常工作时，由于某种原因，Flow无法输入，请对其进行正确的检查。在JavaScript中，有越来越多的习惯用法无法静态地输入。
### Avoid leaking any
当你有一个类型为Any的值时，你可以使用Flow推断出你执行的所有操作的结果是any。
如果你在输入ANY的对象上获得了一个属性，那么得到的值也将具有any类型。
```js
// @flow
function fn(obj: any){
  let foo /*(:any)*/ = obj.foo
}
```
然后，您可以在另一个操作中使用结果值，例如将其添加为一个数字，结果也将是any。
```js
// @flow
function fn(obj: any) {
  let foo /* (:any) */ = obj.foo;
  let bar /* (:any) */ = foo * 2;
}
```
然后把any暴露出去
```js
// @flow
function fn(obj: any) /* (:any) */ {
  let foo /* (:any) */ = obj.foo;
  let bar /* (:any) */ = foo * 2;
  return bar;
}

let bar /* (:any) */ = fn({ foo: 2 });
let baz /* (:any) */ = "baz:" + bar;
```
为了防止any类型暴露出去，我们可以如下做法：
```js
// @flow
function fn(obj: any) {
  let foo: number = obj.foo;
}
```
这样子的话，代码就不会把any类型暴露了，因为已经有个number类型接收。
```js
// @flow
function fn(obj: any) /* (:number) */ {
  let foo: number = obj.foo;
  let bar /* (:number) */ = foo * 2;
  return bar;
}

let bar /* (:number) */ = fn({ foo: 2 });
let baz /* (:string) */ = "baz:" + bar;
```
### Maybe Types(我称他为判断类型)
如果你想使用一个非number类型的参数，可以如下定义，当然判断类型是可以接受null和undefined参数
```js
function acceptsMaybeNumber(value: ?number){

}
acceptsMaybeNumber(42);    // works
acceptsMaybeNumber();     // works
acceptsMaybeNumber(undefined) // works
acceptsMaybeNumber(null);    // works
acceptsMaybeNumber('42');   // Error
```
### Maybe Types进阶
假设我们有个Maybe Types?number，如果我们想使用该值作为一个数字，我们需要首先检查它是不是null或undefined
```js
function acceptsMaybeNumber(value: ?number){
  if(value != null){
    return value * 2
  }
}
```
### Variable Types
```js
// @flow
const foo /*:number*/ = 1;
const bar: number = 2
```
当你给变量声明类型的时候，你如果将它重新赋值，必须和他声明的值是一样的。
```js
// @flow
let foo: number = 1;
foo = 2;  // works
// $ExpectError
foo = '3';  // Error
```
### Reassigning variables(重新分配变量)
默认情况下，当你重新分配一个变量时，Flow将为它提供所有可能的赋值类型
```js
let foo = 42;
if(Math.random()) foo = true;
if(Math.random()) foo = 'hello';
let isOneOf: number | boolean | string = foo;  // works
```
有时，在重新分配后，flow能够(肯定地)找出变量的类型。在这种情况下，Flow将给出已知的类型。
```js
// @flow
let foo = 42;
let isNumber: number = foo;  // works
foo = true;
let isBoolean: boolean = foo; // works
foo = 'hello';
let isString: string = foo; // works
```
if语句、函数和其他有条件运行的代码都可以阻止Flow精确地计算出类型是什么
```js
// @flow
let foo = 42;
function mutate(){
  foo = true;
  foo = 'hello'
}
mutate();
// $ExpectError
let isString: string = foo;   // Error
```
### Function Types(函数类型)
函数有两个地方需要定义类型，一个是参数，一个是返回值
```js
// @flow 
function concat(a:string,b:string):string {
  return a + b
}
concat('foo','bar');   // works
concat(true,false);  // Error
```
即使不用类型注释，有些类型也会自动检测
```js
// @flow
function concat(a,b){
  return a+ b
}
concat('foo','bar');   // works
concat(true,false); // Error
```
有时候 Flow 会创建一种你比较希望的类型。
```js
// @flow
function concat(a, b) {
  return a + b;
}

concat("foo", "bar"); // Works!
concat(1, 2);         // Works!
```
### 函数语法
有三种形式的函数，每种形式都有各自略有不同的语法。
### 函数声明
添加类型和不添加类型的函数声明语法
```js
function method(str, bool, ...nums) {
  // ...
}

function method(str: string, bool?: boolean, ...nums: Array<number>): void {
  // ...
}
```
### 箭头函数
```js
let method = (str, bool, ...nums) => {
  // ...
};

let method = (str: string, bool?: boolean, ...nums: Array<number>): void => {
  // ...
};
```
### 函数类型
```js
(str: string, bool?: boolean, ...nums: Array<number>) => void
```
省略参数名
```js
(string, boolean | void, Array<number>) => void
```
您可以将这些函数类型用于诸如回调之类的操作。
```js
function method(param1: string, param2: boolean) {
  // ...
}
```
### 可选参数
您还可以通过在参数名称后面和冒号：之前添加一个问号来拥有可选参数：
```js
function method(optionalValue?: string){

}
```
可选参数可以不传或者undefined或匹配的类型。但他们不会接受NUll
```js
// @flow
function method(optionalValue?: string){

}
method();  // works
method(undefined);   // works
method('string');   // works
method(null);   // Error
```
### Rest参数
在参数列表 末尾 末尾 末尾 手机参数数组的参数， 用 ... 来表示
```js
function method(...args: Array<number>){

}
```
你可以将任意多的参数传递到rest参数中
```js
// @flow
function method(...args: Array<number>){

}
method();   // works
method(1);   // works
method(1,2);  // works
method(1,2,3);   // works
```
::: tip
  需要注意的是，如果你向rest参数添加类型注释，则必须是数组类型的。
:::
### 返回值
函数返回还可以使用冒号：添加类型，然后在参数列表后添加类型。如下：
```js
function method(): number{

}
```
返回类型确保函数的每个分支返回相同的类型。这样可以防止你在某些情况下意外的不返回值
```js
// @flow
// $ExpectError
function method(): boolean{
  if(Math.random() > 0.5){
    reurn true
  }
}
```
JavaScript中的每个函数都可以使用一个名为 this 的特殊上下文来调用。您可以使用所需的任何上下文调用函数。
```js
function method() {
  return this;
}
var num: number = method.call(42);
// $ExpectError
var str: string = method.call(42);
```
### Predicate函数（额...谓词函数）
有时，你可能希望将条件从if语句移到函数中：
```js
function concat(a: ?string,b: ?string): string {
  if(a && b){
    return a + b;
  }
  return ''
}
```
但是，Flow将在下面的代码中会出错：
```js
function truthy(a, b): boolean {
  return a && b;
}

function concat(a: ?string, b: ?string): string {
  if (truthy(a, b)) {
    // $ExpectError
    return a + b;
  }
  return '';
}
```
您可以通过使truthy成为谓词函数来解决这个问题，可以使用 %check 注释，如下所示：
```js
function truthy(a, b): boolean %checks {
  return !!a && !!b;
}
function concat(a: ?string, b: ?string): string {
  if (truthy(a, b)) {
    return a + b;
  }
  return '';
}
```
这些谓词函数的主体必须是表达式(即不支持局部变量声明)。但也可以调用谓词函数中的其他谓词函数。例如：
```js
function isString(y): %checks {
  return typeof y === "string";
}

function isNumber(y): %checks {
  return typeof y === "number";
}

function isNumberOrString(y): %checks {
  return isString(y) || isNumber(y);
}

function foo(x): string | number {
  if (isNumberOrString(x)) {
    return x + x;
  } else {
    return x.length; // no error, because Flow infers that x can only be an array
  }
}

foo('a');
foo(5);
foo([]);
```
### Callable Objects 可调用对象（本人对这个也不是特别理解，望有大神指出）
可以输入可调用对象，例如:
```js
type CallableObj = {
  (number, number): number,
  bar: string
};

function add(x, y) {
  return x + y; 
}

// $ExpectError
(add: CallableObj);

add.bar = "hello world";

(add: CallableObj);
```
### Function Type
有时候参数要接受任意函数的类型:
```js
function method(func: () => mixed) {
  // ...
}
```
如果你需要选择退出类型检测程序，同时你有不想用any类型,你可以用function类型
```js
function method(func: Function) {
  func(1, 2);     // Works.
  func("1", "2"); // Works.
  func({}, []);   // Works.
}

method(function(a: number, b: number) {
  // ...
});
```
### 对象类型语法
对象类型尽可能地尝试匹配JavaScript中对象的语法。使用冒号使用花括号{}和名称-值对：用逗号分隔，。
```js
// @flow
var obj1: {foo: boolean} = {foo: true};
var obj2: {
  foo: number,
  bar: boolean,
  baz: string
} = {
  foo: 1,
  bar: true,
  baz: 'three'
}
```
### 可选对象类型属性
在JavaScript中，访问不存在的属性的计算结果为undefined。这是JavaScript程序中常见的错误来源，因此Flow将这些错误转换为类型错误。
```js
// @flow
var obj = {foo: "bar"};
// $ExpectError
obj.bar;  // Error!  cannot get `obj.bar` beacuse property `bar` is missing in object litera [1].
```
如果你有一个有时没有属性的对象，可以通过在对象类型中的属性名称之后添加问号使其成为可选属性。
```js
// @flow
var obj: {foo?: boolean} = {};
obj.foo = true   // work
// $ExpectError
obj.foo = 'hello';   // Error! cannot assign `'hello'` to `obj.foo` because string [1] is incomptible with boolean [2]
```
除了它们的设置值类型之外，这些可选属性可以是void，也可以完全省略。但是，它们不能为null
```js
// @flow
function acceptsObject(value: {foo?: string}){

}
acceptsObject({foo: "bar"});    // works
acceptsObject({foo: undefined});  // works
// $ExpectError
acceptsObject({foo: null});    // Error
acceptsObject({});          // works
```
### 密封对象
使用其属性创建对象时，可在Flow中创建密封对象类型。这些密封对象将知道你声明它们的所有属性及其值的类型。
```js
// @flow
var obj = {
  foo: 1,
  bar: true,
  baz: 'three'
};
var foo: number = obj.foo;   // work
var bar: boolean = obj.bar;   // work
// $ExpectError
var baz: null = obj.baz;   // Error
var bat: string = obj.bat;  // Error
```
但是当对象被密封时，Flow将不允许你向它们添加新属性
```js
// @flow
var obj = {
  foo: 1
}
// $ExpectError
obj.bar = true;  // Error
// $ExpectError
obj.baz = 'three';  // Error
```
### 未密封对象
创建没有任何属性的对象时，可以在Flow中创建未密封的对象类型。这些未密封的对象不会知道它们的所有属性，并允许你添加新属性
```js
// @flow
var obj = {};
obj.foo = 1;   // works
obj.bar = true;  // works
obj.baz = 'tnree';   // works
```
属性的推断类型（类型注释）将成为你设置的属性
### 重新分配未密封的对象属性
类似于var和let变量，如果重新分配未密封对象的属性，默认情况下，Flow会为其指定所有可能分配的类型。
```js
// @flow
var obj = {};
if(Math.random()) obj.prop = true;
else obj.prop = 'hello';
// $ExpectError
var var1: boolean = obj.prop;  // Error
// $ExpectError
var val2: string = obj.prop;   // Error
var val3: boolean | string = obj.prop;   // work
```
有时，Flow能够在重新分配后（确定地）确定属性的类型。在这种情况下，Flow将为其提供已知类型。
```js
// @flow
var obj = {};
obj.prop = true;
obj.prop = 'hello';
// $ExpectError
var val1: boolean = obj.prop;  // Error
var val2: string = obj.prop;  // works
```
### 未密封对象上的未知属性查找是不安全的
未密封的对象允许随时写入新属性。Flow确保读取与写入兼容，但不确保在读取之前发生写入（按执行顺序）
这意味着永远不会检查没有匹配写入的未密封对象的读取。这是Flow的一种不安全行为，将来可能得到改善。
```js
var obj = {};
obj.foo = 1;
obj.bar = true;
var foo: number = obj.foo;   // works
var bar: boolean = obj.bar;  // works
var baz: string = obj.baz;   // works
```
### 精确对象类型
在Flow中，传递具有额外属性的对象被认为是安全的，其中期望正常的对象类型。
```js
// @flow
function method(obj: { foo: string }) {
  // ...
}

method({
  foo: "test", // Works!
  bar: 42      // Works!
});
```
有时禁用此行为并仅允许一组特定属性很有用。为此，Flow支持“精确”对象类型。
```js
{| foo: string, bar: number |}
```
与常规对象类型不同，将具有“额外”属性的对象传递给精确对象类型无效。
```js
// @flow
var foo: {| foo: string |} = { foo: "Hello", bar: "World!" }; // Error!
```
确切对象类型的交集可能无法按预期工作。如果需要组合确切的对象类型，请使用对象类型传播：
```js
// @flow
type FooT = {| foo: string |};
type BarT = {| bar: number |};
type FooBarFailT = FooT & BarT;
type FooBarT = {| ...FooT, ...BarT |};
const fooBarFail: FooBarFailT = { foo: '123', bar: 12 }; // Error!
const fooBar: FooBarT = { foo: '123', bar: 12 }; // Works!
```
### ObjectsAsMaps
较新版本的JavaScript标准包含一个Map类，但将对象用作Maps仍然很常见。在此用例中，对象可能会添加属性并在其整个生命周期中检索。此外，属性键甚至可能不是静态已知的，因此写出类型注释是不可能的。
对于像这样的对象，Flow提供了一种特殊的属性，称为“索引器属性”。索引器属性允许使用与索引器键类型匹配的任何键进行读写。
```js
// @flow
var o: { [string]: number } = {};
o["foo"] = 0;
o["bar"] = 1;
var foo: number = o["foo"];
```
可以选择命名索引器，以用于文档目的：
```js
// @flow
var obj: { [user_id: number]: string } = {};
obj[1] = "Julia";
obj[2] = "Camille";
obj[3] = "Justin";
obj[4] = "Mark";
```
当对象类型具有索引器属性时，假定属性访问具有带注释的类型，即使该对象在运行时没有该槽中的值。程序员有责任确保访问是安全的，就像数组一样。
```js
var obj: { [number]: string } = {};
obj[42].length; //没有类型错误，但会在运行时抛出
```
索引器属性可以与命名属性混合使用
```js
// @flow
var obj: {
  size: number,
  [id: number]: string
} = {
  size: 0
};
function add(id: number, name: string) {
  obj[id] = name;
  obj.size++;
}
```
### Object Type
有时编写接受任意对象的类型是有用的，对于那些你应该写{}的类似：
```js
function method(obj:{}){

}
```
但是，如果您需要选择退出类型检查程序，并且不想一直转到任何类型检查程序，则可以改为使用Object。Object 不安全，应该避免。
例如，以下代码不会报告任何错误：
```js
function method(obj: Object) {
  obj.foo = 42;               // Works.
  let bar: boolean = obj.bar; // Works.
  obj.baz.bat.bam.bop;        // Works.
}
method({ baz: 3.14, bar: "hello" });
```
### 数组类型
要创建数组类型，可以使用`Array<Type>type`, 其中Type是数组中元素的类型。例如，要为数组创建类型，请使用`Array<number>`
```js
let arr: Array<number> = [1,2,3]
```
you can put any type within `Array<Type>`
```js
let arr1: Array<boolean> = [true,false,true];
let arr2: Array<string> = ['A','B','C'];
let arr3: Array<mixed> = [1,true, 'three']
```
#### 快速语法
```js
let arr: number[] = [0,1,2,3]
```
请注意，`？Type[]`相当于`?Array<T>`而不是Array`<? T>`
```js
// @flow
let arr1: ?number[] = null; // works
let arr2: ?number[] = [1,2]; // works
let arr3: ?number[] = [null];  // Error
```
如果你想使它成为`Array<? T>`你可以使用括号，如：`(? Type)[]`
```js
// @flow
let arr1: (?number)[] = null;   // Error
let arr2: (?number)[] = [1,2];  // works
let arr3: (?number)[] = [null];  // works
```
### 数组访问不安全
从数组中检索元素时，始终存在未定义的元素。你可以访问一个超出数组边界的索引，或者该元素不能存在，因为它是一个’稀疏数组‘。
例如，你可能正在访问超出数组范围的元素
```js
// @flow
let array: Array<number> = [0,1,2];
let value: number = array[3];  // works  undefined
```
或者你可以访问一个不存在的元素，如果它是一个’稀疏数组‘
```js
// @flow
let array: Array<number> = [];
array[0] = 0;
array[2] = 2;
let value: number = array[1];  // works  undefined
```
为了使这个安全，Flow必须将每个单独的数组访问标记为“可能未定义”。
Flow不会这样做，因为它使用起来非常不方便。你讲被迫优化访问数组时获得的每个值的类型。
```js
let array: Array<number> = [0,1,2];
let value: number | void = array[1];
if(value !== undefined) {
  // number
}
```
由于Flow变得更加智能，将来有可能解决这个问题，但是现在你应该意识到这一点。
### 元组类型
元组是一种列表，但具有有限的项目集。在JavaScript中，使用数组创建元组。
在Flow中，你可以使用[type,type,type]语法创建元组。
```js
let tuple1: [number] = [1];
let tuple2: [number,boolean] = [1,true];
let tuple3: [number,boolean,string] = [1,true,'three'];
```
当你从特定索引处的元组获取值时，它将返回该索引处的类型。
```js
// @flow
let tuple: [number,boolean,string] = [1,true,'three'];
let num: number = tuple[0];   // works
let bool: boolean = tuple[1]; // works
let str: string = tuple[2];  // works
```
如果你尝试不存在的索引获取它将返回一种void。
```js
// @flow
let tuple: [number,boolean,string] = [1,true,'three'];
let none: void = tuple[3];
```
如果Flow不知道你尝试访问哪个索引，它将返回所有可能的类型
```js
// @flow
let tuple: [number,boolean,string] = [1,true,'three'];
function getItem(n:number){
  let val: number | boolean | string = tuple[n];
}
```
在元组内设置新值时，新值必须与该索引处的类型匹配
```js
// @flow
let tuple: [number,boolean,string] = [1,true,'three'];
tuple[0] = 2;  // works
tuple[1] = false;  // works
tuple[2] = 'foo';  // works
// $ExpectError
tuple[0] = 'bar';  // Error
tuple[1] = 42;  // Error
tuple[2] = false;  // Error
```
#### 严格执行元组长度
元组的长度称为“arity”。在Flow中严格执行元组的长度。
**元组只匹配相同长度的元组**
他的意思是不能使用较短的元组代替较长的元组。
```js
// @flow
let tuple1: [number,boolean] = [1,true];
// $ExpectError
let tuple2: [number,boolean,void] = tuple1;  // Error
```
此外，不能使用较长的元组来代替较短的元组。
```js
// @flow
let tuple1: [number,boolean,void] = [1,true];
// $ExpectError
let tuple2: [number,boolean] = tuple1; // Error
```
#### 元组与数组类型不匹配
由于Flow不知道数组的长度，因此无法将`Array <T>`类型传递给元组。
```js
// @flow
let array: Array<number> = [1,2];
// $ExpectError
let tuple: [number,number] = array; // Error
```
另外一个元组类型不能传递给`Array <T>`类型，因为那样你就可以以不安全的方式改变元组。
```js
// @flow
let tuple: [number,number] = [1,2];
// $ExpectError
let array: Array<number> = tuple;  // Error
```
#### 不能在元组上使用变异数组方法
你不能使用改变元组的Array.prototype方法，只能使用不改变元组的方法
```js
// @flow
let tuple: [number,number] = [1,2];
tuple.join(', '); // works
// $ExpectError
tuple.push(3);   // Error
```
### Class类型
Flow中的JavaScript类既可以作为值，也可以作为类型。
你可以像没有Flow一样编写类，但是你可以使用类的名称作为类型
```js
class MyClass {

}
let myInstance: MyClass = new MyClass();
```
Flow中的类与普通的JavaScript类相同，但添加了类型
#### Class 方法
就像在函数中一样，类方法可以参数（输入）和返回（输出）的注释
```js
class MyClass {
  method(value: string): number {}
}
```
#### class 字段（属性）
每当要在Flow中使用类字段时，必须先给一个注释
```js
// @flow
class MyClass {
  method() {
    // $ExpectError
    this.prop = 42;  // Error
  }
}
```
上面的方式是错误的在flow中。字段在类的主体内注释，字段名称后冒号：和类型
```js
// @flow
class MyClass {
  prop: number;
  method() {
    this.prop = 42
  }
}
```
Flow还支持使用类属性语法
```js
class MyClass {
  prop = 42
}
```
使用此语法时，不需要为其指定类型注释。但如果你需要，你可以
```js
class MyClass {
  prop: number = 42
}
```
#### 类泛型
classes 也可以有自己的泛型
```js
class MyClass<A,B,C> {
  property: A;
  method(val: B): C {

  }
}
```
类泛型是参数化的。当您使用类作为类型时，您需要为每个泛型传递参数。
```js
// @flow
class MyClass<A,B,C>{
  constructor(arg1: A,arg2: B,arg3: C){

  }
}
var val: MyClass<number,boolean,string> = new MyClass(1,true,'three')
```
### 类型别名
当您有要在多个位置重用的复杂类型时，可以使用 类型别名 在Flow中对它们进行别名
```js
// @flow
type MyObject = {
  foo: number,
  bar: boolean,
  baz: string
}
```
这些类型的别名可以在任何可以使用类型的地方使用。
```js
// @flow
type MyObject = {}
var val: MyObejct = {};
function method(val: MyObject){}
class Foo {constructor(val: MyObecjt){}}
```
#### 类型别名语法
使用关键字type后跟其名称，等号=和类型定义来创建类型别名。
```js
type Alias = Type
```
任何类型都可以出现在类型别名中
```js
type NumberAlias = number;
type ObjectAlias = {
  property: string,
  method(): number
}
type UnionAlias = 1 | 2 | 3;
type AliasAlias = ObjectAlias
```
#### 类型别名泛型
类型别名也可以有自己的泛型。
```js
type MyObject<A,B,C> = {
  property: A,
  method(val: B): C
}
```
类型别名泛型已参数化。当您使用类型别名时，您需要为每个泛型传递参数。
```js
// @flow
type MyObject<A,B,C> = {
  foo: A,
  bar: B,
  baz: C
}
var val: MyObject<number,boolean,string> = {
  foo: 1,
  bar: true,
  baz: 'three'
}
```
#### 不透明类型别名
不透明类型别名是类型别名，不允许在定义它们的文件之外访问其基础类型。
```js
opaque type ID = string
```
与常规类型别名一样，可以在任何可以使用类型的地方使用
```js
// @flow
opaque type ID = string;
function identity(x: ID): ID {
  return x
}
export type {ID}
```
#### 不透明类型语法
您可以选择通过添加冒号来添加子类型约束到opaque类型别名：和名称后面的类型。
```js
opaque type Alias: SuperType = Type;
```
任何类型都可以显示为不透明类型别名的超类型或类型。
```js
opaque type StringAlias = string;
opaque type ObjectAlias = {
  property: string,
  method(): number,
};
opaque type UnionAlias = 1 | 2 | 3;
opaque type AliasAlias: ObjectAlias = ObjectAlias;
opaque type VeryOpaque: AliasAlias = ObjectAlias;
```
当在同一文件中定义别名时，opaque类型别名的行为与常规类型别名的行为完全相同
```js
//@flow
opaque type NumberAlias = number;
(0: NumberAlias);
function add(x: NumberAlias, y: NumberAlias): NumberAlias {
    return x + y;
}
function toNumberAlias(x: number): NumberAlias { return x; }
function toNumber(x: NumberAlias): number { return x; }
```
导入opaque类型别名时，它的行为类似于名义类型，隐藏其基础类型。
```js
// exports.js
export opaque type NumberAlias = number;
// imports.js
import type {NumberAlias} from './exports';
(0: NumberAlias) // Error: 0 is not a NumberAlias!
function convert(x: NumberAlias): number {
  return x; // Error: x is not a number!
}
```
#### 子类型约束
将子类型约束添加到opaque类型别名时，我们允许opaque类型在定义文件之外时用作超类型。
```js
// exports.js
export opaque type ID: string = string;
// imports.js
import type {ID} from './exports';
function formatID(x: ID): string {
  return "ID: "+ x;   // ok! IDs are strings
}
function toID(x: string): ID {
  return x;   // Error: strings are not IDs
}
```
使用子类型约束创建opaque类型别名时，类型位置中的类型必须是超类型位置中类型的子类型。
```js
// @flow
opaque type Bad: string = number;   // Error: number is not a subtype of string
opaque type Good: {x: string} = {x: string,y: number};
```
#### 泛型
不透明类型的别名也可以有自己的泛型，它们的工作方式与普通类型别名中的泛型一样
```js
// @flow
opaque type MyObject<A,B,C>: {foo: A,bar: B} = {
  foo: A,
  bar: B,
  baz: C
}
var val: MyObject<number,boolean,string> = {
  foo: 1,
  bar: true,
  baz: 'three'
}
```
#### Library Definitions
你可以在libdefs中声明opaque类型别名。在那里，你省略了基础类型，但仍可选择包含超类型
```js
declare opaque type Foo
declare opaque type PositiveNumber: number
```
### 接口类型
Flow中的类名义上是键入的。这意味着当你有两个单独的类时，即使它们具有相同的属性和方法，也不能使用一个类代替另一个。
```js
// @flow
class Foo {
  serialize() {return '[Foo]'}
}
class Bar {
  serialize() {return '[Bar]'}
}
// $ExpectError
const foo: Foo = new Bar();   // Error
```
相反，您可以使用接口来声明您期望的类的结构。
```js
// @flow
interface Serializable {
  serialize(): string
}
class Foo {
  serialize(){return '[Foo]'}
}
class Bar {
  serialize() {return '[Bar]'}
}
const foo: Serializable = new Foo();   // works
const bar: Serializeble = new Bar();   // works
```
您还可以使用implements来告诉Flow您希望该类与接口匹配。这可以防止您在编辑类时进行不兼容的更改。
```js
// @flow
interface Serializable {
  serialize(): string
}
class Foo implements Serializable {
  serialize() {return '[Foo]'}   // works
}
class Bar implements Serializable {
  // $ExpectError
  serialize() {return 42}  // Error
}
```
您还可以使用具有多个接口的工具。
```js
class Foo implements Bar, Baz {}
```
#### 接口语法
接口是使用关键字interface，后跟其名称和包含类型定义主体的块创建的。
```js
interface MyInterface {}
```
块的语法与对象类型的语法匹配，并具有所有相同的功能
#### 接口方法
您可以按照与对象方法相同的语法向接口添加方法。
```js
interface MyInterface {
  method(value: string): number
}
```
#### 接口属性
您可以按照与对象属性相同的语法向接口添加属性。
```js
interface MyInterface {
  property: string
}
```
接口属性也是可选的。
```js
interface MyInterface {
  property?: string
}
```
#### 接口Maps
您可以使用与对象相同的方式创建“索引器属性”。
```js
interface MyInterface {
  [key: string]: number
}
```
#### 接口泛型
接口也可以有自己的泛型。
```js
interface MyInterface<A,B,C> {
  property: A;
  method(val: B): C
}
```
接口泛型已参数化。使用接口时，需要为每个泛型传递参数
```js
// @flow
interface MyInterface<A,B,C> {
  foo: A;
  bar: B;
  baz: C;
}
var val: MyInterface<number, boolean, string> = {
  foo: 1,
  bar: true,
  baz: 'three'
}
```
#### 接口属性变量（只读和只写）
默认情况下，接口属性是不变的。但是你可以添加修饰符以使它们协变（只读）或逆变（只写）
```js
interface MyInterface {
  +covariant: number;   // read-only
  -contravariant: number; // write-only
}
```
#### 接口上的协变（只读）属性
您可以通过在属性名称前添加加号+来使属性协变。
```js
interface MyInterface {
  +readOnly: number | string;
}
```
这允许您传递更具体的类型来代替该属性。
```js
// @flow
// $ExpectError
interface Invariant {  property: number | string }
interface Covariant { +readOnly: number | string }

var value1: Invariant = { property: 42 }; // Error!
var value2: Covariant = { readOnly: 42 }; // Works!
```
由于协方差的工作原理，协变属性在使用时也变为只读。这对普通属性有用。
```js
// @flow
interface Invariant {  property: number | string }
interface Covariant { +readOnly: number | string }

function method1(value: Invariant) {
  value.property;        // Works!
  value.property = 3.14; // Works!
}

function method2(value: Covariant) {
  value.readOnly;        // Works!
  // $ExpectError
  value.readOnly = 3.14; // Error!
}
```
#### 接口上的逆变（只写）属性
您可以通过在属性名称前添加减号来创建属性逆变。
```js
interface InterfaceName {
  -writeOnly: number;
}
```
这允许您传递一个不太具体的类型来代替该属性。
```js
// @flow 
interface Invariant {property: number}
interface Contravariant {-writeOnly: number}
var numberOrString = Math.random() > 0.5 ? 42 : 'forty-two';
// $ExpectError
var value1: Invariant = {property: numberOrString};  // Error
var value2: Contravariant = {writeOnly: numberOrString};  // works
```
由于逆变的工作原理，逆变属性在使用时也会变为只写。这对普通属性有用。
```js
interface Invariant {property: number}
interface Contravariant {-writeOnly: number}
function method1(value: Invariant){
  value.property;    // works
  value.property = 3.13;   // works
}
function method2(value: Contravariant){
  // $ExpectError
  value.writeOnly;   // Error
  value.writeOnly = 3.14;  // works
}
```
#### 泛型
泛型（有时称为多态类型）是一种抽象类型的方法。 想象一下编写以下身份函数，它返回传递的任何值。
```js
function identity(value){
  return value
}
```
我们在尝试为此函数编写特定类型时会遇到很多麻烦，因为它可能是任何东西。
```js
function identity(value: string): string {
  return value;
}
```
相反，我们可以在函数中创建泛型（或多态类型），并使用它代替其他类型。
```js
function identity<T>(value: T): T {
  return value;
}
```
泛型可以在函数，函数类型，类，类型别名和接口中使用。

::: tip
警告：Flow不会推断泛型类型。如果您希望某些东西具有泛型类型，请对其进行注释。否则，Flow可能会推断出比您预期的多态性更低的类型。
:::
在下面的示例中，我们忘记使用泛型类型正确地注释 identity ，因此当我们尝试将其分配给func时会遇到麻烦。另一方面，genericIdentity已正确输入，我们可以按预期使用它。
```js
// @flow
type IdentityWrapper = {
  func<T>(T): T
}
function identity(value) {
  return value;
}
function genericIdentity<T>(value: T): T {
  return value;
}
// $ExpectError
const bad: IdentityWrapper = { func: identity }; // Error!
const good: IdentityWrapper = { func: genericIdentity }; // Works!
```
#### 具有泛型的函数
函数可以通过在函数参数列表之前添加类型参数列表`<T>`来创建泛型。 您可以在函数（参数或返回类型）中添加任何其他类型的相同位置使用泛型。
```js
function method<T>(param: T): T {
  // ...
}
function<T>(param: T): T {
  // ...
}
```
#### 具有泛型的函数类型
函数类型可以通过在函数类型参数列表之前添加类型参数`list <T>`，以与普通函数相同的方式创建泛型。 您可以在函数类型（参数或返回类型）中添加任何其他类型的相同位置使用泛型。
```js
<T>(param: T) => T
```
然后将其用作自己的类型
```js
function method(func: <T>(param: T) => T){}
```
#### 具有泛型的类
类可以通过将类型参数列表放在类的主体之前来创建泛型
```js
class Item<T> {}
```
你可以在类中添加任何其他类型的相同位置使用泛型（属性类型和方法参数/返回类型）
```js
class Item<t> {
  prop: T;
  constructor(param: T){
    this.prop = param;
  }
  method(): T {
    return this.prop
  }
}
```
#### 具有泛型的类型别名
```js
type Item<T> = {
  foo: T,
  bar: T,
};
```
#### 具有泛型的接口
```js
interface Item<T> {
  foo: T,
  bar: T
}
```
#### 泛型特性
**泛型就像变量一样**
泛型类型很像变量或函数参数，除了它们用于类型。只要它们在范围内，您就可以使用它们
```js
function constant<T>(value: T) {
  return function(): T {
    return value;
  };
}
```
#### 根据需要创建尽可能多的泛型
您可以在类型参数列表中根据需要使用这些泛型，并根据需要命名它们：
```js
function identity<One, Two, Three>(one: One, two: Two, three: Three) {
  // ...
}
```
#### 泛型跟踪
当对值使用泛型类型时，Flow将跟踪该值并确保您不会将其替换为其他值。
```js
// @flow
function identity<T>(value: T): T {
  // $ExpectError
  return "foo"; // Error!
}

function identity<T>(value: T): T {
  // $ExpectError
  value = "foo"; // Error!
  // $ExpectError
  return value;  // Error!
}
```
Flow跟踪您通过泛型的值的特定类型，以便稍后使用。
```js
// @flow
function identity<T>(value: T): T {
  return value;
}

let one: 1 = identity(1);
let two: 2 = identity(2);
// $ExpectError
let three: 3 = identity(42);
```
#### 将类型添加到泛型
与 mixed 类似，泛型具有“未知”类型。您不能使用泛型，就好像它是特定类型一样。
```js
// @flow
function logFoo<T>(obj: T): T {
  // $ExpectError
  console.log(obj.foo); // Error!
  return obj;
}
```
您可以优化类型，但泛型仍然允许传入任何类型。
```js
// @flow
function logFoo<T>(obj: T): T {
  if (obj && obj.foo) {
    console.log(obj.foo); // Works.
  }
  return obj;
}
logFoo({ foo: 'foo', bar: 'bar' });  // Works.
logFoo({ bar: 'bar' }); // Works. :(
```
相反，您可以像使用函数参数一样为泛型添加类型。
```js
// @flow
function logFoo<T: { foo: string }>(obj: T): T {
  console.log(obj.foo); // Works!
  return obj;
}

logFoo({ foo: 'foo', bar: 'bar' });  // Works!
// $ExpectError
logFoo({ bar: 'bar' }); // Error!
```
这样，您可以保留泛型的行为，同时仅允许使用某些类型。
```js
// @flow
function identity<T: number>(value: T): T {
  return value;
}

let one: 1 = identity(1);
let two: 2 = identity(2);
// $ExpectError
let three: "three" = identity("three");
```
#### 泛型充当边界
```js
// @flow
function identity<T>(val: T): T {
  return val;
}
let foo: 'foo' = 'foo';           // Works!
let bar: 'bar' = identity('bar'); // Works!
```
在Flow中，大多数情况下，当你将一种类型传递到另一种类型时，你将失去原始类型。因此，当你将特定类型传递给不太具体的一个流程’界限‘时，它曾经是更具体的东西。
```js
// @flow
function identity(val: string): string {
  return val
}
let foo: 'foo' = 'foo';  // works
// $ExpectError
let bar: 'bar' = identity('bar');   // Error
```
泛型允许你在添加约束时保留更具体的类型。通过这种方式，泛型上的类型充当“边界”。
```js
// @flow
function identity<T: string>(val: T): T {
  return val;
}
let foo: 'foo' = 'foo';           // Works!
let bar: 'bar' = identity('bar'); // Works!
```
请注意，如果你具有绑定泛型类型的值，则不能将其用作更具体的类型
```js
// @flow
function identity<T: string>(val: T): T {
  let str: string = val; // Works!
  // $ExpectError
  let bar: 'bar'  = val; // Error!
  return val;
}
identity('bar');
```
#### 参数化泛型
泛型有时允许您将类似参数的类型传递给函数。这些被称为参数化泛型（或参数多态）。
例如，参数化具有泛型的类型别名。当你去使用它时，你必须提供一个类型参数。
```js
type Item<T> = {
  prop: T,
}
let item: Item<string> = {
  prop: "value"
};
```
您可以将此视为将函数传递给函数，只有返回值是您可以使用的类型。
类（当用作类型时），类型别名和接口都要求您传递类型参数。函数和函数类型没有参数化泛型。
**classes**
```js
// @flow
class Item<T> {
  prop: T;
  constructor(param: T) {
    this.prop = param;
  }
}
let item1: Item<number> = new Item(42); // Works!
// $ExpectError
let item2: Item = new Item(42); // Error!
``` 
#### Type Aliases 类型别名
```js
// @flow
type Item<T> = {
  prop: T,
};
let item1: Item<number> = { prop: 42 }; // Works!
// $ExpectError
let item2: Item = { prop: 42 }; // Error!
```
#### 接口
```js
// @flow
interface HasProp<T> {
  prop: T,
}
class Item {
  prop: string;
}
(Item.prototype: HasProp<string>); // Works!
// $ExpectError
(Item.prototype: HasProp); // Error!
```
#### 添加参数化泛型的默认值
你还可以像函数一样为参数化泛型提供默认值
```js
type Item<T: number = 1> = {
  prop: T,
};
let foo: Item<> = { prop: 1 };
let bar: Item<2> = { prop: 2 };
```
使用类型时，必须始终包括括号`<>`（就像函数调用的括号一样）。
### 联合类型
有时，创建一个其他类型之一的类型很有用。例如，你可能希望编写一个接受一组原始值类型的函数。对于此Flow支持联合类型。
```js
// @flow
function toStringPrimitives(value: number | boolean | string){
  return String(value);
}
toStringPrimitives(1);   // works
toStringPrimitives(true);   // works
toStringPrimitives('three');   // works
// $ExpectError
toStringPrimitives({prop: 'val'});  // Error
toStringPrimitives([1,2,3,4,5]);   // Error
```
#### 语法
联合类型是任意数量的类型，由|连接
```js
Type1 | Type2 | ... | TypeN
```
您还可以添加一个引导竖线，这在将联合类型拆分到多行时非常有用。
```js
type Foo =
  | Type1
  | Type2
  | ...
  | TypeN
```
联合类型的每个成员可以是任何类型，甚至可以是另一个联合类型
```js
type Numbers = 1 | 2;
type Colors = 'red' | 'blue'
type Fish = Numbers | Colors;
```
#### 联合类型需要一个输入，但全部输出
在调用接受联合类型的函数时，必须传入其中一种类型。但是在函数内部，我们需要处理所有可能的类型。
让我们重写函数，分别处理每种类型
```js
// @flow
// $ExpectError
function toStringPrimitives(value: number | boolean | string): string { // Error!
  if (typeof value === 'number') {
    return String(value);
  } else if (typeof value === 'boolean') {
    return String(value);
  }
}
```
您会注意到，如果我们不处理值的每种可能类型，Flow将给我们一个错误。
#### 联合 & 细化
当您有一个联合类型的值时，将其分开并分别处理每个单独的类型通常是很有用的。使用流中的联合类型，您可以将值“细化”为单个类型。
```js
// @flow
function toStringPrimitives(value: number | boolean | string) {
  if (typeof value === 'number') {
    return value.toLocaleString([], { maximumSignificantDigits: 3 }); // Works!
  }
  // ...
}
```
通过检查值的类型并测试它是否是一个数字，Flow知道在该块内部它只是一个数字。然后，我们可以编写代码，将我们的值视为该块内的一个数字。
#### 不相交联合
在flow中有一种特殊类型的联合，称为“不相交联合”，可用于改进。这些不相交的联合由任意数量的对象类型组成，每个对象类型都由一个属性标记。
例如，假设我们有一个函数，用于在发送请求后处理来自服务器的响应。当请求成功时，我们将返回一个具有成功属性的对象，该属性是true和我们已经更新的值。
```js
{success: true,value: false}
```
当请求失败时，我们将获得一个成功设置为false的对象和一个描述错误的Error属性
```js
{success: false,error: 'Bad request'}
```
我们可以尝试用一个对象类型来表示这两个对象。但是，我们很快就会遇到这样的问题：我们根据Success属性知道一个属性存在，但Flow不知道
```js
// @flow
type Response = {
  success: boolean,
  value?: boolean,
  error?: string
};
function handleResponse(response: Response){
  if(response.success){
    // $ExpectError
    var value: boolean = response.value; // Error
  }else{
    // $ExpectError
    var error: string = response.error;  // Error
  }
}
```
试图把这两种不同的类型合并成一种，只会给我们带来麻烦
相反，如果我们创建这两种对象类型的联合类型，Flow将能够根据Success属性知道我们使用的是哪个对象
```js
// @flow
type Success = {success: true,value: boolean};
type Failed = {success: false,error: string};
type Response = Success | Failed;
function handleResponse(response: Response){
  if(response.success){
    var value: boolean = response.value;   // works
  }else {
    var error: string = response.error;   // works
  }
}
```
#### 精确的不相交联合
不相交的联合要求你使用单个属性来区分每种对象类型。不能通过不同的属性区分两个不同的对象
```js
// @flow
type Success = {success: true, value: boolean};
type Failed = {error: true,massage: string};
function handleResponse(response: Success | Failed){
  if(response.success){
    var value: boolean = response.value  // Error
  }
}
```
这是因为在Flow中传递一个属性比对象类型期望的属性多的对象值是可以的（因为宽度子类型）
```js
// @flow
type Success = {success: true,value: boolean};
type Failed = {error: true,message: string};
function handleResponse(response: Success | Failed){

}
handleResponse({
  success: true,
  error: true,
  value: true,
  message: 'hi'
})
```
除非这些物体在某种程度上相互冲突，否则就没办法区分它们。
但是，要解决这个问题，你可以使用精确的对象类型
```js
// @flow
type Success = {| success: true,value: boolean |};
type Failed = {| error: true, message: string |};
type Response = Success | Failed;
function handleResponse(response: Response){
  if(response.success){
    var value: boolean = response.value
  }else{
    var message: string = response.message
  }
}
```
有了精确的对象类型，我们就不可能有额外的属性，所以对象之间会发生冲突，我们就能区分出哪个是哪个
### 相交类型
有时候，创建一个类型（它是一组其他类型的集合）是很有用的。例如，你可能希望编写一个接受对象的函数，该对象时其他对象类型的组合。
为此，Flow支持交集类型    
```js
// @flow
type A = {a: number};
type B = {b: boolean};
type C = {c: string};
function method(value: A & B & C){

}
// $ExpectError
method({a: 1});   // Error
// $ExpectError
method({a: 1,b: true});   // Error
method({a: 1,b: true, c: 'three'});   // works
```
#### 相交类型语法
交集类型是任意数量的类型，这些类型是由&号连接的
```js
Type1 & Type2 & ... & TypeN
```
交集类型的每个成员可以是任何类型，甚至是另一个交集类型
```js
type Foo = Type1 & Type2;
type Bar = Type3 & Type4;
type Baz = Foo & Bar
```
**交集类型需要全部输入，但只需要一个输出**
交集类型与并集类型相反。当调用接受交集类型的函数时，我们必须传入所有这些类型。但是在我们的函数内部，我们只需要把它当做这些类型中的任何一种。
```js
// @flow
type A = {a: number};
type B = {b: boolean};
type C = {c: string};
function method(value: A & B & C){
  var a: A = value;
  var b: B = value;
  var c: C = value;
}
```
即使我们只将值视为其中的一种类型，我们也不会得到一个错误，因为它满足了所有类型
#### 不可能相交类型
使用相交类型，可以创建在运行时无法创建的类型。交集类型允许你组合任何类型集，即使是那些相互冲突的类型。
例如，可以创建数字和字符串的相交类型
```js
// @flow
type NumberAndString = number & string
function method(value: NumberAndString){

}
// $ExpectError
method(3.14);  // Error
method('hi')    // Error
```
但是你不可能同时创建一个数字和一个字符串的值，但是你可以为它创建一个类型。创建这样的类型没有实际的用途，但是它是交集类型工作方式的副作用
#### 对象相交类型
创建对象相交类型时，可以将它们的所有属性合并在一起
例如，当你创建具有不同属性集的两个对象的交集时，它将导致具有所有属性的对象
```js
// @flow
type One = {foo: number};
type Two = {bar: boolean};
type Both = One & Two
var value: Both = {
  foo: 1,
  bar: true
}
```
但是，当你的属性通过具有相同的名称而重叠时，它也会创建属性类型的交集
例如，如果将两个对象与名为prop的属性合并，其中一个对象的类型为Number，另一个对象的类型为布尔，则得到的对象将具有数字和布尔值的交集
```js
// @flow
type One = {prop: number};
type Two = {prop: boolean};
type Both = One & Two
// $ExpectError
var value: Both = {
  prop: 1   // Error
}
```
#### 获取类型的类型
JavaScript有一个TypeOf操作符，它返回一个描述值的字符串
```js
typeof 1 === 'number'
typeof true === 'boolean'
typeof 'three' === 'string'
```
但是，由于这个字符串只描述了关于类型的太多内容，所以它是有限的
```js
typeof {foo: true} === 'object'
typeof {bar: true} === 'object'
typeof [true,false] === 'object'
```
在Flow中，有一个类似类型的操作符，但它的功能要强大得多。ss
#### 获取类型语法
TypeOf运算符返回给定值的流类型，以用作类型
```js
// @flow
let num1 = 42;
let num2: typeof num1 = 3.14;   // works
// $ExpectError
let num3: typeof num1 = 'world';    // Error
let bool1 = true
let bool2: typeof bool1 = false  // works
// $ExpectError
let bool3: typeof bool1 = 42;   // Error
let str1 = 'hello';
let str2: typeof str1 = 'world'; // works
// $ExpectError
let str3: typeof str1 = false;   // Error
```
你可以在Typeof中使用任何值
```js
// @flow
let obj1 = {foo: 1,bar: true,baz: 'three'};
let obj2: typeof obj1 = {foo: 42,bar: false,baz: 'hello'};
let arr1 = [1,2,3];
let arr2: typeof arr1 = [3,2,1]
```
#### 类型继承-推理行为
Flow对你的代码执行各种类型推断，因此你不必键入任何注释。一般情况下，推理会避免妨碍你的方法，同时也会阻止你引入bug
但是，当你使用typeof时，你是在获取Flow的推断结果，并将其断言为一个类型。虽然这可能非常有用，但也可能导致一些意向不到的结果
例如，当你在流中使用文本值时，它们推断的类型就是它所属的基元。因此，数字42具有推断出的数字类型。使用typeof时可以看到这一点
```js
// @flow
let num1 = 42;
let num2: typeof num1 = 3.14;   // works
let bool1 = true
let bool2: typeof bool1 = false;   // works
let str1 = 'hello';
let str2: typeof str1 = 'world';   // works
```
但是，这只发生在推断的类型中。如果指定文字类型，则将在typeof中使用它
```js
// @flow
let num1: 42 = 42;
// $ExpectError
let num2: typeof num1 = 3.14;   // Error
let bool1: true = true
// $ExpectError
let bool2: typeof bool1 = false;    // Error
let str1: 'hello' = 'hello'
// $ExpectError
let str2: typeof str1 = 'world';   // Error
```
#### 类型继承其他类型的行为
flow中有许多不同的类型，其中一些类型的行为与其他类型不同。这些差异对该特定类型是有意义的，但对其他类型则没有意义
当你使用typeof时，你插入的是另一个类型及其所有行为。这可以使类型看起来不一致的地方，它不是
例如，如果在类中使用typeof，则需要记住类名义上是类型化的，而不是结构类型化的。因此，两个具有相同确切形状的类不被认为是等价的。
```js
// @flow
class MyClass {
  method(val: number) {}
}
class YourClass {
  method(val: number){}
}
// $ExpectError
let test1: typeof MyClass = YourClass;   // Error
let test2: typeof MyClass = MyClass;  // works
```
### 类型转换表达式
有时候，断言类型而不用函数或变量这样做是有用的。对于这个flow，它支持内联类型转换表达式语法，可以多种不同的方式使用它
#### 类型转换表达式语法
为了围绕值创建类型转换表达式，添加一个冒号：withtheType,并用圆括号()包装表达式
```js
(value: Type)
```
::: tip
注意： 括号是必要的，以避免与其他语法的歧义
:::
类型转换表达式可以出现在表达式可以出现的任何地方
```js
let val = (value: Type)
let obj = {prop: (value: Type)}
let arr = ([(value: Type),(value: Type)]: Array<Type>)
```
值本身也可以是表达式：
```js
(2+2: number)
```
当你剥离类型时，只剩下值
```js
(value: Type);
value
```
#### 类型断言
使用类型转换表达式，你可以断言值时某些类型
```js
// @flow
let value = 42;
(value: 42);   // works
(value: number);   // works
(value: string)   // Error
```
以这种方式断言类型的工作方式与其他任何地方的类型相同
#### 铸造类型
当你编写类型转换表达式时，该表达式的结果是具有所提供类型的值。如果你持有结果值，则它将具有新类型
```js
// @flow
let value = 42;
(value: 42);   // works
(value: number);  // works
let newValue = (value: number)
// $ExpectError
(newValue: 42);   // Error
(newValue: number);   // works
```
#### 使用类型转换表达式
::: tip
注意：我们将通过一个简单的示例来演示如何使用类型转换表达式。这个例子在实践中没有得到很好的解决
:::
#### 类型铸造
因为类型强制转换与所有其他类型注释的工作方式相同，所以只能将值强制转换为不太特定的类型。你不能更改类型或使其更具体
但是你可以使用任何类型的转换来转换为你想要的任何类型
```js
let value = 42;
(value: number);  // works
// $ExpectError
(value: string);   // Error
let newValue = ((value: any): string);
// $ExpectError
(newValue: number);   // Error
(newValue: string);    // works
```
通过将值强制转换为任何值，然后可以将其转换为任何你想要的值
这是不安全的，不推荐使用。但是，当你使用一个很难或不可能键入的值并希望确保结果具有所需的类型时，它有时是有用的
例如，下面的函数用于克隆对象
```js
function cloneObject(obj){
  const clone = {};
  Object.keys(obj).forEach(key => {
    clone[key] = obj[key]
  })
  return clone
}
```
要为此创建一个类型是很困难的，因为我们正在基于另一个对象创建一个新对象。
如果我们对任何类型进行强制转换，则可以返回一个更有用的类型。
```js
// @flow
function cloneObject(obj){
  const clone = {};
  Object.keys(obj).forEach(key => {
    clone[key] = obj[key]
  })
  return ((clone: any): typeof obj)
}
const clone = cloneObject({
  foo: 1,
  bar: true,
  baz: 'three'
})
(clone.foo: 1);  // works
(clone.bar: true);   // works
(clone.baz: 'three');   // works
```
#### 通过类型断言进行类型检查
如果我们想要验证来自之前的cloneObject方法中的类型，我们可以编写以下注释
```js
function cloneObject(obj: {[key: string]: mixed})
```
但现在我们有麻烦了。我们的TypeOfobj注释也得到了这个新注释，它破坏了整个目的
```js
// @flow
function cloneObject(obj: {[key: string]: mixed}){
  const clone = {};
  return ((clone: any): typeof obj)
}
const clone = cloneObject({
  foo: 1,
  bar: true,
  baz: 'three'
})
// $ExpectError
(clone.foo: 1);    // Error
// $ExpectError
(clone.bar: true);   // Error
// $ExpectError
(clone.baz: 'three');   // Error
```
相反，我们可以使用类型断言来判断函数中的类型，现在我们正在验证我们的输入
```js
// @flow
function cloneObject(obj){
  (obj: {[key: string]: mixed})
}
cloneObject({foo: 1});   // works
// $ExpectError
cloneObject([1,2,3])   // Error
```
现在，类型推断可以继续为Typeofobj工作，它返回对象的预期形状
```js
// @flow
function cloneObject(obj) {
  (obj: { [key: string]: mixed }); // <<
  const clone = {};
  // ...
  return ((clone: any): typeof obj);
}
const clone = cloneObject({
  foo: 1,
  bar: true,
  baz: 'three'
});
(clone.foo: 1);       // Works!
(clone.bar: true);    // Works!
(clone.baz: 'three'); // Works!
```
::: tip
注：这不是解决上述问题的正确方法，仅用于演示。正确的解决方案是注释该函数，如下所示： 
:::
```js
function cloneObject<T: {[key: string]: mixed}>(obj: T): $Shape<T> {
  
}
```