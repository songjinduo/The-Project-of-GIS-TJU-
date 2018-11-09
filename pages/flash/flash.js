Page({
    data:{
        src:"../../img/flash.png",
        animationData:{}
    },
    onLoad:function(options){
        //页面初始化，options为页面跳转带来的参数
    },
    onReady:function(){
        //页面渲染完成
        var that = this,duration = 1500;
        var animation = wx.createAnimation({
          duration: duration,
        });

        //step()表示一组动画的结束
        animation.scale(2).rotate(360).step();
        animation.scale(1).step();
        this.setData({animationData:animation.export()});

        var timestamp = new Date().getTime();
        setTimeout(function(){
          wx.navigateTo({
            url: '/pages/index/index',
          });
          },duration*2.5);
    },
    onShow:function(){

    },
    onHide:function(){

    },
    onUnload:function(){

    }
});