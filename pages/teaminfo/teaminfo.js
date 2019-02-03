let app = getApp()
let imgurl = app.globalData.httpUrl
let URL = app.globalData.httpUrl
let imgarr = []
let actid;
let actinfo;
let key_openid;
let key_userid;
Page({

  data: {
    item: [],
    imgUrls: imgarr,
    buttontext: "我要加入",
    userjoin: false
  },

  onLoad: function(data) {
    let that = this
    key_openid = wx.getStorageSync('key_openid')
    console.log(data)
    if (key_openid) {

    } else {
      wx.showModal({
        title: '提示',
        content: '未绑定学号无法查看活动详情',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '../my/myconfig/myconfig',
            })
          } else {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
      return 0
    }
    wx.request({
      url: URL + '/actinfo',
      data: {
        id: data.id,
        openid: key_openid
      },
      success: function(res) {
        console.log(res)
        let [active, joininfo] = [res.data.active, res.data.joininfo]
        if (joininfo) {
          //用户已加入
          if (active.type == 1) {
            //说明这是习惯养成类
            wx.redirectTo({
              url: `../card/cardinfo?actid=${active.id}`,
            })
            return 0
          }
          that.setData({
            userjoin: true,
            creater: joininfo.creater
          })
        }
        let actimgUrl = `${imgurl}/${active.open_id}/${active.id}/`
        let time1 = new Date(parseInt(active.time))
        let time2 = (time1.getMonth() + 1) + '月' + time1.getDate() + '日'
        that.setData({
          active: active,
          fbtime: time2,
          name: active.name,
          tel: active.tel,
          qq: active.qq,
          actimgUrl: actimgUrl,
          type: active.type,
          actid: active.id
        })
      }
    })
  },
  more: function() {
    wx.showModal({
      content: '感兴趣吗？点击按钮加入吧',
      success: function(res) {
        if (res.confirm) {

        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },

  join: function(data) {
    let that = this
    let [actid, type] = [data.currentTarget.dataset.actid, data.currentTarget.dataset.type]
    key_userid = wx.getStorageSync("key_userid")
    key_openid = wx.getStorageSync("key_openid")
    wx.showModal({
      title: '提示',
      content: '是否确认加入',
      success: function(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          wx.request({
            url: URL + '/userjoin',
            data: {
              openid: key_openid,
              actid: actid,
              userid: key_userid
            },
            success: (res) => {
              // console.log(res)
              that.setData({
                userjoin: res.data.userjoin
              })
            }
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  onShow: function() {
    let that = this
    key_openid = wx.getStorageSync("key_openid")
    wx.request({
      url: imgurl + '/cardinfo',
      data: {
        actid: actid,
        openid: key_openid
      },
      success: (res) => {
        // console.log(res.data)
        var info = res.data.cardinfo
        let infoLength = info.length
        if (res.data.cardinfo.length <= 3) {
          that.setData({
            dtarr: res.data.cardinfo,
          })
        } else {
          that.setData({
            dtarr: [res.data.cardinfo[infoLength - 1], res.data.cardinfo[infoLength - 2], res.data.cardinfo[infoLength - 3]],
          })
        }
      }
    })
  },
  showImage: function(data) {
    let showImageUrl = data.currentTarget.dataset.url
    wx.navigateTo({
      url: `../message/showimage?url=${showImageUrl}`,
    })
  },
  onShareAppMessage: function() {
    return {
      title: '微信关注微言合工大',
      path: '/pages/index/index'
    }
  }
})