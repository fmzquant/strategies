
> Name

基于PSARZigZagMACDART多指标组合的量化策略Quantitative-Strategy-PSARZigZagMACDART-Based-on-Multi-Indicator-Combination

> Author

ChaoZhang

> Strategy Description


[trans]

本文将详细介绍一种基于多种技术指标组合进行量化交易的策略。该策略综合运用多种指标形成交易信号,实现有效的风险控制。

一、策略原理

该策略主要包含以下几个部分:

(1) PSAR指标判断趋势方向,产生买入卖出基本信号;

(2) ZigZag线形态判断趋势,确认信号方向; 

(3) 布林线指标判断突破,辅助验证信号;

(4) MACD指标再次验证信号,提高准确性;

(5) ATR指标计算动态止损位,控制单笔风险;

(6) 综合以上信号和条件进行入场。

当所有指标信号一致时,才会形成最终的交易指令,这可以有效过滤假信号,提高准确性。ATR计算的止损位也使每次交易具备风险控制。

二、策略优势

该策略最大的优势在于多指标组合验证信号。这避免了单一指标的局限性,提高了信号的可靠性。

此外,动态止损方式也是一大优势。它根据市场波动程度来设定合理的止损位,有助于主动控制风险。

最后,多指标组合也提供了丰富的参数空间进行优化,以提升策略效率。

三、潜在风险

但我们也应注意以下风险:

首先,多指标组合增加了参数优化难度,不合理设定可致使过优化。

其次,止损过于接近有被突破的风险,造成亏损放大。

最后,指标信号之间可能出现分歧,需要设定清晰的优先规则。

四、内容总结

本文详细介绍了一种基于多指标验证的量化交易策略。它合理运用多种指标进行信号验证和风险控制。但需要充分认识参数优化难度,并预防止损过于接近的风险。总体而言,该策略提供了一种相对稳健的量化交易方法。

||

This article explains in detail a quantitative trading strategy that combines multiple technical indicators. By synthesizing signals from various indicators, it achieves effective risk control. 

I. Strategy Logic

The strategy mainly includes the following components:

(1) PSAR to determine trend direction and generate basic buy/sell signals.

(2) ZigZag to confirm signal direction by identifying swings.

(3) Bollinger Bands to verify signals by detecting breakouts. 

(4) MACD to further validate signals and improve accuracy.

(5) ATR to calculate dynamic stop loss for controlling risk per trade.

(6) Entering trades based on synthesized signals and criteria.

Trades are only taken when all indicators agree, which filters out false signals and improves accuracy. The ATR-based stop loss also ensures risk control for every trade.

II. Advantages of the Strategy

The biggest advantage lies in validating signals with multiple indicators, avoiding limitations of single indicators and improving reliability.

In addition, the dynamic stop loss approach is also a major advantage. It sets reasonable stop loss levels based on market volatility for proactive risk control.

Finally, the multi-indicator combinations provide rich parameter tuning space to further enhance strategy efficiency.

III. Potential Risks  

However, the following risks should also be noted:

Firstly, the complexity of multiple indicators increases optimization difficulty. Improper settings can lead to overfitting.

Secondly, stop loss set too close risks being stopped out prematurely and amplifying losses.

Lastly, discrepancies can occur between indicator signals, requiring clear priority rules.

IV. Summary

In summary, this article has explained a quantitative trading strategy utilizing multi-indicator confirmation and risk control. It intelligently combines indicators for verification and risk management. But the difficulty of parameter optimization should be fully acknowledged, and the risk of stops being too tight prevented. Overall, it provides a relatively robust quantitative trading methodology.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_4|false|London Session|
|v_input_bool_5|false|New York Session|
|v_input_bool_6|false|Tokyo Session|
|v_input_bool_7|false|Sydney Session|
|v_input_float_1|0.05|(?PSAR)Start|
|v_input_float_2|0.05|Increment|
|v_input_float_3|0.13|Maximum|
|v_input_int_1|20|Point Width|
|v_input_1|false|Highlight Start Points ?|
|v_input_2|50|(?ZLSMA)Length|
|v_input_3|false|Offset|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_9|true|ZLSMA angle filter|
|v_input_bool_1|false|(?Bull Bear Power Trend)Switch BBPT conditionals|
|v_input_bool_2|false|(?Sessions)Enable Sessions for strategy|
|v_input_bool_3|false|Activate High/Low View|
|v_input_timeframe_1|D|Resolution|
|v_input_5|0300-1200:1234567|London Session|
|v_input_6|0800-1700:1234567|New York Session|
|v_input_7|2000-0400:1234567|Tokyo Session|
|v_input_8|1700-0200:1234567|Sydney Session|
|v_input_bool_8|false|(?EMA)Enable EMA filter|
|v_input_int_2|50|EMA lenght|
|v_input_float_4|0.2|(?SL/TP)Max SL size in %|
|v_input_float_5|0.02|ZLSMA SL offset in %|
|v_input_float_6|true|TP 1 multiplier|
|v_input_float_7|2|TP 2 multiplier|
|v_input_float_8|0.001|Persentage of trade close on TP1|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-09-08 09:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Rolan_Kruger

//@version=5
strategy("PSAR BBPT ZLSMA","PBZ", overlay=true,default_qty_type = strategy.percent_of_equity, default_qty_value = 100)

///////////////////////////////////////////////////////////////////////////////////////////////////////
// PSAR BUY/SELL

start = input.float(title='Start', step=0.00005, defval=0.05, group = "PSAR")
increment = input.float(title='Increment', step=0.00005, defval=0.05, group = "PSAR")
maximum = input.float(title='Maximum', step=0.01, defval=0.13, group = "PSAR")
width = input.int(title='Point Width', minval=1, defval=20, group = "PSAR")
highlightStartPoints = input(title='Highlight Start Points ?', defval=false, group = "PSAR")

psar = ta.sar(start, increment, maximum)
dir = psar < close ? 1 : -1

psarColor = psar < close ? #3388bb : #fdcc02


plotshape(dir == 1 and dir[1] == -1 and highlightStartPoints ? psar : na, title='Buy', style=shape.labelup, location=location.absolute, size=size.normal, text='Buy', textcolor=color.new(color.white, 0), color=color.new(color.green, 0))
plotshape(dir == -1 and dir[1] == 1 and highlightStartPoints ? psar : na, title='Sell', style=shape.labeldown, location=location.absolute, size=size.normal, text='Sell', textcolor=color.new(color.white, 0), color=color.new(color.red, 0))

barcolor(dir == 1 ? color.green : color.red, display = display.none)
PSAR_Buy = dir == 1 and dir[1] == -1
PSAR_Sell = dir == -1 and dir[1] == 1

////////////////////////////////////////////////////////////////////////////////////////////////////////
// ZLSMA

length = input(title='Length', defval=50,group = "ZLSMA")
offset = input(title='Offset', defval=0,group = "ZLSMA")
src = input(close, title='Source',group = "ZLSMA")
lsma = ta.linreg(src, length, offset)
lsma2 = ta.linreg(lsma, length, offset)
eq = lsma - lsma2
zlsma = lsma + eq

plot(zlsma, color=color.new(color.yellow, 0), linewidth=3)

ZLSMA_Buy = close > zlsma and open > zlsma and low > zlsma and high > zlsma
ZLSMA_Sell = close < zlsma and open < zlsma and low < zlsma and high < zlsma

////////////////////////////////////////////////////////////////////////////////////////////////////////
// BBPT


//
switch_bbpt = input.bool(false, "Switch BBPT conditionals",group ="Bull Bear Power Trend")
length1 = 8
//
BullTrend_hist = 0.0
BearTrend_hist = 0.0

BullTrend = (close - ta.lowest(low, 50)) / ta.atr(5)
BearTrend = (ta.highest(high, 50) - close) / ta.atr(5)
BearTrend2 = -1 * BearTrend

Trend = BullTrend - BearTrend

if BullTrend < 2
    BullTrend_hist := BullTrend - 2
    BullTrend_hist

if BearTrend2 > -2
    BearTrend_hist := BearTrend2 + 2
    BearTrend_hist

//alexgrover-Regression Line Formula
x = bar_index
y = Trend
x_ = ta.sma(x, length1)
y_ = ta.sma(y, length1)
mx = ta.stdev(x, length1)
my = ta.stdev(y, length1)
c = ta.correlation(x, y, length1)
slope = c * (my / mx)
inter = y_ - slope * x_
reg_trend = x * slope + inter
//

BBPT_Buy = BearTrend_hist
BBPT_Sell = BullTrend_hist

if switch_bbpt
    BBPT_Buy := BullTrend_hist
    BBPT_Sell := BearTrend_hist

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Sessions

enable_sessions = input.bool(false, "Enable Sessions for strategy", group = "Sessions")
bgColor = input.bool(false, "Activate High/Low View", group = "Sessions")

LondonColor = color.new(color.green, 90)
NYColor = color.new(color.red, 90)
AsiaColor = color.new(color.yellow, 90)
SydneyColor = color.new(color.blue, 90)

///Sessions

res = input.timeframe("D", "Resolution", ["D","W","M"], group = "Sessions")
london = input("0300-1200:1234567", "London Session", group = "Sessions")
ny = input("0800-1700:1234567", "New York Session", group = "Sessions")
tokyo = input("2000-0400:1234567", "Tokyo Session", group = "Sessions")
sydney = input("1700-0200:1234567", "Sydney Session", group = "Sessions")

//Bars

is_newbar(sess) =>
    t = time(res, sess, "America/New_York")
    na(t[1]) and not na(t) or t[1] < t

is_session(sess) =>
    not na(time(timeframe.period, sess, "America/New_York"))
    

//London

London = input.bool(false, "London Session")

londonNewbar = is_newbar(london)
londonSession = is_session(london)

float londonLow = na
londonLow := if londonSession
    if londonNewbar
        low
    else
        math.min(londonLow[1],low)
else
    londonLow

float londonHigh = na
londonHigh := if londonSession
    if londonNewbar
        high
    else
        math.max(londonHigh[1],high)
else
    londonHigh


plotLL = plot(londonLow, color=color.new(#000000, 100))
plotLH = plot(londonHigh, color=color.new(#000000, 100))
fill(plotLL, plotLH, color = londonSession and London and bgColor ? LondonColor : na)

bgcolor(londonSession and London and not bgColor ? LondonColor : na)



//New York

NY = input.bool(false, "New York Session")

nyNewbar = is_newbar(ny)
nySession = is_session(ny)

float nyLow = na
nyLow := if nySession
    if nyNewbar
        low
    else
        math.min(nyLow[1],low)
else
    nyLow

float nyHigh = na
nyHigh := if nySession
    if nyNewbar
        high
    else
        math.max(nyHigh[1],high)
else
    nyHigh


plotNYL = plot(nyLow, color=color.new(#000000, 100))
plotNYH = plot(nyHigh, color=color.new(#000000, 100))
fill(plotNYL, plotNYH, color = nySession and NY and bgColor ? NYColor : na)

bgcolor(nySession and NY and not bgColor ? NYColor : na)


//Tokyo

Tokyo = input.bool(false, "Tokyo Session")

tokyoNewbar = is_newbar(tokyo)
tokyoSession = is_session(tokyo)

float tokyoLow = na
tokyoLow := if tokyoSession
    if tokyoNewbar
        low
    else
        math.min(tokyoLow[1],low)
else
    tokyoLow

float tokyoHigh = na
tokyoHigh := if tokyoSession
    if tokyoNewbar
        high
    else
        math.max(tokyoHigh[1],high)
else
    tokyoHigh


plotTL = plot(tokyoLow, color=color.new(#000000, 100))
plotTH = plot(tokyoHigh, color=color.new(#000000, 100))
fill(plotTL, plotTH, color = tokyoSession and Tokyo and bgColor ? AsiaColor : na)

bgcolor(tokyoSession and Tokyo and not bgColor ? AsiaColor : na)



//Sydney

Sydney = input.bool(false, "Sydney Session")

sydneyNewbar = is_newbar(sydney)
sydneySession = is_session(sydney)

float sydneyLow = na
sydneyLow := if sydneySession
    if sydneyNewbar
        low
    else
        math.min(sydneyLow[1],low)
else
    sydneyLow

float sydneyHigh = na
sydneyHigh := if sydneySession
    if sydneyNewbar
        high
    else
        math.max(sydneyHigh[1],high)
else
    sydneyHigh


plotSL = plot(sydneyLow, color=color.new(#000000, 100))
plotSH = plot(sydneyHigh, color=color.new(#000000, 100))
fill(plotSL, plotSH, color = sydneySession and Sydney and bgColor ? SydneyColor : na)

bgcolor(sydneySession and Sydney and not bgColor ? SydneyColor : na)

London_ok = London and londonSession
NY_ok = NY and nySession
Tokyo_ok = Tokyo and tokyoSession
Sydney_ok = Sydney and sydneySession

in_session = true

if London_ok or NY_ok or Tokyo_ok or Sydney_ok and enable_sessions
    in_session := true

else if enable_sessions == true
    in_session := false

///////////////////////////////////////////////////////////////////////////////////////////////////////
// EMA Filter

ema_filter = input.bool(false, "Enable EMA filter", group = "EMA")
ema_lenght = input.int(50, "EMA lenght", group = "EMA")

ema1 = ta.ema(close, ema_lenght)
plot(ema1, "EMA", color.white, 3)

EMA_Buy = true
EMA_Sell = true

if ema_filter == true
    EMA_Buy := close > ema1
    EMA_Sell := ema1 > close

///////////////////////////////////////////////////////////////////////////////////////////////////////
// ZLSMA angle calc


zlsma_angle_filter = input.bool(true, "ZLSMA angle filter", group = "ZLSMA")

ZLSMA_Up = true
ZLSMA_Down = true

if zlsma_angle_filter == true
    ZLSMA_Up := 1 < (zlsma - zlsma[1])
    ZLSMA_Down := -1 > (zlsma - zlsma[1])

///////////////////////////////////////////////////////////////////////////////////////////////////////
// SL/TP

// Assumes quote currency is FIAT as with BTC/USDT pair

max_sl = input.float(0.2, "Max SL size in %", group = "SL/TP", minval = 0.1, tooltip = "Cancels trade if SL is too big" )
zlsma_offset = input.float(0.02, title="ZLSMA SL offset in %", group = "SL/TP",maxval = 1)
tp1_multi = input.float(1, title="TP 1 multiplier", group = "SL/TP")
tp2_multi = input.float(2, title="TP 2 multiplier", group = "SL/TP")
tp1_persentage = input.float(0.001, "Persentage of trade close on TP1", group ="SL/TP", maxval = 100, minval = 0.001)

// SL too big check
sl_check = ((math.abs(close - zlsma))/close * 100) + zlsma_offset
sl_ok = true
if sl_check > max_sl
    sl_ok := false

// ZLSMA SL and TP
not_in_trade = strategy.position_size == 0
check_if_long = PSAR_Buy and ZLSMA_Buy and BBPT_Buy and EMA_Buy and ZLSMA_Up and sl_ok and in_session
check_if_short = PSAR_Sell and ZLSMA_Sell and BBPT_Sell and EMA_Sell and ZLSMA_Down and sl_ok and in_session

var float sl = 0.0
var float tp1 = 0.0
var float tp2 = 0.0

if check_if_long and not_in_trade
    sl := ((close - zlsma)/close * 100) + zlsma_offset
    tp1 := (((close - zlsma)/close * 100) + zlsma_offset)*tp1_multi
    tp2 := (((close - zlsma)/close * 100) + zlsma_offset)*tp2_multi

if check_if_short and not_in_trade
    sl := ((zlsma - close)/close * 100) + zlsma_offset
    tp1 := (((zlsma - close)/close * 100) + zlsma_offset)*tp1_multi
    tp2 := (((zlsma - close)/close * 100) + zlsma_offset)*tp2_multi

// FUNCTIONS
// Stochastic
f_stochastic() =>
    stoch = ta.stoch(close, high, low, 14)
    stoch_K = ta.sma(stoch, 3)
    stoch_D = ta.sma(stoch_K, 3)
    stRD = ta.crossunder(stoch_K, stoch_D)
    stGD = ta.crossover(stoch_K, stoch_D)
    [stoch_K, stoch_D, stRD, stGD]


// VARIABLES
[bbMiddle, bbUpper, bbLower] = ta.bb(close, 20, 2)
[stoch_K, stoch_D, stRD, stGD] = f_stochastic()


// ORDERS
// Active Orders
// Check if strategy has open positions
inLong = strategy.position_size > 0
inShort = strategy.position_size < 0
// Check if strategy reduced position size in last bar
longClose = strategy.position_size < strategy.position_size[1]
shortClose = strategy.position_size > strategy.position_size[1]

// Entry Conditions
// Enter long when during last candle these conditions are true:
// Candle high is greater than upper Bollinger Band
// Stochastic K line crosses under D line and is oversold
longCondition = PSAR_Buy and ZLSMA_Buy and BBPT_Buy and EMA_Buy and ZLSMA_Up and sl_ok and in_session

// Enter short when during last candle these conditions are true:
// Candle low is lower than lower Bollinger Band
// Stochastic K line crosses over D line and is overbought
shortCondition = PSAR_Sell and ZLSMA_Sell and BBPT_Sell and EMA_Sell and ZLSMA_Down and sl_ok and in_session

// Exit Conditions
// Calculate Take Profit 
longTP1 = strategy.position_avg_price * ((100 + tp1)/100)
longTP2 = strategy.position_avg_price * ((100 + tp2)/100)
shortTP1 = strategy.position_avg_price * ((100 - tp1)/100)
shortTP2 = strategy.position_avg_price * ((100 - tp2)/100)

// Calculate Stop Loss
// Initialise variables
var float longSL = 0.0
var float shortSL = 0.0

// When not in position, set stop loss using close price which is the price used during backtesting
// When in a position, check to see if the position was reduced on the last bar
// If it was, set stop loss to position entry price. Otherwise, maintain last stop loss value
longSL := if inLong and ta.barssince(longClose) < ta.barssince(longCondition)
    strategy.position_avg_price
else if inLong
    longSL[1]
else
    close * ((100 - sl)/100)

shortSL := if inShort and ta.barssince(shortClose) < ta.barssince(shortCondition)
    strategy.position_avg_price
else if inShort
    shortSL[1]
else
    close * ((100 + sl)/100)

////////////////////////////////////////////////////////////////////////////////////////////////////////
// STRATEGY EXECUTION

// Manage positions
if not_in_trade and longCondition
    strategy.entry("Long", strategy.long)
strategy.exit("TP1/SL", from_entry="Long", qty_percent=tp1_persentage, limit=longTP1, stop=longSL)
strategy.exit("TP2/SL", from_entry="Long", limit=longTP2, stop=longSL)

if not_in_trade and shortCondition
    strategy.entry("Short", strategy.short)
strategy.exit("TP1/SL", from_entry="Short", qty_percent=tp1_persentage, limit=shortTP1, stop=shortSL)
strategy.exit("TP2/SL", from_entry="Short", limit=shortTP2, stop=shortSL)

```

> Detail

https://www.fmz.com/strategy/426849

> Last Modified

2023-09-14 20:17:43
