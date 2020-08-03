import { request } from '../../request/index'
/**
 * 点击轮播图预览大图功能
 *  * 给轮播图绑定点击事件
 *  * 调用了小程序的API previewImage
 */

/**
 * 点击加入购物车
 *  * 绑定点击事件
 *  * 获取缓存中的购物车数据 数组格式存储
 *  * 判断 当前商品是否存在于购物车
 *    * 已经存在修改商品数据 执行购物车数量++ 重新把购物车数组填充回缓存中
 *    * 不存在于购物车的数组中 直接给购物车数组添加一个新元素，带上购买数量属性
 *  * 弹出提示
 */

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDeatilData: {}
  },
  goodsInfo:{},
  async getGoodsDetailData(id) {
    const res = await request({
      url: "/goods/detail",
      data: id
    })
    this.goodsInfo = {
      goods_name: res.goods_name,
      goods_price: res.goods_price,
      pics: res.pics,
      goods_id:id.goods_id,
      num: 0,
      isChecked:true
    }
    this.setData({
      goodsDeatilData: {
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        // iphone部分手机不识别webp图片格式
        goods_introduce: res.goods_introduce.replace(/\.webp/g, ".jpg"),
        pics: res.pics
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsDetailData(options)
    this.setData({
      goodsInfo: options.goods_id
    })
  },
  // 点击轮播图放大预览
  handlePreviewImg(e) {
    const { index } = e.currentTarget.dataset
    // 1.先构造要预览的图片数组
    const urls = this.data.goodsDeatilData.pics.map(item => {
      return item.pics_mid
    })
    wx.previewImage({
      current: urls[index], // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  // 点击加入购物车
  handleCartAdd() {
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(item => {
      return item.goods_id === this.goodsInfo.goods_id
    })
    if (index === -1) {
      // 不存在
      this.goodsInfo.num = 1
      cart.push(this.goodsInfo)
      wx.showToast({
        title: '添加购物车成功',
        icon: 'success',
        mask:true
      })
    } else {
      // 存在
      cart[index].num++;
      wx.showToast({
        title: '商品数量+1',
        icon: 'success',
        mask:true
      })
    }
    wx.setStorageSync("cart", cart);
  }

})