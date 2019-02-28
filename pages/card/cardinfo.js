let app = getApp()
let imgurl = app.globalData.httpUrl
let actid
let actinfo
let key_openid
let key_userid
let key_userimg
Page({
  data: {
    actname: "标题",
    people: " ",
    time: " ",
    card_day: 0,
    gread: 0,
    all_user: 0,
    sty1: "btn2",
    sty2: "btn1",
    phbstyle: 0,
    dt: true,
    phb: false,
    phb_user_name: "",
    phb_day: 0,
    imgurl
  },
  change: function(e) {
    this.onShow()
    this.setData({
      phbstyle: e.target.dataset.color
    })
    if (e.target.dataset.color == 0) {
      this.setData({
        dt: true,
        phb: false
      })
    }
    if (e.target.dataset.color == 1) {
      this.setData({
        dt: false,
        phb: true
      })
    }
  },
  getcard: function() {
    wx.navigateTo({
      url: 'getcard?actid=' + actid,
    })
  },
  onLoad: function(data) {
    let that = this
    actid = data.actid
    key_openid = wx.getStorageSync("key_openid")
    key_userid = wx.getStorageSync("key_userid")
    key_userimg = wx.getStorageSync("key_userimg")
    this.setData({
      userimage: key_userimg,
    })
    wx.request({
      url: app.globalData.httpUrl + '/actinfo',
      data: {
        id: data.actid
      },
      success: function(res) {
        actinfo = res.data.active
        var time1 = new Date(parseInt(res.data.active.time))
        var time2 = (time1.getMonth() + 1) + '月' + time1.getDate() + '日'
        let actimgUrl = `${imgurl}/${res.data.active.open_id}/${res.data.active.id}/`
        that.setData({
          fbtime: time2,
          item: actinfo,
          name: actinfo.name,
          tel: actinfo.tel,
          qq: actinfo.qq,
          actimgUrl
        })
      }
    })
    //打卡动态
    wx.request({
      url: imgurl + '/cardinfo',
      data: {
        actid: actid,
        openid: key_openid
      },
      success: (res) => {
        that.setData({
          dtarr: res.data
        })
      }
    })
  },
  //查看和你一起打卡的人的头像
  onShow: function() {
    let that = this
    wx.request({
      url: imgurl + '/findwe',
      data: {
        actid: actid
      },
      success: function(res) {
        that.setData({
          all_user: res.data.length,
          we_img: res.data
        })
      }
    })
    //排行榜
    wx.request({
      url: imgurl + '/gread',
      data: {
        actid: actid,
        openid: key_openid
      },
      success: (res) => {
        console.log(res)
        that.setData({
          phb_arr:res.data.phb_arr,
          card_day:res.data.day,
          gread:res.data.order
        })
      }
    })
  },
  showImage: function(data) {
    let showImageUrl = data.currentTarget.dataset.url
    wx.navigateTo({
      url: `../message/showimage?url=${showImageUrl}`,
    })
  }
})