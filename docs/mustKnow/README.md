# vue 开发必知

## :ram: 1. watch

1.场景：表格初始化进来需要调查询接口 getList()，然后 input 改变会重新查询

```js
created(){
  this.getList()
},
watch:{
  inpVal(){
    this.getList()
  }
}

// 利用watch的immediate和handler属性简写
watch:{
  inpVal:{
    handler:'getList',
    immediate:true
  }
}
//深度监听
watch:{
  inpValObj:{
    handler(newVal,oldVal){
      console.log(newVal)
      console.log(oldVal)
    },
    deep:true
  }
}
```

## :ram: 2. 组件通讯

2.1 props

```js
// 数组：不建议使用 props:[]
//对象
props:{
  inpVal:{
    type:Number,
    required:true,
    default:200,
    validator:(value){
      // 这个值必须匹配下列字符串中的一个
      return ['success','warning','danger'].indexOf(value) !== -1
    }
  }
}
```

2.2 \$emit

```js
// 父组件
<home @title="title">
// 子组件
this.$emit('title',[{title:'这是title'}])
```

2.3 vuex

```js
state: 定义存贮数据的仓库，可通过this.$store.state或mapState访问
getter:获取store值，可认为是store的计算属性，可通过this.$store.getter或mapGetters访问
mutation:同步改变store值，为什么会设计成同步，因为mutation是直接改变store值，vue对操作进行了记录，如果是异步无法追踪改变。可通过mapMutations调用
action:异步调用函数执行mutation，进而改变store值，可通过this.$dispatch或mapActions访问
modules:模块，如果状态过多，可以拆分成模块，最后在入口通过...解构引入
```

2.4 attrs 和 listeners
attrs
场景:如果父传子有很多值,那么在子组件需要定义多个 props
解决:

```js
// 父组件
<home title="这是标题" width="80" height="80" imgUrl="imgUrl"/>

// 子组件
mounted() {
  console.log(this.$attrs) //{title: "这是标题", width: "80", height: "80", imgUrl: "imgUrl"}
},
```

listeners
场景:子组件需要调用父组件的方法
解决:父组件的方法可以通过 v-on="listeners" 传入内部组件——在创建更高层次的组件时非常有用

```js
// 父组件
<home @change="change">
// 子组件
mounted(){
  console.log(this.$listeners) // 即可拿到change事件
}
```

2.5 provide 和 inject
provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中；并且这对选项需要一起使用；以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。

```js
// 父组件
provide:{
  //  provide是一个对象，提供一个属性或方法
  foo:'这是 foo'
  fooMethod:() => {
    console.log('父组件 fooMethod被调用')
  }
},
// 子或者孙子组件
inject:['foo','fooMethod'], // 数组或者对象，注入到子组件
mounted(){
  this.fooMethod()
  console.log(this.foo)
}
// 在父组件下面所有的子组件都可以利用inject
```

provide 和 inject 绑定并不是可响应的。这是官方刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的，对象是因为引用类型

```js
// 父组件
provide:{
  foo:'这是 foo'
},
mounted(){
  this.foo = '这是新的 foo'
}
// 子或者孙子组件
inject:['foo'],
mounted(){
  console.log(this.foo) // 子组件打印的还是'这是 foo'
}
```

2.6 parent 和 children

```js
// 父组件
mounted(){
  console.log(this.$children)
  // 可以拿到 一级子组件的属性和方法
  // 所以就可以直接改变 data，或者调用 methods方法
}
// 子组件
mounted(){
  console.log(this.$parent) // 可以拿到 parent的属性和方法
}
//  children和parent并不保证顺序，也不是响应式的 只能拿到一级父组件和子组件
```

2.7 \$refs

```js
// 父组件
<home ref="home"/>
mounted(){
  console.log(this.$refs.home) // 即可拿到子组件的实例，就可以直接操作data和methods
}
```

2.8 \$root

```js
// 父组件
mounted(){
  console.log(this.$root) // 获取根实例，最后所有组件都是挂载到根实例上
  console.log(this.$root.$children[0]) // 获取根实例的一级子组件
  console.log(this.$root.$children[0].$children[0]) // 获取根实例的二级子组件
}
```

2.9 .sync

```js
// 父组件
<home :title.sync="title"/>
// 编译时会被扩展为
<home :title="title" @update:title="val =>title=val"/>
// 子组件可以通过$emit触发 update方法改变
mounted(){
  this.$emit("update:title",'这是新的title')
}
```

2.10 slot(作用域插槽)
子组件内数据可以被父页面拿到（解决了数据只能从父页面传递给子组件）

```js
// 父组件
<todo-list>
  <template v-slot:todo="slotProps">
    {{slotProps.user.firstName}}
  </template>
</todo-list>
// slotProps接取的是子组件标签slot上属性数据的集合所有v-bind:user="user"

// 子组件
<slot name="todo" :user="user" :test="test">
  {{user.lastName}}
</slot>
data(){
  return {
    user:{
      lastName:"Zhang",
      firstName:"yue"
    },
    test:[1,2,3,4]
  }
}
// {{user.lastName}}是默认数据 v-slot:todo 当父页面没有（="slotProps"）
```

2.11 EventBus
就是声明一个全局 vue 实例变量 EventBus，把所有的通信数据，事件监听都存储到这个变量上；类似于 Vuex。但这种方式只适用于极小的项目。原理就是利用 on 和 emit 并实例化一个全局 vue 实现数据共享

```js
// 在 main.js
Vue.prototype.$eventBus = new Vue();
// 传值组件
this.$eventBus.$emit('eventTarget', '这是eventTarget传过来的值');
// 接收组件
this.$eventBus.$on('eventTarget', v => {
  console.log('eventTarget', v); // 这是eventTarget传过来的值
});
```

2.12 broadcast 和 dispatch
vue1.x 有这两个方法，事件广播和派发，但是 vue2.x 删除了 下面是对两个方法进行的封装

```js
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;
    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;
        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
```

2.13 路由

```js
// 方案一
// 路由定义
{
  path:'/describe/:id',
  name:'Describe',
  component:Describe
}
// 页面传参
this.$router.push({
  path:`/describe/${id}`,
})
// 页面获取
this.$route.params.id

// 方案二
// 路由定义
{
  path:'/describe',
  name:'Describe',
  component:Describe
}
// 页面传参
this.$router.push({
  name:'Describe',
  params:{
    id:id
  }
})
// 页面获取
this.$route.params.id

// 方案三
// 路由定义
{
  path:'/describe',
  name:'Describe',
  component: Describe
}
// 页面传参
this.$router.push({
  path:'/describe',
  query:{
    id:id
  }
})
// 页面获取
this.$route.query.id

```

2.14 Vue.observable
Vue 内部会用它来处理 data 函数返回的对象；返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新；也可以作为最小化的跨组件状态存储器，用于简单的场景。通讯原理实质上是利用 Vue.observable 实现一个简易的 vuex

```js
// 文件路径 - /store/store.js
import Vue from 'vue'
export const store = Vue.observable({count:0})
export const mutations = {
  setCount(count){
    store.count = count
  }
}
// 使用
<template>
  <div>
    <label for="bookNum">数量</label>
    <button @click="setCount(count+1)">+</button>
    <span>{{count}}</span>
    <button @click="setCount(count-1)">-</button>
  </div>
</template>
<script>
  import {store,mutation} from '../store/store' //Vue2.6 新增API Observable
  export default {
    name:'Add',
    computed:{
      count(){
        return store.count
      }
    },
    methods:{
      setCount:mutations.setCount
    }
  }
</script>
```

## :ram: 3. render 函数

场景:有些代码在 template 里面写会重复很多,所以这个时候 render 函数就有作用啦

```js
// 根据 props 生成标签
// 初级
<template>
  <div>
    <div v-if="level === 1"> <slot></slot> </div>
    <p v-else-if="level === 2"> <slot></slot> </p>
    <h1 v-else-if="level === 3"> <slot></slot> </h1>
    <h2 v-else-if="level === 4"> <slot></slot> </h2>
    <strong v-else-if="level === 5"> <slot></slot> </stong>
    <textarea v-else-if="level === 6"> <slot></slot> </textarea>
  </div>
</template>

// 优化版,利用 render 函数减小了代码重复率
<template>
  <div>
    <child :level="level">Hello world!</child>
  </div>
</template>

<script type='text/javascript'>
  import Vue from 'vue'
  Vue.component('child', {
    render(h) {
      const tag = ['div', 'p', 'strong', 'h1', 'h2', 'textarea'][this.level-1]
      return h(tag, this.$slots.default)
    },
    props: {
      level: {  type: Number,  required: true  }
    }
  })
  export default {
    name: 'hehe',
    data() { return { level: 3 } }
  }
</script>
```

## :ram: 4. 异步组件

```js
// 工厂函数执行 resolve 回调
Vue.component('async-webpack-example',function(resolve){
  // 这个特殊的 require 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包会通过Ajax请求加载
  require(['./my-async-component'],resolve)
})
// 工厂函数返回 Promise
Vue.component('async-webpack-example',()=>import('./my-async-component'))
// 工厂函数返回一个配置化组件对象
const AsyncComponent = () => ({
  // 需要加载的组件（应该是一个promise对象）
  component: import('./MyComponent.vue),
  // 异步组件加载时使用的组件
  loading:LoadingComponent,
  // 加载失败时使用的组件
  error:ErrorComponent,
  // 展示加载时组件的延时时间。
  delay:200,
  // 如果提供了超时时间且组件加载也超时了，则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout:3000
})
```

异步组件的渲染本质上其实就是执行 2 次或者 2 次以上的渲染, 先把当前组件渲染为注释节点, 当组件加载成功后, 通过 forceRender 执行重新渲染。或者是渲染为注释节点, 然后再渲染为 loading 节点, 在渲染为请求完成的组件

## :ram: 5. Vue.extend

场景：vue 组件中有些需要将一些元素挂载到元素上，这个时候 extend 就起到作用了。是构造一个组件的语法器

```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{extendData}}</br>实例传入的数据为:{{propsExtend}}</p>',
  data: function() {
    return {
      extendData: '这是extend扩展的数据'
    };
  },
  props: ['propsExtend']
});
// 创建的构造器可以挂载到元素上，也可以通过components或Vue.component()注册使用
// 挂载到一个元素上。可以通过propsData传参
new Profile({
  propsData: {
    propsExtend: '我是实例传入的数据'
  }
}).$mount('#app-extend');
// 通过components或Vue.component()注册
Vue.component('Profile', Profile);
```

## :ram: 6. extends

extends 用法和 mixins 很相似,只不过接收的参数是简单的选项对象或构造函数,所以 extends 只能单次扩展一个组件

```js
const extend = {
  created() {
    this.dealTime();
  },
  methods: {
    dealTime() {
      console.log('这是mixin的dealTime里面的方法');
    }
  }
};
export default {
  extends: extend
};
```

## :ram: 7. Vue.directive

官方给我们提供了很多指令，但是我们如果想将文字变成指定的颜色定义成指令使用，这个时候需要用到 Vue.directive

```js
// 全局定义
Vue.directive("change-color",function(el,dinding,vnode){
  el.style["color"] = binding.value;
})
// 使用
<template>
  <div v-change-color="color">{{message}}</div>
</template>
<script>
  export default{
    data(){
      return {
        color:'green'
      }
    }
  }
</script>
```

## :ram: 7. 生命周期

1.bind 只调用一次，指令第一次绑定到元素时候调用，用这个钩子可以定义一个绑定时执行一次的初始化动作.2.inserted:被绑定的元素插入父节点的时候调用（父节点存在即可调用，不必存在 document 中）3.update:被绑定与元素所在模板更新时调用，而且无论绑定值是否有变化，通过比较更新前后的绑定值，忽略不必要的模板更新 4.componentUpdate：被绑定的元素所在模板完成一次更新更新周期的时候调用 5.unbind：只调用一次，指令元素解绑的时候调用

## :ram: 8. Vue.filter

时间戳转化成年月日这是一个公共方法，所以可以抽离成过滤器使用

```js
// 使用 在双花括号中
{
  {
    message | capitalize;
  }
}
// 在`v-bind`中
<div v-bind:id="rawId | formatId"></div>;
// 全局注册
Vue.filter('stampToYYMMDD', value => {
  // 处理逻辑
});
// 局部注册
filters: {
  stampToYYMMDD: value => {
    // 处理逻辑
  };
}
// 多个过滤器全局注册
// /src/common/filters.js
let dateServer = value => value.replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3');
export { dateServer };
// /src/main.js
import * as custom from './common/filters/custom';
Object.keys(custom).forEach(key => Vue.filter(key, custom[key]));
```

## :ram: 9. Vue.compile

在 render 函数中编译模板字符串。只在独立构建时有效

```js
var res = Vue.compile('<div><span>{{msg}}</span></div>');
new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
});
```

## :ram: 9. Vue.version

有些开发插件需要针对不同 vue 版本做兼容，所以就会用到 Vue.version

```js
var version = Number(Vue.version.split('.')[0]);
if (version === 2) {
} else if (version === 1) {
} else {
}
```

## :ram: 11. Vue.set()

当你利用索引直接设置一个数组项时或你修改数组的长度时，由于 Object.defineprototype()方法限制，数据不影响更新 不过 vue3.x 将利用 proxy 这个问题将得到解决

```js
this.$set(arr, index, item);
```

## :ram: 12. Vue.config.keyCodes

自定义按键修饰符别名

```js
// 将键码为 113 定义为 f2
Vue.config.keyCodes.f2 = 113;
<input type="text" @keyup.f2="add"/>
```

## :ram: 13. Vue.config.performance

监听性能(只适用于开发模式和支持 performance.mark API 的浏览器)

```js
Vue.config.performance = true;
```

## :ram: 14. Vue.config.errorHandler

1.场景:指定组件的渲染和观察期间未捕获错误的处理函数 2.规则:
从 2.2.0 起，这个钩子也会捕获组件生命周期钩子里的错误。同样的，当这个钩子是 undefined 时，被捕获的错误会通过 console.error 输出而避免应用崩溃
从 2.4.0 起，这个钩子也会捕获 Vue 自定义事件处理函数内部的错误了
从 2.6.0 起，这个钩子也会捕获 v-on DOM 监听器内部抛出的错误。另外，如果任何被覆盖的钩子或处理函数返回一个 Promise 链 (例如 async 函数)，则来自其 Promise 链的错误也会被处理 3.使用

```js
Vue.config.errorHandler = function(err, vm, info) {
  // handle error
  // 'info' 是Vue特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
};
```

## :ram: 15. Vue.config.warnHandler

2.4.0 新增 1.场景:为 Vue 的运行时警告赋予一个自定义处理函数,只会在开发者环境下生效 2.用法:

```js
Vue.config.warnHandler = function(msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
};
```

## :ram: 16. v-pre

vue 是响应式系统，但是有些静态的标签不需要多次编译，这样可以节省性能

```js
<span v-pre>{{this will not be compiled}}</span>
<span v-pre>{{msg}}</span>  // 即使data里面定义msg这里仍然是显示{{msg}}
```

## :ram: 17. v-cloak

在网速慢的情况下，在使用 vue 绑定数据的时候，渲染页面时会出现变量闪烁 用法：这个指令保持在元素直到关联实例结束编译。和 css 规则如[v-cloak]{display:none}一起用时，这个指令可以隐藏未编译的 Mustanche 标签直到实例准备完毕

```js
<div class="#app" v-cloak>
  <p>{{value.name}}</p>
</div>
// css 中
[v-clock]{
  display:none;
}
```

## :ram: 18. Object.freeze

一个长列表数据，一般不会更改，但是 vue 会做 getter 和 setter 的转换 用法：是 ES5 新增的特性，可以冻结一个对象，防止对象被修改 对于 data 或 vuex 里使用 freeze 冻结了的对象，vue 不会做 getter 和 setter 的转换。注意：冻结只是冻结里面的单个属性，引用地址还是可以更改

```js
new Vue({
  data: {
    // vue不会对list里的object做getter、setter绑定
    list: Object.freeze([{ value: 1 }, { value: 2 }])
  },
  mounted() {
    // 界面不会有响应，因为单个属性被冻结
    this.list[0].value = 100;
    // 下面两种做法，界面都会响应
    this.list = [{ value: 100 }, { value: 200 }];
    this.list = Object.freeze([{ value: 100 }, { value: 200 }]);
  }
});
```

## :ram: 19. 调试 template

在 Vue 开发过程中，经常会遇到 template 模板渲染时 JavaScript 变量出错的问题，此时也许你会通过 console.log 来进行调试 这时可以在开发环境挂载一个 log 函数

```js
// main.js
Vue.prototype.$log = window.console.log;
// 组件内部
<div>{{$log(info)}}</div>
```

## :ram: 20. vue-loader

preserveWhitespace
开发 vue 代码一般会有空格，这个时候打包压缩如果不去掉空格会加大包的体积 配置 preserveWhitespace 可以减小包的体积

```js
{
  vue: {
    preserveWhitespace: false;
  }
}
```

## :ram: 21. img 加载失败

有些时候后台返回图片地址不一定能打开，所以这个时候应该加一张默认图片

```js
// page 代码
<img :src="imgUrl" @error="handleError" alt="">
<script>
  export default{
    data(){
      return {
        imgUrl:''
      }
    },
    methods:{
      handleError(e){
        e.target.src = require('图片路径')  // 项目中可以配置transformToRequire
      }
    }
  }
</script>
```

## :ram: 21. 路由解耦参数
```js
const router = new VueRouter({
  routes: [{
    path: '/user/:id',
    component: User,
    props: true
  }]
})
// 将路由的props属性设置为true后，组件内可通过props接收到params参数
export default {
  props: ['id'],
  methods: {
    getParamsId() {
      return this.id
    }
  }
}
```

## :ram: 22. 函数式组件
函数式组件是无状态，它无法实例化，没有任何的生命周期和方法。创建函数式组件也很简单，只需要在模板添加`functional`声明即可。一般适合只依赖于外部数据的变化而变化的组件，因其轻量，渲染性能也会有所提高。
组件需要的一切都是通过`context`参数传递。它是一个上下文对象，具体属性查看文档。这里props是一个包含所有绑定属性的对象。
函数式组价
```vue
<template functional>
  <div class="list">
    <div class="item" v-for="item in props.list" :key="item.id" @click="props.itemClick(item)">
      <p>{{item.title}}</p>
      <p>{{item.content}}</p>
    </div>
  </div>
</template>
```
父组件使用
```vue
<template>
    <div>
        <List :list="list" :itemClick="item => (currentItem = item)" />
    </div>
</template>
import List from '@/components/List.vue'
export default {
    components: {
        List
    },
    data() {
        return {
            list: [{
                title: 'title',
                content: 'content'
            }],
            currentItem: ''
        }
    }
}
```
## :ram: 23. watch高阶使用
### 立即执行
watch是在监听属性改变时才会触发，有些时候，我们希望在组件创建watch能够立即执行
可能想到的方法就是在create生命周期中调用一次，但这样的写法不优雅，或许我们可以使用这样的方法
```js
export default {
  data() {
    return {
      name: 'Joe'
    }
  },
  watch: {
    name: {
      handler: 'sayName',  // 触发监听执行的方法
      immediate: true     //  监听开始之后被立即调用
    }
  },
  methods: {
    sayName() {
      console.log(this.name)
    }
  }
}
```
### 深度监听
在监听对象时，对象内部的属性被改变时无法触发watch，我们可以为其设置深度监听
```js
export default {
  data: {
    student: {
      name: 'Joe',
      skill: {
        run: {
          speed: 'fast'
        }
      }
    }
  },
  watch: {
    student: {
      handler: 'sayName',
      deep: true
    }
  },
  methods: {
    sayName() {
      console.log(this.student)
    }
  }
}
```
### 触发监听执行多个方法
使用数组可以设置多项，形式包括字符串、函数、对象
```js
export default {
  data: {
    name: 'Joe'
  },
  watch: {
    name: [
      'sayName1',
      function(newVal,oldVal) {
        this.sayName2()
      },
      {
        handler: 'sayName3',
        immediate: true
      }
    ]
  },
  methods: {
    sayName1() {
      console.log('sayName1==>',this.name)
    },
    sayName2() {
      console.log('sayName2==>',this.name)
    },
    sayName3() {
      console.log('syaName3==>',this.name)
    }
  }
}
```
### watch监听多个变量
watch本身无法监听多个变量。但我们可以将需要监听的多个变量通过计算属性返回对象，再监听这个对象来实现”监听多个变量“
```js
export default {
  data() {
    return {
      msg1: 'apple',
      msg2: 'banana'
    }
  },
  computed: {
    msgObj() {
      const {msg1,msg2} = this
      return {
        msg1,msg2
      }
    }
  },
  watch: {
    msgObj: {
      handler(newVal,oldVal) {
        if(newVal.msg1 != oldVal.msg1){
          console.log('msg1 is change')
        }
        if(newVal.msg2 != oldVal.msg2){
          console.log('msg2 is change')
        }
      },
      deep: true
    }
  }
}
```
## 事件参数$event
$event是事件对象的特殊变量，在一些场景能给我们实现复杂功能提供更多可用的参数
### 原生事件
在原生事件中变现和默认的事件对象相同
```vue
<template>
  <div>
    <input type="text" @input="inputHandler('hello',$event)"/>
  </div>
</template>
```
```js
export default {
  methods: {
    inputHandler(msg,e){
      console.log(e.target.value)
    }
  }
}
```
### 自定义组件双向绑定
组件model选项：

::: tip
允许一个自定义组件在使用v-model时定制prop和event。默认情况下，一个组件上的v-model会把value用作prop且把input用作event，但是一些输入类型比如单选框和复选框按钮想使用value prop来达到不同的目的。使用model选项可以回避这些情况产生的冲突。
:::
input默认作为双向绑定的更新事件，通过`$emit`可以更新绑定的值
```vue
<my-switch v-model="val"></my-switch>
```
```js
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    switchChange(val) {
      this.$emit('input',val)
    }
  }
}
```
修改组件的model选项，自定义绑定的变量和事件
```vue
<my-switch v-model="num" value="some value"></my-switch>
```
```js
export default {
  model: {
    prop: 'num',
    event: 'update'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    }
  },
  methods: {
    numChange() {
      this.$emit('update',this.num++)
    }
  }
}
```