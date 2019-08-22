// pages/CreateCourse/CreateCourse.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    courseid: '',
    coursename: '',
    courseplace: '',
    starthour: '',
    startminute: '',
    startsecond: '',
    overhour: '',
    overminute: '',
    oversecond: '',
    weekday: '',
    selectArray: [{
        "id": "1",
        "text": "周一"
      }, {
        "id": "2",
        "text": "周二"
      }, {
        "id": "3",
        "text": "周三"
      },
      {
        "id": "4",
        "text": "周四"
      },
      {
        "id": "5",
        "text": "周五"
      },
      {
        "id": "6",
        "text": "周六"
      }
    ],


    /*
        selecthourtime: [{
            "id": "0",
            "text": "00"
          }, {
            "id": "1",
            "text": "01"
          }, {
            "id": "2",
            "text": "02"
          },
          {
            "id": "3",
            "text": "03"
          },
          {
            "id": "4",
            "text": "04"
          },
          {
            "id": "5",
            "text": "05"
          },
          {
            "id": "6",
            "text": "06"
          },
          {
            "id": "7",
            "text": "07"
          },
          {
            "id": "8",
            "text": "08"
          },
          {
            "id": "9",
            "text": "09"
          },
          {
            "id": "10",
            "text": "10"
          },
          {
            "id": "11",
            "text": "11"
          },
          {
            "id": "12",
            "text": "12"
          },
          {
            "id": "13",
            "text": "13"
          },
          {
            "id": "14",
            "text": "14"
          },
          {
            "id": "15",
            "text": "15"
          },
          {
            "id": "16",
            "text": "16"
          },
          {
            "id": "17",
            "text": "17"
          },
          {
            "id": "18",
            "text": "18"
          },
          {
            "id": "19",
            "text": "19"
          },
          {
            "id": "20",
            "text": "20"
          }, {
            "id": "21",
            "text": "21"
          }, {
            "id": "22",
            "text": "22"
          }, {
            "id": "23",
            "text": "23"
          }, {
            "id": "24",
            "text": "24"
          },
          {
            "id": "25",
            "text": "25"
          },
          {
            "id": "26",
            "text": "26"
          },
          {
            "id": "27",
            "text": "27"
          },
          {
            "id": "28",
            "text": "28"
          },
          {
            "id": "29",
            "text": "29"
          },
          {
            "id": "30",
            "text": "30"
          },
          {
            "id": "31",
            "text": "31"
          },
          {
            "id": "32",
            "text": "32"
          },
          {
            "id": "33",
            "text": "33"
          },
          {
            "id": "34",
            "text": "34"
          },
          {
            "id": "35",
            "text": "35"
          },
          {
            "id": "36",
            "text": "36"
          },
          {
            "id": "37",
            "text": "37"
          },
          {
            "id": "38",
            "text": "38"
          },
          {
            "id": "39",
            "text": "39"
          },
          {
            "id": "40",
            "text": "40"
          },
          {
            "id": "41",
            "text": "41"
          },
          {
            "id": "42",
            "text": "42"
          },
          {
            "id": "43",
            "text": "43"
          },
          {
            "id": "44",
            "text": "44"
          },
          {
            "id": "45",
            "text": "45"
          },
          {
            "id": "46",
            "text": "46"
          },
          {
            "id": "47",
            "text": "47"
          },
          {
            "id": "48",
            "text": "48"
          },
          {
            "id": "49",
            "text": "49"
          },
          {
            "id": "50",
            "text": "50"
          },
          {
            "id": "51",
            "text": "51"
          },
          {
            "id": "52",
            "text": "52"
          },
          {
            "id": "53",
            "text": "53"
          },
          {
            "id": "54",
            "text": "54"
          },
          {
            "id": "55",
            "text": "55"
          },
          {
            "id": "56",
            "text": "56"
          },
          {
            "id": "57",
            "text": "57"
          },
          {
            "id": "58",
            "text": "58"
          },
          {
            "id": "59",
            "text": "59"
          },
        ],
    */
  },

  getDate: function(e) {
    this.setData({
      weekday: e.detail.text
    })
    console.log(e.detail.text)
  },



  courseidinput: function(e) {
    this.setData({
      courseid: e.detail.value
    })
  },

  coursenameinput: function(e) {
    this.setData({
      coursename: e.detail.value
    })
  },

  courseplaceinput: function(e) {
    this.setData({
      courseplace: e.detail.value
    })
  },



  Return: function() {
    wx.switchTab({
      url: "/pages/admins/ManageCourses/ManageCourses"
    })
  },

  getlocation: function() {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        that.setData({
          longitude: String(res.longitude),
          latitude: String(res.latitude)
        })
        wx.showToast({
          title: "定位成功",
          icon: 'success',
          duration: 1000
        })
      },
      fail: function() {
        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权,将无法设置课程实际位置,点击确定重新获取授权。',
          success: function(res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {
                  if (res.authSetting["scope.userLocation"]) { ////如果用户重新同意了授权登录
                    wx.getLocation({
                      type: 'wgs84',
                      success(res) {
                        that.setData({
                          longitude: String(res.longitude),
                          latitude: String(res.latitude)
                        })
                        wx.showToast({
                          title: "定位成功",
                          icon: 'success',
                          duration: 1000
                        })
                      }
                    })
                  }
                }
              })
            }

          }
        })
      }
    })
  },

  coursestarthourinput: function(e) {
    this.setData({
      starthour: e.detail.value
    })
  },

  coursestartminuteinput: function(e) {
    this.setData({
      startminute: e.detail.value
    })
  },

  coursestartsecondinput: function(e) {
    this.setData({
      startsecond: e.detail.value
    })
  },

  courseoverhourinput: function(e) {
    this.setData({
      overhour: e.detail.value
    })
  },

  courseoverminuteinput: function(e) {
    this.setData({
      overminute: e.detail.value
    })
  },

  courseoversecondinput: function(e) {
    this.setData({
      oversecond: e.detail.value
    })
  },


  create: function(e) {
    var that = this;
    if (that.data.courseid != '') {
      if (that.data.coursename != '') {
        if (that.data.courseplace != '') {
          if (that.data.longitude != '' || that.data.latitude != '') {
            if (that.data.weekday != '') {
              if (that.data.starthour != '' && that.data.startminute != '' && that.data.startsecond != '' && that.data.overhour != '' && that.data.overminute != '' && that.data.oversecond != '') {
                if ((Number(that.data.starthour) >= 0 && Number(that.data.starthour) <= 24) && (Number(that.data.startminute) >= 0 && Number(that.data.startminute) <= 59) && (Number(that.data.startsecond) >= 0 && Number(that.data.startsecond) <= 59) && (Number(that.data.overhour) >= 0 && Number(that.data.overhour) <= 24) && (Number(that.data.overminute) >= 0 && Number(that.data.overminute) <= 59) && (Number(that.data.oversecond) >= 0 && Number(that.data.oversecond) <= 59)) {
                  wx.request({
                    url: 'http://localhost:51332/api/CreateCourse/PostCreateCourse',
                    data: {
                      CourseId: that.data.courseid,
                      CourseName: that.data.coursename,
                      CoursePlace: that.data.courseplace,
                      CourseNature: that.data.coursenature,
                      StartTime: that.data.starthour + ':' + that.data.startminute + ':' + that.data.startsecond,
                      OverTime: that.data.overhour + ':' + that.data.overminute + ':' + that.data.oversecond,
                      Longitude: Number(that.data.longitude),
                      Latitude: Number(that.data.latitude),
                      WeekDay: that.data.weekday
                    },
                    header: {
                      //'content-type': 'application/json'
                      'Content-Type': 'application/x-www-form-urlencoded'
                      //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' 
                    },
                    method: "POST",
                    success: function(res) {
                      if (res.data.Message == "该编号已存在") {
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
                      }
                    }
                  })
                } else {
                  wx.showToast({
                    title: '时间不合法',
                    icon: 'loading',
                    duration: 1000
                  })
                }
              } else {
                wx.showToast({
                  title: '时间不能为空',
                  icon: 'loading',
                  duration: 1000
                })
              }

            } else {
              wx.showToast({
                title: '请选择星期',
                icon: 'loading',
                duration: 1000
              })
            }
          } else {
            wx.showToast({
              title: '获取位置失败',
              icon: 'loading',
              duration: 1000
            })
          }
        } else {
          wx.showToast({
            title: '地点不能为空',
            icon: 'loading',
            duration: 1000
          })
        }
      } else {
        wx.showToast({
          title: '名称不能为空',
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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