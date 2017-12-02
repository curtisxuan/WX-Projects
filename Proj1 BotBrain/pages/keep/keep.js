Page({
  data: {
    keep: ''
  },
  onLoad: function (e) {
    var that = this
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/keepGetAction',
      data: {
        openid: wx.getStorageSync('openid'),
        size: 10,
        page: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        that.setData({
          keep: e.data.list
        })
        console.log(that.data.keep);
      },
      fail: function (e) {
        console.log(e);
      }
    })
  }
})
