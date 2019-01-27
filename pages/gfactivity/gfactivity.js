// pages/gfactivity/gfactivity.js
const app = getApp()
const URL = app.globalData.httpUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  onLoad: function() {
    let openid = wx.getStorageSync("key_openid")
    wx.getUserInfo({
      success: (res) => {
        console.log(res)
        let userInfo = res.userInfo
        wx.request({
          url: URL + '/gfactive',
          data: {
            nickName: userInfo.nickName,
            openid,
            avatarUrl: userInfo.avatarUrl
          },
          success: (res) => {
            console.log(res.data)
          }
        })
      }
    })
  },
  knowledge: () => {
    wx.navigateTo({
      url: './knowledge/knowledge',
    })
  },
  early: () => {
    wx.navigateTo({
      url: './early/early',
    })
  },
  politics: () => {
    wx.navigateTo({
      url: './politics/politics',
    })
  },
  story: () => {
    wx.navigateTo({
      url: './story/story',
    })
  },
  study: () => {
    wx.navigateTo({
      url: './study/study',
    })
  },
  sports: () => {
    wx.navigateTo({
      url: './sports/sports',
    })
  },
  associate: () => {
    wx.navigateTo({
      url: './associate/associate',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title:'寻找志同道合的你·明理苑大学生网络文化工作室出品',
      path: '/pages/index/index'
    }
  }
})