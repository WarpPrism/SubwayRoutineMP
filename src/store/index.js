import Vue from 'vue'
import Vuex from 'vuex'

// import user from './modules/user'
// import system from './modules/system'
import map from './modules/map'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    // user,
    // system
    map
  },
  strict: debug
})

export default store
