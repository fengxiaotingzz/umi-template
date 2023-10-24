
const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'GET /api/v1/queryUserList': (req, res) => {
    res.json({
      success: true,
      data: { list: users },
      response_code: 0,
    });
  },
  'POST /api/v1/user/list': (req, res) => {
    res.json({
      success: true,
      response_code: 0,
      data: { list: users },
    });
  },
};
