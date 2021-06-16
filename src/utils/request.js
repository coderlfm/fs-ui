import axios from 'axios';
import { message } from 'antd';
// import { BASE_URL, TIMEOUT } from "./config";
const BASE_URL = 'http://47.108.88.248:9550/api/v1/admin/';
const TIMEOUT = 30000;

export function request(config) {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    method: 'post',
  });

  //响应拦截
  instance.interceptors.response.use((res) => {
    if (res.data.code === 502) {
      // debugger;
      localStorage.removeItem('jianfa-car-authorization');
      // message.warning('登录过期，请重新登录')
      // window.location.replace('/#/login/')
    }
    return res.data;
  });

  //请求拦截
  instance.interceptors.request.use(
    (res) => {
      if (localStorage.getItem('jianfa-car-authorization') || !res.headers['Authorization']) {
        // res.headers["Authorization"] = "Bearer " + localStorage.getItem("jianfa-car-authorization")
        res.headers['Authorization'] =
          'Bearer ' +
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXNzYWdlIjp7ImFjY291bnRfaWQiOiIxIn0sImV4cCI6MTYyNTgzMDE0NX0.l_EESISt85NMvAa31cLwjmIkJW2xXJw3iWHLsXE-Y1s';
      } else {
        //登录校验
        if (!res.url.includes('login/login')) {
          window.location.replace('/#/login/');
        }
      }
      return res;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // 捕获http状态码错误
  return new Promise((resolve, reject) => {
    instance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        if (err.response) {
          // 错误信息
          console.log(err.response);
        }
      });
  });
}

export default request;
