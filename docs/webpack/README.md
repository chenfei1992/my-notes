### manifest
在使用webpack构建的典型应用程序或站点中，有三种主要的代码类型：
  1. 你或你的团队编写的源码
  2. 你的源码会依赖的任何第三方的library或“vendor”代码
  3. webpack的runtime和manifest，管理所有模块的交互
#### Runtime
runtime，以及伴随的manifest数据，主要是指：在浏览器运行时，webpack用来连接模块化的应用程序的所有代码。runtime包含：在模块化交互时，连接模块所需的加载和解析逻辑。包括浏览器中的已加载模块的连接，以及懒加载模块的执行逻辑。
#### Manifest
那么，一旦你的应用程序中，形如`index.html`文件、一些bundle和各种资源加载到浏览器中，会发生什么？你精心安排的`/src`目录的文件结构现在已经不存在，所以webpack如何管理所有模块之间的交互呢？这就是manifest数据用途的由来...
当编译器（compiler）开始执行、解析和映射应用程序时，它会保留所有模块的详细要点。这个数据集合称为“Manifest”，当完成打包并发送到浏览器时，会在运行时通过Manifest来解析和加载模块。无论你选择哪种模块语法，那些import或require语句现在都已经转换为`__webpack_require__`方法，此方法指向模块标识符（module identifier）。通过使用manifest中的数据，runtime将能够查询模块标识符，检索出背后对应的模块。
#### 问题
所以，现在你应该对webpack在幕后工作有一点了解。"但是，这对我有什么影响呢？"，你可能会问。答案是大多数情况下没有。runtime做自己该做的，使用manifest来执行操作，然后，一旦你的应用程序加载到浏览器中，所有内容将展现出魔幻般运行。然而，如果你决定通过使用浏览器缓存来
### 动态配置入口文件
#### 动态打包所有子项目
```js
// 使用glob等工具使用若干通配符，运行时获得entry的条目
module.exports = {
  entry: glob.sync('./project/**/index.js').reduce((acc,path) => {
    const entry = path.replace('/index.js','')
    acc[entry] = path
    return acc
  },{})
}
```
则会将所有匹配`./project/**/index.js`的文件作为入口文件进行打包，如果你想要增加一个子项目，仅仅需要在project创建一个子项目目录，并创建一个index.js作为入口文件即可。
#### 动态打包某一子项目
在构建多系统应用或组件库时，我们每次打包可能仅仅需要打包某一模块，此时，可以通过命令行的形式请求打印某一模块，例如：
```js
npm run build --project components
```
在打包的时候解析命令行参数：
```js
// 解析命令行参数
const argv = require('minimist')(process.argv.slice(2))
// 项目
const project = argv['project'] || 'index'
```
然后配置入口：
```js
module.exports = {
  entry: {
    "index": `./${project}/index.js`
  }
}
// 相当于
module.exports = {
  entry: {
    "index": `./components/index.js`
  }
}
```
### 浏览器缓存与hash值
#### hash
build-specific,哈希值对应每一次构建（Compilation）,即每次编译都不同，即使文件内容都没改变，并且所有的资源都共享这一个哈希值，此时，浏览器缓存就没有用了，可以用在开发环境，生产环境不适用。
#### chunkhash
chunk-specific，哈希值对应于webpack每个入口点，每个入口都有自己的哈希值。如果在某一入口文件创建的关系依赖图上存在文件内容发生了变化，那么相应入口文件的chunkhash才会发生变化，适用于生产环境
#### contenthash
content-specific，根据包内容计算出的哈希值，只要包内容不变，contenthash就不变，适用于生产环境
注意：
+ 尽量在生产环境使用哈希
+ 按需加载的块不受filename影响，受chunkFilename影响
+ 使用hash/chunkhash/contenthash一般会配合html-webpack-plugin（创建html，并捆绑相应的打包文件）、clean-webpack-plugin（清除原有打包文件）一起使用
### mode
#### production
配置：
```js
// webpack.prod.config.js
module.exports = {
  mode: 'production'
}
```
相当于默认内置了：
```js
// webpack.prod.config.js
module.exports = {
  performance: {
    // 性能设置，文件打包过大时，会报警告
    hints: 'warning'
  },
  output: {
    // 打包时，在包中不包含所属模块的信息的注释
    pathinfo: false
  },
  optimization: {
    // 不使用可读的模块标识符进行调试
    namedModules: false,
    // 不使用可读的块标识符进行调试
    namedChunks: false,
    // 设置process.env.NODE_ENV 为production
    nodeEnv: 'production',
    // 标记块是否是其它块的子集
    // 控制加载块的大小（加载较大块时，不加载其子集）
    flagIncludedChunks: true,
    // 标记模块的加载顺序，使初始包更小
    occurrenceOrder: true,
    // 启用副作用
    sideEffects: true,
    // 确定每个模块的使用导出，
    // 不会为未使用的导出生成导出
    // 最小化的消除死代码
    // optimization.usedExports 收集的信息将被其他优化或代码生成所使用
    usedExports: true,
    // 查找模块图中可以安全的连接到其它模块的片段
    concatenateModules: true,
    // SplitChunksPlugin 配置项
    splitChunks: {
      // 默认 webpack4只会对按需加载的代码做分割
      chunks: 'async',
      // 表示在压缩前的最小模块大小，默认值是30kb
      minSize: 30000,
      minRemainingSize: 0,
      // 指在与HTTP/2和长期缓存一起使用
      // 它增加了请求数量以实现更好的缓存
      // 它还可以用于减小文件大小，以加快重建速度
      maxSize: 0,
      // 分割一个模块之前必须共享的最小块数
      minChunks: 1,
      // 按需加载时最大的并行请求数
      maxAsyncRequests: 6,
      // 入口的最大并行请求数
      maxInitialRequests: 4,
      // 界定符
      automaticNameDelimiter: '~',
      // 块名最大字符数
      automaticNameMaxLength: 30,
      cacheGroups: {  // 缓存组
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    // 当打包时，遇到错误编译，将不会把打包文件输出
    // 确保webpack不会输入任何错误的包
    noEmitOnErrors: true,
    checkWasmTypes: true,
    // 使用 optimizetion.minimizer || TerserPlugin 来最小化包
    minimize: true,
  },
  plugins: [
    // 使用terser来优化JavaScript
    new TerserPlugin(/*...*/),
    // 定义环境变量
    new webpack.DefinePlugin({"process.env.NODE_ENV":JSON.stringify("production")}),
    // 预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 在编译出现错误时，使用NoEmitOnErrorsPlugin来跳过输出阶段
    // 这样可以确保输出资源不会包含错误
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
```