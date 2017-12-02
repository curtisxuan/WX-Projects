Page({
  data: {
    domStatus: 'dn',
    tags: '',
    tagsType: '',
    typeName: '',
    inputText: ''
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
