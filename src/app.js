// 运行时配置
import { getMainfestVersion } from '@/services/initial';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate

export async function getInitialState() {
  const { version } = await getMainfestVersion();
  return { name: 'test', version };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
      nav: false,
    },
    menuRender: false,
  };
};
