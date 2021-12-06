var app = getApp()
Page({
    data: {
        postType: 0,
        array: ["失物招领", "寻物启事"],
        plateArray: ["lost", "find"],
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
        inputValue: "",
        tempFilePaths: "",
        admitted: false,
        images: [],
        count: 3,  //设置最多三张图片
        imagesShow: []
    },

    /*初始化数据 */
    onShow() {
        if (this.data.admitted) {
            this.setData({
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
                postType: 0,
                inputValue: "",
                tempFilePaths: "",
                admitted: false
            })
        }
    },

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

    chooseImage: function () {
        var self = this;
        var images = self.data.images;
        var imagesShow = self.data.imagesShow;
        var count = self.data.count - images.length; //设置最多三张图片
        wx.chooseImage({
            count: count,
            success: function (res) {
                for (var i = 0, h = res.tempFilePaths.length; i < h; i++) {
                    images.push(res.tempFilePaths[i]);
                    imagesShow.push(res.tempFilePaths[i]);
                    self.setData({
                        images: images,
                        imagesShow: imagesShow,
                        'postInfo.photo_included': images.length
                    })
                }
            }
        })
    },
    clickImage: function (e) {
        let self = this;
        let current = e.target.dataset.src;
        wx.previewImage({
            current: current,
            urls: [current],
            fail: function () {
                console.log('fail')
            },
            complete: function () {
                console.info("点击图片了");
            },
        })
    },
    deleteImage: function (e) {
        let self = this;
        let index = e.target.dataset.index;
        let images = self.data.images;
        let imagesShow = self.data.imagesShow;
        images.splice(index, 1);
        imagesShow.splice(index, 1);
        this.setData({
            images: images,
            imagesShow: imagesShow,
            'postInfo.photo_included': images.length
        })
    },

    admitPost: function (e) {
        this.setData({
            'postInfo.posterId': app.globalData.userInfo.username
        })
        var postInfo = this.data.postInfo
        if (postInfo.topic == "") {
            wx.showToast({
                title: '请填入主题',
                icon: 'error',
            })
        } else if (postInfo.time == "") {
            wx.showToast({
                title: '填入时间',
                icon: 'error',
            })
        } else if (postInfo.place == "") {
            wx.showToast({
                title: '请填入地点',
                icon: 'error',
            })
        } else {
            console.log(this.data)

            var that = this;
            console.log(that.data.postInfo)
            wx.request({
                url: 'http://49.233.22.140:8080/post/new/',
                method: "POST",
                data: {
                    "posterId": that.data.postInfo.posterId,
                    "plate": that.data.plateArray[that.data.postInfo.postType],
                    "detail": that.data.postInfo.detail,
                    "time": that.data.postInfo.time,
                    "place": that.data.postInfo.place,
                    "photo_included": that.data.postInfo.photo_included,
                    "topic": that.data.postInfo.topic,
                    "token": '21'
                },
                success(res) {
                    that.setData({
                        admitted: true
                    })
                    console.log('success')
                },
                fail(res) {
                    that.setData({
                        admitted: false
                    })
                    console.log('fail')
                }
            })
            if (that.data.postInfo.photo_included != 0) {
                for (var i = 0; i < that.data.postInfo.photo_included; i++) {
                    wx.uploadFile({
                        filePath: that.data.images[i],
                        name: 'file',
                        formData: {
                            'token': '21'
                        },
                        url: 'http://49.233.22.140:8080/post/upload_file/',
                        success(res) {
                            //console.log(1)
                            // console.log(res.data)
                            that.setData({
                                admitted: true
                            })
                        },
                        fail(res) {
                            that.setData({
                                admitted: false
                            })
                        }
                    })
                }
            }
            wx.switchTab({
                url: '../../home/find&lost/find&lost',
            })
        }
        /* */
    },
})