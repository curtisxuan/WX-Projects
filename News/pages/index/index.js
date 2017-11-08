Page({
  data: {
    list: {},
    page: 2,
    show: 'hide',
    cat: 1
  },

  navigateTo1: function () {
   //nothing
  },

  navigateTo2: function () {
    var that = this
    wx.showNavigationBarLoading()
    wx.redirectTo({
      url: '../index2/index2',
    })
    wx.hideNavigationBarLoading()

  },

  navigateTo3: function () {
    var that = this
    wx.showNavigationBarLoading()
    wx.redirectTo({
      url: '../index3/index3',
    })

    wx.hideNavigationBarLoading()

  },

  navigateTo4: function () {
    var that = this
    wx.showNavigationBarLoading()
    wx.redirectTo({
      url: '../index4/index4',
    })

    wx.hideNavigationBarLoading()

  },

  navigateTo5: function () {
    var that = this
    wx.showNavigationBarLoading()
    wx.redirectTo({
      url: '../index5/index5',
    })

    wx.hideNavigationBarLoading()

  },

  loadMore: function (e) {
    var that = this
    var cat = e.target.dataset.cat

    wx.getStorage({
      key: 'currentPage1',
      success: function (e) {
        that.setData({
          page: e.data
        })
      },
      fail: function (e) {
        that.setData({
          page: 2
        })
      }
    })
    var nextpage = e.target.dataset.page
    wx.request({
      url: 'https://open.color.org.cn/v1/getList',
      method: 'POST',
      data: {
        'catid': cat,
        'size': 10,
        'page': nextpage
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
      ,
      success: function (e) {
        if (e.data == '') {
          wx.showToast({
            title: '无更多内容',
            icon: 'loading',
            mask: true,
            duration: 1000
          })
          return
        }

        wx.setStorage({
          key: "currentPage1",
          data: nextpage + 1
        })
        that.setData({
          list: that.data.list.concat(e.data),
          page: nextpage + 1
        })
      }
    })
  },

  onLoad: function (options) {
    wx.clearStorage()
    wx.showLoading({
      title: '请稍候',
      mask: true
    })
    var currentPage1 = 2;
    if (!(wx.getStorageSync('currentPage1') == '')) {
      var currentPage1 = wx.getStorageSync('currentPage1');
    }

    var that = this
    wx.request({
      url: 'https://open.color.org.cn/v1/getList',
      method: 'POST',
      data: {
        'catid': 1,
        'size': (currentPage1 - 1) * 10,
        'page': 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
      ,
      success: function (e) {
        console.log(e)
        that.setData({
          list: e.data,
          show: 'show'
        })

        wx.hideLoading()

      }
    })
  }

})
