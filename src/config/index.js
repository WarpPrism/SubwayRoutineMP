import cities from './cities'

let config = {
  allCities: cities,
  qqMapKey: 'VEHBZ-S6A34-QTKUP-DK3HK-TLN5O-DNF5L',
  share: {
    defaultTitle: '请查收！全球主要城市旅游、地铁信息，方便您的出行！',
    defaultPic: require('../assets/images/share.jpeg')
  },
  link: {
    JsDelivr: 'https://cdn.jsdelivr.net/gh/WarpPrism/SubwayRoutineMP@latest/',
    MetroMan: 'http://www.metroman.cn/'
  },
  emoji: {
    thinkingFace: '🤔',
    pointUp: '☝🏻',
    checkMark: '✅'
  }
}

export default config
