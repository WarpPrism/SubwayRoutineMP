<script>
export default {
  onLaunch(props) {
    // console.log('app launch: ', props)
    let favoriateCity = wx.getStorageSync('favoriate_city')
    if (favoriateCity && favoriateCity.id) {
      wx.reLaunch({
        url: `/pages/citydetail/main?id=${favoriateCity.id}&name=${favoriateCity.name_zh}`
      })
    }
  }
}
</script>

<style>
@import url('./assets/styles/common.less');
</style>
