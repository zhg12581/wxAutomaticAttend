// pages/BindingRole/BindingRole.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    studenthide:'',
    teacherhide:true,
    studenttipcolor:"red",
    teachertipcolor:"black",
    studentlist:{
      StudentId:'',
      Name:'',
      ProfessionalClass:''
    },
    teacherlist:{
      TeacherId:'',
      Name:'',
      Subject:''
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://localhost:51332/api/ReturnPrimaryStudent/GetPrimaryStudent',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          studentlist: res.data
        })
        console.log(res.data)
      }
    })
  },

  Return: function () {
    wx.switchTab({
      url: "/pages/admins/ManageRoles/ManageRoles"
    })
  },


  ConfirmStudent: function (e) {
    var that = this;
    var idd = e.currentTarget.id;
    console.log(idd)
    wx.showModal({
      title: '提示',
      content: '是否确认学号为' + idd + '的人为学生？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:51332/api/ConfirmStudentRole/PostConfirmStudent',
            data: {
              UserId: idd
            },
            header: {
              //'content-type': 'application/json'
              'Content-Type': 'application/x-www-form-urlencoded'
              //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
            },
            method: "POST",
            success: function (res) {
              wx.showToast({
                title: res.data.Message,
                icon: 'success',
                duration: 1000
              })
              wx.request({
                url: 'http://localhost:51332/api/ReturnPrimaryStudent/GetPrimaryStudent',
                headers: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  that.setData({
                    studentlist: res.data
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


  ConfirmTeacher: function (e) {
    var that = this;
    var idd = e.currentTarget.id;
    console.log(idd)
    wx.showModal({
      title: '提示',
      content: '是否确认编号为' + idd + '的人为老师？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:51332/api/ConfirmTeacherRole/PostConfirmStudent',
            data: {
              UserId: idd
            },
            header: {
              //'content-type': 'application/json'
              'Content-Type': 'application/x-www-form-urlencoded'
              //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
            },
            method: "POST",
            success: function (res) {
              wx.showToast({
                title: res.data.Message,
                icon: 'success',
                duration: 1000
              })
              wx.request({
                url: 'http://localhost:51332/api/ReturnPrimaryTeacher/GetPrimaryTeacher',
                headers: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  that.setData({
                    teacherlist: res.data
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



  DeleteStudent: function (e) {
    var that = this;
    var idd = e.currentTarget.id;
    console.log(idd)
    wx.showModal({
      title: '提示',
      content: '是否否定并删除编号为' + idd + '的申请？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:51332/api/DeleteStudentRole/PostDeleteStudent',
            data: {
              UserId: idd
            },
            header: {
              //'content-type': 'application/json'
              'Content-Type': 'application/x-www-form-urlencoded'
              //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
            },
            method: "POST",
            success: function (res) {
              wx.showToast({
                title: res.data.Message,
                icon: 'success',
                duration: 1000
              })
              wx.request({
                url: 'http://localhost:51332/api/ReturnPrimaryStudent/GetPrimaryStudent',
                headers: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  that.setData({
                    studentlist: res.data
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


  DeleteTeacher: function (e) {
    var that = this;
    var idd = e.currentTarget.id;
    console.log(idd)
    wx.showModal({
      title: '提示',
      content: '是否否定并删除编号为' + idd + '的申请？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'http://localhost:51332/api/DeleteTeacherRole/PostDeleteTeacher',
            data: {
              UserId: idd
            },
            header: {
              //'content-type': 'application/json'
              'Content-Type': 'application/x-www-form-urlencoded'
              //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
            },
            method: "POST",
            success: function (res) {
              wx.showToast({
                title: res.data.Message,
                icon: 'success',
                duration: 1000
              })
              wx.request({
                url: 'http://localhost:51332/api/ReturnPrimaryTeacher/GetPrimaryTeacher',
                headers: {
                  'Content-Type': 'application/json'
                },
                success: function (res) {
                  that.setData({
                    teacherlist: res.data
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


  studenttip: function () {
    var that = this
    wx.request({
      url: 'http://localhost:51332/api/ReturnPrimaryStudent/GetPrimaryStudent',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          studentlist: res.data,
          studenttipcolor: "red",
          teachertipcolor: "black",
          studenthide: '',
          teacherhide: true
        })
        console.log(res.data)
      }
    })
  },

  teachertip: function () {
    var that = this
    wx.request({
      url: 'http://localhost:51332/api/ReturnPrimaryTeacher/GetPrimaryTeacher',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          teacherlist: res.data,
          studenttipcolor: "black",
          teachertipcolor: "red",
          studenthide: true,
          teacherhide: ''
        })
        console.log(res.data)
      }
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