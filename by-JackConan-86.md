
> Name

by-JackConan-86

> Author

yzl_126@126.com

> Strategy Description

Calculates the maximum spread across different platforms.
If you want to print the market quotes from each exchange at that moment, remove the leading comment marks before `//printCurPrice();`.

> Source (javascript)

``` javascript
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
        curPrice = exchanges[i].GetTicker().Buy;
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
        Log('差价:', adjustFloat(maxSpace),'高价:', bigPrice,'低价:', smallPrice, '发生时间 →_→');
        //打印各交易所当前的市场行情；
        printCurPrice();
    }
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
```

> Detail

https://www.fmz.com/strategy/86

> Last Modified

2014-06-22 21:15:34
