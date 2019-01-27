// pages/gfactivity/study/wantstudy/wantstudy.js
let app = getApp()
let URL = app.globalData.httpUrl
let date = new Date
let time = date.getTime()
let daytime = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate()
let tempFilePaths = [],
  storyType = 1,
  charlength = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plus: true,
    items: [{
        type: 1,
        value: '时事热点',
        checked: true
      },
      {
        type: 2,
        value: '我与明理苑'
      },
      {
        type: 3,
        value: '工大趣事'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let story = wx.getStorageSync('story')
    let storyLength = story.split("").length
    charlength = storyLength
    this.setData({
      story,
      char: charlength
    })
  },
  radioChange: function(e) {
    storyType = e.detail.value
    // console.log(storyType)
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
    let oldText = wx.getStorageSync('story')
    let oldTextArr = oldText.split("")
    let oldChar = oldTextArr.length
    let text = input.detail.value
    let textArr = text.split("")
    let char = textArr.length
    let subtract = char - oldChar
    // if (subtract > 10) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '请不要一次粘贴或者输入超过10个字',
    //     showCancel: false
    //   })
    //   return oldText
    // }    
    wx.setStorage({
      key: 'story',
      data: text,
    })
    this.setData({
      char: char
    })
    charlength = char
  },
  bindFormSubmit: function(res) {
    if (storyType) {
      console.log(storyType)
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '~选择一下类别先~',
      })
    }
    let submit = res.detail.value
    if (!submit.title) {
      wx.showModal({
        title: '提示',
        content: '记得填写文章标题',
        showCancel: false
      })
      return false
    }
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
          url: URL + '/story',
          filePath: tempFilePaths[0],
          name: 'story',
          formData: {
            time: time,
            textarea: submit.textarea,
            openid: openid,
            daytime: daytime,
            storyType: storyType,
            title: submit.title
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
                success: function(res) {
                  if (res.confirm) {
                    wx.setStorage({
                      key: 'story',
                      data: '',
                    })
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
          url: URL + '/story',
          data: {
            time: time,
            textarea: submit.textarea,
            openid: openid,
            daytime: daytime,
            storyType: storyType,
            title: submit.title
          },
          success: function(res) {
            let resdata = res.data
            if (resdata.ans) {
              wx.showModal({
                title: '提示',
                showCancel: false,
                content: '~今日该类型已经打卡可换其他类型~其他活动~',
              })
            } else {
              if (resdata.success) {

              } else {
                wx.showModal({
                  title: '错误',
                  content: '数据库错误请截屏反馈',
                  showCancel: false
                })
                return false
              }
              wx.setStorage({
                key: 'story',
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