// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uploder_imgs: [],
    computerId: "",
    name: "",
    brand: "",
    type: "",
    prices: "",
    mainBoard: "",
    graphicsCard: "",
    hardDisk: "",
    internalStorage: "",
    cpu: "",
    merchant: "",
    imgSrc: [],
    searchValue:"",
    isByID:true
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app.globalData.isload = true
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.userInfo == null && app.globalData.isload) {
      wx.showToast({
        title: '请授权登录',
        icon: "none",
        duration: 1500,
      });
        setTimeout(() => {
          wx.navigateTo({
            url: '../authorization/authorization'
          });
        }, 100);
    }

    if (!app.globalData.isLogin && app.globalData.isload && app.globalData.userInfo !== null) {
      wx.navigateTo({
        url: '../login/login'
      });
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getcomputerId: function (evt) {
    this.setData({
      computerId: evt.detail.value
    })
  },
  getname: function (evt) {
    this.setData({
      name: evt.detail.value
    })
  },
  getbrand: function (evt) {
    this.setData({
      brand: evt.detail.value
    })
  },
  gettype: function (evt) {
    this.setData({
      type: evt.detail.value
    })
  },
  getprices: function (evt) {
    this.setData({
      prices: evt.detail.value
    })
  },
  getmainBoard: function (evt) {
    this.setData({
      mainBoard: evt.detail.value
    })
  },
  getgraphicsCard: function (evt) {
    this.setData({
      graphicsCard: evt.detail.value
    })
  },
  gethardDisk: function (evt) {
    this.setData({
      hardDisk: evt.detail.value
    })
  },
  getinternalStorage: function (evt) {
    this.setData({
      internalStorage: evt.detail.value
    })
  },
  getcpu: function (evt) {
    this.setData({
      cpu: evt.detail.value
    })
  },
  getmerchant: function (evt) {
    this.setData({
      merchant: evt.detail.value
    })
  },
  chooseImg: function (evt) {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          uploder_imgs: result.tempFilePaths
        })

      },
      fail: () => {},
      complete: () => {}
    });

  },
  deletaimg: function (evt) {
    this.data.uploder_imgs.splice(evt.target.id, 1)
    this.setData({
      uploder_imgs: this.data.uploder_imgs
    })
  },

  // addComputer: function () {
  //   let thdata = this.data
  //   if(thdata.computerId!=""&&thdata.name!=""&&thdata.brand!=""&&thdata.type!=""&&thdata.prices!=""&&thdata.mainBoard!=""&&thdata.graphicsCard!=""&&thdata.hardDisk!=""&&thdata.internalStorage!=""&&thdata.cpu!=""&&thdata.merchant!=""&&thdata.imgSrc!=[]){
  //     let time = new Date();
  //   for (let i = 0; i < this.data.uploder_imgs.length; i++) {
  //     let str = this.data.uploder_imgs[i].substr(this.data.uploder_imgs[0].lastIndexOf("."))
  //     wx.cloud.uploadFile({
  //       cloudPath: 'computerImg/' + time.getFullYear() + (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + time.getHours() + time.getMinutes() + time.getSeconds() + ((Math.random() * 100).toFixed(0)) + str,
  //       filePath: this.data.uploder_imgs[i], // 文件路径
  //     }).then(res => {
  //       this.data.imgSrc.push(res.fileID)
  //       if (this.data.uploder_imgs.length == this.data.imgSrc.length) {
  //         wx.request({
  //           url: 'http://localhost:8080/api/addComputerType',
  //           data: {
  //             computerId: this.data.computerId,
  //             name: this.data.name,
  //             brand: this.data.brand,
  //             type: this.data.type,
  //             prices: this.data.prices,
  //             mainBoard: this.data.mainBoard,
  //             graphicsCard: this.data.graphicsCard,
  //             hardDisk: this.data.hardDisk,
  //             internalStorage: this.data.internalStorage,
  //             cpu: this.data.cpu,
  //             merchant: this.data.merchant,
  //             imgSrc: this.data.imgSrc,
  //           },
  //           method: 'GET',
  //           success: ()=>{
  //             this.setData({
  //             computerId: "",
  //             name: "",
  //             brand: "",
  //             type: "",
  //             prices: "",
  //             mainBoard: "",
  //             graphicsCard: "",
  //             hardDisk: "",
  //             internalStorage: "",
  //             cpu: "",
  //             merchant: "",
  //             imgSrc: [],
  //             uploder_imgs: [],
  //             })
  //             wx.showToast({
  //               title: '添加成功',
  //               duration: 1500,
  //             });
  //           },
  //           fail: ()=>{},
  //           complete: ()=>{}
  //         });

  //       }
  //     }).catch((err) => {
  //       console.log(err);
  //     })
  //   }
  //   }else{
  //     wx.showToast({
  //       title: '缺少参数',
  //       icon: 'none',
  //       duration: 1500,

  //     });
  //   }

  // },

  addComputer: function() {
    let thdata = this.data;
    let time = new Date();
    let promises = [];
    for (let i = 0; i < thdata.uploder_imgs.length; i++) {
      let str = thdata.uploder_imgs[i].substr(thdata.uploder_imgs[0].lastIndexOf('.'));
      let cloudPath = `computerImg/${time.getFullYear()}${(time.getMonth() + 1).toString().padStart(2, '0')}${time.getDate().toString().padStart(2, '0')}${time.getHours()}${time.getMinutes()}${time.getSeconds()}${(Math.random() * 100).toFixed(0)}${str}`;
      promises.push(
        wx.cloud.uploadFile({
          cloudPath,
          filePath: thdata.uploder_imgs[i],
        }).then(res => {
          thdata.imgSrc.push(res.fileID);
        }).catch(err => {
          console.error(`上传图片 ${thdata.uploder_imgs[i]} 失败:`, err);
          wx.showToast({
            title: '上传图片失败',
            icon: 'none',
            duration: 1500,
          });
        })
      );
    }
  
    Promise.all(promises)
      .then(() => {
        wx.request({
          url: 'http://localhost:8080/api/addComputerType',
          data: {
            computerId: thdata.computerId,
            name: thdata.name,
            brand: thdata.brand,
            type: thdata.type,
            prices: thdata.prices,
            mainBoard: thdata.mainBoard,
            graphicsCard: thdata.graphicsCard,
            hardDisk: thdata.hardDisk,
            internalStorage: thdata.internalStorage,
            cpu: thdata.cpu,
            merchant: thdata.merchant,
            imgSrc: thdata.imgSrc,
          },
          method: 'GET',
          success: () => {
            this.setData({
              computerId: '',
              name: '',
              brand: '',
              type: '',
              prices: '',
              mainBoard: '',
              graphicsCard: '',
              hardDisk: '',
              internalStorage: '',
              cpu: '',
              merchant: '',
              imgSrc: [],
              uploder_imgs: [],
            });
            wx.showToast({
              title: '添加成功',
              duration: 1500,
            });
          },
          fail: (err) => {
            console.error('添加电脑信息失败:', err);
            wx.showToast({
              title: '添加电脑信息失败',
              icon: 'none',
              duration: 1500,
            });
          },
          complete: () => {}
        });
      })
      .catch(err => {
        console.error('上传图片失败:', err);
        wx.showToast({
          title: '上传图片失败',
          icon: 'none',
          duration: 1500,
        });
      });
  },

  getsearchvalue:function(evt){
    this.setData({
      searchValue: evt.detail.value
    })
  },
  searchByID:function(){
    this.setData({
      isByID:true
    })
  },
  searchByName:function(){
    this.setData({
      isByID:false
    })
  },
  search:function(){
    wx.navigateTo({
      url: '../search/search?isByID='+ this.data.isByID+'&searchValue='+this.data.searchValue,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})