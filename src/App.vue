<script>
export default {
  onLaunch(props) {
    console.log('app launch: ', props)
    let isEnterHome = props.path.includes('citylist')
    let favoriateCity = wx.getStorageSync('favoriate_city')
    if (isEnterHome && favoriateCity && favoriateCity.id) {
      wx.reLaunch({
        url: `/pages/citydetail/main?id=${favoriateCity.id}&name=${favoriateCity.name_zh}`,
        success: () => {
          setTimeout(() => {
            wx.showToast({
              title: '已切换到您的偏好城市',
              mask: false,
              icon: 'none'
            })
          }, 3e3)
        }
      })
    }
  }
}
</script>

<style>
@import url('./assets/styles/common.less');
</style>
