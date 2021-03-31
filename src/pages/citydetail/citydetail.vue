<style lang="less">
@import url('../../assets/styles/variable.less');
.button-hover[type=primary] {
  opacity: 0.85;
}
.page-container { background: #eee; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch;
  .page-title { font-weight: bold; font-size: 38rpx; margin: 10rpx 0 40rpx; padding-left: 2.5%; position: relative;
    .zh {
      span { vertical-align: middle; }
      .heart { display: inline-block;  width: 52rpx; height: 52rpx; margin-left: 20rpx; vertical-align: middle; }
    }
    .en { font-weight: normal; font-size: 28rpx; margin-top: 10rpx; color: @wx-blue-L; }
    .float-btn { width: 150rpx; height: 52rpx; line-height: 50rpx; text-align: center; position: absolute; top: 0rpx; right: 10rpx; font-weight: normal; font-size: 28rpx; background: rgba(0, 0, 0, .5); font-size: 26rpx; color: #fff; border-radius: 0; }
    .share-btn { top: 62rpx; }
  }
  .section-title { margin: 20rpx 0; padding-left: 2.5%; font-weight: bold; font-size: 36rpx; }

  .components-routine-query { margin: 0 0 40rpx; }

  .img-container { width: 100%; height: auto; margin: 0 0 20rpx; overflow: hidden;
    .metro-img { width: 100%; height: 520rpx; border: solid 10rpx #fff; border-radius: 7rpx; }
  }

  // .img-move-area { width: 100%; height: 700rpx; margin: 30rpx auto; overflow: hidden; border: solid 8rpx #fff; border-radius: 5rpx; background: #f0f0f0; position: relative;
  //   // fix me 图片居中仍不精确
  //   .img-move-view { width: 100%; height: auto; position: absolute; left: -120%; top: -100%;
  //     .metro-img { display: block; width: 100%; }
  //   }
  // }
  

  .btn-group { width: 100%; margin: 0 0 15rpx;
    .btn { display: inline-block; width: 45%; margin: 0 2.5%; background: @wx-blue; font-size: 16px; line-height: 75rpx; }
    .preview-btn { background: @wx-blue-L; }
    .share-btn { background: @wx-blue-L; }
    .travel-btn { background: @wx-yellow-D; }
    .map-btn { background: @wx-yellow-D; }
  }
  .explore-btn { width: 95%; margin: 0 auto 20rpx; line-height: 75rpx;  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%); background: @wx-red; color: #fff; text-align: center;  }
  .banner-ad { margin: 0 auto 20rpx; }
}
</style>

<template>
  <div class="page-container page-city-detail">

    <div class="page-title">
      <h1 class="zh" :aria-label="cityInstance.name_zh + '地铁线路图'">
        <text>{{ cityInstance.name_zh }}地铁线路图</text>
        <img :src="heartSrc" class="heart" @tap="toggleLikeCity"/>
      </h1>
      <p class="en">{{ cityInstance.name_en }} Metro Diagram</p>
      <button class="float-btn change-city-btn" @tap="goBackHome">切换城市</button>
    </div>

    <div v-if="showRoutineQuery" class="section-title">地铁路线规划</div>
    <RoutineQuery
      v-if="showRoutineQuery"
      :cityInstance="cityInstance"
    />

    <div class="img-container" @tap="previewMetroNet">
      <img :src="HDMetroImg" class="metro-img" mode="widthFix" @load="handleHDImgLoad" v-show="HDImgLoaded">
      <img :src="LDMetroImg" class="metro-img" mode="widthFix" v-show="!HDImgLoaded">
    </div>
    <!-- 性能问题严重 -->
    <!-- <movable-area class="img-move-area" scale-area>
      <movable-view class="img-move-view" direction="all" scale scale-value="3.5">
        <img :src="cityInstance.subway_img" :alt="cityInstance.name_zh" class="metro-img" mode="widthFix" @load="handleMetroImgLoad" @error="handleMetroImgError">
      </movable-view>
    </movable-area> -->
    <div class="btn-group">
      <button class="btn preview-btn" type="primary" @tap="previewMetroNet">查看高清大图</button>
      <button class="btn share-btn" open-type="share" type="primary">分享给好友</button>
    </div>

    <div class="btn-group">
      <button class="btn travel-btn" type="primary" @tap="exploreCity">{{ cityInstance.name_zh }}旅游攻略</button>
      <button v-if="!cityInstance.isForeignCity" class="btn map-btn" type="primary" @tap="goToCityMap">查看城市地图</button>
    </div>

    <ad class="banner-ad" unit-id="adunit-f49055bf9e2dcbe6" />
  </div>
</template>

<script>
import config from '@/config'
import RoutineQuery from '@/components/RoutineQuery'
import remoteConfigMixin from '@/mixins/remoteConfigMixin'

const heartIcon = require('../../assets/images/heart.png')
const heartActiveIcon = require('../../assets/images/heart-active.png')

export default {
  name: '',
  props: [],
  mixins: [ remoteConfigMixin ],
  data() {
    return {
      heartSrc: '',
      heartCount: 0, // 彩蛋
      allCities: config.allCities || [],
      cityId: '',
      cityName: '',
      LDMetroImg: '', // 低清晰度图片
      HDMetroImg: '', // 高清晰度图片
      HDImgLoaded: false,
      interstitialAd: null
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
    showRoutineQuery() {
      let show = true;
      // 外国城市和台湾暂不支持路线查询
      if (this.cityInstance.isForeignCity) {
        show = false
      }
      if (this.cityInstance.keywords && this.cityInstance.keywords.indexOf('台湾') > -1) {
        show = false
      }
      return show
    }
  },
  onShow () {
    let favoriateCity = wx.getStorageSync('favoriate_city')
    if (favoriateCity && favoriateCity.id == this.cityId) {
      this.heartSrc = heartActiveIcon
    } else {
      this.heartSrc = heartIcon
    }
  },
  // 获取url中的query对象，包含城市id及name
  async onLoad(query) {
    // this.wbpic = await this.getWeiboPic()
    this.heartSrc = heartIcon
    this.cityId = query.id || ''
    this.cityName = query.name || ''
    this.HDImgLoaded = false
    this.LDMetroImg = this.HDMetroImg = ''
  },
  onShareAppMessage (options) {
    var that = this
    return {
      title: `${this.cityName}高清地铁线路图`,
      path: `pages/citydetail/main?id=${this.cityId}&name=${this.cityName}`,
      imageUrl: this.HDMetroImg || config.shareImg
    }
  },
  async mounted() {
    wx.setNavigationBarTitle({
      title: `${this.cityName}地铁线路图`
    })
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

    wx.showLoading({
      title: '图片加载中'
    })
    let cityConfig = await this.getCityConfig()
    let city = cityConfig[this.cityName]
    if (city) {
      let src = ''
      if (this.cityInstance.isForeignCity) {
        src = config.link.JsDelivr + 'metro_net/World/' + city.metro_pic
      } else {
        // src = config.link.JsDelivr + 'metro_net/China/' + city.metro_pic
        src = config.link.MetroMan + 'metro/' + city.metroman_pic
      }
      this.HDMetroImg = this.LDMetroImg = src
    } else {
      this.HDMetroImg = this.LDMetroImg = this.cityInstance.subway_img || ''
    }
  },
  // unload时销毁vue数据，因为mpvue中小程序返回时只销毁了Page
  onUnload(){
    this.cityId = ''
    this.cityName = ''
    this.cityInstance = { keywords: '' }
    this.HDImgLoaded = false
    this.LDMetroImg = this.HDMetroImg = ''
  },
  methods: {
    handleHDImgLoad(ev) {
      console.log(`高清地铁图加载成功：width: ${ev.mp.detail.width}; height: ${ev.mp.detail.height}`)
      setTimeout(() => {
        this.HDImgLoaded = true
        wx.hideLoading()
      }, 50)
    },
    handleMetroImgLoad() {
      wx.hideLoading()
    },
    toggleLikeCity() {
      this.heartSrc = (this.heartSrc == heartIcon) ? heartActiveIcon : heartIcon
      if (this.heartSrc == heartActiveIcon) {
        wx.setStorageSync('favoriate_city', this.cityInstance)
        wx.showToast({title: '已设置为偏好城市', icon: 'none', mask: true})
      } else {
        wx.setStorageSync('favoriate_city', {})
        wx.showToast({title: '已取消偏好城市', icon: 'none', mask: true})
      }
      // 彩蛋
      this.heartCount++
      if (this.heartCount >= 20) {
        this.heartCount = 0
        // 手机振动
        wx.vibrateLong()
        wx.showModal({
          title: '恭喜发现彩蛋！',
          content: '心动了吗？我也是！分享给好友吧~',
          confirmText: '嗯~',
          cancelText: '退下吧',
          success: () => {}
        })
      }
    },
    // 点击预览
    previewMetroNet() {
      let img = this.HDMetroImg || ''
      if (img && img != '') {
        wx.previewImage({
          urls: [this.HDMetroImg || ''],
          fail: function() {
            wx.reportAnalytics('preview_img_fail', {
              city_name: this.cityInstance.name_zh || 'no_name',
              subway_img: this.HDMetroImg || ''
            })
          }
        })
      }
    },
    goBackHome() {
      wx.redirectTo({
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
  components: {
    RoutineQuery
  }
}
</script>
