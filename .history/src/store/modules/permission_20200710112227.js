import { asyncRoutes, constantRoutes } from '@/router'
import { getMenus } from '@/api/user'
import Layout from '@/layout'

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    //let path = `@/views${item.path}`
    const menu = {
      path: item.path,
      //component: item.isCatalog=='10'? Layout : () => import(path),
      component: item.isCatalog=='10'? Layout : (resolve) =>require([`@/views${item.path}`], resolve),
      //component: item.isCatalog=='10'? Layout : () => import(`@/views${item.path}`), 
      children: [],
      name: item.name,
      meta: { title: item.name, icon: item.icon,id: item.id }
    }

    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
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
      const loadMenuData = []
      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      getMenus(state.token).then(response => {
        let data = response
        if (response.code == 500) {
          console.log(JSON.stringify('菜单数据加载异常'))
        } else {
          data = response.data
          Object.assign(loadMenuData, data)
          const tempAsyncRoutes = Object.assign([], asyncRoutes)
          generaMenu(tempAsyncRoutes, loadMenuData)
          let accessedRoutes = tempAsyncRoutes || []
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