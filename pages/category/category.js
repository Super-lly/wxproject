import {
  require
} from "../../request/index"
import regeneratorRuntime from "../../libs/runtime/runtime"
Page({
  data: {
    leftList: [],
    rightList: [],
    current: 0,
    scrollTop: 0
  },
  // 数据接口
  totalList: [],
  onLoad: function (options) {
    // 设置缓存
    const Cates = wx.getStorageSync('cates')
    // 判断是否存在缓存数据
    if (!Cates) {
      this.getscrollList()
    } else {
      // 判断缓存数据是否过期
      if (Date.now() - Cates.time > 1000 * 60 * 10) {
        this.getscrollList()
      } else {
        // 缓存数据没过期再进行数据渲染
        this.totalList = Cates.data
        // console.log(this.totalList);
        let leftList = this.totalList.map(v => v.cat_name)
        let rightList = this.totalList[0].children
        this.setData({
          leftList,
          rightList
        })
      }
    }
  },
  // 可滚动区数据请求 同步请求
  async getscrollList() {
    var that = this
    const res = await require({
      url: '/categories'
    })
    that.totalList = res
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: that.totalList
    })
    // 将整个数据进行分量保存
    let leftList = that.totalList.map(v => v.cat_name)
    let rightList = that.totalList[0].children
    that.setData({
      leftList,
      rightList
    })
  },
  // 左侧菜单点击事件
  getIndex(e) {
    var that = this
    // 获取点击传递过来的索引 index
    let index = e.currentTarget.dataset.index
    // 根据index获取右侧数据
    let rightList = that.totalList[index].children
    that.setData({
      // 重新渲染数据
      current: index,
      rightList,
      scrollTop: 0
    })
  }
})