// pages/mine/personalCenter/personalCenter.js
var app=getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:{
            username:0,
            password:""
        }
    },
    onLoad(){
        this.setData({
            'userInfo.username':app.globalData.userInfo.username,
            'userInfo.password':app.globalData.userInfo.password
        })
    }
})