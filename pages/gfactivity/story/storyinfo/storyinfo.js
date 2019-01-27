let app = getApp()
let URL = app.globalData.httpUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plus: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.imgUrl) {

    } else {
      this.setData({
        study: options.study,
        storyType: options.type,
        title: options.title
      })
      return 0
    }
    let imgUrl = `${URL}/story/${options.openid}/${options.imgUrl}`
    console.log(options)
    this.setData({
      study: options.study,
      imgUrl: imgUrl,
      storyType: options.type,
      title: options.title
    })
  },
  onShareAppMessage: function() {
    return {
      title: '微信关注微言合工大',
      path: '/pages/index/index'
    }
  }
})