const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080, // 项目运行端口号
    proxy: {
      '/api': { // 就是使用/api代替了下边要写的后端的接口
        target: 'http://localhost:8080', // 此处填写后端接口
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
