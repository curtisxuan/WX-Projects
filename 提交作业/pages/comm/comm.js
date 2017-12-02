// pages/comm/commm.js
Page({

  data: {
    list: '',
    page: 2,
    show: 'hide'
  },

  loadMore: function (e) {
    var nextpage = e.target.dataset.page
    var that = this
    wx.request({
      url: 'https://open.emstail.com/v5/typeQueryAction',
      method: 'POST',
      data: {
        'type': 1,
        'size': 10,
        'page': nextpage
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
      ,
      success: function (e) {
        that.setData({
          list: that.data.list.concat(e.data.list),
          page: nextpage + 1
        })
        console.log(e)
        if ((nextpage+1)*10>=e.data.total) {
          that.setData({
            show: 'hide'
          })
          return //终止函数进行
        }
        
      }
    })
  },

  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: '作业'
    })

    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/typeQueryAction',
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
        that.setData({
          show: 'show'
        })
      }
    })
    
  },

})