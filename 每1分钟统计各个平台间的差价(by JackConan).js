/*
策略出处: https://www.botvs.com/strategy/98
策略名称: 每1分钟统计各个平台间的差价(by JackConan)
策略作者: yzl_126@126.com
策略描述:

统计各个平台间的最大差价; 
如果要打印当时各交易所的市场行情，可以把 //printCurPrice();   前面的注释//去掉；

*/

var maxSpace = 0;

function adjustFloat(v) {
    return Math.floor(v*1000)/1000;
}

function printCurPrice() {
    for (var i = 0; i < exchanges.length; i++) {
        Log(exchanges[i].GetName(),'=',exchanges[i].GetTicker());
    }
}

function onTick() {
    // TODO something.
    var smallPrice = 99999;
    var bigPrice = 0;
    var curPrice = 0;
    var curSpace = 0;
    
    for (var i = 0; i < exchanges.length; i++) {
        curPrice = exchanges[i].GetTicker().Last;
        if (curPrice < smallPrice){
            smallPrice = curPrice;
        }
        if (curPrice > bigPrice){
            bigPrice = curPrice;
        }
        curSpace = bigPrice - smallPrice;
    }
    
    if (curSpace > maxSpace){
        maxSpace = curSpace;
        //打印各交易所当前的市场行情；
        printCurPrice();
        Log('有新高差价:', adjustFloat(maxSpace),'高价:', bigPrice,'低价:', smallPrice, '发生时间 →_→');
    }
    Log('当前差价:', adjustFloat(curSpace),'高价:', bigPrice,'低价:', smallPrice,'最高差价:', adjustFloat(maxSpace));
}

function main() {
    if (exchanges.length < 2) {
        Log("交易所数量最少得两个才能完成统计");
        return;
    }
    while(true) {
        onTick();
        Sleep(60000);
    }
}
