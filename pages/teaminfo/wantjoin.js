// pages/teaminfo/wantjoin.js
let app = getApp()
var httpUrl = app.globalData.httpUrl
let act_id
let key_openid
let key_userid
let update
let canDo
let canDo1
Page({

  data: {

  },
  onLoad: function(e) {
    console.log(e)
    act_id = e.actid
    if (e.type == 'update') {
      this.setData({
        submit: '更新'
      })
      update = true
    } else {
      this.setData({
        submit: '确认'
      })
      update = false
    }
  },
  goback: () => {
    wx.navigateBack({
      delta: 1
    })
  },
  formSubmit: function(e) {
    console.log(e)
    let info = e.detail.value
    if (info.qq && info.name && info.tel) {

    } else {
      this.showMessage('信息不完整')
    }
    try {
      key_openid = wx.getStorageSync("key_openid")
      key_userid = wx.getStorageSync("key_userid")
    } catch (e) {}

    if (info.name && info.tel && canDo && canDo1) {
      wx.request({
        url: httpUrl + '/teaminfo',
        data: {
          update: update,
          openid: key_openid,
          actid: act_id,
          name: info.name,
          tel: info.tel,
          qq: info.qq
        },
        success: (res) => {
          console.log(res.data)
          if (res.data.msg == 1) {

            wx.request({
              url: httpUrl + '/isjoin',
              data: {
                openid: key_openid,
                actid: act_id,
                userid: key_userid
              },
              success: (res) => {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }
        }
      })
    }
  },
  checkPhone(event) {
    let myreg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))+\d{8}$/;
    if (!myreg.test(event.detail.value)) {
      this.showMessage('请输入正确的手机号')
      canDo = false
    } else {
      canDo = true
    }
  },
  checkQQ(event) {
    if (isNaN(event.detail.value)) {
      this.showMessage('请输入正确的QQ号')
      canDo1 = false
    } else {
      canDo1 = true
    }
  },
  showMessage(message) {
    wx.showModal({
      title: '提示',
      content: message,
      success: function(res) {}
    })
  },
  onShareAppMessage: function() {
    return {
      title: '微信关注微言合工大',
      path: '/pages/index/index'
    }
  }
})