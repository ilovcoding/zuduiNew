// pages/gfactivity/study/wantstudy/wantstudy.js
let app = getApp()
let URL = app.globalData.httpUrl
let date = new Date
let time = date.getTime()
let daytime = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate()
let tempFilePaths = [],
  charlength = 0
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
    let politics = wx.getStorageSync('politics')
    let politicsLength = politics.split("").length
    charlength = politicsLength
    this.setData({
      politics,
      char: charlength
    })
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
  checklength: function(input) {
    let oldText = wx.getStorageSync('politics')
    let oldTextArr = oldText.split("")
    let oldChar = oldTextArr.length
    let text = input.detail.value
    let textArr = text.split("")
    let char = textArr.length
    //  console.log(oldChar,char)
     let subtract = char - oldChar
    //  console.log(subtract)
    // if(subtract>10){
    //   wx.showModal({
    //     title: '提示',
    //     content: '请不要一次粘贴或者输入超过10个字',
    //     showCancel:false
    //   })
    //   return oldText
    // }
    this.setData({
      char: char
    })
    charlength = char
    wx.setStorage({
      key: 'politics',
      data: text,
    })
  },
  bindFormSubmit: function(res) {
    let submit = res.detail.value
    console.log(submit)
    if (submit.textarea) {
      if (charlength < 400) {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: `你输入了${charlength}个字,至少输入400字`,
        })
        return false
      }
      let openid = wx.getStorageSync('key_openid')
      if (tempFilePaths[0]) {
        wx.uploadFile({
          url: URL + '/politics',
          filePath: tempFilePaths[0],
          name: 'politics',
          formData: {
            time: time,
            textarea: submit.textarea,
            openid: openid,
            daytime: daytime,
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
              wx.setStorage({
                key: 'politics',
                data: '',
              })
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
        wx.request({
          url: URL + '/politics',
          data: {
            time: time,
            textarea: submit.textarea,
            openid: openid,
            daytime: daytime,
          },
          success: function(res) {
            let resdata = res.data
            if (resdata.ans) {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: '~您今日该类型已经打卡~',
              })
            } else {
              wx.setStorage({
                key: 'politics',
                data: '',
              })
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
      }
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
      title: '微信关注微言合工大',
      path: '/pages/index/index'
    }
  }
})