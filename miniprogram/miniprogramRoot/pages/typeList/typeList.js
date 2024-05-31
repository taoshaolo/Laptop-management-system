// pages/typeList/typeList.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ComputerTypeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://localhost:8080/api/foundAll',
      data: {},
      success: (result)=>{
        app.globalData.ComputerTypeList=result.data
        this.setData({
          ComputerTypeList:app.globalData.ComputerTypeList
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    if (!app.globalData.isLogin && app.globalData.isload && app.globalData.userInfo !== null) {
      wx.navigateTo({
        url: '../login/login'
      });
    }
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
    wx.request({
      url: 'http://localhost:8080/api/foundAll',
      data: {},
      success: (result)=>{
        app.globalData.ComputerTypeList=result.data
        this.setData({
          ComputerTypeList:app.globalData.ComputerTypeList
        })
        wx.showToast({
          title: '刷新成功',
         
          duration: 1500,
          mask: false,
        });
        wx.stopPullDownRefresh()
      },
      fail: ()=>{},
      complete: ()=>{}
    });
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
  fresh:function(){
    this.onPullDownRefresh();
  }
})