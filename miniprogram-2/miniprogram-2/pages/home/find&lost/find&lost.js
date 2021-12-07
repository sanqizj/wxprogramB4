var app = getApp()
Page({
  data: {
    navbar: ['失物招领', '寻物启事'],
    currentTab: 0,
    swiperScrollList_loss: [],
    swiperScrollList_find: [],
    searchkey: ""
  },

  onShow() {
    /*TODO　从后端获取postInfo*/
    var that = this
    wx.request({
      url: 'http://49.233.22.140:8080/',
      data: {
        plate: "lost",
        page:1
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
    wx.request({
      url: 'http://49.233.22.140:8080/',
      data: {
        plate: "found",
        page:1
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
        that.setData({
          swiperScrollList_find: res.data,
        })
      }
    })
    

  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  viewDetails: function (e) {
    if (this.data.currentTab == 0) {
      var obj = JSON.stringify(this.data.swiperScrollList_loss[e.currentTarget.dataset.id])
      wx.navigateTo({
        url: '../postDetail/postDetail?obj=' + obj,
      })
    } else {
      var obj = JSON.stringify(this.data.swiperScrollList_find[e.currentTarget.dataset.id])
      wx.navigateTo({
        url: '../postDetail/postDetail?obj=' + obj,
      })
    }
    /*var that = this;
    wx.downloadFile({
      url: that.data.imgSrc,
      success(res) {
        that.setData({
          img: res.tempFilePath
        })
        console.log(1)
      },
      fail(res){
        console.log(2)
        console.log(res)
      }
    })*/
  },

  searchInput: function (e) {
    this.setData({
      searchkey: e.detail.value
    })
  },
  search: function () {
    /**TODO */
    console.log(this.data.searchkey)
  }

  /*TODO 下拉刷新和上划加载功能 */

})