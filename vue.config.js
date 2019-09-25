const path = require('path');

const resolve = dir => path.join(__dirname, dir);

module.exports = {
    devServer: {
        host: '127.0.0.1',
        // proxy: {
        // '/': {
        //     target: host, // 对应自己的接口
        //     changeOrigin: true,
        // },
        // },
        disableHostCheck: true,
        https: false,
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                '@': resolve('src'),
            },
        },
        externals: process.env.NODE_ENV === 'development' ? {} : {
            vue: 'Vue',
        }, // 在html模版中单独引入vue，打包时不会被打入
    },
    chainWebpack: (config) => {
        config.module.rule('fonts')
            .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
            .use('url-loader')
            .loader('url-loader')
            .options({
                limit: 1000000,
                fallback: {
                    loader: 'file-loader',
                },
            });
    },
    productionSourceMap: false,
    filenameHashing: false,
    assetsDir: '',
    outputDir: 'dist',
};
