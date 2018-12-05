let app = getApp()
let URL = app.globalData.httpUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

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
          let openid = wx.getStorageSync('key_openid')
          let myself=[]
          for(let i=0;i<res.data.length;i++){
            if(res.data[i].open_id==openid){
              myself = [res.data[i]]
              console.log(myself)
              break;
            }
          }
          that.setData({
            myself:myself
          })
        }
      })
  },

  onShareAppMessage: function () {

  }
})