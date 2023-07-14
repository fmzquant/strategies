
> Name

GuoJian_First

> Author

liuguojian



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|min|0.0085|买入最小值|
|max|0.008534|卖出最大值|


> Source (javascript)

``` javascript
/*backtest
start: 2018-08-27 00:00:00
end: 2018-08-28 20:00:00
period: 1m
exchanges: [{"eid":"Huobi","currency":"LTC_BTC"}]
*/

function main() {
    Log(max);
    Log(min);
    var a = 1;
    while(true){
        Log(exchange.GetAccount());
        var ticker = exchange.GetTicker();
        Log(ticker);
        if(ticker.High >= max){
            //Log("当前最高价"+ticker.High);
            //Log("将所有USDT换成BTC");
            Log("卖出1");
            exchange.Sell(-1, 1);
            Log(exchange.GetAccount());
            
        }
        if(ticker.Low <= min){
            Log("买入1");
            exchange.Buy(-1, 1);
            Log(exchange.GetAccount());
            break;
        }
        a++;
        Sleep(60000); // 一分钟
    }
    
}

function onexit(){
    Log("onexit");
}

function onerror(){
    Log("onerror");
}

function init(){
    Log("init");
}




    
 
```

> Detail

https://www.fmz.com/strategy/113871

> Last Modified

2018-08-28 21:43:15
