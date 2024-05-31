//index.js
//获取应用实例
const app = getApp()

//Page Object
Page({
  data: {
    avatarUrl: "",
    nickName: "",
    ispassword: true,
    account: "",
    password: ""

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
  changesEye: function () {
    this.setData({
      ispassword: !this.data.ispassword
    })
  },
  onLoad: function (options) {
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      nickName: app.globalData.userInfo.nickName
    })
  },


  login: function () {
    wx.request({
      url: 'http://localhost:8080/api/query',
      data: {
        account: this.data.account
      },
      method: 'GET',
      success: (res) => {
        if (res.data.is_account) {
          if (this.data.account == res.data.data.account && this.data.password == res.data.data.password) {
            app.globalData.isLogin = true
            app.globalData.account = this.data.account
            wx.navigateBack({
              delta: 5
            });
          } else {
            wx.showToast({
              title: '密码错误！',
              icon:"none",
              duration: 1500,
            });
          }
        } else {
          wx.showToast({
            title: '账号或密码错误！',
            icon:"none",
            duration: 1500,
          });
        }
      },
    });
  },
  register:function(){
    wx.navigateTo({
      url: '../register/register',
    });
  },
  onLaunch:function(){
    wx.login({
      success (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://example.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  }
})
