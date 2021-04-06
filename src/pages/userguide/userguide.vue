<style lang="less">
@import url('../../assets/styles/variable.less');

.page-container { background: #eee; overflow: scroll; padding: 0;
  .page-content { padding: 30rpx 50rpx; 
    .title { text-align: center; font-size: 50rpx; margin: 0 0 20rpx; }
    .info { margin-bottom: 20rpx;
      .empha { color: @wx-red; }
    }
    .share-btn, .feadback-btn { width: 100%; height: 80rpx; line-height: 80rpx; margin: 50rpx auto; background: @wx-blue-L; color: #fff; border-radius: 8rpx; }
    .button-hover[type=primary] {
      opacity: 0.8;
    }
  }
}
</style>

<template>
  <div class="page-container">
    <AppMenuBar :active-index="2" />
    <div class="page-content">
      <h2 class="title">使用指南</h2>
      <p class="info">小程序提供全球主要城市的导游信息和地铁线路信息，地铁线路图支持全屏预览和双指缩放。国内城市地铁支持路线规划和地图查看，国外暂不支持。</p>
      <p class="info">目前国内城市有：<span class="empha">北京、上海、深圳、广州、武汉、成都、重庆、天津、青岛、大连、南京、苏州、杭州、郑州、香港、台北</span>等。<br/>国外城市有：<span class="empha">东京、伦敦、纽约、首尔、新加坡、曼谷、大阪、莫斯科、迪拜、伊斯坦布尔</span>等。</p>
      <p class="info">小程序方便您到达新城市时，帮您和您的团队获取出行的第一手资料。</p>
      <p class="info">* 请确保<span class="empha">开启位置授权</span>，否则部分功能将无法正常使用。</p>
      <p class="info">* 如果您觉得小程序好用，可以<span class="empha">分享给好友或微信群</span>，以帮助更多的人！</p>
      <button class="share-btn" open-type="share" type="primary" size="default">点此分享</button>

      <h2 class="title">免责声明</h2>
      <p class="info">* 本程序提供的信息、数据、内容等只作参考之用，不代表各城市及其轨道交通运营公司的官方信息和立场，使用过程中应以各城市发布的最新数据为准。
      <p class="info">* 本程序会尽可能与官方数据保持一致，为您及广大用户提供最方便的出行服务。</p>
      <p class="info">* 本程序不对您及他人基于本程序提供信息所作出的决定或行动承担法律责任和义务。</p>

      <h2 class="title">用户反馈</h2>
      <p class="info">如果您在使用过程中遇到问题，请点击下方按钮</p>
      <button class="feadback-btn" open-type="feedback" type="primary" size="default">点此反馈</button>
    </div>
  </div>
</template>

<script>
import config from '@/config'
import AppMenuBar from '@/components/AppMenuBar'

export default {
  name: '',
  props: [],
  mixins: [],
  data() {
    return {}
  },
  computed: {},
  mounted() {
    wx.setNavigationBarTitle({
      title: `关于`
    })
  },
  onShareAppMessage (options) {
    var that = this
    return {
      title: config.share.defaultTitle || '',
      path: 'pages/citylist/main',
      imageUrl: config.share.defaultPic
    }
  },
  methods: {},
  watch: {},
  components: {
    AppMenuBar
  }
}
</script>
