let imageList = new Array()
var httpUrl = getApp().globalData.httpUrl;
let key_open;
let key_user;
let canDo = false
let canDo1 = false
let canDo2 = false
let canDo3 = false
Page({
  data: {
    category: ['请选择类型', '习惯养成', '比赛组队'],
    index: [0, 1, 2],
    current: '请选择类型',
    imageList: [],
    resCatalog: '',
    add_img: true
  },
  onLoad: function() {
    imageList = []
  },
  chooseImage: function() {
    var that = this
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
        console.log(imageList)
        that.setData({
          imageList: imageList
        })
      }
    })
  },


  chooseCategory(event) {
    let value = event.detail.value
    if (event.detail.value == 0) {
      this.showMessage('请选择组队类型')
    }
    let category = this.data.category
    this.setData({
      current: category[value]
    })
  },
  showMessage(message) {
    wx.showModal({
      title: '提示',
      content: message,
      success: function(res) {}
    })
  },
  checkPhone(event) {
    // let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    let myreg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))+\d{8}$/;
    if (!myreg.test(event.detail.value)) {
      this.showMessage('请输入正确的手机号')
      canDo = false
    } else {
      canDo = true
    }
  },
  checkQQ(event) {
    if (isNaN(event.detail.value)) {
      this.showMessage('请输入正确的QQ号')
      canDo1 = false
    } else {
      canDo1 = true
    }
  },
  checkContent(event) {
    if (!event.detail.value) {
      this.showMessage('内容不能为空')
      canDo2 = false
    } else {
      canDo2 = true
    }
  },
  checkTitle(event) {
    if (!event.detail.value) {
      this.showMessage('标题不能为空')
      canDo3 = false
    } else {
      canDo3 = true
    }
  },
  uploadimg: function(imgarr, index,act_id) {
    let that = this
    let i = index
    wx.uploadFile({
      url: httpUrl + '/image',
      filePath: imgarr[i],
      name: 'wechat_image',
      formData: {
        "open_id": key_open,
        "index": i,
        "act_id": act_id
      },
      success:function(){
        i++;
        if(i==imgarr.length){
          wx.showToast({
            title: '图片上传成功'
          })
        }else{
          that.uploadimg(imgarr,i,act_id)
        }
      }
    })
  },
  formSubmit(event) {
    let that = this
    let value = event.detail.value
    console.log(value)
    value.imgtype = this.data.imgtype
    if (value.title && value.name && value.phone && value.category > 0 && value.content) {} else {
      this.showMessage('信息不完整')
    }
    try {
      key_open = wx.getStorageSync('key_openid');
      key_user = wx.getStorageSync('key_userid')

    } catch (e) {
      //
      console.log(e)
    }

    if (value.category > 0 && key_open && key_user && canDo && canDo1 && canDo2 && canDo3 && value.name) {
      let that = this
      console.log("openid", key_open)
      console.log("userid", key_user)
      wx.request({
        url: httpUrl + '/create',
        data: {
          act_type: value.category,
          title: value.title,
          name: value.name,
          tel: value.phone,
          qq: value.qq,
          text: value.content,
          open_id: key_open,
          user_id: key_user
        },
        header: {
          'content-type': 'application/json'
        },
        success: function(res) {
          let act_id = res.data.actid
          if (imageList[0]) {
            that.uploadimg(imageList,0,act_id)
          }
          wx.showModal({
            title: '提示',
            content: "发布成功~",
            success: function(res) {
              wx.switchTab({
                url: '../message/message',
              })
            }
          })
        }
      })
    }
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
  },
  onShareAppMessage: function() {
    return {
      title: '寻找志同道合的你·明理苑大学生网络文化工作室出品',
      path: '/pages/index/index'
    }
  }
})