import connect from '@/common/connect';
import { useEffect } from 'react';
import { useOutletContext, FormattedMessage, useIntl, SelectLang,setLocale, getLocale } from 'umi';
import Test from './Test';
import {Button} from 'antd'
import { dispatchFilter } from './dispatch';

import './index.module.less';

const HomePage = ({ dispatch, filterData, ...other }) => {
  const intl = useIntl();

  const { value } = filterData;
  useEffect(() => {
    dispatchFilter()(dispatch);
  }, []);

  const msg = intl.formatMessage({
    id: 'name',
  });

  console.log(useOutletContext(), filterData)

  // console.log(getLocale())

  return (
    <div styleName="test">
      <SelectLang/>
      <div onClick={() => {
        setLocale('en-US', false)
      }}>切换语言</div>
      222
      <Test />
      {/* <FormattedMessage id='name'/> */}
      {msg}
      <Button type='primary'>点击</Button>
    </div>
  );
};

export default connect(['filterData', 'a'], 'home')(HomePage);
