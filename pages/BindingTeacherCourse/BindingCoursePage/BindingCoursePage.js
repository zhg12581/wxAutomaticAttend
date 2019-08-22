// pages/BindingTeacherCourse/BindingCoursePage/BindingCoursePage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Binding: '',
    Delete: true,
    check: '',
    choosecourse: [],
    teachername: '',
    bingcoursecolor: "red",
    deletecoursecolor: "black",
    courselist: {
     // { CourseId: '212331', CourseName: '高数', CoursePlace: '建斌男', WeekDay: '周五',//StartTime: '12:12', OverTime: '13:12'},
     // { CourseId: '312342', CourseName: '物理', CoursePlace: '教学楼', WeekDay: '周四', //StartTime: '12:13', OverTime: '13:13'},
     // { CourseId: '764876', CourseName: '英语', CoursePlace: '信息楼', WeekDay: '周一', //StartTime: '14:20', OverTime: '15:20'}
      CourseId: '',
      CourseName: '',
      CoursePlace: '',
      WeekDay: '',
      StartTime: '',
      OverTime: '',
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      teachername: app.globalData.teachername
    })
    wx.request({
      url: 'http://localhost:51332/api/ReturnBindingCourseOfTeacher/PostCheckboxGroupCourse',
      data: {
        TeacherName: app.globalData.teachername
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function (res) {
        that.setData({
          courselist: res.data,
          choosecourse: that.data.choosecourse.concat(app.globalData.teachername)
        })
        console.log(res.data)
      }
    })
  },


  checkboxChange: function (e) {
    var that = this;
    var index = 0;
    if (e.detail.value.length != 0) {
      that.setData({
        choosecourse: that.data.choosecourse.concat(e.detail.value)
      })
      console.log(that.data.choosecourse)
    } else {
      for (var i = 0; i < that.data.choosecourse.length; i++) {
        if (that.data.choosecourse[i] == e.currentTarget.id) {
          index = i;
          break;
        }
      }
      that.data.choosecourse.splice(index, 1);
      console.log(that.data.choosecourse);
    }

  },

  Binding: function () {
    var that = this;
    console.log(that.data.choosecourse)
    if (that.data.choosecourse.length != 1) {
      wx.showModal({
        title: '提示',
        content: '是否将选中的这个(些)课程绑定给' + app.globalData.teachername + '老师？',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'http://localhost:51332/api/BindingTeacherCourse/PostBindingTeacherCourse',
              data: JSON.stringify(that.data.choosecourse),
              header: {
                'content-type': 'application/json'
              },
              method: "POST",
              success: function (res) {
                console.log(res.data)
                wx.showToast({
                  title: res.data.Message,
                  icon: 'success',
                  duration: 1000
                })
                wx.request({
                  url: 'http://localhost:51332/api/ReturnBindingCourseOfTeacher/PostCheckboxGroupCourse',
                  data: {
                    TeacherName: app.globalData.teachername
                  },
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success: function (res) {
                    that.setData({
                      courselist: res.data,
                      choosecourse: []
                    })
                    that.setData({
                      choosecourse: that.data.choosecourse.concat(app.globalData.teachername),
                      check: ''
                    })
                    console.log(that.data.choosecourse)
                  }
                })
              }

            })

          }
        }
      })
    } else {
      wx.showToast({
        title: "请选择课程",
        icon: 'loading',
        duration: 1000
      })
    }

  },



  Delete: function () {
    var that = this;
    console.log(that.data.choosecourse)
    if (that.data.choosecourse.length != 1) {
      wx.showModal({
        title: '提示',
        content: '是否将选中的这个(些)课程和' + app.globalData.teachername + '老师解绑？',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'http://localhost:51332/api/DeleteTeacherCourse/PostDeleteTeacherCourse',
              data: JSON.stringify(that.data.choosecourse),
              header: {
                'content-type': 'application/json'
              },
              method: "POST",
              success: function (res) {
                console.log(res.data)
                wx.showToast({
                  title: res.data.Message,
                  icon: 'success',
                  duration: 1000
                })
                wx.request({
                  url: 'http://localhost:51332/api/ReturnCourseOfTeacher/PostCourseOfTeacher',
                  data: {
                    TeacherName: app.globalData.teachername
                  },
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success: function (res) {
                    that.setData({
                      courselist: res.data,
                      choosecourse: []
                    })
                    that.setData({
                      choosecourse: that.data.choosecourse.concat(app.globalData.teachername),
                      check: ''
                    })
                    console.log(that.data.choosecourse)
                  }
                })
              }

            })

          }
        }
      })
    }
    else {
      wx.showToast({
        title: "请选择课程",
        icon: 'loading',
        duration: 1000
      })
    }

  },


  bingcourse: function () {
    var that = this;
    that.setData({
      teachername: app.globalData.teachername,
      bingcoursecolor: "red",
      deletecoursecolor: "black",
      Binding: '',
      Delete: true
    })
    wx.request({
      url: 'http://localhost:51332/api/ReturnBindingCourseOfTeacher/PostCheckboxGroupCourse',
      data: {
        TeacherName: app.globalData.teachername
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function (res) {
        that.setData({
          courselist: res.data,
          choosecourse: []
        })
        that.setData({
          choosecourse: that.data.choosecourse.concat(app.globalData.teachername),
          check: ''
        })
        console.log(that.data.choosecourse)
      }
    })
  },


  deletecourse: function () {
    var that = this;
    that.setData({
      teachername: app.globalData.teachername,
      bingcoursecolor:"black",
      deletecoursecolor: "red",
      Binding: true,
      Delete: '',
    })
    wx.request({
      url: 'http://localhost:51332/api/ReturnCourseOfTeacher/PostCourseOfTeacher',
      data: {
        TeacherName: app.globalData.teachername
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function (res) {
        that.setData({
          courselist: res.data,
          choosecourse: []
        })
        that.setData({
          choosecourse: that.data.choosecourse.concat(app.globalData.teachername),
          check: ''
        })
        console.log(that.data.choosecourse)
      }
    })
  },


  Return1: function () {
    wx.redirectTo({
      url: "/pages/BindingTeacherCourse/BindingTeacherCourse",
    })
  },

  Return2: function () {
    wx.redirectTo({
      url: "/pages/BindingTeacherCourse/BindingTeacherCourse",
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