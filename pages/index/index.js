// pages/index/index.js
//引入 用了发送请求的方法 路径全写
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数字
    swiperList:[],
    //导航数组
    catesList:[],
    //楼层数组
    floorList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();

  },
  //获取楼层数据
  getFloorList(){
    request({url:"/home/floordata"}).then(result=>{
      this.setData({
        floorList:result.data.message
      })
    })
  },
  //获取导航信息
  getCatesList(){
    request({url:"/home/catitems"})
    .then(result=>{
      this.setData({
        catesList:result.data.message
      })
    })

  },

  //获取轮播图
  getSwiperList(){
    //1.发送异步请求
    //wx.request({
    //  url: '/home/swiperdata',
    //  success: (result)=>{
    //    this.setData({
    //      swiperList:result.data.message
    //    })
    //  }
    //});
    request({url:"/home/swiperdata"})
    .then(result=>{
      this.setData({
        swiperList:result.data.message
      })
    })

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