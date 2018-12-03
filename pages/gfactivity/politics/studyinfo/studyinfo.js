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
    if (options.imgUrl) {

    } else {
      this.setData({
        study: options.study
      })
      return 0
    }
    let imgUrl = `${URL}/politics/${options.openid}/${options.imgUrl}`
    console.log(options)
    this.setData({
      study: options.study,
      imgUrl: imgUrl
    })
    // let imgUrl=`${URL}/study/${options.openid}/${options.imgUrl}`
    //   console.log(options)
    //   this.setData({
    //     study:options.study,
    //     imgUrl:imgUrl
    //   })
  },
  onShareAppMessage: function() {

  }
})