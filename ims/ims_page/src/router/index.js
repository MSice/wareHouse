import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('@/views/register'),
    hidden: true
  },
  {
    path: '/froget',
    name: 'Froget',
    component: () => import('@/views/froget'),
    hidden: true
  },
  {
    path: '/UallInfo',
    name: 'UAllInfo',
    component: () => import('@/views/User/components/AllInfo.vue'),
    hidden: true
  },
  {
    path: '/DallInfo',
    name: 'DAllInfo',
    component: () => import('@/views/Transport/Driver/components/AllInfo.vue'),
    hidden: true
  },
  //-----------------主页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },
  //-------------主页end
  //-------------个人信息管理//用户信息管理statr
  //-该用例权限分配，管理员可修改用户除账号外所有信息，用户只可修改个人信息
  //------------------用户信息管理-----------------
  {
    path: '/userout',
    component: Layout,
    redirect: '/user',
    hidden: true,
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/User'),
        meta: { title: '用户信息管理', icon: 'table' },
      },
    ]

  },
  //------------------订单管理-----------------
  {
    path: '/order',
    component: Layout,
    redirect: '/delete_Query',
    name: 'Order',
    meta: { title: '订单管理', icon: 'table' },
    children: [
      {
        path: '/delete_Query',
        name: 'DeleteAQuery',
        component: () => import('@/views/Order/DeleteAQuery'),
        meta: { title: '订单查询' }
      },
      {
        path: '/add',
        name: 'Add',
        component: () => import('@/views/Order/Add'),
        meta: { title: '创建订单' }
      },
      {
        path: '/change',
        name: 'Change',
        component: () => import('@/views/Order/Change'),
        meta: { title: '退换货' }
      },
      {
        path: '/check',
        name: 'Check',
        component: () => import('@/views/Order/Check'),
        meta: { title: '订单复审' }
      }
    ]

  },
  //------------------运输管理-----------------
  {
    path: '/transport',
    component: Layout,
    redirect: '/Transport',
    name: 'Transport',
    meta: { title: '运输管理', icon: 'table' },
    children: [
      {
        path: '/driver',
        name: 'Driver',
        component: () => import('@/views/Transport/Driver'),
        meta: { title: '司机信息管理' }
      },
      {
        path: '/task',
        name: 'Task',
        component: () => import('@/views/Transport/Task'),
        meta: { title: '任务一键分配' }
      }
    ]

  },
  // 仓库管理start
  {
    path: '/warehouse',
    component: Layout,
    redirect: '/infoHandle',
    name: 'warehouse',
    meta: { title: '仓库管理', icon: 'table' },
    children: [
      {
        path: '/infoHandle',
        name: 'InfoHandle',
        component: () => import('@/views/Warehouse/InfoHandle'),
        meta: { title: '仓库信息管理' }
      },
      {
        path: '/good/:id',
        name: 'Good',
        hidden: true,
        meta: { title: '货物信息详情' },
        component: () => import('@/views/Warehouse/InvManagement/Goods'),
      },
      {
        path: '/invManagement',
        name: 'InvManagement',
        component: () => import('@/views/Warehouse/InvManagement'),
        redirect: '/buyHouse',
        meta: { title: '库存管理' },
        children: [
          {
            path: '/buyHouse',
            name: 'BuyHouse',
            meta: { title: '采购管理' },
            component: () => import('@/views/Warehouse/InvManagement/BuyHouse'),
          },
          {
            path: '/inHouse',
            name: 'InHouse',
            component: () => import('@/views/Warehouse/InvManagement/inHouse'),
            meta: { title: '入库管理' }
          },
          {
            path: '/goodinfo',
            name: 'Goodinfo',
            component: () => import('@/views/Warehouse/InvManagement/goodInfo'),
            meta: { title: '货物清单' }
          },
          {
            path: '/outHouse',
            name: 'OutHouse',
            component: () => import('@/views/Warehouse/InvManagement/outHouse'),
            meta: { title: '出库管理' },
            children:[
              {
                path: '/orderOutHouse',
                name: 'OrderOutHouse',
                component: () => import('@/views/Warehouse/InvManagement/outHouse/orderOutHouse'),
                meta: { title: '订单出库' }
              },
              {
                path: '/returnOutHouse',
                name: 'ReturnOutHouse',
                component: () => import('@/views/Warehouse/InvManagement/outHouse/returnOutHouse'),
                meta: { title: '换货出库' }
              },
            ]
          },
        ]
      }
    ]
  },

  //------------测试用例------------------
  // {
  //   path: '/Test',
  //   component: Layout,
  //   redirect: '/test',
  //   name: 'Testall',
  //   children: [
  //     {
  //       path: '/test',
  //       name: 'Test',
  //       component: () => import('@/views/testOne/test.vue'),
  //       meta: { title: 'Test', icon: 'house' }
  //     }
  //   ]
  // },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
