<style lang="less">
@import url('../assets/styles/variable.less');
// box-shadow: 1px 1px 3px 1px #ddd;
.components-city-card { width: 195rpx; height: 195rpx; margin: 15rpx 2%; text-align: center; background: #fff; position: relative; display: inline-block; letter-spacing: normal;
  &.active { opacity: .7; outline: solid 2rpx @wx-blue-L; }
  .subway-logo { width: 75rpx; height: 75rpx; position: absolute; top: 20rpx; left: 50%; transform: translateX(-50%); }
  .name-wrap { width: 100%; position: absolute; bottom: 20rpx; left: 0;
    .name-zh { color: #000; font-size: 36rpx; }
    .name-en { color: #777; font-size: 27rpx; }
  }
}
</style>

<template>
  <div class="components-city-card" hover-class="active" @tap="cityClickHandler">
    <img :src="instance.subway_logo" alt="logo" class="subway-logo">
    <div class="name-wrap">
      <p class="name name-zh">{{ instance.name_zh }}</p>
      <p class="name name-en">{{ instance.name_en }}</p>
    </div>
  </div>
</template>

<script>
import commonMixin from '@/mixins/commonMixin'

export default {
  name: 'CityCard',
  props: {
    instance: {
      type: Object,
      default: {}
    }
  },
  mixins: [ commonMixin ],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    cityClickHandler() {
      let city = this.instance
      let type = ''
      let list = ['地铁查询', '旅游指南']
      if (!city.isForeignCity) {
        list.push('城市地图')
      }
      wx.showActionSheet({
        itemColor: '#000000',
        itemList: list,
        success: (res) => {
          let index = res.tapIndex
          if (index == 0) {
            // 导航到地铁图
            type = 'metro'
            this.navigateToCityMetroMap()
          } else if (index == 1) {
            // 导航到城市旅游指南
            type = 'travel'
            this.navigateToCityTraveGuide()
          } else if (index == 2) {
            // 导航到地图
            type = 'map'
            this.navigateToCityMap()
          }
        },
        complete: () => {
          // 上报点击城市名
          wx.reportAnalytics('click_city', {
            city_name: city.name_zh || 'no_name',
            is_foreign: city.isForeignCity ? 1 : 0,
            type: type
          })
        }
      })
    },
    navigateToCityTraveGuide() {
      let city = this.instance
      this.viewCityWikipedia(city)
    },
    navigateToCityMetroMap() {
      let city = this.instance
      wx.navigateTo({
        url: `/pages/citydetail/main?id=${city.id}&name=${city.name_zh}`
      })
    },
    navigateToCityMap() {
      let city = this.instance
      wx.navigateTo({
        url: `/pages/citymap/main?id=${city.id}&name=${city.name_zh}`
      })
    },
    // 点击预览
    previewMetroNet() {
      let img = this.instance.subway_img || ''
      // console.log('previewMetroNet: ', img)
      if (img && img != '') {
        // 上报点击城市名
        wx.reportAnalytics('click_city', {
          city_name: this.instance.name_zh || 'no_name',
          is_foreign: this.instance.isForeignCity ? 1 : 0
        })
        wx.previewImage({
          urls: [this.instance.subway_img || ''],
          fail: function() {
            wx.reportAnalytics('preview_img_fail', {
              city_name: this.instance.name_zh || 'no_name',
              subway_img: this.instance.subway_img || ''
            })
          }
        })
      }
    }
  },
  watch: {},
  components: {}
}
</script>
