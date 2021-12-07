//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    token: '',
    returnValue: false,
    username: '',
    password: '',
    validation: true,
  },
  // 获取输入账号 
  usernameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
    app.globalData.userInfo.username = this.data.username
  },
  // 获取输入密码 
  passwordInput: function (e) {
    this.setData({
      password: e.detail.value
    })
    app.globalData.userInfo.password = this.data.password
  },
  // 登录处理


  signIn() {
    wx.switchTab({
      url: '../../home/find&lost/find&lost',
    })
    /*if (this.data.username.length == 0 || this.data.password.length == 0) {
      wx.showToast({
        title: '账号或密码不能为空',
        icon: 'none',
        duration: 2000
      })
    } else {
      var that = this;
      wx.request({
        url: "http://49.233.22.140:8080/login/",
        method: 'GET',
        data: {
          userid: this.data.username,
          password: this.data.password
        },
        success: function (res) {
          console.log(res.data)
          console.log(res.statusCode)
          if (res.statusCode != 200) {
            var toastText = '数据获取失败';
            wx.showToast({
              title: toastText,
              icon: "error",
              duration: 2000
            });
          } else {
            that.setData({
              validation: res.data.validation
            })
            if (res.data.validation == true) {
              wx.switchTab({
                url: '../../home/find&lost/find&lost',
              })
            }else{
              wx.showToast({
                title: '账号或密码错误',
                icon: "error",
                duration: 2000
              })
            }
          }
        }
      })
      
      
    }*/
  },

  signUp: function () {
    var that=this
    wx.navigateToMiniProgram({
      appId: 'wx31f880501d44724a',
      path: "pages/index/index",
      envVersion: "trial",
      extraData: {
        origin: "miniapp",
        type: "id.tsinghua"
      }
    })
    wx.onAppShow((res) => {
      that.setData({
        token: res.referrerInfo.extraData.token
      })
      wx.showToast({
        title: that.data.token,
      })
      if (that.data.token!="") {
        var obj=JSON.stringify(that.data.token)
        wx.navigateTo({
          url: '../signUp/signUp?obj='+obj,
        })
      }
    })    
  },

  retrievePassword() {
    var that=this
    wx.navigateToMiniProgram({
      appId: 'wx31f880501d44724a',
      path: "pages/index/index",
      envVersion: "trial",
      extraData: {
        origin: "miniapp",
        type: "id.tsinghua"
      }
    })
    wx.onAppShow((res) => {
      that.setData({
        token: res.referrerInfo.extraData.token
      })
      if (that.data.token!="") {
        var obj=JSON.stringify(that.data.token)
        wx.navigateTo({
          url: '../retrievePassword/retrievePassword?obj='+obj,
        })
      }
    })
    /*
   TODO 把token返回后端*/
   
  }
})
