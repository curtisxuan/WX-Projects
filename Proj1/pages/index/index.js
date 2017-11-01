//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
   title: {},
   list:{}
  },
  //事件处理函数
  onLoad: function (options) {
    //https://open.color.org.cn/api/itemTest  单条数据测试API
    //https://open.color.org.cn/api/itemList  新闻列表API

    var that = this
    wx.showLoading({
      title:'请稍后'
    })
   
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    wx.request({
      url: 'https://open.color.org.cn/api/itemList', //请求的路径
      success: function(e){ //如果请求成功了，做哪些事
        console.log(e) //e就是借口返回给我们的信息
      // that.setData({ //固定写法
      //   title: e.data
      // })

      that.setData({
        list: e.data.data
      })
      }
    })

    }
})
