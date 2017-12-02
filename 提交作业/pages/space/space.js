// pages/space/space.js
Page({
  data: {
    user:'',
    type:'',
    followText: '关注'
  },

  followAction: function (e) {
    var that = this,
      openid = e.currentTarget.dataset.openid;

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
        if (e.data.type == 1) {
          that.setData({
            followText: '已关注'
          })
        } else {
          that.setData({
            followText: '关注'
          })
        }
      },
      fail: function (e) {
        console.log(e);
      }
    })

  },

  onLoad: function (e) {
    console.log(e)
    var that = this

    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/getUserInfo',
      data: {
        openid: e.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        if (e.data.err == 0) {
          console.log(e)
          that.setData({
            user: e.data.data
          })
        } else {
          console.log('走到了else');
        }
      },
      fail: function (e) {
        console.log(e);
      }
    })

    //调取用户 status=1 的 社区内容
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/getUserType',
      data: {
        openid: e.openid,
        type: 1,
        size: 10,
        page: 1,
        status: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        console.log(e)
        that.setData({
          type: e.data.list
        })
      },
      fail: function (e) {
        console.log(e);
      }
    })

    //查询授权用户(我)是否关注了当前用户
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/getFollowInfoAction',
      data: {
        from_openid: wx.getStorageSync('openid'),
        to_openid: e.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        console.log(e)
        if (e.data.status == 1) {
          that.setData({
            followText: '已关注'
          })
        }
      },
      fail: function (e) {
        console.log(e);
      }
    })
  },
})