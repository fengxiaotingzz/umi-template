const wrappers = ['@/wrappers/auth',]

export default [
  { path: '/', redirect: 'home' },
  { name: '首页', path: '/home', component: './Home' },
  { name: 'Test', path: '/test', component: './Test', },
  { name: '404', path: '/*', component: './404', },
];
