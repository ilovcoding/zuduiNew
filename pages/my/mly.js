// pages/card/getcard.js
let app = getApp()
var httpUrl = getApp().globalData.httpUrl;
let tempFilePath = []
Page({
  data: {
    imgpath: [],
    pluspic: true
  },

  onLoad: function() {},
  choose: function() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        tempFilePath = res.tempFilePaths
        that.setData({
          imgpath:tempFilePath,
          pluspic: false
        })
      }
    })
  },
  bindFormSubmit: function(e) {
    let that = this
    let value_text = e.detail.value.textarea
    let time = (new Date).toLocaleString()
    console.log(time)
    if (tempFilePath[0]) {
      console.log(tempFilePath[0])
    } else {
      wx.showModal({
        title: '提示',
        content: '选择一张图片',
        showCancel:false
      })
      return false
    }
    wx.uploadFile({
      url: httpUrl + '/fankui',
      filePath: tempFilePath[0],
      name: 'fankui',
      formData: {
        value: value_text,
        time: time
      },
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '~感谢反馈~',
          showCancel: false
        })
      }
    })
    tempFilePath = []
    that.setData({
      imgpath:[],
      pluspic: true
    })
  },

  onShareAppMessage: function() {
    return {
      title: '微信关注微言合工大',
      path: '/pages/index/index'
    }
  }
})