// pages/user/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    collectNum:0
  },
  /**
   * 获取用户信息
   * @param {*} e 
   */
  handleGetuserinfo(e){
    const {userInfo} = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    this.setData({
      userInfo
    })
  },
  onShow(){
    const userInfo = wx.getStorageSync("userinfo") || [];
    const collect = wx.getStorageSync("collect") || []
    this.setData({
      userInfo,
      collectNum:collect.length
    })
  },
  handleRefund(){
    wx.showToast({
      title: '暂不支持该功能~',
      mask: true
    });
  }
})