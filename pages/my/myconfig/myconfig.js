// pages/my/myconfig/myconfig.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  onShow: function() {
    let studentinfo = wx.getStorageSync('studentinfo')
    let myphone = wx.getStorageSync('phone')
    let phone = myphone || studentinfo.tel2 || studentinfo.tel1
    let openid = wx.getStorageSync('key_openid')
    let QQ = wx.getStorageSync('qq')
    this.setData({
      studentid: studentinfo.studentid,
      phone,
      name: studentinfo.studentName,
      openid,
      QQ
    })
  },
  onShareAppMessage: function() {

  },
  judge: function(type) {
    // console.log(type)
    wx.navigateTo({
      url: `judge?type=${type.currentTarget.dataset.formtype}`,
    })
  }
})