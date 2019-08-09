// pages/DeleteCourse/DeleteCourse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courselist: {
      CourseId: '',
      CourseName: '',
      CoursePlace: '',
      StartTime: '',
      OverTime: '',
      WeekDay: '',
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.request({
      url: 'http://localhost:51332/api/ReturnAllCourse/GetAllCourse',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        that.setData({
          courselist: res.data
        })
        console.log(res.data)
      }
    })
  },


  Return: function () {
    wx.switchTab({
      url: "/pages/admins/ManageCourses/ManageCourses"
    })
  },

  Delete: function(e) {
    var that = this;
    var idd = e.currentTarget.id;
    console.log(idd)
    wx.showModal({
      title: '提示',
      content: '是否确认删除编号为' + idd + '的课程？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:51332/api/DeleteCourse/PostDeleteCourse',
            data: {
              CourseId: idd
            },
            header: {
              //'content-type': 'application/json'
              'Content-Type': 'application/x-www-form-urlencoded'
              //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
            },
            method: "POST",
            success: function(res) {
              wx.showToast({
                title: res.data.Message,
                icon: 'success',
                duration: 1000
              })
              wx.request({
                url: 'http://localhost:51332/api/ReturnAllCourse/GetAllCourse',
                headers: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  that.setData({
                    courselist: res.data
                  })
                  console.log(res.data)
                }
              })

            }

          })

        }
      }
    })
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