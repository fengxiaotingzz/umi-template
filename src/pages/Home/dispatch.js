export const dispatchFilter = () => (dispatch) => {
  dispatch({
    // get
    // url: '/api/v1/queryUserList',
    // post
    url: '/api/v1/user/list',
    method: 'post',
    type: 'changeFilterData/filterData',
    payload: {
      value: '333',
    },
  });
};
