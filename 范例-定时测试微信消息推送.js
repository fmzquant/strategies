/*
策略出处: https://www.botvs.com/strategy/15098
策略名称: 范例-定时测试微信消息推送
策略作者: 小小梦
策略描述:

定时测试微信消息推送 范例~抛砖引玉，方便用户参考学习。

*/

function main(){
    var initTime = (new Date()).getTime() ;
    Log("程序起始时间：",$.getTimeByNormal(initTime) );
    var preDif = 0;
    var str = "";
    while(true){
        var nowTime = (new Date()).getTime();
        if(  Math.floor((nowTime - initTime) / (1000*60*10) ) !== preDif ){
            str = $.getTimeByNormal(nowTime);
            Log("从程序开始执行，已过10分钟！提醒。"+"--现在时间："+str+"推送微信@" );
            preDif = Math.floor((nowTime - initTime) / (1000*60*10) ) ;
        }
        Sleep(2000); 
    }
}
