
import { handlePayload, handleClearCondition} from '@/utils/util';

const defaultCondition = {};

export default {
  namespace: 'home',
  state: {
    condition: defaultCondition,
    data: {}
  },
  reducers: {
    getData(state, action) {
      return handlePayload({ state, action, key: 'data' });
    },
    changeCondition(state, action) {
      return handlePayload({ state, action, key: 'condition' })
    },
    clearCondition(state) {
      return handleClearCondition({ state, defaultCondition });
    }
  }
}
  