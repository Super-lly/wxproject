Page({
  getUserInfo(e){
    wx.getUserProfile({
      desc: 'desc',
      lang:'zh_CN',
      success:(res)=>{
        const userInfo = res.userInfo
        wx.setStorageSync('userInfo', userInfo)
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  }
})