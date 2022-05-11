const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // 在项目打包后默认访问的是 dist 目录
    // contentBase: path.join(__dirname, 'dist'), // path内置模块,获取到dist文件夹的绝对路径
    port: 8080, // 项目运行端口号
    proxy: {
      '/api': { // 就是使用/api代替了下边要写的后端的接口
        target: 'http://nwuegb.natappfree.cc', // 此处填写后端接口
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
