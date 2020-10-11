### 1.Vue响应式原理
![](https://user-gold-cdn.xitu.io/2019/12/26/16f409e706ab9fb9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
#### 核心实现类：
Observer：它的作用是给对象的属性添加getter和setter，用于依赖收集和派发更新
Dep：用于收集当前响应式对象的依赖关系，每个响应式对象包括子对象都拥有一个Dep实例（里面subs是Watcher实例数组），当数据有变更时，会通过dep.notify()通知各个watcher。
Watcher：观察者对象，实例分为渲染watcher（render watcher），计算属性watcher（computed watcher），侦听器watcher（user watcher）三种
#### Watcher和Dep的关系
watcher中实例化了dep并向dep.subs中添加了订阅者，dep通过notify遍历了dep.subs通知每个watcher更新。
#### 依赖收集
1. initState时，对computed属性初始化时，触发computed watcher依赖收集
2. initState时，对侦听属性初始化时，触发user watcher依赖收集
3. render()的过程，触发render watcher依赖收集
4. re-render时，vm.render()再次执行，会移除所有subs中的watcher的订阅，重新赋值。
#### 派发更新
1. 组件中对响应的数据进行了修改，触发setter的逻辑
2. 调用dep.notify()
3. 遍历所有的subs（Watcher实例），调用每一个watcher的update方法。
#### 原理
当创建Vue实例时，vue会遍历data选项的属性，利用Object.defineProperty为属性添加getter和setter对数据的读取进行劫持（getter用来依赖收集，setter用来派发更新），并且在内部追踪依赖，在属性被访问和修改时通知变化。
每个组件实例会有相应的watcher实例，会在组件渲染的过程中记录依赖的所有数据属性（进行依赖收集，还有computed watcher，user watcher实例），之后依赖项被改动时，setter方法会通知依赖与此data的watcher实例重新计算（派发更新），从而使它关联的组件重新渲染。
一句话总结：
vue.js采用数据劫持结合发布-订阅模式，通过Object.defineProperty来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发响应的监听回调
### 2.computed的实现原理
computed本质是一个惰性求值的观察者。
computed内部实现了一个惰性的watcher，也就是computed watcher。computed watcher不会立刻求职，同时持有一个dep实例。
其内部通过this.dirty属性标记计算属性是否需要重新求职。
当computed的依赖状态发生改变时，就会通知这个惰性的watcher，computed watcher通过this.dep.subs.length判断有没有订阅者，有的话会重新计算，然后对比新旧值，如果变化了，会重新渲染。（Vue想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染watcher重新渲染，本质上是一种优化。）
没有的话，仅仅把this.dirty= true.(当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备lazy（懒计算）特性)
### 3.computed和watch有什么区别及运用场景
#### 区别
computed计算属性：依赖其它属性值，并且computed的值有缓存，只有它依赖的属性值发生改变，下一次获取computed的值时才会重新计算computed的值。
watch侦听器：更多的是「观察」的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。
#### 运用场景
当我们需要进行数值计算，并且依赖于其它数据时，应该使用computed，因为可以利用computed的缓存特性，避免每次获取值时，都要重新计算。
当我们需要在数据变化时执行异步或开销较大的操作时，应该使用watch，使用watch选项允许我们执行异步操作（访问一个API），限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的。
### 4.为什么在Vue3.0采用了Proxy，抛弃了Object.defineProperty
::: tip
Object.defineProperty本身有一定的监控到数组下标变化的能力，但是在Vue中，从性能/体验的性价比考虑，尤大大就弃用了这个特性（Vue为什么不能检测数组变动）。为了解决这个问题，经过vue内部处理后可以使用以下几种方法来监听数组
:::
push(); pop(); shift(); unshift(); splice(); sort(); reverse();
由于只针对了以上7种方法进行了hack处理，所以其他数组的属性也是检测不到的，还是具有一定的局限性。
::: tip
Object.defineProperty 只能劫持对象的属性，因此我们需要对每个对象的每个属性进行遍历。Vue2.x里是通过递归 + 遍历data对象来实现对数据的监控的，如果属性值也是对象那么需要深度遍历，显然如果能劫持一个完整的对象才是更好的选择。
Proxy可以劫持整个对象，并返回一个新的对象。Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。
:::
### 5.Vue中的key到底有什么用？
key是给每一个vnode的唯一id，依靠key，我们的diff操作可以更准确、更快速（对于简单列表页渲染来说diff节点也更快，但会产生一些隐藏的副作用，比如可能不会产生过渡效果，或者在某些节点有绑定数据（表单）状态，会出现状态错位）
diff算法的过程中，先会进行新旧节点的首尾交叉对比，当无法匹配的时候会用新节点的key与旧节点进行比对，从而找到相应旧节点。
更准确：因为带key就不是就地复用了，在sameNode函数a.key === b.key对比中可以避免就地复用的情况。所以会更加准确，如果不加key，会导致之前节点的状态被保留下来，会产生一系列的bug。
更快速：key的唯一性可以被Map数据结构充分利用，相比于遍历查找的时间复杂度O(n),Map的时间复杂度仅仅为O(1),源码如下：
```js
function createKeyToOldIdx(children,beginIdx,endIdx){
  let i, key;
  const map = {};
  for(i = beginIdx; i <= endIdx; ++i){
    key = children[i].key;
    if(isDef(key)) map[key] = i;
  }
  return map
}
```
### 6.谈一谈nextTick的原理
#### JS运行机制
JS执行是单线程的，它是基于事件循环的。事件循环大致分为以下几个步骤：
  1.所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）
  2.主线程之外，还存在一个“任务队列”(task queue)。只要异步任务有了运行结果，就在“任务队列”之中放置一个事件
  3.一旦“执行栈”中的所有同步任务执行完毕，系统就会读取“任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
  4.主线程不断重复上面的第三步。
  ![](https://user-gold-cdn.xitu.io/2019/12/26/16f409e91d0ff121?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
主线程的执行过程就是一个tick，而所有的异步结果都是通过“任务队列”来调度。消息队列中存放的是一个个的任务（task）。规范中规定task分为两大类，分别是macro task和micro task，并且每个macro task结束后，都要清空所有的micro task。
```js
for(macroTask of macroTaskQueue){
  // 1. Handle current MACRO-TASK
  handleMacroTask();
  // 2. Handle all MICRO-TASK
  for(microTask of microTaskQueue){
    handleMicroTask(microTask)
  }
}
```
在浏览器环境中：
常见的macro task有setTimeout、MessageChannel、postMessage、setImmediate
常见的micro task有MutationObsever和Promise.then
#### 异步更新队列
可能你还没有注意到，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。
如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。
然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作。
Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。
在 vue2.5 的源码中，macrotask 降级的方案依次是：setImmediate、MessageChannel、setTimeout
vue的nextTick方法的实现原理：
  1. vue用异步队列的方法来控制DOM更新和nextTick回调先后执行
  2. microtask因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
  3. 考虑兼容问题，vue做了microtask向macrotask的降级方案
### 7. vue是如何对数组方法进行变异的？
```js
const arrayProto = Array.prototype;
export const arrayMethods = Object.create(arrayProto);
const methodsToPatch = ["push","pop","shift","unshift","splice","sort","reverse"];
methodsToPatch.forEach(function(method){
  const original = arrayProto[method];
  def(arrayMethods,method,function mutator(...args){
    const result = original.apply(this,args);
    const ob = this.__ob__;
    let inserted;
    switch(method){
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if(inserted) ob.observeArray(inserted);
    ob.dep.notify();
    return result;
  })
})
Observer.prototype.observeArray = function observeArray(items){
  for(var i = 0,l = item.length;i < 1; i++){
    observe(items[i]);
  }
}
```
简单来说，Vue通过原型拦截的方式重写了数组的7个方法，首先获取到这个数组的ob，也就是它的Observer对象，如果有新的值，就调用observeArray对新的值进行监听，然后手动调用notify，通知render watcher，执行update
### 8.Vue组件data为什么必须是函数？
```js
new Vue()实例中，data可以直接是一个对象，为什么在vue组件中，data必须是一个函数
```
因为组件是可以复用的，JS里对象是引用关系，如果组件data是一个对象，那么子组件中的data属性值会互相污染，产生副作用。
所以一个组件的data选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝。new Vue的实例是不会被复用的，因此不存在以上问题。
### 9.谈谈Vue事件机制，手写$on,$off,$emit,$once
::: tip
Vue 事件机制 本质上就是一个 发布-订阅 模式的实现。
:::
```js
class Vue{
  constructor(){
    // 事件通道调度中心
    this._events = Object.create(null);
  }
  $on(event,fn){
    if(Array.isArray(event)){
      event.map(item => {
        this.$on(item,fn)
      })
    }else{
      (this._events[event] || (this._events[event] = [])).push(fn)
    }
    return this;
  }
  $once(event,fn){
    function on(){
      this.$off(event,on);
      fn.apply(this,arguments);
    }
    on.fn = fn;
    this.$on(event,on);
    return this
  }
  $off(event,fn){
    if(!arguments.length){
      this._events = Object.create(null);
      return this;
    }
    if(Array.isArray(event)){
      event.map(item => {
        this.$off(item,fn)
      })
      return this
    }
    const cbs = this._events[event];
    if(!cbs){
      return this
    }
    if(!fn){
      this._events[event] = null;
      return this;
    }
    let cb;
    let i = cbs.length;
    while(i--){
      cb = cbs[i];
      if(cb === fn || cb.fn === fn){
        cbs.splice(i,1);
        break;
      }
    }
    return this;
  }
  $emit(event){
    let cbs = this._events[event];
    if(cbs){
      const args = [].slice.call(arguments,1);
      cbs.map(item => {
        args ? item.apply(this,args) : item.call(this)
      })
    }
    return this
  }
}
```
### 10. 说说Vue的渲染过程
![](https://user-gold-cdn.xitu.io/2019/12/26/16f40a08cac6d3cb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
1. 调用compile函数，生成render函数字符串，编译过程如下：
+ parse函数解析template，生成ast（抽象语法树）
+ optimize函数优化静态节点（标记不需要每次都更新的内容，diff算法会直接跳过静态节点，从而减少比较的过程，优化了patch的性能）
+ generate函数生成render函数字符串
2. 调用new Watcher函数，监听数据的变化，当数据发生变化时，Render函数执行生成vnode对象
3. 调用patch方法，对比新旧vnode对象，通过DOM diff算法，添加、修改、删除真正的DOM元素
### 11.聊聊keep-alive的实现原理和缓存策略
```js
export default {
  name: "keep-alive",
  abstract: true,  // 抽象组件属性 ,它在组件实例建立父子关系的时候会被忽略,发生在 initLifecycle 的过程中
  props: {
    include: patternTypes,   //被缓存组件
    exclude: patternTypes,   // 不被缓存组件
    max: [String,Number]    //  指定缓存大小
  },
  created(){
    this.cache = Object.create(null);  //  缓存
    this.keys = []                 // 缓存的VNode的键
  },
  destroyed(){
    for(const key in this.cache){
      // 删除所有缓存
      pruneCacheEntry(this.cache,key,this.keys);
    }
  },
  mounted(){
    // 监听缓存/不缓存组件
    this.$watch("include",val => {
      pruneCache(this,name => matches(val,name));
    })
    this.$watch("exclude",val => {
      pruneCache(this,name => !matches(val,name));
    })
  },
  render(){
    const slot = this.$slots.default;
    const vnode: VNode = getFirstComponentChild(slot);
    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions;
    if(componentOptions){
      // name不在include中或者在exclude中 直接返回vnode
      // check pattern
      const name: ?string = getComponentName(componentOptions);
      const {include,exclude} = this;
      if((include && (!name || !matches(include,name))) || (exclude && name && matches(exclude,name))){
        return vnode;
      }
      const {cache,keys} = this;
      // 获取键，优先获取组件的name字段，否则是组件的tag
      const key: ?string = vnode.key == null ? componentOptions.Ctor.cid + 
      (componentOptions.tag ? `::${componentOptions.tag}` : "") : vnode.key;
      // 命中缓存，直接从缓存拿vnode的组件实例，并且重新调整了key的顺序放在了最后一个
      if(cache[key]){
        vnode.componentInstance = cache[key].componentInstance;
        remove(keys,key);
        keys.push(key);
      }
      // 不命中缓存，把vnode设置进缓存
      else{
        cache[key] = vnode;
        keys.push(key);
        // 如果配置了max并且缓存的长度超过了this.max,还要从缓存中删除第一个
        if(this.max && keys.length > parseInt(this.max)){
          pruneCacheEntry(cache,keys[0],keys,this._vnode);
        }
      }
      // keepAlive标记位
      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0]);
  }
}
```
##### 原理
1. 获取keep-alive包裹着的第一个子组件对象及其组件名
2. 根据设定的include/exclude（如果有）进行条件匹配，决定是否缓存。不匹配，直接返回组件实例
3. 根据组件ID和tag生成缓存key，并在缓存对象中查找是否已缓存过该组件实例。如果存在，直接取出缓存值并更新该key在this.keys中的位置（更新key的位置是实现LRU置换策略的关键）
4. 在this.cache对象中存储该组件实例并保存key值，之后检查缓存的实例数量是否超过max的设置值，超过则根据LRU置换策略删除最近最久未使用的实例（即是下标为0的那个key）
5. 最后组件实例的keepAlive属性设置为true，这个在渲染和执行被包裹的钩子函数会用到，这里不细说
##### LRU 缓存淘汰算法
LRU（Least recently used）算法根据数据的历史访问记录来进行淘汰数据,其核心思想是“如果数据最近被访问过,那么将来被访问的几率也更高”。
keep-alive 的实现正是用到了 LRU 策略,将最近访问的组件 push 到 this.keys 最后面,this.keys[0]也就是最久没被访问的组件,当缓存实例超过 max 设置值,删除 this.keys[0]
### 12. vm.$set()实现原理是什么
受现代JavaScript的限制（而且Object.observe也已经被废弃），vue无法检测到对象属性的添加或删除。
由于vue会在初始化实例时对属性执行getter/setter转化，所以属性必须在data对象上存在才能让vue将它转换为响应式的。
对于已经创建的实例，vue不允许动态添加根级别的响应式属性。但是，可以使用Vue.set(object,propertyName,value) 方法向嵌套对象添加响应式属性
那么Vue内部是如何解决对象新增属性不能响应的问题的呢？
```js
export function set(target: Array<any>| Object,key: any,val: any):any {
  // target 为数组  
  if (Array.isArray(target) && isValidArrayIndex(key)) {    
    // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误    
    target.length = Math.max(target.length, key);    
    // 利用数组的splice变异方法触发响应式    
    target.splice(key, 1, val);    return val;  }  
    // target为对象, key在target或者target.prototype上 且必须不能在 Object.prototype 上,直接赋值  
    if (key in target && !(key in Object.prototype)) {    
      target[key] = val;    
      return val;  
    }  
    // 以上都不成立, 即开始给target创建一个全新的属性  
    // 获取Observer实例  
    const ob = (target: any).__ob__;  
    // target 本身就不是响应式数据, 直接赋值  
    if (!ob) {    
      target[key] = val;    
      return val;  
    }  
    // 进行响应式处理  defineReactive(ob.value, key, val);  ob.dep.notify();  
    return val;
}
```
1. 如果目标是数组，使用vue实现的变异方法splice实现响应式
2. 如果目标是对象，判断属性存在，即为响应式，直接赋值
3. 如果target本身就不是响应式，直接赋值
4. 如果属性不是响应式，则调用defineReactive方法进行响应式处理