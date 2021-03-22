<style lang="less">
@import url('../assets/styles/variable.less');
// box-shadow: 1px 1px 3px 1px #ddd;
.components-city-card { width: 195rpx; height: 195rpx; margin: 15rpx 2%; text-align: center; background: #fff; position: relative; display: inline-block; letter-spacing: normal;
  &:active { opacity: .7; outline: solid 2rpx @wx-blue-L; }
  .subway-logo { width: 75rpx; height: 75rpx; position: absolute; top: 20rpx; left: 50%; transform: translateX(-50%); }
  .name-wrap { width: 100%; position: absolute; bottom: 20rpx; left: 0;
    .name-zh { color: #000; font-size: 36rpx; }
    .name-en { color: #777; font-size: 27rpx; }
  }
}
</style>

<template>
  <div class="components-city-card" @tap="navigateToCityDetail">
    <img :src="instance.subway_logo" alt="logo" class="subway-logo">
    <div class="name-wrap">
      <p class="name name-zh">{{ instance.name_zh }}</p>
      <p class="name name-en">{{ instance.name_en }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityCard',
  props: {
    instance: {
      type: Object,
      default: {}
    }
  },
  mixins: [],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    navigateToCityDetail() {
      let city = this.instance
      // 上报点击城市名
      wx.reportAnalytics('click_city', {
        city_name: city.name_zh || 'no_name',
        is_foreign: city.isForeignCity ? 1 : 0
      })
      wx.navigateTo({
        url: `/pages/citydetail/main?id=${city.id}&name=${city.name_zh}`
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
