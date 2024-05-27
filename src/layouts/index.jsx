import { Outlet } from 'umi';

import '../styles/antd.less';

export default function Layout() {
  return (
    <div>
      <Outlet context={{ a: 1 }} />
    </div>
  );
}
