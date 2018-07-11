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
          component: Integration
        },
      ]
    },
    {
      path: '/mobile',
      name: 'mobileLogin',
      component: MobileLogin
    },
    {
      path: '/mobile/users',
      name: 'mobileUsers',
      component: MobileUsers
    },

  ]
})
export default router
