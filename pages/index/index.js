import { require } from "../../request/index"
const app = getApp()
Page({
  data: {
    swiperList:[],
    cateList:[],
    floorList:[]
  },
  onLoad:function(){
    this.getSwiperList(),
    this.getCateList(),
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList(){
    var that = this
    require({
      url:'/home/swiperdata'
    }).then(res=>{
      that.setData({
        swiperList:res
      })
    })
  },
  // 获取导航数据
  getCateList(){
    var that = this
    require({
      url:"/home/catitems"
    }).then(res=>{
      that.setData({
        cateList:res
      })
    })
  },
  // 获取楼层数据
  getFloorList(){
    var that = this
    require({
      url:"/home/floordata"
    }).then(res=>{
      that.setData({
        floorList : res
      })
    })
  }
})
