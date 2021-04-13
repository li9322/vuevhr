import axios from 'axios'
import { Message } from 'element-ui'
import { config } from 'vue/types/umd'

axios.interceptors.request.use(config => {
  return confirm;
}, err => {
  Message.err({ message: '请求超时！' });
  return Promise.resolve(err);
})
axios.interceptors.response.use(data => {
  if (data.status && data.status == 200 && data.status.status == 'error') {
    Message.error({message:data.data.msg});
    return;
  }
  return data;
},err=>{
  if(err.response.status ==504 || err.response.status == 404){
    Message.error({message:'服务器被吃了⊙﹏⊙∥'});
  }else if(err.response.status==403){
    Message.err({message:'权限不足，请联系管理员！'});
  }else{
    Message.error({message:'未知错误！'});
  }
  return Promise.resolve(err);
})

let base='';

export const postRequest=(url,params) =>{
  return axios({
    method:'post',
    url:`${base}${url}`,
    data:params,
    transformRequest:[function(data){
      let ret=''
      for(let it in data){
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it])+'&'
      }
      return ret
    }],
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const uploadFileRequest = (url,params)=>{
  return axios({
    method:'post',
    url:`${base}${url}`;
    data:params,
    headers:{
      'Content-Type':'multipart/form-data'
    }
  });
}

export const putRequest =(url,params)=>{
  return axios({
    method:'put',
    url: `${base}${url}`,
    data: params,
    transformRequest:[function(data) {
      let ret=''
      for(let it in data){
        ret +=encodeURIComponent(it)+'='+ encodeURIComponent(data[it])+'$'
      }
      return ret
    }],
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    }
  });
}

export const deleteRequest =(url)=>{
  return axios({
    method:'delete',
    url:`${base}${url}`
  });
}

export const getRequest=(url)=>{
  return axios({
    method:'get',
    url:`${base}${url}`
  });
}