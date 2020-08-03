// pages/user/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
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
    // wx.switchTab({
    //   url: '/pages/index/index'
    // });
  },
  onShow(){
    const userInfo = wx.getStorageSync("userinfo");
    this.setData({
      userInfo
    })
    console.log('onShow')
  },
  onHide(){
    console.log('onHide')
  },
  hhhh(){
    wx.showModal({
      title: 'ok',
      content: 'dd',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  }
})