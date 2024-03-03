
> Name

中心引力通道趋势跟踪策略Center-of-Gravity-SSL-Channel-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略融合了中心引力指标和SSL通道指标,实现价格趋势的判断和突破跟踪,属于趋势跟踪类策略。同时结合动态ATR止损来控制风险。

## 策略原理 

1. 计算中心引力指标,其中上轨和下轨分别为价格上涨和下跌的趋势界限。

2. 计算SSL通道指标,通道内部为盘整区间,通道外部为趋势方向。

3. 当价格突破上轨或通道时判断为上涨趋势并做多;当价格突破下轨或通道时判断为下跌趋势并做空。

4. 在持仓时使用动态ATR止损来跟踪止损位,避免亏损扩大。

5. 结合回测时间段来产生实际的交易信号。

该策略同时利用两个指标判断趋势方向,一个用来判断突破,一个用来确认趋势,二者结合可以提高判断准确性。动态止损可以根据市场波动幅度来调整止损位,是一个非常实用的风险控制手段。

## 优势分析

1. 同时利用两个指标判断趋势,可以提高准确率。

2. 中心引力指标对趋势变化敏感,SSL通道判断趋势方向 cleared。

3. 动态ATR止损根据市场波动实时调整止损位,具有灵活性。 

4. 策略规则简单清晰,易于理解和实现。

5. 参数优化空间大,可以针对不同市场进行调整。

6. 回测功能完备,可以验证策略效果。

## 风险分析

1. 中心引力指标和SSL通道都可能出现失效的情况,导致交易信号错误。可以加入其他指标进行确认。

2. 动态止损可能过于激进,可以适当放宽止损幅度。

3. 回测时间段选择不当可能导致策略效果不佳,需要针对不同市场阶段进行回测。

4. 需要充分考虑交易成本的影响。

## 优化方向

1. 测试不同参数组合,找到最佳参数对。

2. 优化动态止损的ATR周期和倍数参数。

3. 引入其他指标进行信号过滤,如MACD、KDJ等。

4. 增加机器学习模型来辅助判断趋势方向。

5. 优化资金管理,设定仓位控制。

6. 针对具体品种进行参数调整和优化。

## 总结

该策略结合中心引力指标和SSL通道指标来判断趋势,使用动态ATR止损控制风险,是一个可实际操作的趋势跟踪策略。通过参数优化、引入其他指标以及机器学习等方式进行改进,可以进一步提升策略稳定性和实战效果。总体来说,该策略具有较强的实用性和拓展性,是量化交易的一个值得参考的策略思路。

|| 

## Overview

This strategy combines the Center of Gravity indicator and the SSL channel indicator to determine price trends and follow breakouts, belonging to the trend following strategy category. It also uses dynamic ATR stop loss to control risks.

## Strategy Logic

1. Calculate the Center of Gravity indicator, with upper and lower bands as the limits for upward and downward trends.

2. Calculate the SSL channel indicator, within which is ranging, outside is the trend direction.

3. When price breaks the upper band or channel, determine uptrend and go long. When price breaks the lower band or channel, determine downtrend and go short.

4. Use dynamic ATR stop loss to trail stop loss levels and avoid enlarged losses. 

5. Combine with backtest period to generate actual trading signals.

The strategy utilizes two indicators to determine trends, one for detecting breakouts and one for confirming trends, combining them can improve accuracy. The dynamic stop loss adjusts based on market volatility, making it a very practical risk control method.

## Advantage Analysis

1. Utilizing two indicators improves accuracy in determining trends.

2. Center of Gravity is sensitive to trend changes, SSL channel clearly defines trend direction.

3. Dynamic ATR stop loss flexibly adjusts based on market volatility.

4. Simple and clear strategy rules, easy to understand and implement.

5. Large optimization space for parameters, can be adjusted for different markets.

6. Complete backtest functionality to verify strategy performance.

## Risk Analysis

1. Both Center of Gravity and SSL may fail in some cases, leading to wrong signals. Can add other indicators for confirmation.

2. Dynamic stop loss may be too aggressive, can loosen the stop loss range. 

3. Improper backtest period selection may lead to poor strategy results, need to backtest on different market stages.

4. Need to fully consider the impact of trading costs.

## Optimization Directions

1. Test different parameter combinations to find optimal pairs.

2. Optimize dynamic stop loss ATR period and multiplier parameters.

3. Introduce other indicators for signal filtering, e.g. MACD, KDJ. 

4. Add machine learning models to aid in trend direction prediction.

5. Optimize money management, set position sizing rules.

6. Fine tune parameters for specific products.

## Summary

This strategy combines Center of Gravity and SSL Channel to determine trends, and uses dynamic ATR stop loss to control risks. It is an actionable trend following strategy. Further improvements can be made via parameter optimization, introducing other indicators and machine learning etc. Overall this is a highly practical and expandable strategy, serving as a valuable reference for algorithmic trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|════════ Test Period ═══════|
|v_input_2|2017|Backtest Start Year|
|v_input_3|true|Backtest Start Month|
|v_input_4|true|Backtest Start Day|
|v_input_5|2019|Backtest Stop Year|
|v_input_6|12|Backtest Stop Month|
|v_input_7|31|Backtest Stop Day|
|v_input_8|false|═════════ SSL ══════════|
|v_input_9|12|SMA Length 1|
|v_input_10|13|SMA Length 2|
|v_input_11|false|═════════ CoG ══════════|
|v_input_12|25|Length|
|v_input_13|5|m|
|v_input_14|6|COG %|
|v_input_15|false|══════ Rate of Change ══════|
|v_input_16|2|ROC Length|
|v_input_17|10|ROC % Change|
|v_input_18|false|════════ Stop Loss ═══════|
|v_input_19|true|ATR Stop Period|
|v_input_20|2|ATR Stop Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-13 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// Thanks to HPotter for the original code for Center of Gravity Backtest
strategy("CoG SSL BF ?", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)

/////////////// Time Frame ///////////////
_0 = input(false,  "════════ Test Period ═══════")
testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() => true

/////////////// SSL Channels /////////////// 
_1 = input(false,  "═════════ SSL ══════════")
len1=input(title="SMA Length 1", defval=12)
len2=input(title="SMA Length 2", defval=13)

smaHigh = sma(high, len1)
smaLow = sma(low, len2)

Hlv = 0
Hlv := close > smaHigh ? 1 : close < smaLow ? -1 : Hlv[1]
sslDown = Hlv < 0 ? smaHigh : smaLow
sslUp = Hlv < 0 ? smaLow : smaHigh

///////////// Center of Gravity /////////////
_2 = input(false,  "═════════ CoG ══════════")
Length = input(25, minval=1)
m = input(5, minval=0)
Percent = input(6, minval=0, title="COG %")

xLG = linreg(close, Length, m)
xLG1r = xLG + ((close * Percent) / 100)
xLG1s = xLG - ((close * Percent) / 100)

pos = 0.0
pos := iff(close > xLG1r, 1, iff(close < xLG1s, -1, nz(pos[1], 0))) 
possig = iff(pos == 1, 1, iff(pos == -1, -1, pos))

///////////// Rate Of Change ///////////// 
_3 = input(false,  "══════ Rate of Change ══════")
source = close
roclength = input(2, "ROC Length",  minval=1)
pcntChange = input(10, "ROC % Change", minval=1)
roc = 100 * (source - source[roclength]) / source[roclength]
emaroc = ema(roc, roclength / 2)
isMoving() => emaroc > (pcntChange / 2) or emaroc < (0 - (pcntChange / 2))

/////////////// Srategy ///////////////
long = possig == 1 or (sslUp > sslDown and isMoving())
short = possig == -1 or (sslUp < sslDown and isMoving())

last_long = 0.0
last_short = 0.0
last_long := long ? time : nz(last_long[1])
last_short := short ? time : nz(last_short[1])

long_signal = crossover(last_long, last_short)
short_signal = crossover(last_short, last_long)

last_open_long_signal = 0.0
last_open_short_signal = 0.0
last_open_long_signal := long_signal ? open : nz(last_open_long_signal[1])
last_open_short_signal := short_signal ? open : nz(last_open_short_signal[1])

last_long_signal = 0.0
last_short_signal = 0.0
last_long_signal := long_signal ? time : nz(last_long_signal[1])
last_short_signal := short_signal ? time : nz(last_short_signal[1])

in_long_signal = last_long_signal > last_short_signal
in_short_signal = last_short_signal > last_long_signal

last_high = 0.0
last_low = 0.0
last_high := not in_long_signal ? na : in_long_signal and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low := not in_short_signal ? na : in_short_signal and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])

since_longEntry = barssince(last_open_long_signal != last_open_long_signal[1]) 
since_shortEntry = barssince(last_open_short_signal != last_open_short_signal[1]) 

/////////////// Dynamic ATR Stop Losses ///////////////
_4 = input(false,  "════════ Stop Loss ═══════")
atrLkb = input(1, minval=1, title='ATR Stop Period')
atrMult = input(2, step=0.25, title='ATR Stop Multiplier') 
atr1 = atr(atrLkb)

longStop = 0.0
longStop :=  short_signal ? na : long_signal ? close - (atr1 * atrMult) : longStop[1]
shortStop = 0.0
shortStop := long_signal ? na : short_signal ? close + (atr1 * atrMult) : shortStop[1]

/////////////// Execution ///////////////
if testPeriod()
    strategy.entry("L",  strategy.long, when=long)
    strategy.entry("S", strategy.short, when=short)
    strategy.exit("L SL", "L", stop=longStop, when=since_longEntry > 0)
    strategy.exit("S SL", "S", stop=shortStop, when=since_shortEntry > 0)

/////////////// Plotting ///////////////
p1 = plot(sslDown, linewidth = 1, color=color.red, title="SSL down")
p2 = plot(sslUp, linewidth = 1, color=color.lime, title="SSL up")
fill(p1, p2,  color = not isMoving() ? color.white : sslDown < sslUp ? color.lime : color.red, transp=80)
plot(xLG1r, color=color.lime, title="LG1r")
plot(xLG1s, color=color.red, title="LG1s")
plot(strategy.position_size <= 0 ? na : longStop, title="Long Stop Loss", color=color.yellow, style=plot.style_circles, linewidth=1)
plot(strategy.position_size >= 0 ? na : shortStop, title="Short Stop Loss", color=color.orange, style=plot.style_circles, linewidth=1)
bgcolor(long ? color.green : short ? color.red : not isMoving() ? color.white : na, transp=80)
bgcolor(long_signal ? color.lime : short_signal ? color.red : na, transp=60)
```

> Detail

https://www.fmz.com/strategy/427304

> Last Modified

2023-09-19 21:30:23
