
> Name

速慢双均线交易策略Fast-Slow-Dual-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16bc8720e7184c40b7b.png)
[trans]


## 概述

双均线交易策略通过计算快速移动平均线和慢速移动平均线,并根据两条移动平均线的交叉情况来产生交易信号。当快速移动平均线上穿慢速移动平均线时,采取多头策略;当快速移动平均线下穿慢速移动平均线时,采取空头策略。该策略既可以用于趋势交易,也可以用于逆势交易。

## 策略原理

该策略首先设置快速移动平均线的长度maFastLength和慢速移动平均线的长度maSlowLength。然后计算快速移动平均线fastMA和慢速移动平均线slowMA。快速移动平均线反应价格变化更加敏感,可以用来判断当前趋势;慢速移动平均线对价格变化反应更慢,可以用来判断趋势方向。 

当快速移动平均线上穿慢速移动平均线时,采取做多策略,产生goLong()信号。当快速移动平均线下穿慢速移动平均线时,平仓做多头,产生killLong()信号。

可以选择仅做多策略longonly,仅做空策略shorting,或双向交易swapping。

做多策略时,在goLong()信号发出时开仓做多;在killLong()信号发出时平仓。

做空策略时,在killLong()信号发出时开仓做空;在goLong()信号发出时平仓。 

双向交易时,在goLong()信号发出时开多仓;在killLong()信号发出时平多仓并开空仓。

此外,策略还设置了止损、追踪止损、交易消息提示等功能,可以灵活选择是否使用。

## 策略优势

1. 策略简单易懂,容易实施。

2. 可以自由选择做多、做空或双向交易。

3. 可以灵活选择是否使用止损、追踪止损等风险管理功能。

4. 可以自定义交易消息,实时提示交易行为。

5. 快慢均线策略对市场趋势变化敏感,可以抓住较强的趋势。

6. 策略参数可调整,可以针对不同市场调整参数,适应性强。

## 策略风险

1. 当市场不具有明显趋势时,可能出现较多虚假信号,引发过度交易。

2. 均线系统对突发事件反应不敏感,可能错过突发性机会。

3. 需要合理选择均线参数,参数选择不当可能影响策略效果。

4. 需要严格遵守策略信号,避免出现随意裁量交易。

5. 需要关注交易成本对策略盈利能力的影响。

## 策略优化方向 

1. 可以引入其他指标如RSI等来验证交易信号,避免发出错误信号。

2. 可以设置参数优化功能,自动寻找最优参数组合。

3. 可以设置动态止损来锁定盈利,并适时调整止损点。

4. 可以加入机器学习模型来辅助判断趋势方向。

5. 可以优化消息提示功能,使其更符合自身交易习惯。

## 总结

双均线交易策略整体来说较为简单实用,对市场趋势变化较为敏感,可以捕捉较强趋势带来的交易机会。但也需要注意防范无趋势市场的误交易,并适当调整参数来适应不同市场环境。此外,适当加入辅助技术指标及优化功能可以进一步增强策略的稳定性和适应性。

||


## Overview

The dual moving average trading strategy generates trading signals by calculating fast and slow moving averages and watching for crosses. When the fast moving average crosses above the slow moving average, a long position is taken. When the fast moving average crosses below the slow moving average, a short position is taken. The strategy can be used for both trend trading and countertrend trading.

## Strategy Logic

The strategy first sets the lengths of the fast moving average maFastLength and the slow moving average maSlowLength. It then calculates the fast moving average fastMA and the slow moving average slowMA. The fast moving average reacts more quickly to price changes and is used to judge the current trend, while the slow moving average reacts more slowly and is used to determine the direction of the trend.

When the fast moving average crosses above the slow moving average, a long entry signal goLong() is generated. When the fast moving average crosses below the slow moving average, existing long positions are closed with the killLong() signal.

The strategy can be set to long only, short only, or allow both long and short trades. 

In long only mode, long positions are entered on the goLong() signal and exited on the killLong() signal.

In short only mode, short positions are entered on the killLong() signal and exited on the goLong() signal.

In swapping mode, long positions are entered on goLong(), closed and reversed to short on killLong().

The strategy also includes stop loss, trailing stop, messaging and other optional features.

## Advantages

1. Simple and easy to implement.

2. Flexibility to go long, short or both. 

3. Optional stop loss and trailing stop features.

4. Customizable messaging to alert trades.

5. Sensitive to trend changes in the market.

6. Adjustable parameters adapt to different markets.

## Risks

1. Can generate excessive trades in choppy or ranging markets.

2. Slow to react to sudden news events. 

3. Parameter selection impacts strategy performance.

4. Must follow signals strictly, avoid discretionary trading.

5. Trading costs can erode profits if not considered.

## Enhancements

1. Add filters like RSI to avoid false signals.

2. Implement parameter optimization to find best settings.

3. Use dynamic stops to lock in profits and adjust.

4. Incorporate machine learning to aid trend prediction. 

5. Optimize messaging for individual trading habits.

## Conclusion

The dual moving average strategy is relatively simple and useful for catching strong trends. However, care should be taken to avoid whipsaws in low trend environments. Fine tuning parameters and adding auxiliary indicators or enhancements can further improve robustness and adaptability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Fast MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|3|Fast MA Period|
|v_input_3_close|0|Slow MA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|9|Slow MA Period|
|v_input_5|false|Short only?|
|v_input_6|true|Long only?|
|v_input_7|false|Swap orders?|
|v_input_8|false|Use Initial Stop Loss?|
|v_input_9|25|Initial Stop Loss Points|
|v_input_10|false|Use Trailing Stop?|
|v_input_11|120|Trail Points|
|v_input_12|false|Use Offset For Trailing Stop?|
|v_input_13|20|Trail Offset Points|
|v_input_14|Long entry message|Long entry message|
|v_input_15|Long exit message|Long exit message|
|v_input_16|Short entry message|Short entry message|
|v_input_17|Short exit message|Short exit message|
|v_input_18|timestamp(2021-01-01T00:00:00)|startDate|
|v_input_19|timestamp(2021-12-31T00:00:00)|finishDate|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-20 00:00:00
end: 2023-10-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

strategy("SMA Strategy", shorttitle="SMA Strategy", overlay=true, pyramiding=0, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// === Inputs ===
// short ma
maFastSource = input(defval=close, title="Fast MA Source")
maFastLength = input(defval=3, title="Fast MA Period", minval=1)

// long ma
maSlowSource = input(defval=close, title="Slow MA Source")
maSlowLength = input(defval=9, title="Slow MA Period", minval=1)

// Trade direction
shorting = input(defval=false, title="Short only?")
longonly = input(defval=true, title="Long only?")
swapping = input(defval=false, title="Swap orders?")
// risk management
useStop = input(defval=false, title="Use Initial Stop Loss?")
slPoints = input(defval=25, title="Initial Stop Loss Points", minval=1)
useTS = input(defval=false, title="Use Trailing Stop?")
tslPoints = input(defval=120, title="Trail Points", minval=1)
useTSO = input(defval=false, title="Use Offset For Trailing Stop?")
tslOffset = input(defval=20, title="Trail Offset Points", minval=1)

// Messages for buy and sell
message_long_entry  = input("Long entry message", title="Long entry message")
message_long_exit   = input("Long exit message", title="Long exit message")
message_short_entry = input("Short entry message", title="Short entry message")
message_short_exit  = input("Short exit message", title="Short exit message")

// Calculate start/end date and time condition
startDate  = input(timestamp("2021-01-01T00:00:00"), type = input.time)
finishDate = input(timestamp("2021-12-31T00:00:00"), type = input.time)
 
time_cond  = true
// === Vars and Series ===
fastMA = sma(maFastSource, maFastLength)
slowMA = sma(maSlowSource, maSlowLength)

plot(fastMA, color=color.blue)
plot(slowMA, color=color.purple)

goLong() =>
    crossover(fastMA, slowMA)
killLong() =>
    crossunder(fastMA, slowMA)
    
// Long only
if longonly
    strategy.entry("Buy", strategy.long, when=goLong() and time_cond, alert_message = message_long_entry)
    strategy.close("Buy", when=killLong() and time_cond, alert_message = message_long_exit)

// Short only
if shorting
    strategy.entry("Sell", strategy.short, when=killLong() and time_cond, alert_message = message_short_entry)
    strategy.close("Sell", when=goLong() and time_cond, alert_message = message_short_exit)
    
// Order Swapping
if swapping
    strategy.entry("Buy", strategy.long, when=goLong() and time_cond, alert_message = message_long_entry)
    strategy.entry("Sell", strategy.short, when=killLong() and time_cond, alert_message = message_short_entry)

if useStop
    strategy.exit("XLS", from_entry="Buy", stop=strategy.position_avg_price / 1.08, alert_message = message_long_exit)
    strategy.exit("XSS", from_entry="Sell", stop=strategy.position_avg_price * 1.08, alert_message = message_short_exit)


```

> Detail

https://www.fmz.com/strategy/430377

> Last Modified

2023-10-27 16:41:24
