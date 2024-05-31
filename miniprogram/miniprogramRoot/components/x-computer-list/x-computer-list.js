// components/x-computer-list/x-computer-list.js
let fristTouchX = 0;
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    computerItems:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isOpen:false,
    fristSrc:""
  },

lifetimes:{
  attached: function() {
    // 在组件实例进入页面节点树时执行
    this.setData({
      fristSrc:JSON.parse(this.properties.computerItems.imgSrc)[0]
    })
  },
  detached: function() {
    // 在组件实例被从页面节点树移除时执行
  },
},
moved:function(){
  this.setData({
    isOpen:false
  })
},
  /**
   * 组件的方法列表
   */
  methods: {
    handlerstart:function(evt){
      if(this.data.isOpen){
        this.setData({
          isOpen:false
        })
      }
      fristTouchX = evt.changedTouches[0].pageX
    },
    handlerend:function(evt){
      let cha = evt.changedTouches[0].pageX - fristTouchX
      if(cha<-50){
        this.setData({
          isOpen:true
        })
      }else if (cha > 50){
        this.setData({
          isOpen:false
        })
      }else{
        this.setData({
          isOpen:this.data.isOpen
        })
      }
    },
    showInfo:function(evt){
      wx.navigateTo({
        url: '../typeInfo/typeInfo?computerId='+evt.target.id,
      });
    },
    changeType:function(evt){
      wx.navigateTo({
        url: '../editTypeInfo/editTypeInfo?computerId='+evt.target.id,
      });
    },
    deleteType:function(evt){
      wx.request({
        url: 'http://localhost:8080/api/deleteType',
        data: {
          computerId:evt.target.id
        },
        success: (result)=>{
         if(result.data.success){
          wx.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 1500,
          });
          app.globalData.ComputerTypeList=result.data.data
          this.fresh();
         }
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    },
    fresh:function(){
      this.triggerEvent("customevent",{})
    }
  }
})
