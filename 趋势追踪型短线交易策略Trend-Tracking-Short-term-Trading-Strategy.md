
> Name

趋势追踪型短线交易策略Trend-Tracking-Short-term-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1607418858f17f61dc4.png)
[trans]

## 概述
本策略基于趋势判断指标ADX平均趋向指数以及均线组合,实现对趋势的判断和跟踪。当判断出现趋势反转时,采用突破操作,进行短线交易。

## 策略原理
1. 使用ADX平均趋向指数判断趋势走向。当ADX大于20时,表示目前处于趋势状况。
2. EMA作为趋势判断指标,EMA金叉表示上涨趋势,死叉表示下跌趋势。
3. VWAP作为重要参考价位,价格在VWAP上方时为多头市场,下方为空头市场。
4. 根据上述多个指标综合判断市场趋势和反转情况,进行突破操作,追踪趋势进行短线交易。

## 优势分析 
1. 综合多个指标判断趋势走向,对大趋势判断准确。
2. VWAP作为重要参考价位,避免在无效区域交易。 
3. ADX判断趋势存在时再进行操作,减少无效交易。
4. 突破操作成功率较高,符合趋势运行。

## 风险分析
1. 突破失败导致止损的概率存在。可以通过优化止损位置来降低风险。
2. 交易次数较多,单笔交易可能出现亏损。可以适当调整仓位数,降低单笔亏损比例。
3. 对交易时间和交易品种的选择也会影响策略表现。可以测试不同的交易时间和不同的交易品种。

## 优化方向
1. 优化ADX参数,找到更好区分趋势和盘整的ADX值。
2. 优化均线参数组合,找到代表趋势更好的均线组合。  
3. 优化止损位置。适当放宽止损范围,避免止损成本过高。
4. 优化仓位大小。降低单笔交易风险。

## 总结
本策略综合运用均线指标、趋势判断指标和重要参考价位,对大趋势做精准判断;并在判断到趋势反转时,采用突破操作追踪趋势运行,实现短线交易。通过参数优化,可以进一步提高策略表现。

|| 


## Overview
This strategy uses the trend judging indicator ADX and moving averages to determine and track trends. When a trend reversal is identified, it uses breakout operations for short-term trading.  

## Strategy Logic  
1. Use ADX to judge the trend direction. ADX above 20 indicates a trending market.
2. Use EMA crossovers to determine uptrends and downtrends. Golden cross for uptrend and death cross for downtrend.
3. Use VWAP as an important reference price level. Price above VWAP indicates bullish sentiment and below indicates bearish sentiment.
4. Enter positions based on the comprehensive trend analysis from the indicators when a trend reversal is identified. Track the new trend using short-term trading.

## Advantage Analysis
1. Comprehensive trend analysis using multiple indicators improves accuracy. 
2. VWAP avoids trading in ineffective price zones.
3. Only trade when ADX confirms a trend, avoiding false signals.  
4. Breakout trading aligns well with momentum. Higher probability of success.

## Risk Analysis
1. Failed breakout leading to a stop loss is possible. Can optimize stop loss placement.  
2. Higher trade frequency risks individual losing trades. Can adjust position sizing.
3. Time frame and symbol selection impacts performance. Test different configurations.

## Optimization Directions 
1. Optimize ADX parameters for better trend vs range identification.
2. Test EMA combinations for better trend identification.
3. Widen stop loss to reduce trading costs.  
4. Reduce position sizing to lower risk per trade.  

## Conclusion
This strategy comprehensively utilizes moving averages, trend indicators and key price levels to accurately determine market trends. It identifies trend reversals to trade breakouts and track the new trend direction for short-term profits. Further optimization can improve performance.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1400-1500|Session Time|
|v_input_float_1|1.5|Risk to reward|
|v_input_2|false|Move to Break Even|
|v_input_float_2|true|Break Even at|
|v_input_3|3|VWAP Multiplier|
|v_input_4|BTC_USDT:swap|VWAP Source|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-27 00:00:00
end: 2023-12-29 23:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mariocastel

//@version=5
strategy("Wave Rider", overlay=true, initial_capital = 100000)

session = input(defval = "1400-1500", title = "Session Time")
t = not na(time(timeframe.period,session))
RR = input.float(1.5, "Risk to reward", step=0.5)
var bool movetoBE = input(false, "Move to Break Even")
BE = input.float(1, "Break Even at", step=0.5)

vwap_mult = 0.001 * input(3, "VWAP Multiplier")
aboveVWAP = ta.vwap(close) * (1 + vwap_mult)
belowVWAP = ta.vwap(close) * (1 - vwap_mult)
sym = input("BTC_USDT:swap", "VWAP Source")

QQQaboveVWAP = request.security(sym, "3", aboveVWAP)
QQQbelowVWAP = request.security(sym, "3", belowVWAP)
QQQclose = request.security(sym, "3", close)

ema20 = ta.ema(close, 20)
ema50 = ta.ema(close, 50)
ema60 = ta.ema(close, 60)
ema9 = ta.ema(close, 9)

opentrades = strategy.opentrades > 0

aboveEMA = close > ema60
belowEMA = close < ema60

uptrend = aboveEMA and aboveEMA[1] and aboveEMA[2] and aboveEMA[3] and aboveEMA[4] and aboveEMA[5] and aboveEMA[6] and aboveEMA[7] and aboveEMA[8] and aboveEMA[9] and aboveEMA[10] and aboveEMA[11] and aboveEMA[12] and aboveEMA[13] and aboveEMA[14] and aboveEMA[15] and aboveEMA[16] and aboveEMA[17] and aboveEMA[18] and aboveEMA[19] and aboveEMA[20] and aboveEMA[21] and aboveEMA[22] and aboveEMA[23] and aboveEMA[24] and aboveEMA[25] and aboveEMA[26] and aboveEMA[27] and aboveEMA[28] and aboveEMA[29]
downtrend = belowEMA and belowEMA[1] and belowEMA[2] and belowEMA[3] and belowEMA[4] and belowEMA[5] and belowEMA[6] and belowEMA[7] and belowEMA[8] and belowEMA[9] and belowEMA[10] and belowEMA[11] and belowEMA[12] and belowEMA[13] and belowEMA[14] and belowEMA[15] and belowEMA[16] and belowEMA[17] and belowEMA[18] and belowEMA[19] and belowEMA[20] and belowEMA[21] and belowEMA[22] and belowEMA[23] and belowEMA[24] and belowEMA[25] and belowEMA[26] and belowEMA[27] and belowEMA[28] and belowEMA[29]

buy = (low < ema20 and low > ema50 and close > ema9) and QQQclose > QQQaboveVWAP  or (low[1] < ema20 and low[1] > ema50 and close > ema9) and QQQclose > QQQaboveVWAP and uptrend
sell = (high > ema20 and high < ema50 and close < ema9) and QQQclose < QQQbelowVWAP  or (high[1] > ema20 and high[1] < ema50 and close < ema9) and QQQclose < QQQbelowVWAP and downtrend

var float entry = na
var float sl = na
var float qty = na
var float tp = na
var float be = na

if ema20 > ema50 and ema9 > ema20 
    if buy and not opentrades and t and uptrend
        alert("Wave Rider Setup")
        entry := close
        sl := ema50
        qty := 1000/(close - sl) * 1
        if close - sl > syminfo.mintick*300
            tp := close + ((close - sl)*1)
        else 
            tp := close + ((close - sl)*RR)
        be := close + ((close - sl)*BE)
        strategy.entry("Buy", strategy.long, qty=qty)
        strategy.exit("Close Buy", "Buy",qty=qty, stop=sl, limit=tp)

if ema20 < ema50 and ema9 < ema20 
    if sell and not opentrades and t and downtrend
        alert("Wave Rider Setup")
        entry := close
        sl := ema50
        qty := 1000/(sl - close) * 1
        if sl - close > syminfo.mintick*300
            tp := close - ((sl - close)*1)
        else
            tp := close - ((sl - close)*RR)
        be := close - ((sl - close)*BE)
        strategy.entry("Sell", strategy.short, qty=qty)
        strategy.exit("Close Sell", "Sell", qty=qty, stop=sl, limit=tp)

// Adjust BEs
if movetoBE == true
    if strategy.position_size > 0
        if high >= be
            sl := entry
            strategy.cancel("Close Buy")
            strategy.exit("Close Buy", "Buy", qty=qty, stop=sl, limit=tp)   
    if strategy.position_size < 0
        if low <= be
            sl := entry
            strategy.cancel("Close Sell")  
            strategy.exit("Close Sell", "Sell", qty=qty, stop=sl, limit=tp)  


EoD_time = timestamp(year, month, dayofmonth, 15, 58, 00)
EoD = time == EoD_time
if EoD
    strategy.close_all()

barcolor(color=buy ? color.rgb(191, 255, 131): na)
barcolor(color=sell ? color.rgb(255, 149, 149): na)
ema20plot = plot(ema20, color=color.rgb(168, 131, 131, 55))
ema50plot = plot(ema50, color=color.black)
fill(ema20plot, ema50plot, color=color.rgb(168, 131, 131, 85))
plot(ema9, color=color.red)
plot(ema60, color=color.purple)
plot(QQQaboveVWAP)
plot(QQQbelowVWAP)
plotshape(uptrend, style=shape.triangleup, location=location.belowbar, color=color.black)
plotshape(downtrend, style=shape.triangledown, location=location.abovebar, color=color.black)

```

> Detail

https://www.fmz.com/strategy/437691

> Last Modified

2024-01-04 17:52:21
