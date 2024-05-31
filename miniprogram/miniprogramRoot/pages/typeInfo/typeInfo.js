// pages/typeInfo/typeInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    computerType:'',
    imgSrc:''
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
        this.setData({
          computerType:result.data.data[0],
          imgSrc:JSON.parse(result.data.data[0].imgSrc)
        })
      }
    });
    console.log(options.computerId)
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

  }
})