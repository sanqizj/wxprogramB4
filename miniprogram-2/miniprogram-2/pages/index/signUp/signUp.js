// pages/index/signUp/signUp.js
Page({
    data: {
        userInfo: {
            username: 0,
            password: "",
            nickname: ""
        },
        checkPassword: "",
        token: ""
    },
    onLoad: function (options) {
        var obj = JSON.parse(options.obj)
        this.setData({
            token: obj
        })
    },
    accountInput: function (e) {
        this.setData({
            'userInfo.username': e.detail.value
        })
    },
    passwordInput: function (e) {
        this.setData({
            'userInfo.password': e.detail.value
        })
    },
    passwordInputAgain: function (e) {
        this.setData({
            checkPassword: e.detail.value
        })
    },
    signUp() {
        if (this.data.checkPassword != this.data.userInfo.password) {
            wx.showToast({
                title: '密码不一致！',
                icon: "error"
            })
            console.log(this.data)
        } else {
            wx.request({
                url: 'http:/49.233.22.140:8080/login/new_user/',
                method: "GET",
                data: {
                    userid: this.data.userInfo.username,
                    password: this.data.userInfo.password,
                    nickname: this.data.userInfo.nickname,
                    token: this.data.token
                },
                header: {
                    //设置参数内容类型为json
                    'content-type': 'application/json'
                },
                success: function (res) {
                    if (res.data.validation == true) {
                        wx.showToast({
                            title: '注册成功！',
                        })
                        wx.navigateTo({
                            url: '../../home/find&lost/find&lost',
                        })
                    }
                },
                fail:function(res){
                    wx.showToast({
                      title: 'fail',
                    })
                }
            })
            /*TODO*/
        }
    }
})