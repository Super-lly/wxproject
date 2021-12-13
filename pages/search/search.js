import {require} from "../../request/index"
import regeneratorRuntime from "../../libs/runtime/runtime"
Page({
  data:{
    goods:[],
    flag:false,
    inputValue:''
  },
  TimeId:-1,
  handlesearch(e){
    const { value } = e.detail 
    if(!value.trim()){
      this.setData({
        goods:[],
        flag:false 
      })
      return
    }
    this.setData({
      flag:true
    })
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(()=>{
      this.qsearch(value)
    },1000)
  },
  async qsearch(qurey){
    const res = await require({
      url:"/goods/search",
      data:{qurey}
    })
    this.setData({
      goods:res.goods
    })
  },
  btntap(){
    this.setData({
      inputValue:'',
      goods:[],
      flag:false 
    })
  }
})