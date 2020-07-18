import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import warehouse from './modules/warehouse'
import goods from './modules/goods'
import order from './modules/order'
import driver from './modules/driver'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    warehouse,
    goods,
    order,
    driver
  },
  getters
})

export default store
