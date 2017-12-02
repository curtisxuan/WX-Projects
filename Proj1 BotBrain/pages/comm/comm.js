// pages/comm/commm.js
Page({

  data: {
    list: '',
    page: 2,
    show: 'hide',
    areaStatus: 'hide',
    buttonStatus: 'show'
  },

  /* GET USER INFO */
  getUserInfo: function (e) {
    console.log(e)
    var that = this
    that.setData({
      userInfo: e.detail.userInfo
    })
    wx.login({
      success: function (e) {
        console.log(e)
        wx.request({
          url: 'https://open.emstail.com/v5/getOpenid',
          data: {
            appid: 'wxda91f4c708b3414f',
            secret: 'b3d6f712041016058a955d26902b2bd4',
            code: e.code
          },
          success: function (e) {
            console.log(e)
            var openid = e.data.openid
            wx.setStorage({
              key: 'openid',
              data: openid
            })

            console.log(openid)
            wx.request({
              url: 'https://open.emstail.com/v5/userInsertAction',
              data: {
                'openid': openid,
                'userInfo': that.data.userInfo
              },
              success: function (e) {
                console.log(openid)
                that.setData({
                  buttonStatus: 'hide',
                  areaStatus: 'show'
                })
                wx.setStorage({
                  key: 'userInfo',
                  data: that.data.userInfo
                })
              },
            })
            console.log(that.data.userInfo);

          }
        })
      }
    })
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
      title: '兴趣课堂'
    })

    //check if user has given permissions
    wx.getStorage({
      key: 'userInfo',
      success: function (e) {
        that.setData({
          userInfo: e.data,
          areaStatus: 'show',
          buttonStatus: 'hide'
        })
        console.log(that.data.userInfo);
      },
      fail: function (e) {
        that.setData({
          buttonStatus: 'show'
        })
      }

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