// pages/gfactivity/study/study.js
let app = getApp()
let URL = app.globalData.httpUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: ['https://www.wangminwei.top/gfactive/story/1.jpg',
      'https://www.wangminwei.top/gfactive/story/2.jpg',
      'https://www.wangminwei.top/gfactive/story/3.jpg',
      'https://www.wangminwei.top/gfactive/story/4.jpg'
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
      url: URL + '/storydt',
      data: {},
      success: function(res) {
        console.log(res.data)
        let info = res.data
        info.forEach((value, index, input) => {
          if (value.type == 1) {
            value.type = "时事热点"
          }
          if (value.type == 2) {
            value.type = "我与明理苑"
          }
          if (value.type == 3) {
            value.type = "工大趣事"
          }
        })
        that.setData({
          dtarr: info
        })
      }
    })
    // let openid = wx.getStorageSync('key_openid')
    // wx.request({
    //   url: URL + '/storydt',
    //   data: {
    //     phb: true,
    //     openid: openid
    //   },
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       num: res.data.userNum,
    //       we_img: res.data.phbInfo
    //     })
    //   }
    // })

  },
  // change: function (e) {
  //   this.setData({
  //     phbstyle: e.target.dataset.color
  //   })
  //   if (e.target.dataset.color == 0) {
  //     this.setData({
  //       dt: true,
  //       phb: false
  //     })
  //   }
  //   if (e.target.dataset.color == 1) {
  //     let that = this
  //     let openid = wx.getStorageSync('key_openid')
  //     wx.request({
  //       url: URL + '/studydt',
  //       data: {
  //         phb: true,
  //         openid: openid
  //       },
  //       success: function (res) {
  //         console.log(res.data)
  //         that.setData({
  //           card_day: res.data.overDay,
  //           order: res.data.order,
  //           num: res.data.userNum,
  //           phb_arr: res.data.phbInfo
  //         })
  //       }
  //     })
  //     this.setData({
  //       dt: false,
  //       phb: true
  //     })
  //   }
  // },
  onShareAppMessage: function() {

  },
  wantstory: function() {
    wx.navigateTo({
      url: './wantstory/wantstory',
    })
  },
  storyInfo: function(e) {
    let info = e.currentTarget.dataset.info
    wx.navigateTo({
      url: `./storyinfo/storyinfo?openid=${info.openid}&study=${info.story}&imgUrl=${info.imgUrl}&type=${info.type}&title=${info.title}`,
    })
  }
})