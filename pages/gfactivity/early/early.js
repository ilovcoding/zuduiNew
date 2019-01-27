// pages/gfactivity/early/early.js
let app = getApp()
let URL = app.globalData.httpUrl
let flag = false
let date = new Date()
// console.log(date)
let hour = parseInt(date.getHours())
let minute = parseInt(date.getMinutes())
let year = date.getFullYear()
let month = date.getMonth() + 1
let day = date.getDate()
let time = '' + year + month + day
if (hour == 6 && minute <= 30) {
  flag = true
} else {}
console.log(hour, minute, flag)

Page({


  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getanswer()
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
      title: '寻找志同道合的你·明理苑大学生网络文化工作室出品',
      path: '/pages/index/index'
    }
  },
  bindFormSubmit: function(res) {
    console.log(hour, minute, flag)
    if (!flag) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '~请在每天6:00~6:30之间打卡哦~',
      })
      return false
    }
    let submit = res.detail.value
    // console.log(submit)
    if (submit.textarea) {
      let openid = wx.getStorageSync('key_openid')
      wx.request({
        url: URL + '/early',
        data: {
          time: time,
          textarea: submit.textarea,
          openid: openid
        },
        success: function(res) {
          // console.log(res.data)
          if (res.data.ans) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '~今日已经打卡,可换其他活动~',
            })
          } else {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '~成功获得10积分~',
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
        content: '~说点什么吧~',
      })
    }
  }
  // getanswer: function() {
  //   let that = this
  //   wx.request({
  //     url: URL + '/getearly',
  //     data: {
  //       time: time,
  //     },
  //     success: function(res) {
  //       that.setData({
  //         answerArr: res.data
  //       })
  //     }
  //   })
  // }

})