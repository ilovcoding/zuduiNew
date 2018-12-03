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
  onLoad: function (options) {
    let imgUrl=`${URL}/study/${options.openid}/${options.imgUrl}`
      console.log(options)
      this.setData({
        study:options.study,
        imgUrl:imgUrl
      })
  },
  onShareAppMessage: function () {

  }
})