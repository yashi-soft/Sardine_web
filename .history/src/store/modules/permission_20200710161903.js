import { constantRoutes } from '@/router'
import { getMenus } from '@/api/user'
import Layout from '@/layout'

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param data
 */
export function generaMenu(data, type) { // FGG动态路由修改
  const res = []
  data.forEach(item => {
    let menu = {}
    if (!item.children && item.isCatalog === '20' && !type) {
      menu = {
        path: '/' + item.path.split('/')[1],
        component: Layout,
        redirect: item.path,
        children: [
          {
            path: item.path,
            component: (resolve) => require([`@/views${item.path}`], resolve),
            name: 'Icons',
            meta: { title: item.title, icon: item.icon }
          }
        ]
      }
    } else {
      menu = {
        path: item.path,
        component: item.isCatalog === '10' ? Layout : (resolve) => require([`@/views${item.path}`], resolve),
        children: [],
        name: item.name || '',
        alwaysShow: item.isCatalog === '10',
        meta: { title: item.title || '', icon: item.icon || '', id: item.id }
      }
    }
    if (item.children) {
      menu.children = generaMenu(item.children, 'child')
    }
    res.push(menu)
    console.log(res)
  })
  res.push({ path: '*', redirect: '/404', hidden: true })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      getMenus(state.token).then(response => {
        const data = response.data
        if (response.code === 500) {
          console.log(JSON.stringify('菜单数据加载异常'))
        } else {
          const tempAsyncRoutes = generaMenu(data)
          const accessedRoutes = tempAsyncRoutes || []
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }
      }).catch(error => {
        console.log(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
