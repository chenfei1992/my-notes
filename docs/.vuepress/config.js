module.exports = {
  title: '笔记',
  description: 'Just playing around',
  themeConfig: {
    nav: [
      { text: 'Demo', link: '/demoPages/' },
      { text: '工具库', link: '/tools/' }
      // { text: 'Guide', link: '/guide/' },
      // { text: 'External', link: 'https://baidu.com' }
    ],
    // sidebar: 'auto'
    sidebar:[
        ['/','随录'],
        ['/VirtualDom/','虚拟DOM'],
        {
          title:'VUE',
          collapsable:true,
          children:[
            ['/vue/','vue 原理分析'],
            ['/vueRouter/','vueRouter'],
            ['/mustKnow/','vue 开发必知'],
            ['/vueInterview/','vue 面试题']
          ]
        },
        {
          title:'小程序',
          collapsable: true,
          children:[
            ['/kbone/','kbone']
          ]
        },
        {
          title:'REACT',
          collapsable: true,
          children: [
            ['/react/','react 开发必知']
          ]
        },
        {
          title: '档案',
          collapsable: true,
          children: [
            ['/archives/functionProgramming/','函数式编程']
          ]
        },
        ['/packages/','原生封装'],
        {
          title: '原理分析',
          collapsable: true,
          children: [
            ['/theoryAnalysis/setTimeout/','setTimeout原理分析']
          ]
        },
        ['/h5Development/','H5 开发技巧'],
        ['/cssModule/','CSS 文档'],
        ['/javascript/','javascript'],
        ['/typeScript/','typeScript'],
        ['/ASM/','ASM.js'],
        ['/面试/','面试'],
        ['/indexedDB/','indexedDB'],
        ['/toolFunction/','toolFunction'],
        {
          title:'构建工具',
          collapsable:true,
          children:[
            ['/webpack/','webpack'],
            ['/vue-cli/','vue-cli']
          ]
        },
        ['/http/','HTTP'],
        ['/性能优化/','性能优化']
        // {
        //   title:'DEMO',
        //   collapsable:true,
        //   children:[
        //     ['/demoPages/renderTree/','renderTree']
        //   ]
        // }
        // {
        //   title:'',
        //   collapsable: true, 
        //   children:[
        //     '/',
        //     ['/vue/','vue 原理分析']
        //   ]
        // }
        // {
        //   title:'vue 原理分析',
        //     collapsable: true, 
        //     children:['/vue/']
        // }
      
      // {
      //   title:'vue 原理分析',
      //   collapsable:true,
      //   children:['/vue/']
      // }
    // ['./guide/install/install','安装'],
    // ['./demoPages/renderTree/renderTree','renderTree']

    // ['./guide/icon/icon','icon'],
    ]
    
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  },
  markdown: {
    anchor: { permalink: false },
    toc: { includeLevel: [1, 2] },
    config: md => {
      md.use(require('markdown-it-xxx'));
    }
  }
  // base: '/bar/'
};

Array.prototype.myReverse = function(){
  let arr = this
  if(!arr.length) return arr
  let left = 0, right = arr.length-1;
  while(left < right){
    [arr[left],arr[right]] = [arr[right],arr[left]];
    left++
    right--
  }
  return arr
};  
var arr = [1,2,3,4,5,6,7];
var arr1 = [1,2,3,4,5,6,7,8];
console.log(arr.myReverse())
console.log(arr1.myReverse())

