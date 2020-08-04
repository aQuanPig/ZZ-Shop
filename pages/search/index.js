// pages/search/index.js
import { request } from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isInput: false,
    value: '',
    goods: [],
    hasGoods:true
  },
  timeId: 0,
  handleInput(e) {
    const { value } = e.detail
    if (!value.trim()) {
      this.setData({
        goods:[],
        isInput:false
      })
      return;
    }
    if (value.length >= 1) {
      this.setData({
        isInput: true,
        value
      })
    }
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      this.qSearch(value)
    }, 1000)
  },
  // 发送请求获取搜索建议数据
  async qSearch(query) {
    const result = await request({
      url: "/goods/qsearch",
      data: { query }
    })
    this.setData({
      goods: result.splice(0, 10)
    })
    if(!result.length){
      this.setData({
        hasGoods:false
      })
    }
  },
  handleClear() {
    this.setData({
      value: "",
      isInput: false
    })
  },
  handleSearch(){
    wx.showToast({
      title: '暂不支持该功能哦~',
      mask:true,
      icon:"none"
    });
  }
})