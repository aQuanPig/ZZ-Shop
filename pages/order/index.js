// pages/order/index.js
/**
 * 1.页面被打开的时候 onShow
 *  (1) 获取url上的参数
 *  (2) 根据type去发送请求获取订单数据
 *  (3) 渲染页面
 * 2.点击不同标题的时候，也需要重新发请求获取数据
 */
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: [
      { id: 0, name: "全部", isActive: true },
      { id: 1, name: "待付款", isActive: false },
      { id: 2, name: "待发货", isActive: false },
      { id: 3, name: "退款/退货", isActive: false }
    ],
    currentIndex:0,
    orderList: []
  },
  changeTitleByIndex(index) {
    let { titles } = this.data
    titles.forEach((item, indey) => {
      index === indey ? item.isActive = true : item.isActive = false
    })
    this.setData({
      titles
    })
  },
  tabItemChange(e) {
    // 1.获取被点击的标题索引
    const { index } = e.detail
    // 2.重新发送请求 type=1 --> index=0
    this.changeTitleByIndex(index)
    this.getOrder(index+1)
    this.setData({
      currentIndex:index
    })
  },
  async getOrder(type) {
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
    const num = parseInt(type)
    const res = await request({
      url: "/my/orders/all",
      header: { Authorization: token },
      data: { type: num }
    })
    this.setData({
      orderList: res.orders.map(item=>{
        return {...item,create_time:new Date(item.create_time*1000).toLocaleString().replace(/\//g,"-")}
      })
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 1.获取当前小程序的页面栈-数组 长度最大是10

    const pages = getCurrentPages();
    // 2.数组中索引最大的页面就是当前页面
    let { type } = pages[pages.length - 1].options
    // 3.激活选中标题
    this.changeTitleByIndex(parseInt(type) - 1)
    this.getOrder(type)

  },

})