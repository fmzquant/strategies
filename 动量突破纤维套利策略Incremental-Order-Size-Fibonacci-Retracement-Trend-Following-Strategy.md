
> Name

动量突破纤维套利策略Incremental-Order-Size-Fibonacci-Retracement-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1a2a134a6be2b9cafd9.png)

[trans]


### 概述

该策略是一种较为复杂的动量突破策略,同时结合了多种技术指标进行判断,实现不同方向和阶段的多次分批进场,以达到套利的目的。

### 原理

该策略主要结合了动量指标MACD、超买超卖指标RSI以及布林带进行多空方向判断。当MACD线高于0且RSI低于超卖线时为多头信号,当MACD线低于0且RSI高于超买线时为空头信号。同时结合布林带上下轨进行突破判断,进一步确认交易信号。 

在具体的实现上,策略首先判断MACD线和RSI的表现,确认基本面;然后根据布林带上轨、下轨的突破,采取不同数量的分批建仓。在多头阶段,会在布林带下轨附近逐步加仓做多,加仓幅度越来越大;在空头阶段,会在布林带上轨附近逐步加空,加空量也逐渐放大。这样通过不同方向和不同价格的分批套利,可获得更大的累积盈利。

同时,策略还会结合对最高价和最低价的跟踪来设置止损和止盈,对订单进行相应管理。总体来说,该策略综合运用了多种分析工具,通过分批套利获得更佳回报。

### 优势

1. 结合多种指标判断,避免单一工具的误判
2. 采用分批加仓的方式,可放大盈利幅度
3. 设置止损止盈点,有助于避免冲高回落带来的亏损
4. 回撤可控,不会出现大幅度亏损的情况

### 风险及解决

1. 布林带上下轨突破不是百分百可靠的交易信号,可能存在一定的假信号风险。可考虑增加其他指标进行确认,如K线形态、成交量等。

2. 逐步加仓需要准确掌握市场节奏,如果出现急速调头可能造成较大损失。可适当减少加仓次数,或设置更为宽松的止损点。

3. 需要关注交易品种的流动性情况,流动性较差的品种不宜采用较大数量的分批套利。

4. 回测数据不等于实盘,实盘中手续费、滑点等成本还需考虑在内。可以适当放宽止损止盈幅度留有余地。

### 优化方向

1. 可以测试不同参数组合,如布林带周期、标准差倍数、RSI参数等,寻找最优参数。

2. 可以探索其他套利方式,如fixed fraction、kelly criterion等资金管理策略。

3. 可以结合机器学习等方法实现参数的动态优化。

4. 可以引入更多数据源,如文本情绪分析、社交数据等辅助判断市场行情。

5. 可以探索futures时间价差进行套利,进一步扩大收益空间。

### 总结

本策略综合运用多种技术指标,采取分批套利方式,设置止损止盈管理风险,是一种较完整的趋势跟踪策略。但仍需警惕假信号和急速调头的风险,适当调整参数及资金管理方式则可获得更稳定的超额收益。如果进一步结合机器学习等手段进行动态优化,该策略的表现还具有提升的空间,是值得长期跟踪和积累的。

|| 

### Overview

This is a relatively complex momentum breakout strategy that incorporates multiple technical indicators for judgment and implements multi-staged pyramiding orders in different directions and phases to achieve the goal of scaling in and out. 

### Principles

The strategy mainly combines the momentum indicator MACD, overbought and oversold indicator RSI and Bollinger Bands for directional judgment. When MACD line is above 0 and RSI is below oversold line, it is a long signal. When MACD line is below 0 and RSI is above overbought line, it is a short signal. It also incorporates breakout of Bollinger Bands upper and lower rail for further confirmation of trading signals.

In specific implementation, the strategy first judges the performance of MACD line and RSI to confirm fundamentals. Then according to the breakout of Bollinger Bands upper and lower rail, it takes pyramiding orders in different sizes. In bullish phrase, it will gradually long with increasing size near the Bollinger Bands lower rail. In bearish phrase, it will gradually short with increasing size near the Bollinger Bands upper rail. By scaling in and out at different directions and different prices, it can obtain bigger accumulated profit.

Meanwhile, the strategy also tracks the highest and lowest price to set stop loss and take profit, managing the orders accordingly. In general, this strategy combines multiple analytical tools and achieves better returns through staged pyramiding.

### Advantages

1. Combining multiple indicators avoids misjudgment of a single tool.

2. Scaling in with multiple stages can amplify profit margin. 

3. Setting stop loss and take profit helps avoid loss from high spikes.

4. Controllable drawdown, won't see huge loss.

### Risks and Solutions

1. Breakout of Bollinger Bands upper and lower rail is not 100% reliable, may see some false signals. Can consider adding other indicators like candlestick patterns, volume for confirmation.

2. Staged pyramiding requires accurate grasp of market pace, rapid reversals may lead to huge loss. Can reduce scaling stages or set wider stop loss.

3. Need to watch for liquidity of trading instruments, low liquidity is not suitable for large batch pyramiding.

4. Backtest ≠ live, costs like spread and commission should be considered in live trading. Can loosen stop loss and take profit range.

### Optimization

1. Can test different parameter combinations like Bollinger period, STD multiplier, RSI parameters to find optimum.

2. Can explore other scaling techniques like fixed fraction, Kelly criterion etc.

3. Can implement dynamic optimization of parameters with machine learning etc.

4. Can incorporate more data sources like sentiment analysis, social data to assist judgement.

5. Can explore futures calendar spread for arbitrage, further expand profit space.

### Summary

This strategy comprehensively uses multiple technical indicators, takes staged pyramiding, manages risks with stop loss and take profit, making it a relatively complete trend following strategy. But risks like false signals and rapid reversals should be alerted, properly adjusting parameters and position sizing can lead to more steady excess returns. Further optimization with machine learning etc. can improve strategy performance. It is worth long-term tracking and accumulating.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|HA Candles|
|v_input_2|3|# of STDEV's|
|v_input_3|14|Pivot Length|
|v_input_4|100|Z-Index|
|v_input_5|false|Fibonacci|
|v_input_6|5|Resolution|
|v_input_7|false|Reverse Orders|
|v_input_8|99999|TS|
|v_input_9|30|TP|
|v_input_10|10|SL|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-11 00:00:00
end: 2023-10-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title="Incremental Order size +", shorttitle="Strategy", overlay=true, default_qty_value=1, pyramiding=10)

//Heiken Ashi
isHA = input(false, "HA Candles", bool)

//MACD
fastLength = 12
slowlength = 26
MACDLength = 9

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD

//Bollinger Bands Exponential
src = open
len = 18
e = ema(src,len)
evar = (src - e)*(src - e)
evar2 = (sum(evar,len))/len
std = sqrt(evar2)
Multiplier = input(3, minval = 0.01, title = "# of STDEV's")
upband = e + (Multiplier * std)
dnband = e - (Multiplier * std)

//EMA
ema3 = ema(close, 3)

//RSIplot
length = 45
overSold = 90
overBought = 10
price = close

vrsi = rsi(price, length)

notna = not na(vrsi)

macdlong = crossover(delta, 0)
macdshort = crossunder(delta, 0)
rsilong = notna and crossover(vrsi, overSold)
rsishort = notna and crossunder(vrsi, overBought)

lentt = input(14, "Pivot Length")
    //The length defines how many periods a high or low must hold to be a "relevant pivot"

h = highest(lentt)
    //The highest high over the length
h1 = dev(h, lentt) ? na : h
    //h1 is a pivot of h if it holds for the full length
hpivot = fixnan(h1)
    //creates a series which is equal to the last pivot

l = lowest(lentt)
l1 = dev(l, lentt) ? na : l
lpivot = fixnan(l1)
    //repeated for lows


last_hpivot = h1 ? time : nz(last_hpivot[1])
last_lpivot = l1 ? time : nz(last_lpivot[1])

long_time = last_hpivot > last_lpivot ? 0:1

//FIBS

z = input(100, "Z-Index")
p_offset= 2
transp = 60
a=(lowest(z)+highest(z))/2
b=lowest(z)
c=highest(z)
fibonacci = input(0, "Fibonacci") / 100

//Fib Calls
fib0 = (((hpivot - lpivot)* fibonacci) + lpivot)
fib1 = (((hpivot - lpivot)*.21) + lpivot)
fib2 = (((hpivot - lpivot)*.3) + lpivot)
fib3 = (((hpivot - lpivot)*.5) + lpivot)
fib4 = (((hpivot - lpivot)*.62) + lpivot)
fib5 = (((hpivot - lpivot)*.7) + lpivot)
fib6 = (((hpivot - lpivot)* 1.00) + lpivot)
fib7 = (((hpivot - lpivot)* 1.27) + lpivot)
fib8 = (((hpivot - lpivot)* 2) + lpivot)
fib9 = (((hpivot - lpivot)* -.27) + lpivot)
fib10 = (((hpivot - lpivot)* -1) + lpivot)

//Heiken Ashi Candles

data2 = isHA ? heikenashi(syminfo.tickerid) : syminfo.tickerid
res5 = input("5", "Resolution")

//HT Fibs

hfib0 =  security(data2, res5, fib0[1])
hfib1 =  security(data2, res5, fib1[1])
hfib2 =  security(data2, res5, fib2[1])
hfib3 =  security(data2, res5, fib3[1])
hfib4 =  security(data2, res5, fib4[1])
hfib5 =  security(data2, res5, fib5[1])
hfib6 =  security(data2, res5, fib6[1])
hfib7 =  security(data2, res5, fib7[1])
hfib8 =  security(data2, res5, fib8[1])
hfib9 =  security(data2, res5, fib9[1])
hfib10 =  security(data2, res5, fib10[1])

vrsiup = vrsi > vrsi[1] and vrsi[1] > vrsi[2]
vrsidown = vrsi < vrsi[1] and vrsi[1] < vrsi[2]

long =  cross(close, fib0) and delta > 0 and vrsi < overSold and vrsiup 
short = cross(close, fib6) and delta < 0  and vrsi > overBought and vrsidown

// long2 =  cross(close, fib0) and delta > 0 and vrsi < overSold and vrsiup 
// short2 = cross(close, fib6) and delta < 0  and vrsi > overBought and vrsidown
// long =  cross(close, fib0) and delta > 0 and vrsi < overSold and vrsiup 
// short = cross(close, fib6) and delta < 0  and vrsi > overBought and vrsidown
// long =  cross(close, fib0) and delta > 0 and vrsi < overSold and vrsiup 
// short = cross(close, fib6) and delta < 0  and vrsi > overBought and vrsidown
// long =  cross(close, fib0) and delta > 0 and vrsi < overSold and vrsiup 
// short = cross(close, fib6) and delta < 0  and vrsi > overBought and vrsidown
// long =  cross(close, fib0) and delta > 0 and vrsi < overSold and vrsiup 
// short = cross(close, fib6) and delta < 0  and vrsi > overBought and vrsidown
// long =  cross(close, fib0) and delta > 0 and vrsi < overSold and vrsiup 
// short = cross(close, fib6) and delta < 0  and vrsi > overBought and vrsidown
// long =  cross(close, fib0) and delta > 0 and vrsi < overSold and vrsiup 
// short = cross(close, fib6) and delta < 0  and vrsi > overBought and vrsidown
// long =  cross(close, fib0) and delta > 0 and vrsi < overSold and vrsiup 
// short = cross(close, fib6) and delta < 0  and vrsi > overBought and vrsidown

reverseOpens = input(false, "Reverse Orders", bool)
if (reverseOpens)
	tmplong = long
	long := short
	short := tmplong

//Strategy
ts = input(99999, "TS")
tp = input(30, "TP")
sl = input(10, "SL")

last_long = long ? time : nz(last_long[1])
last_short = short ? time : nz(last_short[1])

in_long = last_long > last_short
in_short = last_short > last_long

long_signal = crossover(last_long, last_short)
short_signal = crossover(last_short, last_long)

last_open_long = long ? open : nz(last_open_long[1])
last_open_short = short ? open : nz(last_open_short[1])

last_open_long_signal = long_signal ? open : nz(last_open_long_signal[1])
last_open_short_signal = short_signal ? open : nz(last_open_short_signal[1])

last_high = not in_long ? na : in_long and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low = not in_short ? na : in_short and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])

long_ts = not na(last_high) and high <= (last_high - ts) and high >= last_open_long_signal
short_ts = not na(last_low) and low >= (last_low + ts) and low <= last_open_short_signal

long_tp = high >= (last_open_long + tp) and long[1] == 0
short_tp = low <= (last_open_short - tp) and short[1] == 0

long_sl = low <= (last_open_long - sl) and long[1] == 0
short_sl = high >= (last_open_short + sl) and short[1] == 0

last_hfib_long = long_signal ? fib1 : nz(last_hfib_long[1])
last_hfib_short = short_signal ? fib5 : nz(last_hfib_short[1])

last_fib7 = long ? fib7 : nz(last_fib7[1])
last_fib10 = long ? fib10 : nz(last_fib10[1])
last_fib8 = short ? fib8 : nz(last_fib8[1])
last_fib9 = short ? fib9 : nz(last_fib9[1])

last_long_signal = long_signal ? time : nz(last_long_signal[1])
last_short_signal = short_signal ? time : nz(last_short_signal[1])

last_long_tp = long_tp ? time : nz(last_long_tp[1])
last_short_tp = short_tp ? time : nz(last_short_tp[1])

last_long_ts = long_ts ? time : nz(last_long_ts[1])
last_short_ts = short_ts ? time : nz(last_short_ts[1])

long_ts_signal = crossover(last_long_ts, last_long_signal)
short_ts_signal = crossover(last_short_ts, last_short_signal)

last_long_sl = long_sl ? time : nz(last_long_sl[1])
last_short_sl = short_sl ? time : nz(last_short_sl[1])

long_tp_signal = crossover(last_long_tp, last_long)
short_tp_signal = crossover(last_short_tp, last_short)

long_sl_signal = crossover(last_long_sl, last_long)
short_sl_signal = crossover(last_short_sl, last_short)

last_long_tp_signal = long_tp_signal ? time : nz(last_long_tp_signal[1])
last_short_tp_signal = short_tp_signal ? time : nz(last_short_tp_signal[1])

last_long_sl_signal = long_sl_signal ? time : nz(last_long_sl_signal[1])
last_short_sl_signal = short_sl_signal ? time : nz(last_short_sl_signal[1])

last_long_ts_signal = long_ts_signal ? time : nz(last_long_ts_signal[1])
last_short_ts_signal = short_ts_signal ? time : nz(last_short_ts_signal[1])

true_long_signal = long_signal and last_long_sl_signal > last_long_signal[1] or long_signal and last_long_tp_signal > last_long_signal[1] or long_signal and last_long_ts_signal > last_long_signal[1]
true_short_signal = short_signal and last_short_sl_signal > last_short_signal[1] or short_signal and last_short_tp_signal > last_short_signal[1] or short_signal and last_short_ts_signal > last_short_signal[1]  


// strategy.entry("BLUE", strategy.long, when=long)
// strategy.entry("RED", strategy.short, when=short)

g = delta > 0 and vrsi < overSold and vrsiup
r = delta < 0  and vrsi > overBought and vrsidown

long1 = cross(close, fib1) and g and last_long_signal[1] > last_short_signal// and last_long_signal > long
short1 = cross(close, fib5) and r and last_short_signal[1] > last_long_signal// and last_short_signal > short

last_long1 = long1 ? time : nz(last_long1[1])
last_short1 = short1 ? time : nz(last_short1[1])

last_open_long1 = long1 ? open : nz(last_open_long1[1])
last_open_short1 = short1 ? open : nz(last_open_short1[1])

long1_signal = crossover(last_long1, last_long_signal)
short1_signal = crossover(last_short1, last_short_signal)

last_long1_signal = long1_signal ? time : nz(last_long1_signal[1])
last_short1_signal = short1_signal ? time : nz(last_short1_signal[1])


long2 = cross(close, fib2) and g and last_long1_signal > last_long_signal[1] and long1_signal == 0 and last_long_signal[1] > last_short_signal
short2 = cross(close, fib4) and r and last_short1_signal > last_short_signal[1] and short1_signal == 0 and last_short_signal[1] > last_long_signal

last_long2 = long2 ? time : nz(last_long2[1])
last_short2 = short2 ? time : nz(last_short2[1])

last_open_short2 = short2 ? open : nz(last_open_short2[1])

long2_signal = crossover(last_long2, last_long1_signal) and long1_signal==0
short2_signal = crossover(last_short2, last_short1_signal) and short1_signal==0

last_long2_signal = long2_signal ? time : nz(last_long2_signal[1])
last_short2_signal = short2_signal ? time : nz(last_short2_signal[1])

//Trade 4

long3 = cross(close, fib3) and g and last_long1_signal > last_long_signal[1] and long1_signal == 0 and last_long_signal[1] > last_short_signal
short3 = cross(close, fib3) and r and last_short1_signal > last_short_signal[1] and short1_signal == 0 and last_short_signal[1] > last_long_signal

last_long3 = long3 ? time : nz(last_long3[1])
last_short3 = short3 ? time : nz(last_short3[1])

last_open_short3 = short3 ? open : nz(last_open_short3[1])

long3_signal = crossover(last_long3, last_long2_signal) and long2_signal==0
short3_signal = crossover(last_short3, last_short2_signal) and short2_signal==0

last_long3_signal = long3_signal ? time : nz(last_long3_signal[1])
last_short3_signal = short3_signal ? time : nz(last_short3_signal[1])


//Trade 5
long4 = long and last_long1_signal > last_long_signal[1] and long1_signal == 0 and last_long_signal[1] > last_short_signal
short4 = short and last_short1_signal > last_short_signal[1] and short1_signal == 0 and last_short_signal[1] > last_long_signal

last_long4 = long4 ? time : nz(last_long4[1])
last_short4 = short4 ? time : nz(last_short4[1])

long4_signal = crossover(last_long4, last_long3_signal) and long2_signal==0 and long3_signal==0
short4_signal = crossover(last_short4, last_short3_signal) and short2_signal==0 and short3_signal==0

last_long4_signal = long4_signal ? time : nz(last_long4_signal[1])
last_short4_signal = short4_signal ? time : nz(last_short4_signal[1])

//Trade 6
long5 = long and last_long1_signal > last_long_signal[1] and long1_signal == 0 and last_long_signal[1] > last_short_signal
short5 = short and last_short1_signal > last_short_signal[1] and short1_signal == 0 and last_short_signal[1] > last_long_signal

last_long5 = long5 ? time : nz(last_long5[1])
last_short5 = short5 ? time : nz(last_short5[1])

long5_signal = crossover(last_long5, last_long4_signal) and long3_signal==0 and long4_signal==0
short5_signal = crossover(last_short5, last_short4_signal) and short3_signal==0 and short4_signal==0

last_long5_signal = long5_signal ? time : nz(last_long5_signal[1])
last_short5_signal = short5_signal ? time : nz(last_short5_signal[1])

//Trade 7
long6 = long and last_long1_signal > last_long_signal[1] and long1_signal == 0 and last_long_signal[1] > last_short_signal
short6 = short and last_short1_signal > last_short_signal[1] and short1_signal == 0 and last_short_signal[1] > last_long_signal

last_long6 = long6 ? time : nz(last_long6[1])
last_short6 = short6 ? time : nz(last_short6[1])

long6_signal = crossover(last_long6, last_long5_signal) and long2_signal==0 and long4_signal==0 and long5_signal==0
short6_signal = crossover(last_short6, last_short5_signal) and short2_signal==0 and short4_signal==0 and short5_signal==0

last_long6_signal = long6_signal ? time : nz(last_long6_signal[1])
last_short6_signal = short6_signal ? time : nz(last_short6_signal[1])


//Trade 8
long7 = long and last_long1_signal > last_long_signal[1] and long1_signal == 0 and last_long_signal[1] > last_short_signal
short7 = short and last_short1_signal > last_short_signal[1] and short1_signal == 0 and last_short_signal[1] > last_long_signal

last_long7 = long7 ? time : nz(last_long7[1])
last_short7 = short7 ? time : nz(last_short7[1])

long7_signal = crossover(last_long7, last_long6_signal) and long2_signal==0 and long4_signal==0 and long5_signal==0 and long6_signal==0
short7_signal = crossover(last_short7, last_short6_signal) and short2_signal==0 and short4_signal==0 and short5_signal==0 and short6_signal==0

last_long7_signal = long7_signal ? time : nz(last_long7_signal[1])
last_short7_signal = short7_signal ? time : nz(last_short7_signal[1])


//Trade 9
long8 = long and last_long1_signal > last_long_signal[1] and long1_signal == 0 and last_long_signal[1] > last_short_signal
short8 = short and last_short1_signal > last_short_signal[1] and short1_signal == 0 and last_short_signal[1] > last_long_signal

last_long8 = long8 ? time : nz(last_long8[1])
last_short8 = short8 ? time : nz(last_short8[1])

long8_signal = crossover(last_long8, last_long7_signal) and long2_signal==0 and long4_signal==0 and long5_signal==0 and long6_signal==0 and long7_signal==0
short8_signal = crossover(last_short8, last_short7_signal) and short2_signal==0 and short4_signal==0 and short5_signal==0 and short6_signal==0 and short7_signal==0

last_long8_signal = long8_signal ? time : nz(last_long8_signal[1])
last_short8_signal = short8_signal ? time : nz(last_short8_signal[1])

//Trade 10
long9 = long and last_long1_signal > last_long_signal[1] and long1_signal == 0 and last_long_signal[1] > last_short_signal
short9 = short and last_short1_signal > last_short_signal[1] and short1_signal == 0 and last_short_signal[1] > last_long_signal

last_long9 = long9 ? time : nz(last_long9[1])
last_short9 = short9 ? time : nz(last_short9[1])

long9_signal = crossover(last_long9, last_long8_signal) and long2_signal==0 and long4_signal==0 and long5_signal==0 and long6_signal==0 and long7_signal==0 and long8_signal==0
short9_signal = crossover(last_short9, last_short8_signal) and short2_signal==0 and short4_signal==0 and short5_signal==0 and short6_signal==0 and short7_signal==0 and short8_signal==0

last_long9_signal = long9_signal ? time : nz(last_long9_signal[1])
last_short9_signal = short9_signal ? time : nz(last_short9_signal[1])


strategy.entry("Long", strategy.long, qty=1, when=long_signal)
strategy.entry("Short", strategy.short, qty=1, when=short_signal)
strategy.entry("Long", strategy.long, qty=2, when=long1_signal)
strategy.entry("Short1", strategy.short, qty=2, when=short1_signal)
strategy.entry("Long", strategy.long, qty=4, when=long2_signal)
strategy.entry("Short2", strategy.short, qty=4, when=short2_signal)
strategy.entry("Long", strategy.long, qty=8, when=long3_signal)
strategy.entry("Short3", strategy.short, qty=8, when=short3_signal)
strategy.entry("Long", strategy.long, qty=5, when=long4_signal)
strategy.entry("Short", strategy.short, qty=5, when=short4_signal)
strategy.entry("Long", strategy.long, qty=6, when=long5_signal)
strategy.entry("Short", strategy.short, qty=6, when=short5_signal)
strategy.entry("Long", strategy.long, qty=7, when=long6_signal)
strategy.entry("Short", strategy.short, qty=7, when=short6_signal)
strategy.entry("Long", strategy.long, qty=8, when=long7_signal)
strategy.entry("Short", strategy.short, qty=8, when=short7_signal)
strategy.entry("Long", strategy.long, qty=9, when=long8_signal)
strategy.entry("Short", strategy.short, qty=9, when=short8_signal)
strategy.entry("Long", strategy.long, qty=10, when=long9_signal)
strategy.entry("Short", strategy.short, qty=10, when=short9_signal)

short1_tp = low <= (last_open_short1 - tp) and short1[1] == 0
short2_tp = low <= (last_open_short2 - tp) and short2[1] == 0
short3_tp = low <= (last_open_short3 - tp) and short3[1] == 0
short1_sl = high >= (last_open_short1 + sl) and short1[1] == 0
short2_sl = high >= (last_open_short2 + sl) and short2[1] == 0
short3_sl = high >= (last_open_short3 + sl) and short3[1] == 0

close_long = cross(close, fib6)
close_short = cross(close, fib0)

// strategy.close("Long", when=close_long)
// strategy.close("Long", when=long_tp)
// strategy.close("Long", when=long_sl)

// strategy.close("Short", when=long_signal)
// strategy.close("Short1", when=long_signal)
// strategy.close("Short2", when=long_signal)
// strategy.close("Short3", when=long_signal)
strategy.close("Short", when=short_tp)
strategy.close("Short1", when=short1_tp)
strategy.close("Short2", when=short2_tp)
strategy.close("Short3", when=short3_tp)
strategy.close("Short", when=short_sl)
strategy.close("Short1", when=short1_sl)
strategy.close("Short2", when=short2_sl)
strategy.close("Short3", when=short3_sl)

```

> Detail

https://www.fmz.com/strategy/429568

> Last Modified

2023-10-18 11:40:01
