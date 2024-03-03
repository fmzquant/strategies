
> Name

动量均线交叉策略Momentum-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略运用快速移动平均线和慢速移动平均线的交叉原理,判断市场趋势方向,以发出买入和卖出信号。策略简单易懂,容易实施,适用于中短线交易。

## 策略原理

该策略使用两个移动平均线,一个快速线一个慢速线。快速线参数为3日EMA,慢速线参数为15日EMA。策略判断快速线从下方向上突破慢速线时,认为目前处于上升趋势,该时刻为买入信号。反之,当快速线从上方向下跌破慢速线时,认为目前处于下降趋势,该时刻为卖出信号。 

策略还设置了一个较快的参数为3日的EMA作为快速退出线。当价格跌破该快速退出线时,则判定趋势反转,应退出原有的多头头寸。同理,当价格重新突破该退出线时,则重新转为看涨,因此为重新入场的信号。

具体操作信号设置如下:

1. 快速线由下向上突破慢速线,做多

2. 快速线由上向下跌破慢速线,做空

3. 价格跌破快速退出线,平仓多单

4. 价格重新突破快速退出线,重新做多

## 策略优势

- 使用简单,仅需要配置好两个移动平均线的参数,非常容易实施

- 回测数据充足,使用的指标都较为常见,可评估策略有效性

- 可配置参数较多,可以通过调整参数来优化策略

- 采用快速移出平均线设置止损,可更好控制风险

- 策略思路清晰,判断买卖点的信号非常明确

- 操作频次适中,避免过于频繁交易

## 策略风险

- 作为趋势跟随策略,在趋势不明显时,会产生更多虚假信号

- 移动平均线本身具有滞后性,可能错过转折点

- 固定参数设置无法适应市场变化,应配合参数优化使用

- 止损设置可能过于疲软,无法及时止损

- 策略信号频繁,交易成本可能较高

- 交易信号可能出现背离,应结合其它指标确认

可通过参数优化,辅助以其它指标确认,适当放宽止损标准,及时更新参数等方法来控制风险。

## 策略优化

- 可以测试优化移动平均线参数,使其更符合当前市场特征

- 可以引入更多指标进行组合,形成更强大的策略系统 

- 可以设定自适应的参数设置,根据市场实时调整参数

- 可以引入机器学习算法,实现更智能化的策略优化

- 可以设定动态止损、跟踪止损来更好的控制风险

- 可以结合量能指标,避免出现背离导致错失套机

## 总结

本策略整体是一个较为简单的双移动平均线交叉策略。它利用快速均线和慢速均线间的交叉关系判断市场趋势和买卖时机。策略优点是思路清晰,易于实施,通过参数优化可以适应不同市场。但也存在一些风险,需要引入更多指标进行验证,并做好风险控制。如果用于中短线交易,且通过持续优化调整,该策略可以成为一个非常实用的量化交易系统。

|| 

## Overview

This strategy utilizes the crossover principles between fast and slow moving averages to determine market trend directions and generate buy and sell signals. The strategy is simple and easy to implement, suitable for medium-term trading.

## Strategy Logic

The strategy employs two moving averages, one fast line and one slow line. The fast line uses 3-day EMA and the slow line uses 15-day EMA. When the fast line crosses above the slow line from below, it indicates an upward trend and gives a buy signal. On the contrary, when the fast line crosses below the slow line from above, it signals a downward trend and gives a sell signal.

The strategy also sets a faster 3-day EMA as the fast exit line. When price breaks below this fast exit line, it judges the trend has reversed and should exit the existing long position. Likewise, when price breaks back above the exit line, it indicates a renewed uptrend and gives a signal to re-enter long.

The specific operation signals are set as:

1. Fast line crosses above slow line from below, go long

2. Fast line crosses below slow line from above, go short 

3. Price breaks below fast exit line, close long position

4. Price breaks back above fast exit line, re-enter long

## Advantages

- Simple to use, only need to configure two moving average parameters, easy to implement

- Sufficient backtesting data, uses common indicators to evaluate viability 

- Many configurable parameters for optimization

- Adopts fast exit line as stop loss to better control risk

- Clear strategy logic, explicit buy and sell signals 

- Appropriate operation frequency, avoids over-trading

## Risks

- Prone to more false signals when trend is unclear as trend following strategy

- Moving averages have lagging nature, may miss turn points

- Fixed parameters cannot adapt to market changes, needs optimization

- Stop loss may be too soft, unable to stop loss in time

- Frequent signals may lead to higher trading costs

- Signals may diverge and needs confirmation with other indicators

Risks can be managed by parameter optimization, adding filters, relaxing stop loss, updating parameters timely etc.

## Enhancement

- Test and optimize parameters to better fit market conditions

- Introduce more indicators to form a robust system

- Build adaptive parameter settings based on real-time market

- Apply machine learning models for smarter optimization

- Set dynamic or trailing stop loss for better risk control

- Combine volume indicators to avoid divergence

## Conclusion

This is a relatively simple dual moving average crossover strategy. It determines market trend and trading signals based on the interaction between fast and slow moving averages. The strategy is easy to implement and can be adapted via optimization. But it also has some risks. More filters are needed to confirm signals and manage risks. When properly optimized and applied to medium-term trading, it can become a very practical quantitative trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|FAST EMA|
|v_input_2_close|0|Source for Fast: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|15|SLOW EMA|
|v_input_4_close|0|Source for Slow: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|3|FAST EMA Exit|
|v_input_6_close|0|Source for Fast Exit: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7_low|0|Source for Short Entry: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8_high|0|Source for Long Entry: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9_low|0|Source for Short Exit: low|high|close|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10_high|0|Source for Long Exit: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_11|0.005|Exit Tuner to touch slowEMA|
|v_input_12|true|Run Strategy|
|v_input_13|true|From Month|
|v_input_14|true|From Day|
|v_input_15|2020|From Year|
|v_input_16|true|Thru Month|
|v_input_17|true|Thru Day|
|v_input_18|2100|Thru Year|
|v_input_19|true|Show Date Range|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ehaarjee, ECHKAY, JackBauer007

//@version=4
//study(title="Tale_indicators", overlay=true)
strategy("Tale Indicators Strategy", overlay=true, precision=8, max_bars_back=200, pyramiding=0, initial_capital=20000, commission_type="percent", commission_value=0.1)

len_fast = input(3, minval=1, title="FAST EMA")
src_fast = input(close, title="Source for Fast")
fastMA = ema(src_fast, len_fast)
plot(fastMA, title="Slow EMA", color=color.orange)

len_slow = input(15, minval=1, title="SLOW EMA")
src_slow = input(close, title="Source for Slow")
slowMA = ema(src_slow, len_slow)
plot(slowMA, title="Fast EMA", color=color.blue)

len_fast_exit = input(3, minval=1, title="FAST EMA Exit")
src_fast_exit = input(close, title="Source for Fast Exit")
fastMAE = ema(src_fast_exit, len_fast_exit)
plot(fastMAE, title="Fast EMA Ex", color=color.red)


src_slow_enter_short = input(low, title="Source for Short Entry")
slowMASEn = ema(src_slow_enter_short, len_slow)

src_slow_enter_long = input(high, title="Source for Long Entry")
slowMALEn = ema(src_slow_enter_long, len_slow)

src_slow_exit_short = input(low, title="Source for Short Exit")
slowMASEx = ema(src_slow_enter_short, len_slow)

src_slow_exit_long = input(high, title="Source for Long Exit")
slowMALEx = ema(src_slow_enter_long, len_slow)

enter_long = crossover(fastMA, slowMALEn)
enter_short = crossunder(fastMA, slowMASEn)
exit_long = crossunder(fastMAE, slowMALEx)
exit_short = crossover(fastMAE, slowMALEx)

out_enter = iff(enter_long == true, 1, iff(enter_short == true, -1, 0))
plotarrow(out_enter, "Plot Enter Points", colorup=color.green, colordown=color.red, maxheight = 30)

bull = fastMA > slowMALEn
bear = fastMA < slowMASEn

c = bull ? color.green : bear ? color.red  : color.white
bgcolor(c)

exit_tuner = input(0.005, title="Exit Tuner to touch slowEMA")

bull_exit = (bull and (low>(fastMAE*(1+exit_tuner)))) or exit_long or (not(bear) and (fastMAE>high))
bear_exit = (bear and ((fastMAE*(1-exit_tuner))>high)) or exit_short or (not(bull) and (low>fastMAE))

bull_r = (bull and ((bull_exit[1]) or (bull_exit[2] and bull_exit[1])) and (low<=fastMAE))
bear_r = (bear and ((bear_exit[1]) or (bull_exit[2] and bull_exit[1])) and (fastMAE<=high))

bull_re = (bull and (low<slowMALEn)) and not(enter_long)
bear_re = (bear and (high>slowMASEn)) and not(enter_short)

bull_ree = (bull and ((low<slowMALEn) and not(bull_re[1] or enter_long[1]))) 
bear_ree = (bear and ((high>slowMASEn) and not(bear_re[1] or enter_short[1])))

bull_reenter =  (bull_r) and not(enter_long)
bear_reenter =  (bear_r) and not(enter_short)

plotshape(bull_exit, "Plot Bull Exit", style = shape.arrowdown, color=color.green, size=size.small, text="ExL", location=location.abovebar)
plotshape(bear_exit, "Plot Bear Exit", style = shape.arrowup, color=color.red, size=size.small, text="ExS", location=location.belowbar)

plotshape(bull_reenter, "Plot Bull ReEnter", style = shape.arrowup, color=color.green, size=size.small, text="ReL", location=location.belowbar)
plotshape(bear_reenter, "Plot Bear ReEnter", style = shape.arrowdown, color=color.red, size=size.small, text="ReS", location=location.abovebar)

run_strategy = input(true, title="Run Strategy")
// === INPUT BACKTEST RANGE ===
fromMonth = input(defval = 1,    title = "From Month",      type = input.integer, minval = 1, maxval = 12)
fromDay   = input(defval = 1,    title = "From Day",        type = input.integer, minval = 1, maxval = 31)
fromYear  = input(defval = 2020, title = "From Year",       type = input.integer, minval = 2000)
thruMonth = input(defval = 1,    title = "Thru Month",      type = input.integer, minval = 1, maxval = 12)
thruDay   = input(defval = 1,    title = "Thru Day",        type = input.integer, minval = 1, maxval = 31)
thruYear  = input(defval = 2100, title = "Thru Year",       type = input.integer, minval = 2000)

// === INPUT SHOW PLOT ===
showDate  = input(defval = true, title = "Show Date Range", type = input.bool)
// === FUNCTION EXAMPLE ===
start     = timestamp(fromYear, fromMonth, fromDay, 00, 00)        // backtest start window
finish    = timestamp(thruYear, thruMonth, thruDay, 23, 59)        // backtest finish window
window()  => true       // create function "within window of time"

var long_position_open = false
var short_position_open = false


if (enter_long and not(bull_exit) and not(long_position_open))
//    strategy.entry("LO", strategy.long, qty=4)
    long_position_open := true
    if (short_position_open)
//        strategy.close("SO")
        short_position_open := false

if (bull_reenter and not(long_position_open))  
//    strategy.entry("LO", strategy.long, qty=1)
    long_position_open := true

if (bull_exit and long_position_open)
//  strategy.close("LO")
    long_position_open := false
    
if (enter_short and not(bear_exit) and not(short_position_open))
//    strategy.entry("SO", strategy.short, qty=4)
    short_position_open := true
    if(long_position_open)
//        strategy.close("LO")
        long_position_open := false

if (bear_reenter and not(short_position_open))  
//    strategy.entry("SO", strategy.long, qty=1)
    long_position_open := true

if (bear_exit and short_position_open)
//    strategy.close("SO")
    short_position_open := false

if(run_strategy)
    strategy.entry("LO", strategy.long, when=(window() and enter_long), qty=4)
    strategy.entry("LO", strategy.long, when=(window() and bull_reenter and not(long_position_open)), qty=1)
    strategy.close("LO", when=(window() and bull_exit and long_position_open))
    strategy.entry("SO", strategy.short, when=(window() and enter_short), qty=4)
    strategy.entry("SO", strategy.short, when=(window() and bear_reenter and not(short_position_open)), qty=1)
    strategy.close("SO", when=(window() and bear_exit and short_position_open))

```

> Detail

https://www.fmz.com/strategy/427526

> Last Modified

2023-09-21 21:29:22
