import connect from '@/common/connect';
import { useEffect } from 'react';
import { dispatchFilter } from './dispatch';
import {useOutletContext} from 'umi'
import Test from './Test'

import './index.cssmodule.less'

const HomePage: React.FC = ({ dispatch, filterData, a, ...other }) => {
  const { value } = filterData;
  useEffect(() => {
    dispatchFilter()(dispatch);
  }, []);

  console.log(useOutletContext())
  return <div className='test'>222<Test/></div>;
};

export default connect(['filterData', 'a'], 'home')(HomePage);
