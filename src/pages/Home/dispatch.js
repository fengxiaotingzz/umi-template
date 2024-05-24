export const getData = dispatch => params => {
  dispatch({
    url: '',
    method: 'get',
    type: 'home/getData',
    body: params
  })
}
export const changeCondition = (dispatch) => (condition) => {
  dispatch({
    type: 'home/changeCondition',
    payload: condition,
  });
};

export const clearCondition = dispatch => () => {
  dispatch({
    type: 'home/clearCondition'
  })
}
  