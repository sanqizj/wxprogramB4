var app = getApp()
Page({
  data: {
    navbar: ['失物招领', '寻物启事'],
    currentTab: 0,
    swiperScrollList_loss: [
    ],
    swiperScrollList_find:[
    ],
  },
  onLoad(){
    /*TODO　匹配后获得帖子列表*/
    var that=this
    wx.request({
      url: 'http://49.233.22.140:8080/user/21/post_list/',
      data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          swiperScrollList_loss: res.data,
        })
      }
    })
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  viewDetails: function(e){
    wx.navigateTo({
      url: '../posts/posts?id=0'
    })
  },
  

})