import { message } from 'antd';

const handleResult = (res) => {
  message.error(res?.msg);
};

export const getData = async ({ url }) => {
  const res = await fetch(url);
  const res_1 = await res.json();
  if (res_1?.response_code === 0) {
    return res_1;
  }
  return handleResult(res_1);
};

export const postData = async ({ url, ...other }) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...other,
  });
  const res_1 = await res.json();
  if (res_1?.response_code === 0) {
    return res_1;
  }
  return handleResult(res_1);
};

export const request = ({ url, method = 'get', ...other }) => {
  if (method === 'get') {
    return getData({ url });
  }

  return postData({ url, ...other });
};
