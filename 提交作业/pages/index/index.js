Page({

  data: {
    userInfo: '',
    buttonStatus: 'hide',
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

 
  /* Navigate to submit page */
  submitPage: function (e) {
    wx.navigateTo({
      url: '../publish/publish'
    })
  },
  /* Navigate to community page page */
  commPage: function (e) {
    wx.navigateTo({
      url: '../comm/comm'
    })
  },

  /* ON LOAD */
  onLoad: function (options) {
    var that = this
    //set title
    wx.setNavigationBarTitle({
      title: '清华大学作业提交与查询',
    })

  //check if user has given permissions
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
}
})
