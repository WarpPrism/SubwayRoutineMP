<style lang="less">
@import url('../../assets/styles/variable.less');
.page-container { background: #eee; overflow: scroll; -webkit-overflow-scrolling: touch;
  .banner { display: block; width: calc(750rpx - 114rpx); height: 250rpx; margin: 0 auto; }
  .share-guide { width: calc(750rpx - 114rpx); margin: 0 auto 20rpx; color: @wx-blue; font-size: 26rpx; }
  .search-section { width: calc(750rpx - 110rpx); height: 70rpx; margin: 0 auto 20rpx; position: relative;
    .search-input { display: inline-block; width: 490rpx; height: 100%; padding: 5rpx 20rpx; background: #fff; border: solid 1px #ddd; box-sizing: border-box; position: absolute; left: 0; }
    .locate-btn { width: 130rpx; height: 100%; position : absolute; right: 0; top: 0; background: @wx-blue; color: #fff; box-sizing: border-box; display: flex; justify-content: center; align-items: center;
      &:active { opacity: 0.8; }
      .icon { width: 38rpx; height: 38rpx; margin-right: 5rpx; }
      text { margin-top: -5rpx; }
    }
  }

  // .section-title { width: calc(750rpx - 114rpx); text-align: center; font-size: 38rpx; margin: 20rpx auto; padding: 15rpx 0; letter-spacing: 2rpx;  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%); color: #fefefe; }
  // .section-title.title1 { background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%); }

  .tab-bar { width: calc(750rpx - 114rpx); margin: 0 auto; position: relative;
    .tab { display: inline-block; width: 200rpx; height: 70rpx; line-height: 70rpx; text-align: center; font-size: 36rpx; background: #fff; }
    .tab.cn-tab.active { color: #fefefe; background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%); }
    .tab.active { color: #fefefe; background-image: linear-gradient(120deg, #89d7fe 0%, #66a6ff 100%); }

    .more-function { width: 220rpx; background: none; position: absolute; top: 0; right: 0;
      .more-icon { display: inline-block; width: 50rpx; height: 50rpx; vertical-align: middle; }
      text { margin-left: 5rpx; vertical-align: middle; color: @wx-blue; }
      &:active { background: #e0e0e0; }
    }
  }

  .empty-info { width: calc(750rpx - 114rpx); height: 300rpx; line-height: 300rpx; text-align: center; font-size: 32rpx; margin: 20rpx auto; }

  .read-user-guide { width: calc(750rpx - 114rpx); margin: auto; color: @wx-blue; }

  .btns-wrap { display: flex; justify-content: space-around; align-items: center; }
  .bottom-btn { width: 300rpx; margin: 25rpx auto; background: @wx-blue-L; text-shadow: 1px 1px 10rpx #ccc; }
  .button-hover[type=primary] {
    opacity: 0.85;
  }
  .star-btn { background: @wx-yellow; }
}
</style>

<template>
  <div class="page-container page-citylist">
    <!-- <img class="preload" :src="preloadSrc" @load="imageOnLoad" @error="imageOnLoadError" > -->

    <!-- <img :src="bannerUrl" alt="" class="banner"> -->
    <p class="share-guide">如果觉得小程序对您有帮助，可以转发给好友哦{{emoji.pointUp}}</p>
    <div class="search-section">
      <input
        class="search-input"
        type="text"
        placeholder="输入您所在的城市，如北京"
        maxlength="50"
        :value="searchInputValue"
        @input="handleSearchInput"
      />
      <div class="locate-btn" @tap="getUserLocation">
        <img :src="locationIcon" class="icon" />
        <text>定位</text>
      </div>
    </div>

    <!-- <div class="section-title title1" v-if="ChinaCities.length > 0">国内城市</div>
    <CityCard v-for="city in ChinaCities" :key="city.id" :instance="city" />

    <div class="section-title title2" v-if="WorldCities.length > 0">国际城市</div>
    <CityCard v-for="wcity in WorldCities" :key="wcity.id" :instance="wcity" /> -->

    <div class="tab-bar">
      <div class="tab cn-tab" :class="{'active': activeTab == 'cn'}" v-if="ChinaCities.length > 0" @tap="clickTab('cn')">国内城市</div>
      <div class="tab en-tab" :class="{'active': activeTab == 'en'}" v-if="WorldCities.length > 0" @tap="clickTab('en')">国际城市</div>
      <div class="tab more-function" @tap="goToMoreFeature">
        <img :src="moreIcon" alt="" class="more-icon">
        <text>更多功能</text>
      </div>
    </div>

    <div class="city-list cn-list" v-show="activeTab=='cn'">
      <CityCard v-for="city in ChinaCities" :key="city.id" :instance="city" />
    </div>

    <div class="city-list en-list" v-show="activeTab=='en'">
      <CityCard v-for="wcity in WorldCities" :key="wcity.id" :instance="wcity" />
    </div>

    <div class="empty-info" v-if="ChinaCities.length <= 0 && WorldCities.length <= 0 && searchInputValue != ''">暂无您要找的城市{{emoji.thinkingFace}}</div>

    <div class="bottom-section">
      <!--<div class="read-user-guide" @tap="readUserGuide">《用户使用指南及反馈》</div>-->
      <div class="btns-wrap">
        <button class="bottom-btn star-btn" type="primary" @tap="clickStarMp">收藏小程序</button>
        <button class="bottom-btn share-btn" open-type="share" type="primary">分享给好友</button>
      </div>
    </div>

  </div>
</template>

<script>
import config from '@/config'
import weiboPicMixin from '@/mixins/weiboPicMixin'
import CityCard from '@/components/CityCard'
import QQMapWX from '../../assets/lib/qqmap-wx-jssdk.js'
const QQMapSDK = new QQMapWX({
  key: config.qqMapKey || ''
})

export default {
  name: 'CityList',
  props: [],
  mixins: [weiboPicMixin],
  data() {
    return {
      // bannerUrl: require('../../assets/images/banner.jpg'),
      locationIcon: require('../../assets/images/location.png'),
      moreIcon: require('../../assets/images/more.png'),
      preloadSrc: '',
      emoji: config.emoji,
      allCities: config.allCities || [],
      ChinaCities: [],
      WorldCities: [],
      activeTab: 'cn',
      searchInputValue: '',
      myAddress: ''
    }
  },
  computed: {},
  onShow() {
    wx.reportAnalytics('showhome', {})
  },
  mounted() {
    let fromRemote = true
    this.resetCities()
    // 同步远端更新
    this.getWeiboPic(fromRemote)
    // 打印城市名
    // this.allCities.forEach(c => {
    //   console.log(c.name_zh);
    // })
  },
  onShareAppMessage (options) {
    var that = this
    return {
      title: config.shareTitle || '',
      path: 'pages/citylist/main',
      imageUrl: config.shareImg
    }
  },
  methods: {
    // 预加载主要城市地铁图
    // preloadMainCityImg() {
    //   this.allCities.forEach(c => {
    //     this.preloadSrc = c.subway_img
    //   })
    // },
    // imageOnLoad(ev) {
    //   console.log(`图片加载成功，width: ${ev.mp.detail.width}; height: ${ev.mp.detail.height}`)
    // },
    // imageOnLoadError() {
    //   console.log('图片加载失败')
    // },
    // 切换城市列表tab
    clickTab(type) {
      this.activeTab = type
    },
    goToMoreFeature() {
      wx.navigateTo({
        url: '/pages/morefeature/main'
      })
    },
    resetCities() {
      this.ChinaCities = this.allCities.filter(city => {
        return city && !city.isForeignCity
      })
      this.WorldCities = this.allCities.filter(city => {
        return city && city.isForeignCity
      })
    },
    handleSearchInput(e) {
      let value = e.mp.detail.value
      this.searchInputValue = value
    },
    // 点击收藏小程序
    clickStarMp() {
      wx.reportAnalytics('click_star_mp', {});
      wx.showToast({
        title: `请点击右上角...菜单按钮，然后选择添加到我的小程序`,
        mask: true,
        icon: 'none',
        duration: 2000
      })
    },
    getUserLocation() {
      // 已经定过位了
      if (this.myAddress && this.myAddress !== '') {
        this.searchInputValue = this.myAddress || ''
        return
      }
      // 逆向解析经纬度
      QQMapSDK.reverseGeocoder({
        success: (res) => {
          console.log(res);
          if (res && res.result) {
            this.myAddress = res.result.address
            this.searchInputValue = this.myAddress || ''
            // 设置失效时间 1分钟
            setTimeout(() => {
              this.myAddress = ''
            }, 60e3)
          }
        },
        fail: () => {
          wx.showToast({
            title: '定位失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
  },
  watch: {
    searchInputValue: function (value) {
      value = value.trim().toLowerCase()
      if (!value || value == '') {
        this.resetCities()
        return
      }
      let searchCities = []
      searchCities = this.allCities.filter(city => {
        let name_en = city.name_en.toLowerCase()
        // 匹配英文名
        if (name_en.indexOf(value) > -1 || value.indexOf(name_en) > -1) {
          return true
        }
        // 匹配中文城市名
        if (city.name_zh.indexOf(value) > -1 || value.indexOf(city.name_zh) > -1) {
          return true
        }
        // 匹配省的名字（只针对国内城市）
        let provinces = city.province ? city.province.split(',') : []
        if (
          provinces.some(p => {
            return value.indexOf(p) > -1
          })
        ) {
          return true
        }
        return false
      })
      this.ChinaCities = searchCities.filter(city => {
        return city && !city.isForeignCity
      })
      this.WorldCities = searchCities.filter(city => {
        return city && city.isForeignCity
      })
      if (this.ChinaCities.length <= 0) {
        this.activeTab = 'en'
      }
      if (this.WorldCities.length <= 0) {
        this.activeTab = 'cn'
      }
    }
  },
  components: {
    CityCard
  }
}
</script>
