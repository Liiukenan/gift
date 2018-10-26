'use strict'
// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
var glob = require('glob')

const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')
// 页面模板
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
var PAGE_PATH = path.resolve(__dirname, '../src/pages')
// 用于做相应的merge处理
var merge = require('webpack-merge')
const SpritesmithPlugin = require("webpack-spritesmith");

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function() {
  var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  var map = {}
  entryFiles.forEach((filePath) => {
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    map[filename] = filePath
  })
  return map
}

// 对生成精灵图的css进行定义
const templateFunction = function(data) {
  // console.log(data.sprites);
  const shared = ".icon { background-image: url(I); display: inline-block }".replace(
    "I",
    data.sprites[0].image
  );
  const TW = data.sprites[0].total_width;
  const TH = data.sprites[0].total_height;
  // 注意：此处默认图标使用的是二倍图，咨询UI把所有图片换成二倍图
  const perSprite = data.sprites
    .map(function(sprite) {
      const BGS = `background-size: ${TW / 2}px ${TH / 2}px;`;
      return `.icon-N { width: SWpx; height: SHpx; }\n.icon-N .icon, .icon-N.icon {  background-position: Xpx Ypx; ${BGS}} `
        .replace(/N/g, sprite.name)
        .replace(/SW/g, sprite.width / 2)
        .replace(/SH/g, sprite.height / 2)
        .replace(/W/g, sprite.width)
        .replace(/H/g, sprite.height)
        .replace(/X/g, sprite.offset_x / 2)
        .replace(/Y/g, sprite.offset_y / 2);
    })
    .join("\n");

  return shared + "\n" + perSprite;
};

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function() {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  let arr = []
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['manifest', 'vendor', filename],
      inject: true
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })

  arr.push(new SpritesmithPlugin({
    // 目标小图标
    src: {
      cwd: path.resolve(__dirname, "../src/assets/imgs/icons"),
      glob: "*.png"
    },
    // 输出雪碧图文件及样式文件
    target: {
      image: path.resolve(__dirname, "../src/assets/css/sprite.png"),
      css: [
        [
          path.resolve(__dirname, "../src/assets/css/sprite.css"),
          {
            format: "function_based_template"
          }
        ]
      ]
    },
    customTemplates: {
      function_based_template: templateFunction
    },
    // 样式文件中调用雪碧图地址写法
    apiOptions: {
      cssImageRef: "./sprite.png"
    },
    spritesmithOptions: {
      padding: 2
    }
  }))
  return arr
}
