// pages/card/cardinfo.js
let app = getApp()
let imgarr = []
let imgurl = app.globalData.httpUrl
let actid
let actinfo
let key_openid
let key_userid
let key_userimg
let card_time
let phb_arr = []
let IScard
Page({

    /**
     * 页面的初始数据
     */
    data: {
        actname: "标题",
        people: " ",
        time: " ",
        imgUrls: imgarr,
        card_day: 0,
        gread: 0,
        all_user: 0,
        sty1: "btn2",
        sty2: "btn1",
        phbstyle: 0,
        dt: true,
        phb: false,
        phb_user_name: "",
        phb_day: 0
    },
    change: function(e) {
        this.onShow()
        this.setData({
            phbstyle: e.target.dataset.color
        })
        if (e.target.dataset.color == 0) {
            this.setData({
                dt: true,
                phb: false
            })
        }
        if (e.target.dataset.color == 1) {
            this.setData({
                dt: false,
                phb: true
            })
        }
    },
    getcard: function() {
        wx.navigateTo({
            url: 'getcard?actid=' + actid,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(data) {
        let that = this
        imgarr = []
        actid = data.actid
        IScard = data.iscard
        console.log(IScard)
        try {
            key_openid = wx.getStorageSync("key_openid")
            key_userid = wx.getStorageSync("key_userid")
            key_userimg = wx.getStorageSync("key_userimg")
        } catch (e) {}
        this.setData({
            userimage: key_userimg,
            IScard
        })
        if (IScard == 0) {
            this.setData({
                lastText: "今日打卡"
            })
        } else {
            this.setData({
                lastText: "已打卡"
            })
        }
        wx.request({
            url: app.globalData.httpUrl + '/hobby',
            data: {
                id: data.actid
            },
            header: {
                'content-type': 'application/json' // 默认值
            },
            success: function(res) {
                actinfo = res.data
                var time1 = new Date(parseInt(res.data.time))
                var time2 = (time1.getMonth() + 1) + '月' + time1.getDate() + '日'
                that.setData({
                    fbtime: time2,
                    item: res.data,
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
                        imgarr = []
                    }
                })
            }
        })
        wx.request({
            url: imgurl + '/cardinfo',
            data: {
                actid: actid,
                openid: key_openid
            },
            success: (res) => {
                var info = res.data.cardinfo
                var dttime = info[0].cardtime
                let DTarr=res.data.cardinfo
                let DTarr2=[]
                let arrlength = DTarr.length
                DTarr.forEach((value,index,input)=>{
                    DTarr2[arrlength-1]=input[index];
                    arrlength--;
                })
                that.setData({
                    dtarr: DTarr2,
                })
            }
        })
    },
    onShow: function() {
        let that = this
        wx.request({
            url: imgurl + '/findwe',
            data: {
                actid: actid
            },
            success: function(res) {
                that.setData({
                    all_user: res.data.num,
                    we_img: res.data.imgarr
                })
            }
        })
        wx.request({
            url: imgurl + '/cardday',
            data: {
                actid: actid,
                openid: key_openid
            },
            success: (res) => {
                that.setData({
                    card_day: res.data.card_day
                })
            }
        })

        wx.request({
            url: imgurl + '/gread',
            data: {
                actid: actid,
                userid: key_userid
            },
            success: (res) => {
                let info = []
                info = res.data.out
                for (let i = 0; i < info.length; i++) {
                    var a = i + 1
                    info[i].id = '../../images/' + a + '.png'
                }
                if (info.length > 3) {
                    that.setData({
                        phb_arr: [info[0], info[1], info[2]]
                    })
                } else {
                    that.setData({
                        phb_arr: res.data.out
                    })
                }
                that.setData({
                    gread: res.data.myorder,
                })
            }
        })
    },
    moreinfo: (e) => {
        wx.navigateTo({
            url: 'moreinfo?id=' + e.currentTarget.id,
        })
    },
    onShareAppMessage: function() {

    }
})