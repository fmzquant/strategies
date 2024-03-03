
> Name

移动平均线交叉多周期策略Moving-Average-Crossover-Multi-Timeframe-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是基于移动平均线的交叉系统,通过不同周期的移动平均线 golden交叉 和 death交叉来判断买入和卖出时机。策略同时结合趋势跟踪止损、止盈、止损等功能来锁定盈利和规避风险。

## 策略原理

该策略使用两组移动平均线,分别是快线和慢线。快线周期较短,代表短期趋势;慢线周期较长,代表长期趋势。当快线从下方向上突破慢线时,产生golden交叉,表示行情由熊转牛,做多;当快线从上方向下跌破慢线时,形成death交叉,表示行情由牛转熊,做空。

代码中,快线指标为ma1,慢线为ma2。ma1和ma2均可选择不同类型的移动平均线,如SMA、EMA等,并可设定不同的周期参数。ma1代表短期趋势,周期较短;ma2代表长期趋势,周期较长。

当ma1金叉ma2时,产生long信号,做多;当ma1死叉ma2时,产生short信号,做空。实际交易时,可结合趋势跟踪止损、止盈、止损等功能,来锁定盈利和规避风险。

## 优势分析

该策略具有以下优势:

1. 策略思路简单清晰,容易理解和实现。

2. 可灵活选择不同类型和参数的移动平均线,适用于不同市场环境。

3. 多周期设计,同时捕捉短期和长期趋势,避免被错杀。

4. 可自定义开仓条件,严格控制交易频率。

5. 可设置止损、止盈条件,有效控制风险。

6. 可添加趋势跟踪止损,实现盈利跟踪。

7. 可优化参数,使策略更稳定可靠。

## 风险分析

该策略也存在以下风险:

1. 双移动平均线交叉本身滞后,可能错过价格反转的最佳时机。

2. 移动平均线周期设置不当,可能产生更多假信号。

3. 突发事件造成快速反转,止损被击穿的风险。

4. 趋势行情中,价格长期滞留在均线一侧的概率较大。

5. 参数优化不当,可能过度优化到特定时间段。

对应风险管理措施:

1. 结合其他指标过滤信号,规避假突破。

2. 周期设置要遵循趋势交易原则,测试优化参数。 

3. 风险控制要审慎,止损位置设置合理。

4. 需承担一定的耐心等待成本。

5. 多种市场环境中测试参数健壮性。

## 优化方向

该策略可以从以下方面进行优化:

1. 测试更多类型的移动平均线,如加权移动平均线等。

2. 增加基于波动率的动态周期,根据市场变化调整均线参数。

3. 策略入场条件可加选时间或基本面过滤,降低错误交易率。

4. 出场条件可设定动态止盈止损,根据市场波动程度调整止损幅度。

5. 可建立参数优化系统,实现策略的历史回测与参数调优。

6. 增加机器学习算法,利用AI来优化参数和过滤信号。

## 总结

该移动平均线交叉多周期策略整体思路清晰易懂,通过快慢均线交叉来捕捉趋势,是一种较为经典的趋势跟踪策略。策略可以通过选取合适的参数、优化入场出场逻辑、严格风险控制来实现稳定的盈利。但用户需要承担一定的滞后 recognizes风险和等待时间成本。总体来说,该策略简单实用,值得进行参数优化和风险控制,以适应更多市场环境。

||


## Overview

This strategy is based on moving average crossover system, using golden cross and death cross of moving averages in different timeframes to determine entry and exit points. It also combines features like trailing stop loss, take profit and stop loss to lock in profits and mitigate risks.

## Strategy Logic

The strategy utilizes two sets of moving averages, fast MA and slow MA. The fast MA has a shorter period to capture short-term trend, while the slow MA has a longer period for long-term trend. When the fast MA crosses above the slow MA, a golden cross occurs, signaling an uptrend. When the fast MA crosses below the slow MA, a death cross occurs, signaling a downtrend.

In the code, the fast MA is ma1, slow MA is ma2. Both ma1 and ma2 can be different types like SMA, EMA, with customizable periods. ma1 represents short-term trend with shorter period, ma2 represents long-term trend with longer period.

When ma1 golden crosses ma2, a long signal is generated. When ma1 death crosses ma2, a short signal is generated. In actual trading, features like trailing stop loss, take profit and stop loss can be added to lock in profits and control risks.

## Advantage Analysis  

The strategy has the following advantages:

1. Simple and easy-to-understand logic.

2. Flexible in choosing different types and parameters of MAs for different market conditions.

3. Multi-timeframe design to capture both short and long term trends.

4. Customizable entry rules to strictly control trading frequency. 

5. Configurable stop loss and take profit to effectively manage risks.

6. Trend trailing stop loss allows profit to run.

7. Optimizable parameters for more robustness.

## Risk Analysis

The strategy also has the following risks:

1. Lagging issue of dual MA crossovers may miss best reversal timing.

2. Improper MA periods may generate more false signals. 

3. Sudden reversals may hit stop loss.

4. Price may stay on one side of MA for extended periods in trending markets.

5. Over-optimization over fitted parameters.

Risk management measures:

1. Add filters to avoid false breakout signals.

2. Test and optimize MA periods based on trading principles.

3. Careful risk control and reasonable stop loss placement.

4. Accept necessary cost of patience. 

5. Robustness test under different market conditions.

## Optimization Directions

The strategy can be improved from the following aspects:

1. Test more types of MA, like weighted moving average.

2. Add dynamic periods based on volatility.

3. Add filters like time and fundamentals to entry rules.

4. Use adaptive stops that adjust to market volatility.

5. Build parameter optimization system for backtesting.

6. Incorporate machine learning to optimize parameters and filter signals.

## Conclusion

In conclusion, this moving average crossover multi timeframe strategy has simple and clear logic to follow trends using fast and slow MA crossovers. With proper parameter selection, optimized entry/exit rules and risk control, it can achieve steady profits. However, users need to tolerate lagging risks and waiting time costs. Overall it is a simple, practical strategy worth optimizing and risk control for adapting to more market conditions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|9999|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_7|0|--------Moving Average 1----------: ----|
|v_input_8|false|Use Different Resolution?|
|v_input_9|60|Set Resolution Minutes|
|v_input_10|0|MA: EMA|SMA|DEMA|TEMA|WMA|VWMA|SMMA|Hull|LSMA|ALMA|
|v_input_11_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_12|15|Period|
|v_input_13|true|Least Squares (LSMA) Only - Offset Value|
|v_input_14|0.85|Arnaud Legoux (ALMA) Only - Offset Value|
|v_input_15|6|Arnaud Legoux (ALMA) Only - Sigma Value|
|v_input_16|0|--------Moving Average 2----------: ----|
|v_input_17|false|Use Different Resolution?|
|v_input_18|60|Set Resolution Minutes|
|v_input_19|0|MA: EMA|SMA|DEMA|TEMA|WMA|VWMA|SMMA|Hull|LSMA|ALMA|
|v_input_20_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_21|30|Period|
|v_input_22|true|Least Squares (LSMA) Only - Offset Value|
|v_input_23|0.85|Arnaud Legoux (ALMA) Only - Offset Value|
|v_input_24|6|Arnaud Legoux (ALMA) Only - Sigma Value|
|v_input_25|false|Longs Only|
|v_input_26|false|Shorts Only|
|v_input_27|false|Flip the Opens|
|v_input_28|true|Pyramiding less than|
|v_input_29|false|Pyramiding equal to|
|v_input_30|1000000|Pyramiding greater than|
|v_input_31|false|Trailing Stop|
|v_input_32|1000|Activate Trailing Stop Price (%). Divided by 100 (1 = 0.01%)|
|v_input_33|575|Trailing Stop (%). Divided by 100 (1 = 0.01%)|
|v_input_34|false|Take Profit|
|v_input_35|300|Take Profit (%). Divided by 100 (1 = 0.01%)|
|v_input_36|false|Stop Loss|
|v_input_37|575|Stop Loss (%). Divided by 100 (1 = 0.01%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
// The majority of this script I took from the Autoview website. There are some typos in the original that I've fixed, some things I've added, things I will add, and I'm tired pulling my strategy code out and uploading this to pastebin for people.
// DISCLAIMER: I am not a financial advisor, this is not financial advice, do not use this code without first doing your own research, etc, etc, it's not my fault when you lose your house.

strategy("Moving Averages Cross - MTF - Strategy", "MA Cross", overlay=true, pyramiding=0, initial_capital=100000, currency=currency.USD, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_type=strategy.commission.percent, commission_value=0.1)

bgcolor ( color=black, transp=40, title='Blackground', editable=true)

///////////////////////////////////////////////
//* Backtesting Period Selector | Component *//
///////////////////////////////////////////////

//* https://www.tradingview.com/script/eCC1cvxQ-Backtesting-Period-Selector-Component *//
//* https://www.tradingview.com/u/pbergden/ *//
//* Modifications made *//

testStartYear = input(2018, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,00,00)

testStopYear = input(9999, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

testPeriod() => true

/////////////////////////////////////
//* Put your strategy logic below *//
/////////////////////////////////////

sp1 = input("----", title="--------Moving Average 1----------", options=["----"])
maUseRes1   = input(defval = false, title = "Use Different Resolution?")
//maReso1     = input(defval = "60", title = "Set Resolution", type = resolution)
maReso1     = input(defval='60', title = "Set Resolution Minutes")
maType1     = input("EMA", title="MA", options=["SMA", "EMA", "DEMA", "TEMA", "WMA", "VWMA", "SMMA", "Hull", "LSMA", "ALMA"])
maSource1   = input(defval = close, title = "Source")
maLength1   = input(defval = 15, title = "Period", minval = 1)
lsmaOffset1 = input(defval = 1, title = "Least Squares (LSMA) Only - Offset Value", minval = 0)
almaOffset1 = input(defval = 0.85, title = "Arnaud Legoux (ALMA) Only - Offset Value", minval = 0, step = 0.01)
almaSigma1  = input(defval = 6, title = "Arnaud Legoux (ALMA) Only - Sigma Value", minval = 0)

sp2 = input("----", title="--------Moving Average 2----------", options=["----"])
maUseRes2   = input(defval = false, title = "Use Different Resolution?")
//maReso2    = input(defval = "60", title = "Set Resolution", type = resolution)
maReso2     = input(defval='60', title = "Set Resolution Minutes")
maType2    = input("EMA", title="MA", options=["SMA", "EMA", "DEMA", "TEMA", "WMA", "VWMA", "SMMA", "Hull", "LSMA", "ALMA"])
maSource2   = input(defval = close, title = "Source")
maLength2   = input(defval = 30, title = "Period", minval = 1)
lsmaOffset2 = input(defval = 1, title = "Least Squares (LSMA) Only - Offset Value", minval = 0)
almaOffset2 = input(defval = 0.85, title = "Arnaud Legoux (ALMA) Only - Offset Value", minval = 0, step = 0.01)
almaSigma2  = input(defval = 6, title = "Arnaud Legoux (ALMA) Only - Sigma Value", minval = 0)

//Function from @JayRogers thank you man awesome work
variant(type, src, len, lsmaOffset, almaOffset, almaSigma) =>
    v1 = sma(src, len)                                                  // Simple
    v2 = ema(src, len)                                                  // Exponential
    v3 = 2 * v2 - ema(v2, len)                                          // Double Exponential
    v4 = 3 * (v2 - ema(v2, len)) + ema(ema(v2, len), len)               // Triple Exponential
    v5 = wma(src, len)                                                  // Weighted
    v6 = vwma(src, len)                                                 // Volume Weighted
    v7 = na(v5[1]) ? sma(src, len) : (v5[1] * (len - 1) + src) / len    // Smoothed
    v8 = wma(2 * wma(src, len / 2) - wma(src, len), round(sqrt(len)))   // Hull
    v9 = linreg(src, len, lsmaOffset)                                   // Least Squares
    v10 = alma(src, len, almaOffset, almaSigma)                         // Arnaud Legoux
    type=="EMA"?v2 : type=="DEMA"?v3 : type=="TEMA"?v4 : type=="WMA"?v5 : type=="VWMA"?v6 : type=="SMMA"?v7 : type=="Hull"?v8 : type=="LSMA"?v9 : type=="ALMA"?v10 : v1
//Different resolution function    
reso(exp, res, use) => use ? security(tickerid, res, exp) : exp    
    
ma1 = reso(variant(maType1, maSource1, maLength1, lsmaOffset1, almaOffset1, almaSigma1), maReso1, maUseRes1)
ma2 = reso(variant(maType2, maSource2, maLength2, lsmaOffset2, almaOffset2, almaSigma2), maReso2, maUseRes2)

plotma1 = plot(ma1, color=green, tranps=50, linewidth = 2 )
plotma2 = plot(ma2, color=red,   tranps=50, linewidth = 2 )

// Long/Short Logic
longLogic =  crossover(ma1,ma2) ? 1 : 0
shortLogic = crossunder(ma1,ma2) ? 1 : 0

//////////////////////////
//* Strategy Component *//
//////////////////////////

isLong = input(false, "Longs Only")
isShort = input(false, "Shorts Only")
isFlip = input(false, "Flip the Opens")

long = longLogic
short = shortLogic

if isFlip
    long := shortLogic
    short := longLogic
else
    long := longLogic
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

pyrl = input(1, "Pyramiding less than") // If your count is less than this number
pyre = input(0, "Pyramiding equal to") // If your count is equal to this number
pyrg = input(1000000, "Pyramiding greater than") // If your count is greater than this number

longCondition = long and sectionLongs <= pyrl or long and sectionLongs >= pyrg or long and sectionLongs == pyre ? 1 : 0
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
tsi = input(1000, "Activate Trailing Stop Price (%). Divided by 100 (1 = 0.01%)") / 100 
ts = input(575, "Trailing Stop (%). Divided by 100 (1 = 0.01%)") / 100

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

isTP = input(false, "Take Profit")
tp = input(300, "Take Profit (%). Divided by 100 (1 = 0.01%)") / 100
long_tp = isTP and close > averageLongs + averageLongs / 100 * tp and not longCondition
short_tp = isTP and close < averageShorts - averageShorts / 100 * tp and not shortCondition

/////////////////////////////
//======[ Stop Loss ]======//
/////////////////////////////

isSL = input(false, "Stop Loss")
sl = input(575, "Stop Loss (%). Divided by 100 (1 = 0.01%)") / 100
long_sl = isSL and close < averageLongs - averageLongs / 100 * sl and longCondition == 0
short_sl = isSL and close > averageShorts + averageShorts / 100 * sl and shortCondition == 0

/////////////////////////////////
//======[ Close Signals ]======//
/////////////////////////////////

longClose = long_tp or long_sl or long_ts  ? 1 : 0
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

// Comment out these lines to use alerts
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


// Uncomment to use Alerts, or the new Signal Plots, but not both
// Old Signal Plots
//plot(longCondition, "Long", green)
//plot(shortCondition, "Short", red)
//plot(longClose, "Long Close", longCloseCol)
//plot(shortClose, "Short Close", shortCloseCol)

// Uncomment for your alerts
//alertcondition(condition=longCondition, title="Long", message="")
//alertcondition(condition=shortCondition, title="Short", message="")
//alertcondition(condition=longClose, title="Long Close", message="")
//alertcondition(condition=shortClose, title="Short Close", message="")

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

// Comment out to use alerts
if testPeriod()
    strategy.entry("Long", 1, when=longCondition)
    strategy.entry("Short", 0,  when=shortCondition)
    strategy.close("Long", when=longClose)
    strategy.close("Short", when=shortClose)
```

> Detail

https://www.fmz.com/strategy/428810

> Last Modified

2023-10-09 16:41:04
