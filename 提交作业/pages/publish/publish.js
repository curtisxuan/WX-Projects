// pages/publish/publish.js
Page({
  data: {
  },
  save: function (e) {
    var that = this
    console.log(e)
    //处理数据
    var f_name = e.detail.value.name
    var f_school = e.detail.value.school
    var f_telephone = e.detail.value.telephone
    var f_email = e.detail.value.email
    var f_section = e.detail.value.section
    var f_dream = e.detail.value.dream
    var f_torealize = e.detail.value.torealize
    var f_quality = e.detail.value.quality
    var f_toplan = e.detail.value.toplan
    var f_dedicate = e.detail.value.dedicate
    var f_total = e.detail.value.total
    var f_item = e.detail.value.item
    var openid = wx.getStorageSync('openid')
    var f_type = 1
    //发起远端数据请求
    wx.request({
      url: 'https://open.emstail.com/v3/typeInsertAction',
      method: 'POST',
      data: {
        f_name: f_name,
        f_school: f_school,
        f_telephone: f_telephone,
        f_email: f_email,
        f_section: f_section,
        f_dream: f_dream,
        f_torealize: f_torealize,
        f_quality: f_quality,
        f_toplan: f_toplan,
        f_dedicate: f_dedicate,
        f_total: f_total,
        f_item: f_item,
        openid: openid,
        f_type: f_type
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
      ,
      success: function (e) {
        if (e.data.err == 0) {
          wx.showModal({
            title: '提示',
            content: '发表成功!!!',
            success: function (e) {
              wx.redirectTo({
                url: '/pages/index/index'
              })
              // if (e.confirm) {
              //   wx.redirectTo({
              //     url: '/pages/index/index'
              //   })
            }
          })
        }
      }
    })

  },

  clean: function(e)
  {},

  onLoad: function (e) {
    var that = this
    wx.setNavigationBarTitle({
      title: '新建个人培养计划'
    })
  }
})
