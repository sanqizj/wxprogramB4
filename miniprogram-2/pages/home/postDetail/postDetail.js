// pages/myPosts/myPosts.js
var app = getApp()
Page({
  data: {
    postInfo: {
      topic: "",
      time: "",
      place: "",
      detail: "",
      postId: 0,
      postType: 0,
      posterId: '',
      photo_included: 0,
      token: 0
    },
    changeable: false
  },
  onLoad: function (options) {
    var obj = JSON.parse(options.obj)
    this.setData({
      postInfo: obj
    })
    if (this.data.postInfo.posterId == app.globalData.userInfo.username) {
      this.setData({
        changeable: true
      })
    }
  },
  changePost() {
    var obj = JSON.stringify(this.data.postInfo)
    wx.navigateTo({
      url: '../changeablePost/changeablePost?obj=' + obj,
    })
  }
})