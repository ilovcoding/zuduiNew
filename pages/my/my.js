// pages/my/my.js
let httpUrl=getApp().globalData.httpUrl
Page({
  data: {
    userImg: '../../images/auto.png',
    studentid: '0000000000',
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        that.setData({
          userImg: res.userInfo.avatarUrl
        })
      }
    })
  },
  wdfb: function() {
    console.log("wdfb")
    wx.navigateTo({
      url: 'wdfb',
    })
  },
  wdcy: function() {
    console.log("wdcy")
    wx.navigateTo({
      url: 'wdcy',
    })
  },
  mycount: function() {
    wx.navigateTo({
      url: './mycount/mycount',
    })
  },
  gywm: function() {
    wx.navigateTo({
      url: 'mly',
    })
  },
  bindid: function() {
    let that = this
    this.setData({
      showModal: !that.data.showModal
    })
  },
  judgeid:function(info) {
    let [stdid,pwd]=[info.value.stdid,info.value.pwd]
    wx.request({
      url: httpUrl+'/judgeid',
      data:{
        stdid,
        pwd
      },
      success:(res)=>{
        console.log(res.data)
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