
> Name

四均线多时间框架趋势策略Four-DEMA-Multi-Timeframe-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16c91ebd56c0969fbb3.png)
[trans]
## 概述

四均线多时间框架趋势策略是一种基于4个不同周期的双指数移动平均线(DEMA)构建多时间框架判断趋势方向的策略。该策略同时利用10日线、15日线、21日线和30日线四条均线判断价格趋势,通过多时间框架过滤误报机会,寻找高概率的趋势方向。

## 策略原理

该策略通过计算10日、15日、21日和30日四条双指数移动平均线,并比较其大小关系来判断行情趋势方向。具体规则如下:

1. 计算10日线DEMA、15日线DEMA、21日线DEMA和30日线DEMA。

2. 当10日线上穿15日线,15日线上穿21日线,21日线上穿30日线时,判断为多头趋势形成,做多。

3. 当30日线下穿21日线,21日线下穿15日线,15日线下穿10日线时,判断为空头趋势形成,做空。

4. 盈利平仓或止损退出。

该策略通过多时间框架判断,能过滤掉部分噪音,锁定较高概率的趋势方向。同时,越长周期的均线过滤效果越好,所以策略采用了10、15、21、30日四条均线构建判断逻辑。

## 策略优势

- 多时间框架设计,通过longer timeframe的DEMA过滤noise,抓住高概率趋势。

- 利用DEMA指标的趋势跟踪性能更好的特点。

- 规则清晰简单,容易理解实现,适合量化交易。

## 风险及解决

- 多头止损或空头止损风险。采用移动止损来控制单笔止损。

- 回撤较长。调整持仓规模,降低单笔风险。

- 参数优化空间有限。加入 Aux信号辅助判断。

## 优化空间

- 加入停损策略,进一步控制风险。

- 优化 DEMA 周期参数。加入更多 Aux信号判断。

- 结合趋势指标,降低趋势反转概率。

## 总结

四均线多时间框架趋势策略通过比较10日线、15日线、21日线和30日线DEMA的大小关系,判断价格趋势方向,属于典型的趋势追踪策略。相比单一均线,该策略采用了多时间框架判断,能有效过滤部分噪音,提高判断准确性。同时,策略规则简单清晰,容易理解和实现,适合量化交易。总体来说,该策略利用DEMA指标的优势,设计了多时间框架的判断逻辑,抓住了高概率精准趋势,值得推荐。

||

## Overview

The Four DEMA Multi Timeframe Trend Strategy is a trend-following strategy that uses 4 DEMA (Double Exponential Moving Average) lines of different periods to determine the trend direction across multiple timeframes. The strategy utilizes 10-day, 15-day, 21-day and 30-day DEMA lines to judge the price trend, filtering out false signals through multiple timeframe analysis to locate high-probability trend directions.

## Strategy Logic  

The strategy calculates the 10-day, 15-day, 21-day and 30-day DEMA lines and compares their magnitude relations to determine the market trend direction. The specific rules are:

1. Calculate the 10-day, 15-day, 21-day and 30-day DEMA lines.  

2. When 10-day line crosses above 15-day line, 15-day line crosses above 21-day line, and 21-day line crosses above 30-day line, it is determined as an uptrend forming, go long.

3. When 30-day line crosses below 21-day line, 21-day line crosses below 15-day line, and 15-day line crosses below 10-day line, it is determined as a downtrend forming, go short.  

4. Take profit or stop loss to exit.

By judging through multiple timeframes, this strategy can filter out some noise and lock in higher probability trend directions. Also, longer period DEMA lines have better filtering effect, so the strategy uses the 10-day, 15-day, 21-day and 30-day lines to construct the logic.

## Advantages

- Multi timeframe design filters noise through longer timeframe DEMAs and catches high probability trends.

- Utilizes the better trend following characteristic of DEMA indicator. 

- Simple and clear rules, easy to understand and implement, suitable for quant trading.

## Risks and Solutions

- Long stop loss or short stop loss risk. Use moving stop loss to control single position stop loss.  

- Relatively long drawdowns. Adjust position sizing to lower single position risk.

- Limited optimization space for parameters. Add auxiliary signals to assist judgement.

## Enhancement Space

- Add stop loss strategy to further control risks.

- Optimize DEMA period parameters. Add more auxiliary signals.  

- Combine with trend indicators to lower reversal probabilities.

## Conclusion  

The Four DEMA Multi Timeframe Trend Strategy determines the price trend direction by comparing the magnitude relations of 10-day, 15-day, 21-day and 30-day DEMA lines. It belongs to a typical trend following strategy. Compared to single MA lines, this strategy adopts multiple timeframe judgement to effectively filter some noise and improves accuracy. Also, the strategy rules are simple and clear, easy to understand and implement, suitable for quant trading. In conclusion, this strategy utilizes the advantages of DEMA indicator and designs multiple timeframe logic to capture high-probability precise trends, worth recommending.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|short|
|v_input_2_close|0|Source Dema 1: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|15|long|
|v_input_4_close|0|Source Dema 2: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|21|long2|
|v_input_6_close|0|Source Dema 3: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|30|long3|
|v_input_8_close|0|Source Dema 4: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-19 00:00:00
end: 2024-02-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//Author: HighProfit

//Lead-In
strategy("dema10-15-21-30", shorttitle="4dema", overlay=true)

short = input(10, minval=1)
srcShort = input(close, title="Source Dema 1")

long = input(15, minval=1)
srcLong = input(close, title="Source Dema 2")

long2 = input(21, minval=1)
srcLong2 = input(close, title="Source Dema 3")

long3 = input(30, minval=1)
srcLong3 = input(close, title="Source Dema 4")

e1 = ema(srcShort, short)
e2 = ema(e1, short)
dema1 = 2 * e1 - e2
plot(dema1, color=green, linewidth = 2)

e3 = ema(srcLong, long)
e4 = ema(e3, long)
dema2 = 2 * e3 - e4
plot(dema2, color=blue, linewidth = 2)

e5 = ema(srcLong2, long2)
e6 = ema(e5, long2)
dema3 = 2 * e5 - e6
plot(dema3, color=black, linewidth = 2)

e7 = ema(srcLong3, long3)
e8 = ema(e7, long3)
dema4 = 2 * e7 - e8
plot(dema4, color=red, linewidth = 2)

//Conditions
longCondition = (dema1>dema2) and (dema1>dema3) and (dema1>dema4) and (dema2>dema3) and (dema2>dema4) and (dema3>dema4)

if (longCondition)

    strategy.entry("Long", strategy.long)

strategy.close("Long",  cross(dema1,dema2))

shortCondition = (dema4>dema3) and (dema4>dema2) and (dema4>dema1) and (dema3>dema2) and (dema3>dema1) and (dema2>dema1)
if (shortCondition)
    strategy.entry("Short", strategy.short)
    
strategy.close("Short", cross(dema1,dema2))

bgcolor(longCondition?green:white , transp=70, offset=1)
bgcolor(shortCondition?red:white , transp=70, offset=1)
```

> Detail

https://www.fmz.com/strategy/442837

> Last Modified

2024-02-26 14:14:48
