import {
  require
} from "../../request/index"
import regeneratorRuntime from "../../libs/runtime/runtime"
Page({
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  totalPages:1,
  Queryparmes: {
    query: "",
    cid: "",
    pagenum: "1",
    pagesize: "10"
  },
  onLoad: function (options) {
    this.Queryparmes.cid = options.cid||'',
    this.Queryparmes.query = options.query||'',
    this.getGoodsList()
  },
  async getGoodsList() {
    const res = await require({
      url: "/goods/search",
      data: this.Queryparmes
    })
    this.totalPages = Math.ceil(res.total / this.Queryparmes)
    this.setData({
      goodsList: [...this.data.goodsList,...res.goods]
    })
    wx.stopPullDownRefresh()
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
  },
  onReachBottom(){
    if(this.Queryparmes.pagenum >= this.totalPages){
      wx.showToast({
        title: '已经到底了',
        icon:'error'
      })
    }else{
      this.Queryparmes.pagenum++
      this.getGoodsList()
    }
  },
  onPullDownRefresh(){
    this.data.goodsList = []
    this.Queryparmes.pagenum = 1
    this.getGoodsList()
  }
})