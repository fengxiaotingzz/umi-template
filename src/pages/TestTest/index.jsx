import connect from '@/common/connect';
import { useEffect } from 'react';
import { dispatchFilter } from './dispatch';

import './index.module.less';

function TestTest() {
  return (
    <div styleName='test-test-page'>11</div>
  );
}

export default connect([], 'testTest')(TestTest);
