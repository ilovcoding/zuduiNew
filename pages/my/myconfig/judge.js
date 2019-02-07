let imgurl = getApp().globalData.httpUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentid: false,
    phone: false,
    qq: false,
    stdid: '',
    pwd: ''
  },
  onLoad: function(data) {
    // console.log(data)
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
    if (data.type == 'qq') {
      this.setData({
        qq: true
      })
    }
  },
  onShareAppMessage: function() {

  },
  save: function(info) {
    //存储学号密码 judge中获取
    console.log(info)
    if (info.currentTarget.dataset.name == 'stdid') {
      this.setData({
        stdid: info.detail.value
      })
    }
    if (info.currentTarget.dataset.name == 'pwd') {
      this.setData({
        pwd: info.detail.value
      })
    }
  },
  judgeid: function(info) {
    let that = this
    if (info.detail.userInfo) {
      wx.login({
        success: function(res) {
          wx.request({
            url: imgurl + '/code',
            data: {
              js_code: res.code,
              appid: 'wx1ecedeb284de75ae',
              secret: '5ca9425bfc77fbc7b7f108c21cf29438',
              encryptedData: info.detail.encryptedData,
              iv: info.detail.iv,
              userInfo: info.detail.userInfo
            },
            success: function(res) {
              wx.setStorage({
                key: "key_openid",
                data: res.data.openId
              })
              //成功拿到数据之后
              wx.request({
                url: imgurl + '/adduser',
                data: {
                  nickName: res.data.nickName,
                  avatarUrl: res.data.avatarUrl,
                  province: res.data.province,
                  country: res.data.country,
                  openId: res.data.openId,
                  studentid: 0,
                  pwd: 0
                },
                success: function(res) {
                  wx.setStorage({
                    key: 'key_userid',
                    data: res.data.userid,
                  })
                  wx.setStorage({
                    key: 'key_userimg',
                    data: res.data.image,
                  })
                }
              })
            }
          })
        }
      })
    } else {
      //用户点击拒绝
      wx.showModal({
        title: '提示',
        content: '小老弟，点击允许才能正常使用',
        showCancel: false
      })
      return 0
    }
    let stdid = info.currentTarget.dataset.stdid
    let pwd = info.currentTarget.dataset.pwd
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
        content: `您输的号码${phone}可能不对,反馈QQ群956125459`,
        showCancel: false
      })
      return 0
    }
    //一路没错的电话号码执行下面代码
    wx.setStorage({
      key: 'phone',
      data: phone,
    })
    wx.navigateBack({
      delta: 1
    })
  },
  judgeqq: function(info) {
    let that = this
    let qq = info.detail.value.qq
    if (!qq) {
      wx.showModal({
        title: '提示',
        content: `请输入QQ号`,
        showCancel: false
      })
      return 0
    }
    wx.setStorage({
      key: 'qq',
      data: qq,
    })
    wx.navigateBack({
      delta: 1
    })
  }
})