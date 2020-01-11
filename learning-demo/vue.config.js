const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/', //基本路径
    //publicPath: process.env.NODE_ENV !== 'production' ? process.env.VUE_APP_URL : '/', //基本路径
    outputDir: 'dist',  //生产环境构建输出目录
    //outputDir: process.env.VUE_APP_outputDir
    assetsDir: '',      //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    lintOnSave: false, // 是否开启eslint在保存的时候检查 ，false不开启
    devServer: {
        open: false,      // 启动服务后是否自动打开浏览器，true-每次启动都会打开新的
        host: '0.0.0.0', // 允许外部ip访问
        port: 8082,      // 端口
        https: false,    // 是否启用https
        proxy: {
            '/': {
                target: 'http://192.168.31.15:8089/',
                ws: true,
                changeOrigin: true,
                // pathRewrite: {
                //     '/': '/'
                // }
            }
        },
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
        // .set('layout', resolve('src/layout'))
        // .set('base', resolve('src/base'))
        // .set('static', resolve('src/static'))
    },
    //判断不同环境下使用不同配置
    configureWebpack: config => {
        if (process.env.NODE_ENV === "development") {
            config.devtool = 'source-map';
        } else if (process.env.NODE_ENV === "production") {
            config.devtool = "eval-source-map";
        }
    },

}