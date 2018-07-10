export const required = {required: true, message: '请输入', trigger: 'blur'}
export const validateNodename = (rule, value, callback) => {
  if (!/^([a-z\_A-Z]|\d){2,20}$/.test(value)) {
    callback(new Error('2~20个字符,可使用英文、数字、下划线'));
  } else {
    callback();
  }
}
export const validateClustername = (rule, value, callback) => {
  if (!/^([a-z\_A-Z]|\d){2,20}$/.test(value)) {
    callback(new Error('2~20个字符,可使用英文、数字、下划线'));
  } else {
    callback();
  }
}
export const validateIp = (rule, value, callback) => {
  if (!/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/.test(value)) {
    callback(new Error('请输入正确的IP地址'));
  } else {
    callback();
  }
}
export const validateUsername = (rule, value, callback) => {
  if (!/^([a-z\_A-Z]|\d){2,16}$/.test(value)) {
    callback(new Error('长度为2~16个字符,可使用英文、数字、下划线(_)'));
  } else {
    callback();
  }
}
export const validateDeveloper = (rule, value, callback) => {
  if (!/^([a-z\_A-Z]|\d){2,18}$/.test(value)) {
    callback(new Error('长度为2~16个字符,可使用英文、数字、下划线(_)'));
  } else {
    callback();
  }
}
export const validateInit = (rule, value, callback) => {
  if (!/^(\d*[1-9]\d*)$/.test(value)) {
    callback(new Error('大于1的正整数'));
  } else {
    callback();
  }
}
export const positiveInteger = (rule, value, callback) => {
  if (!/^[1-9]\d*$/.test(value)||parseInt(value)>1440) {
    callback(new Error('请输入1-1440的正整数'));
  } else {
    callback();
  }
}
export const loginNum = (rule, value, callback) => {
  if (!/^[1-9]\d*$/.test(value)||parseInt(value)>20) {
    callback(new Error('请输入1-20的正整数'));
  } else {
    callback();
  }
}
export const smtp = (rule, value, callback) => {
  if (!/^(pop3|smtp)\.[\w-]+\.(com|cn|net|org|gov)(\.(cn|jp))?$/.test(value)) {
    callback(new Error('请输入正确的SMTP地址'));
  } else {
    callback();
  }
};
export const port = (rule, value, callback) => {
  if(value==""){
    callback();
  }else{
    if (!/^([1-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value)) {
      callback(new Error('1-66535,不填默认为25'));
    } else {
      callback();
    }
  }
};
export const email = (rule, value, callback) => {
  if (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value)) {
    callback(new Error('请输入正确的邮箱地址'));
  } else {
    callback();
  }
};
export const backupname = (rule, value, callback) => {
  if (!/^([a-z\A-Z]|\d){2,16}$/.test(value)) {
    callback(new Error('长度为2~16个字符,限使用英文、数字'));
  } else {
    callback();
  }
};
export const validateProxyAddr = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入代理地址'))
  } else if (!/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/.test(value)) {
    callback(new Error('请输入正确的代理地址'))
  } else {
    callback()
  }
}
export const validateProxyPort = (rule, value, callback) => {
  if (!value) {
    callback(new Error('1-65535'));
  } else if (!/^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value)) {
    callback(new Error('1-65535'));
  } else {
    callback()
  }
}
export const validateDisplayName = (rule, value, callback) => {
  if (!/^([a-z\_A-Z]|\d|[\u4e00-\u9fff]){2,18}$/.test(value)) {
    callback(new Error('2~18个字符，限使用中文、字母、数字和下划线_'));
  } else {
    callback();
  }
}
export const validateInterfacePath = (rule, value, callback) => {
  if (!value) {
    callback();
  } else if (!/^([a-z\_A-Z]|\d|[\u4e00-\u9fff]){4,256}$/.test(value)) {
    callback(new Error('4~256个字符,限使用英文、数字、和下划线_'));
  } else {
    callback();
  }
}
