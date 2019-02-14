import _wx from 'wx-promise'

const SET_SYSTEM_INFO = 'SET_SYSTEM_INFO'

const state = {
  systemInfo: {
    system: '',
    model: '',
    platform: '',
    isipx: '',
    screenWidth: '',
    screenHeight: '',
    rpx2pxRate: ''
  }
}

const mutations = {
  // 设置设备信息
  [SET_SYSTEM_INFO] (state, info) {
    state.systemInfo.system = info.system
    state.systemInfo.model = info.model
    state.systemInfo.platform = info.platform
    state.systemInfo.isipx = info.model.includes('iPhone X')
    state.systemInfo.screenWidth = info.windowWidth
    state.systemInfo.screenHeight = info.windowHeight
    state.systemInfo.rpx2pxRate = info.windowWidth / 750
  }
}

const actions = {
  setSystemInfo ({ commit }) {
    return _wx.getSystemInfo().then(info => {
      commit(SET_SYSTEM_INFO, info)
      return info
    })
  }
}

const getters = {
  getSystemInfo (state) {
    return state.systemInfo
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
