// pages/message/search.js
let app = getApp()
let URL = app.globalData.httpUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      search: false
    })
    let that = this
    wx.request({
      url: URL + '/search',
      data: {

      },
      success: function(res) {
        that.setData({
          actArray: res.data
        })
      }
    })
  },
  onShareAppMessage: function() {

  },
  saveSearch: function(data) {
    wx.setStorage({
      key: 'search',
      data: data.detail.value,
    })
  },
  search: function() {
    let name = wx.getStorageSync('search')
    let that = this
    if (name) {
      this.setData({
        search: true
      })
      wx.request({
        url: URL + '/search',
        data: {
          name: name
        },
        success: function(res) {
          that.setData({
            actArray: res.data
          })
        }
      })
    } else {
      return 0
    }
  },
  active: function(data) {
    console.log(data)
    let actid = data.currentTarget.dataset.actid
    wx.navigateTo({
      url: `../teaminfo/teaminfo?id=${actid}`,
    })
  }
})