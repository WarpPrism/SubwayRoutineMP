// SM.MS 图床地址
const SMMS = 'https://i.loli.net/'
const IMG_BED_BASE = SMMS
let cities = [
  {
    id: 3001,
    name_zh: '东京',
    name_en: 'Tokyo',
    subway_img: IMG_BED_BASE + '2019/02/13/5c63dafb9fc7c.jpg',
    subway_logo: require('../assets/images/logo/tokyo.png'),
    city_picture: '',
    keywords: '日本,Japan,东京都',
    isForeignCity: true
  },
  {
    id: 3002,
    name_zh: '伦敦',
    name_en: 'London',
    subway_img: IMG_BED_BASE + '2019/02/13/5c63dc04ab500.gif',
    subway_logo: require('../assets/images/logo/london.png'),
    city_picture: '',
    keywords: '英国, England, London',
    isForeignCity: true
  },
  {
    id: 3003,
    name_zh: '巴黎',
    name_en: 'Paris',
    subway_img: IMG_BED_BASE + '2019/02/13/5c643e17c00d3.gif',
    subway_logo: require('../assets/images/logo/paris.png'),
    city_picture: '',
    keywords: '法国, France',
    isForeignCity: true
  },
  {
    id: 3004,
    name_zh: '纽约',
    name_en: 'NewYork',
    subway_img: IMG_BED_BASE + '2019/02/13/5c63ddb5bb5ab.gif',
    subway_logo: require('../assets/images/logo/newyork.png'),
    city_picture: '',
    keywords: '美国, America, USA',
    isForeignCity: true
  },
  {
    id: 3005,
    name_zh: '首尔',
    name_en: 'Seoul',
    subway_img: IMG_BED_BASE + '2019/02/13/5c63e082cc891.jpg',
    subway_logo: require('../assets/images/logo/seoul.png'),
    city_picture: '',
    keywords: '韩国, Korea, South Korea',
    isForeignCity: true
  },
  {
    id: 3006,
    name_zh: '新加坡',
    name_en: 'Singapore',
    subway_img: IMG_BED_BASE + '2019/02/13/5c63efc606a41.jpg',
    subway_logo: require('../assets/images/logo/singapore.png'),
    city_picture: '',
    keywords: '新加坡',
    isForeignCity: true
  },
  {
    id: 3007,
    name_zh: '曼谷',
    name_en: 'Bangkok',
    subway_img: IMG_BED_BASE + '2019/02/13/5c643c57925fc.jpeg',
    subway_logo: require('../assets/images/logo/bangkok.png'),
    city_picture: '',
    keywords: '泰国,Thailand',
    isForeignCity: true
  },
  {
    id: 3008,
    name_zh: '吉隆坡',
    name_en: 'Kuala Lumpur',
    subway_img: IMG_BED_BASE + '2019/02/15/5c66641f768d0.png',
    subway_logo: require('../assets/images/logo/kuala-lumpur.png'),
    city_picture: '',
    keywords: '马来西亚',
    isForeignCity: true
  },
  {
    id: 3009,
    name_zh: '莫斯科',
    name_en: 'Moscow',
    subway_img: IMG_BED_BASE + '2019/02/15/5c663112c6812.jpg',
    subway_logo: require('../assets/images/logo/moscow.png'),
    city_picture: '',
    keywords: '俄罗斯, Russia',
    isForeignCity: true
  },
  {
    id: 3010,
    name_zh: '迪拜',
    name_en: 'Dubai',
    subway_img: IMG_BED_BASE + '2019/02/15/5c6634d26f7c3.jpg',
    subway_logo: require('../assets/images/logo/dubai.png'),
    city_picture: '',
    keywords: '阿拉伯联合酋长国,阿联酋, dubai',
    isForeignCity: true
  },
  {
    id: 3011,
    name_zh: '伊斯坦布尔',
    name_en: 'Istanbul',
    subway_img: IMG_BED_BASE + '2019/02/15/5c6659e52a015.png',
    subway_logo: require('../assets/images/logo/istanbul.png'),
    city_picture: '',
    keywords: '土耳其, Turkey',
    isForeignCity: true
  },
  {
    id: 3012,
    name_zh: '大阪',
    name_en: 'Osaka',
    subway_img: IMG_BED_BASE + '2019/02/15/5c665ed1573d1.gif',
    subway_logo: require('../assets/images/logo/osaka.png'),
    city_picture: '',
    keywords: '日本,Japan, osaka',
    isForeignCity: true
  },
  /********************分割线*********************/
  /********************分割线*********************/
  {
    id: 1,
    name_zh: '北京',
    name_en: 'Beijing',
    subway_img: IMG_BED_BASE + '2019/02/01/5c54066098040.jpg',
    subway_logo: require('../assets/images/logo/beijing.png'),
    city_picture: '',
    keywords: '河北,内蒙古,山西,北京,BeiJing,capital,China,PRC'
  },
  {
    id: 2,
    name_zh: '上海',
    name_en: 'Shanghai',
    subway_img: IMG_BED_BASE + '2019/02/01/5c54065c323cf.jpg',
    subway_logo: require('../assets/images/logo/shanghai.png'),
    city_picture: '',
    keywords: '江苏,浙江'
  },
  {
    id: 3,
    name_zh: '广州',
    name_en: 'Canton',
    subway_img: IMG_BED_BASE + '2019/02/01/5c54065f25892.jpg',
    subway_logo: require('../assets/images/logo/canton.png'),
    city_picture: '',
    keywords: '广东,广西,湖南,Canton'
  },
  {
    id: 4,
    name_zh: '深圳',
    name_en: 'Shenzhen',
    subway_img: IMG_BED_BASE + '2019/02/01/5c54065ebf07a.jpg',
    subway_logo: require('../assets/images/logo/shenzhen.png'),
    city_picture: '',
    keywords: '广东,福建,香港,澳门,HongKong,Macau'
  },
  {
    id: 5,
    name_zh: '香港',
    name_en: 'HongKong',
    subway_img: IMG_BED_BASE + '2019/02/01/5c541675955a0.jpg',
    subway_logo: require('../assets/images/logo/hongkong.png'),
    city_picture: '',
    keywords: '广东,HongKong,香港,澳门,hk'
  },
  {
    id: 6,
    name_zh: '南京',
    name_en: 'Nanjing',
    subway_img: IMG_BED_BASE + '2019/02/01/5c5419a56753c.jpg',
    subway_logo: require('../assets/images/logo/nanjing.png'),
    city_picture: '',
    keywords: '江苏,浙江,安徽'
  },
  {
    id: 7,
    name_zh: '重庆',
    name_en: 'Chongqing',
    subway_img: IMG_BED_BASE + '2019/02/01/5c541676c044b.jpg',
    subway_logo: require('../assets/images/logo/chongqing.png'),
    city_picture: '',
    keywords: '四川,湖北,贵州'
  },
  {
    id: 8,
    name_zh: '武汉',
    name_en: 'Wuhan',
    subway_img: IMG_BED_BASE + '2019/02/01/5c54167783864.jpg',
    subway_logo: require('../assets/images/logo/wuhan.png'),
    city_picture: '',
    keywords: '湖北,河南,江西'
  },
  {
    id: 9,
    name_zh: '成都',
    name_en: 'Chengdu',
    subway_img: IMG_BED_BASE + '2019/02/06/5c5a964110a3e.jpg',
    subway_logo: require('../assets/images/logo/chengdu.png'),
    city_picture: '',
    keywords: '四川,云南'
  },
  {
    id: 10,
    name_zh: '天津',
    name_en: 'Tianjin',
    subway_img: IMG_BED_BASE + '2019/02/06/5c5a963f6ecea.jpg',
    subway_logo: require('../assets/images/logo/tianjin.png'),
    city_picture: '',
    keywords: '北京,河北,辽宁'
  },
  {
    id: 11,
    name_zh: '青岛',
    name_en: 'Qingdao',
    subway_img: IMG_BED_BASE + '2019/02/06/5c5a963f2b46f.png',
    subway_logo: require('../assets/images/logo/qingdao.png'),
    city_picture: '',
    keywords: '山东'
  },
  {
    id: 12,
    name_zh: '大连',
    name_en: 'Dalian',
    subway_img: IMG_BED_BASE + '2019/02/06/5c5a964112ef2.png',
    subway_logo: require('../assets/images/logo/dalian.png'),
    city_picture: '',
    keywords: '辽宁,吉林,黑龙江'
  },
  {
    id: 13,
    name_zh: '台北',
    name_en: 'Taipei',
    subway_img: IMG_BED_BASE + '2019/02/06/5c5a963f83cf9.jpg',
    subway_logo: require('../assets/images/logo/taipei.png'),
    city_picture: '',
    keywords: '台湾,臺灣'
  },
  {
    id: 14,
    name_zh: '苏州',
    name_en: 'Suzhou',
    subway_img: IMG_BED_BASE + '2019/02/06/5c5a98d9d3046.png',
    subway_logo: require('../assets/images/logo/suzhou.png'),
    city_picture: '',
    keywords: '江苏,浙江'
  },
  {
    id: 15,
    name_zh: '西安',
    name_en: 'Xi An',
    subway_img: IMG_BED_BASE + '2019/03/04/5c7ce54aab6ec.jpg',
    subway_logo: require('../assets/images/logo/xian.png'),
    city_picture: '',
  },
  {
    id: 16,
    name_zh: '杭州',
    name_en: 'Hangzhou',
    subway_img: IMG_BED_BASE + '2019/02/13/5c639a400017d.jpg',
    subway_logo: require('../assets/images/logo/hangzhou.png'),
    city_picture: '',
    keywords: '浙江,江苏'
  },
  {
    id: 17,
    name_zh: '长春',
    name_en: 'Changchun',
    subway_img: IMG_BED_BASE + '2019/03/04/5c7ce55e7ff5b.jpg',
    subway_logo: require('../assets/images/logo/changchun.png'),
    city_picture: '',
  },
  {
    id: 18,
    name_zh: '郑州',
    name_en: 'Zhengzhou',
    subway_img: IMG_BED_BASE + '2019/02/13/5c63988067c1c.jpg',
    subway_logo: require('../assets/images/logo/zhengzhou.png'),
    city_picture: '',
    keywords: '河南,河北'
  },
  {
    id: 19,
    name_zh: '合肥',
    name_en: 'Hefei',
    subway_img: IMG_BED_BASE + '2019/03/04/5c7cca600d92b.jpg',
    subway_logo: require('../assets/images/logo/hefei.png'),
    city_picture: '',
    keywords: '安徽,河南,江苏'
  },
  {
    id: 20,
    name_zh: '南昌',
    name_en: 'Nanchang',
    subway_img: IMG_BED_BASE + '2019/03/04/5c7cd007522ce.jpg',
    subway_logo: require('../assets/images/logo/nanchang.png'),
    city_picture: '',
    keywords: '江西,安徽,江苏,福建'
  },
  {
    id: 21,
    name_zh: '长沙',
    name_en: 'Changsha',
    subway_img: IMG_BED_BASE + '哈哈哈哈SMMS没有图',
    subway_logo: require('../assets/images/logo/changsha.png'),
    city_picture: '',
    keywords: '湖南,湖北,江西'
  },
  {
    id: 22,
    name_zh: '昆明',
    name_en: 'Kunming',
    subway_img: IMG_BED_BASE + '哈哈哈哈SMMS没有图',
    subway_logo: require('../assets/images/logo/kunming.png'),
    city_picture: '',
    keywords: '云南,四川'
  },
  {
    id: 23,
    name_zh: '厦门',
    name_en: 'Xiamen',
    subway_img: IMG_BED_BASE + '哈哈哈哈SMMS没有图',
    subway_logo: require('../assets/images/logo/xiamen.png'),
    city_picture: '',
    keywords: '福建,福州'
  },
  {
    id: 24,
    name_zh: '高雄',
    name_en: 'Kaohsiung',
    subway_img: IMG_BED_BASE + '哈哈哈哈SMMS没有图',
    subway_logo: require('../assets/images/logo/kaohsiung.png'),
    city_picture: '',
    keywords: '台湾,臺灣'
  },
  // {
  //   id: 25,
  //   name_zh: '澳门',
  //   name_en: 'Macau',
  //   subway_img: IMG_BED_BASE + '哈哈哈哈SMMS没有图',
  //   subway_logo: require('../assets/images/logo/xiamen.png'),
  //   city_picture: '',
  //   keywords: '广东,香港,澳门'
  // },
  {
    id: 26,
    name_zh: '常州',
    name_en: 'changzhou',
    subway_img: IMG_BED_BASE + '哈哈哈哈SMMS没有图',
    subway_logo: require('../assets/images/logo/changzhou.gif'),
    city_picture: '',
    keywords: '江苏'
  },
  {
    id: 27,
    name_zh: '哈尔滨',
    name_en: 'harbin',
    subway_img: IMG_BED_BASE + '哈哈哈哈SMMS没有图',
    subway_logo: require('../assets/images/logo/harbin.gif'),
    city_picture: '',
    keywords: '黑龙江'
  },
  {
    id: 28,
    name_zh: '呼和浩特',
    name_en: 'hohhot',
    subway_img: IMG_BED_BASE + '哈哈哈哈SMMS没有图',
    subway_logo: require('../assets/images/logo/hohhot.gif'),
    city_picture: '',
    keywords: '蒙古,内蒙古'
  },
  {
    id: 29,
    name_zh: '济南',
    name_en: 'jinan',
    subway_img: IMG_BED_BASE + '哈哈哈哈SMMS没有图',
    subway_logo: require('../assets/images/logo/jinan.gif'),
    city_picture: '',
    keywords: '山东'
  },
  {
    id: 30,
    name_zh: '兰州',
    name_en: 'lanzhou',
    subway_img: IMG_BED_BASE + '哈哈哈哈SMMS没有图',
    subway_logo: require('../assets/images/logo/lanzhou.gif'),
    city_picture: '',
    keywords: '甘肃,青海'
  },
  {
    id: 31,
    name_zh: '宁波',
    name_en: 'ningbo',
    subway_img: IMG_BED_BASE + '哈哈哈哈SMMS没有图',
    subway_logo: require('../assets/images/logo/ningbo.gif'),
    city_picture: '',
    keywords: '浙江'
  }
]

export default cities
