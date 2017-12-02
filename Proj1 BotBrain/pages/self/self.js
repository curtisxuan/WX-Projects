Page({
  data: {
    domStatus: 'dn',
    tags: '',
    tagsType: '',
    typeName: '',
    inputText: '',
    buttonStatus: 'show',
    areaStatus: 'hide'
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


  saveTags: function (e) {
    var that = this
    //获取openid
    //获取tagsType
    //获取tags [bindinput - inputvalue]
    var openid = wx.getStorageSync('openid'),
      tags = that.data.tags,
      tagsType = that.data.tagsType;

    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/tagsUpdateAction',
      data: {
        openid: openid,
        tags: tags,
        tagsType: tagsType
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        if (e.data.err == 0) {
          that.setData({
            domStatus: 'dn',
            inputText: ''
          })
          wx.navigateTo({
            url: '/pages/comm/comm'
          })
          wx.navigateBack({
            
          })
        }
      },
      fail: function (e) {
        console.log(e);
      }
    })
  },
  getTags: function (e) {
    var that = this
    that.setData({
      tags: e.detail.value
    })
  },
  changeDom: function (e) {
    var that = this
    that.setData({
      domStatus: 'dn',
      inputText: ''
    })
  },
  //右箭头的点击函数
  tagsAction: function (e) {
    var that = this
    console.log(e);
    that.setData({
      domStatus: 'db',
      tagsType: e.currentTarget.dataset.type,
      typeName: e.currentTarget.dataset.typename
    })
  },
  onLoad: function (e) {
    wx.setNavigationBarTitle({
      title: '我的页面'
    })
    var that = this

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

    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/getUserInfo',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        if (e.data.err == 0) {
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
  },
  onShow: function (e) {
    var that = this

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

    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/getUserInfo',
      data: {
        openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        if (e.data.err == 0) {
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
  }
  
})
