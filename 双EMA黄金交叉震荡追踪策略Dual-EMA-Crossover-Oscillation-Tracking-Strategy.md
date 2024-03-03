
> Name

双EMA黄金交叉震荡追踪策略Dual-EMA-Crossover-Oscillation-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13b1d64d0343d4efbf6.png)

[trans]

### 概述

双EMA黄金交叉震荡追踪策略是一个利用EMA指标识别趋势,并在震荡行情中进行追踪的策略。该策略综合了趋势跟踪和震荡捕捉的思路,在强势行情中进行长线追踪,在震荡行情中进行短线交易,以期获得较好的收益。

### 策略原理

该策略使用20周期的EMA作为判断趋势的指标。当价格上穿EMA时,认为行情开始上涨;当价格下穿EMA时,认为行情开始下跌。

在价位上穿EMA时,以20周期highest的最高价作为止盈位,以自价格上穿EMA后low的最低价作为止损位,做多进入;在价位下穿EMA时,以20周期lowest的最低价作为止盈位,以自价格下穿EMA后high的最高价作为止损位,做空进入。

同时,策略还会判断ADX是否大于30。只有在趋势足够明确时,即ADX高于30时,才会进行交易。这可以避免在震荡行情中出现止损。

在持仓过程中, trail stop会根据市场实时情况来调整,以锁定更多利润。

### 优势分析

该策略结合了趋势跟踪和震荡交易的优点,既可以在趋势行情中获得较大利润,也可以在震荡行情中获得较稳定收益,具有较强的适应性。

EMA的应用也使得策略的参数较少,降低了过度优化的风险,从而保证了策略的稳定性。

### 风险分析

该策略主要的风险在于震荡加剧时可能出现较多的止损。这时ADX的作用就凸显出来了。当ADX值较低时,会关闭交易,避免在无明确趋势时的损失。

此外,合理设置止损点也是关键。止损点设置过大,可能增加单笔损失;止损点设置过小,则可能过于灵敏,增加止损概率。这里需要在盈利目标和止损风险之间找到平衡。

### 优化方向

该策略可以从以下几个方面进行优化:

1. EMA周期的选择。可以测试更多的EMA周期参数,找到最佳参数组合。

2. ADX的参数可进行优化。ADX周期和ADX的阈值都可以尝试不同设置。

3. 止盈止损算法可以改进,如引入动态止盈止损。

4. 可以考虑加入其他指标进行组合,如KDJ、MACD等,形成多指标验证策略。

### 总结

双EMA黄金交叉震荡追踪策略总的来说是一个非常实用的策略。它融合了趋势策略和震荡策略的特点,既可以用于长线追踪,也可以用于短线交易。通过参数优化和组合指标验证,该策略的效果还可进一步提升。它适用于对市场有一定研判能力的投资者。

||

### Overview

The Dual EMA Crossover Oscillation Tracking strategy is a strategy that identifies trends using the EMA indicator and tracks oscillations during volatile market conditions. This strategy incorporates both the concepts of trend tracking and oscillation capturing. It aims to achieve better returns by conducting long-term tracking during strong trends and short-term trading during oscillations.

### Strategy Logic  

This strategy uses the 20-period EMA as an indicator for judging trends. When the price crosses above the EMA, it signals an upward trend, and when the price crosses below, it signals a downward trend.  

When the price crosses above the EMA, a long position is entered using the highest price over the past 20 periods as the take profit and the lowest low since the crossover as the stop loss. When the price crosses below the EMA, a short position is entered using the lowest price over the past 20 periods as the take profit and the highest high since the crossover as the stop loss.

At the same time, the strategy also checks if the ADX is above 30. Trades are only taken when the trend is strong enough, i.e. when the ADX is higher than 30. This avoids stop outs during market oscillations.   

During open trades, the trailing stop continues to adjust based on market conditions to lock in more profits.

### Advantage Analysis

This strategy combines the advantages of both trend tracking and oscillation trading. It can produce higher returns during trending markets and more consistent returns during oscillations. The adaptability is strong.

The use of EMA also keeps the parameters simple, lowering the risks of overoptimization and ensuring stability. 

### Risk Analysis  

The main risk of this strategy is the possibility of more frequent stop outs during intensified oscillations. This is where the ADX comes into play. By disabling trading when ADX is low, losses in the absence of a clear trend can be avoided.

In addition, proper stop loss placement is also key. Excessively wide stops may increase single trade loss amount. Excessively tight stops may be too sensitive and increase stop out probability. A balance needs to be found between profit targets and stop loss risks.

### Optimization Directions

Possible optimizations for this strategy include:

1. Testing more EMA periods to find the optimal combination.

2. Optimizing ADX parameters including the ADX period and threshold values. 

3. Improving the profit taking and stop loss algorithms, for example by introducing dynamic stops.

4. Combining additional indicators like KDJ and MACD to create a multi-indicator confirmation system.

### Summary  

In summary, the Dual EMA Crossover Oscillation Tracking strategy is a highly practical strategy. It combines the strengths of both trend trading strategies and oscillation strategies. It can be used for both long-term tracking and short-term trading. Further improvements in performance can be achieved through parameter optimization and adding confirming indicators. It suits investors with some degree of analytical capabilities regarding market conditions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|ADX period|
|v_input_2|30|adxMin|
|v_input_3|20|emaLength|
|v_input_4|20|highPeriod|
|v_input_5|false|Custom Backtesting Dates|
|v_input_6|2018|Backtest Start Year|
|v_input_7|3|Backtest Start Month|
|v_input_8|6|Backtest Start Day|
|v_input_9|8|Backtest Start Hour|
|v_input_10|2018|Backtest Stop Year|
|v_input_11|12|Backtest Stop Month|
|v_input_12|14|Backtest Stop Day|
|v_input_13|14|Backtest Stop Hour|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-02 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("Linda Raschke's Holy Grail", shorttitle="RHG", default_qty_type = strategy.percent_of_equity, default_qty_value = 100, overlay = true)
adxlen = input(14, title="ADX period")
adxMin = input(30)
dilen = adxlen
f_highest(_src, _length)=>
    _adjusted_length = _length < 1 ? 1 : _length
    _value = _src
    for _i = 0 to (_adjusted_length-1)
        _value := _src[_i] >= _value ? _src[_i] : _value
    _return = _value

f_lowest(_src, _length)=>
    _adjusted_length = _length < 1 ? 1 : _length
    _value = _src
    for _i = 0 to (_adjusted_length-1)
        _value := _src[_i] <= _value ? _src[_i] : _value
    _return = _value

dirmov(len) =>
	up = change(high)
	down = -change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
    minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(plusDM, len) / truerange)
	minus = fixnan(100 * rma(minusDM, len) / truerange)
	[plus, minus]

adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)

emaLength = input(20)
curEma = ema(close, emaLength)
highPeriod = input(20)
d = na

takeProfitLong = highest(high, highPeriod) 
stopLossLong = f_lowest(low, barssince(low >= curEma))

if strategy.position_size == 0
    if adx(dilen, adxlen) <= adxMin or high < curEma 
        strategy.cancel("Long")
    if adx(dilen, adxlen) > adxMin and low < curEma and high > curEma and curEma > curEma[highPeriod / 2] and curEma > curEma[highPeriod] and takeProfitLong > high
        strategy.order("Long", strategy.long, stop = high)
        strategy.exit("Exit", "Long", limit = takeProfitLong, stop = stopLossLong)
        d := high

takeProfitShort = lowest(low, highPeriod) 
stopLossShort = f_highest(high, barssince(high <= curEma))

if strategy.position_size == 0
    if adx(dilen, adxlen) <= adxMin or low > curEma 
        strategy.cancel("Short")
    if adx(dilen, adxlen) > adxMin and high > curEma and low < curEma and curEma < curEma[highPeriod / 2] and curEma < curEma[highPeriod] and takeProfitShort < low
        strategy.order("Short", strategy.short, stop = low)
        strategy.exit("Exit", "Short", limit = takeProfitShort, stop = stopLossShort)
        d := low


strategy.close("Exit")

plot(d == high ? stopLossLong : d == low ? stopLossShort : na, style = circles, linewidth = 4, color = red)
plot(d == high ? takeProfitLong : d == low ? takeProfitShort : na, style = circles, linewidth = 4, color = green)
plot(d, style = circles, linewidth = 4, color = yellow)
plot(curEma, color = black, linewidth = 2)  

// === Backtesting Dates ===
testPeriodSwitch = input(false, "Custom Backtesting Dates")
testStartYear = input(2018, "Backtest Start Year")
testStartMonth = input(3, "Backtest Start Month")
testStartDay = input(6, "Backtest Start Day")
testStartHour = input(08, "Backtest Start Hour")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,testStartHour,0)
testStopYear = input(2018, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(14, "Backtest Stop Day")
testStopHour = input(14, "Backtest Stop Hour")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,testStopHour,0)
testPeriod() =>
    time >= testPeriodStart and time <= testPeriodStop ? true : false
isPeriod = testPeriodSwitch == true ? testPeriod() : true
// === /END
if not isPeriod
    strategy.cancel_all()
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/437497

> Last Modified

2024-01-03 11:38:51
