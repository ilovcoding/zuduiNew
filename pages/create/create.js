let imageList = new Array()
var httpUrl = getApp().globalData.httpUrl;
let key_openid;
let key_userid;
let typeIndex = 0
Page({
  data: {
    pickArray: ['习惯养成', '比赛组队'],
    imageList: [],
    add_img: true
  },
  onLoad: function(options) {
    typeIndex = parseInt(options.type)
    let that = this
    let studentinfo = wx.getStorageSync('studentinfo')
    let phone = wx.getStorageSync('phone')
    phone = phone || studentinfo.tel2 || studentinfo.tel1
    this.setData({
      type: that.data.pickArray[typeIndex - 1], //数组下标从0开始的
      name: studentinfo.studentName,
      phone
    })
    imageList = []
  },
  chooseImage: function() {
    let that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      success: function(res) {
        console.log("res", res)
        for (let i = 0; i < res.tempFilePaths.length; i++) {
          imageList.push(res.tempFilePaths[i].toString())
        }

        if (imageList.length == 9) {
          that.setData({
            add_img: false
          })
        }
        that.setData({
          imageList: imageList
        })
      }
    })
  },
  chooseCategory(event) {
    let that = this
    typeIndex = parseInt(event.detail.value)
    this.setData({
      type: that.data.pickArray[index]
    })
  },
  showMessage(message) {
    wx.showModal({
      title: '提示',
      content: message,
      showCancel: false,
      success: function(res) {}
    })
  },
  checkPhone(phone) {
    let myreg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))+\d{8}$/
    if (!myreg.test(phone)) {
      return false
    } else {
      return true
    }
  },
  uploadimg: function(imgarr, index, act_id) {
    let that = this
    let [i, update] = [index, 0]
    //update大于0时数据库储存一下图片的index
    if (index == imgarr.length - 1) {
      update = 1
    }
    wx.uploadFile({
      url: httpUrl + '/image',
      filePath: imgarr[i],
      name: 'wechat_image',
      formData: {
        "open_id": key_openid,
        "index": i,
        "act_id": act_id,
        'update': update
      },
      success: function() {
        i++;
        if (i == imgarr.length) {
          wx.showToast({
            title: '图片上传成功'
          })
          return 0
        } else {
          that.uploadimg(imgarr, i, act_id)
        }
      }
    })
  },
  formSubmit(event) {
    let that = this
    let value = event.detail.value
    let real = this.checkPhone(value.phone)
    if (real) {} else {
      this.showMessage("请输入正确的手机号码")
      return 0
    }
    if (value.title && value.content) {} else {
      this.showMessage("标题或者内容都不能为空")
      return false
    }
    key_openid = wx.getStorageSync('key_openid');
    key_userid = wx.getStorageSync('key_userid')
    wx.request({
      url: httpUrl + '/create',
      data: {
        act_type: typeIndex,
        title: value.title,
        name: that.data.name,
        tel: value.phone,
        qq: value.qq,
        text: value.content,
        open_id: key_openid,
        user_id: key_userid
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        let act_id = res.data.actid
        if (imageList[0]) {
          that.uploadimg(imageList, 0, act_id)
        }
        wx.showModal({
          title: '提示',
          content: "您发布的活动已进入审核,可以再我的页面点击我的发布查看审核状态",
          success: function(res) {
            wx.switchTab({
              url: '../message/message',
            })
          }
        })
      }
    })
  },
  delImg: function(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否删除此图片',
      success: (res) => {
        if (res.confirm) {
          let index = e.target.dataset.imgindex
          imageList.splice(index, 1)
          that.setData({
            imageList: imageList
          })
        }
      }
    })
  }
})