// pages/gfactivity/study/study.js
let app = getApp()
let URL = app.globalData.httpUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['https://www.wangminwei.top/gfactive/associate/1.jpg',
      'https://www.wangminwei.top/gfactive/associate/2.jpg',
      'https://www.wangminwei.top/gfactive/associate/3.jpg',
      'https://www.wangminwei.top/gfactive/associate/4.jpg'
    ],
    we_img: [],
    num: 1,
    sty1: "btn2",
    sty2: "btn1",
    phbstyle: 0,
    dt: true,
    phb: false,
    phb_user_name: "",
    phb_day: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.request({
      url: URL + '/associatedt',
      data: {},
      success: function(res) {
        console.log(res.data)
        that.setData({
          dtarr: res.data
        })
      }
    })
    let openid = wx.getStorageSync('key_openid')
    wx.request({
      url: URL + '/associatedt',
      data: {
        phb: true,
        openid: openid
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          num: res.data.userNum,
          we_img: res.data.phbInfo
        })
      }
    })

  },
  change: function(e) {
    this.setData({
      phbstyle: e.target.dataset.color
    })
    if (e.target.dataset.color == 0) {
      this.setData({
        dt: true,
        phb: false
      })
    }
    if (e.target.dataset.color == 1) {
      let that = this
      let openid = wx.getStorageSync('key_openid')
      wx.request({
        url: URL + '/associatedt',
        data: {
          phb: true,
          openid: openid
        },
        success: function(res) {
          console.log(res.data)
          that.setData({
            card_day: res.data.overDay,
            order: res.data.order,
            num: res.data.userNum,
            phb_arr: res.data.phbInfo
          })
        }
      })
      this.setData({
        dt: false,
        phb: true
      })
    }
  },
  onShareAppMessage: function() {
    return {
      title: '寻找志同道合的你·明理苑大学生网络文化工作室出品',
      path: '/pages/index/index'
    }
  },
  wantstudy: function() {
    wx.navigateTo({
      url: './want/want',
    })
  },
  studyInfo: function(e) {
    let info = e.currentTarget.dataset.info
    wx.navigateTo({
      url: `./info/info?openid=${info.openid}&study=${info.study}&imgUrl=${info.imgUrl}&length=${info.imgLength}`,
    })
  }
})