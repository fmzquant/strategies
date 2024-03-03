
> Name

基于OBV指标的趋势跟踪策略OBV-EMA-Crossover-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a04fc9786fc20fc829.png)
[trans]
## 概述

该策略采用双EMA均线跨度来判断OBV指标的多空趋势,根据趋势方向进行长短做法。其中,OBV指标可以更清晰地反映出价格和成交量的关系,判断市场参与者的意愿,因此可以用于捕捉市场趋势。该策略结合移动平均线的指标平滑处理,可以有效滤除市场噪音,捕捉主要趋势。

## 策略原理

该策略主要基于OBV指标是否处于上升趋势来判断多头入场时机。具体来说,是计算OBV的6日EMA和24日EMA,当6日EMA上穿24日EMA时产生多头信号。同理,当6日EMA下穿24日EMA时,产生空头信号。此外,策略还设置了3%的止损。

该策略判断趋势的关键在于OBV指标。OBV指标体现大资金的集合性意愿,可以有效反映市场参与者的态度。结合移动平均线处理,可以滤除部分噪声,使得信号更加清晰可靠。策略采用快速EMA线和慢速EMA线构建交易信号,可以平滑价格数据,同时也能较敏感地捕捉趋势变化。

## 优势分析

该策略具有以下几个优势:

1. 基于成交量的OBV指标可以清晰判断市场参与者意愿,信号较为可靠。

2. 双EMA均线处理可以滤除部分噪音,使得信号更加清晰。

3. 采用快慢EMA线组合可以兼顾平滑价格和捕捉趋势变化。

4. 策略操作简单,容易实施。

## 风险分析

该策略也存在一些风险:  

1. OBV指标在某些时候会发出错误信号,此时策略可能亏损。

2. 在剧烈行情中,EMA线处理有滞后,可能错过最优入场点。  

3. 固定的止损设置可能过于死板,无法适应市场的变化。

对策:

1. 结合其他指标进行确认,避免错误信号。

2. 优化参数设置,使EMA线更灵敏。  

3. 设置动态止损。

## 优化方向  

该策略可以从以下几个方向进行优化:

1. 优化EMA参数组合,找到更匹配的均线参数。

2. 增加其他指标进行信号确认,如MACD、RSI等,提高信号准确率。

3. 设置动态止损,能够根据市场波动实时调整止损点。

4. 进行参数组合优化,找到最佳参数组合。

## 总结

该策略整体来说是一种较为简单可靠的趋势跟踪策略。它结合OBV指标和双EMA均线实现了对趋势的判断。优点是操作简单,信号清晰,能够有效跟踪趋势;缺点是可能出现错误信号,且EMA线处理有滞后。通过结合其他指标进行优化,可以获得更好的效果。

||

## Overview

This strategy uses the crossover of dual EMA lines of OBV indicator to determine the trend of OBV, and takes long/short positions according to the trend direction. OBV indicator can reflect the relationship between price and volume more clearly and judge the intention of market participants, so it can be used to capture market trend. This strategy combines the indicator smoothing of moving averages, which can effectively filter out market noise and capture the main trend.  

## Strategy Principle  

This strategy mainly uses whether OBV is in an uptrend to determine the long entry timing. Specifically, it calculates the 6-day EMA and 24-day EMA of OBV. When the 6-day EMA crosses above the 24-day EMA, a long signal is generated. Similarly, when the 6-day EMA crosses below the 24-day EMA, a short signal is generated. In addition, the strategy also sets a 3% stop loss.

The key to the strategy's trend judgment lies in the OBV indicator. OBV indicator reflects the collective intention of big money and can effectively reflect the attitude of market participants. Combined with the moving average line processing, some noise can be filtered out to make the signal clearer and more reliable. The strategy uses fast EMA lines and slow EMA lines to construct trading signals, which can smooth price data and also capture trend changes more sensitively.  

## Advantage Analysis 

The strategy has the following advantages:

1. OBV indicator based on trading volume can clearly judge the intention of market participants, and the signal is more reliable.  

2. The dual EMA line processing can filter out some noise to make the signal clearer.

3. The combination of fast and slow EMA lines can take into account both price smoothing and capturing trend changes.  

4. The strategy operation is simple and easy to implement.

## Risk Analysis

The strategy also has some risks:   

1. OBV indicator may issue wrong signals at some point, at which the strategy may suffer losses.

2. In violent trading, EMA lines have lagging effect, which may miss the optimal entry point.   

3. The fixed stop loss setting may be too rigid to adapt to market changes.

Countermeasures:

1. Confirm with other indicators to avoid wrong signals.  

2. Optimize parameter settings to make EMA lines more sensitive.  

3. Set dynamic stop loss. 

## Optimization Direction   

The strategy can be optimized in the following aspects:

1. Optimize EMA parameter combination to find better matched moving average parameters.  

2. Increase other indicators for signal confirmation, such as MACD, RSI, etc., to improve signal accuracy.

3. Set dynamic stop loss, which can adjust stop loss point in real time according to market fluctuations.   

4. Parameter combination optimization to find the best parameter combination.  

## Conclusion  

In general, this strategy is a relatively simple and reliable trend following strategy. It combines OBV indicator and dual EMA lines to judge the trend. The advantages are simple operation, clear signals, and ability to effectively track trends. The disadvantages are possible wrong signals and lagging of EMA line processing. Optimization with other indicators can achieve better results.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2019|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_7|3|ATR Period|
|v_input_8|true|ATR Mult|
|v_input_9|24|v_input_9|
|v_input_10|6|v_input_10|
|v_input_11|3|Stop Loss %|
|v_input_12|5000|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("OBV EMA X BF ?", overlay=false, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.0)

/////////////// Time Frame ///////////////
testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() => true

/////////////// OBV /////////////// 
src = close
atr = atr(input(title="ATR Period", defval=3, minval=1))
atrmult = input(title="ATR Mult", defval=1, minval=0)
obv = cum(change(src) > 0 ? volume * (volume / atr) : change(src) < 0 ? -volume * (volume / atr) : 0 * volume / atr)
e1 = ema(obv, input(24))
e2 = ema(obv, input(6))

///////////////  Strategy  /////////////// 
long = crossover(e2, e1)
short = crossunder(e2, e1)

last_long = 0.0
last_short = 0.0
last_long := long ? time : nz(last_long[1])
last_short := short ? time : nz(last_short[1])

long_signal = crossover(last_long, last_short)
short_signal = crossover(last_short, last_long)

last_open_long_signal = 0.0
last_open_short_signal = 0.0
last_open_long_signal := long_signal ? open : nz(last_open_long_signal[1])
last_open_short_signal := short_signal ? open : nz(last_open_short_signal[1])

last_long_signal = 0.0
last_short_signal = 0.0
last_long_signal := long_signal ? time : nz(last_long_signal[1])
last_short_signal := short_signal ? time : nz(last_short_signal[1])

in_long_signal = last_long_signal > last_short_signal
in_short_signal = last_short_signal > last_long_signal

last_high = 0.0
last_low = 0.0
last_high := not in_long_signal ? na : in_long_signal and (na(last_high[1]) or high > nz(last_high[1])) ? high : nz(last_high[1])
last_low := not in_short_signal ? na : in_short_signal and (na(last_low[1]) or low < nz(last_low[1])) ? low : nz(last_low[1])

since_longEntry = barssince(last_open_long_signal != last_open_long_signal[1]) 
since_shortEntry = barssince(last_open_short_signal != last_open_short_signal[1]) 

//////////////// Stop loss /////////////// 
sl_inp = input(3.0, title='Stop Loss %') / 100
tp_inp = input(5000.0, title='Take Profit %') / 100
 
take_level_l = strategy.position_avg_price * (1 + tp_inp)
take_level_s = strategy.position_avg_price * (1 - tp_inp)

slLong = in_long_signal ? strategy.position_avg_price * (1 - sl_inp) : na
slShort = strategy.position_avg_price * (1 + sl_inp)
long_sl = in_long_signal ? slLong : na
short_sl = in_short_signal ? slShort : na

/////////////// Execution /////////////// 
if testPeriod()
    strategy.entry("L", strategy.long, when=long)
    strategy.entry("S", strategy.short, when=short)
    strategy.exit("L SL", "L", stop=long_sl, when=since_longEntry > 0)
    strategy.exit("S SL", "S", stop=short_sl, when=since_shortEntry > 0)

/////////////// Plotting /////////////// 
plot(e1, color = e1 > e1[1] ? color.lime : e1 < e1[1] ? color.red : color.white, linewidth = 2, offset = 0)
plot(e2, color = e2 > e2[1] ? color.lime : e2 < e2[1] ? color.red : color.white, linewidth = 1)
bgcolor(strategy.position_size > 0 ? color.lime : strategy.position_size < 0 ? color.red : color.white, transp=90)
bgcolor(long_signal ? color.lime : short_signal ? color.red : na, transp=60)
```

> Detail

https://www.fmz.com/strategy/442252

> Last Modified

2024-02-20 15:35:08
