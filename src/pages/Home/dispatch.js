export const dispatchFilter = () => (dispatch) => {
  dispatch({
    url: '/api/v1/queryUserList',
    type: 'changeFilterData/filterData',
    payload: {
      value: '333',
    },
  });
};
