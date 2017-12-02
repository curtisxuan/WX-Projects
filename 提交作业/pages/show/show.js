// pages/show/show.js
Page({
  data: {
    id: '',
    detail: '',
    likeNum: 'loading',
    likeStatus: 0,
    comText: '',
    defaultText: '',
    inputText: '',
    comList: {},
    keepStatus: 0,
    show: 'hide'
  },

  linkSpace: function (e){
    var openid = e.currentTarget.dataset.openid;
    wx.navigateTo({
      url: '/pages/space/space?openid=' + openid
    })
  },

  keepAction: function (e) {
    var that = this
    //用来做点赞交互
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/keepInsertAction',
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
            title: '收藏成功',
            icon: 'success',
            duration: 1000,
            mask: true
          })
          that.setData({
            keepStatus: 1
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '是否取消收藏',
            success: function (e) {
              if (e.confirm) {
                console.log('用户点击确定')
                wx.request({
                  method: 'POST',
                  url: 'https://open.emstail.com/v5/keepDelAction',
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
                        title: '取消收藏',
                        icon: 'success',
                        duration: 1000,
                        mask: true
                      })
                      that.setData({
                        keepStatus: 0
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

  textPut: function (e) {
    var that = this
    that.setData({
      comText: e.detail.value
    })
  },
  putComment: function (e) {
    var that = this
    if (that.data.comText == '') {
      wx.showToast({
        title: '评论不能为空',
        icon: 'loading',
        duration: 1000
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '是否提交评论',
      success: function (e) {
        if (e.confirm) {
          wx.request({
            method: 'POST',
            url: 'https://open.emstail.com/v5/commentPutAction',
            data: {
              id: that.data.id, //获取ID
              openid: wx.getStorageSync('openid'),
              comment: that.data.comText
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            }
            ,
            success: function (e) {
              //请求成功 如何处理 该做什么
              // wx.navigateTo({
              //   url: "/pages/show/show?id="+that.data.id
              // })
              //如何清空评论框中的内容啊
              that.setData({
                defaultText: ''
              })
            },
            fail: function (e) {
              console.log(e);
            }
          })
        } else {
        }
      }
    })
  },

  likeAction: function(e){
    var that = this
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/likeInsertAction',
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
                // console.log('用户点击确定')
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
                })
              }
            }
          })
        }
      },
    })
  },
  onLoad: function (e) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    that.setData({
      id: e.id
    })

    //查看详情页内容
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/showQueryAction',
      data: {
        id: that.data.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        // console.log(e)
        that.setData({
          detail: e.data[0]
        })
      },
      fail: function (e) {
        // console.log(e)
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

    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v3/commentGetAction',
      data: {
        id: that.data.id,
        size: 10,
        page: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        console.log(e);
        that.setData({
          commList: e.data.list,
          show: 'show'
        })
      },
      fail: function (e) {
        console.log(e);
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },

})