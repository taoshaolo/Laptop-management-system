//app.js
App({
  onLaunch: function () {
    if (wx.cloud) {
      wx.cloud.init({
        env: 'tao-1gsl0xiy85c1873f',
        traceUser: true
      })
    }
    
    // 展示本地存储能力


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'http://localhost:8080/api/getOpenid',
          data: {
            code:res.code,
            from:"wx33a198c2646b55f8"
          },
          success: (result)=>{
            wx.setStorageSync("openid",result.data.openid) 
            this.globalData.openid = result.data.openid
          }
        });
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              wx.navigateTo({
                url: '../../pages/login/login',
                success:()=>{
                  this.globalData.isload = true
                }
              })
            }
          })
        }else{
          wx.navigateTo({
            url: '../../pages/authorization/authorization',
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    isLogin:false,
    isload:false,
    openid:"",
    ComputerTypeList:[],
    account:""
  }
})