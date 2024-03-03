
> Name

Multi-Indicator-Golden-Swing-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
多指标黄金摆动交易策略

该交易策略综合运用RSI、Stochastic、布林带和SuperTrend等多种指标,形成交易信号。

具体来说,它同时考虑RSI高于50表示多头市场和Stochastic中的K值高于D值为多头信号。价格低于SuperTrend代表处于上升趋势,并且SuperTrend位于布林带中轨之下才产生做多信号。

反之,RSI低于50和Stochastic中的K值低于D值为空头信号,价格高于SuperTrend代表下降趋势,并且SuperTrend高于布林带中轨才形成做空信号。

这样多指标组合可以形成有效的过滤机制,提高交易信号的可靠性。此外,Strategy还设置了止损和止盈条件来控制风险。

但是,多指标组合也存在指标滞后的问题,可能错过最佳入场点位。实盘中仍需优化参数,并关注整体经济环境对交易的影响。只有做到全面风险管理,才能长期获得稳定收益。

||

This trading strategy combines multiple indicators including RSI, Stochastic, Bollinger Bands and SuperTrend to generate trading signals.

Specifically, it considers RSI above 50 and Stochastic K value above D as bullish signals. Price below SuperTrend represents an uptrend, and SuperTrend below BB middle band forms the long signal.

Conversely, RSI below 50 and Stochastic K below D gives bearish signals. Price above SuperTrend shows a downtrend, and SuperTrend above BB middle band creates the short signal.

The multi-indicator combo serves as an effective filter to improve signal reliability. The strategy also sets stop loss and take profit conditions to control risk.

However, combining indicators also introduces lag, potentially missing optimal entries. Live tuning of parameters is still required, along with monitoring overall economic impacts. Comprehensive risk management is crucial for long-term steady profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|20|RSI Length|
|v_input_int_2|55|Stoch %K Length|
|v_input_int_3|34|Stoch %K Smoothing|
|v_input_int_4|21|Stoch %D Smoothing|
|v_input_2|5|ATR Length|
|v_input_3|10|SuperTrend ATR Length|
|v_input_float_1|2|SuperTrend Multiplier|
|v_input_int_5|20|BB Length|
|v_input_4_close|0|BB Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_2|2|BB Std Dev|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-03-10 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © rajm14

//@version=5
strategy(title = "Golden Swing Strategy - Souradeep Dey", shorttitle = "GSS", overlay = true, process_orders_on_close = true, default_qty_type = strategy.cash, default_qty_value=100000, currency = currency.USD)

// Indicator - RSI - 20
rsiSrc = input(defval = close, title = "RSI Source")
rsiLen = input.int(defval = 20, title = "RSI Length", minval = 0, maxval = 200, step = 1)
rsi = ta.rsi(rsiSrc, rsiLen)
//plot(rsi)

// Indicator - Stochastic (55,34,21)
kLength = input.int(defval = 55, title="Stoch %K Length", minval=1)
kSmooth = input.int(defval = 34, title="Stoch %K Smoothing", minval=1)
dLength = input.int(defval = 21, title="Stoch %D Smoothing", minval=1)
kLine = ta.sma(ta.stoch(close, high, low, kLength), kSmooth)
dLine = ta.sma(kLine, dLength)
// plot(kLine, color=color.red)
// plot(dLine, color=color.green)

// Indicator - ATR(5)
atrLength = input(5, "ATR Length")
atr = ta.atr(5)
// plot(atr)

// Indicator - SuperTrend(10,2)
atrPeriod = input(10, "SuperTrend ATR Length")
stSrc = hl2
stfactor = input.float(2.0, "SuperTrend Multiplier", step = 0.1)
stAtr = ta.atr(atrPeriod)
[supertrend, direction] = ta.supertrend(stfactor, atrPeriod)
bodyMiddle = (open + close) / 2
upTrend = direction < 0 ? supertrend : na
downTrend = direction < 0? na : supertrend
// plot(bodyMiddle, display=display.none)
// plot(upTrend)
// plot(downTrend)


// Indicator - Bollinger Bands (20,2)
bblength = input.int(defval = 20, title = "BB Length")
bbsource = input(defval = close, title = "BB Source")
bbStdDev = input.float(defval = 2.0, title = "BB Std Dev", step = 0.1)
bbmultiplier = bbStdDev * ta.stdev(bbsource, bblength)
bbMband = ta.sma(bbsource, bblength)
bbUband = bbMband + bbmultiplier
bbLband = bbMband - bbmultiplier
// plot (bbUband, color = color.red, linewidth = 2)
// plot (bbMband, color = color.black, linewidth = 2)
// plot (bbLband, color = color.green, linewidth = 2)

// Trade Entry

LongEntry = rsi >= 50 and kLine > dLine and low < supertrend and direction < 0 and supertrend < bbMband
ShortEntry = rsi <= 50 and kLine < dLine and high > supertrend and direction > 0 and supertrend > bbMband
plotshape(LongEntry, style = shape.triangleup,  text = "Long", location = location.belowbar, size = size.large, color = color.green)
plotshape(ShortEntry, style = shape.triangledown,  text = "Short", location = location.abovebar, size = size.large, color = color.red)

//Trade execution
if LongEntry
    strategy.entry(id = "Buy", direction = strategy.long, limit = close * .5 * atr)

closelong = close >= strategy.position_avg_price * 2.2 * atr
stoplong = close <=  strategy.position_avg_price * 1.1 * atr

if closelong
    strategy.close(id = "Buy")
    
if stoplong
    strategy.close(id = "Buy")
    
if ShortEntry
    strategy.entry(id = "Sell", direction = strategy.long, limit = close * .5 * atr)

closeshort = close <= strategy.position_avg_price * 2.2 * atr
stopshort = close >=  strategy.position_avg_price * 1.1 * atr

if closeshort
    strategy.close(id = "Sell")
    
if stopshort
    strategy.close(id = "Sell")


```

> Detail

https://www.fmz.com/strategy/426366

> Last Modified

2023-09-11 15:18:08
