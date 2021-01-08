import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: {}

  },
  GoodsInfo:{},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    //console.log(goods_id)
    this.getGoodsDetail(goods_id);

  },
  /*
   * 加入购物车
   *   1 先绑定点击事件
   *   2 获取缓存中的购物车数据 数组格式 
   *   3 先判断 当前的商品是否已经存在于 购物车
   *   4 已经存在 修改商品数据  执行购物车数量++ 重新把购物车数组 填充回缓存中
   *   5 不存在于购物车的数组中 直接给购物车数组添加一个新元素 新元素 带上 购买数量属性 num  重新把购物车数组 填充回缓存中
   *   6 弹出提示
   */
  handlrCarAdd(){
    //获取缓存中的购物车数据 数组格式
    let cart=wx.getStorageSync("cart")||[];
    //先判断 当前的商品是否已经存在于 购物车
    let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if (index===-1) {
      //不存在  添加
      this.GoodsInfo.num=1;
      cart.push(this.GoodsInfo);
    } else{
      //存在  num++
      cart[index].num++;
    }
    //把购物车放入缓存中
    wx.setStorageSync("cart",cart)
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      //true  1.5秒后才可以继续点击   防止用户手抖
      mask: true,
    });

  },
 /*
  * 点击轮播图放大预览
  *   1 给轮播图绑定点击事件
  *   2 调用小程序的api  previewImage 
  */
  handlePrevewImage(e){
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    //接收点击的图片路径
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current: current,// 当前显示图片的http链接
      urls: urls,// 需要预览的图片http链接列表
    });
  },
  //获取商品详情
  async getGoodsDetail(goods_id) {
    const res = await request({ url: "/goods/detail", data: { goods_id } });
    //console.log(res);
    this.GoodsInfo=res.data.message;
    this.setData({
      goodsDetail: {
        pics: res.data.message.pics,
        goods_price: res.data.message.goods_price,
        goods_name: res.data.message.goods_name,
        //.replace(/\.webp/g, '.jpg')改变图片格式
        goods_introduce: res.data.message.goods_introduce.replace(/\.webp/g, '.jpg'),

      }
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