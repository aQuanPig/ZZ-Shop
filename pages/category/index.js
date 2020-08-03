// pages/category/index.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryTitle: [],
    categoryContent: [],
    currentIndex: 0,
    // 右侧滚动条距离顶部的距离
    scrollTop:0
  },
  async getCategoryData() {
    const result = await request({
      url: "/categories"
    })
    const categories = result
    //把接口的数据存入到本地存储中
    wx.setStorageSync("categories",{time:Date.now(),data:categories})
    this.setData({
      categoryTitle: categories.map(item => {
        return item.cat_name
      }),
      categoryContent: categories.map(item => {
        return item.children
      })
    })
  },
  // 左侧菜单的点击事件
  handleItemTap(e) {
    /**
     * 1.获取被点击的标题的索引
     * 2.给data中的currentIndex赋值
     */
    const { index } = e.currentTarget.dataset
    this.setData({
      currentIndex: index,
      scrollTop:0
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 1.先判断本地存储中有没有旧的数据
     *  {time:Date.now(),data:[...]]}
     * 2.没有旧数据，直接发送新请求
     * 3.有旧的数据，并且旧的数据没有过期就使用本地存储中的旧数据即可
     */
    // 1.获取本地存储的数据（小程序也是存在本地存储）
    const Categories = wx.getStorageSync("categories")
    // 2.判断
    if (!Categories) {
      // 获取分类数据
      this.getCategoryData();
    }else {
      // 本地存储中有数据，定义过期时间：10s
      if(Date.now()-Categories.time>1000*60*5){
        // 重新发送请求
        this.getCategoryData();
      } else {
        this.setData({
          categoryTitle: Categories.data.map(item => {
            return item.cat_name
          }),
          categoryContent: Categories.data.map(item => {
            return item.children
          })
        })
      }
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