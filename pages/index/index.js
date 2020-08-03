import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList: [],
    // 导航菜单
    categoryList:[],
    // 楼层
    floorList:[]
  },
  /**
   * 网络请求的代码
   * @param {*} options 
   */
  async getSwiperListData(){
    const swiper = await request({
      url: '/home/swiperdata'
    })
    this.setData({
      swiperList:swiper
    })
  },
  async getCategoryListData(){
    const category = await request({
      url: '/home/catitems'
    })
    this.setData({
      categoryList:category
    })
  },
  async getFloorListData(){
    const floor = await request({
      url: '/home/floordata'
    })
    this.setData({
      floorList:floor
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播图数据
    this.getSwiperListData()
    // 获取导航菜单数据
    this.getCategoryListData()
    // 获取楼层数据
    this.getFloorListData()
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