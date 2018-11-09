// pages/map/map.js
var app = getApp();
var Data = [];
import servers from '../../utils/servers.js';
let utils = require('../../utils/utils.js')
var markersParentIndex = null; // 一级 markers 索引
var cnt = 0;
var cur_name = '';
var dateT = '';
var days = 1;
var nameList = new Array();
var IDtype = 1;//预警类型
var index = 0;//数据的下标
Page({
  data: {//存数据的类型34.76571,113.75322
    scale: 5,
    longitude: "113.324520",
    latitude: "34.76571",
    userInfo: {}, // 用户信息
    markersEye: [], // 可是 markers
    markerData: [],  // markers 原始数据
    controls: []
  },
  tap(e) {//点击页面响应
    //console.log("点击")
  },
  // console.log("视野发生变化时触发", e)
  regionchange(e) {
    //console.log("变化"),
    //console.log(servers.getMarkers);
  },
  markertap(e) {
    var that = this;
    var markerId = e.markerId;
    var name = Data[markerId].name;
    if(cur_name != name)
    {
       cnt = 0;
       cur_name = name;
    }
    cnt = cnt+1;
    var that = this, markerData = that.data.markerData;
    if(cnt>1)
    {
      let pages = getCurrentPages()
      let len = pages.length
      let indexPage = pages[len - 2]
      var marker = markerData[markerId]
      var name = marker.name
      var center = marker.center
      var dateday = marker.dateday
      var datehour = marker.datehour
      var warning = marker.text
      var flag = marker.flag
      var flag1 = '已解除'
      //var subData = (markerData[markersParentIndex] || {}).subDistricts || [];
      //var d = subData[markerId];
      if (flag == 1)
        flag1 = '未解除'
      wx.showActionSheet({//屏幕中央的块
        itemList: ['地点: ' + name, '坐标: ' + center, ' 预警: ' + warning, '发布时间：' + dateday + "--" + datehour, '状态:' + flag1],
        success: function (res) {
          
        },
        fail: function (res) {
  
        }
      });
    }
  },
  // "点击控件时触发",)
  controltap(e) {
    var that = this;
    //console.log(e)
    var id = e.controlId
    IDtype = id//更新类型
    that.resetMap();
  },
  //点击标记点对应的气泡时触发
  callouttap(e) {
    // e.markerId 对应气泡的id
    console.log(e)
    var that = this, markerId = e.markerId, markerData = that.data.markerData;
    /*
    console.log(markerData)
    console.log(markerId)
    console.log(markersParentIndex, markerId)
    console.log(e)
    */
    
    if (markersParentIndex === null) {//第一层
      let pages = getCurrentPages()
      let len = pages.length
      let indexPage = pages[len - 2]
      var marker = markerData[markerId]
      var name = marker.name
      var center = marker.center
      var dateday = marker.dateday
      var datehour = marker.datehour
      var warning = marker.text
      var flag = marker.flag
      var flag1 = '已解除'
      if(flag==1)
          flag1 = '未解除'
      if(nameList.indexOf(name))
        return
      wx.showActionSheet({ 
        itemList: ['地点: ' + name, '坐标: ' + center, ' 预警: ' + warning, '发布时间：' + datehour + "--" + dateday, '状态:' + flag1],
        //content: '名称: ' + name + '\n' + '坐标: ' + center + '预警：' + warning,
        success: function (res) {
        },
        fail: function (res) {
  
        }
      });
    }
  },

  // 获取数据,并对数据点操作
  creatMarkers(options, sub = false) {
    if(options.center!=null)
    {
      var that = this
      var latLon = options.center.split(',')//坐标
      var len = options.subDistricts ? options.subDistricts.length : 0;
      var flag = options.flag
      var datet = options.dateday
      var icon = ["/img/icon_map/blue.png", "/img/icon_map/yellow.png", "/img/icon_map/orange.png", "/img/icon_map/red.png"]
      
      var text = options.text
      var id = options.type//数据的类型
      
      var color = 0    //点图标的颜色 
      for(var i=0; i<text.length-1; i++)
      {
            if(text[i]=='黄' && text[i+1]=='色')
                  color = 1
            else if(text[i]=='橙' && text[i+1]=='色')
                  color = 2
            else if(text[i]=='红' && text[i+1]=='色')
                  color = 3
      }
      //console.log(dateT[dateT.length-1]-datet[datet.length-1])
      //console.log(id,IDtype)
      if (dateT[dateT.length - 1] - datet[datet.length - 1]<5 && id==IDtype)
      {
        index = index+1
        console.log(options)
       // console.log(index)
        nameList[index] = options.name
          return {
            iconPath: icon[color],
            id: options._index,
            latitude: latLon[0],
            longitude: latLon[1],
            width: 32,
            height: 32,
            callout: {
              content: options.name,
              dateday: options.dateday,
              datehour: options.datehour,
              warning: options.text,
              types: options.type,
              flag: options.flag,
              //display:' BYCLICK',
              //content: '<text class="map-callout">' + options.name + (sub ? "" : "(" + len.toString() + ")") + '</text>',
              borderRadius: 3,
              color: '#fff',
              bgColor: sub ? '#339933' : '#0099ff',
              boxShadow: '0 3px 6px rgba(0,0,0,.3)',
            },
          }
        }
      }
      
  },
  resetMap() {
    var that = this;
    markersParentIndex = null;
    nameList.splice(0, nameList.length);
    index = 0;
    that.setData({
      controls: [{
        id: 1,
        iconPath: '/img/icon_map/da_feng.png',
        position: {
          left: 0,
          top: 0,
          width: 30,
          height: 30
        },
        clickable: true
      },
        {
          id: 2,
          iconPath: '/img/icon_map/bao_yu .png',
          position: {
            left: 40,
            top: 0,
            width: 30,
            height: 30
          },
          clickable: true
        },
        {
          id: 3,
          iconPath: '/img/icon_map/da_wu.png',
          position: {
            left: 80,
            top: 0,
            width: 30,
            height: 30
          },
          clickable: true
        },
        {
          id: 4,
          iconPath: '/img/icon_map/bing_xue.png',
          position: {
            left: 120,
            top: 0,
            width: 30,
            height: 30
          },
          clickable: true
        },
        {
          id: 5,
          iconPath: '/img/icon_map/tai_feng.png',
          position: {
            left: 160,
            top: 0,
            width: 30,
            height: 30
          },
          clickable: true
        },
        {
          id: 6,
          iconPath: '/img/icon_map/qi_ta.png',
          position: {
            left: 200,
            top: 0,
            width: 30,
            height: 30
          },
          clickable: true
        },
        ],
      markersEye: [],
      markers: that.data.markerData.map((item, index) => {
        return item._index = index, that.creatMarkers(item)
      })
    })
  },
  getDatas() {
    var that = this
    wx.showToast({
      icon: 'loading',
      title: '加载中'
    })
    wx.request({
      //url: servers.getMarkers,//得到服务器地址
      url: servers.getMarkers3,
      complete: (d) => {
        wx.hideToast()
        d.statusCode === 200 ?
          (that.setData({markerData: d.data,}), Data = d.data, dateT =Data[0].dateday, that.resetMap()) :
          wx.showToast({
            title: 'Error:code:' + d.statusCode
          })
      }
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    this.getDatas();
  }

})
