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
    wx.navigateTo({
      url: 'cardinfo?actid=' + e.currentTarget.id + '&iscard=' + e.currentTarget.dataset.iscard,
    })
  }
})