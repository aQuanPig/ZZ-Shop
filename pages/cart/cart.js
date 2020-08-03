// pages/cart/cart.js
/**
 * 购物车全选功能：
 *  * onShow 获取缓存中的购物车数组
 *  * 根据购物车中的商品数据 所有的商品都被选中 ischecked = true
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: [],
    allCheck: false,
    totalPrice: 0,
    isChecked: [],
    isManage: false
  },
  onShow() {
    const cart = wx.getStorageSync("cart") || [];
    this.getTotalAndPrice(cart)
  },
  /**
   * 商品选中按钮的更改
   * @param {*} e 
   */
  handleCheckChange(e) {
    const { id } = e.currentTarget.dataset;
    const { cart } = this.data;
    let currentItem = cart.find(item => {
      return item.goods_id === id
    })
    currentItem.isChecked = !currentItem.isChecked
    this.setData({
      cart
    })
    wx.setStorageSync("cart", cart);
    this.getTotalAndPrice(cart)
  },
  /**
   * 获取总数量和总价格
   * @param {*} cart 
   */
  getTotalAndPrice(cart) {

    /**
     * every 方法为数组中的每个元素执行一次 callback 函数，直到它找到一个会使 callback 返回 false 的元素。如果发现了一个这样的元素，every 方法将会立即返回 false。否则，callback 为每一个元素返回 true
     */
    const isChecked = this.filterCheck(cart,true)
    const allChecked = cart.length ? cart.every(item => item.isChecked) : false
    const totalPrice = isChecked.reduce((preValue, nowValue) => {
      return preValue + nowValue.goods_price * nowValue.num
    }, 0)
    this.setData({
      cart,
      allCheck: allChecked,
      totalPrice,
      isChecked: isChecked
    })
  },
  /**
   * 全选按钮的反选
   */
  handleAllChecked() {
    const { cart } = this.data;
    cart.length && cart.forEach(item => {
      item.isChecked = !item.isChecked
    });
    this.getTotalAndPrice(cart)
  },
  /**
   * 商品数量的增加或减少
   */
  handleItemNumberEdit(e) {
    const { id, type } = e.currentTarget.dataset
    const { cart } = this.data
    const index = cart.findIndex(item => item.goods_id === id);
    /**
     * 如果num数量为1,type=-1时不能再减少
     */
    if (type === 1) {
      cart[index].num += type;
    } else if (type === -1) {
      if (cart[index].num !== 1) {
        cart[index].num += type;
      }
    }
    wx.setStorageSync("cart", cart);
    this.getTotalAndPrice(cart)
  },
  /**
   * 切换删除和购买管理
   */
  handleManageTap() {
    const {cart} = this.data
    cart.map(item=>{
      return item.isChecked=false
    })
    wx.setStorageSync("cart", cart);
    this.setData({
      isManage: !this.data.isManage,
      cart,
      allCheck:false
    })
  },
  handleDeleteGoods(){
    const {cart} = this.data;
    const isDelete = this.filterCheck(cart,true)
    if(isDelete.length){
      wx.showModal({
        title: '温馨提示',
        content: '确定将这些宝贝删除',
        cancelText:'我再想想',
        confirmText:'删除',
        cancelColor:'#333',
        confirmColor:'#EE6363',
        success: (res)=> {
          if (res.confirm) {
            const noDeleteGoods = this.filterCheck(cart,false)
            wx.setStorageSync("cart",noDeleteGoods)
            this.getTotalAndPrice(noDeleteGoods)
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else {
      wx.showToast({
        title: '您还没有选择宝贝哦',
        icon:'none'
      })
    }
  },
  filterCheck(cart,type){
    /**
     * type为true的时候，isChecked为true 
     */
    if(type){
      return cart.filter(item => {
        return item.isChecked === true
      })
    } else {
      return cart.filter(item => {
        return item.isChecked === false
      })
    }
  },
  // 点击结算功能
  handlePay(){
    const {isChecked} = this.data;
    wx.setStorageSync("payGoods", isChecked);
    if(isChecked){
      wx.navigateTo({
        url: '/pages/pay/index'
      });
    }else {
      wx.showToast({
        title: '你还没有选购商品~',
        icon:"none"
      });
    }
  }
})