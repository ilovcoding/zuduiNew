export function GetInfo(){
 return  wx.getUserInfo({
    success: function (res) {
      let user_info = res.userInfo
      console.log("user_info", user_info)
      wx.login({
        success: function (res) {
          if (res.code) {
            wx.request({
              url: imgurl + '/code',
              data: {
                js_code: res.code,
                appid: 'wxb899920a6f4714de',
                secret: '7821a28e8563acee05ce78a2cf0eff7d',
                grant_type: 'authorization_code',
                userinfo: user_info
              },
              success: function (res) {
                wx.request({
                  url: imgurl + '/adduser',
                  data: {
                    id: res.data,
                    name: user_info
                  },
                  success: function (res) {
                    console.log("index", res.data)
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
}
