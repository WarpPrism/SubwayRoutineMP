export default {
  methods: {
    async getWeiboPic(fromRemote = false) {
      let wbpic = await wx.getStorageSync('wbpic')
      if (wbpic && !fromRemote) {
        // console.log('wbpic map local', wbpic)
      } else {
        wbpic = await this.fetchWeiboPic()
        // console.log('wbpic map remote', wbpic)
      }
      return wbpic
    },
    fetchWeiboPic() {
      return new Promise((resolve, reject) => {
        const Gitee_URL = 'https://gitee.com/crystalworld/public_data/raw/master'
        wx.request({
          url: `${Gitee_URL}/metro/wbpic.json`,
          method: 'GET',
          success: (res) => {
            if (res && res.data) {
              wx.setStorageSync('wbpic', res.data)
              resolve(res.data)
            } else {
              reject('fetch weibo pic error')
            }
          },
          fail: () => {
            reject('fetch weibo pic error')
          }
        })
      })
    }
  }
}