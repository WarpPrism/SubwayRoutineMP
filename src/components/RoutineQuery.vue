<style lang="less">
@import url('../assets/styles/variable.less');
.components-routine-query { width: 100%; height: 80rpx; margin-bottom: 7rpx; display: flex; justify-content: center; align-items: center; line-height: 78rpx; text-align: center; position: relative; box-shadow: 1rpx 1rpx 20rpx 1rpx #ddd;
  .input { display: inline-block; width: 270rpx; height: 100%; margin: 0; border: solid 1rpx #ccc; background: #fff; color: @wx-red; }
  input.valid { color: @wx-green; }
  input.invalid { color: @wx-red; }
  .exchange-btn { display: inline-block; width: 70rpx; height: 100%; border-top: solid 1rpx #ccc; border-bottom: solid 1rpx #ccc; background: #fff;
    .icon { width: 43rpx; height: 35rpx; margin-top: 20rpx; }
    &:active { background: #cfefff; }
  }
  .query-btn { display: inline-block; width: auto; height: 100%; background: @wx-blue-L; flex: auto; color: #fff; 
    &:active { opacity: 1; background: @wx-blue; }
  }
  .suggestion-list { width: 270rpx; height: auto; position: absolute; background: #fff; z-index: 300; box-shadow: 2rpx 1rpx 10rpx 2rpx #ccc;
    .item { border-bottom: solid 1px #ccc; 
      &:active { background: #eee; }
    }
  }
  .from-list { top: 101%; left: 2rpx; }
  .to-list { top: 101%; left: 340rpx; }
}
</style>

<template>
  <div class="components-routine-query">
    <!--<div class="section-title">地铁路线规划</div>-->
    <input
      type="text"
      class="from-input input"
      :class="{'valid': fromLocation.latitude!='', 'invalid': !fromLocation.latitude }"
      placeholder="起始站"
      maxlength="35"
      v-model="fromValue"
      @input="autoTipLocation($event, 'from')"
      @blur="blurHandler"
    >
    <div class="suggestion-list from-list" v-show="autoTipType == 'from'">
      <div class="item" v-for="(sug, index) in suggestions" :key="index" @tap="changeFromLocation(sug)">
        {{ sug.title }}
      </div>
    </div>
    <div class="exchange-btn" @tap="exchangeFromTo">
      <img :src="exchangeBtn" alt="" class="icon">
    </div>
    <input
      type="text"
      class="from-input input"
      :class="{'valid': toLocation.latitude!='', 'invalid': !toLocation.latitude }"
      placeholder="终点站"
      maxlength="35"
      v-model="toValue"
      @input="autoTipLocation($event, 'to')"
      @blur="blurHandler"
    >
    <div class="suggestion-list to-list" v-show="autoTipType == 'to'">
      <div class="item" v-for="(sug, index) in suggestions" :key="index" @tap="changeToLocation(sug)">
        {{ sug.title }}
      </div>
    </div>
    <div class="query-btn" @tap="queryRoutine">查询</div>
  </div>
</template>

<script>
import config from '@/config'
import QQMapWX from '../assets/lib/qqmap-wx-jssdk.js'

const QQMapSDK = new QQMapWX({
  key: config.qqMapKey || ''
})

export default {
  name: 'RoutineQuery',
  props: ['cityInstance'],
  mixins: [],
  data() {
    return {
      exchangeBtn: require('../assets/images/icon_exchange.png'),
      emoji: config.emoji,
      suggestions: [],
      autoTipType: '',
      fromValue: '',
      toValue: '',
      fromLocation: {
        latitude: '',
        longitude: ''
      },
      toLocation: {
        latitude: '',
        longitude: ''
      }
    }
  },
  computed: {},
  onLoad() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.suggestions = []
      this.fromValue = '',
      this.toValue ='',
      this.fromLocation = {
        latitude: '',
        longitude: ''
      },
      this.toLocation = {
        latitude: '',
        longitude: ''
      }
    },
    changeFromLocation(item) {
      this.fromValue = item.title
      this.fromLocation.latitude = item.location.lat
      this.fromLocation.longitude = item.location.lng
      this.suggestions = []
    },
    changeToLocation(item) {
      this.toValue = item.title
      this.toLocation.latitude = item.location.lat
      this.toLocation.longitude = item.location.lng
      this.suggestions = []
    },
    exchangeFromTo() {
      let temp = this.fromValue
      this.fromValue = this.toValue
      this.toValue = temp
      temp = this.fromLocation
      this.fromLocation = this.toLocation
      this.toLocation = temp
    },
    // 根据用户输入自动提示位置
    autoTipLocation(e, type) {
      let value = e.mp.detail.value
      if (!value || value == '') {
        if (type == 'from') this.fromLocation = { latitude: '', longitude: '' }
        if (type == 'to') this.toLocation = { latitude: '', longitude: '' }
        this.suggestions = []
        return
      }
      if (this.autoTipType != type) {
        this.suggestions = []
      }
      if (this.autoTipLocation.timer) {
        clearTimeout(this.autoTipLocation.timer)
        this.autoTipLocation.time = null
      }
      this.autoTipLocation.timer = setTimeout(() => {
        QQMapSDK.getSuggestion({
          keyword: value,
          region: this.cityInstance.name_zh || '', // 查找区域
          region_fix: 1, // 固定在当前城市查找
          filter: 'category=地铁站',
          page_size: 8,
          success: (res) => {
            if (res && res.data) {
              this.suggestions = res.data
              this.autoTipType = type
              this.suggestions.forEach(sug => {
                sug.title = sug.title.replace('[地铁站]', '')
              })
            }
          },
          fail: (res) => {
            console.error(res);
          }
        })
      }, 300)
    },
    queryRoutine() {
      // 校验地址合法性
      let valid = true
      if (!this.fromLocation.latitude || !this.fromLocation.longitude) {
        valid = false
        wx.showToast({title: '请选择正确的起始站', icon: 'none', mask: true})
        return
      }
      if (!this.toLocation.latitude || !this.toLocation.longitude) {
        valid = false
        wx.showToast({title: '请选择正确的终点站', icon: 'none', mask: true})
        return
      }
      // if (!valid) return
      let from = `${this.fromLocation.latitude}, ${this.fromLocation.longitude}`
      let to = `${this.toLocation.latitude}, ${this.toLocation.longitude}`
      let fromName = this.fromValue
      let toName = this.toValue
      this.init()
      wx.navigateTo({
        url: `/pages/cityroutine/main?from=${from}&to=${to}&fromName=${fromName}&toName=${toName}`
      })
    },
    // 地址坐标解析
    getCoordinate(place_str) {
      return new Promise((resolve, reject) => {
        if (!place_str) reject()
        let _address = this.cityInstance.name_zh + place_str
        let _region = this.cityInstance.name_zh + '市'
        QQMapSDK.geocoder({
          address: _address,
          region: _region,
          success: (res) => {
            if (res && res.result && res.result.location) {
              let location = res.result.location
              resolve({
                title: place_str,
                location: {
                  lat: location.lat,
                  lng: location.lng
                }
              })
            } else {
              reject()
            }
          },
          fail: () => {
            reject()
          }
        })
      })
    },
    blurHandler() {
      setTimeout(() => {
        // this.suggestions = []
      }, 100)
    },
    goToCityMap() {
      wx.navigateTo({
        url: `/pages/citymap/main?id=${this.cityInstance.id}&name=${this.cityInstance.name_zh}`
      })
    }
  },
  watch: {},
  components: {}
}
</script>
