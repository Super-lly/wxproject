import {require} from "../../request/index"
import regeneratorRuntime from "../../libs/runtime/runtime"
Page({
  data: {
    goodsDetailObj:{},
    collect:[],
    isCollect:false
  },
  goodsInfo:{},
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },
  async getGoodsDetail(goods_id){
    const goodsDetailObj = await require({
      url: '/goods/detail',
      data:{goods_id}
    })
    this.goodsInfo = goodsDetailObj
    const collect = wx.getStorageSync('collect')||[]
    const isCollect = collect.some(v=>v.goods_id === this.goodsInfo.goods_id)
    this.setData({
      goodsDetailObj,
      isCollect,
      goodsDetailObj:{
        pics:goodsDetailObj.pics,
        goods_price:goodsDetailObj.goods_price,
        goods_name:goodsDetailObj.goods_name,
        goods_introduce:goodsDetailObj.goods_introduce.replace(/\.webp/,'.jpg')
      }
    })
  },
  // 收藏功能
  iconChange(){
    let isCollect = false
    let collect = wx.getStorageSync('collect')||[]
    let index = collect.findIndex(v=>v.goods_id === this.goodsInfo.goods_id)
    if(index!=-1){
      collect.splice(index,1)
      isCollect = false
      wx.showToast({
        title: '取消收藏',
        icon:'success',
        mask:'true'
      })
    }else{
      collect.push(this.goodsInfo)
      isCollect=true,
      wx.showToast({
        title: '收藏成功',
        icon:'success',
        mask:'true'
      })
    }
    wx.setStorageSync('collect', collect)
    this.setData({
      isCollect
    })
  },
  handlepreview(e){
    const url = this.goodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      urls : url,
      current
    })
  },
  cartAdd(){
    const cart = wx.getStorageSync('cart') || []
    let index = cart.findIndex(v=>v.goods_id === this.goodsInfo.goods_id)
    if(index === -1){
      this.goodsInfo.num = 1
      this.goodsInfo.checked = true
      cart.push(this.goodsInfo)
    } else{
      cart[index].num++
    }
    wx.setStorageSync("cart",cart)
    wx.showToast({
      title: '添加成功',
      mask:true,
      icon:'success'
    })
  }
})