let user_info
let app = getApp()
let imgurl = app.globalData.httpUrl
Page({
  data: {
    _num: 1,
    array: [],
    gfimg: [
      'https://www.wangminwei.top/gfactive.jpg',
      '../../images/introduce.jpg'
    ],
    gfactiveImg: 'https://www.wangminwei.top/gfactive.jpg',
    imgurl
  },
  onLoad: function() {
    /*获取用户信息的函数转移
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
                  // console.log(res)
                  let openid = res.data.openid
                  if (openid) {
                    wx.setStorage({
                      key: 'errmsg',
                      data: false,
                    })
                    wx.request({
                      url: imgurl + '/adduser',
                      data: {
                        openid: openid,
                        info: user_info
                      },
                      success: function(res) {
                        // console.log('adduserres', res)
                        // console.log("index", res.data)
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
                  } else {
                    wx.setStorage({
                      key: 'errmsg',
                      data: true,
                    })
                    wx.showModal({
                      title: '错误',
                      content: `${res.data.errcode}/${res.data.errmsg}`
                    })
                    return false
                  }
                }
              })
            }
          }
        })
      }
    })
    */
    this.setData({
      _num: 1
    })
    this.activity({
      x: 1,
      y: 2
    })
  },
  activity: function({
    x,
    y,
    isend
  }) {
    let that = this
    wx.request({
      url: app.globalData.httpUrl + '/activity',
      data: {
        x: x,
        y: y
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          actArray: res.data
        })
      }
    })
  },

  change_band: function(e) {
    //console.log(e)
    this.setData({
      _num: e.target.dataset.num,
      array: []
    })
    if (e.target.dataset.num == 1) {
      // 1  2
      this.activity({
        x: 1,
        y: 2
      })
    }
    if (e.target.dataset.num == 2) {
      // 1   3
      this.activity({
        x: 1,
        y: 3
      })
    }

    if (e.target.dataset.num == 3) {
      // 2 3
      this.activity({
        x: 2,
        y: 3
      })
    }
  },
  create_act: function() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../create/create',
          })
        } else {
          wx.navigateTo({
            url: '../index/index',
          })
        }
      }
    })

  },
  teaminfo: function(e) {
    // console.log(e)
    // console.log(e.currentTarget.id)
    wx.navigateTo({
      url: `../teaminfo/teaminfo?id=${e.currentTarget.id}&type=${e.currentTarget.dataset.acttype}`
    })
  },
  onShareAppMessage: function() {
    return {
      title: '寻找志同道合的你·明理苑大学生网络文化工作室出品',
      path: '/pages/index/index'
    }
  },
  gfactivity: () => {
    wx.navigateTo({
      url: '../gfactivity/gfactivity',
    })
  }

})