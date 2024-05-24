import connect from '@/common/connect';
import * as actions from '../../dispatch';

function Text({ home, changeCondition, clearCondition, getData }) {
  const { data = {}, condition = {} } = home;
  return <div>11</div>;
}

export default connect(actions)(Text);
