// pages/BindingTeacherStudent/BindingStudentPage/BindingStudentPage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Binding: '',
    Delete: true,
    check: '',
    choosestudent: [],
    teachername: '',
    bindingstudentcolor: "red",
    deletestudentcolor: "black",
    studentlist: {
      StudentId: '',
      Name: '',
      ProfessionalClass: ''
    },


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      teachername: app.globalData.teachername
    })
    wx.request({
      url: 'http://localhost:51332/api/ReturnBindingStudentOfTeacher/PostCheckboxGroupStudent',
      data: {
        TeacherName: app.globalData.teachername
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function(res) {
        that.setData({
          studentlist: res.data,
          choosestudent: that.data.choosestudent.concat(app.globalData.teachername)
        })
        console.log(res.data)
      }
    })
  },

  Binding: function() {
    var that = this;
    console.log(that.data.choosestudent)
    if (that.data.choosestudent.length != 1) {
      wx.showModal({
        title: '提示',
        content: '是否将选中的这个(些)学生绑定给' + app.globalData.teachername + '老师？',
        success: function(res) {
          if (res.confirm) {
            wx.request({
              url: 'http://localhost:51332/api/BindingTeacherStudent/PostBindingTeacherStudent',
              data: JSON.stringify(that.data.choosestudent),
              header: {
                'content-type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded'
                // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
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
                  url: 'http://localhost:51332/api/ReturnBindingStudentOfTeacher/PostCheckboxGroupStudent',
                  data: {
                    TeacherName: app.globalData.teachername
                  },
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  method: "POST",
                  success: function(res) {
                    that.setData({
                      studentlist: res.data,
                      choosestudent: []
                    })
                    that.setData({
                      choosestudent: that.data.choosestudent.concat(app.globalData.teachername),
                      check: ''
                    })
                    console.log(that.data.choosestudent)
                  }
                })
              }

            })

          }
        }
      })
    } else {
      wx.showToast({
        title:"请选择学生",
        icon: 'loading',
        duration: 1000
      })
    }

  },


  Delete: function() {
    var that = this;
    console.log(that.data.choosestudent)
    if (that.data.choosestudent.length != 1) {
    wx.showModal({
      title: '提示',
      content: '是否将选中的这个(些)学生和' + app.globalData.teachername + '老师解绑？',
      success: function(res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:51332/api/DeleteTeacherStudent/PostDeleteTeacherStudent',
            data: JSON.stringify(that.data.choosestudent),
            header: {
              'content-type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded'
              // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
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
                url: 'http://localhost:51332/api/ReturnStudentOfTeacher/PostStudentOfTeacher',
                data: {
                  TeacherName: app.globalData.teachername
                },
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: "POST",
                success: function(res) {
                  that.setData({
                    studentlist: res.data,
                    choosestudent: []
                  })
                  that.setData({
                    choosestudent: that.data.choosestudent.concat(app.globalData.teachername),
                    check: ''
                  })
                  console.log(that.data.choosestudent)
                }
              })
            }

          })

        }
      }
    })
    }
    else{
      wx.showToast({
        title: "请选择学生",
        icon: 'loading',
        duration: 1000
      })
    }

  },


  checkboxChange: function(e) {
    var that = this;
    var index = 0;
    if (e.detail.value.length != 0) {
      that.setData({
        choosestudent: that.data.choosestudent.concat(e.detail.value)
      })
      console.log(that.data.choosestudent)
    } else {
      for (var i = 0; i < that.data.choosestudent.length; i++) {
        if (that.data.choosestudent[i] == e.currentTarget.id) {
          index = i;
          break;
        }
      }
      that.data.choosestudent.splice(index, 1);
      console.log(that.data.choosestudent);
    }

  },

  bindingstudent: function() {
    var that = this;
    that.setData({
      teachername: app.globalData.teachername,
      bindingstudentcolor: "red",
      deletestudentcolor: "black",
      Binding: '',
      Delete: true
    })
    wx.request({
      url: 'http://localhost:51332/api/ReturnBindingStudentOfTeacher/PostCheckboxGroupStudent',
      data: {
        TeacherName: app.globalData.teachername
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function(res) {
        that.setData({
          studentlist: res.data,
          choosestudent: []
        })
        that.setData({
          choosestudent: that.data.choosestudent.concat(app.globalData.teachername),
          check: ''
        })
        console.log(that.data.choosestudent)
      }
    })
  },


  deletestudent: function() {
    var that = this;
    that.setData({
      teachername: app.globalData.teachername,
      bindingstudentcolor: "black",
      deletestudentcolor: "red",
      Binding: true,
      Delete: '',
    })
    wx.request({
      url: 'http://localhost:51332/api/ReturnStudentOfTeacher/PostStudentOfTeacher',
      data: {
        TeacherName: app.globalData.teachername
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      success: function(res) {
        that.setData({
          studentlist: res.data,
          choosestudent: []
        })
        that.setData({
          choosestudent: that.data.choosestudent.concat(app.globalData.teachername),
          check: ''
        })
        console.log(that.data.choosestudent)
      }
    })
  },


  Return1:function(){
    wx.redirectTo({
      url: "/pages/BindingTeacherStudent/BindingTeacherStudent"
    })
  },

  Return2: function () {
    wx.redirectTo({
      url: "/pages/BindingTeacherStudent/BindingTeacherStudent"
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