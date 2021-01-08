// pages/cart/index.js
/* 
1 获取用户的收货地址
  1 绑定点击事件
  2 调用小程序内置 api  获取用户的收货地址  wx.chooseAddress

  2 获取 用户 对小程序 所授予 获取地址的  权限 状态 scope
    1 假设 用户 点击获取收货地址的提示框 确定  authSetting scope.address 
      scope 值 true 直接调用 获取收货地址
    2 假设 用户 从来没有调用过 收货地址的api 
      scope undefined 直接调用 获取收货地址
    3 假设 用户 点击获取收货地址的提示框 取消   
      scope 值 false 
      1 诱导用户 自己 打开 授权设置页面(wx.openSetting) 当用户重新给与 获取地址权限的时候 
      2 获取收货地址
    4 把获取到的收货地址 存入到 本地存储中  
 */


 //点击事件优化
 import { getSetting,openSetting,chooseAddress } from "../../utils/asyncWX.js";
 import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


    //点击收货地址事件
    //使用es7优化
    handleChooseAddress(){
      //获取 用户 对小程序 所授予 获取地址的  权限 状态 scope
      const res1=await getSetting();
      //属性名怪异的时候都是由[""]形式来获取属性值
      const scopeAddress=res1.authSetting["scope.address"];
        /*
         * 1 假设 用户 点击获取收货地址的提示框 确定  authSetting scope.address 
         *   scope 值 true 直接调用 获取收货地址
         * 2 假设 用户 从来没有调用过 收货地址的api 
         *   scope undefined 直接调用 获取收货地址  
         * 
         */ 
      if (scopeAddress===true||scopeAddress===undefined) {
        //获取收货地址
        const res2=await chooseAddress();
      }else{
       /* 
        * 3 假设 用户 点击获取收货地址的提示框 取消   
        *   scope 值 false 
        *   1 诱导用户 自己 打开 授权设置页面(wx.openSetting) 当用户重新给与 获取地址权限的时候 
        *   2 获取收货地址 
        */        
        await openSetting();
        //获取收货地址
        const res3=await chooseAddress();
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