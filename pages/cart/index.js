// pages/cart/index.js

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
import { openSetting, chooseAddress, getSetting } from '../../utils/asyncWX'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleChooseAddress() {
    try {
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"]
      // 2.判断权限状态
      if (scopeAddress === false) {
        // 用户拒接过授予权限，诱导用户打开授权界面
        await openSetting();
      }
      // 3.调用获取地址API
      const address = await chooseAddress();
      wx.setStorageSync("address", address);
    } catch (err) {
      console.log(err)
    }
  }
})