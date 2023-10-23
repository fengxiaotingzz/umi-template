import connect from '@/common/connect';

import './index.cssmodule.less'

function Test(){
    return <div></div>
}

export default connect(['filterData', 'a'], 'home')(Test)