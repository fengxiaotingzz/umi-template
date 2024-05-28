import { defineConfig } from '@umijs/max';
import genericNames from 'generic-names';
import { WebpackOpenBrowser } from 'webpack-open-browser';
import proxy from './config/proxy';
import routes from './config/router';

const localIdentName = '[name]__[local]-[hash:base64:5]';
const generateScope = genericNames(localIdentName, {
  context: process.cwd(),
});

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '我是一个新的项目啊',
  },
  dva: {
    hmr: true,
  },
  routes,
  npmClient: 'yarn',
  proxy,
  hash: true,
  locale: {
    default: 'zh-CN',
    baseSeparator: '-',
  },
  // 配置下面代码是为了实现import './index.module.less'引入cssModule
  extraBabelPlugins: [
    [
      'react-css-modules',
      {
        exclude: 'node_modules',
        generateScopedName: genericNames(localIdentName),
        filetypes: {
          '.less': {
            syntax: 'postcss-less',
          },
        },
      },
    ],
  ],
  cssLoader: {
    modules: {
      getLocalIdent: ({ resourcePath }, localIdentName, localName) => {
        return generateScope(localName, resourcePath);
      },
    },
  },
  chainWebpack(memo) {
    memo.plugin('webpack-open-browser').use(WebpackOpenBrowser, [
      {
        url: 'http://localhost:8000',
        ignoreErrors: false,
      },
    ]);
  },
});
