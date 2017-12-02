Page({
  data: {
    title:''
  },

  onLoad: function (e) {
    //如果我要在详情页中 请求文章详情的接口
    //需要文章 ID
    // /pages/item/item?itemsid=2000&title=乐视电视

    // console.log(e)
    var that = this

    var WxParse = require('../../wxParse/wxParse.js');

    var itemsid = e.itemsid
    var title = e.title
    that.setData({
      title:title
    })
    wx.setNavigationBarTitle({
      title: title
    })

    wx.request({
      url: 'https://open.emstail.com/v3/getItems',
      method: 'POST',
      data: {
        'itemsid': itemsid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function(e){
        WxParse.wxParse('detail', 'html', e.data.detail, that, 5);
      }
    })

  }

})
