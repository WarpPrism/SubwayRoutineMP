<style lang="less">
@wxGreen: #1aad19;
@wxGreenPress: #2ba245;
@wxBlue: #10AEFF;
@wxBlue1: #2782D7;
@wxRed: #d84e43;
.page-container { background: #eee; overflow: scroll; -webkit-overflow-scrolling: touch;
  .banner { display: block; width: calc(750rpx - 114rpx); height: 250rpx; margin: 0 auto; }
  .share-guide { width: calc(750rpx - 114rpx); margin: 0 auto 20rpx; color: @wxBlue1; font-size: 26rpx; }
  .search-section { width: 100%; margin: 0 0 15rpx; padding: 0 37rpx; position: relative;
    .search-input { display: inline-block; width: 520rpx; height: 61rpx; padding: 5rpx 20rpx; background: #fff; box-sizing: border-box; }
    .search-btn { width: 100rpx; height: 61rpx; text-align: center; line-height: 58rpx; position: absolute; right: 37rpx; top: 0; background: @wxBlue1; color: #fff; border-radius: 5rpx; box-sizing: border-box;
      &:active { opacity: 0.8; }
    }
  }
  scroll-view.cities-wrap { width: 100%; height: 1050rpx; }

  .section-title { width: calc(750rpx - 114rpx); text-align: center; font-size: 38rpx; margin: 20rpx auto; padding: 15rpx 0; letter-spacing: 2rpx;  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%); color: #fefefe; }
  .section-title.title1 { background-image: linear-gradient(to right, #b8cbb8 0%, #b8cbb8 0%, #b465da 0%, #cf6cc9 33%, #ee609c 66%, #ee609c 100%); }

  .empty-info { width: calc(750rpx - 114rpx); height: 300rpx; line-height: 300rpx; text-align: center; font-size: 32rpx; margin: 20rpx auto; }

  .read-user-guide { width: calc(750rpx - 114rpx); margin: auto; color: @wxBlue1; }

  .bottom-btn { width: calc(750rpx - 114rpx); margin: 25rpx auto; background: @wxBlue1; }
  .button-hover[type=primary] {
    opacity: 0.85;
  }
}
</style>

<template>
  <div class="page-container page-citylist">
    <!-- <img class="preload" :src="preloadSrc" @load="imageOnLoad" @error="imageOnLoadError" > -->

    <!-- <img :src="bannerUrl" alt="" class="banner"> -->
    <p class="share-guide">如果觉得小程序对您有帮助，可以转发给好友哦👆</p>
    <div class="search-section">
      <input
        class="search-input"
        type="text"
        placeholder="输入您所在的城市，如北京"
        maxlength="35"
        @input="handleSearchInput"
      />
      <div class="search-btn" @tap="clickSearchBtn">定位</div>
    </div>
    <!-- <scroll-view scroll-y="" class="cities-wrap"></scroll-view> -->

    <div class="section-title title1" v-if="ChinaCities.length > 0">国内城市</div>
    <CityCard v-for="city in ChinaCities" :key="city.id" :instance="city"></CityCard>

    <div class="section-title t2" v-if="WorldCities.length > 0">国际城市</div>
    <CityCard v-for="city in WorldCities" :key="city.id" :instance="city"></CityCard>

    <div class="empty-info" v-if="ChinaCities.length <= 0 && WorldCities.length <= 0">暂无您要找的城市🤔</div>


    <div class="read-user-guide" @tap="readUserGuide">《用户使用指南及反馈》</div>

    <button class="bottom-btn" open-type="share" type="primary">发送给好友</button>
    <button class="bottom-btn" type="primary" @tap="clickStarMp">收藏小程序</button>
  </div>
</template>

<script>
import config from '@/config'

import CityCard from '@/components/CityCard'
export default {
  name: 'CityList',
  props: [],
  mixins: [],
  data() {
    return {
      // bannerUrl: require('../../assets/images/banner.jpg'),
      preloadSrc: '',
      allCities: config.allCities || [],
      ChinaCities: [],
      WorldCities: []
    }
  },
  computed: {},
  onShow() {
    wx.reportAnalytics('showhome', {})
  },
  mounted() {
    this.resetCities()
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
      value = value.trim().toLowerCase()
      if (!value || value == '') {
        this.resetCities()
        return
      }
      let searchCities = []
      searchCities = this.allCities.filter(city => {
        if (city.name_en.toLowerCase().indexOf(value) > -1) {
          return true
        }
        if (city.name_zh.indexOf(value) > -1) {
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
    },
    clickSearchBtn() {
      if (this.ChinaCities.length <= 0 && this.WorldCities.length <= 0) {
        wx.showToast({
          title: '对不起，找不到相关城市信息',
          mask: true,
          icon: 'none',
          duration: 1000
        })
      }
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
    // 跳转到用户指引
    readUserGuide() {
      wx.navigateTo({
        url: '/pages/userguide/main'
      })
    }
  },
  watch: {},
  components: {
    CityCard
  }
}
</script>
