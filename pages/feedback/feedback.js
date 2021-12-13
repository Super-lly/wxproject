// pages/feedback/feedback.js
Page({
  data: {
    tabs: [{
      id: 0,
      value: '体验问题',
      isActive:true
    }, {
      id: 1,
      value: '商品、商家投诉',
      isActive:false
    }],
    chooseImgs:[],
    textValue:''
  },
  uploadImgs:[],
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
  chooseImage(){
    wx.chooseImage({
      count: 9,
      success:(res)=>{
        this.setData({
          chooseImgs:[...this.data.chooseImgs,...res.tempFilePaths]
        })
      }
    })
  },
  removeImg(e){
    let {index} = e.currentTarget.dataset
    const {chooseImgs} = this.data
    chooseImgs.splice(index,1)
    this.setData({
      chooseImgs
    })
  },
  textareaInput(e){
    this.setData({
      textValue:e.detail.value
    })
  },
  btnSubmit(){
    const {textValue,chooseImgs} = this.data
    if(!textValue.trim()){
      wx.showToast({
        title: '请输入有效内容',
        icon:'none',
        mask:true
      })
      return
    }
    chooseImgs.forEach((v,i)=>{
      wx.cloud.uploadFile({
        cloudPath: Date.parse(new Date()) + '.png',
        filePath:v,
        success:(res)=>{
          this.chooseImgs.push(res.fileID)
          if(i === chooseImgs.length - 1){
            this.setData({
              textValue:'',
              chooseImgs:[]
            })
          }
        },
        fail(err){
          console.log(err);
        }
      })
    }) 
  }  
})