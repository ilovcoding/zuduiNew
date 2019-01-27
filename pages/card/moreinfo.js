// pages/card/moreinfo.js
let app = getApp()
let imgurl = app.globalData.httpUrl
let imgarr = []
Page({

  data: {

  },

  onLoad: function(e) {
    let that = this
    let over = true
    console.log(e)
    wx.request({
      url: imgurl + '/cardtext',
      data: {
        cardid: e.id
      },
      success: (res) => {
        let info = res.data.cardinfo
        console.log(info)
        that.setData({
          cardtext: info.cardtext
        })
        let cardtime = info.cardtime
        cardtime = parseInt(cardtime)
        let date = new Date(cardtime)
        let day = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate()
        console.log(day)
        imgarr = []
        for (let i = 0; i < 3; i++) {
          imgarr.push(imgurl + '/img_' + info.actid + '_' + info.openid + '_' + day + '_' + i + '.png')
        }
        console.log(imgarr)
        that.setData({
          src: imgarr
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '微信关注微言合工大',
      path: '/pages/index/index'
    }
  }
})