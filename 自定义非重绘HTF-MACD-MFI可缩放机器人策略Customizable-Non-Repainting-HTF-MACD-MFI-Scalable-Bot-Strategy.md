
> Name

自定义非重绘HTF-MACD-MFI可缩放机器人策略Customizable-Non-Repainting-HTF-MACD-MFI-Scalable-Bot-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1efde492e2934cff8e9.png)
[trans]

## 概述

该策略是一个高度可自定义的非重绘MACD和MFI指标的组合策略,适用于算法交易机器人。它结合了趋势指标和动量指标,通过多种过滤器来产生交易信号。

## 策略原理

该策略使用了MACD指标判断市场趋势方向。MACD是一种趋势跟踪型动量指标,由快速移动均线减去慢速移动均线得到MACD柱状图,再用MACD的指数移动平均线得到信号线。当快线上穿慢线时为买入信号,下穿为卖出信号。

另外,该策略还使用了MFI指标判断市场的超买超卖状态。MFI指标结合了价格和成交量信息,值在0至100之间波动。MFI低于20时是超卖区域,高于80时是超买区域。

为过滤虚假信号,该策略还加入了趋势过滤器和RSI过滤器。当价格在上升趋势下,并且RSI小于设定阈值时产生买入信号。

## 策略优势

- 组合多个指标,综合判断市场状态,提高胜率
- 加入过滤器机制,避免虚假信号,减少不必要交易
- 各类参数及过滤器可自定义配置,适应不同品种及交易偏好
- 可用于手动交易,也可连接算法机器人进行程序化交易

## 策略风险及解决方法

- 指标参数设置不当容易产生虚假信号
- 可测试不同参数,选取最优参数组合
- 多品种参数不通用,需要分别测试优化

- 交易频率可能过高,增加交易成本和滑点风险
- 可调整过滤器,降低交易频率
- 实盘交易时注意成本控制

## 策略优化方向

- 测试更长的数据周期,评估参数稳定性
- 尝试不同的指标参数组合
- 优化指标权重,提高策略稳定性
- 加入更多过滤器,降低不必要交易

## 总结

该策略是一个可高度定制的趋势跟踪型策略,同时结合趋势和动量指标判断市场状态,并有效利用过滤器机制控制风险。它可用于手动交易,也可连接算法机器人实现自动化程度很高的程序化交易,是一套值得长期跟踪优化的策略体系。

|| 

## Overview

This strategy is a highly customizable non-repainting combination strategy using MACD and MFI indicators, suitable for algorithmic trading bots. It incorporates both trend and momentum indicators to generate trading signals, with additional filters to avoid false signals.  

## Strategy Logic

The strategy uses the MACD indicator to determine market trend direction. MACD is a trend-following momentum indicator, calculated by subtracting the slow moving average from the fast moving average to get the MACD histogram, and using an EMA of the MACD as the signal line. A crossover above the signal line gives a buy signal, while crossing below gives a sell signal.

In addition, the MFI indicator is used to gauge overbought/oversold levels in the market by incorporating both price and volume information. MFI oscillates between 0 and 100, with values below 20 indicating an oversold region and values above 80 indicating an overbought region.

To filter out false signals, the strategy also implements a trend filter and RSI filter. A buy signal is only generated when price is in an upward trend and RSI is below a threshold.  

## Advantages of the Strategy

- Combines multiple indicators for a more robust market state evaluation, improving win rate
- Filtering mechanisms avoid false signals and reduce unnecessary trades  
- Highly customizable parameters and filters adaptable to different instruments and trading preferences
- Can be used for manual trading or connected to algorithmic bots for automated trading

## Risks & Mitigations

- Poor parameter tuning can lead to false signals  
- Test different parameter combinations to find optimal settings
- Parameters not one-size-fits-all, need separate testing/optimization per instrument

- High trading frequency increases costs and slippage risks
- Adjust filters to reduce trade frequency 
- Monitor costs closely during live trading

## Directions for Strategy Optimization

- Test on longer data periods to evaluate parameter stability
- Try different combinations of indicator parameters
- Optimize indicator weighting for better stability
- Add more filters to avoid unnecessary trades

## Conclusion

This is a highly customizable trend-following strategy combining both trend and momentum indicators to gauge market state, and effectively uses filtering mechanisms to control risks. It can be used for manual trading or connected to algorithmic bots for a high degree of automation, and is a strategy worth tracking and optimizing over the long run.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_3|39|Period|
|v_input_9|7|Fast Length|
|v_input_10|23|Slow Length|
|v_input_11_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_12|10|Signal Smoothing|
|v_input_13|false|Simple MA(Oscillator)|
|v_input_14|false|Simple MA(Signal Line)|
|v_input_15|15|length|
|v_input_16|12|lower|
|v_input_17|80|upper|
|v_input_18|true|Highlight Oversold/Overbought?|
|v_input_19|true|Long Take Profit 1 %|
|v_input_20|20|Long Take Profit 1 Qty|
|v_input_21|1.3|Trailing Stop Long|
|v_input_22|2|SL Mutiplier|
|v_input_23|40|ATR period|
|v_input_24|2018|Backtest Start Year|
|v_input_25|true|Backtest Start Month|
|v_input_26|true|Backtest Start Day|
|v_input_27|9999|Backtest Stop Year|
|v_input_28|12|Backtest Stop Month|
|v_input_29|31|Backtest Stop Day|
|v_input_1|5|(?Strategy)Resolution|
|v_input_2||Open Long Comment|
|v_input_4|true|(?Filters)Use Trend|
|v_input_5|3|Trend MA|
|v_input_6|true|Use RSI|
|v_input_7|34|RSI Length|
|v_input_8|50|Buy Below RSI Filter|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-15 00:00:00
end: 2023-12-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//(c) Wunderbit Trading
//Modified by Mauricio Zuniga - Trade at your own risk
//This script was originally shared on Wunderbit website as a free open source script for the community. (https://help.wundertrading.com/en/articles/5246468-macd-mfi-trading-bot-for-ftx)
// 
//WHAT THIS SCRIPT DOES:
//   This is a scalping script originally intended to be used on altorightmic bot trading.
//   This strategy is based on the trend-following momentum indicator. It includes the Money Flow index as an additional point for entry. 
//HOW IT DOES IT:
//   It uses a combination of MACD and MFI indicators to create entry signals.  Parameters for each indicator have been surfaced for user configurability.
//   Take profits are fixed, but stop loss uses ATR configuration to minimize losses and close profitably.
//HOW IS MY VERSION ORIGINAL:
//   I started trying to deploy this script myself in my algorithmic tradingg but ran into some issues which I have tried to address in this version.
//   Delayed Signals : The script has been refactored to use a time frame drop down.  The higher time frame can be run on a faster chart (recommended on one minute chart for fastest signal confirmation and relay to algotrading platform.  
//   Repainting Issues : All indicators have been recoded to use the security function that checks to see if the current calculation is in realtime, if it is, then it uses the previous bar for calculation.
//   If you are still experiencing repainting issues based on intended (or non intended use), please provide a report with screenshot and explanation so I can try to address.
//   Filtering :  I have added to additional filters an ABOVE EMA Filter and a BELOW RSI Filter (both can be turned on and off) 
//   Customizable Long and Clos Messages : This allows someone to use the script for algorithmic trading without having to alter code.  It also means you can use one indicator for all of your different alterts required for your bots.
//HOW TO USE IT:
//   Find a pair with high volatility - I have found it works particularly well with 3L and 3S tokens for crypto. although it the limitation is that confrigurations I have found to work typically have low R/R ratio, but very high win rate and profit factor.
//   Ieally set one minute chart for bots, but you can use other charts for manual trading.  The signal will be delayed by one bar but I have found configurations that still test well.
//   Select a time frame in configuration for your indicator calculations. 
//   I like ot use 5 and 15 minutes for scalping scenarios, but I am interested in hearing back from other community memebers.
//   Optimize your indicator without filters (trendFilter and RSI Filter)
//   Use the TrendFilter and RSI Filter to further refine your signals for entry.

//@version=4
strategy("Customizable HTF MACD Strategy v1.2", overlay=false, pyramiding=0, commission_type=strategy.commission.percent, commission_value=0.07, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, currency = currency.USD)

openlongcomment = "Comment In Here"
closelongcomment = ""
openshortcomment = ""
closeshortcommment = ""
//RES
res = input(title="Resolution", type=input.resolution, defval="5", group="Strategy", inline="1")
comment = input(title="Open Long Comment", type=input.string, defval="",group="Strategy", inline="1")

if not(comment == "")
    openlongcomment := comment
// FUNCTIONS

Ema(src,p) =>
    ema = 0.
    sf = 2/(p+1)
    ema := nz(ema[1] + sf*(src - ema[1]),src)

Sma(src,p) => a = cum(src), (a - a[max(p,0)])/max(p,0)

Atr(p, res) =>
    atr = 0.
    highHTF = security(syminfo.tickerid, res, high[barstate.isrealtime ? 1 : 0])
    lowHTF = security(syminfo.tickerid, res, low[barstate.isrealtime ? 1 : 0])
    closeHTF = security(syminfo.tickerid, res, close[barstate.isrealtime ? 1 : 0])
    Tr = max(highHTF - lowHTF, max(abs(highHTF - closeHTF[1]), abs(lowHTF - closeHTF[1])))
    atr := nz(atr[1] + (Tr - atr[1])/p,Tr)


ribbon_period = input(39, "Period", step=1)

htfClose = security(syminfo.tickerid, res, close[barstate.isrealtime ? 1 : 0])

leadLine1 = ema(htfClose, ribbon_period)
leadLine2 = sma(htfClose, ribbon_period)

// p3 = plot(leadLine1, color= #53b987, title="EMA", transp = 50, linewidth = 1)
// p4 = plot(leadLine2, color= #eb4d5c, title="SMA", transp = 50, linewidth = 1)
// fill(p3, p4, transp = 60, color = leadLine1 > leadLine2 ? #53b987 : #eb4d5c)

//Upward Trend
UT=leadLine2 < leadLine1
DT=leadLine2>leadLine1
//FILTER LOGIC
aboveTrend = input(true, title="Use Trend", group="Filters", inline='1', type=input.bool)
TrendLength  = input(3, minval=1, title="Trend MA", group="Filters", inline='1', type=input.integer)
aboveTrendFilter = sma(htfClose,TrendLength)

useRSI = input(true, title="Use RSI", group="Filters", inline='2', type=input.bool)
RSILength  = input(34, minval=1, title="RSI Length", group="Filters", inline='2') // used to calculate RSI
belowRSIFilter  = input(50, minval=1, title="Buy Below RSI Filter", group="Filters", inline='2') // only buy if its below this RSI - doesn't seem to work as expected
rsi = rsi(htfClose,RSILength)

if not(useRSI)
    belowRSIFilter = 100
if not(aboveTrend)
    aboveTrendFilter = -1
    

// MACD
fast_length = input(title="Fast Length", type=input.integer, defval=7)
slow_length = input(title="Slow Length", type=input.integer, defval=23)
src = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 10)
sma_source = input(title="Simple MA(Oscillator)", type=input.bool, defval=false)
sma_signal = input(title="Simple MA(Signal Line)", type=input.bool, defval=false)

// Plot colors
col_grow_above = #26A69A
col_grow_below = #FFCDD2
col_fall_above = #B2DFDB
col_fall_below = #EF5350
col_macd = #0094ff
col_signal = #ff6a00


srcHTF = security(syminfo.tickerid, res, src[barstate.isrealtime ? 1 : 0])
// Calculating
fast_ma = sma_source ? Sma(srcHTF, fast_length) : Ema(srcHTF, fast_length)
slow_ma = sma_source ? Sma(srcHTF, slow_length) : Ema(srcHTF, slow_length)

macd = fast_ma - slow_ma
signal = sma_signal ? Sma(macd, signal_length) : Ema(macd, signal_length)
hist = macd - signal

//plot(hist, title="Histogram", style=plot.style_columns, color=(hist>=0 ? (hist[1] < hist ? col_grow_above : col_fall_above) : (hist[1] < hist ? col_grow_below : col_fall_below) ), transp=0 )
plot(macd, title="MACD", color=col_macd, transp=0)
plot(signal, title="Signal", color=col_signal, transp=0)

/// MFI

MFIsource = hlc3
sourceHTF = security(syminfo.tickerid, res, MFIsource[barstate.isrealtime ? 1 : 0])
length = input(15, minval=1)
lower = input(12, minval=0, maxval=50)
upper = input(80, minval=50, maxval=100)

// DrawMFI_f=input(true, title="Draw MFI?", type=bool)
HighlightBreaches=input(true, title="Highlight Oversold/Overbought?")

volumeHTF = security(syminfo.tickerid, res, volume[barstate.isrealtime ? 1 : 0])

// MFI
upper_s = sum(volumeHTF * (change(sourceHTF) <= 0 ? 0 : sourceHTF), length)
lower_s = sum(volumeHTF * (change(sourceHTF) >= 0 ? 0 : sourceHTF), length)
mf = rsi(upper_s, lower_s)
mfp = plot(mf, color=color.new(color.gray,0), linewidth=1)
top = hline(upper, color=color.new(color.gray, 100), linewidth=1, editable=false)
bottom = hline(lower, color=color.new(color.gray,100), linewidth=1, editable=false)
hline(0, color=color.new(color.black,100), editable=false)
hline(100, color=color.new(color.black,100), editable=false)

// Breaches
b_color = (mf > upper) ? color.new(color.red,70) : (mf < lower) ? color.new(color.green,60) : na
bgcolor(HighlightBreaches ? b_color : na)

fill(top, bottom, color=color.gray, transp=75)

// TAKE PROFIT AND STOP LOSS
long_tp1_inp = input(1, title='Long Take Profit 1 %', step=0.1)/100
long_tp1_qty = input(20, title="Long Take Profit 1 Qty", step=1)

long_trailing = input(1.3, title='Trailing Stop Long', step=0.1) / 100

long_take_level_1 = strategy.position_avg_price * (1 + long_tp1_inp)

// Stop Loss
multiplier = input(2, "SL Mutiplier", minval=1, step=0.1)
ATR_period=input(40,"ATR period", minval=1, step=1)

// Strategy
entry_long=(crossover(macd,signal) or (crossover(mf,lower) and leadLine2 < leadLine1)) and rsi < belowRSIFilter and close > aboveTrendFilter 
entry_price_long=valuewhen(entry_long,close,0)
//SL_floating_long = entry_price_long -( (entry_price_long)*multiplier/100)//*Atr(ATR_period,res)
//SL_floating_long = entry_price_long - multiplier*Atr(ATR_period,res)
SL_floating_long = entry_price_long - multiplier*Atr(ATR_period,res)
exit_long= close < SL_floating_long

///// BACKTEST PERIOD ///////
testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear, testStartMonth, testStartDay, 0, 0)

testStopYear = input(9999, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear, testStopMonth, testStopDay, 0, 0)

testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false

if testPeriod()
    if UT
        strategy.entry("long", strategy.long, when=entry_long == true, comment=openlongcomment)
    strategy.exit("TP1","long", qty_percent=long_tp1_qty, limit=long_take_level_1)
    strategy.exit("Trail stop","long",  comment=closelongcomment,  trail_points=entry_price_long * long_trailing / syminfo.mintick, trail_offset=entry_price_long * long_trailing / syminfo.mintick)
    strategy.close("long", exit_long == true,  comment=closelongcomment )


```

> Detail

https://www.fmz.com/strategy/436221

> Last Modified

2023-12-22 12:47:21
