// pages/my/my.js
let httpUrl = getApp().globalData.httpUrl
Page({
  data: {
    userImg: '../../images/auto.png',
    studentName: '姓名',
    studentid: '学号',
    showModal: false
  },
  
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
  onShow:function(){
    let studentinfo = wx.getStorageSync('studentinfo')
    this.setData({
      studentName: studentinfo.studentName,
      studentid: studentinfo.studentid
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
  judgeid: function(info) {
    let that = this
    console.log(info)
    let stdid = info.detail.value.stdid
    let pwd = info.detail.value.pwd
    wx.showLoading({
      title: '验证学号中.....',
      mask: true
    })
    let setNumber = setTimeout(function() {
      wx.hideLoading()
      requestSchool.abort() //请求超时中断
      wx.showModal({
        title: '提示',
        content: '请求超时重新验证或截屏反馈',
        showCancel: false
      })
    }, 30000)
    console.log((new Date).getTime())
    let requestSchool = wx.request({
      url: 'http://212.64.27.123:8002' + '/judgeid',
      data: {
        stdid: stdid,
        pwd: pwd
      },
      success: (res) => {
        console.log((new Date).getTime())
        console.log(res.data)
        clearTimeout(setNumber) //Timeout定时器的编号
        if (res.data.name) {
          wx.hideLoading()
          wx.setStorage({
            key: 'studentinfo',
            data: {
              studentid: stdid,
              password: pwd,
              studentName: res.data.name,
              tel1: res.data.tel1,
              tel2: res.data.tel2
            }
          })
          that.setData({
            studentName: res.data.name,
            studentid: stdid,
            showModal: false
          })
        } else {
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: '账号或密码错误验证失败',
            showCancel: false
          })
        }
      }
    })
  },
  onShareAppMessage: function() {
    return {
      title: '寻找志同道合的你·明理苑大学生网络文化工作室出品',
      path: '/pages/index/index'
    }
  },
  config: function() {
    wx.navigateTo({
      url: './myconfig/myconfig',
    })
  },
  create: function() {
    let studentinfo = wx.getStorageSync('studentinfo')
    if (studentinfo) {
      //绑定好学号的时候
      wx.navigateTo({
        url: '../create/create',
      })
    } else {
      //没绑定学号引导用户绑定学号
      wx.showModal({
        title: '提示',
        content: '使用前需要绑定学号',
        showCancel: false,
        success: () => {
          wx.navigateTo({
            url: './myconfig/myconfig',
          })
        }
      })
    }
  }
})