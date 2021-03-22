import config from '@/config'
const Local_Config_Key = 'cities_config'

export default {
  methods: {
    async getCityConfig(fromRemote = false) {
      let config = wx.getStorageSync(Local_Config_Key)
      if (!config || fromRemote) {
        config = await this.fetchRemoteConfig()
      }
      return config
    },
    fetchRemoteConfig() {
      return new Promise((resolve, reject) => {
        wx.request({
          url: `${config.link.JsDelivr}/cities.json`,
          method: 'GET',
          success: (res) => {
            if (res && res.data) {
              wx.setStorageSync(Local_Config_Key, res.data)
              resolve(res.data)
            } else {
              reject('fetch remote config error')
            }
          },
          fail: () => {
            reject('fetch remote config error')
          }
        })
      })
    }
  }
}