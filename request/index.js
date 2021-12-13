let ajaxtimes = 0
export const require = (parmes)=>{

  let header={...parmes.header}
  if(parmes.url.includes("/my/")){
    header["Authorization"]=wx.getStorageSync('token')
  }

  ajaxtimes++
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  const baseurl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject)=>{
    wx.request({
      ...parmes,
      header,
      url : baseurl + parmes.url,
      success(res){
        resolve(res.data.message)
      },
      fail(err){
        reject(err)
      },
      complete(){
        wx.hideLoading()
      }
    })
  })
}