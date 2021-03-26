<style lang="less">
@import url('../../assets/styles/variable.less');
.more-feature-container { padding: 10rpx 0 50rpx 0; background: #eee; position: relative;
  .em { color: @wx-blue; font-weight: bold; }
  .mask { width: 100%; height: 100%; position: absolute; top: 0; left: 0; background: rgba(0, 0, 0, .5); z-index: 200; 
    .modal { width: 560rpx; position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%); padding: 30rpx 25rpx 60rpx; background: #fff; border-radius: 10rpx; line-height: 50rpx; }
    .close-btn { width: 250rpx; position: absolute; top: 70%; left: 50%; transform: translate(-50%, -50%); color: #fff; border: solid 1px #fff; padding: 8rpx 10rpx; text-align: center; border-radius: 5rpx;
      &:active { background: #fff; color: #1a1a1a; }
    }
  }
  .section-title { width: 100%; padding: 15rpx 30rpx; margin-top: 0rpx; color: #666; font-size: 28rpx; }
  .section { width: 100%; padding: 20rpx 30rpx; background: #fff; border-bottom: solid 1px #eee; position: relative;
    .left { display: inline-block; width: 50%; text-align: left; 
      .icon { display: inline-block; width: 50rpx; height: 50rpx; vertical-align: middle; }
      .text { vertical-align: middle; margin-left: 10rpx; }
    }
    .right { display: inline-block; width: 50%; text-align: right; color: #666; font-size: 28rpx; }
    &:active { background: #dfdfdf; }
  }
  .recommend-section { position: relative;
    .avatar { display: inline-block; width: 100rpx; height: 100rpx; border-radius: 50%; }
    .name {  width: 80%; line-height: 100rpx; font-weight: bold; float: right; }
    .op-btn { width: 130rpx; padding: 2rpx; position: absolute; top: 43rpx; right: 38rpx; border: solid 1px @wx-green-L; color: @wx-green-L; font-size: 28rpx; text-align: center;
      &:active { color: #fff; background: @wx-green-L; }
    }
    .desc { color: #666; font-size: 28rpx; margin-top: 5rpx; }
    &:active { background: #fff; }
  }
}
</style>

<template>
  <div class="page-container more-feature-container">
    <div class="mask" v-show="modalShow" @tap="hideModal">
      <div class="modal" @tap.stop="showModal">
        <div style="text-align:center;font-weight:bold;margin-bottom:15rpx;">关联小程序</div>
        <div>想要扩展公众号功能？想要增加用户粘度？那就关联此小程序吧！</div>
        <div class="em">操作步骤</div>
        <div>1、以管理员身份登录公众号后台</div>
        <div>2、小程序管理-添加-关联小程序</div>
        <div>3、输入appid <span class="em">wxad716b9e75e773b5</span></div>
        <div>4、点击关联即可</div>
      </div>
      <div class="close-btn" @tap="hideModal">我再考虑一下</div>
    </div>

    <AppMenuBar :active-index="1" />

    <div class="section-title">更多功能</div>
    <div class="section" @tap="previewHistory">
      <div class="left">
        <img :src="movieIcon" alt="" class="icon">
        <text class="text">中国地铁发展历程</text>
      </div>
      <div class="right">截至2020</div>
    </div>
    <div class="section" @tap="previewHighRail">
      <div class="left">
        <img :src="copyIcon" alt="" class="icon">
        <text class="text">中国高铁线网图</text>
      </div>
      <div class="right">高清大图</div>
    </div>
    <!--
    <div class="section-title">为你推荐</div>
    <div class="section recommend-section" @tap="previewRailFanQr">
      <img :src="railFanAvatarSrc" alt="" class="avatar">
      <div class="name">铁路迷</div>
      <div class="op-btn" @tap="previewRailFanQr">查看详情</div>
      <div class="desc">精美高铁、地铁、轨道交通线路图绘制&分享</div>
    </div>
    <div class="section recommend-section" @tap="previewCsandQr">
      <img :src="csandAvatarSrc" alt="" class="avatar">
      <div class="name">CSandCatti</div>
      <div class="op-btn" @tap="previewCsandQr">查看详情</div>
      <div class="desc">1、英语精读&翻译  2、算法，前端开发，前端攻城师进阶之路。</div>
    </div>
    -->

    <div class="section-title">关于</div>
    <div class="section" @tap="readUserGuide">
      <div class="left">
        <img :src="fileIcon" alt="" class="icon">
        <text class="text">用户使用指南及反馈</text>
      </div>
      <div class="right"></div>
    </div>
    <div class="section" @tap="showModal">
      <div class="left">
        <img :src="linkIcon" alt="" class="icon">
        <text class="text">公众号关联小程序</text>
      </div>
      <div class="right">wxad716b9e75e773b5</div>
    </div>
    <!--<div class="section">
      <div class="left">
        <img :src="emailIcon" alt="" class="icon">
        <text class="text">联系方式</text>
      </div>
      <div class="right">zhoujh29@mail2.sysu.edu.cn</div>
    </div>-->
  </div>
</template>

<script>
import config from '@/config'

import AppMenuBar from '@/components/AppMenuBar'

export default {
  name: 'MoreFeature',
  props: [],
  mixins: [],
  data() {
    return {
      metroHistorySrc: 'https://i.loli.net/2019/03/17/5c8ddd1538d46.gif',
      highRailSrc: 'https://i.loli.net/2019/04/07/5ca9d15828d0c.jpg',
      csandAvatarSrc: 'https://i.loli.net/2019/04/07/5ca9d11fe5647.jpg',
      csandQrSrc: 'https://i.loli.net/2019/03/17/5c8dd532e9819.jpg',
      railFanAvatarSrc: 'https://i.loli.net/2019/04/07/5ca9d11fe73b7.jpg',
      railFanQrSrc: 'https://i.loli.net/2019/04/07/5ca9d1212db3d.jpg',
      pianoAvatarSrc: 'https://www.autopiano.cn/favicon.ico',
      movieIcon: require('../../assets/images/icon_movie.png'),
      copyIcon: require('../../assets/images/icon_copy.png'),
      fileIcon: require('../../assets/images/icon_file.png'),
      linkIcon: require('../../assets/images/icon_link.png'),
      emailIcon: require('../../assets/images/icon_email.png'),
      modalShow: false
    }
  },
  computed: {},
  onShareAppMessage (options) {
    var that = this
    return {
      title: config.shareTitle || '',
      path: 'pages/citylist/main',
      imageUrl: config.shareImg
    }
  },
  mounted() {},
  // unload时销毁vue数据，因为mpvue中小程序返回时只销毁了Page
  onUnload(){
    this.modalShow = false
  },
  methods: {
    previewHistory() {
      wx.previewImage({
        urls: [this.metroHistorySrc || '']
      })
    },
    previewHighRail() {
      wx.previewImage({
        urls: [this.highRailSrc || '']
      })
    },
    previewRailFanQr() {
      wx.previewImage({
        urls: [this.railFanQrSrc || '']
      })
    },
    previewCsandQr() {
      wx.previewImage({
        urls: [this.csandQrSrc || '']
      })
    },
    // 跳转到用户指引
    readUserGuide() {
      wx.navigateTo({
        url: '/pages/userguide/main'
      })
    },
    showModal() {
      this.modalShow = true
    },
    hideModal() {
      this.modalShow = false
    }
  },
  watch: {},
  components: {
    AppMenuBar
  }
}
</script>
