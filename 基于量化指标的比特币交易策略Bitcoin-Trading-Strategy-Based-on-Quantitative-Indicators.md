
> Name

基于量化指标的比特币交易策略Bitcoin-Trading-Strategy-Based-on-Quantitative-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/175760f3533e358cbd7.png)
[trans]

## 概述

这个策略采用多种量化指标来判断比特币的买卖时机,实现自动化交易。主要包括赫尔指标(Hull)、相对强弱指数(RSI)、布林带(BB)和成交量振荡器(VO)。

## 策略原理

1. 使用修改后的赫尔移动平均线判断市场主要趋势方向,结合布林带辅助判断突破买卖点。

2. RSI指标结合自适应波动范围判断超买超卖区域,发出交易信号。同时设置两组参数作为Duplicate信号验证。

3. 成交量振荡器判断买卖力道,避免虚假突破。

4. 根据止损价/止盈价比例参数预设止损止盈位,实现风险管理。

## 优势分析

1. 赫尔曲线能更快捕捉趋势转换,布林带辅助判断能减少假信号。

2. RSI指标参数优化设定及Duplicate信号验证,可靠性更高。

3. 成交量振荡器结合趋势及指标信号,避免不准确交易。

4. 预设止损止盈方法可自动控制单笔损益,有效控制总体风险。

## 风险分析

1. 参数设置不当可能导致交易频率过高或信号效果变差。

2. 突发事件导致市场剧烈波动时,止损可能被突破,造成较大损失。

3. 交易品种换成其他币种时,参数需要重新测试优化。

4. 成交量数据缺失时,成交量振荡器会失效。

## 优化方向

1. 对RSI参数进行更多组合测试,找到最佳参数。

2. 尝试其他指标如MACD、KD等与RSI组合,提升信号准确率。 

3. 增加模型预测模块,结合机器学习判断市场方向。

4. 测试换成其他交易品种参数效果。

5. 优化止损止盈算法,实现盈利最大化。

## 总结

本策略综合运用多种量化技术指标判断买卖时机。通过参数优化、风险控制等方法,实现了比特币的自动化交易。效果较好,但仍需持续测试与优化,适应市场变化。可为投资者提供参考,辅助交易决策。

||


## Overview

This strategy uses multiple quantitative indicators to determine the timing of buying and selling Bitcoin and automate trading. It mainly includes the Hull indicator, Relative Strength Index (RSI), Bollinger Bands (BB) and Volume Oscillator (VO).

## Strategy Principle  

1. Use the modified Hull Moving Average to determine the main trend direction of the market, combined with Bollinger Bands to assist in determining breakout buy and sell points.

2. The RSI indicator combined with an adaptive volatility range determines the overbought and oversold zones to generate trading signals. Two sets of parameters are also set up for duplicate signal verification.

3. The Volume Oscillator determines the momentum of buying and selling to avoid false breakouts.  

4. Set stop loss/take profit ratios in advance to preset stop loss and take profit levels for risk management.

## Advantage Analysis

1. The Hull curve can capture trend changes faster, and Bollinger Bands can help reduce false signals.

2. Optimization of RSI parameters and verification of duplicate signals make it more reliable.  

3. Volume Oscillator combined with trends and indicator signals avoids inaccurate trading.

4. Preset stop loss and take profit methods can automatically control single profit and loss and effectively manage overall risk.   

## Risk Analysis  

1. Improper parameter settings may result in too high trading frequency or deteriorated signal performance.

2. Sudden market events may cause prices to fluctuate violently, resulting in stop loss being triggered and greater losses.

3. When the trading variety is changed to other coins, the parameters need to be retested and optimized.  

4. If volume data is missing, the Volume Oscillator will fail.

## Optimization Directions

1. Test more RSI parameter combinations to find the optimal parameters.

2. Try combining RSI with other indicators like MACD and KD to improve signal accuracy.  

3. Add model prediction modules and use machine learning to judge market direction.

4. Test the parameters when applied to other trading varieties.

5. Optimize the stop loss and take profit algorithms to maximize profits.

## Summary  

This strategy combines multiple quantitative technical indicators to determine entry and exit timing. Through parameter optimization, risk control and other methods, it has achieved automated Bitcoin trading with good results. But it still requires continuous testing and optimization to adapt to market changes. It can serve as a reference for investors to assist in trading decisions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|1.5|Risk/Reward|
|v_input_int_1|true|(?beginning Backtest)Start Date|
|v_input_int_2|5|Start Month|
|v_input_int_3|2022|Start Year|
|v_input_int_4|7|(?number of past candles)Swing High|
|v_input_int_5|7|Swing Low|
|v_input_string_1|0|(?Hull Suite)Hull Variation: Hma|Thma|Ehma|
|v_input_1|60|Length|
|v_input_2|3|Length multiplier|
|v_input_3|6|(?QQE MOD)RSI Length|
|v_input_4|5|RSI Smoothing|
|v_input_5|3|Fast QQE Factor|
|v_input_6|3|Thresh-hold|
|v_input_7_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_6|50|Bollinger Length|
|v_input_float_2|0.35|BB Multiplier|
|v_input_8|6|RSI Length|
|v_input_9|5|RSI Smoothing|
|v_input_10|1.61|Fast QQE2 Factor|
|v_input_11|3|Thresh-hold|
|v_input_12_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_7|5|(?Volume Oscillator)Short Length|
|v_input_int_8|10|Long Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-25 00:00:00
end: 2023-12-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/


// © maxencetajet

//@version=5
strategy("Strategy Crypto", overlay=true, initial_capital=1000, default_qty_type=strategy.fixed, default_qty_value=0.5, slippage=25)

src1 = input.source(close, title="Source")
target_stop_ratio = input.float(title='Risk/Reward', defval=1.5, minval=0.5, maxval=100)

startDate = input.int(title='Start Date', defval=1, minval=1, maxval=31, group="beginning Backtest")
startMonth = input.int(title='Start Month', defval=5, minval=1, maxval=12, group="beginning Backtest")
startYear = input.int(title='Start Year', defval=2022, minval=2000, maxval=2100, group="beginning Backtest")

inDateRange = time >= timestamp(syminfo.timezone, startYear, startMonth, startDate, 0, 0)

swingHighV = input.int(7, title="Swing High", group="number of past candles")
swingLowV = input.int(7, title="Swing Low", group="number of past candles")

//Hull Suite

modeSwitch = input.string("Hma", title="Hull Variation", options=["Hma", "Thma", "Ehma"], group="Hull Suite")
length = input(60, title="Length", group="Hull Suite")
lengthMult = input(3, title="Length multiplier", group="Hull Suite")

HMA(_src1, _length) =>
    ta.wma(2 * ta.wma(_src1, _length / 2) - ta.wma(_src1, _length), math.round(math.sqrt(_length)))

EHMA(_src1, _length) =>
    ta.ema(2 * ta.ema(_src1, _length / 2) - ta.ema(_src1, _length), math.round(math.sqrt(_length)))

THMA(_src1, _length) =>
    ta.wma(ta.wma(_src1, _length / 3) * 3 - ta.wma(_src1, _length / 2) - ta.wma(_src1, _length), _length)

Mode(modeSwitch, src1, len) =>
    modeSwitch == 'Hma' ? HMA(src1, len) : modeSwitch == 'Ehma' ? EHMA(src1, len) : modeSwitch == 'Thma' ? THMA(src1, len / 2) : na

_hull = Mode(modeSwitch, src1, int(length * lengthMult))
HULL = _hull
MHULL = HULL[0]
SHULL = HULL[2]

hullColor = HULL > HULL[2] ? #00ff00 : #ff0000

Fi1 = plot(MHULL, title='MHULL', color=hullColor, linewidth=1, transp=50)
Fi2 = plot(SHULL, title='SHULL', color=hullColor, linewidth=1, transp=50)
fill(Fi1, Fi2, title='Band Filler', color=hullColor, transp=40)

//QQE MOD

RSI_Period = input(6, title='RSI Length', group="QQE MOD")
SF = input(5, title='RSI Smoothing', group="QQE MOD")
QQE = input(3, title='Fast QQE Factor', group="QQE MOD")
ThreshHold = input(3, title='Thresh-hold', group="QQE MOD")

src = input(close, title='RSI Source', group="QQE MOD")

Wilders_Period = RSI_Period * 2 - 1

Rsi = ta.rsi(src, RSI_Period)
RsiMa = ta.ema(Rsi, SF)
AtrRsi = math.abs(RsiMa[1] - RsiMa)
MaAtrRsi = ta.ema(AtrRsi, Wilders_Period)
dar = ta.ema(MaAtrRsi, Wilders_Period) * QQE

longband = 0.0
shortband = 0.0
trend = 0

DeltaFastAtrRsi = dar
RSIndex = RsiMa
newshortband = RSIndex + DeltaFastAtrRsi
newlongband = RSIndex - DeltaFastAtrRsi
longband := RSIndex[1] > longband[1] and RSIndex > longband[1] ? math.max(longband[1], newlongband) : newlongband
shortband := RSIndex[1] < shortband[1] and RSIndex < shortband[1] ? math.min(shortband[1], newshortband) : newshortband
cross_1 = ta.cross(longband[1], RSIndex)
trend := ta.cross(RSIndex, shortband[1]) ? 1 : cross_1 ? -1 : nz(trend[1], 1)
FastAtrRsiTL = trend == 1 ? longband : shortband

length1 = input.int(50, minval=1, title='Bollinger Length', group="QQE MOD")
mult = input.float(0.35, minval=0.001, maxval=5, step=0.1, title='BB Multiplier', group="QQE MOD")
basis = ta.sma(FastAtrRsiTL - 50, length1)
dev = mult * ta.stdev(FastAtrRsiTL - 50, length1)
upper = basis + dev
lower = basis - dev
color_bar = RsiMa - 50 > upper ? #00c3ff : RsiMa - 50 < lower ? #ff0062 : color.gray

QQEzlong = 0
QQEzlong := nz(QQEzlong[1])
QQEzshort = 0
QQEzshort := nz(QQEzshort[1])
QQEzlong := RSIndex >= 50 ? QQEzlong + 1 : 0
QQEzshort := RSIndex < 50 ? QQEzshort + 1 : 0

RSI_Period2 = input(6, title='RSI Length', group="QQE MOD")
SF2 = input(5, title='RSI Smoothing', group="QQE MOD")
QQE2 = input(1.61, title='Fast QQE2 Factor', group="QQE MOD")
ThreshHold2 = input(3, title='Thresh-hold', group="QQE MOD")

src2 = input(close, title='RSI Source', group="QQE MOD")

Wilders_Period2 = RSI_Period2 * 2 - 1

Rsi2 = ta.rsi(src2, RSI_Period2)
RsiMa2 = ta.ema(Rsi2, SF2)
AtrRsi2 = math.abs(RsiMa2[1] - RsiMa2)
MaAtrRsi2 = ta.ema(AtrRsi2, Wilders_Period2)
dar2 = ta.ema(MaAtrRsi2, Wilders_Period2) * QQE2
longband2 = 0.0
shortband2 = 0.0
trend2 = 0

DeltaFastAtrRsi2 = dar2
RSIndex2 = RsiMa2
newshortband2 = RSIndex2 + DeltaFastAtrRsi2
newlongband2 = RSIndex2 - DeltaFastAtrRsi2
longband2 := RSIndex2[1] > longband2[1] and RSIndex2 > longband2[1] ? math.max(longband2[1], newlongband2) : newlongband2
shortband2 := RSIndex2[1] < shortband2[1] and RSIndex2 < shortband2[1] ? math.min(shortband2[1], newshortband2) : newshortband2
cross_2 = ta.cross(longband2[1], RSIndex2)
trend2 := ta.cross(RSIndex2, shortband2[1]) ? 1 : cross_2 ? -1 : nz(trend2[1], 1)
FastAtrRsi2TL = trend2 == 1 ? longband2 : shortband2

QQE2zlong = 0
QQE2zlong := nz(QQE2zlong[1])
QQE2zshort = 0
QQE2zshort := nz(QQE2zshort[1])
QQE2zlong := RSIndex2 >= 50 ? QQE2zlong + 1 : 0
QQE2zshort := RSIndex2 < 50 ? QQE2zshort + 1 : 0

hcolor2 = RsiMa2 - 50 > ThreshHold2 ? color.silver : RsiMa2 - 50 < 0 - ThreshHold2 ? color.silver : na

Greenbar1 = RsiMa2 - 50 > ThreshHold2
Greenbar2 = RsiMa - 50 > upper

Redbar1 = RsiMa2 - 50 < 0 - ThreshHold2
Redbar2 = RsiMa - 50 < lower

//Volume Oscillator

var cumVol = 0.
cumVol += nz(volume)
if barstate.islast and cumVol == 0
    runtime.error("No volume is provided by the data vendor.")
shortlen = input.int(5, minval=1, title = "Short Length", group="Volume Oscillator")
longlen = input.int(10, minval=1, title = "Long Length", group="Volume Oscillator")
short = ta.ema(volume, shortlen)
long = ta.ema(volume, longlen)
osc = 100 * (short - long) / long

//strategy

enterLong   =  '    {  "message_type": "bot",  "bot_id": 4635591,  "email_token": "25byourtefcodeuufyd2-43314-ab98-bjorg224",  "delay_seconds": 1}  ' //start long deal
 
ExitLong    =  '    {  "message_type": "bot",  "bot_id": 4635591,  "email_token": "25byourtefcodeuufyd2-43314-ab98-bjorg224",  "delay_seconds": 0,  "action": "close_at_market_price"}  ' // close long deal market 
 
enterShort  =  '    {  "message_type": "bot",  "bot_id": 4635690,  "email_token": "25byourtefcodeuufyd2-43314-ab98-bjorg224",  "delay_seconds": 1}  ' // start short deal
 
ExitShort   =  '    {  "message_type": "bot",  "bot_id": 4635690,  "email_token": "25byourtefcodeuufyd2-43314-ab98-bjorg224",  "delay_seconds": 0,  "action": "close_at_market_price"}  ' // close short deal market

longcondition = close > MHULL and HULL > HULL[2] and osc > 0 and Greenbar1 and Greenbar2 and not Greenbar1[1] and not Greenbar2[1]
shortcondition = close < SHULL and HULL < HULL[2] and osc > 0 and Redbar1 and Redbar2 and not Redbar1[1] and not Redbar2[1]

float risk_long = na
float risk_short = na
float stopLoss = na
float takeProfit = na
float entry_price = na

risk_long := risk_long[1]
risk_short := risk_short[1]

swingHigh = ta.highest(high, swingHighV)
swingLow = ta.lowest(low, swingLowV)

if strategy.position_size == 0 and longcondition and inDateRange
    risk_long := (close - swingLow) / close
    strategy.entry("long", strategy.long, comment="Buy", alert_message=enterLong)
    
if strategy.position_size == 0 and shortcondition and inDateRange
    risk_short := (swingHigh - close) / close       
    strategy.entry("short", strategy.short, comment="Sell", alert_message=enterShort)
    
if strategy.position_size > 0

    stopLoss := strategy.position_avg_price * (1 - risk_long)
    takeProfit := strategy.position_avg_price * (1 + target_stop_ratio * risk_long)
    entry_price := strategy.position_avg_price
    strategy.exit("long exit", "long", stop = stopLoss, limit = takeProfit, alert_message=ExitLong)
    
if strategy.position_size < 0

    stopLoss := strategy.position_avg_price * (1 + risk_short)
    takeProfit := strategy.position_avg_price * (1 - target_stop_ratio * risk_short)
    entry_price := strategy.position_avg_price
    strategy.exit("short exit", "short", stop = stopLoss, limit = takeProfit, alert_message=ExitShort)

p_ep = plot(entry_price, color=color.new(color.white, 0), linewidth=2, style=plot.style_linebr, title='entry price')
p_sl = plot(stopLoss, color=color.new(color.red, 0), linewidth=2, style=plot.style_linebr, title='stopLoss')
p_tp = plot(takeProfit, color=color.new(color.green, 0), linewidth=2, style=plot.style_linebr, title='takeProfit')
fill(p_sl, p_ep, color.new(color.red, transp=85))
fill(p_tp, p_ep, color.new(color.green, transp=85))

```

> Detail

https://www.fmz.com/strategy/436605

> Last Modified

2023-12-26 11:06:12
