// pages/publish/publish.js
Page({
  data: {

  },
  save: function (e) {
    var that = this
    var note = 1;
    var form = e.detail.value;
    wx.showActionSheet({
      itemList: ['直接发布', '保存草稿'],
      success: function (e) {
        // console.log(e);
        // return
        switch (e.tapIndex) {
          case 0:
            var note = 1;
            break;
          case 1:
            var note = 2;
            break;
          default:
        }

        var f_name = form.name
        var f_school = form.school
        var f_telephone = form.telephone
        var f_email = form.email
        var f_section = form.section
        var f_dream = form.dream
        var f_torealize = form.torealize
        var f_quality = form.quality
        var f_toplan = form.toplan
        var f_dedicate = form.dedicate
        var f_total = form.total
        var f_item = form.item
        var openid = wx.getStorageSync('openid')
        var f_type = 1
        //发起远端数据请求
        wx.request({
          url: 'https://open.emstail.com/v5/typeInsertAction',
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
            f_type: f_type,
            status: note

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
