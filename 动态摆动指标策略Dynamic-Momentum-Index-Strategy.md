
> Name

动态摆动指标策略Dynamic-Momentum-Index-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 策略原理

该策略基于动态摆动指标(DMI)进行交易。DMI通过计算价格与不同长度均线的百分比偏离来判断趋势。

具体交易逻辑是:

1. 计算价格与长周期均线(如200日)的百分比偏离,作为第1 DMI

2. 计算价格与中周期均线(如50日)的百分比偏离,作为第2 DMI

3. 计算价格与短周期均线(如20日)的百分比偏离,作为第3 DMI

4. 当第3 DMI高于第1 DMI时看跌;当第3 DMI低于第2 DMI时看涨

5. 根据DMI关系产生交易信号

DMI通过动态比较不同均线周期的相对强度,判断市场趋势转折点。参数优化可以适应不同周期。

## 策略优势

- DMI结合多周期判断,比较全面 

- 比较相对强度,避免绝对数值判断

- 可灵活调整周期参数适应市场

## 策略风险

- DMI有一定滞后性,可能错过转折

- 需要谨慎设定周期参数

- 可能产生多次无效信号

## 总结

DMI策略通过比较多均线周期的强弱关系来判断转折。可通过参数优化适应不同市场环境。但滞后性存在,需辅助其他指标进行判断。


||

## Strategy Logic 

This strategy trades based on the Dynamic Momentum Index (DMI). DMI measures the percentage deviation between price and moving averages of different lengths to determine trend.

The trading logic is:

1. Calculate percentage deviation of price from a long MA (e.g. 200-day) as 1st DMI

2. Calculate deviation from a medium MA (e.g. 50-day) as 2nd DMI  

3. Calculate deviation from a short MA (e.g. 20-day) as 3rd DMI

4. When 3rd DMI is higher than 1st DMI, bearish. When 3rd DMI is lower than 2nd DMI, bullish.

5. Trade signals generated based on DMI relationship

By comparing relative strength dynamically across MA periods, DMI aims to identify trend turning points. Parameters can be optimized for different cycles.

## Advantages

- DMI combines multi-period lookback for robustness

- Compares relative strength vs. absolute levels 

- Flexible MA periods for market adaption

## Risks

- DMI has lag and may miss reversals

- Careful optimization of period parameters 

- Prone to multiple false signals

## Summary

DMI judges turning points by comparing multi-MA period strength dynamics. Optimization can suit different market environments. But lag limitations necessitate additional filters.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|LengthFirst|
|v_input_2|50|LengthSecond|
|v_input_3|20|LengthThird|
|v_input_4|true|ShowFirst|
|v_input_5|true|ShowSecond|
|v_input_6|true|ShowThird|
|v_input_7|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-14 00:00:00
end: 2023-09-13 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 31/06/2018
// The related article is copyrighted materialfrom Stocks & Commodities Dec 2009
// My strategy modification.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="CMOaDisparity Index Backtest")
LengthFirst = input(200, minval=1)
LengthSecond = input(50, minval=1)
LengthThird = input(20, minval=1)
ShowFirst = input(type=bool, defval=true)
ShowSecond = input(type=bool, defval=true)
ShowThird = input(type=bool, defval=true)
reverse = input(false, title="Trade reverse")
xEMAFirst = ema(close,LengthFirst)
xEMASecond  = ema(close,LengthSecond)
xEMAThird  = ema(close,LengthThird)
xResFirst = 100 * (close - xEMAFirst) / close
xResSecond = 100 * (close - xEMASecond) / close
xResThird = 100 * (close - xEMAThird) / close
pos = iff(xResThird > xResFirst, -1,
       iff(xResThird < xResSecond, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(ShowFirst ? xResFirst : na, color=red, title="DIX 1")
plot(ShowSecond ? xResSecond : na, color=blue, title="DIX 2")
plot(ShowThird ? xResThird : na, color=green, title="DIX 3")
```

> Detail

https://www.fmz.com/strategy/426799

> Last Modified

2023-09-14 16:15:42
