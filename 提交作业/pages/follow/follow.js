Page({
  data: {
    list: '',
    type: 1
  },
  followChange: function (e) {
    var openid = e.currentTarget.dataset.openid //当前用户的openid
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/queryFollowAction',
      data: {
        from_openid: wx.getStorageSync('openid'),
        to_openid: openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        console.log(e);
      },
      fail: function (e) {
        console.log(e);
      }
    })
  },
  onLoad: function (e) {
    var that = this
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/getFollowListAction',
      data: {
        openid: wx.getStorageSync('openid'),
        type: that.data.type,// type:1 我的关注列表 type:2 我的粉丝列表
        size: 10,
        page: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        that.setData({
          list: e.data.list
        })
      },
      fail: function (e) {
        console.log(e);
      }
    })
  }
})
