// pages/my/wdfb.js
let key_openid
let app = getApp()
var httpUrl = app.globalData.httpUrl;
var imgurl = app.globalData.httpUrl;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  onShow: function() {
    let that = this
    try {
      key_openid = wx.getStorageSync("key_openid")
    } catch (e) {}
    wx.request({
      url: httpUrl + '/wdfb',
      data: {
        openid: key_openid
      },
      success: (res) => {
        for (let i = 0; i < res.data.arr.length; i++) {
          res.data.arr[i].userid = imgurl + '/img_' + res.data.arr[i].open_id + '_' + res.data.arr[i].id + '_0.png'
        }
        console.log(res.data.arr)
        that.setData({
          array: res.data.arr
        })
      }
    })
  },
  end: (e) => {
    console.log(e)
    let act_id = e.currentTarget.id
    wx.showModal({
      title: '提示',
      content: "是否结束此活动？",
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: imgurl + '/endfb',
            data: {
              actid: act_id
            },
            success: (res) => {
              console.log(res.data)
            }
          })
          wx.navigateTo({
            url: 'wdfb',
          })
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  userinfo: function(e) {
    console.log(e)
    wx.navigateTo({
      url: 'userinfo?actid=' + e.currentTarget.id
    })
  },
  onShareAppMessage: function() {
    return {
      title: '微信关注微言合工大',
      path: '/pages/index/index'
    }
  }
})