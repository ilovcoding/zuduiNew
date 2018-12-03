// pages/my/wdcy.js
let key_openid
let app = getApp()
var httpUrl = app.globalData.httpUrl;
var imgurl = app.globalData.httpUrl;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: []
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let that = this
        try {
            key_openid = wx.getStorageSync("key_openid")
        } catch (e) {}
        wx.request({
            url: httpUrl + '/wdcy',
            data: {
                openid: key_openid
            },
            success: (res) => {
                for (let i = 0; i < res.data.arr.length; i++) {
                    res.data.arr[i].userid = imgurl + '/img_' + res.data.arr[i].open_id + '_' + res.data.arr[i].id + '_0.png'
                }
                console.log(res.data.arr)
                that.setData({
                    array: res.data.arr
                })
            }
        })
    },
    end: (e) => {
        console.log(e)
        let act_id = e.currentTarget.id
        let key_openid
        try {
            key_openid = wx.getStorageSync("key_openid")
        } catch (e) {

        }
        wx.showModal({
            title: '提示',
            content: "是否退出此活动？",
            success: function(res) {
                if (res.confirm) {
                    wx.request({
                        url: imgurl + '/endcy',
                        data: {
                            actid: act_id,
                            openid: key_openid
                        },
                        success: (res) => {
                            console.log(res.data)
                        }
                    })
                    wx.navigateTo({
                        url: 'wdcy',
                    })
                    wx.navigateBack({
                        delta: 1
                    })
                }
            }
        })
    },

    onShareAppMessage: function() {

    }
})