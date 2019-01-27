let app = getApp()
let URL = app.globalData.httpUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plus: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let length = parseInt(options.length)
    let imgArr = []
    for (let i = 0; i < length; i++) {
      let imgUrl = `${URL}/associate/${options.openid}/${options.imgUrl}_${i}.png`
      imgArr.push(imgUrl)
    }
    this.setData({
      study: options.study,
      imgArr: imgArr
    })
  },
  onShareAppMessage: function() {
    return {
      title: '寻找志同道合的你·明理苑大学生网络文化工作室出品',
      path: '/pages/index/index'
    }
  }
})