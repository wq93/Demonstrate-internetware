import axios from './common'

import {config} from 'Common/js/config.js'

const base = config.apiBase
export const $post = (url, params, closeAlert = false) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    closeAlert,
    data: params,
    headers: {
      'yanphone-token': ''
    }
  });
}
export const $uploadFile = (url, params, closeAlert = false) => {
  return axios({
    method: 'post',
    closeAlert,
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data',
      'yanphone-token': ''
    }
  });
}
export const $put = (url, params, closeAlert = false) => {
  return axios({
    method: 'put',
    closeAlert,
    url: `${base}${url}`,
    data: params,
    headers: {'yanphone-token': ''}
  });
}
export const $delete = (url, params,closeAlert = false) => {
  return axios({
    method: 'delete',
    closeAlert,
    data: params,
    url: `${base}${url}`,
    headers: {'yanphone-token': ''}

  });
}
export const $get = (url, params, closeAlert = false) => {
  return axios({
    method: 'get',
    params,
    closeAlert,
    url: `${base}${url}`,
    headers: {'yanphone-token': ''}

  });

}

