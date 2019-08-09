// pages/authorizationpage/authorizationpage.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
  },


  getUserInfo: function(e) {
    var that = this;
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo != undefined) {
      wx.request({
        url: 'http://localhost:51332/api/Login/PostLogin',
        data: {
          OpenId: app.globalData.userInfo.nickName,
        },
        header: {
          //'content-type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
          //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
        },
        method: "POST",
        success: function(res) {
          console.log(res.data.Message)
          if (res.data.Message == "还没注册") {
            wx.redirectTo({
              url: '/pages/registers/registers',
            })
          } else if (res.data.Message == "角色待确认") {
            wx.redirectTo({
              url: '/pages/afterregisterwait/afterregisterwait',
            })
          } else {
            if (res.data.Message == '学生') {
              wx.redirectTo({
                url: '/pages/students/students',
              })
            } else if (res.data.Message == '教师') {
              wx.redirectTo({
                url: '/pages/teachers/teachers',
              })
            } else {
              /*
              app.globalData.list = [{
                "pagePath": "/pages/admins/ManageCourses/ManageCourses",
                "iconPath": "/image/book.jpg",
                "selectedIconPath": "/image/book.jpg",
                "text": "管理课程"
              },
              {
                "pagePath": "/pages/admins/ManageRoles/ManageRoles",
                "iconPath": "/image/book.jpg",
                "selectedIconPath": "/image/book.jpg",
                "text": "管理角色"
              },
              {
                "pagePath": "/pages/admins/ManageRoles/ManageRoles",
                "iconPath": "/image/book.jpg",
                "selectedIconPath": "/image/book.jpg",
                "text": "管理角色"
              }
              ]
           */
              wx.switchTab({
                url: "/pages/admins/ManageCourses/ManageCourses"
              })
            }

          }

        }

      })

    } else {
      wx.showToast({
        title: '授权失败', //这里打印出登录成功
        icon: 'loading',
        duration: 1000
      })
    }

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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