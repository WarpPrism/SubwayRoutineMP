<style lang="less">
@wxGreen: #1aad19;
@wxGreenPress: #2ba245;
@wxBlue: #10AEFF;
@wxBlue1: #2782D7;
.page-container { background: #eee; overflow: scroll; padding: 30rpx 50rpx;
  .title { text-align: center; font-size: 50rpx; margin: 0 0 20rpx; }
  .info { margin-bottom: 20rpx; }
  .feadback-btn { width: 100%; margin: 50rpx auto; background: @wxBlue1; }
  .button-hover[type=primary] {
    opacity: 0.8;
  }
}
</style>

<template>
  <div class="page-container">
    <h2 class="title">使用指南</h2>
    <p class="info">本程序提供全国主要城市的地铁线路图预览，点击城市打开预览图，待预览图加载完毕后，可使用手指进行缩放。</p>
    <p class="info">目前支持的国内城市有：北京、上海、深圳、广州、武汉、成都、重庆、天津、青岛、大连、南京、苏州、杭州、郑州、香港、台北等。<br/>支持的国外城市有：东京、伦敦、纽约、首尔、新加坡等。</p>
    <p class="info">如果您觉得小程序对您有帮助，可以点击右上角转发给好友哦~</p>
    <h2 class="title">免责声明</h2>

    <p class="info">*本程序提供的信息、数据、内容等只作参考之用，不代表各城市轨道交通运营公司的官方信息和立场，使用过程中应以各城市发布的最新数据为准。
    <p class="info">*但本程序会尽可能与官方数据保持一致，为您及广大用户提供最方便的出行服务。</p>
    <p class="info">*本程序不对您及他人基于本程序提供信息所作出的决定或行动承担法律责任和义务。</p>

    <button class="feadback-btn" open-type="feedback" type="primary" size="default">用户反馈</button>
  </div>
</template>

<script>
import config from '@/config'

export default {
  name: '',
  props: [],
  mixins: [],
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  onShareAppMessage (options) {
    var that = this
    return {
      title: config.shareTitle || '',
      path: 'pages/citylist/main',
      imageUrl: config.shareImg
    }
  },
  methods: {},
  watch: {},
  components: {}
}
</script>
