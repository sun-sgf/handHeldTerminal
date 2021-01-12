module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  // webpack-dev-server 相关配置
  // devServer: {
  //   host: '0.0.0.0',
  //   port: 8080,
  //   open: true,
  //   proxy: {
  //     [process.env.VUE_APP_BASE_API]: {
  //       target: `http://192.168.3.234:8080`,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         ['^' + process.env.VUE_APP_BASE_API]: ''
  //       }
  //     }
  //   },
  //   disableHostCheck: true
  // },
  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
  // },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            // 换算的基数 默认为37.5，一般不建议修改它，使用vant ui框架中也是默认37.5
            rootValue: 37.5,
            // 忽略转换正则匹配项，插件会转化所有的样式的px。比如引入了三方UI，也会被转化.
            //项目中有不需要自动转换成PX的样式，就在此添加，如: .vant  表示 .vant 开头的都不会转换
            selectorBlackList: [],
            propList: ['*'], //属性的选择器，*表示通用
          }),
        ]
      }
    }
  }
}