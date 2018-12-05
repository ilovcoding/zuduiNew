let app = getApp()
let imgurl = app.globalData.httpUrl
Page({
  data: {
    canIUse: !wx.canIUse('button.open-type.getUserInfo'),
    yes: true,
    button: ""
  },
  onLoad: function() {
    let errmsg= wx.getStorageSync('errmsg')
    if(errmsg){
      return false
    }
      wx.getSetting({
        success: function(res) {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                console.log(res)
                wx.switchTab({
                  url: '../message/message'
                })
              }
            })
          }
        }
      })
    
  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      console.log(e.detail.userInfo)
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: function(res) {
                let user_info = res.userInfo
                wx.login({
                  success: function(res) {
                    if (res.code) {
                      wx.request({
                        url: imgurl + '/code',
                        data: {
                          js_code: res.code,
                          appid: 'wx1ecedeb284de75ae',
                          secret: '5ca9425bfc77fbc7b7f108c21cf29438',
                          grant_type: 'authorization_code',
                          userinfo: user_info
                        },
                        success: function(res) {
                          if (res.data.errmsg) {
                            wx.setStorage({
                              key: 'errmsg',
                              data:true,
                            })
                            wx.showModal({
                              title: '错误',
                              content: `${res.data.errcode}/${res.data.errmsg}`,
                              success:()=>{
                                wx.navigateTo({
                                  url: '../index/index',
                                })
                              }
                            })
                            return false
                          }else{
                            wx.setStorage({
                              key: 'errmsg',
                              data: false,
                            })
                          }
                          wx.request({
                            url: imgurl + '/adduser',
                            data: {
                              openid: res.data.openid,
                              info: user_info
                            },
                            success: function(res) {
                              wx.setStorage({
                                key: "key_openid",
                                data: res.data.openid
                              })
                              wx.setStorage({
                                key: "key_userid",
                                data: res.data.userid
                              })
                              wx.setStorage({
                                key: "key_userimg",
                                data: res.data.image
                              })
                            }
                          })
                        }
                      })
                    }
                  }
                })
              }
            })
            //getUserINfo ehd
          }
        }
      })
      wx.switchTab({
        url: '../message/message'
      })
    }
  }
})