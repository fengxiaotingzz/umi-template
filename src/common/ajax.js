import {message} from 'antd'

const handleResult = (res) => {
    message.error(res?.msg)
}

export const getData = ({ url }) => {
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res?.response_code === 0) {
        return res;
      }

      return handleResult(res)
    });
};

export const postData = ({url, ...other}) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    ...other
  })
    .then((res) => res.json())
    .then((res) => {
      if (res?.response_code === 0) {
        return res;
      }

      return handleResult(res)
    });
}

export const request = ({ url, method = 'get', ...other }) => {
  if (method === 'get') {
    return getData({ url });
  }

  return postData({ url, ...other })
};
