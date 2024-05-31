// pages/register/register.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ispassword: true,
    account: "",
    password: "",
    repassword:"",
    isRepassword:true
  },


  getAccount: function (evt) {
    this.setData({
      account: evt.detail.value
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
  onLoad: function (options) {
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    })
  },
  register: function () {
   if(this.data.password === this.data.repassword){
      wx.request({
        url: 'http://localhost:8080/api/register',
        data: {
          openid:app.globalData.openid,
          account:this.data.account,
          password:this.data.password,
          userInfo:app.globalData.userInfo
        },
        method: 'GET',
        success: (result)=>{
          if(result.data.msg == "success"){
            wx.showToast({
              title: '注册成功',
              icon: 'none',
              duration: 1500,
              success: (result)=>{
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  });
                }, 1000);
              },
            });
          }else{
            wx.showToast({
              title: '账号已存在',
              icon: 'none',
              duration: 1500,
            });
          }
        },

      });
   }else{
     wx.showToast({
       title: '密码不一致！',
       icon: 'none',
       duration: 1500,
     });
   }
  },
  getUserInfo() {
    wx.getUserProfile({
      desc: '获取用户信息',
      success: (res) => {
        console.log(res.userInfo);
        // 将用户信息添加到 app.globalData.userInfo 对象中
        app.globalData.userInfo = {
          ...app.globalData.userInfo,
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        },
        this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        });
      }
    })
  }
})
