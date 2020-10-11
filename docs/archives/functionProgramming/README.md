+ 与面向对象编程`（Object-oriented programming）`和过程式编程`（Procedural programming）`并列的编程范式。
+ 最主要的特征是，函数是第一等公民。
+ 强调将计算过程分解成可复用的函数，典型例子就是`map`方法和`reduce`方法组合而成 `MapReduce` 算法。
+ 只有纯的、没有副作用的函数，才是合格的函数。

**本质上，函数式编程只是范畴论的运算方法，跟数理逻辑、微积分、行列式是同一类东西，都是数学方法，只是碰巧它能用来写程序**

所以，为什么函数式编程要求函数必须是纯的，不能有副作用？因为它是一种数学运算，原始目的就是求值，不做其他事情，否则就无法满足函数运算法则了。
总之，在函数式编程中，函数就是一个管道（pipe）。这头进去一个值，那头就会出来一个新的值，没有其他作用
### 函数的合成与柯里化
函数式编程有两个最基本的运算：合成和柯里化
#### 函数的合成
如果一个值要经过多个函数，才能变成另外一个值，就可以把所有中间步骤合并成一个函数，这叫做“函数的合成”(compose)
```js
const compose = function (f,g){
  return function (x){
    return f(g(x))
  }
}
```
函数的合成还必须满足结合律
```js
componse(f,componse(g,h))
// 等同于
componse(componse(f,g),h)
// 等同于
componse(f,g,h)
```
合成也是函数必须是纯的一个原因。因为一个不纯的函数，怎么跟其他函数合成？怎么跟其他函数合成？怎么保证各种合成以后，它会达到预期的行为?
前面说过，函数就像数据的管道（pipe）。那么，函数合成就是将这些管道连了起来，让数据一口气从多个管道中穿过。
#### 柯里化
`f(x)`和`g(x)`合成为`f(g(x))`,有一个隐藏的前提，就是`f`和`g`都只能接受一个参数。如果可以接受多个参数，比如`f(x,y)`和`g(a,b,c)`,函数合成就非常麻烦。
这时就需要函数柯里化了。所谓”柯里化“，就是把一个多参数的函数，转化为单参数函数
```js
// 柯里化之前
function add(x,y){
  return x + y
}
add(1,2)  // 3
//柯里化之后
function addX(y){
  return function (x){
    return x + y
  }
}
addX(2)(1) // 3
```
### 函子(Functor)
#### 函子的概念
函子是函数式编程里面最重要的数据类型，也是基本的运算单位和功能单位。
它首先是一种范畴，也就是说，是一个容器，包含了值和变形关系。**比较特殊的是，它的变形关系可以依次作用于每一个值，将当前容器变形成另一个容器**
任何具有`map`方法的数据结构，都可以当做函子的实现
```js
class Functor {
  constructor(val){
    this.val = val
  }
  map(f){
    return new Functor(f(this.val))
  }
}
```
上面代码中，`Functor`是一个函子，它的`map`方法接受函数`f`作为参数，然后返回一个新的函子，里面包含的值是被`f`处理过的(`f(this.val)`)

**一般约定，函子的标志就是容器具有`map`方法。该方法将容器里面的每一个值，映射到另一个容器**
```js
(new Functor(2)).map(function(two){
  return two + 2;
})
// Functor(4)
(new Functor('flamethrowers')).map(function(s){
  return s.toUpperCase()
})
// Functor('FLAMETHROWERS')
(new Functor('bombs')).map(_.concat(' away')).map(_.prop('length'))
```
上面的例子说明，函数式编程里面的运算，都是通过函子完成，即运算不直接针对值，而是针对这个值容器---函子。函子本身具有对外接口（map方法），各种函数就是运算符，通过接口接入容器，引发容器里的值的变形
因此，**学习函数式编程，实际上就是学习函子的各种运算。**由于可以把运算方法封装在函子里面，所以又衍生出各种不同类型的函子，有多少种运算，就有多少种函子。函数式编程就变成了运用不同的函子，解决实际问题
#### of方法
你可能注意到了，上面生成新的函子的时候，用了new命令。这实在太不像函数式编程了，因为new命令是面向对象编程的标志。
**函数式编程一般约定，函子有一个`of`方法，用来生成新的容器。**
```js
Functor.of = function(val){
  return new Functor(val)
}
// 前面的例子就可以改成下面这样
Functor.of(2).map(function(two){
  return two + 2
})
```
#### Maybe函子
函子接受各种函数，处理容器内部的值。这里就有一个问题，容器内部的值可能是一个空值（比如`null`），而外部函数未必有处理空值的机制，如果传入空值，很可能就会报错。
```js
Functor.of(null).map(function(s){
  return s.toUpperCase()
})
// TypeError
```
上面代码中，函子里面的值是`null`，结果小写变成大写的时候就出错了。
**Maybe** 函子就是为了解决这一类问题而设计的。简单说，它的`map`方法里面设置了空值检查
```js
class Maybe extends Functor {
  map(f) {
    return this.val ? Maybe.of(f(this.val)) : Maybe.of(null)
  }
}
```
有了`Maybe`函子，处理空值就不会出错了
```js
Maybe.of(null).map(function(s){
  return s.toUpperCase()
})
```
#### Either 函子
条件运算`if...else`是最常见的运算之一，函数式编程里面，使用`Either`函子表达。
`Either`函子内部有两个值：左值（`left`）和右值(`right`)。右值是正常情况下使用的值，左值是右值不存在时使用的默认值。
```js
class Either extends Functor {
  constructor(left,right){
    this.left = left;
    this.right = right;
  }
  map(f){
    return this.right ? 
      Either.of(this.left,f(this.right)) :
      Either.of(f(this.left),this.right)
  }
}
Either.of = function(left,right){
  return new Either(left,right)
}
```
下面是用法
```js
var addOne = function(x){
  return x + 1
}
Either.of(5,6).map(addOne);   // Either(5,7)
Either.of(1,null).map(addOne);  // Either(2,null)
```
上面代码中，如果右值有值，就使用右值，否则使用左值。通过这种方式，`Either`函子表达了条件运算。
`Either`函子的常见用途是提供默认值。下面是一个例子
```js
Either.of({address:'xxx'},currentUser.address).map(updateField)
```
上面代码中，如果用户没有提供地址，`Either`函子就会使用左值的默认值
`Either`函子的另一个用途是代替`try...catch`,使用左值表示错误
```js
function parseJSON(json){
  try{
    return Either.of(null,JSON.parse(json))
  }catch(e:Error){
    return Either.of(e,null)
  }
}
```
上面代码中，左值为空，就表示没有出错，否则左值会包含一个错误对象`e`。一般来说，所有可能出错的运算，都可以返回一个`Either`函子
#### ap函子
函子里面包含的值，完全可能是函数。我们可以想象这样一种情况，一个函子的值是数值，另一个函子的值是函数
```js
function addTwo(x){
  return x + 2
}
const A = Functor.of(2)
const B = Functor.of(addTwo)
```
上面代码中，函子`A`内部的值是`2`，函子`B`内部的值是函数`addTwo`。
有时，我们想让函子`B`内部的函数，可以使用函子`A`内部的值进行运算。这时就需要用到`ap`函子。
`ap`是`applicative`（应用）的缩写。凡是部署了`ap`方法的函子，就是`ap`函子。
```js
class Ap extends Functor {
  ap(F) {
    return Ap.of(this.val(F.val))
  }
}
```
注意，`ap`方法的参数不是函数，而是另一个函子。
因此，前面例子可以写成下面的形式
```js
Ap.of(addTwo).ap(Functor.of(2))   // Ap(4)
```
`ap`函子的意义在于，对于那些多参数的函数，就可以从多个容器之中取值，实现函子的链式操作
```js
function add(x){
  return function(y){
    return x + y
  }
}
Ap.of(add).ap(Maybe.of(2)).ap(Maybe.of(3))    // Ap(5)
```
上面代码中，函数`add`是柯里化以后的形式，一共需要两个参数。通过`ap`函子，我们就可以实现从两个容器之中取值。它还有另外一种写法
```js
Ap.of(add(2)).ap(Maybe.of(3))
```
#### Monad函子
函子是一个容器，可以包含任何值。函子之中再包含一个函子，也是完全合法的。但是，这样就会出现多层嵌套的函子
```js
Maybe.of(
  Maybe.of(
    Maybe.of({name: 'xzq',number: 111})
  )
)
```
上面这个函子，一共有三个`Maybe`嵌套。如果要取出内部的值，就要连续取三次`this.val`。当然很不方便，因此就出现了`Monad`函子
**Monad函子的作用是，总是返回一个单层的函子。**它有一个`flatMap`方法，与`map`方法作用相同，唯一的区别是如果生成了一个嵌套函子，它会取出后者内部的值，保证返回的永远是一个单层的容器，不会出现嵌套的情况。
```js
class Monad extends Functor {
  join() {
    return this.val
  }
  flatMap(f){
    return this.map(f).join()
  }
}
```
上面代码中，如果函数`f`返回的是一个函子，那么`this.map(f)`就会生成一个嵌套的函子。所以，`join`方法保证了`flatMap`方法总是返回一个单层的函子。这意味着嵌套的函子会被铺平(flatten)
#### IO操作
Monad函子的重要应用，就是实现I/O(输入输出)操作
I/O是不纯的操作，普通的函数式编程没法做，这时就需要把IO操作写成`Monad`函子，通过它来完成
```js
var fs = require('fs');
var readFile = function(filename){
  return new IO(function(){
    return fs.readFileSync(filename,'utf-8')
  })
}
var print = function(x){
  return new IO(function(){
    console.log(x)
    return x
  })
}
```
上面代码中，读取文件和打印本身都是不纯的操作，但是`readFile`和 `print`却是纯函数，因为它们总是返回IO函子
如果IO函子是一个`Monad`，具有`flatMap`方法，那么我们就可以像下面这样调用这两个函数
```js
readFile('./user.txt').flatMap(print)
```
这就是神奇的地方，上面的代码完成了不纯的操作，但是因为`flatMap`返回的还是一个IO函子，所以这个表达式是纯的。我们通过一个纯的表达式，完成带有副作用的操作，这就是Monad的作用
由于返回还是IO函子，所以可以实现链式操作。因此，在大多数库里面，`flatMap`方法被改名成`chain`
```js
var tail = function(x){
  return new IO(function(){
    return x[x.length - 1]
  })
}
readFile('./user.txt').flatMap(tail).flatMap(print)
// 等同于
readFile('./user.txt').chain(tail).chain(print)
```
上面的代码读取了文件`user.txt`，然后选取最后一行输出