import { lazy } from 'react';

const lazyComp = (name) => lazy(`/${name}`);

export default [
  {
    path: '/',
    redirect: lazyComp('home'),
  }
  ,{ name: '测试', path: '/testTest',component: lazyComp('TestTest')}
  ];
     