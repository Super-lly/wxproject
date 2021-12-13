import { require } from "../../request/index"
import regeneratorRuntime from "../../libs/runtime/runtime"
Page({
  data:{
    code:''
  },
  async getUserInfo(e){
    try{
      const { encryptedData,iv,rawData,signature } = e.detail
    const login=()=>{
      return new Promise((resolve, reject)=>{
        wx.login({
          timeout: 10000,
          success(res){
            resolve(res)
          },
          fail(err){
            reject(err)
          }
        })
      })
    }
    const { code } = await login()
    const loginParams = { encryptedData,iv,rawData,signature,code }
    const token = await require({
      url:'/users/wxlogin',
      data:loginParams,
      method:'POST'
    })
    wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
    wx.navigateBack({
      delta: 1,
    })
    }catch(err){
      console.log(err);
    }
  }
})