/**
 * Created by macbook on 2018/6/7.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/index'
import Integration from '../pages/integration'
import MobileLogin from '../pages/mobile_login'
import MobileUsers from '../pages/mobile_users'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          name: 'integration',
          meta: {title: '重点省份行政服务事项综合办理平台'},
          component: Integration,
        },
      ]
    },
    {
      path: '/mobile',
      name: 'mobileLogin',
      meta: {title: '移动化办公'},
      component: MobileLogin
    },
    {
      path: '/mobile/users',
      name: 'mobileUsers',
      meta: {title: '移动化办公'},
      component: MobileUsers
    },

  ]
})
router.afterEach((route) => {
  let documentTitle = ''
  route.matched.forEach((path) => {
    if (path.meta.title) {
      documentTitle = `${path.meta.title}`
    }
  });
  document.title = documentTitle;
});
export default router
