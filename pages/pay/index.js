// pages/pay/index.js
import { getSetting, openSetting, chooseAddress } from '../../utils/asyncWX'
/**
 * 获取用户收货地址
 *  * 绑定点击事件
 *  * 获取用户对小程序所授予获取地址的权限状态scope
 *    * 假设用户点击获取收获地址的提示框 
 *      * 确定：scope为true authSetting: {scope.address: true} 直接获取收获地址
 *      * 取消：scope为false
 *        * 诱导用户自己打开授权设置页面(openSetting) 当用户重新给与获取地址权限的时候
 *        * 获取收货地址
 *    * 假设用户从未点击获取收获地址的提示框 
 *      * scope为undefined authSetting: {scope.address: undefined} 直接获取收获地址
 */
/**
 * 微信支付：
 *  * 哪些人 哪些账号 可以实现微信支付
 *    * 企业账号
 *    * 企业账号的小程序后台中必须给开发者添加上白名单
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    goods: [],
    totalPrice: 0
  },
  onShow() {
    const address = wx.getStorageSync("address");
    const goods = wx.getStorageSync("payGoods");
    const totalPrice = goods.reduce((preValue, now) => {
      return preValue + now.goods_price * now.num
    }, 0)
    this.setData({
      address,
      goods,
      totalPrice
    })
  },
  async selectAddress() {
    try {
      // 1.获取用户对小程序所授予获取地址的权限状态scope
      const userSetting = await getSetting()
      const scopeAddress = userSetting.authSetting["scope.address"]
      // 2.判断权限状态
      if (scopeAddress === false) {
        // 用户拒接过授予权限，诱导用户打开授权界面
        await openSetting();
      }
      // 3.调用获取地址API
      const address = await chooseAddress();
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error)
    }
  },
  handlePay(){
    wx.showToast({
      title: '暂时不支持支付功能~',
      icon: 'none',
      mask: true
    });
  }
})