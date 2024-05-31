// pages/about/about.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:"",
    nickName:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    })

  },
  changesPassword:function(){
    wx.navigateTo({
      url: '../changePassword/changePassword',
    });
  },
  showAppinfo:function(){
    wx.navigateTo({
      url: '../appInfo/appInfo',
    });
  }
})