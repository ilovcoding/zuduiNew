let app = getApp()
let URL = app.globalData.httpUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
      wx.request({
        url:URL +'/mycount' ,
        data:{},
        success:function(res){
          console.log(res.data)
          that.setData({
            array:res.data
          })
        }
      })
  },

  onShareAppMessage: function () {

  }
})