import {require} from "../../request/index"
import regeneratorRuntime from "../../libs/runtime/runtime"

Page({
  data: {
    tabs: [{
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "待发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
    orders:[]
  },
  onShow(){
    const token = wx.getStorageSync('token')
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth',
      })
      return
    }
    // 获取当前页面栈
    let pages = getCurrentPages()
    let currentPage = pages[pages.length - 1]
    let { type } = currentPage.options
    this.handleTabsItem(type-1)
    this.getOrder(type)
  },
  async getOrder(type){
    const res = await require({
      url:"/my/orders/all",
      data:{ type }
    })
    // console.log(res.orders);
    this.setData({
      orders:res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  },
  handleTabs(e) {
    const {index} = e.detail
    let {tabs} = this.data
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
    this.getOrder(index+1)
  },
  // 根据标题索引激活标题数组
  handleTabsItem(index){
    let {tabs} = this.data
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
  }
})