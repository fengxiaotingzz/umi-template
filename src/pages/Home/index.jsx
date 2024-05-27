import connect from '@/common/connect';
import { Button } from 'antd';
import { SelectLang, setLocale, useIntl } from 'umi';
import Text from './components/Text';
import * as actions from './dispatch';

import './index.module.less';

function Home({ home, changeCondition, clearCondition, getData }) {
  const { data = {}, condition = {} } = home;
  const intl = useIntl();
  const msg = intl.formatMessage({
    id: 'name',
  });

  return (
    <div styleName="home-page">
      <SelectLang />
      <div
        onClick={() => {
          setLocale('en-US', false);
        }}
      >
        切换语言
      </div>
      222
      <Text />
      {/* <FormattedMessage id='name'/> */}
      {msg}
      <Button type="primary">点击</Button>
    </div>
  );
}

export default connect(actions)(Home);
