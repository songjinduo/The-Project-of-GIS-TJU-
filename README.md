# 地理信息系统（GIS）课程设计大作业
一个天气小程序（包含全国地方天气搜索查询，全国市级灾害预警实时显示，全国空气污染情况实时显示，全国PM2.5最高最低显示以及各种设置功能），具体情况参考程序说明。
##### 主目录
* app.js——主文件的后台代码
* app.json——控制文件主窗口的格式、名称以及各个文件的路径调用
* cloudfunction——微信小程序的云开发函数文件
* components——组件构造器文件，用于某些组件的功能控制
* img——图标和图片的储存文件
* utils——配置文件，包括服务器数据调取，界面数据的处理代码
* pages——各个界面的功能代码的储存文件以及Echarts功能模块的储存文件
  >* ec-canvas——Echarts图表的库文件
  >* echarts——有关echarts的页面文件
    >>* pm2.5——全国pm2.5最高前50和最低后5个城市在地图上的实时显示
  >* index——主页面文件
    >>* flash——程序启动的flash动画功能
    >>* index——程序主页面，包括当天的天气数据、查询天气窗口和天气提示语
  >* map——地图页面文件
    >>* air——全国空气质量实时监测排名（取最差的10个城市）和各省污染程	度实时监测功能
    >>* map——地图城市查询功能
    >>* warning——市级城市预警实时地图分类显示功能
  >* others——其他功能页面文件
    >>* img——存储了程序的flash图片
    >>* setting——主页面的设置功能
    >>* systeminfo——调用手机的设置功能
  
##### 运行环境
* 微信web开发者工具

##### 运行界面展示
* 主界面

  ![image](https://github.com/songjinduo/The-Work-of-GIS-TJU-/blob/master/images/1.png)
  
  ![image](https://github.com/songjinduo/The-Work-of-GIS-TJU-/blob/master/images/2.png)
  
* 查询天气界面

  ![image](https://github.com/songjinduo/The-Work-of-GIS-TJU-/blob/master/images/8.png)
  
  ![image](https://github.com/songjinduo/The-Work-of-GIS-TJU-/blob/master/images/3.png)
  
* 市级预警界面

  ![image](https://github.com/songjinduo/The-Work-of-GIS-TJU-/blob/master/images/4.png)

* 空气质量排名界面

  ![image](https://github.com/songjinduo/The-Work-of-GIS-TJU-/blob/master/images/5.png)

  ![image](https://github.com/songjinduo/The-Work-of-GIS-TJU-/blob/master/images/6.png)

* 全国PM2.5峰值地图页面

  ![image](https://github.com/songjinduo/The-Work-of-GIS-TJU-/blob/master/images/7.png)
