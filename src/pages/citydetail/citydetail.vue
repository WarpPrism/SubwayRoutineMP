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
  .img-container { width: 100%; height: auto; margin: 0 0 30rpx; overflow: hidden;
    .metro-img { width: 100%; height: 520rpx; border: solid 10rpx #fff; border-radius: 7rpx; }
  }

  // .img-move-area { width: 100%; height: 700rpx; margin: 30rpx auto; overflow: hidden; border: solid 8rpx #fff; border-radius: 5rpx; background: #f0f0f0; position: relative;
  //   // fix me 图片居中仍不精确
  //   .img-move-view { width: 100%; height: auto; position: absolute; left: -120%; top: -100%;
  //     .metro-img { display: block; width: 100%; }
  //   }
  // }

  .btn-group { width: 100%; margin: 0 0 20rpx;
    .btn { display: inline-block; width: 45%; margin: 0 2.5%; background: @wx-blue; font-size: 16px; line-height: 75rpx; }
  }
  .explore-btn { width: 95%; margin: 0 auto 20rpx; line-height: 75rpx;  background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%); background: @wx-red; color: #fff; text-align: center;  }
}
</style>

<template>
  <div class="page-container page-city-detail">
    <div class="page-title">
      <p class="zh">
        <span>{{ cityInstance.name_zh }}轨道交通</span>
        <img :src="heartSrc" class="heart" @tap="toggleLikeCity"/>
      </p>
      <p class="en">{{ cityInstance.name_en }} Metro Diagram</p>
      <button class="float-btn change-city-btn" @tap="goBackHome">切换城市</button>
      <button class="float-btn share-btn" @tap="goToCityMap" v-if="!cityInstance.isForeignCity">查看地图</button>
    </div>

    <RoutineQuery :cityInstance="cityInstance" v-if="!cityInstance.isForeignCity"></RoutineQuery>
    <div class="img-container" @tap="previewMetroNet">
      <img :src="HDImgSrc" class="metro-img" mode="widthFix" @load="handleHDImgLoad" v-show="HDImgLoaded">
      <img :src="metroImgSrc" class="metro-img" mode="widthFix" @error="handleMetroImgError" v-show="!HDImgLoaded">
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

    <button class="explore-btn" type="primary" @tap="exploreCity">探索{{ cityInstance.name_zh }}</button>


  </div>
</template>

<script>
import config from '@/config'
import RoutineQuery from '@/components/RoutineQuery'
import weiboPicMixin from '@/mixins/weiboPicMixin'

const heartIcon = require('../../assets/images/heart.png')
const heartActiveIcon = require('../../assets/images/heart-active.png')

const WEIBO_IMGBED = 'https://ws1.sinaimg.cn'

export default {
  name: '',
  props: [],
  mixins: [weiboPicMixin],
  data() {
    return {
      heartSrc: heartIcon,
      heartCount: 0, // 彩蛋
      allCities: config.allCities || [],
      cityId: '',
      cityName: '',
      metroImgSrc: '',
      HDImgSrc: '',
      HDImgLoaded: false,
      wbpic: {}
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
  async onLoad(query) {
    this.wbpic = await this.getWeiboPic()
    this.heartSrc = heartIcon
    this.cityId = query.id || ''
    this.cityName = query.name || ''
    this.HDImgLoaded = false
    this.metroImgSrc = this.HDImgSrc = ''

    if (this.wbpic[this.cityName]) {
      // 微博图床，速度快
      console.log('USE WEIBO');
      this.HDImgSrc = WEIBO_IMGBED + '/large/' + this.wbpic[this.cityName].metro_pic
      this.metroImgSrc = WEIBO_IMGBED + '/small/' + this.wbpic[this.cityName].metro_pic
    } else {
      console.log('USE SMMS')
      // 使用默认配置 SMMS IMG BED
      this.metroImgSrc = this.cityInstance.subway_img || ''
    }
  },
  onShareAppMessage (options) {
    var that = this
    return {
      title: `${this.cityName}高清地铁图`,
      path: `pages/citydetail/main?id=${this.cityId}&name=${this.cityName}`,
      imageUrl: this.HDImgSrc || config.shareImg
    }
  },
  mounted() {
    // wx.showLoading({
    //   title: '图片加载中'
    // })
  },
  methods: {
    handleHDImgLoad(ev) {
      console.log(`高清图片加载成功，width: ${ev.mp.detail.width}; height: ${ev.mp.detail.height}`, ev)
      this.HDImgLoaded = true
    },
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
    toggleLikeCity() {
      this.heartSrc = (this.heartSrc == heartIcon) ? heartActiveIcon : heartIcon
      // 彩蛋
      this.heartCount++
      if (this.heartCount >= 7) {
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
      console.log(this.HDImgSrc);
      let img = this.HDImgSrc || ''
      // console.log('previewMetroNet: ', img)
      if (img && img != '') {
        wx.previewImage({
          urls: [this.HDImgSrc || ''],
          fail: function() {
            wx.reportAnalytics('preview_img_fail', {
              city_name: this.cityInstance.name_zh || 'no_name',
              subway_img: this.HDImgSrc || ''
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
  components: {
    RoutineQuery
  }
}
</script>
