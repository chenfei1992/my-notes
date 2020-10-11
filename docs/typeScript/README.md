## 接口
### 可选属性
```ts
interface Person {
  name: string
  age?: number
}
let tom: Persom = {
  name: 'Tom'
}
```
### 任意属性
```ts
interface Person {
  name: string
  age?: number
  [propName: string]: any
}
let tom: Person = {
  name: 'Tom',
  gender: 'male'
}
```
使用`[propName: string]`定义了任意属性取`string`类型的值
**需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**
```ts
interface Person {
  name: string
  age?: number
  [propName: string]: string
}
let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
}
// error
```
上列中，任意属性的值允许是`string`,但是可选属性`age`的值却是`number`,`number`不是`string`的子属性，所以报错
**一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型**
```ts
interface Person {
  name: string
  age?: number
  [propName: string]: string | number
}
let tom: Person = {
  name: 'Tom',
  age: 25,
  gender: 'male'
}
```
### 只读属性
有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用`readonly`定义只读属性
```ts
interface Person {
  readonly id: number
  name: string
  age?: number
  [propName: string]: any
}
let tom: Person {
  id: 89757,
  name: 'Tom',
  gender: 'male'
}
tom.id = 9527  // error
```
## 数组
**「类型+方括号」表示法**
```ts
let fibonacci: number[] = [1,2]
```
### 数组泛型
我们也可以使用数组泛型（Array Generic）`Array<elemType>`来表示数组
```ts
let fibonacci: Array<number> = [1,2]
```
### 用接口表示数组
```ts
interface NumberArray {
  [index:number]:number
}
let fibonacci: NumberArray = [1,2]
```
`NumberArray`表示：只要索引的类型是数字时，那么值的类型必须是数字
虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了
### 类数组
类数组（Array-like Object）不是数组类型，比如`arguments`
```ts
// 类数组不能用数组来描述
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function
  } = arguments
}
```
在这个例子中，我们除了约束当前索引的类型是数字时，值的类型必须是数字之外，也约束了它还有`length`和`callee`两个属性
事实上常用的类数组都有自己的接口定义，如`IArguments`,`NodeList`,`HTMLCollection`
```ts
function sum() {
  let args: IArguments = arguments
}
```
其中`IArguments`是TypeScript中定义好了的类型，它实际上就是
```ts
interface IArguments {
  [index: number]: any
  length: number
  callee: Function
}
```
## 函数
### 函数表达式
```ts
let mySum: (x:number,y:number)=>number = function(x:number,y:number):number {return x+y}
```
**注意不要混淆了TypeScript中的 => 和ES6中的 =>**
在TypeScript的类型定义中，`=>`用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型
### 用接口定义函数的形状
```ts
interface SearchFunc {
  (source: string,subString: string): boolean
}
let mySearch: SearchFunc;
mySearch = function(source: string,subString: string){
  return source.search(subString) ! == -1
}
```
采用函数表达式|接口函数的方式时，对等号左侧进行类型限制，可以保证以后函数名赋值时保证参数个数、参数类型、返回值类型不变
### 可选参数
与接口中的可选属性类似，我们用 ? 表示可选的参数：
```ts
function buildName(firstName: string,lastName?: string){
  if(lastName){
    return firstName + ' '+ lastName
  }else{
    return firstName
  }
} 
let tomcat = buildName('Tom','Cat')
let tom = buildName('Tom')
```
**需要注意的是，可选参数必须在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了**
### 参数默认值
在ES6中，我们允许给函数的参数添加默认值，**TypeScript会将添加了默认值的参数识别为可选参数：**
```ts
function buildName(firstName: string,lastName: string = 'Cat'){
  return firstName+ ' '+ lastName
}
let tomcat = buildName('Tom','Cat')
let tom = buildName('Tom')
```
此时就不受「可选参数必须接在必需参数后面」的限制了
### 剩余参数
ES6 中，可以使用 `...rest` 的方式获取函数中的剩余参数（rest 参数）：
```ts
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```
**注意，rest 参数只能是最后一个参数，关于 rest 参数，可以参考 ES6 中的 rest 参数。**
### 重载
重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
```ts
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
**然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。**
这时，我们可以使用重载定义多个 reverse 的函数类型：
```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```
上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
## 类型断言
类型断言（Type Assertion）可以用来手动指定一个值的类型
### 语法
```ts
值 as 类型
```
或
```ts
<类型>值
```
在tsx语法（React的jsx语法的ts版）中必须使用前者，即`值as类型`.
形如`<Foo>`的语法在tsx中表示的是一个`ReactNode`，在ts中除了表示类型断言之外，也可能是表示一个`泛型`。
故建议大家使用类型断言时，统一使用`值as类型`这样的语法
### 类型断言的用途
#### 将一个联合类型断言为其中一个类型
当TypeScript不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法：
```ts
interface Cat {
  name: string
  run(): void
}
interface Fish {
  name: string
  swim(): void
}
function getName(animal: Cat | Fish){
  return animal.name
}
```
使用断言解决访问联合类型中非共有属性或方法
```ts
interface Cat {
  name: string
  run(): void
}
interface Fish {
  name: string
  swim(): void
}
function isFish(animal: Cat | Fish){
  if(typeof (animal as Fish).swim === 'function'){
    return true
  }
  return false
}
```
需要注意的是，类型断言只能够「欺骗」TypeScript编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
```ts
interface Cat {
  name: string
  run(): void
}
interface Fish {
  name: string
  swim(): void
}
function swim(animal: Cat | Fish){
  (animal as Fish).swim()
}
const tom: Cat = {
  name: 'Tom',
  run(){console.log('run')}
}
swim(tom)
// Error
```
上面的例子编译时不会报错，但在运行时会报错
原因是`(animal as Fish).swim()`这段代码隐藏了`animal`可能为`Cat`的情况，将`animal`直接断言为`Fish`了，而TypeScript编译器信任了我们的断言，故在调用`swim()`时没有编译错误

可是`swim`函数接受的参数是`Cat|Fish`，一旦传入的参数是`Cat`类型的变量，由于`Cat`上没有`swim`方法，就会导致运行时错误了。

总之，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。
### 将一个父类断言为更加具体的子类
当类之间有继承关系时，类型断言也是很常见的
```ts
class ApiError extends Error {
  code: number = 0
}
class HttpError extends Error {
  statusCode: number = 200
}
function isApiError(error: Error){
  if(typeof (error as ApiError).code === 'number'){
    return true
  }
  return false
}
```
上面的例子中，我们声明了函数`isApiError`，它用来判断传入的参数是不是`ApiError`类型，为了实现这样一个函数，它的参数类型肯定IG得是比较抽象的父类`Error`，这样的话这个函数就能接受`Error`或它的子类型作为参数了

但是由于父类`Error`中没有`code`属性，故直接获取`error.code`会报错，需要使用类型断言获取`(error as ApiError).code`

在这个例子中有一个更合适的方式来判断是不是`ApiError`，那就是使用`instanceof`
```ts
class ApiError extends Error {
  code: number = 0
}
class HttpError extends Error {
  statusCode: number = 200
}
function isApiError(error: Error){
  if(error instanceof ApiError){
    return true
  }
  return false
}
```
上面的例子中，确实使用 `instanceof` 更加合适，因为 `ApiError` 是一个 `JavaScript` 的类，能够通过 `instanceof` 来判断 `error` 是否是它的实例。

但是有的情况下 ApiError 和 HttpError 不是一个真正的类，而只是一个 TypeScript 的接口（interface），接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用 instanceof 来做运行时判断了：
```ts
interface ApiError extends Error {
  code: number
}
interface HttpError extends Error {
  statusCode: number
}
function isApiError(error: Error){
  if(error instanceof ApiError) {
    return true
  }
  return false
}
```
此时就只能用类型断言，通过判断是否存在 code 属性，来判断传入的参数是不是 ApiError 了
```ts
interface ApiError extends Error {
  code: number
}
interface HttpError extends Error {
  statusCode: number
}
function isApiError(error: Error){
  if(typeof (error as ApiError).code === 'number'){
    return true
  }
  return false
}
```
### 将任何一个类型断言为`any`
理想情况下，TypeScript的类型系统转运良好，每个值的类型都具体而精确
当我们引用一个在此类型上不存在的属性或方法时，就会报错
```ts
const foo: number = 1;
foo.length = 1
```
上面的例子中，数字类型的变量 foo 上是没有 length 属性的，故 TypeScript 给出了相应的错误提示。

需要在window上添加一个属性
```ts
(window as any).foo = 1 
```
**它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any。**
**总之，一方面不能滥用 as any，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡（这也是 TypeScript 的设计理念之一），才能发挥出 TypeScript 最大的价值。**

### 将 any 断言为一个具体的类型
遇到 any 类型的变量时，我们可以选择无视它，任由它滋生更多的 any。

我们也可以选择改进它，通过类型断言及时的把 any 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展。

最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：
```ts
function getCacheData(key: string): any {
  return (window as any).cache[key]
}
interface Cat {
  name: string
  run(): void
}
const tom = getCacheData('tom') as Cat
tom.run()
```
上面的例子中，我们调用完 getCacheData 之后，立即将它断言为 Cat 类型。这样的话明确了 tom 的类型，后续对 tom 的访问时就有了代码补全，提高了代码的可维护性。
### 类型断言的限制
+ 联合类型可以被断言为其中一个类型
+ 父类可以被断言为子类
+ 任何类型都可以被断言为any
+ any可以被断言为任何类型
**并不是任何一个类型都可以被断言为任何另一个类型**
```ts
interface Animal {
  name: string
}
interface Cat {
  name: string
  run(): void
}
let tom: Cat = {
  name: 'Tom',
  run: () => {console.log('run')}
}
let animal: Animal = tom
```
在上面的例子中，Cat 包含了 Animal 中的所有属性，除此之外，它还有一个额外的方法 run。TypeScript 并不关心 Cat 和 Animal 之间定义时是什么关系，而只会看它们最终的结构有什么关系——所以它与 Cat extends Animal 是等价的
```ts
interface Animal {
  name: string
}
interface Cat extends Animal {
  run(): void
}
```
```ts
interface Animal {
  name: string
}
interface Cat {
  name: string
  run(): void
}
function testAnimal(animal: Animal){
  return (animal as Cat)
}
function testCat(cat: Cat){
  return (cat as Animal)
}
```
这样的设计其实也很容易就能理解：
+ 允许 animal as Cat 是因为「父类可以被断言为子类」
+ 允许 cat as Animal 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」
### 双重断言
+ 任何类型都可以被断言为 any
+ any 可以被断言为任何类型
使用双重断言 as any as Foo 来将任何一个类型断言为任何另一个类型
```ts
interface Cat {
  run(): void
}
interface Fish {
  swim(): void
}
function testCat(cat: Cat){
  return (cat as any as Fish)
}
```
在上面的例子中，若直接使用 cat as Fish 肯定会报错，因为 Cat 和 Fish 互相都不兼容。

但是若使用双重断言，则可以打破「要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可」的限制，将任何一个类型断言为任何另一个类型。

若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。

**除非迫不得已，千万别用双重断言。**
### 类型断言vs类型转换
类型断言只会影响TypeScript编译时的类型，类型断言语句在编译结果中会被删除
```ts
function toBoolean(something: any):boolean{
  return something as boolean
}
toBoolean(1)   // 1
```
在上面的例子中，将 something 断言为 boolean 虽然可以通过编译，但是并没有什么用，代码在编译后会变成：
```ts
function toBoolean(something) {
    return something;
}
toBoolean(1);
// 返回值为 1
```
所以类型断言不是类型转换，它不会真的影响到变量的类型。

若要进行类型转换，需要直接调用类型转换的方法：
```ts
function toBoolean(something: any): boolean {
  return Boolean(something)
}
toBoolean(1)   // true
```
### 类型断言vs类型声明
```ts
function getCacheData(key: string): any{
  return (window as any).cache[key]
}
interface Cat {
  name: string
  run(): void
}
const tom = getCacheDate('tom') as Cat
tom.run()
```
我们使用 as Cat 将 any 类型断言为了 Cat 类型。

但实际上还有其他方式可以解决这个问题：
```ts
function getCacheData(key: string):any {
  return (window as any).cache[key]
}
interface Cat {
  name: string
  run(): void
}
const tom: Cat = getCacheData('tom')
tom.run()
```
上面的例子中，我们通过类型声明的方式，将 tom 声明为 Cat，然后再将 any 类型的 getCacheData('tom') 赋值给 Cat 类型的 tom。
### 类型断言vs泛型
```ts
function getCacheData(key: string):any {
  return (window as any).cache[key]
}
interface Cat {
  name: string
  run(): void
}
const tom = getCacheData('tom') as Cat
tom.run()
```
我们还有第三种方式可以解决这个问题，那就是泛型：
```ts
function getCacheData<T>(key: string): T {
  return (window as any).cache[key]
} 
interface Cat {
  name: string
  run(): void
}
const tom = getCacheData<Cat>('tom')
tom.run()
```
**通过给 getCacheData 函数添加了一个泛型 `<T>`，我们可以更加规范的实现对 getCacheData 返回值的约束，这也同时去除掉了代码中的 any，是最优的一个解决方案。**
## 声明文件
当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
### 新语法索引
+ `declare var`声明全局变量
+ `declare function`声明全局方法
+ `declare class`声明全局类
+ `declare enum`声明全局枚举类型
+ `declare namespace`声明（含有子属性的）全局对象
+ `interface 和 type`声明全局类型
+ `export`导出变量
+ `export namespace`导出（含有子属性的）对象
+ `export default` ES6默认导出
+ `export =` commonjs 导出模块
+ `export as namespace` UMD库声明全局变量
+ `declare global` 扩展全局变量
+ `declare module`扩展模块
+ `/// <reference />`三斜线指令
### 声明语句
在ts中能直接使用外部函数库，需要声明，
一般都提供了声明
```ts
npm install @types/jquery --save-dev
```
**如果已经下载了第三方声明文件了，就不需要以下配置了**
```ts
declare var jQuery:(selector: string) => any
// 或者
declare function jQuery(selector: string): any
// 或者
declare function jQuery(domReadyCallback: () => any): any
jQuery('#foo')
jQuery(function(){
  alert('Dom Ready!')
})
```
上例中，`declare var`并没有真的定义一个变量，只是定义了全局变量`jQuery`的类型，仅仅会用于编译时的检查，在编译结果中会被删除
### 什么是声明文件
通常我们会把声明语句放到一个单独的文件(jQuery.d.ts)中，这就是声明文件
```ts
// src/jQuery.d.ts
declare var jQuery: (selector: string) => any
```
**声明文件必需以`.d.ts`为后缀**
一般来说，ts会解析项目中所有的`*.ts`文件，当然也包含以`.d.ts`结尾的文件。所以当我们将`jQuery.d.ts`放到项目中时，其他所有`*.ts`文件就都可以获得`jQuery`的类型定义了
```ts
/path/to/project
├── src
|  ├── index.ts
|  └── jQuery.d.ts
└── tsconfig.json
```
假如仍然无法解析，那么可以检查下`tsconfig.json`中的`files`、`include`和`exclude`配置，确保其包含了`jQuery.d.ts`文件

**`declare class`语句也只能用来定义类型，不能用来定义具体的实现，如果定义了具体的实现会报错**

我们应该尽可能的减少全局变量或全局类型的数量。故最好将它们放到`namespace`下（或module）
```ts
declare namespace jQuery {
  interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any
  }
  function ajax (url: string,settings?: AjaxSettings): void
}
```