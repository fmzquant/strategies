
> Name

趋势跟踪移动止损均线策略Trend-Following-Moving-Stop-Loss-MA-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略采用移动平均线和相对强弱指标组合判断趋势方向,结合趋势追踪止损机制实现盈利目标。该策略适用于高波动性市场,能够在趋势形成后快速进入市场,并通过止损和止盈确保收益。

## 策略原理

该策略使用RSI指标判断当前市场趋势方向,RSI低于30视为看跌,高于70视为看涨。当RSI指标发生金叉看涨信号时,买入开仓;当发生死叉看跌信号时,卖出开仓。 

开仓后,策略使用移动止损机制跟踪价格变动来锁定利润。具体来说,策略记录每次开仓的平均入场价,当价格达到入场价的1%时开始启动移动止损机制,通过计算当前价格和最高价的差值来移动止损线。

当价格达到止损线时止损出场;当价格达到入场价的3%时止盈出场。这样通过移动止损和止盈双保险实现利润目标。

## 策略优势

- 使用RSI指标判断趋势方向,能够快速判断市场走势
- 移动止损机制能够根据实时价格变动灵活调整止损位置,避免止损过早
- 止损和止盈双重保障,可以在保证一定盈利的前提下控制风险

## 风险分析

- RSI指标发出错误信号可能导致不必要开仓
- 止损距离过小易造成止损激活,止损距离过大又容易无法止损
- 止盈设定不当也会导致利润目标无法实现

可以通过调整RSI参数或加入其他指标判断来减少错误信号。同时优化止损和止盈参数,并结合回测找到最佳参数组合。

## 优化方向

- 可以试着加入布林带指标或KD指标来确认趋势信号,减少错误开仓
- 可以研究 additions 和 multiplications 继承功能来扩展指标组合
- 可以尝试多时间周期确认,避免被单时间周期错 SIGNAL�OB
- 可以研究加入自适应止损机制,让止损距离能够根据市场波动程度作出调整

## 总结

该策略整体来说是一个非常专业可靠的趋势跟踪策略,能够快速判断市场方向,并且通过移动止损和止盈来锁定盈利。通过继续优化指标参数,并增加其他辅助判断指标,可以进一步提高策略胜率和可靠性。该策略思路清晰且参数调整灵活,是进行量化交易策略学习的非常好的案例。

|| 

## Overview 

This strategy uses a combination of moving averages and relative strength index to determine the trend direction, and implements a trailing stop loss mechanism to achieve profit targets. It is suitable for high volatility markets, allowing fast market entry after trends are formed, and securing profits through stop loss and take profit.

## Strategy Logic

The strategy uses RSI indicator to determine the current market trend. RSI below 30 is considered bearish, while above 70 considered bullish. When RSI crossover signals a bullish trend, it will long. When RSI crossover signals a bearish trend, it will short.

After opening positions, the strategy uses a moving stop loss mechanism to trail price changes and lock in profits. Specifically, it records the average entry price of each position. When price reaches 1% of the entry price, it will activate the moving stop loss mechanism, moving the stop loss line based on the difference between current price and highest price.

When price reaches stop loss level, it will exit the position. When price reaches 3% of entry price, it will take profit. By using double protection from stop loss and take profit, it achieves the profit target.

## Advantages

- Using RSI to determine trend direction allows fast judgment of market momentum
- Moving stop loss can flexibly adjust stop loss level based on real-time price change, avoiding premature stop loss
- The double protection from stop loss and take profit ensures certain profit while controlling risks

## Risks

- RSI may signal false entry if used alone
- Stop loss distance too small may activate easily, while too loose may fail to stop loss
- Improper take profit setting may also fail the profit target

Additional indicators can be added to confirm RSI signals and reduce false signals. Optimizing stop loss and take profit levels based on backtesting can also help find the best parameter combination.

## Optimization 

- Add Bollinger Bands or KD to confirm trend signals and avoid false entries
- Research using additions and multiplications to expand indicator combinations
- Try multi-timeframe confirmation to avoid false signals on single timeframe
- Research adaptive stop loss mechanism to adjust stop distance based on market volatility

## Summary

Overall this is a very professional and reliable trend following strategy. It can quickly determine market direction and lock in profits through moving stop loss and take profit. Further optimizing parameters and adding confirming indicators can improve win rate and reliability. With clear logic and flexible parameters, it is a very good example for learning quant trading strategies.

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
|v_input_7|6|RSI Period Length|
|v_input_8|2|Length|
|v_input_9|14|rsin|
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
|v_input_20|33|Take Profit (%). Divided by 100 (1 = 0.01%)|
|v_input_21|true|Stop Loss|
|v_input_22|55|Stop Loss (%). Divided by 100 (1 = 0.01%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-03 00:00:00
end: 2023-10-09 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// Learn more about Autoview and how you can automate strategies like this one here: https://autoview.with.pink/
// strategy("Autoview Build-a-bot - 1m chart", "Strategy", overlay=true, pyramiding=2000, default_qty_value=10000)
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
RSIlength = input(6,title="RSI Period Length") 
price = close
vrsi = (rsi(price, RSIlength))
src = close
len = input(2, minval=1, title="Length")

up = rma(max(change(src), 0), len)
down = rma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))

rsin = input(14)
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
tp = input(33, "Take Profit (%). Divided by 100 (1 = 0.01%)") / 100
long_tp = isTP and close > averageLongs + averageLongs / 100 * tp and not longCondition
short_tp = isTP and close < averageShorts - averageShorts / 100 * tp and not shortCondition

/////////////////////////////
//======[ Stop Loss ]======//
/////////////////////////////

isSL = input(true, "Stop Loss")
sl = input(55, "Stop Loss (%). Divided by 100 (1 = 0.01%)") / 100
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

https://www.fmz.com/strategy/428854

> Last Modified

2023-10-10 10:36:16
