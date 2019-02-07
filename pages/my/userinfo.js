// pages/my/userinfo.js
let app = getApp()
let URL = app.globalData.httpUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
      user:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let that=this
      wx.request({
          url:URL+ '/showjoinuser',
          data:{
              actid:options.actid
          },
          success:function(res){
              console.log(res.data)
              that.setData({
                  user:res.data
              })
          }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

 call:(e)=>{
     console.log(e)
     let pNumber = e.currentTarget.dataset.phone
    // console.log(pNumber)
     wx.makePhoneCall({
         phoneNumber:pNumber
     })
 },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '微信关注微言合工大',
      path: '/pages/index/index'
    }
  }
})