// pages/registerteachers/registerteachers.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherid: '',
    teachername: '',
    subject: '',
    userInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
    })
  },


  teacheridinput: function (e) {
    this.setData({
      teacherid: e.detail.value
    })
  },


  teachernameinput: function (e) {
    this.setData({
      teachername: e.detail.value
    })
  },

  teachersubjectinput: function (e) {
    this.setData({
      subject: e.detail.value
    })
  },

  registerteacherreturn() {
    wx.redirectTo({
      url: '/pages/registers/registers',
    })
  },


  registerteachersubmit: function (e) {
    var that = this;
    if (that.data.teacherid != '') {
      if (that.data.teachername != '') {
        if (that.data.subject != '') {
          wx.request({
            url: 'http://localhost:51332/api/RegisterTeacher/PostRegisterTeacher',
            data: {
              OpenId: app.globalData.userInfo.nickName,
              TeacherId: that.data.teacherid,
              Name: that.data.teachername,
              Subject: that.data.subject
            },
            header: {
              //'content-type': 'application/json'
              'Content-Type': 'application/x-www-form-urlencoded'
              //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
            },
            method: "POST",
            success: function (res) {
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
            title: '科目不能为空',
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
        title: '编号不能为空',
        icon: 'loading',
        duration: 1000
      })
    }

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