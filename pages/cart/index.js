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
2 页面加载完毕
  0 onLoad  onShow 
  1 获取本地存储中的地址数据
  2 把数据 设置给data中的一个变量
3 onShow 
  0 回到了商品详情页面 第一次添加商品的时候 手动添加了属性
    1 num=1;
    2 checked=true;
  1 获取缓存中的购物车数组
  2 把购物车数据 填充到data中
4 全选的实现 数据的展示
  1 onShow 获取缓存中的购物车数组
  2 根据购物车中的商品数据 所有的商品都被选中 checked=true  全选就被选中
5 总价格和总数量
  1 都需要商品被选中 我们才拿它来计算
  2 获取购物车数组
  3 遍历
  4 判断商品是否被选中
  5 总价格 += 商品的单价 * 商品的数量
  5 总数量 +=商品的数量
  6 把计算后的价格和数量 设置回data中即可
6 商品的选中
  1 绑定change事件
  2 获取到被修改的商品对象
  3 商品对象的选中状态 取反
  4 重新填充回data中和缓存中
  5 重新计算全选。总价格 总数量。。。
7 全选和反选
  1 全选复选框绑定事件 change
  2 获取 data中的全选变量 allChecked
  3 直接取反 allChecked=!allChecked
  4 遍历购物车数组 让里面 商品 选中状态跟随  allChecked 改变而改变
  5 把购物车数组 和 allChecked 重新设置回data 把购物车重新设置回 缓存中 
8 商品数量的编辑
  1 "+" "-" 按钮 绑定同一个点击事件 区分的关键 自定义属性 
    1 “+” "+1"
    2 "-" "-1"
  2 传递被点击的商品id goods_id
  3 获取data中的购物车数组 来获取需要被修改的商品对象
  4 当 购物车的数量 =1 同时 用户 点击 "-"
    弹窗提示(showModal) 询问用户 是否要删除
    1 确定 直接执行删除
    2 取消  什么都不做 
  4 直接修改商品对象的数量 num
  5 把cart数组 重新设置回 缓存中 和data中 this.setCart
9 点击结算
  1 判断有没有收货地址信息
  2 判断用户有没有选购商品
  3 经过以上的验证 跳转到 支付页面！ 
 */


 //点击事件优化
  import regeneratorRuntime from '../../lib/runtime/runtime';
  import { getSetting,openSetting,chooseAddress } from "../../utils/asyncWX.js";
 
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
    console.log(11111111222);
  },
  // handleChooseAddress : function(){
  //   console.log(11111);
  //   wx.chooseAddress({
  //     success: (result)=>{
  //       console.log(result);
  //     },
  //     fail: (result)=>{
  //       console.log(result);
  //     },
  //     complete: ()=>{}
  //   });


  //   wx.getSetting({
  //     success: (result)=>{
  //       console.log(result);
  //     },
  //     fail: ()=>{},
  //     complete: ()=>{}
  //   });
  // },

    //点击收货地址事件
    //使用es7优化
    async handleChooseAddress(){
      try {
        //获取 用户 对小程序 所授予 获取地址的  权限 状态 scope
      const res1 = await getSetting();
      //属性名怪异的时候都是由[""]形式来获取属性值
      console.log(res1);
      const scopeAddress=res1.authSetting["scope.address"];
        /*
         * 1 假设 用户 点击获取收货地址的提示框 确定  authSetting scope.address 
         *   scope 值 true 直接调用 获取收货地址
         * 2 假设 用户 从来没有调用过 收货地址的api 
         *   scope undefined 直接调用 获取收货地址 
         * 3 假设 用户 点击获取收货地址的提示框 取消   
         *   scope 值 false  
         *   1 诱导用户 自己 打开 授权设置页面(wx.openSetting) 当用户重新给与 获取地址权限的时候
         *   2 获取收货地址 
         */ 
        //console.log(scopeAddress);
      if (scopeAddress===false) {      
        await openSetting();
      }
      //获取收货地址
      const res2=await chooseAddress();
      } catch (error) {
        console.log(error);
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