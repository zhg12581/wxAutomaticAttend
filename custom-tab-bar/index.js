const app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: app.globalData.list//app.globalData.list
    /*
    "list": [{
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
  },
  attached() {},
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url
      })
      this.setData({
        selected: data.index
      })
    }
  }
})