const { defineConfig } = require('@vue/cli-service')
const registerRouter = require('./backend/router')
module.exports = defineConfig({
  lintOnSave: false, // 禁用 ESLint
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        // 全局引入变量和mixin
        additionalData: ` @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";`
      }
    }
  },
  devServer: {
    // 使用最新的 setupMiddlewares API
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }
      registerRouter(devServer.app)
      return middlewares
    }
  }
})
