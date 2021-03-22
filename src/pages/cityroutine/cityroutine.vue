<style lang="less">
@import url('../../assets/styles/variable.less');

.page-container { height: 100%; margin: 0; padding: 0; background: #eee; overflow-x: hidden; overflow-y: scroll; -webkit-overflow-scrolling: touch; position: relative;
  #citymap { position: absolute; top: 0; left: 0; z-index: 10;
    .collapse-btn { display: block; width: 120rpx; height: 60rpx; line-height: 60rpx; position: absolute; left: 50%; transform: translateX(-50%); text-align: center; background: @wx-blue-L; color: #fff; opacity: 0.9; }
    .route-cover-view { width: 100%; margin: 0; position: absolute; left: 0; bottom: 0; background: rgba(255, 255, 255, .9); overflow: visible;
      .section { height: 100%; position: absolute; top: 0; }
      .left-section { width: 20%; left: 0; border-right: solid 1px #ddd;
        .tab { height: 100rpx; text-align: center; color: @wx-blue-L; }
        .tab.active { background: @wx-blue-L; color: #eee; }
        .tab-text { line-height: 100rpx; }
      }
      .right-section { width: 80%; right: 0; padding: 30rpx 20rpx; padding-right: 0; overflow: scroll;
        .content { width: 100%; height: auto; padding: 0;
          .time-wrap { margin-bottom: 15rpx;
            .set-out-time { display: inline; font-weight: bold; color: @wx-blue-L; }
          }
          .extra-info { color: @wx-red; margin-bottom: 15rpx; }
          .desc { width: 95%; white-space: normal; word-wrap: break-word; word-break: break-all; margin-bottom: 15rpx; }
          .option-btn { display: block; width: 180rpx; height: 70rxp; line-height: 70rpx; text-align: center; font-size: 28rpx; margin: 30rpx; margin-left: 0; background: @wx-blue-L; color: #fff; border-radius: 0; float: right; }
          .home-btn { background: @wx-yellow; }
        }
      }
    }
  }
}
</style>

<template>
  <div class="page-container page-city-routine">
    <map
      id="citymap"
      name="citymap"
      :latitude="currentRoute.latitude"
      :longitude="currentRoute.longitude"
      :polyline="currentRoute.polyline"
      :markers="currentRoute.markers"
      scale="12"
      :subkey="qqMapKey"
      show-location
      show-compass
      enable-rotate
      style="width: 100%; height: 100%;"
    >
      <cover-view class="collapse-btn" @tap="toggleCollapse" :style="collapseBtnStyle">{{collapseBtnText}}</cover-view>
      <cover-view class="route-cover-view" :style="{ height: mapCoverViewHeight }">
        <cover-view class="left-section section">
          <cover-view v-for="(route, index) in routes" :key="index" class="tab" :class="{'active': index == currentRouteIndex}" @tap="changeRoute(index)">
            <cover-view v-if="index == 0" style="font-weight: bold;" class="tab-text">推荐路线</cover-view>
            <cover-view v-if="index != 0" class="tab-text">路线 {{ index + 1 }}</cover-view>
          </cover-view>
        </cover-view>
        <cover-view class="right-section section">
          <cover-view v-for="(route, contentIndex) in routes" :key="contentIndex" class="content" v-show="contentIndex == currentRouteIndex">
            <cover-view class="time-wrap">
              查询时间 <cover-view class="set-out-time">{{ route.setOutTime }}</cover-view>
            </cover-view>
            <cover-view class="extra-info">{{ route.distance }} {{ route.duration }}</cover-view>
            <cover-view class="desc" v-for="(desc, descIndex) in route.desc" :key="descIndex">{{ desc }}</cover-view>
            <button class="option-btn home-btn" size="mini" @click="goBackHome">切换城市</button>
            <button class="option-btn" open-type="share" size="mini">分享路线</button>
            <cover-view style="height: 30rpx;"></cover-view>
          </cover-view>
        </cover-view>
      </cover-view>
    </map>
  </div>
</template>

<script>
import { formatTime } from '@/utils'
import config from '@/config'
import QQMapWX from '../../assets/lib/qqmap-wx-jssdk.js'
const QQMapSDK = new QQMapWX({
  key: config.qqMapKey || ''
})

export default {
  name: 'CityRoutine',
  props: [],
  mixins: [],
  data() {
    return {
      startIcon: '/static/start.png',
      endIcon: '/static/end.png',
      allCities: config.allCities || [],
      cityId: '',
      cityName: '',
      qqMapKey: config.qqMapKey,
      polyline: [],
      routes: [],
      currentRouteIndex: 0,
      collapse: false,
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
    },
    currentRoute() {
      if (this.routes && this.routes[this.currentRouteIndex]) {
        return this.routes[this.currentRouteIndex]
      } else {
        return {}
      }
    },
    mapCoverViewHeight() {
      if (this.collapse) {
        return '0rpx'
      } else {
        let len = this.routes.length
        return len >= 5 ? len * 100 + 'rpx' : '520rpx'
      }
    },
    collapseBtnText() {
      return this.collapse ? '展开' : '收起'
    },
    collapseBtnStyle() {
      return `bottom: ${this.mapCoverViewHeight};`
    }
  },
  // 获取url中的query对象，包含城市id及name
  onLoad(query) {
    console.log('cityroutine query', query);
    this.cityId = query.id || ''
    this.cityName = query.name || ''

    this.fromQuery = query.from || ','
    this.fromName = query.fromName || ''
    this.fromLocation = {
      latitude: +query.from.split(',')[0] || -1,
      longitude: +query.from.split(',')[1] || -1
    }

    this.toQuery = query.to || ','
    this.toName = query.toName || ''
    this.toLocation = {
      latitude: +query.to.split(',')[0] || -1,
      longitude: +query.to.split(',')[1] || -1
    }
    this.mapStatus = 'INIT'
    this.queryMapRoutine()
  },
  onShareAppMessage (options) {
    var that = this
    return {
      title: `${this.fromName} —> ${this.toName}`,
      path: `pages/cityroutine/main?from=${this.fromQuery}&to=${this.toQuery}&fromName=${this.fromName}&toName=${this.toName}`
    }
  },
  mounted() {},
  methods: {
    goBackHome() {
      wx.redirectTo({
        url: "/pages/citylist/main"
      })
    },
    toggleCollapse() {
      this.collapse = !this.collapse
    },
    changeRoute(routeIndex) {
      this.currentRouteIndex = routeIndex || 0
    },
    // 解析路线，包括距离，时间，描述，路线，起止点等
    parseRoute(route) {
      let result = {}
      result.setOutTime = formatTime(new Date())
      result.distance = route.distance < 1000 ?
                        `${route.distance}米` :
                        `${(route.distance / 1000).toFixed(2)}公里`
      result.duration = route.duration < 60 ?
                        `${route.duration}分钟` :
                        `${parseInt(route.duration / 60)}小时${route.duration % 60}分钟`
      result.desc = []
      route.steps.forEach(step => {
        // if (step.mode == 'WALKING' && step.distance > 0) {
        //   result.desc.push(`向${step.direction}步行${step.distance}米`)
        // }
        if (step.mode == 'TRANSIT' && step.lines[0]) {
          let line = step.lines[0]
          if (line.vehicle == 'BUS') line.title = `公交车-${line.title}`
          if (line.vehicle == 'RAIL') line.title = `铁路`
          result.desc.push(`${line.title}: ${line.geton.title} —> ${line.getoff.title}，途经 ${line.station_count} 站。`)
        }
      })
      result.polyline = []
      result.points = []
      //获取各个步骤的polyline
      for(let i = 0; i < route.steps.length; i++) {
        let step = route.steps[i]
        let polyline = this.getStepPolyline(step)
        if (polyline) {
          result.points = result.points.concat(polyline.points)
          result.polyline.push(polyline)
        }
      }
      this.getStepPolyline.colorIndex = 0
      let midPointIndex = Math.floor(result.points.length / 2)
      result.latitude = result.points[midPointIndex].latitude
      result.longitude = result.points[midPointIndex].longitude

      //标记起止点
      let startPoint = result.points[0]
      let endPoint = result.points[result.points.length - 1]
      result.markers = [
        {
          iconPath: this.startIcon,
          id: 0,
          latitude: startPoint.latitude,
          longitude: startPoint.longitude,
          width: 28,
          height: 28,
          zIndex: -1,
          anchor: {x: 0.5, y: 1}
        },
        {
          iconPath: this.endIcon,
          id: 1,
          latitude: endPoint.latitude,
          longitude: endPoint.longitude,
          width: 28,
          height: 28,
          zIndex: -1,
          anchor: {x: 0.5, y: 1}
        }
      ]
      return result
    },
    getStepPolyline(step) {
      let coors = [];
      let colorArr = ['#1aad19', '#10aeff', '#d84e43']
      let _dottedLine = true
      if (step.mode == 'WALKING' && step.polyline) {
        coors.push(step.polyline);
        _dottedLine = false
      } else if (step.mode == 'TRANSIT' && step.lines[0].polyline) {
        coors.push(step.lines[0].polyline);
      } else {
        return null
      }
      //坐标解压（返回的点串坐标，通过前向差分进行压缩）
      let kr = 1000000;
      for (let i = 0 ; i < coors.length; i++){
        for (let j = 2; j < coors[i].length; j++) {
          coors[i][j] = Number(coors[i][j - 2]) + Number(coors[i][j]) / kr;
        }
      }
      //定义新数组，将coors中的数组合并为一个数组
      let coorsArr = [];
      let _points = [];
      for (let i = 0 ; i < coors.length; i ++){
        coorsArr = coorsArr.concat(coors[i]);
      }

      //将解压后的坐标放入点串数组_points中
      for (let i = 0; i < coorsArr.length; i += 2) {
        _points.push({ latitude: coorsArr[i], longitude: coorsArr[i + 1] })
      }
      if (!this.getStepPolyline.colorIndex) {
        this.getStepPolyline.colorIndex = 0
      }
      let colorIndex = this.getStepPolyline.colorIndex % colorArr.length
      this.getStepPolyline.colorIndex++
      let polyline = {
        width: 7,
        points: _points,
        color: colorArr[colorIndex],
        dottedLine: _dottedLine,
        arrowLine: true, // 带箭头的线, 开发者工具暂不支持该属性
        borderColor: '#fff',
        borderWidth: 1
      }
      return polyline
    },
    // 查询地图路线
    queryMapRoutine() {
      this.mapStatus = 'LOADING'
      wx.showLoading({
        title: '正在规划路线',
        mask: true
      })
      let _from = this.fromLocation, _to = this.toLocation
      if (this.fromLocation.latitude == -1) {
        _from = undefined
      }
      QQMapSDK.direction({
        mode: 'transit', // 'transit'(公交路线规划)
        // from参数不填默认当前地址
        from: _from,
        to: _to,
        success: (res) => {
          console.log('路线规划结果', res);
          let routes = res.result.routes;
          this.routes = routes.map(r => {
            return this.parseRoute(r)
          })
          this.routes = this.routes.splice(0, 5)
          this.currentRouteIndex = 0
          this.mapStatus = 'SUCCESS'
          wx.hideLoading()
          console.log('parsed routes', this.routes)
        },
        fail: (error) => {
          wx.showToast({
            title: '网络不稳定，请稍后再试',
            icon: 'none'
          })
          console.error(error);
        }
      })
    }
  },
  watch: {},
  components: {}
}
</script>
