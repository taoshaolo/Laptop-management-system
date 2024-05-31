// pages/editTypeInfo/editTypeInfo.js
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
    newImgSrc: [],
    newuploder_imgs:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://localhost:8080/api/foundByComputerId',
      data: {
        computerId:options.computerId
      },
      success: (result)=>{
        let computer = result.data.data[0]
        this.setData({
          computerId:computer.computerId,
          name:computer.name,
          brand:computer.brand,
          type:computer.type,
          prices:computer.prices,
          mainBoard:computer.mainBoard,
          graphicsCard:computer.graphicsCard,
          hardDisk:computer.hardDisk,
          internalStorage:computer.internalStorage,
          cpu:computer.cpu,
          merchant:computer.merchant,
          imgSrc:JSON.parse(computer.imgSrc),
          newImgSrc:JSON.parse(computer.imgSrc),
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
          uploder_imgs: result.tempFilePaths,
          newImgSrc:this.data.newImgSrc.concat(result.tempFilePaths)
        })

      },
      fail: () => {},
      complete: () => {}
    });

  },
  deletaimg: function (evt) {
    this.data.imgSrc.splice(evt.target.id, 1)
    this.data.newImgSrc.splice(evt.target.id, 1)
    this.setData({
      imgSrc: this.data.imgSrc,
      newImgSrc: this.data.newImgSrc
    })
  },
  addComputer: function () {
    let thdata = this.data
    if(thdata.computerId!=""&&thdata.name!=""&&thdata.brand!=""&&thdata.type!=""&&thdata.prices!=""&&thdata.mainBoard!=""&&thdata.graphicsCard!=""&&thdata.hardDisk!=""&&thdata.internalStorage!=""&&thdata.cpu!=""&&thdata.merchant!=""&&thdata.newImgSrc!=[]){
      let time = new Date();
      if(this.data.imgSrc.length == this.data.newImgSrc.length){
        this.requestChange()
      }
    for (let i = 0; i < this.data.uploder_imgs.length; i++) {
      let str = this.data.uploder_imgs[i].substr(this.data.uploder_imgs[0].lastIndexOf("."))
      wx.cloud.uploadFile({
        cloudPath: 'computerImg/' + time.getFullYear() + (time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1) + (time.getDate() < 10 ? '0' + time.getDate() : time.getDate()) + time.getHours() + time.getMinutes() + time.getSeconds() + ((Math.random() * 100).toFixed(0)) + str,
        filePath: this.data.uploder_imgs[i], // 文件路径
      }).then(res => {
        this.data.newuploder_imgs.push(res.fileID)
        console.log("newuploder_imgs",this.data.newuploder_imgs)
        console.log("imgSrc",this.data.imgSrc)
        console.log("newImgSrc",this.data.newImgSrc)
        let len = this.data.newImgSrc.length - this.data.imgSrc.length
        console.log(len)
        console.log(this.data.newuploder_imgs.length)
        setTimeout(() => {
          if (this.data.newuploder_imgs.length === len) {
            console.log(this.data.newuploder_imgs.concat(this.data.imgSrc))
            this.requestChange()
          }
        }, 500);
      }).catch((err) => {})
    }
    }else{
      wx.showToast({
        title: '缺少参数',
        icon: 'none',
        duration: 1500,

      });
    }

  },
  requestChange:function(){
    wx.request({
      url: 'http://localhost:8080/api/changeType',
      data: {
        computerId: this.data.computerId,
        name: this.data.name,
        brand: this.data.brand,
        type: this.data.type,
        prices: this.data.prices,
        mainBoard: this.data.mainBoard,
        graphicsCard: this.data.graphicsCard,
        hardDisk: this.data.hardDisk,
        internalStorage: this.data.internalStorage,
        cpu: this.data.cpu,
        merchant: this.data.merchant,
        imgSrc: this.data.newuploder_imgs.concat(this.data.imgSrc),
      },
      method: 'GET',
      success: (result)=>{
        wx.showToast({
          title: '修改成功',
          duration: 1500,
        });
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          });
        }, 1500);
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})