Page({
    data: {
      images: [],
      count: 3,  //设置最多三张图片
      imagesShow:[]
    },
    chooseImage: function () {
      var self = this;
      var images = self.data.images;
      var imagesShow = self.data.imagesShow;
      var count = self.data.count - images.length; //设置最多三张图片
      wx.chooseImage({
        count: count, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          for (var i = 0, h = res.tempFilePaths.length; i < h; i++) {
            images.push(res.tempFilePaths[i]);
            imagesShow.push(res.tempFilePaths[i]);
            self.setData({
              images: images,
              imagesShow: imagesShow
            })
          }
          // console.log(res)
          // 返回选定照片的本地文件路径列表，tempFilePath为图片路径数组可以作为img标签的src属性显示图片
          // self.uploadImg(res,
          //   function (url) {
          //     images.push(url);
          //     self.setData({
          //       images: images,
          //     })
          //     //console.log(self.data.images)
          //   })
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
    uploadImg: function (res, callback) {
      var tempFilePaths = res.tempFilePaths;
      //启动上传等待中...  
      wx.showToast({
        title: '上传中...',
        icon: 'loading',
        mask: true,
        duration: 10000
      })
      var uploadImgCount = 0;
      for (var i = 0, h = tempFilePaths.length; i < h; i++) {
        wx.uploadFile({
          url: app.globalData.Host + '/upload/upload',//app.globalData.Host为实际测试开发地址
          filePath: tempFilePaths[i],
          name: 'file',//这个就是传个后台图片路径所对应的key
          formData: {},
          header: {
            'content-type': 'multipart/form-data'
          },
          success: function (res) {
            uploadImgCount++;
            var data = JSON.parse(res.data);
            //console.log(data)
            //console.log(data.data)
            if (data.data) {
              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
              callback(data.data)
            } else {
              wx.hideToast();
              wx.showToast({
                title: '上传图片失败',
                icon: 'none',
                duration: 1500
              })
            }
          },
          fail: function (res) {
            wx.hideToast();
            wx.showToast({
              title: '上传图片失败',
              icon: 'none',
              duration: 1500
            })
          }
        });
      }
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
      })
    },
  })