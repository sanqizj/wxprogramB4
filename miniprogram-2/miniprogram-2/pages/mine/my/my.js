var app=getApp()
Page({
  data: {

  },

  exit_account(){

    wx.redirectTo({
      url: '../../index/signIn/signIn',
    })
  },
  fill_table(){
    app.globalData.userInfo={
      username:"",
      password:"",
    }
    wx.navigateTo({
      url: '../fillTables/fillTables',
    })
  },
  filled_tables(){
    wx.navigateTo({
      url: '../tables/tables',
    })
  },
  published(){
    wx.navigateTo({
      url: '../publishedPosts/publishedPosts',
    })
  },
  personalCenter(){
      wx.navigateTo({
        url: '../personalCenter/personalCenter',
      })
  }
})