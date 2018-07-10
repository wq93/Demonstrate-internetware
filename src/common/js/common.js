import router from '../../router/index'
import Vue from 'vue'
import {codeMessage, period} from './config.js'

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }

  function padLeftZero(str) {
    return ('00' + str).substr(str.length);
  }

  return fmt;
};

//标准时间格式转成 yyyy-MM-dd HH:mm:ss
export function timeFormat(date) {
  let year=date.getFullYear();
  let mon=date.getMonth()+1;
  let day=date.getDate();
  let hours=date.getHours();
  let min=date.getMinutes();
  let sec=date.getSeconds();
  let dateTime=`${year}-${zeroFill(mon)}-${zeroFill(day)} ${zeroFill(hours)}:${zeroFill(min)}:${zeroFill(sec)}`;
  function zeroFill(num){
    return num<10 ?`0${num}`:num
  }
  return dateTime
}

//格式化数字
export function numToQfh(s, n) {
  /*
   * 参数说明：
   * s：要格式化的数字
   * n：保留几位小数 0代表整数
   * */
  n = n > 0 ?n : 0;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse();
  var r = s.split(".")[1];
  var t = "";
  for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return n>0 ? t.split("").reverse().join("") + "." + r : t.split("").reverse().join("");
}

export function errorAlert(data) {
  let message = codeMessage.default;
  try {
    if(data.code){
      if(data.code===25100){
        message=`登录错误次数过多,请${data.message}分钟后重试`
      }else if( codeMessage[data.code]) {
        message = codeMessage[data.code];
      }
    }
  } finally {
    Vue.prototype.$Message.destroy()
    Vue.prototype.$Message.error(message);
  }
  if (data.code == 1 || data.code == 2 || data.code == 3) {
    router.push('/login');
  }
}

export function serializationDates(type = 'sevenDay') {
  let data = new Date();
  data.setHours(0);
  data.setMinutes(0);
  data.setSeconds(0);
  let endDate = Date.parse(data)
  let startDate = endDate - 3600000
  let periodSet = period
  switch (type) {
    case periodSet.onehour.key:
      startDate = endDate - 3600000
      break;
    case periodSet.today.key:
      startDate = endDate
      endDate = Date.parse(new Date())
      break;
    case periodSet.sevenDay.key:
      startDate = endDate - 3600000 * 24 * 6
      break;
    case periodSet.thirtyDay.key:
      startDate = endDate - 3600000 * 24 * 29
      break;
    case periodSet.thirtyDay.key:
      startDate = endDate - 3600000 * 24 * 29
      break;
    // case periodSet.custom.key:
    //   if (this.ui.startDate.val()) {
    //     startDate = startDate
    //   }
    //   if (this.ui.endDate.val()) {
    //     endDate = endDate
    //   }
    //   break;
    default:
  }
  return {startDate, endDate}
}
