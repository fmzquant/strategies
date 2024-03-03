
> Name

超级趋势日线反转策略Super-Trend-Daily-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1206e91f096b7b7e78a.png)
[trans]
## 概述

超级趋势日线反转策略(Super Trend Daily Reversal Strategy)是一个利用超级趋势指标判断市场趋势,结合价格突破和平均真实波动范围计算止损,以及采用价格变化率指标过滤超级趋势信号的量化交易策略。该策略适用于日线及更高时间周期,可用于数字货币和股票等市场。

## 策略原理  

该策略的核心指标是超级趋势指标(Super Trend Indicator)。超级趋势指标基于平均真实波动范围(ATR),可以更加清晰地判断市场趋势方向。当价格突破超级趋势上轨时为看跌信号,突破下轨时为看涨信号。

该策略配套使用价格变化率指标(ROC)对超级趋势指标进行过滤,避免无效信号。当价格波动率较大时才参与超级趋势信号,否则不参与。

在止损方面,该策略提供两种止损方式:固定止损比例和基于ATR的自动缩进止损。固定止损简单直接,ATR止损可以根据市场波动性调整止损范围。

入场条件是超级趋势指标反转且价格变化率指标通过过滤器。出场条件是超级趋势再次反转或突破止损线。该策略遵循趋势跟踪原则,每个方向只允许一个头寸。

## 优势分析

该策略最大的优势在于利用超级趋势指标判断趋势方向的清晰度和稳定性较高,与普通移动平均线相比noise较小。另外,策略加入价格变化率指标有效过滤了部分假信号。

ATR自适应止损机制也使得该策略可以适应更广泛的市场环境。在波动加剧时止损会自动放宽,最大程度锁住盈利。

从测试结果看,该策略在牛市中表现优异。在数量级较大的长线趋势中胜率很高,连续盈利周期长。

## 风险分析  

该策略面临的主要风险在于趋势反转判断失误,从而可能错过反转信号或产生不必要的反转信号。这种情况通常发生在价格在关键支撑或阻力区域附近反复横盘整理时。

此外,止损设置过于宽松也会导致亏损扩大。ATR止损根据市场波动性进行调整,所以在市场突发事件时止损可能会拉的较宽。

针对上述风险,可适当缩短ATR计算周期或调整ATR止损的倍数系数。也可以加入附加指标确定关键支撑阻力区域,避免那些区域发出误导信号。

## 优化方向  

该策略可从以下几个方面进行优化:

1. 调整超级趋势指标的参数,优化ATR周期和ATR倍数,使超级趋势线更加平滑。

2. 调整价格变化率指标的参数,优化周期和变化率阈值,减少假信号。

3. 尝试不同的止损机制,如跟踪止损,或优化固定止损的止损幅度。

4. 增加附加判断指标,确定关键支撑阻力,避免趋势反转判断失误。

5. 测试不同品种的参数设置和效果,寻找最优参数组合。

6. 进行回测优化,找到最佳的参数设置。

## 总结

超级趋势日线反转策略整体来说是一个较为稳定可靠的趋势跟踪策略。它结合超级趋势指标和价格变化率指标进行过滤,可以有效识别中长线趋势的方向。ATR自适应止损机制也使其可以适应大部分市场环境。通过进一步优化参数设置和增加判断指标,该策略的稳定性和盈利能力还可以得到提高。

||

## Overview  

The Super Trend Daily Reversal Strategy is a quantitative trading strategy that uses the Super Trend indicator to determine market trends, combines price breakthrough and average true range to calculate stop loss, and uses the price change rate indicator to filter Super Trend signals. This strategy is suitable for daily and higher time frames and can be used in markets like cryptocurrencies and stocks.

## Strategy Logic

The core indicator of this strategy is the Super Trend indicator. The Super Trend indicator is based on Average True Range (ATR) and can more clearly determine the direction of market trends. A breakdown of the Super Trend upper rail is a short signal, and a breakdown of the lower rail is a long signal.

The strategy uses the Price Change Rate indicator (ROC) to filter the Super Trend indicator to avoid invalid signals. Only participate in Super Trend signals when price volatility is large, otherwise do not participate.

For stop loss, the strategy provides two stop loss methods: fixed stop loss percentage and ATR based adaptive stop loss. Fixed stop loss is simple and direct. ATR stop loss can adjust the stop loss range according to market volatility.

The entry conditions are a reversal of the Super Trend indicator and the price change rate indicator passes the filter. The exit conditions are that Super Trend reverses again or breaks through the stop loss line. The strategy adheres to the trend tracking principle and only allows one position in each direction.

## Advantage Analysis  

The biggest advantage of this strategy is that the Super Trend indicator has higher clarity and stability in judging trend direction compared to ordinary moving averages, with less noise. In addition, the price change rate indicator effectively filters out some false signals.

The ATR adaptive stop loss mechanism also allows the strategy to adapt to a wider market environment. The stop loss will automatically widen during increased volatility to maximize profits.

From the test results, this strategy performs exceptionally well in a bull market. The win rate is very high in long-term trends of significant magnitude, with long consecutive profitable cycles.

## Risk Analysis

The main risk faced by this strategy is misjudgment of trend reversal, which may miss reversal signals or generate unnecessary reversal signals. This often happens when prices oscillate and consolidate around key support/resistance areas.  

In addition, a stop loss that is set too wide can also lead to greater losses. ATR stop loss adjusts according to market volatility, so stops may be pulled wider during market events.

To address these risks, the ATR calculation period can be shortened appropriately or the ATR stop loss multiplier adjusted. Additional indicators can also be added to determine key support/resistance areas to avoid misleading signals from those areas.

## Optimization Directions 

The strategy can be optimized in the following aspects:

1. Adjust the parameters of the Super Trend indicator to optimize the ATR period and ATR multiples to make the Super Trend line smoother.

2. Adjust the parameters of the price change rate indicator to optimize the period and change rate threshold to reduce false signals.  

3. Try different stop loss mechanisms such as trailing stops, or optimize the stop loss amplitude of fixed stops.

4. Add additional judgment indicators to determine key support/resistance and avoid misjudgment of trend reversals.  

5. Test parameter settings and effects on different products to find the optimal parameter combination.  

6. Conduct backtest optimization to find the best parameter settings.

## Conclusion  

Overall, the Super Trend Daily Reversal Strategy is a relatively stable and reliable trend following strategy. It combines the Super Trend indicator and the price change rate indicator for filtering, which can effectively identify the direction of medium and long term trends. The ATR adaptive stop loss mechanism also enables it to adapt to most market environments. Through further optimization of parameter settings and added judgment indicators, the stability and profitability of this strategy can be improved.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|════════ Test Period ═══════|
|v_input_2|2017|Backtest Start Year|
|v_input_3|true|Backtest Start Month|
|v_input_4|true|Backtest Start Day|
|v_input_5|2019|Backtest Stop Year|
|v_input_6|12|Backtest Stop Month|
|v_input_7|31|Backtest Stop Day|
|v_input_8|false|══════ Super Trend ══════|
|v_input_9|3|ATR Period|
|v_input_10|1.3|ATR Multiplier|
|v_input_11|false|══════ Rate of Change ══════|
|v_input_12|30|ROC Length|
|v_input_13|6|ROC % Change|
|v_input_14|false|════════ Stop Loss ═══════|
|v_input_15|0|Stop Loss Type: Fixed|ATR Derived|
|v_input_16|6|Fixed Stop Loss %|
|v_input_17|20|ATR Stop Period|
|v_input_18|1.5|ATR Stop Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-22 00:00:00
end: 2024-02-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Super Trend Daily BF ?", overlay=true, precision=2, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)

/////////////// Time Frame ///////////////
_1 = input(false,  "════════ Test Period ═══════")
testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() => true

///////////// Super Trend /////////////
_2 = input(false,  "══════ Super Trend ══════")
length = input(title="ATR Period", type=input.integer, defval=3)
mult = input(title="ATR Multiplier", type=input.float, step=0.1, defval=1.3)

atr = mult * atr(length)

longStop = hl2 - atr
longStopPrev = nz(longStop[1], longStop)
longStop :=  close[1] > longStopPrev ? max(longStop, longStopPrev) : longStop

shortStop = hl2 + atr
shortStopPrev = nz(shortStop[1], shortStop)
shortStop := close[1] < shortStopPrev ? min(shortStop, shortStopPrev) : shortStop

dir = 1
dir := nz(dir[1], dir)
dir := dir == -1 and close > shortStopPrev ? 1 : dir == 1 and close < longStopPrev ? -1 : dir

///////////// Rate Of Change ///////////// 
_3 = input(false,  "══════ Rate of Change ══════")
source = close
roclength = input(30, "ROC Length",  minval=1)
pcntChange = input(6, "ROC % Change", minval=1)
roc = 100 * (source - source[roclength]) / source[roclength]
emaroc = ema(roc, roclength / 2)
isMoving() => emaroc > (pcntChange / 2) or emaroc < (0 - (pcntChange / 2))

///////////////  Strategy  /////////////// 
long = dir == 1 and dir[1] == -1 and isMoving()
short = dir == -1 and dir[1] == 1 and isMoving()

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

/////////////// Dynamic ATR Stop Losses ///////////////
_4 = input(false,  "════════ Stop Loss ═══════")
SL_type = input("Fixed", options=["Fixed", "ATR Derived"], title="Stop Loss Type")
sl_inp = input(6.0, title='Fixed Stop Loss %') / 100
atrLkb = input(20, minval=1, title='ATR Stop Period')
atrMult = input(1.5, step=0.25, title='ATR Stop Multiplier') 
atr1 = atr(atrLkb)

longStop1 = 0.0
longStop1 :=  short_signal ? na : long_signal ? close - (atr1 * atrMult) : longStop1[1]
shortStop1 = 0.0
shortStop1 := long_signal ? na : short_signal ? close + (atr1 * atrMult) : shortStop1[1]

slLong = in_long_signal ? strategy.position_avg_price * (1 - sl_inp) : na
slShort = strategy.position_avg_price * (1 + sl_inp)
long_sl = in_long_signal ? slLong : na
short_sl = in_short_signal ? slShort : na

/////////////// Execution ///////////////
if testPeriod()
    strategy.entry("L", strategy.long, when=long)
    strategy.entry("S", strategy.short, when=short)
    strategy.exit("L SL", "L", stop = SL_type == "Fixed" ? long_sl : longStop1, when=since_longEntry > 0)
    strategy.exit("S SL", "S", stop = SL_type == "Fixed" ? short_sl : shortStop1, when=since_shortEntry > 0)

/////////////// Plotting /////////////// 
bgcolor(long_signal ? color.lime : short_signal ? color.red : na, transp=30)
bgcolor(isMoving() ? dir == 1 ? color.lime : color.red : color.white , transp=80)
```

> Detail

https://www.fmz.com/strategy/442538

> Last Modified

2024-02-22 16:22:28
