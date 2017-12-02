// pages/comm/commm.js
Page({

  data: {
    list: ''
  },


  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '作业社区'
    })

    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v2/typeQueryAction',
      data: {
        type: 1,
        page: 1,
        size: 10
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        that.setData({
          list: e.data.list
        })
      }
    })
  },

})