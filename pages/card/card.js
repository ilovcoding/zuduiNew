let app = getApp()
let imgurl = app.globalData.httpUrl
let key_openid
Page({
  data: {
    _num: 1,
    array: [],
    imgurl:imgurl
  },
  onLoad: function() {

  },
  day: function(e) {
    wx.navigateTo({
      url: 'day?actid=' + e.currentTarget.id,
    })
  },

  onShow: function() {
    let that = this
    key_openid = wx.getStorageSync("key_openid")
    wx.request({
      url: imgurl + '/needcard',
      data: {
        openid: key_openid
      },
      success: function(res) {
        console.log(res)
        that.setData({
          array: res.data,
        })
      }
    })
  },
  getcard: function(e) {
    wx.navigateTo({
      url: 'getcard?actid=' + e.currentTarget.id,
    })
  },
  cardinfo: function(e) {
    console.log(e)
    wx.navigateTo({
      url: 'cardinfo?actid=' + e.currentTarget.id + '&iscard=' + e.currentTarget.dataset.iscard,
    })
  },
  onShareAppMessage: function() {
    return {
      title: '寻找志同道合的你·明理苑大学生网络文化工作室出品',
      path: '/pages/index/index'
    }
  },
  gfactive: function() {
    wx.navigateTo({
      url: '../gfactivity/gfactivity',
    })
  }
})