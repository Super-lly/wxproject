// pages/cart/cart.js
Page({
  data: {
    userAddress: {},
    cart: [],
    allChecked : false,
    totalPrice:0,
    totalNum:0
  },
  onShow() {
    // 获取缓存中用户地址
    let userAddress = wx.getStorageSync('address')
    // 获取缓存中购物车地址
    const cart = wx.getStorageSync('cart') || []
    this.setCart(cart)
    // 设置用户地址
    if (userAddress != '') {
      userAddress.all = userAddress.provinceName + userAddress.cityName + userAddress.countyName + userAddress.detailInfo 
      this.setData({
        userAddress,
      })
    }
  },
  onLoad: function (options) {

  },
  // 获取用户地址权限并获取信息
  getAddress() {
    wx.getSetting({
      success(res) {
        const scopeAddress = res.authSetting["scope.address"]
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success(res) {
              wx.setStorageSync('address', res)
            }
          })
        } else {
          wx.openSetting({
            success() {
              wx.chooseAddress({
                success(res) {
                  wx.setStorageSync('address', res)
                }
              })
            }
          })
        }
      }
    })
  },
  // 设置单个商品的点击
  itemChange(e){
    const goods_id = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id === goods_id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 全中状态、价格、数量重新计算，重新设置回缓存和data
  setCart(cart){
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v=>{
      if(v.checked){
        totalNum += v.num
        totalPrice += v.num * v.goods_price
      }else{
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    wx.setStorageSync('cart', cart)
  },
  // 设置全选按钮
  changeCheck(){
    let { cart,allChecked } = this.data
    allChecked = !allChecked
    cart.forEach(v=>v.checked = allChecked)
    this.setCart(cart)
  },
  // 设置加减按钮功能
  addNum(e){
    let goods_id = e.currentTarget.dataset.id
    let { cart } = this.data 
    let index = cart.findIndex(v=>v.goods_id === goods_id)
    cart[index].num++
    this.setCart(cart)
  },
  subNum(e){
    let goods_id = e.currentTarget.dataset.id
    let { cart } = this.data 
    let index = cart.findIndex(v=>v.goods_id === goods_id)
    if(cart[index].num>0){
      cart[index].num--
      this.setCart(cart)
    }else{
      wx.showModal({
        title:'是否移除该商品？',
        cancelText:'取消',
        confirmText:'确定',
        confirmColor:'#eb4450',
        success:(res)=>{
          if(res.confirm){
            cart.splice(index, 1)
            this.setCart(cart)
          }
        }
      })
    }
  },
  // 结算按钮功能
  toPay(){
    const { userAddress, totalNum } = this.data
    if(!userAddress.userName){
      wx.showToast({
        title: '请选择收货地址',
        icon:'error',
        mask:true
      })
    }else if(totalNum == 0){
      wx.showToast({
        title: '您没有选择商品',
        icon:'error',
        mask:true
      })
    }else{
      wx.navigateTo({
        url: '../pay/pay',
      })
    }
  }
})