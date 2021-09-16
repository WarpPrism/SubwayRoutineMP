<style lang="less">
@import url('../assets/styles/variable.less');
.component-app-menu-bar { width: 100%; height: auto; margin: 0 auto; padding: 20rpx 50rpx; display: flex; flex-direction: row; justify-content: space-between; align-items: center; background: @wx-yellow; border-bottom: solid 5rpx @wx-yellow-D;
  .logo-container { width: 120rpx; height: 100rpx;
    .logo { width: 100%; height: 100%; }
  }
  .menu-container { margin: 0 0 0 30rpx; display: flex; flex-direction: row; justify-content: flex-start; align-items: center; 
    .menu-item { width: 100rpx; height: 60rpx; line-height: 60rpx; margin: 0 10rpx; text-align: center; font-size: 32rpx; color: #fff; background: @wx-yellow-D; overflow: visible; border-radius: 10rpx; }
    .menu-item.active {  color: @wx-yellow-D; background: #f7f7f7;  }
    .menu-item.hover {  color: @wx-yellow-D; background: #f7f7f7;  }
  }
}
</style>

<template>
  <div class="component-app-menu-bar">
    <div class="logo-container">
      <img :src="travelIcon" alt="" class="logo">
    </div>
    <div class="menu-container">
      <div class="menu-item" :class="{'active': activeIndex == 0}" hover-class="hover" @tap="goToHome">首页</div>
      <div class="menu-item" :class="{'active': activeIndex == 1}" hover-class="hover" @tap="goToMoreFeature">更多</div>
      <div class="menu-item" :class="{'active': activeIndex == 2}" hover-class="hover" @tap="goToAbout">关于</div>
      <button class="menu-item" :class="{'active': activeIndex == 3}" hover-class="hover" open-type="share" type="primary">分享</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppMenuBar',
  props: {
    activeIndex: {
      type: Number,
      default: -1
    }
  },
  mixins: [],
  data() {
    return {
      travelIcon: require('../assets/images/icon_travel.png')
    }
  },
  computed: {
    // activeIndex() {
    //   let pages = getCurrentPages()
    // }
  },
  created() {

  },
  mounted() {},
  methods: {
    goToHome() {
      if (this.activeIndex == 0) return
      wx.redirectTo({
        url: '/pages/citylist/main'
      })
    },
    goToMoreFeature() {
      if (this.activeIndex == 1) return
      wx.redirectTo({
        url: '/pages/morefeature/main'
      })
    },
    goToAbout() {
      if (this.activeIndex == 2) return
      wx.redirectTo({
        url: '/pages/userguide/main'
      })
    }
  },
  watch: {},
  components: {}
}
</script>
