/**
 *PostCSS的配置文件
 * PostCSS是基于Node.js 运行的一个处理css的工具
 * 所以它的配置文件也是运行在Node.js 中
 */
module.exports = {
  plugins: {
    // autoprefixer: {
    //   //browsers 用来配置兼容到的系统（浏览器）环境
    //   //这个配置没有问题，但是写到这里会有控制台编辑警告
    //   //为什么？因为VueCli是通过项目中的 .browserslistrc 文件来配置兼容的环境信息的
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 把px 转为 rem
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
