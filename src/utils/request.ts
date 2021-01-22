import axios from 'axios';

export const BASE_URL = 'http://47.108.88.248:9601/api/v1/team';
export const TIMEOUT = 10000;

export function request(config) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    method: 'post',
  });

  //响应拦截
  instance.interceptors.response.use(res => {
    // if (res.data.code === 502) {
    //     localStorage.removeItem("Dense-Diary-Authorization")
    //     message.warning('登录过期，请重新登录')
    //     window.location.replace('/#/login/')
    // }
    return res.data;
  });

  //请求拦截
  instance.interceptors.request.use(
    res => {
      if (
        localStorage.getItem('Dense-Diary-Authorization') ||
        !res.headers['Authorization']
      ) {
        res.headers['Authorization'] =
          'Bearer ' +
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjp7InRlYW1fdXNlcl9pZCI6IjEiLCJ0b2tlbl9mbGFnIjoiYXNkZmF3ZXJxZSJ9LCJleHAiOjE2MTM4MTkzOTh9.pVnGLtG9LE56_AGPnRn9u_7uJ8w0lg0No-hbVdG1jII';
      } else {
        //登录校验
        // if (!res?.url.includes('login/login')) {
        //   window.location.replace('/#/login/');
        // }
      }
      return res;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // 捕获http状态码错误
  return new Promise((resolve, reject) => {
    instance(config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        if (err.response) {
          // 错误信息
          console.log(err.response);
        }
      });
  });
}

export default request;
