// pages/my/wdcy.js
let key_openid
let app = getApp()
var httpUrl = app.globalData.httpUrl
Page({
  data: {
    array: [],
    httpUrl
  },
  onLoad: function(options) {},
  onReady: function() {},

  onShow: function() {
    let that = this
    key_openid = wx.getStorageSync("key_openid")
    wx.request({
      url: httpUrl + '/wdcy',
      data: {
        openid: key_openid
      },
      success: (res) => {
        that.setData({
          array: res.data
        })
      }
    })
  },
  end: (e) => {
    let act_id = e.currentTarget.id
    key_openid = wx.getStorageSync("key_openid")
    wx.showModal({
      title: '提示',
      content: "退出活动后您关于此活动数据会被清除,是否退出此活动？",
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: httpUrl + '/endcy',
            data: {
              actid: act_id,
              openid: key_openid
            },
            success: (res) => {
              console.log(res.data)
            }
          })
          wx.navigateTo({
            url: 'wdcy',
          })
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },

  onShareAppMessage: function() {
    return {
      title: '微信关注微言合工大',
      path: '/pages/message/message'
    }
  }
})