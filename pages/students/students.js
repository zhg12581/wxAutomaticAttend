// pages/students/students.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Submit: '',
    Delete: true,
    check: '',
    choosecourse: [],
    choosecoursecolor: "red",
    selectedcoursecolor: "black",
    courselist: {
      // { Id: 123, CourseId: '212331', CourseName: '高数', CoursePlace: '建斌男', WeekDay: '周五', //StartTime: '12:12', OverTime: '13:12', Teachername: "撒技术"},
      // { Id: 13, CourseId: '312342', CourseName: '物理', CoursePlace: '教学楼', WeekDay: '周四', //StartTime: '12:13', OverTime: '13:13', Teachername: "撒技术"},
      // { Id:14, CourseId: '764876', CourseName: '英语', CoursePlace: '信息楼', WeekDay: '周一', //StartTime: '14:20', OverTime: '15:20',Teachername:"撒技术"}
      CourseId: '',
      CourseName: '',
      CoursePlace: '',
      WeekDay: '',
      StartTime: '',
      OverTime: '',
      Teachername: '',
      TeacherCourseId: 0
    },
    list: [{
        index: 0,
        selectedimage: "/image/xuankehl.png",
        selectedcolor: "red",
        text: "选课"
      },
      {
        index: 1,
        selectedimage: "/image/kaoqin.png",
        selectedcolor: "black",
        text: "考勤"
      },
      {
        index: 2,
        selectedimage: "/image/mines.png",
        selectedcolor: "black",
        text: "我的"
      }
    ]

  },


  checkboxChange: function(e) {
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

  switchfunction: function(e) {
    var that = this;
    console.log(e.currentTarget.id)
    if (e.currentTarget.id == 0) {
      var selectcolor1 = 'list[0].selectedcolor';
      var selectimage1 = "list[0].selectedimage";
      var selectcolor2 = 'list[1].selectedcolor';
      var selectimage2 = "list[1].selectedimage";
      var selectcolor3 = 'list[2].selectedcolor';
      var selectimage3 = "list[2].selectedimage";
      that.setData({
        [selectcolor1]: "red",
        [selectimage1]: "/image/xuankehl.png",
        [selectcolor2]: "black",
        [selectimage2]: "/image/kaoqin.png",
        [selectcolor3]: "black",
        [selectimage3]: "/image/mines.png",
      })
    } else if (e.currentTarget.id == 1) {
      var selectcolor4 = 'list[0].selectedcolor';
      var selectimage4 = "list[0].selectedimage";
      var selectcolor5 = 'list[1].selectedcolor';
      var selectimage5 = "list[1].selectedimage";
      var selectcolor6 = 'list[2].selectedcolor';
      var selectimage6 = "list[2].selectedimage";
      that.setData({
        [selectcolor4]: "black",
        [selectimage4]: "/image/xuanke.png",
        [selectcolor5]: "red",
        [selectimage5]: "/image/kaoqinhl.jpg",
        [selectcolor6]: "black",
        [selectimage6]: "/image/mines.png",
      })
    } else {
      var selectcolor7 = 'list[0].selectedcolor';
      var selectimage7 = "list[0].selectedimage";
      var selectcolor8 = 'list[1].selectedcolor';
      var selectimage8 = "list[1].selectedimage";
      var selectcolor9 = 'list[2].selectedcolor';
      var selectimage9 = "list[2].selectedimage";
      that.setData({
        [selectcolor7]: "black",
        [selectimage7]: "/image/xuanke.png",
        [selectcolor8]: "black",
        [selectimage8]: "/image/kaoqin.png",
        [selectcolor9]: "red",
        [selectimage9]: "/image/mineshl.png",
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'http://localhost:51332/api/ReturnElectiveCourse/PostElectiveCourse',
      data: {
        StudentId: app.globalData.studentid
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function(res) {
        that.setData({
          courselist: res.data,
          choosecourse: that.data.choosecourse.concat(app.globalData.studentid)
        })
        console.log(res.data)
      }
    })
  },

  choosecourse: function() {
    var that = this;
    that.setData({
      choosecoursecolor: "red",
      selectedcoursecolor: "black",
    })
    wx.request({
      url: 'http://localhost:51332/api/ReturnElectiveCourse/PostElectiveCourse',
      data: {
        StudentId: app.globalData.studentid
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
          choosecourse: that.data.choosecourse.concat(app.globalData.studentid),
          check: '',
          Submit: '',
          Delete: true,
        })
        console.log(that.data.choosecourse)
      }
    })
  },

  selectedcourse: function() {
    var that = this;
    that.setData({
      choosecoursecolor: "black",
      selectedcoursecolor: "red",
    })
    wx.request({
      url: 'http://localhost:51332/api/SelectedCourse/PostSelectedCourse',
      data: {
        StudentId: app.globalData.studentid
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function(res) {
        console.log(res.data)
        that.setData({
          courselist: res.data,
          choosecourse: []
        })
        that.setData({
          choosecourse: that.data.choosecourse.concat(app.globalData.studentid),
          check: '',
          Submit: true,
          Delete: '',
          
        })
        console.log(that.data.choosecourse)
      }
    })
  },


  Submit: function() {
    var that = this;
    console.log(that.data.choosecourse)
    if (that.data.choosecourse.length != 1) {
      wx.showModal({
        title: '提示',
        content: '是否确定所选课程？',
        success: function(res) {
          if (res.confirm) {
            wx.request({
              url: 'http://localhost:51332/api/ChooseCourse/PostChooseCourse',
              data: JSON.stringify(that.data.choosecourse),
              header: {
                'content-type': 'application/json'
              },
              method: "POST",
              success: function(res) {
                console.log(res.data)
                wx.showToast({
                  title: res.data.Message,
                  icon: 'success',
                  duration: 1000
                })
                wx.request({
                  url: 'http://localhost:51332/api/ReturnElectiveCourse/PostElectiveCourse',
                  data: {
                    StudentId: app.globalData.studentid
                  },
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success: function(res) {
                    that.setData({
                      courselist: res.data,
                      choosecourse: []
                    })
                    that.setData({
                      choosecourse: that.data.choosecourse.concat(app.globalData.studentid),
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



  Delete: function() {
    var that = this;
    console.log(that.data.choosecourse)
    if (that.data.choosecourse.length != 1) {
      wx.showModal({
        title: '提示',
        content: '是否取消所选课程',
        success: function(res) {
          if (res.confirm) {
            wx.request({
              url: 'http://localhost:51332/api/DeleteSelectedCourse/PostDeleteSelectedCourse',
              data: JSON.stringify(that.data.choosecourse),
              header: {
                'content-type': 'application/json'
              },
              method: "POST",
              success: function(res) {
                console.log(res.data)
                wx.showToast({
                  title: res.data.Message,
                  icon: 'success',
                  duration: 1000
                })
                wx.request({
                  url: 'http://localhost:51332/api/SelectedCourse/PostSelectedCourse',
                  data: {
                    StudentId: app.globalData.studentid
                  },
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success: function(res) {
                    console.log(res.data)
                    that.setData({
                      courselist: res.data,
                      choosecourse: []
                    })
                    that.setData({
                      choosecourse: that.data.choosecourse.concat(app.globalData.studentid),
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