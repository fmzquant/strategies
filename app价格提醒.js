/*
策略出处: https://www.botvs.com/strategy/4987
策略名称: app价格提醒
策略作者: fxlee
策略描述:

当前成交价格达到设定后触发，支持多平台。只保留整数，预防频繁推送


参数          默认值  描述
--------  -----  ----
Interval     60  检测间隔
MaxPrice   2000  最大价格
MinPrice   1000  最小价格
*/


var oldmsg="";

function push(){
    var msg="价格提醒：\n";
    var max=0;
    var min=100000;
    for(i=0;i<exchanges.length;i++){
        var name=exchanges[i].GetName();
        var ticker;
        while(!(ticker=exchanges[i].GetTicker())){
            Sleep(Interval*1000);
        }
        var value=parseInt(ticker.Last);
        msg+=name+":"+value+"\n";
        max=Math.max(max,value);
        min=Math.min(min,value);
    }
    if(oldmsg!=msg){
        if(max>MaxPrice||min<MinPrice){
            Log(msg+"@");
            oldmsg=msg;
        }
    }
}


function main() {
    while(true){
        push();
        Sleep(Interval*1000);
    }
    
}
