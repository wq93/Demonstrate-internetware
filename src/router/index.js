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
import areaDetail from '../pages/rainwater/rain/area_detail'
import siteDetail from '../pages/rainwater/rain/site_detail'



Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   component: Index,
    //   children: [
    //     {
    //       path: '/',
    //       name: 'integration',
    //       meta: {title: '重点省份行政服务事项综合办理平台'},
    //       component: Integration,
    //     },
    //   ]
    // },
    // {
    //   path: '/mobile',
    //   name: 'mobileLogin',
    //   meta: {title: '移动化办公'},
    //   component: MobileLogin
    // },
    // {
    //   path: '/mobile/users',
    //   name: 'mobileUsers',
    //   meta: {title: '移动化办公'},
    //   component: MobileUsers
    // },

    //  水情
    {
      path: '/',
      meta: {title: '水情雨情'},
      redirect: '/rainwater'
    },
    {
      path: '/rainwater',
      name: 'rainwater',
      meta: {title: '水情雨情'},
      component: Rainwater
    },
    {
      path: '/rainwater/water/sksq',
      name: 'sksq',
      meta: {title: '水情'},
      component: sksq
    },
    {
      path: '/rainwater/water/nshsq',
      name: 'nshsq',
      meta: {title: '水情'},
      component: nshsq
    },
    {
      path: '/rainwater/water/dphsq',
      name: 'dphsq',
      meta: {title: '水情'},
      component: dphsq
    },
    {
      path: '/rainwater/water/hdsq',
      name: 'hdsq',
      meta: {title: '水情'},
      component: hdsq
    },
    {
      path: '/rainwater/water/zbsq',
      name: 'zbsq',
      meta: {title: '水情'},
      component: zbsq
    },
    // 雨情
    {
      path: '/rainwater/rain/sdsyq',
      name: 'sdsyq',
      meta: {title: '雨情'},
      component: sdsyq
    },
    // 地区雨情
    {
      path: '/rainwater/rain/area/:id/:name',
      name: 'areaDetail',
      props: true,
      meta: {title: '雨情'},
      component: areaDetail
    },
    // 站点雨晴
    {
      path: '/rainwater/rain/site/:id/:name',
      name: 'siteDetail',
      props: true,
      meta: {title: '雨情'},
      component: siteDetail
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
