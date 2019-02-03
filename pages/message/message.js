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
    let actType = e.target.dataset.num
    if (actType == '4') {
      //明理苑活动的时候
      this.setData({
        _num: e.target.dataset.num,
        array: [],
        mly: true
      })
    } else {
      this.setData({
        _num: e.target.dataset.num,
        array: [],
        mly: false
      })
    }

    switch (actType) {
      case '1':
        this.activity({
          // 1 2 表示所有种类 ,1表示习惯2表示组队
          x: 1,
          y: 2
        })
        break;
      case '2':
        this.activity({
          //3为空元素
          x: 1,
          y: 3
        })
        break;
      case '3':
        this.activity({
          x: 2,
          y: 3
        })
        break;
      default:
        this.activity({
          //暂定0为明理苑活动
          x: 0,
          y: 0
        })
    }
  },
  teaminfo: function(e) {
    wx.navigateTo({
      url: `../teaminfo/teaminfo?id=${e.currentTarget.id}`
    })
  },
  showImage: function(data) {
    let showImageUrl = data.currentTarget.dataset.url
    wx.navigateTo({
      url: `showimage?url=${showImageUrl}`,
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
  },
  search:function(){
    wx.navigateTo({
      url: 'search',
    })
  }

})