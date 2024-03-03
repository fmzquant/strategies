
> Name

一目均衡表交易策略Ichimoku-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]  

## 策略原理

该策略运用一目均衡表(Ichimoku Kinko Hyo)进行做多交易。它综合考虑均衡表的多个因素,在符合条件时做多。

具体交易逻辑是:

1. 计算转化线、基准线、先导线1、先导线2

2. 当收盘价高于云层,且云层向上,转化线高于基准线时,考虑做多

3. 此外,延迟线要高于云层和价格,以确保趋势向上

4. 当上述条件均满足时,做多入场

5. 如果延迟线回落到价格以下或云层以下,平仓

该策略充分利用一目均衡表的多种指标来确认趋势,并以云层作为动态止损位,可有效控制风险。

## 策略优势

- 一目均衡表综合多种因素判断趋势

- 动态止损,最大程度锁定利润

- 规则简单清晰,容易实施

## 策略风险

- 一目均衡表较慢,可能错过机会

- 需要谨慎设定参数周期

- 仅做多,可能错过好的空头机会

## 总结

该策略利用一目均衡表的多指标特性确定趋势方向。在优化参数的基础上,它提供了一套简单的做多规则。但其滞后性以及仅做多的局限仍需注意。


||

## Strategy Logic

This LONG-ONLY strategy uses the Ichimoku Kinko Hyo system for trades. It combines multiple Ichimoku factors to go long when criteria are met.

The trading logic is:

1. Calculate conversion, base line, leading spans 1 & 2

2. Consider long when close is above cloud and cloud is rising, with conversion above base line 

3. Additionally, lagging span must be above cloud and price for uptrend confirmation

4. When all criteria met, go long

5. If lagging span falls below price or cloud, close long

The strategy utilizes Ichimoku's indicators to confirm trend, with the cloud as dynamic stops for risk control. 

## Advantages

- Ichimoku synthesizes multiple factors for trend determination

- Dynamic stops to maximize profit locking

- Simple and clear rules for easy implementation

## Risks

- Ichimoku is slow and may miss opportunities 

- Careful optimization of lookback periods needed

- LONG only, so good short chances missed

## Summary

This strategy leverages Ichimoku's synthesis of indicators to define trend direction. With optimized parameters, it provides a simple long-only system. But limitations in lag and being LONG-only require caution.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Conversion Line Length|
|v_input_2|60|Base Line Length|
|v_input_3|120|Leading Span B Length|
|v_input_4|30|Displacement|
|v_input_5|true|Stoploss (% below cloud)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="Ichimoku Cloud", shorttitle="Doubled Ichimoku", overlay=true, initial_capital=1000, default_qty_value=100, default_qty_type=strategy.percent_of_equity)
conversionPeriods = input(20, minval=1, title="Conversion Line Length")
basePeriods = input(60, minval=1, title="Base Line Length")
laggingSpan2Periods = input(120, minval=1, title="Leading Span B Length")
displacement = input(30, minval=1, title="Displacement")
Stoploss = input(1, minval=0.1, title="Stoploss (% below cloud)") 
donchian(len) => avg(lowest(len), highest(len))
conversionLine = donchian(conversionPeriods)
baseLine = donchian(basePeriods)
leadLine1 = avg(conversionLine, baseLine)
leadLine2 = donchian(laggingSpan2Periods)
plot(conversionLine, color=#2962FF, title="Conversion Line")
plot(baseLine, color=#B71C1C, title="Base Line")
plot(close, offset = -displacement + 1, color=#43A047, title="Lagging Span")

p1 = plot(leadLine1, offset = displacement - 1, color=#A5D6A7,
	 title="Leading Span A")
p2 = plot(leadLine2, offset = displacement - 1, color=#EF9A9A,
	 title="Leading Span B")
fill(p1, p2, color = leadLine1 > leadLine2 ? color.rgb(67, 160, 71, 90) : color.rgb(244, 67, 54, 90))

bool TKcross = conversionLine > baseLine
bool aboveCloud = close > leadLine1 and close > leadLine2
bool greenCloud = leadLine1 > leadLine2
bool lagLong = close > leadLine1[2*displacement+1] and close > leadLine2[2*displacement+1] and close > close[displacement]
bool longCondition = false
bool close_trade = crossover(leadLine1[displacement], close) or crossover (leadLine2[displacement], close) or close < close[displacement] or crossover(baseLine, close)
var position_count = 0 

if (TKcross and aboveCloud and greenCloud and lagLong and position_count==0)
    position_count = 1
    strategy.entry(id="buy", long=true)

if (close_trade)
    strategy.close_all()
   // strategy.entry(id="sell", long=false)
    position_count = 0

    
//if (longCondition)
   
//    strategy.close("long", when=exit_trade)
//    strategy.exit("exit","long",stop=stop_level,limit=profit_level)
```

> Detail

https://www.fmz.com/strategy/426797

> Last Modified

2023-09-14 16:13:33
