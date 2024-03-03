
> Name

动量突破短线交易策略Momentum-Breakout-Intraday-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/fba296ac068d4a9731.png)
[trans]
## 概述

该策略通过跟踪SPY交易数据,结合移动平均线、MACD、RSI等多种技术指标信号,精准判断短期走势并做出买入卖出决策,以实现短线交易盈利。

## 策略原理   

该策略的核心逻辑基于以下技术指标判断短期趋势和入场时机:   

1. 5日和13日指数移动平均线(EMA)的金叉和死叉用于判断多空趋势的转折。   
2. MACD指标判断是否存在向上的动量。   
3. ADX指标判断是否存在趋势。   
4. RSI指标判断趋势的力度。   

通过优化以上指标参数,判断关键的多空转折点。满足5/6个条件时展示白色信号提示L或S,当完整满足六个条件时,在该蜡烛图收盘时展示金色△形状信号。  

形成买入信号的条件:   
5日EMA多于13日EMA 且 MACD线低于0.5 且 ADX高于20 且 MACD斜率大于0 且 信号线高于-0.1 且 RSI高于40  

形成卖出信号条件:  
5日EMA少于13日EMA 且 MACD线高于-0.5 且 ADX高于20 且 信号线低于0 且 MACD斜率小于0 且 RSI低于60  

## 优势分析  

该策略具有以下优势:  

1. 结合多种指标信号,判断准确性较高。  
2. 通过参数优化,判断的敏感度和准确性达到平衡。  
3. 信号判断简洁清晰,操作门槛低。  
4. 适用于短线交易,符合大部分投资者的风险偏好。  
5. 考虑实盘操作需求,避开尾盘时间的高波动。

## 风险分析  

该策略也存在以下风险:  

1. 参数设置不当可能导致误判风险。需持续测试与优化。  
2. 单一品种,无法分散行业和资产配置风险。  
3. 频繁交易带来的交易费用和滑点风险。  
4. 尾盘时间无法建仓可能错过部分机会。

## 优化方向  

可从以下维度继续优化该策略:  

1. 测试修改参数设置,提高判断准确率。  
2. 增加止损指标以控制单笔损失。 
3. 优化开仓时间,过滤尾盘高波动时段。  
4. 增加其他品种作为策略对象。
5. 结合机器学习算法提高参数自适应能力。

## 总结  

本策略通过跟踪SPY数据,结合移动平均线、MACD、RSI等多种技术指标判断短期趋势,操作频率高、回撤低,非常适合短线交易。可从多个维度继续优化,具有较大的改进空间。

|| 

## Overview  

This strategy tracks SPY trading data and makes buy and sell decisions to realize intraday trading profits through a combination of technical indicators such as moving averages, MACD, RSI to accurately determine short-term trends.

## Strategy Logic  

The core logic of this strategy is based on the following technical indicators to determine short-term trends and entry points:  

1. The golden cross and death cross of the 5-day and 13-day exponential moving averages (EMA) are used to determine the turning point of bullish and bearish trends.  
2. The MACD indicator is used to determine if there is upward momentum. 
3. The ADX indicator is used to determine if a trend exists.  
4. The RSI indicator is used to determine the strength of the trend.  

By optimizing the parameters of the above indicators, key reversal points of bullish and bearish trends can be determined. When 5 out of 6 conditions are met, white L or S signals are displayed. When all six conditions are fully met, gold △ shapes are displayed on the candlestick bar close.  

Long entry signal conditions:  
5-day EMA greater than 13-day EMA AND MACD line less than 0.5 AND ADX greater than 20 AND MACD slope greater than 0 AND signal line greater than -0.1 AND RSI greater than 40  

Short entry signal conditions:   
5-day EMA less than 13-day EMA AND MACD line greater than -0.5 AND ADX greater than 20 AND signal line less than 0 AND MACD slope less than 0 AND RSI less than 60

## Advantage Analysis   

The advantages of this strategy include:  

1. Higher accuracy from combining multiple indicator signals.   
2. Balanced sensitivity and accuracy through parameter optimization.  
3. Simple and clear signals, low barrier to operation.  
4. Suitable for intraday trading, matches most investors' risk appetite. 
5. Avoids high volatility in late trading by not placing orders.

## Risk Analysis   

The risks of this strategy include:  

1. Incorrect judgments from improper parameter settings. Continuous testing and optimization needed.  
2. Single asset, unable to diversify industry and asset allocation risks.   
3. Frequent trading leads to transaction fee and slippage risks.  
4. Missing some opportunities by not trading in late trading sessions.  

## Optimization Directions   

The strategy can be further optimized in the following aspects:  

1. Test modifying parameter settings to improve judgment accuracy.   
2. Add stop loss indicators to control single loss.  
3. Optimize order placing time to filter out high volatility periods. 
4. Add other products as strategy targets.  
5. Incorporate machine learning algorithms to improve parameter self-adaptiveness.  

## Conclusion  

This strategy determines short-term trends by tracking SPY data and combining multiple technical indicators such as moving averages, MACD and RSI. With high operation frequency, low drawdowns, it is very suitable for intraday trading. There is still large room for improvement through optimizations from multiple dimensions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|12|Fast Length|
|v_input_int_2|26|Slow Length|
|v_input_int_3|9|Signal Smoothing|
|v_input_int_4|14|Length|
|v_input_int_5|3|SmoothK|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|80|Overbought|
|v_input_float_2|20|Oversold|
|v_input_int_6|14|ATR Length|
|v_input_int_7|14|len|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-24 00:00:00
end: 2024-01-31 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="SPY 1 Minute Day Trader", overlay=true)

//This script has been created to take into account how the following variables impact trend for SPY 1 Minute
//The SPY stop losses/take profit have been set at 30 cents which equates to 15 cents on SPY 1 DTE ATM contracts
//5 ema vs 13 ema : A cross establishes start of trend
//MACD (Line, Signal & Slope) : If you have momentum
//ADX : if you are trending
//RSI : If the trend has strength
//The above has been optimized to determine pivot points in the trend using key values for these 6 indicators
//bounce up = ema5 > ema13 and macdLine < .5 and adx > 20 and macdSlope > 0 and signalLine > -.1 and rsiSignal > 40
//bounce down = ema5 < ema13 and macdLine > -.5 and adx > 20 and signalLine < 0 and macdSlope < 0 and rsiSignal < 60
//White L's indicate that 5 of 6 conditions are met due to impending uptrend w/ missing one in green below it
//Yellow L's indicate that 6 of 6 conditions still are met
//White S's indicate that 5 of 6 conditions are met due to impending downtrend w/ missing condition in red above it
//Yellow S's indicate that 6 of 6 conditions still are met
//After a downtrend or uptrend is established, once it closes it can't repeat for 10 minutes
//Won't open any trades on last two minutes of any hours to avoid volatility
//Will close any open trades going into last minute of hour

// Initialize variables
var float long_entry_price = na
var float short_entry_price = na
var float stop_loss = na
var float take_profit = na
var float short_stop_loss = na
var float short_take_profit = na
var float option_SL = 0.3 //approx 15 cents on SPY 1 DTE
var float option_TP = 0.3 //approx 15 cents on SPY 1 DTE
var long_entry_time = 0
var short_entry_time = 0
var allow_long_entry = true
var allow_short_entry = true
var allow_trades = true
var hourlyclose = 0
var notify = 0
var shortnotify = 0

// Calculate the EMAs & SMAs
ema5 = ta.ema(close, 5)
ema13 = ta.ema(close, 13)
sma20 = ta.sma(close, 20)

// Input parameters
fastLength = input.int(12, minval=1, title="Fast Length")
slowLength = input.int(26, minval=1, title="Slow Length")
signalLength = input.int(9, minval=1, title="Signal Smoothing")

// Inputs
length = input.int(14, "Length")
smoothK = input.int(3, "SmoothK")
src = input(close, "Source")
overbought = input.float(80, "Overbought")
oversold = input.float(20, "Oversold")

//Stochastic Calculation
highestHigh = ta.highest(src, length)
lowestLow = ta.lowest(src, length)
k = 100 * ((src - lowestLow) / (highestHigh - lowestLow))
d = ta.sma(k, smoothK)

// Calculate MACD
[macdLines, signalLines, _] = ta.macd(close, fastLength, slowLength, signalLength)

// Calculate slope of MACD line
macdSlope = (macdLines - macdLines[1]) / (bar_index - bar_index[1])

// Calculate the RSI
rsiValue = ta.rsi(close, 5)

// Calculate the signal line as the SMA of the RSI for 5 minute over 9 periods
rsiSignal = ta.sma(rsiValue, 9)

// Calculate MACD
[macdLine, signalLine, _] = ta.macd(close, 12, 26, 9)

// Length of the ATR
atr_length = input.int(14, title="ATR Length", minval=1)

// Calculate the True Range
tr = ta.tr(true)

// Calculate the ATR
atr = ta.atr(atr_length)

// Length of the ADX
len = input.int(14, minval=1)

// Set minimum number of bars between trades
min_bars_between_trades = 10

// Calculate the Directional Movement
up = ta.change(high)
down = -ta.change(low)
plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)

// Calculate the Smoothed Directional Movement
plusDI = 100 * ta.ema(plusDM, len) / ta.ema(tr, len)
minusDI = 100 * ta.ema(minusDM, len) / ta.ema(tr, len)

// Calculate the Directional Index (DX)
DX = 100 * math.abs(plusDI - minusDI) / (plusDI + minusDI)

// Calculate the ADX
adx = ta.ema(DX, len)

// Get high, low, and close prices
highPrice = high
lowPrice = low
closePrice = close

// Determine buy and sell signals - Tried to optimize as much as possible - changing these do impact results
buy_signal = ema5 > ema13 and macdLine < .5 and adx > 20 and macdSlope > 0 and signalLine > -.1 and rsiSignal > 40
short_buy_signal = ema5 < ema13 and macdLine > -.5 and adx > 20 and signalLine < 0 and macdSlope < 0 and rsiSignal < 60

// Define long entry conditions
C1 = ema5 > ema13 ? 1 : 0 //E below bar when only one missing
C2 = d < 70 ? 1 : 0 //no longer part of signal - but was Smoothed Stoicastic
C3 = macdLine < .5 ? 1 : 0 //M below bar when only one missing
C4 = adx > 20 ? 1 : 0 //A below bar when only one missing
C5 = macdSlope > 0 ? 1 : 0 //% below bar when only one missing
C6 = signalLine > -.01 ? 1 : 0 //S (MACD Signal) below bar when only one missing
C7 = rsiSignal > 50 ? 1 : 0 //R below bar when only one missing

// Define short entry conditions
C8 = ema5 < ema13 ? 1 : 0 //E above bar when only one missing
C9 = d > 40 ? 1 : 0 //no longer part of signal - but was Smoothed Stoicastic
C10 = macdLine > -0.5 ? 1 : 0 //M above bar when only one missing
C11 = adx > 20 ? 1 : 0 //A above bar when only one missing
C12 = macdSlope < 0 ? 1 : 0 //% above bar when only one missing
C13 = signalLine < 0 ? 1 : 0 //S (MACD Signal) above bar when only one missing
C14 = rsiSignal < 50 ? 1 : 0 //R above bar when only one missing

// Long or Short Incoming denoted by white color and gold means all conditions met
plotchar((C1 + C3 + C4 + C5 + C6 + C7) == 5 ? 1 : na, title="Pivot Up White", char="L", location=location.belowbar, color=color.white, size = size.tiny)
plotchar((C8 + C10 + C11 + C12 + C13 + C14) == 5 ? 1 : na, title="Pivot Down White", char="S", location=location.abovebar, color=color.white, size = size.tiny)
plotchar((C1 + C3 + C4 + C5 + C6 + C7) > 5 ? 1 : na, title="Pivot Up Gold", char="L", location=location.belowbar, color=color.yellow, size = size.tiny)
plotchar((C8 + C10 + C11 + C12 + C13 + C14) > 5 ? 1 : na, title="Pivot Down Gold", char="S", location=location.abovebar, color=color.yellow, size = size.tiny)
plotchar((C1 + C3 + C4 + C5 + C6 + C7) >= 5 and (C1) != 1 ? 1 : na, title="Missing", char = "", text="E", location=location.belowbar, color=color.green, size = size.small)
plotchar((C1 + C3 + C4 + C5 + C6 + C7) >= 5 and (C3) != 1 ? 1 : na, title="Missing", char = "", text="M", location=location.belowbar, color=color.green, size = size.small)
plotchar((C1 + C3 + C4 + C5 + C6 + C7) >= 5 and (C4) != 1 ? 1 : na, title="Missing", char = "", text="A", location=location.belowbar, color=color.green, size = size.small)
plotchar((C1 + C3 + C4 + C5 + C6 + C7) >= 5 and (C5) != 1 ? 1 : na, title="Missing", char = "", text="%", location=location.belowbar, color=color.green, size = size.small)
plotchar((C1 + C3 + C4 + C5 + C6 + C7) >= 5 and (C6) != 1 ? 1 : na, title="Missing", char = "", text="S", location=location.belowbar, color=color.green, size = size.small)
plotchar((C1 + C3 + C4 + C5 + C6 + C7) >= 5 and (C7) != 1 ? 1 : na, title="Missing", char = "", text="R", location=location.belowbar, color=color.green, size = size.small)
plotchar((C8 + C10 + C11 + C12 + C13 + C14) >= 5 and (C8) != 1 ? 1 : na, title="Missing", char = "", text="E", location=location.abovebar, color=color.red, size = size.small)
plotchar((C8 + C10 + C11 + C12 + C13 + C14) >= 5 and (C10) != 1 ? 1 : na, title="Missing", char = "", text="M", location=location.abovebar, color=color.red, size = size.small)
plotchar((C8 + C10 + C11 + C12 + C13 + C14) >= 5 and (C11) != 1 ? 1 : na, title="Missing", char = "", text="A", location=location.abovebar, color=color.red, size = size.small)
plotchar((C8 + C10 + C11 + C12 + C13 + C14) >= 5 and (C12) != 1 ? 1 : na, title="Missing", char = "", text="%", location=location.abovebar, color=color.red, size = size.small)
plotchar((C8 + C10 + C11 + C12 + C13 + C14) >= 5 and (C13) != 1 ? 1 : na, title="Missing", char = "", text="S", location=location.abovebar, color=color.red, size = size.small)
plotchar((C8 + C10 + C11 + C12 + C13 + C14) >= 5 and (C14) != 1 ? 1 : na, title="Missing", char = "", text="R", location=location.abovebar, color=color.red, size = size.small)

// Execute buy and sell orders
if buy_signal and allow_trades and allow_long_entry  //Don't buy on last 2 minutes of hour
    long_entry_price := open
    strategy.entry("Pivot Up", strategy.long)
    stop_loss := long_entry_price - option_SL
    take_profit := long_entry_price + option_TP
    long_entry_time := time
    allow_long_entry := false
    allow_trades := false
    notify := 1
plotshape(notify == 1 ? 1 : na, "Pivot Up", style=shape.triangleup, offset = 1, location=location.belowbar, size=size.normal, textcolor = color.orange, color=color.orange)
if notify == 1
    notify := notify - 1

if short_buy_signal and allow_trades and allow_short_entry  //Don't buy on last 2 minutes of hour
    short_entry_price := open
    strategy.entry("Pivot Down", strategy.short)
    short_stop_loss := short_entry_price + option_SL
    short_take_profit := short_entry_price - option_TP
    short_entry_time := time
    allow_short_entry := false
    allow_trades := false
    shortnotify := 1
plotshape(shortnotify == 1 ? 1 : na, "Pivot Down", style=shape.triangledown, offset = 1, location=location.abovebar, size=size.normal, textcolor = color.orange, color=color.orange)
if shortnotify == 1
    shortnotify := shortnotify - 1

// Take scalp when in a position and 5 or more parameters are met!
if strategy.position_size != 0 and (C1 + C3 + C4 + C5 + C6 + C7) >5
    strategy.exit("Exit Longs", "Pivot Up", stop=stop_loss, limit = take_profit)
else if strategy.position_size != 0 and (C8 + C10 + C11 + C12 + C13 + C14) >5
    strategy.exit("Exit Shorts", "Pivot Down", stop=short_stop_loss, limit = short_take_profit)

// Reset allow_trades after cool-down period of min_bars_between_trades bars set above
if time > long_entry_time + (time - time[1]) * min_bars_between_trades
    allow_long_entry := true
    allow_trades := true

if time > short_entry_time + (time - time[1]) * min_bars_between_trades
    allow_short_entry := true
    allow_trades := true

// Close all positions at the end of the trading day and when volatile hours approach!
if  strategy.position_size != 0
    strategy.close("Pivot Up")
    strategy.close("Pivot Down")
    hourlyclose := 1
plotshape(hourlyclose == 1 ? 1 : na, "Suggested Volatile Hour Close", text="Suggested Volatile Hour Close", offset = 1, style=shape.triangledown, location=location.abovebar, size=size.tiny, textcolor = color.orange, color=color.orange)
if hourlyclose == 1
    hourlyclose := hourlyclose - 1
```

> Detail

https://www.fmz.com/strategy/440680

> Last Modified

2024-02-01 10:32:21
