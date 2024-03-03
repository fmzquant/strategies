
> Name

价格异常波动反转策略Price-Volatility-Mean-Reversion-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过计算价格的标准差,判断价格是否出现异常大幅波动。当价格出现异常大幅波动时,则判断为价格反转的机会,采取反向操作。

## 原理

该策略主要使用两个指标:

1. VixFix 指标:计算价格在一定周期内的标准差,判断价格是否出现异常波动。具体计算方法是:

```pine
wvf = ((highest(close, pd)-low)/(highest(close, pd)))*100 
sDev = mult * stdev(wvf, bbl)
midLine = sma(wvf, bbl)  
lowerBand = midLine - sDev
upperBand = midLine + sDev
```

其中,wvf 是价格波动率,sDev 是标准差,midLine 是平均线,lowerBand 和 upperBand 分别是下限线和上限线。当价格超过上限线,则认为出现异常波动。

2. RSI 指标:计算价格的相对强弱指数,判断价格反转的时机。具体计算方法是:

```pine
fastup = rma(max(change(close), 0), 7)  
fastdown = rma(-min(change(close), 0), 7)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown)) 
```

当RSI低于某一数值时,表示价格处于超卖状态,可能出现反弹。当RSI超过某一数值时,表示价格处于超买状态,可能出现回落。

## 入场和出场

该策略的入场和出场逻辑如下:

多仓入场:当价格超过上限线或波动率超过阈值,且RSI低于某一数值时,做多。

空仓入场:当价格超过上限线或波动率超过阈值,且RSI超过某一数值时,做空。 

出场条件:开仓方向与K线实体方向相反时平仓。

## 优势

- 利用价格异常波动的统计特性,判断价格反转的时机,覆盖面广。
- 结合RSI指标判断超买超卖状态,可以提高入场的精确度。
- 采用突破标准差下限作为入场信号,可以减少错失机会。
- 采用实体反转作为止损方式,可以快速止损,降低亏损。

## 风险

- 标准差下限可能会调整,需要优化参数。
- 突破标准差下限不一定产生反转,存在被套的风险。
- RSI参数需要优化,如果不合适可能导致信号不精确。 
- 实体方向判定止损可能会过于激进,需要调整参数。

## 优化思路

- 优化计算标准差的周期参数,使其更能捕捉价格异常波动。
- 优化RSI的参数,找到更好的超买超卖判定标准。
- 尝试其他指标结合,如KDJ、MACD等判断反转时机。
- 优化止损方式,设置价格回调幅度作为止损标准。

## 总结

该策略通过计算价格波动率的标准差,判断价格是否出现异常波动,从而捕捉反转机会。在入场时机选择上,则结合RSI指标判断价格的超买超卖状态,提高精确度。在止损方式上采用简单的实体方向止损。整体来说,该策略利用统计数据判断异常波动,效果较好,但需要进一步优化参数,提高稳定性。如果能够合理优化止损机制,降低亏损,该策略的效果会更好。

||


## Overview

This strategy detects price reversal opportunities by calculating the standard deviation of price volatility. When there is an anomalously large price fluctuation, it is considered as an opportunity for price reversal, and reverse trading positions are taken.

## Principle 

The strategy uses two main indicators:

1. VixFix indicator: Calculates the standard deviation of price over a certain period to determine if there is anomalous price volatility. The specific calculation is:

```pine
wvf = ((highest(close, pd)-low)/(highest(close, pd)))*100
sDev = mult * stdev(wvf, bbl) 
midLine = sma(wvf, bbl)
lowerBand = midLine - sDev 
upperBand = midLine + sDev
```

Where wvf is price volatility, sDev is standard deviation, midLine is the average line, lowerBand and upperBand are the lower and upper limit lines. When price exceeds the upper limit line, it is considered anomalous volatility.

2. RSI indicator: Calculates the Relative Strength Index of price to determine timing of price reversal. The calculation is:

``` pine
fastup = rma(max(change(close), 0), 7)
fastdown = rma(-min(change(close), 0), 7) 
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))
```

When RSI is below a threshold, it indicates oversold status and potential bounce back. When RSI exceeds a threshold, it indicates overbought status and potential pullback.

## Entry and Exit

The entry and exit logic is:

Long entry: When price exceeds upper limit or volatility exceeds threshold, and RSI is below a value, go long.

Short entry: When price exceeds upper limit or volatility exceeds threshold, and RSI exceeds a value, go short.

Exit: When candlestick body direction is opposite of position direction, close position.

## Advantages

- Uses statistical properties of anomalous price volatility to determine price reversal with wide coverage.
- Combining with RSI to judge overbought/oversold improves entry precision.  
- Breaking lower deviation band as entry signal reduces missing opportunities.
- Candlestick body reversal as stop loss realizes quick stop loss and reduces losses.

## Risks

- Lower deviation band may need adjustment for parameter optimization.
- Breaking lower band does not guarantee reversal, risks being trapped.
- RSI parameters need optimization, improper values lead to inaccurate signals.
- Candlestick body stop loss may be too aggressive, needs adjustment.

## Optimization Directions 

- Optimize calculation period of standard deviation to better capture anomalous volatility.
- Optimize RSI parameters to find better overbought/oversold criteria. 
- Try combining other indicators like KDJ, MACD to determine reversal timing.
- Optimize stop loss mechanism, set price retracement as stop loss benchmark.

## Conclusion

The strategy detects anomalous price volatility through calculating standard deviation of price volatility, to capture reversal opportunities. RSI is combined to judge overbought/oversold status for improving entry precision. Simple candlestick body direction stop loss is used. Overall, the strategy is effective in using statistical data to detect anomalous volatility, but needs further parameter optimization to improve stability. If the stop loss mechanism can be reasonably optimized to reduce losses, the strategy would perform even better.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|true|leverage|
|v_input_4|40|RSI Limit|
|v_input_5|22|LookBack Period Standard Deviation High|
|v_input_6|20|Bolinger Band Length|
|v_input_7|2|Bollinger Band Standard Devaition Up|
|v_input_8|50|Look Back Period Percentile High|
|v_input_9|0.85|Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%|
|v_input_10|1.01|Lowest Percentile - 1.10=90%, 1.05=95%, 1.01=99%|
|v_input_11|false|Show High Range - Based on Percentile and LookBack Period?|
|v_input_12|false|Show Standard Deviation Line?|
|v_input_13|1900|From Year|
|v_input_14|2100|To Year|
|v_input_15|true|From Month|
|v_input_16|12|To Month|
|v_input_17|true|From day|
|v_input_18|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-04 00:00:00
end: 2023-10-10 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's VixFix + RSI Strategy v1.0", shorttitle = "VixFix + RSI str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
leverage = input(1, defval = 1, minval = 1, maxval = 100, title = "leverage")
limit = input(40, defval = 40, minval = 2, maxval = 50, title = "RSI Limit")

pd = input(22, title="LookBack Period Standard Deviation High")
bbl = input(20, title="Bolinger Band Length")
mult = input(2.0, minval = 1, maxval = 5, title = "Bollinger Band Standard Devaition Up")
lb = input(50, title="Look Back Period Percentile High")
ph = input(.85, title="Highest Percentile - 0.90=90%, 0.95=95%, 0.99=99%")
pl = input(1.01, title="Lowest Percentile - 1.10=90%, 1.05=95%, 1.01=99%")
hp = input(false, title="Show High Range - Based on Percentile and LookBack Period?")
sd = input(false, title="Show Standard Deviation Line?")

fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Vix Fix
wvf = ((highest(close, pd)-low)/(highest(close, pd)))*100
sDev = mult * stdev(wvf, bbl)
midLine = sma(wvf, bbl)
lowerBand = midLine - sDev
upperBand = midLine + sDev
rangeHigh = (highest(wvf, lb)) * ph
rangeLow = (lowest(wvf, lb)) * pl

col = wvf >= upperBand or wvf >= rangeHigh ? lime : gray

//RSI
fastup = rma(max(change(close), 0), 7)
fastdown = rma(-min(change(close), 0), 7)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//Body
body = abs(close - open)
abody = sma(body, 10)

//Signals
up = (wvf >= upperBand or wvf >= rangeHigh) and fastrsi < limit and close < open
dn = (wvf >= upperBand or wvf >= rangeHigh) and fastrsi > (100 - limit) and close > open
exit = ((strategy.position_size > 0 and close > open) or (strategy.position_size < 0 and close < open)) and body > abody / 3

//Trading
lot = strategy.position_size == 0 ? strategy.equity / close * leverage : lot[1]

if up
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("Bottom", strategy.long, needlong == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Top", strategy.short, needshort == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/428982

> Last Modified

2023-10-11 16:03:36
