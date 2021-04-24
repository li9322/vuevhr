import axios from 'axios'
import { Message } from 'element-ui'
 
// axios.interceptors.request.use(config => {
//   // alert(config)
//   return confirm;
// }, err => {
//   Message.err({ message: '请求超时！' });
//   return Promise.resolve(err); 
// })


axios.interceptors.response.use(data => {
  if (data.status && data.status == 200 && data.data.status == '500') {
    Message.error({ message: data.data.msg });
    return;
  }
  if(data.data.msg){
    Message.success({message:data.data.msg})
  }
  return data.data;
}, error => {
  if (error.response.status == 504 || error.response.status == 404) {
    Message.error({ message: '服务器被吃了⊙﹏⊙∥' });
  } else if (error.response.status == 403) {
    Message.err({ message: '权限不足，请联系管理员！' });
  } else {
    Message.error({ message: '未知错误！' });
  }
  return Promise.resolve(error);
})

let base = '';

export const keyValueRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
  });
}

export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '$'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export const deleteRequest = (url) => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  });
}

export const getRequest = (url) => {
  return axios({
    method: 'get',
    url: `${base}${url}`
  });
}