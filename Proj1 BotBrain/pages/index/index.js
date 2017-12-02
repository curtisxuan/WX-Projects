Page({
  data: {
    list: {},
    cid: 1,
    opa: 'hide',
    loading: true,
    notice: false,
  },
  
  linkDetail: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail?iid=' + e.currentTarget.dataset.iid
    })
  }
  ,

  onReachBottom: function (e) {
    var that = this
    that.setData({
      loading: false,
      notice: false
    })
    wx.request({
      url: 'https://ttc.botbrain.ai/v3/data/feed',
      data: {
        'appid': 'RVCQS9UR56',
        'columnid': that.data.cid,
        'uid': wx.getStorageSync('openid'),
        'sid': Date.parse(new Date()) / 1000,
        'ct': 20,
        'platform': 'wechat'
      },
      success: function (e) {
        console.log(e);
        that.setData({
          list: that.data.list.concat(e.data.data),
          loading: true
        })
      }
    })
  },

  // 加载栏目
  loadColumn: function (e) {
    var that = this
    that.setData({
      notice: false
    })
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    that.setData({
      cid: e.currentTarget.dataset.id,
      list: '',
      opa: 'show'
    })
    wx.request({
      url: 'https://ttc.botbrain.ai/v3/data/feed',
      data: {
        appid: 'RVCQS9UR56',
        columnid: that.data.cid,
        uid: wx.getStorageSync('openid'),
        sid: Date.parse(new Date()) / 1000,
        ct: 20,
        platform: 'wechat'
      },
      success: function (e) {
        //加载新栏目列表内容
        wx.request({
          url: 'https://ttc.botbrain.ai/v3/data/feed',
          data: {
            appid: 'RVCQS9UR56',
            columnid: that.data.cid,
            uid: wx.getStorageSync('openid'),
            sid: Date.parse(new Date()) / 1000,
            ct: 20,
            platform: 'wechat'
          },
          success: function (e) {
            console.log(e);
            wx.hideLoading()
            that.setData({
              list: e.data.data,
              opa: 'hide'
            })
          }
        })
      }
    })
  },
  
  loadBeginning: function (e) {
    var nextpage = e.target.dataset.page
    var cat = e.target.dataset.cat
    var that = this
    wx.request({
      url: 'https://ttc.botbrain.ai/v3/data/feed',
      data: {
        appid: 'RVCQS9UR56',
        columnid: that.data.cid,
        uid: wx.getStorageSync('openid'),
        sid: Date.parse(new Date()) / 1000,
        ct: 6,
        platform: 'wechat'
      },
      success: function (e) {
        console.log(e);
        that.setData({
          list: e.data.data.concat(that.data.list),
          notice:true
        })
      }
    })
  },
  
  onLoad: function (options) {
    var that = this

    wx.getNetworkType({
      success: function (e) {
        that.setData({
          networkType: e.networkType
        })
      }
    })

    //获取配置
    wx.request({
      url: 'https://ttc.botbrain.ai/v3/config/RVCQS9UR56',
      data: {
        'appid': 'RVCQS9UR56',
        'securekey': 'KMHFMCCMN224H3929Z325V',
        'platform': 'wechatMini',
        network: that.data.work
      },
      success: function (e) {
        console.log(e);
        that.setData({
          nav: e.data.data.columns,
          cid: e.data.data.columns[0].id
        })
      }
    })

    //获取openid
    wx.login({
      success: function (e) {
        wx.request({
          url: 'https://open.emstail.com/v5/getOpenid',
          data: {
            appid: 'wx039386672cb0f044',
            secret: 'f618dc6116d448621c4119859ce03a40',
            code: e.code
          },
          success: function (e) {
            var openid = e.data.openid
            wx.setStorage({
              key: 'openid',
              data: openid
            })
            //获取栏目索引为0的列表
            wx.request({
              url: 'https://ttc.botbrain.ai/v3/data/feed',
              data: {
                'appid': 'RVCQS9UR56',
                'columnid': that.data.cid,
                'uid': wx.getStorageSync('openid'),
                'sid': Date.parse(new Date()) / 1000,
                'ct': 20
              },
              success: function (e) {
                console.log(e);
                that.setData({
                  list: e.data.data
                })
              }
            })
          }
        })
      }
    })

  }

})
