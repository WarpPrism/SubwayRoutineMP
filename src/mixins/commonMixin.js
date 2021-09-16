export default {
  methods: {
    // 跳转到中文维基小程序（深度计算出品）
    viewCityWikipedia(city) {
      if (!city || !city.name_zh) return
      let wikiName = city.name_zh
      let specialCityArr = ['台北', '台中', '高雄', '香港', '澳门']
      if (!city.isForeignCity && !specialCityArr.includes(wikiName)) {
        wikiName = wikiName + '市'
      }
      console.log('wikiName :>> ', wikiName);
      wx.navigateToMiniProgram({
        appId: 'wxc5272efe47e0d943',
        path: `pages/wiki/wiki?titleUri=${encodeURIComponent(wikiName)}`,
        envVersion: 'release',
        success(res) {
          console.log('navigateToMiniProgram :>> ', res);
        }
      })
    }
  }
}