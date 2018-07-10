import axios from 'axios';
import {errorAlert} from '../common/js/common.js'

let pageFlag = {}
axios.interceptors.request.use(config => {
  pageFlag[config.url] = config.closeAlert
  return config
}, error => {
  return Promise.reject(error)
});

axios.interceptors.response.use(response => {
  return response.data
}, error => {
  error.response ? pageFlag[error.response.config.url] || errorAlert(error.response.data) : errorAlert(error.data)
  return Promise.reject(error);
});

export default axios
