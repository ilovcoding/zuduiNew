/*
          imgUrls:[imgurl+'/img_'+res.data.open_id+'_'+parseInt(res.data.time/10000)+'_0.png']
*/
let app = getApp()
let imgurl = app.globalData.httpUrl
let URL = app.globalData.httpUrl
let imgarr = []
let actid;
let actinfo;

let key_openid;
let key_userid;
Page({

    data: {
        item: [],
        imgUrls: imgarr,
        buttontext: "我要加入",
        isjoin: false
    },

    onLoad: function(data) {
        let that = this
        imgarr = []
        actid = data.id
        console.log("data", data)
        this.setData({
            acttype: data.type
        })
        wx.request({
            url: app.globalData.httpUrl + '/hobby',
            data: {
                id: data.id
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                actinfo = res
                console.log(res.data)
                var time1 = new Date(parseInt(res.data.time))
                var time2 = (time1.getMonth() + 1) + '月' + time1.getDate() + '日'
                console.log("time2", time2)
                that.setData({
                    item: res.data,
                    fbtime: time2,
                    name: res.data.name,
                    tel: res.data.tel,
                    qq: res.data.qq
                })
                wx.request({
                    url: imgurl + '/getindex',
                    data: {
                        actid: actid
                    },
                    success: (res) => {
                        for (let i = 0; i <= res.data.index; i++) {
                            imgarr[i] = imgurl + '/img_' + res.data.openid + '_' + actid + '_' + i + '.png'
                        }
                        that.setData({
                            imgUrls: imgarr
                        })
                        console.log(imgarr)
                        imgarr = []
                    }
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
                    console.log('用户点击取消')
                }
            }
        })
    },

    join: function() {
        let that = this
        try {
            key_userid = wx.getStorageSync("key_userid")
            key_openid = wx.getStorageSync("key_openid")
        } catch (e) {
            //
        }
        wx.showModal({
            title: '提示',
            content: '是否确认加入',
            success: function(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                    wx.request({
                        url: URL + '/isjoin',
                        data: {
                            openid: key_openid,
                            actid: actinfo.data.id,
                            userid: key_userid
                        },
                        success: (res) => {
                            console.log(res)
                            that.setData({
                                buttontext: "您已加入",
                                isjoin: res.data.isjoin
                            })
                        }
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    wantjoin: () => {
        console.log("wantjoin")
        wx.navigateTo({
            url: 'wantjoin?actid=' + actinfo.data.id + '&type=wantjoin',
        })
    },
    update: () => {
        wx.navigateTo({
            url: 'wantjoin?actid=' + actinfo.data.id + '&type=update',
        })
    },
    onShow: function() {
        let that = this
        //console.log("onshow")
        try {
            key_openid = wx.getStorageSync("key_openid")
        } catch (e) {
            console.log(e)
        }
        wx.request({
            url: URL + '/isjoin',
            data: {
                actid: actid,
                openid: key_openid,
            },
            success: (res) => {
                console.log(res.data)
                that.setData({
                    isjoin: res.data.isjoin,
                    buttontext: res.data.buttontext
                })
            }
        })
        wx.request({
            url: imgurl + '/findMyinfo',
            data: {
                actid: actid,
                openid: key_openid
            },
            success: (res) => {
                console.log(res.data)
                if (res.data.myAct == false) {
                    that.setData({
                        myAct: res.data.myAct,
                        myName: res.data.name,
                        myTel: res.data.tel,
                        myQq: res.data.qq
                    })
                } else {
                    that.setData({
                        myAct: res.data.myAct
                    })
                }
            }
        })
        wx.request({
            url: imgurl + '/cardinfo',
            data: {
                actid: actid,
                openid: key_openid
            },
            success: (res) => {
                console.log(res.data)
                var info = res.data.cardinfo
                let infoLength = info.length
                if (res.data.cardinfo.length <= 3) {
                    that.setData({
                        dtarr: res.data.cardinfo,
                    })
                } else {
                    that.setData({
                        dtarr: [res.data.cardinfo[infoLength-1], res.data.cardinfo[infoLength-2], res.data.cardinfo[infoLength-3]],
                    })
                }
            }
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})