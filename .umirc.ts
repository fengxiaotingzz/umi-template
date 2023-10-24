import { defineConfig } from '@umijs/max';
import genericNames from 'generic-names';
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
    title: '@umijs/max',
  },
  dva: {
    hmr: true,
  },
  routes,
  npmClient: 'yarn',
  proxy,
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
  // 这里配置getLocalIdent是因为在新版本的css-loader和babel-plugin-react-css-modules生成的hash算法不一样，导致js和css的hash不一样，样式取不上的问题
  cssLoader: {
      modules: {
        getLocalIdent: (
          { resourcePath },
          localIdentName,
          localName,
        ) => {
          return generateScope(localName, resourcePath);
        },
      },
  },
});
