// pages/gfactivity/early/early.js
let app = getApp()
let URL = app.globalData.httpUrl
let date = new Date
let time = date.getTime()
Page({
  data: {
    sport: 1024
  },

  onLoad: function() {
    let that = this
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.getWeRunData({
            success(rundata) {
              console.log(rundata)
              wx.request({
                url: URL + '/gfcode',
                data: {
                  js_code: res.code,
                  appid: 'wx1ecedeb284de75ae',
                  secret: '5ca9425bfc77fbc7b7f108c21cf29438',
                  encryptedData: rundata.encryptedData,
                  iv: rundata.iv,
                  errMsg: rundata.errMsg
                },
                success: function(res) {
                  let stepArr = res.data.run.stepInfoList
                  let todayStep = stepArr[30]
                  if (!todayStep) {
                    wx.showModal({
                      title: '提示',
                      content: '获取步数失败，请截屏反馈错误谢谢~',
                      showCancel: false
                    })
                    return false
                  }
                  that.setData({
                    sport: todayStep.step
                  })
                  wx.setStorage({
                    key: 'step',
                    data: todayStep.step,
                  })
                }
              })
            }
          })
        }
      }
    })

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

  },
  bindFormSubmit: function(res) {
    let submit = res.detail.value
    // console.log(submit)
    let step = wx.getStorageSync('step')
    if (step < 10000) {
      wx.showModal({
        title: '提示',
        content: `你今天运动${step}步，至少1万步才能打卡`,
      })
      return false
    }
    if (submit.textarea) {
      let openid = wx.getStorageSync('key_openid')
      wx.request({
        url: URL + '/sport',
        data: {
          time: time,
          textarea: submit.textarea,
          step: step,
          openid: openid
        },
        success: function(res) {
          console.log(res.data)
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
              content: '~成功获得积分~',
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

})