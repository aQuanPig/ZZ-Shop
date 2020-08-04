// pages/goods_list/index.js
import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      { id: 0, name: "综合",isActive:true },
      { id: 1, name: "销量",isActive:false  },
      { id: 2, name: "价格",isActive:false  }
    ],
    currentIndex:0,
    queryParams:{
      query:"",
      cid:"",
      pagenum:1,
      pagesize:10
    },
    goodsList:[],
    totalPages:1
  },
  async getGoodsListData(){
    const result = await request({
      url:"/goods/search",
      data:this.data.queryParams
    })
    //获取总条数
    const total = result.total
    this.data.totalPages = Math.ceil(total / this.data.queryParams.pagesize)
    this.setData({
      goodsList:[...this.data.goodsList,...result.goods]
    })
  },
  handleItemChange(e) {
    const{tabs} = this.data
    const { index } = e.detail;
    tabs.forEach((item, indey) => {
      index === indey ? item.isActive = true : item.isActive = false
    })
    this.setData({
      currentIndex:index,
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      queryParams:{...this.data.queryParams,cid:options.cid||"",query:options.query||""}
    })
    // 获取商品列表数据
    this.getGoodsListData()
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      queryParams:{...this.data.queryParams,pagenum:1},
      goodsList:[]
    })
    this.getGoodsListData()
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.queryParams.pagenum >= this.data.totalPages){
       wx.showToast({
         title: '没有数据啦~',
       })
    } else {
      const {pagenum} = this.data.queryParams
      this.setData({
        queryParams:{...this.data.queryParams,pagenum:pagenum+1}
      })
      this.getGoodsListData()

    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})