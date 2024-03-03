
> Name

基于自适应ATR止损的MACD交易策略MACD-Trading-Strategy-with-Adaptive-ATR-Stop-Loss

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用MACD指标产生交易信号,并使用基于ATR的自适应止损来控制风险。属于趋势跟踪类策略。

## 策略原理

1. MACD指标的差离值delt折线突破0轴产生买入和卖出信号。

2. 基于最近N周期的ATR计算动态止损位。ATR可以反映市场波动率。

3. 止损位随着波动率变动而自适应调整,在波动加大时止损会放宽。

4. 在持有信号时实时更新止损位,以锁定利润并控制风险。

5. 当止损位触发时退出持仓,完成风险控制。

## 优势分析

1. MACD指标对于跟踪趋势较为敏感。

2. 动态止损可以自适应市场环境,避免止损过近或过远。

3. 可视化的止损位划线,直观反映风险情况。

4. 策略规则简单清晰,容易理解实现。

5. 回撤可控,风险管理效果良好。

## 风险分析

1. MACD指标可能产生假信号导致不必要的亏损。

2. ATR参数设定不当,止损过近或过远的问题。

3. 止损过于频繁被触发的风险。

4. 趋势反转时难以及时止损。

5. 参数优化时可能存在过拟合风险。

## 优化方向

1. 测试不同参数MACD的组合,寻找最优参数。

2. 尝试其他止损方式,如追踪止损等。

3. 优化止损参数,平衡止损频率和风险控制。

4. 添加趋势判断机制,避免反转止损。

5. 考虑交易成本的影响,防止过度交易。

6. 采用滑点或增强止损确保止损生效。

## 总结

该策略基于MACD指标发信号,采用自适应ATR动态止损。具有风险可控、简单实用的特点。但MACD信号易出现误判,同时止损机制需要不断优化。整体来说,通过参数调整、优化止损策略等,可以将其打造成一个较稳健的趋势跟踪交易系统。

||


## Overview

This strategy uses the MACD indicator to generate trading signals and adaptive ATR-based stop loss to control risks. It belongs to trend following strategies.

## Strategy Logic

1. MACD delta line crossover 0 produces buy and sell signals.

2. Dynamic stop loss calculated based on recent N periods of ATR, which reflects volatility.

3. Stop loss adjusts adaptively with volatility changes, widening when volatility surges.

4. Update stop loss in real-time when in positions, to lock in profits and control risks.

5. Exit positions when stop loss is triggered to manage risks.

## Advantages

1. MACD is sensitive in tracking trends.

2. Adaptive stops fit different market environments, avoiding stops too tight or loose.

3. Visual stop lines intuitively reflect risk status. 

4. Simple and clear strategy rules, easy to understand and implement.

5. Controllable drawdowns and effective risk management.

## Risks

1. MACD may generate false signals causing unnecessary losses.

2. Improper ATR parameters lead to stops too tight or loose.

3. Risk of stops being triggered too frequently. 

4. Hard to stop out timely when trend reverses.

5. Overfitting risk when optimizing parameters.

## Enhancement

1. Test MACD parameters for optimal combination.

2. Try other stop methods like trailing stops.

3. Optimize stops to balance frequency and risk control.

4. Add trend filter to prevent reversal stops.

5. Consider trading costs impact to avoid overtrading. 

6. Use slippage or enhanced stops to ensure stops triggered.

## Conclusion

This strategy trades MACD signals with adaptive ATR dynamic stops. It features controllable risks and simplicity. But MACD signals may be false, and stops need continual optimization. Overall, with parameter tuning, stop optimization etc, it can become a robust trend following system.

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
|v_input_7|13|fastLength|
|v_input_8|30|slowlength|
|v_input_9|12|MACDLength|
|v_input_10|2|ATR Stop Period|
|v_input_11|1.25|ATR Stop Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-02-14 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("MACD BF ?", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.0)

/////////////// Time Frame ///////////////
testStartYear = input(2017, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() =>  true

///////////////  MACD  /////////////// 
fastLength = input(13) 
slowlength = input(30) 
MACDLength = input(12) 

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD

///////////////  Strategy  /////////////// 
long = crossover(delta, 0)
short = crossunder(delta, 0)

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
atrLkb = input(2, minval=1, title='ATR Stop Period')
atrMult = input(1.25, step=0.25, title='ATR Stop Multiplier') 
atr1 = atr(atrLkb)

longStop = 0.0
longStop :=  short_signal ? na : long_signal ? close - (atr1 * atrMult) : longStop[1]
shortStop = 0.0
shortStop := long_signal ? na : short_signal ? close + (atr1 * atrMult) : shortStop[1]

/////////////// Execution /////////////// 
if testPeriod()
    strategy.entry("Long", strategy.long, when=long)
    strategy.entry("Short", strategy.short, when=short)
    strategy.exit("Long SL", "Long", stop=longStop, when=since_longEntry > 0)
    strategy.exit("Short SL", "Short", stop=shortStop, when=since_shortEntry > 0)

/////////////// Plotting /////////////// 
barcolor(long ? color.lime : short ? color.red : na)
plot(strategy.position_size <= 0 ? na : longStop, title="Long Stop Loss", color=color.yellow, style=plot.style_circles, linewidth=2)
plot(strategy.position_size >= 0 ? na : shortStop, title="Short Stop Loss", color=color.orange, style=plot.style_circles, linewidth=2)
bgcolor(strategy.position_size > 0 ? color.lime : strategy.position_size < 0 ? color.red : color.white, transp=90)
bgcolor(long_signal ? color.lime : short_signal ? color.red : na, transp=60)
```

> Detail

https://www.fmz.com/strategy/427383

> Last Modified

2023-09-20 15:23:00
