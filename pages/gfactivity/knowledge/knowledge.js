// pages/gfactivity/knowledge/knowledge.js
const app = getApp()
const URL = app.globalData.httpUrl

let date = new Date
let year = date.getFullYear()
let month = date.getMonth() + 1
let day = date.getDate()
let time = '' + year + month + day
let today = date.getTime()
let yestoday = today - 3600 * 24 * 1000
let yesdate = new Date(yestoday)
let yesyear = yesdate.getFullYear()
let yesmonth = yesdate.getMonth() + 1
let yesday = yesdate.getDate()
let yestime = '' + yesyear + yesmonth + yesday
Page({

  /**
   * 页面的初始数据
   */
  data: {
    knowledgehead: "每日知识竞猜标题",
    answer: "快来猜猜答案是什么吧",
    istoday: true,
    disabled: false,
    num: 1,
    sty:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    let that = this
    wx.request({
      url: URL + '/question',
      data: {
        time: time
      },
      success: (res) => {
        console.log(res.data)
        that.setData({
          question: res.data.question
        })
      }
    })

    wx.request({
      url: URL + '/answer',
      data: {
        query: true,
        time: time
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          num: res.data.usernum
        })
      }
    })
    this.getanswer()
  },
  yestoday: function() {
    this.setData({
      sty:2
    })
    let that = this
    wx.request({
      url: URL + '/question',
      data: {
        time: yestime
      },
      success: (res) => {
        that.setData({
          question: res.data.question,
          answer: res.data.answer,
          istoday: false
        })
      }
    })
  },
  today: function() {
    this.setData({
      sty:1
    })
    let that = this
    wx.request({
      url: URL + '/question',
      data: {
        time: time
      },
      success: (res) => {
        that.setData({
          question: res.data.question,
          answer: "快来猜猜答案是什么吧",
          istoday: true
        })
      }
    })
  },
  toanswer: () => {
    wx.navigateTo({
      url: './answer/answer',
    })
  },
  getanswer: function() {
    let that = this
    wx.request({
      url: URL + '/getanswer',
      data: {
        time: yestime,
      },
      success: function(res) {
        that.setData({
          answerArr: res.data
        })
      }
    })
  },
  onShareAppMessage: function() {

  }
})