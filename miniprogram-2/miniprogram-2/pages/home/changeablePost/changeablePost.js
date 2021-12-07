var app = getApp()
Page({
    data: {
        postType: 0,
        array: ["失物招领", "寻物启事"],
        postInfo: {
            topic: "",
            time: "",
            place: "",
            detail: "",
            postId: 0,
            postType: 0,
            posterId: '',
            photo_included: 0,
            token: 0,
            photos:""
        },
        inputValue: ""
    },

    onLoad:function(options){
      var obj=JSON.parse(options.obj)
      this.setData({
        postInfo:obj
      })
     console.log(this.data.postInfo)
    },

    
/*input */
    topicInput: function (e) {
        this.setData({
            'postInfo.topic': e.detail.value
        })
    },
    timeInput: function (e) {
        this.setData({
            'postInfo.time': e.detail.value
        })
    },
    placeInput: function (e) {
        this.setData({
            'postInfo.place': e.detail.value
        })
    },
    detailInput: function (e) {
        this.setData({
            'postInfo.detail': e.detail.value
        })
    },
    changeType: function (e) {
        this.setData({
            postType: e.detail.value
        })
        this.setData({
            'postInfo.postType': e.detail.value
        })
    },

    addPicture() {
        let that = this
        wx.chooseImage({
            count: 3,
            success: res => {
                wx.showToast({
                    title: '正在上传...',
                    icon: 'loading',
                    mask: true,
                    duration: 1000
                })
                let tempFilePaths = res.tempFilePaths;
                that.setData({
                    'postInfo.photos': tempFilePaths,
                    'postInfo.photo_included': tempFilePaths.length
                })
            }
        })
    },

    preview: function (e) {
        let index = 0; //预览图片的编号
        let that = this;
        wx.previewImage({
            current: that.data.postInfo.photos[index], //预览图片链接
            urls: that.data.postInfo.photos, //图片预览list列表
            success: function (res) {
                //console.log(res);
            },
            fail: function () {
                //console.log('fail')
            }
        })
    },
    admitPost: function (e) {
        this.setData({
            'postInfo.posterId': app.globalData.userInfo.username
        })
        console.log(this.data.postInfo)
        var postInfo = this.data.postInfo
        if (postInfo.topic == "") {
            wx.showToast({
                title: '请填入主题',
                icon: 'error',
            })
        } else if (postInfo.time == "") {
            wx.showToast({
                title: '请填入时间',
                icon: 'error',
            })
        } else if (postInfo.place == "") {
            wx.showToast({
                title: '请填入地点',
                icon: 'error',
            })
        } else {
            this.setData({
                inputValue: ""
            })
            wx.switchTab({
                url: '../find&lost/find&lost',
            })
        }
        /*TODO　将帖子信息传给后端*/
    },
    
})