<style lang="less">
@import url('../../assets/styles/variable.less');

.view-hover { opacity: 0.8; }

.page-container { height: auto; padding: 20rpx 20rpx; background:#eee; overflow-x: scroll; overflow-y: scroll; -webkit-overflow-scrolling: touch;
  .page-title { height: 150rpx; padding-top: 20rpx; font-weight: bold; font-size: 46rpx; margin-bottom: 0rpx; padding-left: 2.5%; background: @wx-yellow; color: #fefefe; position: relative;
    .en { font-weight: normal; font-size: 28rpx; }
    .float-btn { width: 150rpx; height: 52rpx; line-height: 50rpx; text-align: center; position: absolute; top: 20rpx; right: 20rpx; font-weight: normal; font-size: 28rpx; background: rgba(0, 0, 0, .5); font-size: 26rpx; color: #fff; border-radius: 0; background: @wx-blue-L; }
    .share-btn { top: 82rpx; }
  }
  .wiki-read-tip { margin: 0 auto 10rpx; padding: 5px 10px; font-size: 26rpx; background: #ccc; color: #fff; 
    .link { margin: 0 10rpx; letter-spacing: 5rpx; text-decoration: underline; color: @wx-blue-L; }
    .link-active { opacity: 0.7; }
  }
  .clickable-tip { background: @wx-blue-L; color: #fff; }
  .wiki-content { display: block; width: 100%; height: auto; margin-top: 0rpx; margin-bottom: 30rpx; overflow: scroll; }

  .scroll-to-top { height: 90rpx; width: 90rpx; position: fixed; bottom: 70rpx; right: 30rpx; background: rgba(0,0,0,.5);  border-radius: 50%;
    img { display: block; width: 60%; height: 60%; margin: 20rpx auto 0; }
  }
}
</style>

<template>
  <div class="page-container page-city-detail" v-show="wikiDataStatus == 'SUCCESS'" >
    <div class="page-title">
      <p>欢迎来到{{ cityInstance.name_zh }}</p>
      <p class="en">Welcome to {{ cityInstance.name_en }}</p>
      <button class="float-btn change-city-btn" hover-class="view-hover" @tap="goBackHome">切换城市</button>
      <button class="float-btn share-btn" hover-class="view-hover" open-type="share">分享好友</button>
    </div>
    <div class="wiki-read-tip">
      <div>以下内容来自维基导游 (https://zh.wikivoyage.org) ，仅供查阅参考，使用者应自行判断做决定。</div>
    </div>
    <div class="wiki-read-tip clickable-tip" hover-class="view-hover">
      <div @tap.stop="">您可点此查看维基百科上的相关条目，获取更多信息。</div>
    </div>
    <div
      v-show="showTaiwanTip"
      class="wiki-read-tip"
      style="color: #fff; background: #dd2200;"
    >
      港澳台属于中华人民共和国不可分割的一部分，以下维基信息可能包含明显误导信息，请注意辨别。
    </div>

    <rich-text class="wiki-content" v-html="cityWikiHtml"></rich-text>

    <!--<p style="font-size:30rpx; color: #d84e43; margin-bottom: 20rpx;" >如对此词条感兴趣，可前往维基导游(https://zh.wikivoyage.org/{{ cityInstance.name_zh }})进行查看和编辑</p>-->

    <div class="scroll-to-top" hover-class="view-hover" @tap="scrollToTop">
      <img :src="scrollToTopIcon" />
    </div>
  </div>
</template>

<script>
import config from '@/config'
import commonMixin from '@/mixins/commonMixin'

export default {
  name: 'CityWiki',
  props: [],
  mixins: [ commonMixin ],
  data() {
    return {
      scrollToTopIcon: require('../../assets/images/gotop.png'),
      allCities: config.allCities || [],
      cityId: '',
      cityName: '',
      cityWikiHtml: '',
      wikiDataStatus: 'INIT'
    }
  },
  computed: {
    cityInstance() {
      let instance = {}
      this.allCities.forEach(c => {
        if (c.id == this.cityId && c.name_zh == this.cityName) {
          instance = c
        }
      })
      return instance
    },
    showTaiwanTip() {
      return this.cityInstance.keywords.indexOf('台湾') > -1
    }
  },

  onShareAppMessage (options) {
    let that = this
    let title = `我在探索${that.cityName}，正等你来~`
    if (Math.random() <= 0.5) {
      title = `我发现了${that.cityName}旅游指南，一起来看`
    }
    return {
      title: title,
      path: `pages/citywiki/main?id=${that.cityId}&name=${that.cityName}`
    }
  },
  // 获取url中的query对象，包含城市id及name
  onLoad(query) {
    console.log(query);
    this.cityId = query.id || ''
    this.cityName = query.name || ''
    this.wikiDataStatus = 'INIT'
  },

  mounted() {
    wx.setNavigationBarTitle({
      title: `${this.cityName}旅游指南`
    })
    this.fetchWikiData()

    // 创建插屏广告实例
    if (wx.createInterstitialAd) {
      this.interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-4617e5a38b3e945d'
      })
    }
    // 在适合的场景显示插屏广告
    if (this.interstitialAd) {
      this.interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },
  methods: {
    goBackHome() {
      wx.reLaunch({
        url: "/pages/citylist/main"
      })
      // wx.navigateBack({
      //   delta: 2
      // })
    },
    // 获取城市旅游数据
    fetchWikiData() {
      wx.showLoading({
        title: '数据获取中',
        mask: true
      })
      this.cityWikiHtml = ''
      this.wikiDataStatus = 'LOADING'
      // const Base_Url = 'https://gitee.com/crystalworld/public_data/raw/master/wikivoyage'
      const Base_Url = 'https://cdn.jsdelivr.net/gh/WarpPrism/SubwayRoutineMP@latest'
      const wikiNameMap = {
        '东京': '東京',
        '纽约': '紐約',
        '首尔': '首爾',
        '台北': '臺北'
      }
      let queryName = this.cityInstance.name_zh
      queryName = wikiNameMap[queryName] || queryName
      wx.request({
        url: `${Base_Url}/travel/${queryName}.html`,
        method: 'GET',
        success: (res) => {
          if (res && res.data) {
            let htmlContent = res.data
            if (res.statusCode < 400) {
              this.cityWikiHtml = htmlContent
              this.wikiDataStatus = 'SUCCESS'
            } else {
              this.cityWikiHtml = '<h1 style="margin: 50px auto;">暂无数据</h1>'
              this.wikiDataStatus = 'ERROR'
              wx.showToast({
                title: '暂无相关旅游数据',
                icon: 'none',
                duration: 2000
              })
            }
            setTimeout(() => {
              wx.hideLoading()
            }, 100)
          } else {
            this.wikiDataStatus = 'ERROR'
            wx.showToast({
              title: '网络异常，请稍后再试',
              icon: 'none',
              duration: 2000
            })
          }
        },
        fail: () => {
          this.wikiDataStatus = 'ERROR'
          wx.showToast({
            title: '网络异常，请稍后再试',
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    //回到顶部
    scrollToTop() {  // 一键回到顶部
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 300
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    }
  },
  watch: {},
  components: {}
}
</script>
