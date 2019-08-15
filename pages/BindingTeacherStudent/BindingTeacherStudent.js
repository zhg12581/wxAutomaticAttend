// pages/BindingTeacherStudent/BindingTeacherStudent.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmteacherlist: {
      TeacherId: '',
      Name: '',
      Subject: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://localhost:51332/api/ReturnConfirmTeacher/GetConfirmTeacher',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          confirmteacherlist: res.data
        })
        console.log(res.data)
      }
    })
  },


  BingStudent: function (e) {
    app.globalData.teachername = e.currentTarget.id;
    console.log(e.currentTarget.id)
    wx.redirectTo({
      url:"/pages/BindingTeacherStudent/BindingStudentPage/BindingStudentPage"
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