// 掘金 wiki api 简单说明
// https://juejin.im/post/5a311f0151882531e944cf41
/* eslint-disable */
const fs = require('fs')
const path = require('path')
const axios = require('axios')

const WikipediaMobile = 'https://zh.m.wikipedia.org/w/api.php'
const WikipediaPC = 'https://zh.wikipedia.org/w/api.php'

const WikipediaContentUrl = `${WikipediaPC}?action=query&format=json&formatversion=2&prop=revisions&rvprop=content&titles=`

const wikiNameMap = {
  '东京': '東京',
  '纽约': '紐約',
  '首尔': '首爾',
  '台北': '臺北'
}
let cities = ['东京', '伦敦', '巴黎', '纽约', '首尔', '新加坡', '曼谷', '吉隆坡', '莫斯科', '迪拜', '伊斯坦布尔', '大阪',
  '北京', '上海', '广州', '深圳', '香港', '南京', '重庆', '武汉', '成都', '天津', '青岛', '大连', '台北', '苏州',
  '杭州', '郑州', '西安', '长春', '合肥', '南昌'
]

cities = ['广州市']
const total = cities.length
let done = 0

cities.forEach(cityName => {
  cityName = wikiNameMap[cityName] || cityName
  let reqUrl = WikipediaContentUrl + encodeURIComponent(cityName)
  let writeDir = path.resolve(__dirname, `../wiki_new/${cityName}.html`)
  // if (fsExistsSync(writeDir)) {
  //   done++
  //   console.log(`${cityName} 成功，进度 ${done}/${total}`)
  //   return
  // }
  console.log(`${cityName} 开始请求wiki旅游数据...`)
  console.log(`${cityName} ${reqUrl}`)
  axios.get(reqUrl, {
    timeout: 0,
    // proxy: {
    //   host: '127.0.0.1',
    //   port: 1081
    // },
    header: {
      'Accept-Encoding': 'gzip'
    }
  }).then(res => {
    console.log(res);
    // if (res && res.status === 200 && res.data) {
    //   let data = res.data
    //   let htmlContent = data.parse.text['*']
    //   // htmlContent = fixWikiHtml(htmlContent)
    //   fs.writeFileSync(writeDir, htmlContent)
    //   done++
    //   console.log(`${cityName} 成功，进度 ${done}/${total}`)
    // }
  }).catch(e => {
    console.log(`${cityName} 请求失败`, e)
  })
})

function fixWikiHtml (html) {
  html = html.replace(/[\r\n]/gi, '')

  html = html.replace(/<h1/gi, '<h1 style="margin: 25px 0;"')
  html = html.replace(/<h2/gi, '<h2 style="margin: 20px 0;"')
  html = html.replace(/<h3/gi, '<h3 style="margin: 20px 0;"')
  html = html.replace(/<p/gi, '<p style="margin: 15px 0;"')
  html = html.replace(/<ul/gi, '<ul style="padding-left: 20px;"')
  html = html.replace(/<ol/gi, '<ol style="padding-left: 20px;"')
  html = html.replace(/<li/gi, '<li style="margin: 8px 0;"')
  html = html.replace(/<bdi/gi, '<div')
  html = html.replace(/\/bdi>/gi, '/div>')
  // 表格样式修复
  html = html.replace(/margin:1em; padding:0\.5em;/gi, 'margin:15px 0; padding:0.2em;')
  html = html.replace(/border-radius:3px; float:right; background:#f3f3ff; white-space:nowrap;/gi,
    'border-radius:3px; float:none; background:#f3f3ff; white-space:nowrap; overflow: scroll; width: 100% !important;')
  // 气候表格
  html = html.replace(/>日间最高</gi, '>最高<')
  html = html.replace(/>夜间最低</gi, '>最低<')
  html = html.replace(/>日照（小时／天）/gi, '>日照')
  // 去掉编辑
  html = html.replace(/<span class="mw-editsection">/gi, '<span class="mw-editsection" style="display: none;">')
  // 去掉标题
  html = html.replace(/<div class="name">/gi, '<div class="name" style="display: none;">')
  // 去掉标题icon
  html = html.replace(/<div class="iconbox">/gi, '<div class="iconbox" style="display: none;">')
  html = html.replace(/bgcolor="/gi, 'style="background: ')
  html = html.replace(/<div class="thumbinner".*?>/gi, '<div class="thumbinner" style="width: 100%; margin: 15px auto;">')
  html = html.replace(/<img/gi, '<img style="display:block; max-width: 100%; height: auto; margin: 0 auto;"')
  html = html.replace(/<div class="thumbcaption"/gi, '<div class="thumbcaption" style="text-align:center;"')
  return html
}

// 检测文件或者文件夹存在
function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK)
  } catch (e) {
    return false
  }
  return true
}
