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

/**
 * 商品收藏
 *   1.页面onShow的时候，加载缓存中的商品收藏的数据
 *   2.判断当前商品是否收藏
 *     * 是：改变页面图标
 *     * 不是：.....
 *   3.点击商品收藏按钮
 *     * 判断该商品是否存在于缓存数组中
 *     * 存在的话，把该商品删除
 *     * 不存在，把商品添加到收藏数组中，存入到缓存中
 */

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDeatilData: {},
    isCollect: false
  },
  goodsInfo: {},
  async getGoodsDetailData(id) {
    const res = await request({
      url: "/goods/detail",
      data: id
    })
    this.goodsInfo = {
      goods_name: res.goods_name,
      goods_price: res.goods_price,
      pics: res.pics,
      goods_id: id.goods_id,
      num: 0,
      isChecked: true
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
  onShow() {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1]
    console.log(currentPage)
    let options = currentPage.options
    this.getGoodsDetailData(options)
    // 1.获取缓存中的购物车数据
    let collect = wx.getStorageSync("collect") || [];
    // 2.判断该商品是否存在于缓存数组中
    // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）
    let isCollect = collect.some(item => {
      return item.goods_id === options.goods_id
    })
    this.setData({
      goodsInfo: options.goods_id,
      isCollect
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
        mask: true
      })
    } else {
      // 存在
      cart[index].num++;
      wx.showToast({
        title: '商品数量+1',
        icon: 'success',
        mask: true
      })
    }
    wx.setStorageSync("cart", cart);
  },
  // 收藏事件
  handleCollect() {
    // 1.获取缓存中的购物车数据
    let collect = wx.getStorageSync("collect") || [];
    // 2.判断该商品是否存在于缓存数组中
    let index = collect.findIndex(item => {
      return item.goods_id === this.goodsInfo.goods_id
    })
    if (index === -1) {
      // 表示商品不存在于缓存数组中
      collect.push(this.goodsInfo)
      wx.showToast({
        title: '收藏成功',
        mask: true
      });
    } else{
      // 表示商品存在于缓存数组中,删除该商品
      //splice修改原数组
      collect.splice(index,1)
      wx.showToast({
        title: '取消收藏',
        mask: true
      });
    }
    //把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    this.setData({
      isCollect:!this.data.isCollect
    })
  }
})