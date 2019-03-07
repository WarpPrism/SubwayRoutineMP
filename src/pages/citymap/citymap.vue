<style lang="less">
@wxGreen: #1aad19;
@wxGreenPress: #2ba245;
@wxBlue: #10AEFF;
@wxBlue1: #2782D7;
@wxRed: #d84e43;

.page-container { padding: 0; background: #eee; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch; position: relative;
  #citymap { position: absolute; top: 0; left: 0; z-index: 10;
    .map-cover-view { width: 65%; height: 75rpx; margin: 0 auto 20rpx; position: absolute; bottom: 30rpx; left: 50%; transform: translateX(-50%); z-index: 100;
      .explore-btn { line-height: 75rpx; background: rgba(216, 78, 67, .5); color: #fff; text-align: center; border-radius: 10rpx; }
      .button-hover[type=primary] {
        opacity: 1;
        background: rgba(216, 78, 67, .6);
      }
    }
  }
}
</style>

<template>
  <div class="page-container page-city-detail" v-show="mapStatus == 'SUCCESS'">
    <map
      id="citymap"
      name="citymap"
      :longitude="lng"
      :latitude="lat"
      scale="12"
      subkey="VEHBZ-S6A34-QTKUP-DK3HK-TLN5O-DNF5L"
      show-location
      show-compass
      enable-rotate
      style="width: 100%; height: 100%;"
    >
      <cover-view class="map-cover-view">
        <button class="explore-btn" type="primary" @tap="exploreCity">探索{{ cityInstance.name_zh }}</button>
      </cover-view>
    </map>
  </div>
</template>

<script>
import config from '@/config'
import QQMapWX from '../../assets/lib/qqmap-wx-jssdk.min.js'
const QQMapSDK = new QQMapWX({
  key: config.qqMapKey || ''
})

export default {
  name: 'CityMap',
  props: [],
  mixins: [],
  data() {
    return {
      allCities: config.allCities || [],
      cityId: '',
      cityName: '',
      // 为空则为北京的经纬度
      lat: '',
      lng: '',
      mapStatus: 'INIT'
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
      title: config.shareTitle,
      path: `pages/citylist/main`,
      imageUrl: config.shareImg
    }
  },
  mounted() {
    this.mapStatus = 'INIT'
    this.getCityCoordinate()
  },
  methods: {
    getCityCoordinate() {
      let _address = this.cityInstance.name_zh + '市政府'
      let _region = this.cityInstance.name_zh + '市'
      if (this.cityInstance.name_zh == '北京') {
        _address = '北京市天安门广场'
      }
      this.mapStatus = 'LOADING'
      wx.showLoading({
        title: '地图加载中'
      })
      QQMapSDK.geocoder({
        address: _address,
        region: _region,
        success: (res) => {
          if (res && res.result) {
            let location = res.result.location
            this.lat = location.lat
            this.lng = location.lng
            this.mapStatus = 'SUCCESS'
            wx.hideLoading()
          } else {
            this.lat = this.lng = ''
            this.mapStatus = 'ERROR'
            wx.hideLoading()
          }
        },
        fail: () => {
          this.lat = this.lng = ''
          this.mapStatus = 'ERROR'
          wx.hideLoading()
        }
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
