import { defineConfig } from '@umijs/max';
import proxy from './config/proxy'
import routes from './config/router'

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
    hmr: true
  },
  routes,
  npmClient: 'yarn',
  proxy,
  mock: false
});

