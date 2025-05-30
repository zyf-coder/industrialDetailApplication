// eslint-disable-next-line
const path = require('path');

const resolve = (dir) => path.join(__dirname, dir);
const isProduction = process.env.NODE_ENV === 'production';
const publicPath = process.env.NODE_ENV === 'production' ? process.env.BASE_URL : '/';
module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  lintOnSave: !isProduction,
  publicPath,
  css: {
    extract: {
      Type: true,
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      // src定义成@
      .set('@', resolve('src'))
      // components定义成_c
      .set('_c', resolve('src/components'));
    config.resolve.extensions
      .add('.js')
      .add('.json')
      .add('.jsx');
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 移除 preload 插件
    config.plugins.delete('preload');

    // 支持vue template 可选链和空值合并
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        // eslint-disable-next-line
        options.compiler = require('vue-template-babel-compiler');
        return options;
      });
  },
  devServer: {
    host: 'localhost',
    port: '8082',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    https: false,
    hotOnly: false,
    proxy: {
      '/boc-zj-fintech/': {
        target: 'http://192.168.210.57:30546/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/boc-zj-fintech/': '/boc-zj-fintech/'
        }
      },
      '/teis/': {
        // target: 'http://192.168.210.57:31622/',
        target: 'http://192.168.210.57:31588/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/teis/': '/teis/'
        }
      },
      '/consumer_test/': {
        target: 'http://192.168.210.57:30522/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/consumer_test/': '/consumer/'
        }
      },
      '/uaa/': {
        target: 'http://192.168.210.52:30606',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/uaa/': '/uaa/',
        }
      },
    }
  }
};
