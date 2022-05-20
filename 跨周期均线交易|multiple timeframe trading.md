
> 策略名称

跨周期均线交易|multiple timeframe trading

> 策略作者

发明者量化

> 策略描述

[trans]演示Pine语言如何跨周期调用||Demonstrates how the pine language use multiple timeframe[/trans]



> 源码 (javascript)

``` javascript
/*backtest
start: 2021-05-04 00:00:00
end: 2022-05-03 23:59:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Bitfinex","currency":"BTC_USD"}]
*/
strategy("multiple timeframe trading")

expr = ta.ema(close, 5)
hVal = request.security(syminfo.tickerid, '60', expr)

plot(expr, timeframe.period)
plot(hVal, '1hour')

// 5 hour vs 5 days
if hVal > expr
    strategy.entry("long", strategy.long)
else
    strategy.entry("short", strategy.short)

```

> 策略出处

https://www.fmz.com/strategy/361360

> 更新时间

2022-05-06 16:47:08
