
> 策略名称

Demo吕神波动率策略

> 策略作者

中本姜





> 源码 (javascript)

``` javascript


/*backtest
start: 2020-03-01 00:00:00
end: 2020-04-25 00:00:00
period: 15m
basePeriod: 1m
exchanges: [{"eid":"Futures_BitMEX","currency":"XBT_USD"}]
args: [["Amount",1000,201812],["NewKMin",15,201812]]
*/


function EasyReadTime(millseconds) {
    if (typeof millseconds == 'undefined' ||
        !millseconds) {
        millseconds = new Date().getTime();
    }
    var newDate = new Date();
    newDate.setTime(millseconds);
    return newDate.toLocaleString();
}

function main() {
    exchange.SetContractType('XBTUSD')
    var vix_alg = $.VixAlg($.ChartObj, "VIX图表");
    while (true) {
        records = _C(exchange.GetRecords);
        $.DemoOnTick(vix_alg, records);
        Sleep(60 * 1000);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/203386

> 更新时间

2020-04-29 17:16:06
