// components/Tabs/Tabs.js
Component({
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },
  data: {

  },
  methods: {
    titleItemTap(e){
      const {index} = e.currentTarget.dataset
      this.triggerEvent("tabsChange",{index})
    }
  }
})
