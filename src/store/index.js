import Vue from 'vue'
import Vuex from 'vuex'

// import user from './modules/user'
// import system from './modules/system'
import mapp from './modules/mapp'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    // user,
    // system
    mapp
  },
  strict: debug
})

export default store
