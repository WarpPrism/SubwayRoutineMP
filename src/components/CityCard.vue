<style lang="less">
// box-shadow: 1px 1px 3px 1px #ddd;
.components-city-card { width: 280rpx; height: 280rpx; margin: 20rpx 37rpx; text-align: center; background: #fff; position: relative; display: inline-block;
  &:active { opacity: .7; }
  .subway-logo { width: 110rpx; height: 110rpx; position: absolute; top: 40rpx; left: 50%; transform: translateX(-50%); }
  .name-wrap { width: 100%; position: absolute; bottom: 20rpx; left: 0;
    .name-zh { color: #000; font-size: 36rpx; }
    .name-en { color: #999; font-size: 27rpx; }
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
  props: ['instance'],
  mixins: [],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    navigateToCityDetail() {
      let city = this.instance
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
