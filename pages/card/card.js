let app = getApp()
let imgurl = app.globalData.httpUrl
let key_openid
Page({
    data: {
        _num: 1,
        array: []
    },
    onLoad: function() {

    },
    day: function(e) {
        wx.navigateTo({
            url: 'day?actid=' + e.currentTarget.id,
        })
    },

    onShow: function() {
        let that = this
        try{
            key_openid=wx.getStorageSync("key_openid")
        }catch(e){

        }
        wx.request({
            url: app.globalData.httpUrl + '/needcard',
            data: {
                x: 1,
                y: 3,
                openid:key_openid
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].userid = imgurl + '/img_' + res.data[i].open_id + '_' + res.data[i].id + '_0.png'
                }
                console.log(res)
                that.setData({
                    array: res.data,
                })
            }
        })
    },
    getcard: function(e) {
        console.log(e)
        console.log(e.currentTarget.id)
        wx.navigateTo({
            url: 'getcard?actid=' + e.currentTarget.id,
        })
    },
    cardinfo:function(e){
        //console.log(e)
        wx.navigateTo({
            url: 'cardinfo?actid=' + e.currentTarget.id + '&iscard=' + e.currentTarget.dataset.iscard,
        })
    },
    onShareAppMessage: function() {

    },
    gfactive:function(){
      wx.navigateTo({
        url: '../gfactivity/gfactivity',
      })
    }
})