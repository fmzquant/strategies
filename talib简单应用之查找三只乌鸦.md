
> Name

talib简单应用之查找三只乌鸦

> Author

Zero





> Source (javascript)

``` javascript
/*backtest
start: 2017-12-05 00:00:00
end: 2017-12-06 12:00:00
period: 5m
exchanges: [{"eid":"OKCoin_EN","currency":"BTC"}]
*/

function main() {
    while (true) {
        var r = exchange.GetRecords();
        var pos = _.indexOf(talib.CDL3BLACKCROWS(r), -100);
        // 找到三只乌鸦的形态而且是在当前最后一个K线形成的
        if (pos != -1 && pos == r.length - 1) {
            Log("K线索引:", pos, r.length, "时间:", _D(r[pos].Time));
            // 下个卖单, 这们回测图表会有一个买单的标志
            exchange.Sell(_C(exchange.GetTicker).Buy, 0.1);
            throw "找到三只乌鸦";
        }
        Sleep(1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/62163

> Last Modified

2018-04-07 11:47:38
