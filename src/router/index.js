/**
 * Created by macbook on 2018/6/7.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/integration/index'
import Integration from '../pages/integration/integration'
import MobileLogin from '../pages/integration/mobile_login'
import MobileUsers from '../pages/integration/mobile_users'
// *****************************************
import Rainwater from '../pages/rainwater'
import sksq from '../pages/rainwater/water/sksq'
import nshsq from '../pages/rainwater/water/nshsq'
import dphsq from '../pages/rainwater/water/dphsq'
import hdsq from '../pages/rainwater/water/hdsq'
import zbsq from '../pages/rainwater/water/zbsq'

import sdsyq from '../pages/rainwater/rain/sdsyq'


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
    //  水情
    {
      path: '/rainwater',
      name: 'rainwater',
      meta: {title: ''},
      component: Rainwater
    },
    {
      path: '/rainwater/water/sksq',
      name: 'sksq',
      meta: {title: ''},
      component: sksq
    },
    {
      path: '/rainwater/water/nshsq',
      name: 'nshsq',
      meta: {title: ''},
      component: nshsq
    },
    {
      path: '/rainwater/water/dphsq',
      name: 'dphsq',
      meta: {title: ''},
      component: dphsq
    },
    {
      path: '/rainwater/water/hdsq',
      name: 'hdsq',
      meta: {title: ''},
      component: hdsq
    },
    {
      path: '/rainwater/water/zbsq',
      name: 'zbsq',
      meta: {title: ''},
      component: zbsq
    },
    // 雨情
    {
      path: '/rainwater/rain/:type',
      props: true,
      name: 'sdsyq',
      meta: {title: ''},
      component: sdsyq
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
