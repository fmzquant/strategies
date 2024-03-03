
> Name

基于波动带震荡器的反转跟踪策略CCTBBO-Reversal-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16aa979e4245648a699.png)
[trans]

## 概述

这个策略基于史蒂夫·卡尼什(Steve Karnish)开发的CCT波动带震荡器(CCT Bollinger Band Oscillator)指标,通过识别价格突破均线并结合回撤机制来实现反转交易。

## 策略原理

该策略使用高价作为源数据,然后计算CCT波动带震荡器的值。震荡器的值在-200到200之间波动,0代表平均价格减去2倍标准差,100代表平均价格加上2倍标准差。当震荡器交叉或下穿其EMA均线时生成交易信号。具体来说,如果震荡器上穿其EMA均线,且两者之间间距大于设定的边际值,则做多;如果震荡器下穿其EMA均线,且两者之间间距小于负的设定边际值,则做空。仓位根据设定的百分比计算。此外,策略还使用回撤止损来止损,根据价格变化的百分比或跳动点数来trailing。

## 优势分析

- 使用了具有一定市场影响力的CCT波动带震荡器指标,可以减少假信号
- 结合EMA均线和边际条件过滤信号,避免在震荡过程中产生过多无效交易
- 使用回撤止损机制,可以在亏损过大时及时止损

## 风险分析 

- CCT震荡器本身会产生一定的滞后,从而错过价格反转的最佳时间点
- 边际值设置过大和EMA周期设置过短都会增加交易频率和风险 
- 回撤止损设置过于宽松会增加亏损风险

风险控制方法:

- 调整EMA均线周期,使用较长周期滤波
- 适当调整边际值以平衡风险和收益
- 降低仓位比例以控制单笔损失
- 适当缩小回撤止损范围,加快止损速度

## 优化方向

该策略可以从以下几个方面进行优化:

1. 更换其他波动指标,如布林带指标、Keltner通道等,判断买卖点
2. 增加其他过滤指标,如MACD、RSI等,确保交易信号的可靠性
3. 使用机器学习算法自动优化参数,如EMA周期、边际值等
4. 增加仓位管理机制,如固定比例仓位、马丁格尔等,控制交易风险
5. 优化回撤止损机制,使用波动止损或ATR止损等方式

## 总结

本策略整体来说是一个基于CCT波动带指标判断价格反转的量化交易策略。它有一定的优势,但也存在改进的空间。通过参数优化、增加过滤指标、使用Feature工程、引入机器学习等方式,可以进一步增强该策略的稳定性和盈利能力。

||

## Overview 

This strategy is based on the CCT Bollinger Band Oscillator (CCTBO) indicator developed by Steve Karnish. It identifies price reversals by detecting price breakouts of moving averages combined with a trailing stop mechanism.

## Strategy Logic

The strategy uses high price as the source data to calculate the value of CCTBBO. The oscillator fluctuates between -200 and 200, where 0 represents the mean price minus 2 standard deviations and 100 is the mean price plus 2 standard deviations. Trading signals are generated when the oscillator crosses over or falls below its EMA line. Specifically, when the oscillator crosses above its EMA line and the distance between them is greater than the set margin value, a long position is opened. When the oscillator falls below its EMA line and the distance is less than the negative set margin value, a short position is opened. Position size is calculated according to the set percentage. In addition, the strategy uses a trailing stop loss based on percentage price change or number of tick movements to exit positions.

## Advantage Analysis

- Uses the influential CCT Bollinger Band Oscillator indicator to reduce false signals
- Combining EMA line and margin condition filters signals to avoid excessive invalid trades during oscillations  
- Applies trailing stop loss mechanism to stop loss in a timely manner when losses are too large

## Risk Analysis

- CCT oscillator itself has some lag, thus missing the best timing for price reversals
- Excessive margin value and too short EMA period settings increase trade frequency and risk
- Trailing stop loss set too loose increases loss risk 

Risk Management:

- Adjust EMA line period, use longer period to filter
- Appropriately adjust margin value to balance risk and return
- Reduce position percentage to control single loss
- Reasonably reduce trailing stop loss range for faster stopping 

## Optimization Directions 

The strategy can be optimized in the following aspects:

1. Replace with other volatility indicators like Bollinger Bands, Keltner Channels, etc to determine entries and exits
2. Add other filtering indicators like MACD, RSI to ensure signal reliability 
3. Use machine learning algorithms to auto-optimize parameters like EMA period, margin values, etc
4. Add position sizing mechanisms like fixed fractional, Martingale to control trade risk
5. Optimize trailing stop loss mechanisms using volatility or ATR stops 

## Summary

In summary, this is a quantitative trading strategy for identifying price reversals using the CCT Bollinger Band indicator. It has certain advantages but also room for improvement. By optimizing parameters, adding filters, using Feature engineering, introducing machine learning, etc, the stability and profitability of this strategy can be further enhanced.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Stddev loopback period|
|v_input_2|2|EMA period|
|v_input_3|false|Margin|
|v_input_4_high|0|Source: high|close|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|2|Number of digits|
|v_input_6|0.013|Trailing offset (0.01 = 1%) :|
|v_input_7|false|Offset in ticks ?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-15 00:00:00
end: 2023-11-17 11:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// This strategy is based on the CCT Bollinger Band Oscillator (CCTBO) 
// developed by Steve Karnish of Cedar Creek Trading and coded by LazyBear.
// Indicator is available here https://www.tradingview.com/v/iA4XGCJW/

strategy("Strategy CCTBBO v2 | Fadior", shorttitle="Strategy CCTBBO v2", pyramiding=0, precision=2, calc_on_order_fills=false, initial_capital=1000, default_qty_type=strategy.percent_of_equity, currency="USD", default_qty_value=100, overlay=false)

length_stddev=input(title="Stddev loopback period",defval=20)
length_ema=input(title="EMA period", defval=2)
margin=input(title="Margin", defval=0, type=float, step=0.1)
price = input(title="Source", defval=high)
digits= input(title="Number of digits",defval=2,step=1,minval=2,maxval=6)
offset = input(title="Trailing offset (0.01 = 1%) :", defval=0.013, type=float, step=0.01)
pips= input(title="Offset in ticks ?",defval=false,type=bool)

src=request.security(syminfo.tickerid, "1440", price)

cctbbo=100 * ( src + 2*stdev( src, length_stddev) - sma( src, length_stddev ) ) / ( 4 * stdev( src, length_stddev ) )

ul=hline(150, color=gray, editable=true)
ll=hline(-50, color=gray)
hline(50, color=gray)
fill(ul,ll, color=green, transp=90)
plot(style=line, series=cctbbo, color=blue, linewidth=2)
plot(ema(cctbbo, length_ema), color=red)

d = digits == 2 ? 100 : digits == 3 ? 1000 : digits == 4 ? 10000 : digits == 5 ? 100000 : digits == 6 ? 1000000 : na

TS = 1
TO = pips ? offset : close*offset*d
CQ = 100
TSP = TS
TOP = (TO > 0) ? TO : na

longCondition = crossover(cctbbo, ema(cctbbo, length_ema)) and cctbbo - ema(cctbbo, length_ema) > margin
if (longCondition)
    strategy.entry("Long", strategy.long)
    strategy.exit("Close Long", "Long", qty_percent=CQ, trail_points=TSP, trail_offset=TOP)


shortCondition = crossunder(cctbbo, ema(cctbbo, length_ema)) and cctbbo - ema(cctbbo, length_ema) < -margin
if (shortCondition)
    strategy.entry("Short", strategy.short)
    strategy.exit("Close Short", "Short", qty_percent=CQ, trail_points=TSP, trail_offset=TOP)
    
    
```

> Detail

https://www.fmz.com/strategy/432988

> Last Modified

2023-11-23 13:42:03
