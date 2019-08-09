// pages/registerstudents/registerstudents.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studentid: '',
    studentname: '',
    studentprofessionalclass: '',
    userInfo: {}
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
    /*
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    */
  },

  studentidinput: function(e) {
    this.setData({
      studentid: e.detail.value
    })
  },


  studentnameinput: function(e) {
    this.setData({
      studentname: e.detail.value
    })
  },

  studentprofessionalclassinput: function(e) {
    this.setData({
      studentprofessionalclass: e.detail.value
    })
  },

  registerstudentreturn() {
    wx.redirectTo({
      url: '/pages/registers/registers',
    })
  },

  registerstudentsubmit: function(e) {
    var that = this;
    if (that.data.studentid != '') {
      if (that.data.studentname != '') {
        if (that.data.studentprofessionalclass != '') {
          wx.request({
            url: 'http://localhost:51332/api/RegisterStudent/PostRegisterStudent',
            data: {
              OpenId: app.globalData.userInfo.nickName,
              StudentId: that.data.studentid,
              Name: that.data.studentname,
              ProfessionalClass: that.data.studentprofessionalclass
            },
            header: {
              //'content-type': 'application/json'
              'Content-Type': 'application/x-www-form-urlencoded'
              //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
            },
            method: "POST",
            success: function(res) {
              if (res.data.Message != "提交成功") {
                wx.showToast({
                  title: res.data.Message,
                  icon: 'loading',
                  duration: 1000
                })
              } else {
                wx.showToast({
                  title: res.data.Message,
                  icon: 'success',
                  duration: 1000
                })
                wx.redirectTo({
                  url: '/pages/afterregisterwait/afterregisterwait',
                })
              }

            }

          })
        } else {
          wx.showToast({
            title: '专业班级不能空',
            icon: 'loading',
            duration: 1000
          })
        }
      } else {
        wx.showToast({
          title: '姓名不能为空',
          icon: 'loading',
          duration: 1000
        })
      }
    } else {
      wx.showToast({
        title: '学号不能为空',
        icon: 'loading',
        duration: 1000
      })
    }

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})