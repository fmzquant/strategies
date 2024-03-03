
> Name

RSI双轨震荡线长短双向交易策略RSI-Dual-rail-Oscillation-Line-Long-and-Short-Bi-directional-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fa420c05cd3c3f8390.png)

[trans]


## 概述

RSI双轨震荡线长短双向交易策略是一个利用RSI指标进行双向交易的策略。该策略通过RSI指标的超买超卖原理,结合双轨道设定和均线交易信号,实现高效的双向开仓与平仓。

## 策略原理

该策略主要基于RSI指标的超买超卖原理进行交易决策。策略首先计算RSI指标的值vrsi,以及双轨道的上轨sn和下轨ln。当RSI值下穿下轨ln时产生做多信号,当RSI值上穿上轨sn时产生做空信号。

策略还检测K线的涨跌变化,进一步产生做多做空信号。具体来说,当K线从下往上突破时产生做多信号longLocic,当K线从上往下突破时产生做空信号shortLogic。此外,策略提供参数开关,可以只做多、只做空,或翻转信号。

在产生做多做空信号后,策略会统计信号次数,控制开仓次数。通过参数可以设置不同的加仓规则。平仓条件包括止盈、止损、移动止损等方式,可设置不同的止盈止损百分比。

总之,该策略综合运用RSI指标、均线交叉、统计加仓、止盈止损等多种技术手段,实现自动的长短双向交易。

## 策略优势

- 利用RSI指标的超买超卖原理,在合理位置建立做多做空仓位。
- 双轨道设定避免错误信号。上轨阻止多头仓位过早平仓,下轨阻止空头仓位过早平仓。  
- 均线交易信号过滤假突破。股价突破均线才产生信号,避免虚假信号。
- 统计信号次数和加仓次数,控制风险。
- 可自定义止盈止损百分比,收益风险可控。
- 移动止损跟踪止损,进一步锁定盈利。
- 可仅做多、仅做空或翻转信号,适应不同市场环境。
- 自动化交易系统,降低人工操作成本。

## 策略风险

- RSI指标存在反转失败风险。RSI进入超买超卖区域不一定反转。
- 固定止盈止损点存在被套风险。止盈止损设置不当可能造成过早止损或止盈。  
- 依赖技术指标,存在参数优化风险。指标参数设置不当,会影响策略效果。
- 多种条件同时触发,存在漏单风险。
- 自动交易系统存在异常错误风险。

针对以上风险,可以优化参数设置,调整止盈止损策略,增加流动性筛选,优化信号生成逻辑,增加异常错误监控等进行改进。

## 策略优化方向 

- 测试不同周期参数优化RSI指标参数。
- 测试不同的止盈止损百分比设置。
- 增加交易量或收益率筛选,避免流动性不足。
- 优化信号生成逻辑,改进均线交叉方式。
- 增加多时间段回测,验证稳定性。
- 考虑加入其他指标,优化信号效果。
- 加入仓位管理策略。
- 增加异常错误监控。
- 优化自动止损跟踪算法。
- 考虑加入机器学习提升策略。

## 总结

RSI双轨震荡线长短双向交易策略通过综合运用RSI指标、统计开仓与止损原理等多种技术手段,实现了自动化的双向交易。该策略有较强的可定制性,用户可以根据需求调整参数,适应不同市场环境。同时,策略也存在一定改进空间,可从优化参数设置、风控策略、信号生成逻辑等方面进行优化,使策略更稳定可靠。总体来说,该策略为用户提供了一种相对高效的量化交易方案。

||

## Overview

The RSI Dual-rail Oscillation Line Long and Short Bi-directional Trading Strategy is a bi-directional trading strategy utilizing the RSI indicator. It implements efficient bi-directional opening and closing of positions through the overbought and oversold principles of RSI, combined with dual-rail settings and moving average trading signals.

## Strategy Logic

The strategy mainly makes trading decisions based on the overbought and oversold principles of the RSI indicator. It first calculates the RSI value vrsi, as well as the upper rail sn and lower rail ln of the dual rails. A long signal is generated when the RSI value crosses below the lower rail ln, and a short signal is generated when the RSI value crosses above the upper rail sn.

The strategy also detects the rise and fall of candlesticks to further generate long and short signals. Specifically, a long signal longLocic is generated when the candlestick breaks out upwards, and a short signal shortLogic is generated when the candlestick breaks out downwards. In addition, the strategy provides parameter switches to go long only, short only, or reverse signals.

After generating long and short signals, the strategy will count the number of signals to control the number of openings. Different pyramiding rules can be set through parameters. Position closing conditions include take profit, stop loss, trailing stop loss, etc., with customizable profit and loss percentages.

In summary, the strategy integrates RSI indicators, moving average crossovers, statistical pyramiding, stop profit and stop loss and other technical means to achieve automated long and short bi-directional trading.

## Advantages of the Strategy

- Utilize the overbought and oversold principles of RSI to establish long and short positions at reasonable levels.
- Dual rails prevent wrong signals. The upper rail prevents premature closing of long positions, while the lower rail prevents premature closing of short positions.
- Moving average trading signals filter false breakouts. Signals are only generated when the price breaks through the moving average, avoiding false signals.  
- Count signal and pyramiding times to control risks.
- Customizable profit and loss percentages for controllable profitability and risk.
- Trailing stop loss to further lock in profits.
- Go long only, short only or reverse signals to adapt to different market environments.  
- Automated trading system reduces manual operation costs.

## Risks of the Strategy

- RSI reversal failure risk exists. RSI entering overbought or oversold zones does not necessarily reverse.
- Fixed take profit and stop loss risks being trapped. Improper settings may cause premature stop loss or profit taking.
- Reliance on technical indicators has optimization risks. Improper indicator parameters negatively impact strategy performance.
- Simultaneous triggering of multiple conditions risks missing trades.  
- Automated trading systems have abnormal error risks.

To address the above risks, parameters can be optimized, stop profit and loss strategies can be adjusted, liquidity filters can be added, signal logic can be improved, and exception monitoring can be increased.

## Optimization Directions

- Test parameter optimization of RSI parameters on different timeframes.
- Test different take profit and stop loss percentage settings.  
- Add volume or profitability filters to avoid insufficient liquidity.
- Optimize signal logic and improve moving average crossovers.
- Backtest across multiple time periods to verify stability.
- Consider adding other indicators to improve signal quality.
- Incorporate position sizing strategies.
- Add exception handling and error monitoring. 
- Optimize automatic trailing stop algorithms.
- Consider incorporating machine learning to improve the strategy.

## Summary

The RSI Dual-rail Oscillation Line Long and Short Bi-directional Trading Strategy integrates RSI indicators, statistical opening and stop loss principles and other technical tools to achieve automated bi-directional trading. The strategy is highly customizable for users to adapt parameters to different market environments. There is also room for improvement via optimizing parameters, risk management, signal logic etc. Overall, it provides an efficient quantitative trading solution.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Backtest Start Year|
|v_input_2|11|Backtest Start Month|
|v_input_3|10|Backtest Start Day|
|v_input_4|77777777|Backtest Stop Year|
|v_input_5|11|Backtest Stop Month|
|v_input_6|15|Backtest Stop Day|
|v_input_7|true|RSI Period Length|
|v_input_8|2|Length|
|v_input_9|12|rsin|
|v_input_10|true|Longs Only|
|v_input_11|false|Shorts Only|
|v_input_12|false|Flip the Opens|
|v_input_13|2|Pyramiding less than|
|v_input_14|true|Pyramiding equal to|
|v_input_15|1000000|Pyramiding greater than|
|v_input_16|false|Trailing Stop|
|v_input_17|100|Activate Trailing Stop Price (%). Divided by 100 (1 = 0.01%)|
|v_input_18|100|Trailing Stop (%). Divided by 100 (1 = 0.01%)|
|v_input_19|true|Take Profit|
|v_input_20|125|Take Profit (%). Divided by 100 (1 = 0.01%)|
|v_input_21|true|Stop Loss|
|v_input_22|140|Stop Loss (%). Divided by 100 (1 = 0.01%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-24 00:00:00
end: 2023-10-24 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Learn more about Autoview and how you can automate strategies like this one here: https://autoview.with.pink/
// strategy("Autoview Build-a-bot - 5m chart", "Strategy", overlay=true, pyramiding=2000, default_qty_value=10000)
// study("Autoview Build-a-bot", "Alerts")

///////////////////////////////////////////////
//* Backtesting Period Selector | Component *//
///////////////////////////////////////////////

//* https://www.tradingview.com/script/eCC1cvxQ-Backtesting-Period-Selector-Component *//
//* https://www.tradingview.com/u/pbergden/ *//
//* Modifications made *//

testStartYear = input(1, "Backtest Start Year") 
testStartMonth = input(11, "Backtest Start Month")
testStartDay = input(10, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(77777777, "Backtest Stop Year")
testStopMonth = input(11, "Backtest Stop Month")
testStopDay = input(15, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => true

/////////////////////////////////////
//* Put your strategy logic below *//
/////////////////////////////////////
RSIlength = input(1,title="RSI Period Length") 
price = close
vrsi = (rsi(price, RSIlength))
src = close
len = input(2, minval=1, title="Length")

up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))

rsin = input(12)
sn = 100 - rsin
ln = 0 + rsin

// Put your long and short rules here
longLocic = crossunder(rsi, ln)
shortLogic = crossover(rsi, sn)

//////////////////////////
//* Strategy Component *//
//////////////////////////

isLong = input(true, "Longs Only")
isShort = input(false, "Shorts Only")
isFlip = input(false, "Flip the Opens")

long = longLocic
short = shortLogic

if isFlip
    long := shortLogic
    short := longLocic
else
    long := longLocic
    short := shortLogic

if isLong
    long := long
    short := na

if isShort
    long := na
    short := short
    
////////////////////////////////
//======[ Signal Count ]======//
////////////////////////////////

sectionLongs = 0
sectionLongs := nz(sectionLongs[1])
sectionShorts = 0
sectionShorts := nz(sectionShorts[1])

if long
    sectionLongs := sectionLongs + 1
    sectionShorts := 0

if short
    sectionLongs := 0
    sectionShorts := sectionShorts + 1

//////////////////////////////
//======[ Pyramiding ]======//
//////////////////////////////

pyrl = input(2, "Pyramiding less than") // If your count is less than this number
pyre = input(1, "Pyramiding equal to") // If your count is equal to this number
pyrg = input(1000000, "Pyramiding greater than") // If your count is greater than this number

longCondition = long and sectionLongs <= pyrl or long and sectionLongs >= pyrg or long and sectionLongs == pyre ? 1 : 0 and vrsi < 20
shortCondition = short and sectionShorts <= pyrl or short and sectionShorts >= pyrg or short and sectionShorts == pyre ? 1 : 0

////////////////////////////////
//======[ Entry Prices ]======//
////////////////////////////////

last_open_longCondition = na
last_open_shortCondition = na
last_open_longCondition := longCondition ? close : nz(last_open_longCondition[1])
last_open_shortCondition := shortCondition ? close : nz(last_open_shortCondition[1])

////////////////////////////////////
//======[ Open Order Count ]======//
////////////////////////////////////

sectionLongConditions = 0
sectionLongConditions := nz(sectionLongConditions[1])
sectionShortConditions = 0
sectionShortConditions := nz(sectionShortConditions[1])

if longCondition
    sectionLongConditions := sectionLongConditions + 1
    sectionShortConditions := 0

if shortCondition
    sectionLongConditions := 0
    sectionShortConditions := sectionShortConditions + 1
    
///////////////////////////////////////////////
//======[ Position Check (long/short) ]======//
///////////////////////////////////////////////

last_longCondition = na
last_shortCondition = na
last_longCondition := longCondition ? time : nz(last_longCondition[1])
last_shortCondition := shortCondition ? time : nz(last_shortCondition[1])

in_longCondition = last_longCondition > last_shortCondition
in_shortCondition = last_shortCondition > last_longCondition

/////////////////////////////////////
//======[ Position Averages ]======//
/////////////////////////////////////

totalLongs = 0.0
totalLongs := nz(totalLongs[1])
totalShorts = 0.0
totalShorts := nz(totalShorts[1])
averageLongs = 0.0
averageLongs := nz(averageLongs[1])
averageShorts = 0.0
averageShorts := nz(averageShorts[1]) 

if longCondition
    totalLongs := totalLongs + last_open_longCondition
    totalShorts := 0.0

if shortCondition
    totalLongs := 0.0
    totalShorts := totalShorts + last_open_shortCondition

averageLongs := totalLongs / sectionLongConditions
averageShorts := totalShorts / sectionShortConditions

/////////////////////////////////
//======[ Trailing Stop ]======//
/////////////////////////////////

isTS = input(false, "Trailing Stop")
tsi = input(100, "Activate Trailing Stop Price (%). Divided by 100 (1 = 0.01%)") / 100 
ts = input(100, "Trailing Stop (%). Divided by 100 (1 = 0.01%)") / 100

last_high = na
last_low = na
last_high_short = na
last_low_short = na
last_high := not in_longCondition ? na : in_longCondition and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_high_short := not in_shortCondition ? na : in_shortCondition and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low := not in_shortCondition ? na : in_shortCondition and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])
last_low_short := not in_longCondition ? na : in_longCondition and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])

long_ts = isTS and not na(last_high) and low <= last_high - last_high / 100 * ts and longCondition == 0 and last_high >= averageLongs + averageLongs / 100 * tsi
short_ts = isTS and not na(last_low) and high >= last_low + last_low / 100 * ts and shortCondition == 0 and last_low <= averageShorts - averageShorts/ 100 * tsi

///////////////////////////////
//======[ Take Profit ]======//
///////////////////////////////

isTP = input(true, "Take Profit")
tp = input(125, "Take Profit (%). Divided by 100 (1 = 0.01%)") / 100
long_tp = isTP and close > averageLongs + averageLongs / 100 * tp and not longCondition
short_tp = isTP and close < averageShorts - averageShorts / 100 * tp and not shortCondition

/////////////////////////////
//======[ Stop Loss ]======//
/////////////////////////////

isSL = input(true, "Stop Loss")
sl = input(140, "Stop Loss (%). Divided by 100 (1 = 0.01%)") / 100
long_sl = isSL and close < averageLongs - averageLongs / 100 * sl and longCondition == 0
short_sl = isSL and close > averageShorts + averageShorts / 100 * sl and shortCondition == 0

/////////////////////////////////
//======[ Close Signals ]======//
/////////////////////////////////

longClose = long_tp or long_sl or long_ts ? 1 : 0
shortClose = short_tp or short_sl or short_ts ? 1: 0

///////////////////////////////
//======[ Plot Colors ]======//
///////////////////////////////

longCloseCol = na
shortCloseCol = na
longCloseCol := long_tp ? purple : long_sl ? maroon : long_ts ? blue : longCloseCol[1]
shortCloseCol := short_tp ? purple : short_sl ? maroon : short_ts ? blue : shortCloseCol[1]
tpColor = isTP and in_longCondition ? purple : isTP and in_shortCondition ? purple : white
slColor = isSL and in_longCondition ? red : isSL and in_shortCondition ? red : white

//////////////////////////////////
//======[ Strategy Plots ]======//
//////////////////////////////////

plot(isTS and in_longCondition ? averageLongs + averageLongs / 100 * tsi : na, "Long Trailing Activate", blue, style=3, linewidth=2)
plot(isTS and in_longCondition and last_high >= averageLongs +  averageLongs / 100 * tsi ? last_high - last_high / 100 * ts : na, "Long Trailing", fuchsia, style=2, linewidth=3)
plot(isTS and in_shortCondition ? averageShorts - averageShorts/ 100 * tsi : na, "Short Trailing Activate", blue, style=3, linewidth=2)
plot(isTS and in_shortCondition and last_low <= averageShorts - averageShorts/ 100 * tsi ? last_low + last_low / 100 * ts : na, "Short Trailing", fuchsia, style=2, linewidth=3)
plot(isTP and in_longCondition and last_high < averageLongs + averageLongs / 100 * tp ? averageLongs + averageLongs / 100 * tp : na, "Long TP", tpColor, style=3, linewidth=2)
plot(isTP and in_shortCondition and last_low > averageShorts - averageShorts / 100 * tp ? averageShorts - averageShorts / 100 * tp : na, "Short TP", tpColor, style=3, linewidth=2)
plot(isSL and in_longCondition and last_low_short > averageLongs - averageLongs / 100 * sl ? averageLongs - averageLongs / 100 * sl : na, "Long SL", slColor, style=3, linewidth=2)
plot(isSL and in_shortCondition and last_high_short < averageShorts + averageShorts / 100 * sl ? averageShorts + averageShorts / 100 * sl : na, "Short SL", slColor, style=3, linewidth=2)

///////////////////////////////
//======[ Alert Plots ]======//
///////////////////////////////

// plot(longCondition, "Long", green)
// plot(shortCondition, "Short", red)
// plot(longClose, "Long Close", longCloseCol)
// plot(shortClose, "Short Close", shortCloseCol)

///////////////////////////////////
//======[ Reset Variables ]======//
///////////////////////////////////

if longClose or not in_longCondition
    averageLongs := 0
    totalLongs := 0.0
    sectionLongs := 0
    sectionLongConditions := 0

if shortClose or not in_shortCondition
    averageShorts := 0
    totalShorts := 0.0
    sectionShorts := 0
    sectionShortConditions := 0

////////////////////////////////////////////
//======[ Strategy Entry and Exits ]======//
////////////////////////////////////////////

if testPeriod()
    strategy.entry("Long", 1, when=longCondition)
    strategy.entry("Short", 0,  when=shortCondition)
    strategy.close("Long", when=longClose)
    strategy.close("Short", when=shortClose)
    

```

> Detail

https://www.fmz.com/strategy/430128

> Last Modified

2023-10-25 11:57:46
