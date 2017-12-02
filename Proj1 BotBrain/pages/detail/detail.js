// pages/detail/detail.js
Page({
  data: {
    iid: '',
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this
    that.setData({
      iid: e.iid
    })
    //请求详情页
    wx.request({
      url: 'https://bkd.botbrain.ai/view/v1/RVCQS9UR56/article/' + that.data.iid + '.json',
      data: {},
      success: function (e) {
        console.log(e.data);
        // console.log(e);
        that.setData({
          // 字符串
          // content: e.data.article.content
          content: JSON.parse(e.data.article.content)
        })
        wx.setNavigationBarTitle({
          title: e.data.article.title
        })
      }
    })
    //请求详情的相关推荐
    wx.request({
      url: 'https://ttc.botbrain.ai/rec/v3/data/related',
      data: {
        appid: 'RVCQS9UR56',
        st: 0,
        ct: 3,
        iid: that.data.iid
      },
      success: function (e) {
        console.log(e);

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
