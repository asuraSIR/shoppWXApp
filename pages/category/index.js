// pages/category/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //左侧菜单列表
    leftMenuList:[],
    //右侧商品数据
    rightContent:[],
    //被点击的左侧菜单
    currentIndex:0,
    //右侧滚动条顶部距离
    scrollTop:0

  },
  //接口的返回数据
  categoryList:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*
     * 判断本地有没有旧数据{time:Date.now(),data[...]}
     * 没有 直接发送请求
     * 有   判断有没有过期
     *      过期   发送请求重新加载
     *     没过期  直接使用
     */

     //获取本地缓存数据
     const Cates = wx.getStorageSync("cates");
     //判断是否存在
     if(!Cates){
       //不存在
       this.getCategoryList();
     }else{
       //存在
       if(Date.now()-Cates.time>1000*10){
        this.getCategoryList();
       }else{
         this.categoryList  = Cates.data;

         //构造左侧菜单数据
         let leftMenuList=this.categoryList.map(v=>v.cat_name);
         //构造右侧商品数据
         let rightContent=this.categoryList[0].children;
         this.setData({
           leftMenuList,
           rightContent
         })
       }
     }
    

  },
  /*
   * 使用普通方法发送请求
  getCategoryList(){
    request({url:"/categories"})
    .then(res=>{
      this.categoryList=res.data.message;

      //把数据存入本地缓存
      wx.setStorageSync("cates", {time:Date.now(),data:this.categoryList});


      //构造左侧菜单数据
      let leftMenuList=this.categoryList.map(v=>v.cat_name);
      //构造右侧商品数据
      let rightContent=this.categoryList[0].children;
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  */

  //使用es7的async语法发送请求
  async getCategoryList(){
    //使用es7的async await 来发送请求
    const res=await request({url:"/categories"});
    this.categoryList=res.data.message;

    //把数据存入本地缓存
    wx.setStorageSync("cates", {time:Date.now(),data:this.categoryList});


    //构造左侧菜单数据
    let leftMenuList=this.categoryList.map(v=>v.cat_name);
    //构造右侧商品数据
    let rightContent=this.categoryList[0].children;
    this.setData({
      leftMenuList,
      rightContent
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

  },
  /**
   * 左侧菜单点击事件
   */
  handleItemTap(e){
    /*
     * 获取点击标题上的索引
     * 给Data中的currentIndex赋值
     * 根据不同的索引渲染右侧的商品信息
     */
    const {index} = e.currentTarget.dataset;
    //右侧数据跳转
    let rightContent=this.categoryList[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      //重新设置右侧内容框scroll-view标签scroll-top="{{scrollTop}}"的值
      scrollTop:0
    })
    
  }
})