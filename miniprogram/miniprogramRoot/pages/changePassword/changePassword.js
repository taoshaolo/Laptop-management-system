// pages/changePassword/changePassword.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOldPassword: true,
    ispassword: true,
    isRepassword:true,
    oldpassword: "",
    password: "",
    repassword:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    if (!app.globalData.isLogin && app.globalData.isload && app.globalData.userInfo !== null) {
      wx.navigateTo({
        url: '../login/login'
      });
    }
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
  getOldPassword: function (evt) {
    this.setData({
      oldpassword: evt.detail.value
    })
  },
  getPassword: function (evt) {
    this.setData({
      password: evt.detail.value
    })
  },
  getRepassword: function (evt) {
    this.setData({
      repassword: evt.detail.value
    })
  },
  changesEye: function () {
    this.setData({
      ispassword: !this.data.ispassword
    })
  },
  changesReEye: function () {
    this.setData({
      isRepassword: !this.data.isRepassword
    })
  },

  register: function () {
   if(this.data.password === this.data.repassword){
     wx.request({
       url: 'http://localhost:8080/api/changePassword',
       data: {
        account:app.globalData.account,
        password:this.data.password
       },

       success: (result)=>{
         wx.showToast({
           title: '修改成功',
           success: (result)=>{
             app.globalData.isLogin=false
            setTimeout(() => {
              wx.navigateTo({
                url: '../login/login'
              });
            }, 1000);
           },
           fail: ()=>{},
           complete: ()=>{}
         });
       },
       fail: ()=>{},
       complete: ()=>{}
     });
   }
  },
})