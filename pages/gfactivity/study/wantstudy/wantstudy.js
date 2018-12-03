// pages/gfactivity/study/wantstudy/wantstudy.js
let app = getApp()
let URL = app.globalData.httpUrl
let date = new Date
let time = date.getTime()
let daytime = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate()
let tempFilePaths
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

  },
  choose: function() {
    let that = this
    wx.chooseImage({
      count: 1,
      success: function(res) {
        tempFilePaths = res.tempFilePaths
        that.setData({
          itemImg: tempFilePaths[0],
          plus: false
        })
      },
    })
  },
  delImg: function() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否删除此图片',
      success: (res) => {
        if (res.confirm) {
          that.setData({
            itemImg: '',
            plus: true
          })
        }
      }
    })
  },
  bindFormSubmit: function(res) {
    let submit = res.detail.value
    console.log(submit)
    if (!tempFilePaths) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '~添加一张和学习有关图片先~',
      })
      return false
    }
    if (submit.textarea) {
      let openid = wx.getStorageSync('key_openid')
      wx.uploadFile({
        url: URL + '/study',
        filePath: tempFilePaths[0],
        name: 'study',
        formData: {
          time: time,
          textarea: submit.textarea,
          openid: openid,
          daytime: daytime
        },
        success: function(res) {
          let resdata = JSON.parse(res.data)
          console.log(resdata)
          if (resdata.ans) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '~今日已经打卡,可换其他活动~',
            })
          } else {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '~成功获得积分~',
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
        }
      })

    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '~说点什么吧~',
      })
    }
  },
  onShareAppMessage: function() {

  }
})