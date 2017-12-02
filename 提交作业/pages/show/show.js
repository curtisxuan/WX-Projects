// pages/show/show.js
Page({
  data: {
    id: '',
    detail: '',
    likeNum: 'loading',
    likeStatus: 0
  },

  likeAction: function(e){
    var that = this
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v3/likeInsertAction',
      data: {
        id: that.data.id,
        openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        //判断 e.err 是0还是1 给用户做不同的交互反馈
        //如果是第一次点赞0 那就告诉用户 点赞成功
        //如果已经点过赞1   那就告诉用户 你已经点过赞了
        if (e.data.err == 0) {
          wx.showToast({
            title: '点赞成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
          that.setData({
            likeNum: that.data.likeNum + 1,
            likeStatus: 1
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '是否取消点赞',
            success: function (e) {
              if (e.confirm) {
                console.log('用户点击确定')
                wx.request({
                  method: 'POST',
                  url: 'https://open.emstail.com/v3/likeDelAction',
                  data: {
                    id: that.data.id,
                    openid: wx.getStorageSync('openid')
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (e) {
                    if (e.data.err == 0) {
                      wx.showToast({
                        title: '取消点赞',
                        icon: 'success',
                        duration: 1000,
                        mask: true
                      })
                      that.setData({
                        likeNum: that.data.likeNum - 1,
                        likeStatus: 0
                      })
                    }
                  },
                  fail: function (e) {
                    console.log(e);
                  }
                })
              }
            }
          })
        }
      },
      fail: function (e) {
        console.log(e);
      }
    })
  },
  onLoad: function (e) {
    var that = this
    that.setData({
      id: e.id
    })

    //查看详情页内容
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v3/showQueryAction',
      data: {
        id: that.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        console.log(e);
        that.setData({
          detail: e.data[0]
        })
      },
      fail: function (e) {
        console.log(e);
      }
    })

    //查看详情页点赞数
    wx.request({
        method: 'POST',
        url: 'https://open.emstail.com/v3/likeQueryAction',
        data: {
          id: that.data.id
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (e) {
          console.log(e);
          that.setData({
            likeNum: e.data.likeNum
          })
        },
        fail: function (e) {
          console.log(e);
        }
      })

    //查询当前用户是否点赞过该文章
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v3/userLikeQueryAction',
      data: {
        id: that.data.id,
        openid: wx.getStorageSync('openid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        if (e.data.err == 1) {
          //说明 用户已点赞过该篇内容
          that.setData({
            likeStatus: 1
          })
        }
      },
      fail: function (e) {
        console.log(e);
      }
    })

  },

})