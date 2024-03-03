
> Name

双动量指标突破策略Dual-Momentum-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/eb869bd3df154dac3d.png)

[trans]

## 概述

该策略是一种双动量指标突破策略。它使用两个不同参数设置的动量指标,在两个动量指标都突破零轴时产生交易信号。该策略只做多头 entries,空头仅用于平仓。

## 策略原理

代码首先设置策略属性,如委托模式、手续费模式等。然后它计算两个动量指标:

```pine
// Momentum settings

i_len           = input(defval = 12, title = "Length", minval = 1) 
i_src           = input(defval = close, title = "Source")
i_percent       = input(defval = true, title = "Percent?")
i_mom           = input(defval = "MOM2", title = "MOM Choice", options = ["MOM1", "MOM2"])

// Momentum code

mom0 = momentum(i_src, i_len, i_percent) 
mom1 = momentum(mom0, 1, i_percent)
mom2 = momentum(i_src, 1, i_percent)

momX = mom1 

if i_mom == "MOM2"
    momX := mom2
```

mom0是基础动量指标,长度为i_len,数据源为i_src,是否计算百分比由i_percent决定。

mom1是以mom0为数据源,长度为1的动量指标。

mom2是以原始数据i_src为源,长度为1的动量指标。

最终使用的动量指标momX默认为mom1,也可以选择mom2。

当mom0和momX同时超过0轴时,做多;当mom0和momX同时低于0轴时,平仓。

## 策略优势

1. 使用双动量指标结合不同参数设置,可以提高交易信号的可靠性,双重确认降低了假信号。

2. 只做多头entries,空头仅用于平仓,可以降低交易频率,减少交易成本。

3. 动量指标参数可以调整,适应不同市场环境。

4. 代码结构清晰,容易理解和修改。

5. 加入了交易消息设置,可以结合自动交易系统使用。

## 策略风险

1. 双动量指标虽然可以减少假信号,但也可能错过较弱的趋势信号。

2. 仅做多头交易,可能错过空头交易机会。 

3. 动量指标参数设置不当可能导致过于频繁或过于迟缓的交易。

4. 回测数据不充分可能导致参数过拟合。

5. 双重确认虽降低假信号但无法完全避免,实盘交易时仍需关注突破有效性。

## 策略优化方向

1. 可以测试不同长度以及是否计算百分比的参数组合,找出最佳参数。

2. 可以考虑在趋势确认后,加入空头交易信号,以捕捉更多交易机会。

3. 可以测试不同的动量指标计算方式,如ROC,RSI等,寻找更好的效果。 

4. 可以结合趋势过滤,避免在震荡行情中交易。

5. 可以优化止损策略,在利润最大化的同时控制风险。

## 总结

本策略是一个典型的双动量指标突破策略。它使用双重确认降低假信号,只做多头进入以减少交易频率。该策略优点是简单明了,容易实现,在参数优化和风险控制时有很大的改进空间。整体来说,本策略作为动量突破策略的基础框架是可行的,但需要针对具体市场进行优化调整,才能在实盘中稳定盈利。
||

## Overview

This is a dual momentum breakout strategy. It uses two momentum indicators with different parameter settings and generates trading signals when both momentum indicators break through the zero line. The strategy only takes long entries and shorts are only used for exiting positions.

## Strategy Logic

The code first sets strategy properties like order type, commission scheme etc. Then it calculates two momentum indicators:

```pine
// Momentum settings
****
i_len           = input(defval = 12, title = "Length", minval = 1)
i_src           = input(defval = close, title = "Source")  
i_percent       = input(defval = true, title = "Percent?")
i_mom           = input(defval = "MOM2", title = "MOM Choice", options = ["MOM1", "MOM2"])

// Momentum code 

mom0 = momentum(i_src, i_len, i_percent)
mom1 = momentum(mom0, 1, i_percent) 
mom2 = momentum(i_src, 1, i_percent)

momX = mom1   

if i_mom == "MOM2"
    momX := mom2
```

mom0 is the base momentum indicator with length i_len, data source i_src, whether to calculate percentage is decided by i_percent.

mom1 is the momentum indicator with mom0 as data source and length 1.

mom2 is the momentum indicator with original data i_src as source and length 1.

The final momentum indicator momX defaults to mom1, can also choose mom2.

When mom0 and momX both breach above 0 line, go long. When mom0 and momX both breach below 0 line, close position.

## Advantages of the Strategy

1. Using dual momentum indicators with different settings improves signal reliability with double confirmation and fewer false signals.

2. Only taking long entries and using shorts for exits lowers trade frequency and reduces transaction costs.

3. Flexible momentum parameter adjustments suit different market environments. 

4. Clean code structure, easy to understand and modify.

5. Trade messages enabled, integrates well with auto trading systems.

## Risks of the Strategy

1. Dual momentum may miss weaker trend signals while reducing false signals.

2. Missing short trade opportunities with only long entries.

3. Improper momentum parameter settings lead to over-trading or delayed signals.

4. Insufficient backtest data causes parameter overfitting. 

5. Double confirmation reduces but does not eliminate false signals, need to watch for validity in live trading.

## Optimization Directions

1. Test combinations of length and percentage parameters to find optimum.

2. Consider adding short trade signals after trend confirmation to capture more trades.

3. Test different momentum calculations like ROC, RSI etc for better results.

4. Add trend filtering to avoid whipsaw markets.

5. Optimize stop loss for maximum profitability within risk limits.

## Conclusion

This is a typical dual momentum breakout strategy. It uses double confirmation to reduce false signals and only long entries to lower trade frequency. The advantages are simplicity and ease of implementation, with much room for improvements in parameter optimization and risk control. Overall it serves as a reasonable momentum breakout framework but needs market-specific tuning and optimizations for profitable live trading.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|timestamp(2021-01-02T00:00:00)|Start Date|
|v_input_2|timestamp(2021-12-31T00:00:00)|End Date|
|v_input_3|12|Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|true|Percent?|
|v_input_6|0|MOM Choice: MOM2|MOM1|
|v_input_7|{{strategy.order.alert_message}}|Buy message|
|v_input_8|{{strategy.order.alert_message}}|Sell message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-16 00:00:00
end: 2023-11-15 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Momentum Long Strategy", overlay = false, precision = 2, initial_capital = 10000, default_qty_value = 10000, default_qty_type = strategy.cash, commission_type = strategy.commission.percent, commission_value = 0, calc_on_every_tick = true)

// There will be no short entries, only exits from long.
strategy.risk.allow_entry_in(strategy.direction.long)

// Calculate start/end date and time condition
startDate  = input(timestamp("2021-01-02T00:00:00"), title = "Start Date", type = input.time)
finishDate = input(timestamp("2021-12-31T00:00:00"), title = "End Date",type = input.time)
 
time_cond  =true

// Momentum settings

i_len           =       input(defval = 12,      title = "Length",       minval = 1)
i_src           =       input(defval = close,   title = "Source")
i_percent       =       input(defval = true,    title = "Percent?")
i_mom           =       input(defval = "MOM2",  title = "MOM Choice",   options = ["MOM1", "MOM2"])

// Messages for buy and sell
message_buy  = input("{{strategy.order.alert_message}}", title="Buy message")
message_sell = input("{{strategy.order.alert_message}}", title="Sell message")

// Momentum code

momentum(seria, length, percent) =>
	_mom        =       percent ? ( (seria / seria[length]) - 1) * 100 : seria - seria[length]
	_mom

mom0        =       momentum(i_src, i_len, i_percent)
mom1        =       momentum(mom0, 1, i_percent)
mom2        =       momentum(i_src, 1, i_percent)

momX        =       mom1

if i_mom == "MOM2"
    momX    :=     mom2
    
// Strategy Alerts    

if (mom0 > 0 and momX > 0 and time_cond)
    strategy.entry("MomLE", strategy.long, stop = high + syminfo.mintick, comment = "MomLE", alert_message = message_buy)
else
	strategy.cancel("MomLE")
if (mom0 < 0 and momX < 0 and time_cond)
	strategy.entry("MomExit", strategy.short, stop = low - syminfo.mintick, comment = "MomSE", alert_message = message_sell)
else
	strategy.cancel("MomExit")
	
// Plotting

plot(0, color = #5d606b, title = "ZERO")
plot(mom0, color = #00bcd4, title = "MOM")
plot(mom1, color = #00FF00, title = "MOM1", display = display.none)
plot(mom2, color = #00FF00, title = "MOM2")
```

> Detail

https://www.fmz.com/strategy/432349

> Last Modified

2023-12-01 14:59:44
