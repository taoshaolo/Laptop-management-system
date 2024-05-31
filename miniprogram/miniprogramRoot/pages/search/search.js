// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ComputerTypeList: [],
    searchValue: "",
    isByID: true,
    isnofound: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      searchValue: options.searchValue,
    })
    if (options.isByID == "true") {
      this.setData({
        isByID: true
      })
    } else {
      this.setData({
        isByID: false
      })
    }
    this.search()
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
  getsearchvalue: function (evt) {
    this.setData({
      searchValue: evt.detail.value
    })
  },
  searchByID: function () {
    this.setData({
      isByID: true
    })
  },
  searchByName: function () {
    this.setData({
      isByID: false
    })
  },
  search: function () {
    if (this.data.isByID) {
      wx.request({
        url: 'http://localhost:8080/api/foundByComputerId',
        data: {
          computerId: this.data.searchValue
        },
        success: (result) => {
          if (result.data.data == null || result.data.data.length == 0) {
            this.setData({
              isnofound: true
            })
          } else {
            this.setData({
              ComputerTypeList: result.data.data
            })
          }
        }
      });
    } else {
      if (this.data.searchValue != "") {
        wx.request({
          url: 'http://localhost:8080/api/foundByName',
          data: {
            name: this.data.searchValue
          },
          success: (result) => {
            if (result.data.data == null || result.data.data.length == 0) {
              this.setData({
                isnofound: true
              })
            } else {
              this.setData({
                ComputerTypeList: result.data.data
              })
            }
          }
        });
      } else {
        this.setData({
          ComputerTypeList: result.data.data
        })
      }
    }
  }
})