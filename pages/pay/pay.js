import {require} from "../../request/index"
import regeneratorRuntime from "../../libs/runtime/runtime"
Page({
  data: {
    userAddress: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },
  onShow() {
    // 获取缓存中用户地址
    let userAddress = wx.getStorageSync('address')
    // 获取缓存中购物车地址
    let cart = wx.getStorageSync('cart') || []
    if (userAddress != '') {
      userAddress.all = userAddress.provinceName + userAddress.cityName + userAddress.countyName + userAddress.detailInfo
    }
    // 筛选出checked为选中状态的商品
    cart = cart.filter(v => v.checked)
    let totalPrice = 0
    let totalNum = 0
    // 计算总价格和总数量
    cart.forEach(v => {
      totalNum += v.num
      totalPrice += totalNum * v.goods_price
    })
    this.setData({
      userAddress,
      cart,
      totalNum,
      totalPrice
    })
  },
  // 结算按钮功能
  async getOrder() {
    try {
      const token = wx.getStorageSync('token')
      if (!token) {
        wx.navigateTo({
          url: '../auth/auth',
        })
      } else {
        const order_price = this.data.totalPrice
        const consignee_addr = this.data.userAddress.all
        const cart = this.data.cart
        let goods = []
        cart.forEach(v => goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        }))
        const orderParams = {order_price,consignee_addr,goods}
        const {order_number} = await require({
          url: "/my/orders/create",
          data: orderParams,
          method: 'POST'
        })
        const {pay} = await require({
          url: "/my/orders/req_unifiedorder",
          data: {order_number},
          method: "POST"
        })
        const requestPayment = (pay) => {
          return new Promise((resolve, reject) => {
            wx.requestPayment({
              ...pay,
              success(res) {
                resolve(res)
              },
              fail(err) {
                reject(err)
              }
            })
          })
        }
        await requestPayment(pay)
        const res = await require({
          url: "/my/orders/chkOrder",
          data: {order_numbe},
          method: "POST"
        })
        await wx.showToast({
          title: '支付成功',
        })
        let newCart = wx.getStorageSync('cart')
        newCart = newCart.filter(v=>!v.checked)
        wx.setStorageSync('cart', newCart)
        wx.navigateTo({
          url: '/pages/order/order',
        })
      }
    } catch (error) {
      await wx.showToast({
        title: '支付失败',
        icon:'error'
      })
      console.log(error);
    }
  }
})