// pages/message/showimage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
      this.setData({
        showImageUrl:options.url
      })
  },
  back(){
    wx.navigateBack({
      delta:1
    })
  },
  onShareAppMessage: function () {

  }
})