// pages/gfactivity/knowledge/answer/answer.js
const app = getApp()
const URL = app.globalData.httpUrl
let date = new Date
let year = date.getFullYear()
let month = date.getMonth() + 1
let day = date.getDate()
let time = '' + year + month + day
Page({

  data: {

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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '微信关注微言合工大',
      path: '/pages/index/index'
    }
  },
  bindFormSubmit: (res) => {
    let submit = res.detail.value
    //console.log(submit)
    if (submit.textarea) {
      let openid = wx.getStorageSync('key_openid')
      wx.request({
        url: URL + '/answer',
        data: {
          time: time,
          answer: submit.textarea,
          openid: openid
        },
        success: function(res) {
          console.log(res.data)
          if (res.data.ans) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '~今日已经答题,可换其他活动打卡~',
            })
          } else {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '~提交成功获得10积分~',
              success: function(res) {
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
        content: '~不能提交空答案~',
      })
    }
  }
})