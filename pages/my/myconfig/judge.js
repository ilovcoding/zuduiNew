// pages/my/myconfig/judge.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentid: false,
    phone: false
  },
  onLoad: function(data) {
    if (data.type == 'studentid') {
      this.setData({
        studentid: true
      })
    }
    if (data.type == 'phone') {
      this.setData({
        phone: true
      })
    }
  },
  onShareAppMessage: function() {

  },
  judgeid: function(info) {
    let that = this
    let stdid = info.detail.value.stdid
    let pwd = info.detail.value.pwd
    if (stdid.length != 10) {
      wx.showModal({
        title: '提示',
        content: '小老弟学号长度不对！',
        showCancel: false
      })
      return 0
    }
    if (pwd.length == 0) {
      wx.showModal({
        title: '提示',
        content: '小老弟密码不能为空！',
        showCancel: false
      })
      return 0
    }
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
    let requestSchool = wx.request({
      url: 'http://212.64.27.123:8002' + '/judgeid',
      data: {
        stdid: stdid,
        pwd: pwd
      },
      success: (res) => {
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
          wx.navigateBack({
            delta: 1
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
  judgephone: function(info) {
    let that = this
    let phone = info.detail.value.phone
    if (phone.length != 11) {
      wx.showModal({
        title: '提示',
        content: '小老弟手机号长度不对啊',
        showCancel: false
      })
      return 0
    }
    let phonereg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))+\d{8}$/
    if (!phonereg.test(phone)) {
      wx.showModal({
        title: '提示',
        content: `检测到您输的号码${phone}可能不对是否保存`,
        success: function(res) {
          if (res.confirm) {
            wx.setStorage({
              key: 'phone',
              data: phone,
            })
            wx.navigateBack({
              delta: 1
            })
          } else {
            return 0
          }
        }
      })
    }
    //一路没错的电话号码执行下面代码
   wx.setStorage({
     key: 'phone',
     data: phone,
   })
    wx.navigateBack({
      delta: 1
    })
  }
})