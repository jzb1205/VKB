import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'path';

Vue.use(Router)

export default new Router({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
          return savedPosition;
      } else {
          return { x: 0, y: 0 };
      }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: resolve=>require(['../pages/Home/Home.vue'],resolve),
    },
    {
      path: '/login',
      name: 'login',
      component: resolve=>require(['../pages/login/login.vue'],resolve),
    },
    {
      path: '/wrap',
      name: 'wrap',
      component: resolve=>require(['../pages/Wrap.vue'],resolve),
      beforeEnter: (to, from, next) => {
          verifyLogin(next);
      },
      children:[
        {
          path: '/wrap/ReceivingAddress/:isShow?',
          name: 'ReceivingAddress',
          component: resolve=>require(['../pages/MyBusiness/ReceivingAddress.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/BoughtCollection',
          name: 'BoughtCollection',
          component: resolve=>require(['../pages/MyBusiness/BoughtCollection.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/BoughtEmptyBags',
          name: 'BoughtEmptyBags',
          component: resolve=>require(['../pages/MyBusiness/BoughtEmptyBags.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/BoughtFlow',
          name: 'BoughtFlow',
          component: resolve=>require(['../pages/MyBusiness/BoughtFlow.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/PurchaseCollection',
          name: 'PurchaseCollection',
          component: resolve=>require(['../pages/MyBusiness/PurchaseCollection.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/PurchaseFlow',
          name: 'PurchaseFlow',
          component: resolve=>require(['../pages/MyBusiness/PurchaseFlow.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/PurchaseOfEmptyBags',
          name: 'PurchaseOfEmptyBags',
          component: resolve=>require(['../pages/MyBusiness/PurchaseOfEmptyBags.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/AlterPassword',
          name: 'AlterPassword',
          component: resolve=>require(['../pages/AccountManagement/AlterPassword.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/ExtensionLink',
          name: 'ExtensionLink',
          component: resolve=>require(['../pages/AccountManagement/ExtensionLink.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/UpToVip',
          name: 'UpToVip',
          component: resolve=>require(['../pages/AccountManagement/UpToVip.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/AccountRecharge',
          name: 'AccountRecharge',
          component: resolve=>require(['../pages/FanacialManagement/AccountRecharge.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/MoneyFlowDetail',
          name: 'MoneyFlowDetail',
          component: resolve=>require(['../pages/FanacialManagement/MoneyFlowDetail.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/RechargeRecord',
          name: 'RechargeRecord',
          component: resolve=>require(['../pages/FanacialManagement/RechargeRecord.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        },
        {
          path: '/wrap/VipCenter',
          name: 'VipCenter',
          component: resolve=>require(['../pages/VipCenter/VipCenter.vue'],resolve),
          beforeEnter: (to, from, next) => {
              verifyLogin(next);
          }
        }

      ]
    },
    {
        path: '/*',
        name: 'NotFound',
        component: resolve=>require(['../pages/NoFound/NoFound.vue'],resolve)
    }
  ]
})
// 未登录状态，个人中心全都跳转login
function verifyLogin(next) {
  if (window.localStorage.getItem('userId')) {
      next();
  } else {
     next('/login');
  }
}