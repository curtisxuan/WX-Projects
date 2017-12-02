Page({
  data: {
    type: ''
  },
  onLoad: function (e) {
    var that = this
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/getUserType',
      data: {
        openid: wx.getStorageSync('openid'),
        type: e.type,
        size: 10,
        page: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        that.setData({
          type: e.data.list
        })
      },
      fail: function (e) {
        console.log(e);
      }
    })
  }
})
