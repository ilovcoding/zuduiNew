// pages/card/getcard.js
let app = getApp()
var httpUrl = getApp().globalData.httpUrl;
var tempFilePath
var patharr = []
var actid
var key_openid
var key_userid
let date = new Date()
let day = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate()
Page({
  data: {
    content: "今日打卡，滴~~",
    imgpath: [],
    pluspic: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(data) {
    console.log(data)
    actid = data.actid
  },
  choose: function() {
    var that = this;
    wx.chooseImage({
      count: 3,
      sizeType: ['comprssed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        tempFilePath = res.tempFilePaths
        for (let i = 0; i < tempFilePath.length; i++) {
          patharr.push(tempFilePath[i])
          if (patharr.length >= 3) {
            that.setData({
              pluspic: false
            })
            break;
          }
        }
        that.setData({
          imgpath: patharr
        })

      }
    })
  },
  bindFormSubmit: function(e) {
    let iscard
    let value_text = e.detail.value.textarea
    if (e.detail.value.textarea) {

    } else {
      wx.showModal({
        title: '提示',
        content: "打卡内容不能为空",
        success: function(res) {}
      })
      return 0
    }
    key_openid = wx.getStorageSync("key_openid")
    key_userid = wx.getStorageSync("key_userid")
    wx.request({
      url: httpUrl + '/getcard',
      data: {
        actid: actid,
        openid: key_openid,
        userid: key_userid,
        text: value_text
      },
      success: (res) => {
        iscard = res.data.iscard
        console.log('iscard', res)
        if (iscard === 1) {
          wx.showModal({
            title: '提示',
            content: '您今日已打卡',
            showCancel: false
          })
          return 0
        }
        if (patharr[0]) {
          for (let i = 0; i < patharr.length; i++) {
            wx.uploadFile({
              url: httpUrl + '/cardimage',
              filePath: patharr[i],
              name: 'card_image',
              formData: {
                index: i,
                actid: actid,
                openid: key_openid,
                time: day,
                imglength: patharr.length
              },
              success: function(res) {}
            })
          }
          //if结束
        }
        patharr = []
        wx.switchTab({
          url: 'card'
        })
      }
    })
  },

  onShareAppMessage: function() {
    return {
      title: '寻找志同道合的你·明理苑大学生网络文化工作室出品',
      path: '/pages/index/index'
    }
  }
})