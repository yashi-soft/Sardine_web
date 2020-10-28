// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: '/layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        component: 'views/documentation/index',
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: 'layout/Layout',
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: 'views/guide/index',
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  }
]

const asyncRoutes = [
  {
    path: '/permission',
    id: '101',
    isCatalog: '10',
    title: '我的权限',
    icon: 'lock',
    children: [
      {
        path: '/permission/page',
        id: '1001',
        name: 'PagePermission',
        title: '权限1'
      }
    ]
  },
  {
    path: '/icon',
    isCatalog: '10',
    id: '201',
    children: [
      {
        path: '/icon/index',
        id: '2001',
        name: 'Icons',
        title: '图标',
        icon: 'icon'
      }
    ]
  }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
