// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'

import './common/less/index.less'
import './common/js/iconfont.js'
import {$post, $uploadFile, $put, $delete, $get} from './api/fetch'
import {errorAlert, $ajax_get} from 'Common/js/common.js'

Vue.config.productionTip = false
Vue.use(iView)
/* eslint-disable no-new */
Vue.prototype.$errorAlert = errorAlert;
Vue.prototype.$post = $post;
Vue.prototype.$uploadFile = $uploadFile;
Vue.prototype.$put = $put;
Vue.prototype.$delete = $delete;
Vue.prototype.$get = $get;
Vue.prototype.$ajax_get = $ajax_get;
Vue.prototype.$Message.config({
  top: 50,
  duration: 3
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App},
})
