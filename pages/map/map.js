// pages/map/map.js
var app = getApp();
var Data = [];
import servers from '../../utils/servers.js';
let utils = require('../../utils/utils.js')
var markersParentIndex = null; // 一级 markers 索引
Page({
  data: {//存数据的类型34.76571,113.75322
    scale: 5,
    longitude: "113.324520",
    latitude: "34.76571",
    userInfo: {}, // 用户信息
    callout:{},
    markersEye: [], // 可是 markers
    markerData: [],  // markers 原始数据
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
    var id = e.markerId;
    var name = Data[id].name;
    
    /*
    wx.showActionSheet({//屏幕中央的块
      itemList: ['地点: ' + name, '坐标: ' + center, ' 预警: ' + warning, '发布时间：' + dateday + "--" + datehour, '状态:' + flag1],
      success: function (res) {
      },
      fail: function (res) {
      }
    });
    */
    console.log(name)
  },
  // "点击控件时触发",)
  controltap(e) {
    var that = this;
    that.setData(
      {
        scale:this.data.scale,
        longitude: "113.324520",
        latitude: "23.099994",
      }
    )
    switch (e.controlId) {
      case 1:
        that.resetMap();
        break
    }
    
  },
  //点击标记点对应的气泡时触发
  callouttap(e) { 
    // e.markerId 对应气泡的id
    var that = this, markerId = e.markerId ,markerData = that.data.markerData;
    console.log(markersParentIndex, markerId)
    console.log(e)
    if (markersParentIndex === null) {//第一层
      var subData = (markerData[markerId] || {}).subDistricts || [];
      var markers = subData.map((item, index) => {
        return item._index = index, that.creatMarkers(item, true)
      });
      markers.length ? (markersParentIndex = markerId,that.setData({
        markersEye: markers,
        markers: markers,
        controls: [{
          id: 1,
          iconPath: '/img/icon_map/back.png',
          position: {
             left: 0, 
             top: 0,
            width: 20,
            height: 20
              },
          clickable: true,
          callout: {
            content: '123',
            borderRadius: 3,
            color: '#fff',
            boxShadow: '0 3px 6px rgba(0,0,0,.3)',
          }
        }]
      })) : wx.showModal({ title: '没有数据' })
    } else {
      let pages = getCurrentPages()
      let len = pages.length
      let indexPage = pages[len - 2]
      var subData = (markerData[markersParentIndex] || {}).subDistricts || [];
       
      var d = subData[markerId];
       wx.showModal({//屏幕中央的块
          title: '查询天气状况',
          content: '名称: ' + d.name + '\n' +  '坐标: ' + d.center,
          success: function (res) {
            if (res.confirm) {
              //   console.log('用户点击确定')
              indexPage.setData({
                // 是否切换了城市
                cityChanged: true,
                // 需要查询的城市
                searchCity:d.name,
              })
              wx.navigateBack({})
            } else if (res.cancel) {
              //  console.log('用户点击取消')

            }
          }
        }); 
        /* 
        wx.showActionSheet({//屏幕下方的块
          itemList: ['名称: ' + d.name , '坐标: ' + d.center , ' 数据: ' + d.count],
          success: function (res) {
            console.log(res.tapIndex)
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        })
        */
    }
  },
  
  // 获取数据,并对数据点操作
  creatMarkers(options, sub = false) {
    console.log(options.center)
    var latLon = options.center.split(',')//坐标
    var len = options.subDistricts ? options.subDistricts.length : 0;
    return {
      iconPath: sub ? "/img/icon-marker-sub.png" : "/img/icon-marker.png",
      id: options._index,
      latitude: latLon[0], 
      longitude: latLon[1], 
      width: 32,
      height: 32,
      callout: {
        content: options.name,
       // display:' BYCLICK',
        display: ' ALWAYS',
        //content: '<text class="map-callout">' + options.name + (sub ? "" : "(" + len.toString() + ")") + '</text>',
        borderRadius: 3,
        color: '#fff',
        bgColor: sub ? '#339933' : '#0099ff',
        boxShadow: '0 3px 6px rgba(0,0,0,.3)',
      },
    }
  },
  resetMap() {
    var that = this;
    markersParentIndex = null;
    that.setData({
      controls: [],
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
      url: servers.getMarkers2,
      complete: (d) => {
        wx.hideToast()
        d.statusCode === 200 ?
          (that.setData({ markerData: d.data }), Data=d.data, that.resetMap()) :
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
