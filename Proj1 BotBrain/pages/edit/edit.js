Page({
  data: {
    type: '',
    id: ''
  },
  save: function (e) {
    var that = this
    var form = e.detail.value
    wx.showActionSheet({
      itemList: ['直接发布', '保存草稿', '删除内容'],
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
          case 2:
            var note = 0;
            break;
          default:
        }
        var f_name = form.name          // 姓名
        var f_school = form.school      // 学校
        var f_telephone = form.telephone  // 电话
        var f_email = form.email        // 邮箱
        var f_section = form.section    // 部门
        var f_dream = form.dream        // 梦想
        var f_torealize = form.torealize // 实现梦想
        var f_quality = form.quality     //具备技能
        var f_toplan = form.toplan      // 参与的计划
        var f_dedicate = form.dedicate  // 课程贡献
        var f_total = form.total        // 课程总结
        var f_item = form.item          // 我的团队
        var openid = wx.getStorageSync('openid')   //用户opneid
        var f_type = 1                 //内容类型
        // var note = e.tapIndex+1
        //发起远端数据请求
        wx.request({
          url: 'https://open.emstail.com/v5/typeUpdateAction',
          method: 'POST',
          data: {
            id: that.data.id,
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
            //e.data.err == 0 
            console.log(e);
          }
        })
      },
      fail: function (e) {
        console.log(e)
      }
    })

  },
  onLoad: function (e) {
    var that = this
    that.setData({
      id: e.id
    })
    wx.request({
      method: 'POST',
      url: 'https://open.emstail.com/v5/showQueryAction',
      data: {
        id: e.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (e) {
        that.setData({
          type: e.data[0]
        })
      },
      fail: function (e) {
        console.log(e);
      }
    })
  }
})
