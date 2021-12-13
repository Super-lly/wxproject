Page({
  data:{
    userInfo:{},
    collect:[]
  },
  onShow(){
    const userInfo = wx.getStorageSync('userInfo')
    const collect = wx.getStorageSync('collect')
    this.setData({
      userInfo,
      collect
    })
  }
})