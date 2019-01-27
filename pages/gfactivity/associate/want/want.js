// pages/gfactivity/study/wantstudy/wantstudy.js
let app = getApp()
let URL = app.globalData.httpUrl
let date = new Date
let time = date.getTime()
let daytime = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate()
let tempFilePaths = []
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
    tempFilePaths = []
  },
  choose: function() {
    let that = this
    wx.chooseImage({
      count: 9,
      success: function(res) {
        res.tempFilePaths.forEach((value, index, input) => {
          if (tempFilePaths.length < 9) {
            tempFilePaths.push(value)
          }
        })
        console.log(tempFilePaths)
        that.setData({
          itemImg: tempFilePaths
        })
        if (tempFilePaths.length >= 9) {
          that.setData({
            plus: false
          })
        }
      },
    })
  },
  delImg: function(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否删除此图片',
      success: (res) => {
        if (res.confirm) {
          let index = e.currentTarget.dataset.index
          tempFilePaths.splice(index, 1)
          console.log(tempFilePaths)
          that.setData({
            itemImg: tempFilePaths,
            plus: true
          })
        }
      }
    })
  },
  bindFormSubmit: function(res) {
    let submit = res.detail.value
    console.log(submit)
    if (tempFilePaths.length < 4) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '~至少4张图片~',
      })
      return false
    }
    if (submit.textarea) {
      let openid = wx.getStorageSync('key_openid')
      let length = tempFilePaths.length
      wx.request({
        url: URL + '/associate',
        data: {
          time: time,
          textarea: submit.textarea,
          openid: openid,
          daytime: daytime,
          length: length
        },
        success: function(res) {
          let resdata = res.data
          console.log(resdata)
          if (resdata.ans) {
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '~今日已经打卡,可换其他活动打卡~',
            })
          } else {
            for (let i = 0; i< tempFilePaths.length; i++) {
              wx.uploadFile({
                url: URL + '/associate',
                filePath: tempFilePaths[i],
                name: 'associate',
                formData: {
                  time: time,
                  index: i,
                  openid: openid
                },
                success: function() {

                }
              })
            }
            wx.showModal({
              title: '提示',
              showCancel: false,
              content: '~成功获得积分~',
              success:function(res){
                if(res.confirm){
                  wx.navigateBack({
                    delta:1
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
    return {
      title: '寻找志同道合的你·明理苑大学生网络文化工作室出品',
      path: '/pages/index/index'
    }
  }
})