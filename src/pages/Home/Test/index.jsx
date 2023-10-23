import connect from '@/common/connect';

import './index.module.less'

function Test(){
    return <div styleName='test'>2222</div>
}

export default connect(['filterData', 'a'], 'home')(Test)