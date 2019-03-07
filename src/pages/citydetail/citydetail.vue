<style lang="less">
@wxGreen: #1aad19;
@wxGreenPress: #2ba245;
@wxBlue: #10AEFF;
@wxBlue1: #2782D7;
@wxRed: #d84e43;
.button-hover[type=primary] {
  opacity: 0.85;
}
.page-container { background: #eee; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch;
  .page-title { font-weight: bold; font-size: 38rpx; margin: 10rpx 0 40rpx; padding-left: 2.5%; position: relative;
    .en { font-weight: normal; font-size: 28rpx; margin-top: 10rpx; color: @wxBlue; }
    .float-btn { width: 150rpx; height: 52rpx; line-height: 50rpx; text-align: center; position: absolute; top: 0rpx; right: 10rpx; font-weight: normal; font-size: 28rpx; background: rgba(0, 0, 0, .5); font-size: 26rpx; color: #fff; border-radius: 0; }
    .share-btn { top: 62rpx; }
  }
  .img-container { width: 100%; height: auto;  overflow: hidden;
    .metro-img { display: block; width: 100%; height: 520rpx; border: solid 10rpx #fff; border-radius: 7rpx; }
  }
  .btn-group { width: 100%; margin: 50rpx 0 30rpx;
    .btn { display: inline-block; width: 45%; margin: 0 2.5%; background: @wxBlue1; font-size: 16px; line-height: 75rpx; }
  }
  .explore-btn { width: 95%; margin: 0 auto 20rpx; line-height: 75rpx;  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%); background: @wxRed; color: #fff; text-align: center; border-radius: 10rpx; }
}
</style>

<template>
  <div class="page-container page-city-detail">
    <div class="page-title">
      <p>{{ cityInstance.name_zh }}轨道交通图</p>
      <p class="en">{{ cityInstance.name_en }} Metro Diagram</p>
      <button class="float-btn change-city-btn" @tap="goBackHome">切换城市</button>
      <button class="float-btn share-btn" @tap="goToCityMap" v-if="!cityInstance.isForeignCity">查看地图</button>
    </div>
    <div class="img-container" @tap="previewMetroNet">
      <img :src="cityInstance.subway_img" :alt="cityInstance.name_zh" class="metro-img" mode="widthFix" @load="handleMetroImgLoad" @error="handleMetroImgError">
    </div>
    <div class="btn-group">
      <button class="btn btn1" open-type="share" type="primary">分享给好友</button>
      <button class="btn btn2" type="primary" @tap="previewMetroNet">查看高清大图</button>
    </div>
    <!-- <div class="wiki-content" v-html="cityWiki"></div> -->
    <button class="explore-btn" type="primary" @tap="exploreCity">探索{{ cityInstance.name_zh }}</button>

  </div>
</template>

<script>
import config from '@/config'

export default {
  name: '',
  props: [],
  mixins: [],
  data() {
    return {
      allCities: config.allCities || [],
      cityId: '',
      cityName: '',
      cityWiki: ''
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
    }
  },
  // 获取url中的query对象，包含城市id及name
  onLoad(query) {
    console.log(query);
    this.cityId = query.id || ''
    this.cityName = query.name || ''
  },
  onShareAppMessage (options) {
    var that = this
    return {
      title: `${this.cityName}高清地铁图`,
      path: `pages/citydetail/main?id=${this.cityId}&name=${this.cityName}`,
      imageUrl: this.cityInstance.subway_img || config.shareImg
    }
  },
  mounted() {
    wx.showLoading({
      title: '图片加载中'
    })
  },
  methods: {
    handleMetroImgLoad() {
      wx.hideLoading()
    },
    handleMetroImgError() {
      wx.showToast({
        title: '网络异常，请稍后再试',
        icon: 'none',
        duration: 2000
      })
    },
    // 点击预览
    previewMetroNet() {
      let img = this.cityInstance.subway_img || ''
      // console.log('previewMetroNet: ', img)
      if (img && img != '') {
        // 上报点击城市名
        wx.reportAnalytics('click_city', {
          city_name: this.cityInstance.name_zh || 'no_name',
          is_foreign: this.cityInstance.isForeignCity ? 1 : 0
        })
        wx.previewImage({
          urls: [this.cityInstance.subway_img || ''],
          fail: function() {
            wx.reportAnalytics('preview_img_fail', {
              city_name: this.cityInstance.name_zh || 'no_name',
              subway_img: this.cityInstance.subway_img || ''
            })
          }
        })
      }
    },
    goBackHome() {
      wx.navigateTo({
        url: "/pages/citylist/main"
      })
    },
    goToCityMap() {
      wx.navigateTo({
        url: `/pages/citymap/main?id=${this.cityId}&name=${this.cityName}`
      })
    },
    exploreCity() {
      wx.navigateTo({
        url: `/pages/citywiki/main?id=${this.cityId}&name=${this.cityName}`
      })
    }
  },
  watch: {},
  components: {}
}
</script>
