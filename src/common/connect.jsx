import { connect } from 'dva'
import { memo } from 'react';
import { compose } from 'lodash/fp';
import { request } from './ajax';
import {withErrorBoundary} from '@/common/error'

const dispatchFunc = dispatch => {
  return obj => {
    const { type, payload = {}, url, handleRequest = res => res, ...other } = obj;

    if (url) {
      payload.loading = true;
      dispatch({
        type,
        payload
      })

      request({ url, ...other }).then(res => {
        payload.loading = false;
        if (res) {
          payload.data = res?.data
        }

        dispatch({
          type,
          payload: handleRequest(payload)
        })
      }).catch(() => {
        payload.loading = false;
        dispatch({
          type,
          payload
        })
      })
    } else {
      dispatch({
        type,
        payload
      })
    }
  }
}

const mapStateFunc = () => state => state;

const mapActions = actions => dispatch => {
  const keys = Object.keys(actions);
  const result = {};
  keys.forEach(key => {
    result[key] = actions[key](dispatchFunc(dispatch))
  })

  return result;
}

const connectBox = actions => WrapComponent => {
  return compose(memo, withErrorBoundary, connect(mapStateFunc(), mapActions(actions)))(WrapComponent)
}

export default connectBox;
