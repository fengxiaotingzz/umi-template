import { getMainfestVersion } from '@/services/initial';
import { useEffect } from 'react';
import { Outlet, useLocation, useModel } from 'umi';

import '../styles/antd.less';

export default function Layout() {
  const { initialState } = useModel('@@initialState');
  const { pathname } = useLocation();

  async function diffVersion() {
    const { version } = await getMainfestVersion();
    if (initialState.version !== version) {
      // 做自己需要的更新提示操作
    }
  }

  useEffect(() => {
    diffVersion();
  }, [pathname]);

  return (
    <div>
      <div>header</div>
      <Outlet context={{ a: 1 }} />
    </div>
  );
}
