let app = getApp()
let imgurl = app.globalData.httpUrl
let URL = app.globalData.httpUrl
let imgarr = []
let actid;
let actinfo;
let key_openid;
let key_userid;
let studentinfo, phone
Page({
  data: {
    item: [],
    imgUrls: imgarr,
    userjoin: false
  },

  onLoad: function(data) {
    console.log('data', data)
    let that = this
    key_openid = wx.getStorageSync('key_openid')
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
        console.log('res', res)
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
    //首先获得此活动的id和活动类型
    let [actid, type] = [data.currentTarget.dataset.actid, data.currentTarget.dataset.type]
    key_userid = wx.getStorageSync("key_userid") //用户id
    key_openid = wx.getStorageSync("key_openid") //用户标识符
    studentinfo = wx.getStorageSync('studentinfo') //用户姓名
    phone = wx.getStorageSync('phone')
    phone = phone || studentinfo.tel2 || studentinfo.tel1 //用户电话号码
    //如果是习惯养成类则不需要验证任何东西直接加入即可
    if (type == 1) {
      wx.showModal({
        title: '提示',
        content: '是否确认加入',
        success: function(res) {
          if (res.confirm) {
            that.joinuser({
              openid: key_openid,
              actid: actid,
              userid: key_userid,
              name: studentinfo.name,
              phone: phone,
              qq: qq
            })
          }
        }
      })
      return 0
    }
    //下面是参加比赛组队的用户代码流程比较麻烦要先进行身份信息验证
    let phonereg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))+\d{8}$/
    if (!phonereg.test(phone)) {
      wx.showModal({
        title: '提示',
        content: `您输的号码${phone}可能不对,去设置中添加或修改手机号`,
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../my/myconfig/myconfig',
            })
          }
        }
      })
      return 0
    }
    let qq = wx.getStorageSync('qq')
    if (qq.length == 0) {
      wx.showModal({
        title: '提示',
        content: '在设置中绑定QQ更方便发布者联系你,是否去绑定QQ',
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../my/myconfig/myconfig',
            })
            return 0
          }
        }
      })
      that.joinuser({
        openid: key_openid,
        actid: actid,
        userid: key_userid,
        name: studentinfo.name,
        phone: phone,
        qq: qq
      })
      return 0
    }
    wx.showModal({
      title: '提示',
      content: '是否确认加入',
      success: function(res) {
        if (res.confirm) {
          that.joinuser({
            openid: key_openid,
            actid: actid,
            userid: key_userid,
            name: studentinfo.studentName,
            phone: phone,
            qq: qq
          })
        }
      }
    })
    return 0
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
  },
  joinuser: function({
    openid,
    actid,
    userid,
    name = '',
    qq = '',
    phone = ''
  }) {
    let that = this
    wx.request({
      url: URL + '/userjoin',
      data: {
        openid: openid,
        actid: actid,
        userid: userid,
        qq: qq,
        phone: phone,
        name: name
      },
      success: function(res) {
        that.setData({
          userjoin: res.data.join
        })
        wx.showModal({
          title: '提示',
          content: '加入成功',
          showCancel: false,
          success: function() {
            wx.navigateBack({
              delta: 1
            })
          }
        })
      }
    })
  },
  showJoinUser: function(data) {
    wx.navigateTo({
      url: `../my/userinfo?actid=${data.currentTarget.dataset.actid}`,
    })

  }
})