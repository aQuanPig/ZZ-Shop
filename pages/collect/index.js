// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titles: [
      { id: 0, name: "商品收藏", isActive: true },
      { id: 1, name: "店铺收藏", isActive: false },
      { id: 2, name: "浏览足迹", isActive: false }
    ],
    collect:[]
  },
  tabItemChange(e) {
    // 1.获取被点击的标题索引
    const { index } = e.detail
    // 2.重新发送请求 type=1 --> index=0
    this.changeTitleByIndex(index)
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
  onShow(){
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      collect
    })
  }
})