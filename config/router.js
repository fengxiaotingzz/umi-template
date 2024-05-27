export default [
  { path: '/', redirect: 'home' },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  { name: '404', path: '/404', component: './404' },
  { name: '403', path: '/403', component: './403' },
];
