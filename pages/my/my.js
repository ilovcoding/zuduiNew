// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: '../../images/auto.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        console.log("my", res.userInfo.avatarUrl)
        that.setData({
          img: res.userInfo.avatarUrl
        })
      }
    })
  },

  wdfb: function() {
    console.log("wdfb")
    wx.navigateTo({
      url: 'wdfb',
    })
  },
  wdcy: function() {
    console.log("wdcy")
    wx.navigateTo({
      url: 'wdcy',
    })
  },
  mycount: function() {
    wx.navigateTo({
      url: './mycount/mycount',
    })
  },
  gywm: function() {
    wx.navigateTo({
      url: 'mly',
    })
  },
  onShareAppMessage: function() {

  }
})