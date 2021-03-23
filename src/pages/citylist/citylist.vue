<style lang="less">
@import url('../../assets/styles/variable.less');
.page-container { background: #f0f0f0; overflow: scroll; -webkit-overflow-scrolling: touch; padding: 0;
  .banner { display: block; width: calc(750rpx - 100rpx); height: 250rpx; margin: 0 auto; }
  .share-guide { width: calc(750rpx - 100rpx); margin: 0 auto 10rpx; color: @wx-red; font-size: 26rpx; }

  .ribbon-bar { width: 100%; height: 5rpx; background: linear-gradient(to right, #9ED110, #50B517, #179067, #476EAF, #9f49ac, #CC42A2, #FF3BA7, #FF5800, #FF8100, #FEAC00, #FFCC00, #EDE604); }

  .app-menu-bar { width: 100%; height: auto; margin: 0 auto; padding: 20rpx 50rpx; display: flex; flex-direction: row; justify-content: space-between; align-items: center; background: @wx-yellow; border-bottom: solid 5rpx @wx-yellow-D;
    .logo-container { width: 120rpx; height: 100rpx;
      .logo { width: 100%; height: 100%; }
    }
    .menu-container { margin: 0 0 0 30rpx; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; 
      .menu-item { width: 100rpx; height: 60rpx; line-height: 60rpx; margin: 0 10rpx; text-align: center; font-size: 32rpx; color: #fff; background: @wx-yellow-D; overflow: visible; border-radius: 10rpx; }
      .menu-item.active { border: solid 2rpx @wx-yellow-D;  background: @wx-yellow; }
    }
  }

  .search-section { width: calc(750rpx - 100rpx); height: 70rpx; margin: 15rpx auto 20rpx; position: relative;
    .search-input { display: inline-block; width: 490rpx; height: 100%; padding: 5rpx 20rpx; background: #fff; border: solid 1px #ddd; box-sizing: border-box; position: absolute; left: 0; }
    .locate-btn { width: 130rpx; height: 100%; position : absolute; right: 3rpx; top: 0; background: @wx-blue-L; color: #fff; box-sizing: border-box; display: flex; justify-content: center; align-items: center;
      &:active { opacity: 0.8; }
      .icon { width: 38rpx; height: 38rpx; margin-right: 5rpx; }
      text { margin-top: -5rpx; }
    }
  }

  // .section-title { width: calc(750rpx - 100rpx); text-align: center; font-size: 38rpx; margin: 20rpx auto; padding: 15rpx 0; letter-spacing: 2rpx;  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%); color: #fefefe; }
  // .section-title.title1 { background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%); }

  .tab-bar { width: calc(750rpx - 100rpx); margin: 0 auto 10rpx; position: relative;
    .tab { display: inline-block; width: 170rpx; height: 75rpx; line-height: 75rpx; text-align: center; font-size: 36rpx; background: #fff; }
    .tab.cn-tab.active { color: #fefefe; background: linear-gradient(to right, #fea06c, #d20a2c);
}
    .tab.active { color: #fefefe; background-image: linear-gradient(120deg, #89d7fe 0%, #66a6ff 100%); }

    .tab.cn-tab.active { background: @wx-yellow; }
    .tab.en-tab.active { background: @wx-blue-L; }
  }

  .city-list { width: 100%; text-align: center; }

  .empty-info { width: calc(750rpx - 100rpx); height: 300rpx; line-height: 300rpx; text-align: center; font-size: 32rpx; margin: 20rpx auto; }

  .read-user-guide { width: calc(750rpx - 100rpx); margin: auto; color: @wx-blue; }

  .btns-wrap { display: block; }
  .bottom-btn { display: inline-block; width: 280rpx; margin: 25rpx 42.5rpx; background: @wx-blue-L; text-shadow: 1px 1px 10rpx #ccc; }
  .button-hover[type=primary] {
    opacity: 0.85;
  }
  .star-btn { background: @wx-yellow; }
}
</style>

<template>
  <div class="page-container page-citylist">
    <!-- <img :src="bannerUrl" alt="" class="banner"> -->
    <!--<p class="share-guide">如果觉得小程序好用，可以转发给好友哦{{emoji.pointUp}}</p>-->
    <div class="app-menu-bar">
      <div class="logo-container">
        <img :src="travelIcon" alt="" class="logo">
      </div>
      <div class="menu-container">
        <div class="menu-item active">首页</div>
        <div class="menu-item" @tap="goToMoreFeature">更多</div>
        <button class="menu-item" open-type="share" type="primary">分享</button>
      </div>
    </div>
    <!--<div class="ribbon-bar"></div>-->


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


    <div class="tab-bar">
      <div class="tab cn-tab" :class="{'active': activeTab == 'cn'}" v-if="ChinaCities.length > 0" @tap="clickTab('cn')">国内城市</div>
      <div class="tab en-tab" :class="{'active': activeTab == 'en'}" v-if="WorldCities.length > 0" @tap="clickTab('en')">国际城市</div>
    </div>
    <div class="city-list cn-list" v-show="activeTab=='cn'">
      <CityCard v-for="(city, cindex) in ChinaCities" :key="cindex" :instance="city" />
    </div>

    <div class="city-list en-list" v-show="activeTab=='en'">
      <CityCard v-for="(wcity, windex) in WorldCities" :key="windex" :instance="wcity" />
    </div>

    <div class="empty-info" v-if="ChinaCities.length <= 0 && WorldCities.length <= 0 && searchInputValue != ''">暂无您要找的城市{{emoji.thinkingFace}}</div>

    <div class="bottom-section">
      <div class="btns-wrap">
        <button class="bottom-btn star-btn" type="primary" @tap="clickStarMp">收藏小程序</button>
        <button class="bottom-btn share-btn" open-type="share" type="primary">分享给好友</button>
      </div>
    </div>

    <ad unit-id="adunit-9a401400d5e6dc7c" style="margin-bottom: 20rpx;"></ad>

  </div>
</template>

<script>
import config from '@/config'
import CityCard from '@/components/CityCard'
import QQMapWX from '../../assets/lib/qqmap-wx-jssdk.js'
const QQMapSDK = new QQMapWX({
  key: config.qqMapKey || ''
})

import remoteConfigMixin from '@/mixins/remoteConfigMixin'

export default {
  name: 'CityList',
  props: [],
  mixins: [remoteConfigMixin],
  data() {
    return {
      // bannerUrl: require('../../assets/images/banner.jpg'),
      locationIcon: require('../../assets/images/location.png'),
      moreIcon: require('../../assets/images/more.png'),
      travelIcon: require('../../assets/images/icon_travel.png'),
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
    // 强制同步远端更新
    this.getCityConfig(true)
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
        let keywords = city.keywords ? city.keywords.split(',') : []
        if (
          keywords.some(p => {
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
