import { Outlet, useOutlet } from 'umi';

export default function Layout() {
  return (
    <div>
      <Outlet context={{a: 1}}/>
    </div>
  );
}
