import connect from '@/common/connect';
import { useEffect } from 'react';
import { dispatchFilter } from './dispatch';
import {useOutletContext} from 'umi'
import Test from './Test'

import './index.module.less'

const HomePage = ({ dispatch, filterData, ...other }) => {
  const { value } = filterData;
  useEffect(() => {
    dispatchFilter()(dispatch);
  }, []);

  console.log(useOutletContext(), filterData)
  return <div styleName='test'>222<Test/></div>;
};

export default connect(['filterData', 'a'], 'home')(HomePage);
