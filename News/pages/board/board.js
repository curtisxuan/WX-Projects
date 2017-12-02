Page({
  data: {
    buttonStatus: 'show',
    userInfo: '',
    areaStatus: 'hide'
  },

  getUserInfo: function (e) {
    // console.log(e)
    var that = this
    that.setData({
      userInfo: e.detail.userInfo
    })
    wx.login({
      success: function (e) {
        wx.request({
          url: 'https://open.emstail.com/v1/getOpenid',
          data: {
            code: e.code
          },
          success: function (e) {
            var openid = e.data
            wx.setStorage({
              key: 'openid',
              data: openid
            })
            wx.request({
              url: 'https://open.emstail.com/v1/userInsertAction',
              data: {
                'openid': openid,
                'userInfo': that.data.userInfo
              },
              success: function (e) {
                that.setData({
                  buttonStatus: 'hide',
                  areaStatus: 'show'
                })
                //用户信息存储本地缓存
                wx.setStorage({
                  key: 'userInfo',
                  data: that.data.userInfo
                })
              }
            })
            console.log(that.data.userInfo);
          }
        })
      }
    })
  },

  insertDistAction: function (e) {
    wx.showActionSheet({
      itemList: ['新建行业分析报告', '新建个人培养计划'],
      success: function (e) {
        var type = e.tapIndex
        //根据 tapIndex 跳转不同的发布页
        wx.navigateTo({
          url: '/pages/publish/publish?type=' + type
        })
      },
      fail: function () {
        console.log(e)
      }
    })
  },

  onLoad: function (e) {
    var that = this
    //判断本地是否有用户信息缓存
    wx.getStorage({
      key: 'userInfo',
      success: function (e) {
        that.setData({
          userInfo: e.data,
          areaStatus: 'show'
        })
        console.log(that.data.userInfo);
      },
      fail: function (e) {
        that.setData({
          buttonStatus: 'show'
        })
      }
    })

    // typeQueryAction
    // 获取已经发表的社区内容 作业或者研究报告
    wx.request({
      url: 'https://open.emstail.com/v1/typeQueryAction',
      data: {},
      success: function (e) {
        console.log(e);
      }
    })
  }
})
