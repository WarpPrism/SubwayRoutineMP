const SET_USER_DATA = 'SET_USER_DATA'
const SET_USER_INFO = 'SET_USER_INFO'

const state = {
  // iv, signature等
  userData: {},
  // avatar nickname等
  userInfo: {}
}

const mutations = {
  [SET_USER_DATA] (state, data) {
    if (JSON.stringify(state.userData) == "{}") {
      state.userData = data || {}
    }
  },
  [SET_USER_INFO] (state, data) {
    if (JSON.stringify(state.userInfo) == "{}") {
      state.userInfo = data || {}
    }
  }
}

const actions = {
  setUserData({ commit }, data) {
    commit(SET_USER_DATA, data)
  },
  setUserInfo({ commit }, data) {
    commit(SET_USER_INFO, data)
  }
}

const getters = {
  getUserData(state) {
    return state.userData
  },
  getUserInfo(state) {
    return state.userInfo
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
