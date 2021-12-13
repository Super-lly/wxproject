// app.js
App({
  onLaunch() {
    // 登录
    wx.login({
      
    }),
    wx.cloud.init({
      env:'cloud1-8gdqlssr92e82139',
      traceUser:true
    })
  }, 
})
