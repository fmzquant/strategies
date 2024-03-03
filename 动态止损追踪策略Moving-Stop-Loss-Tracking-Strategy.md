
> Name

动态止损追踪策略Moving-Stop-Loss-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1106796096d688de581.png)
[trans]

### 概述

该策略采用Stoch指标进行入场信号判断,在进场后会实时追踪价格新高或者新低,从而动态调整止损位。同时,策略还会通过alert功能,将止损修改的信息发送到MT4/MT5,以实时调整真实交易中的头寸。

### 策略原理

1. 该策略基于Stoch指标产生买入和卖出信号,当Stoch的K线从下方向上突破D线时产生买入信号;当Stoch的K线从上方向下突破D线时产生卖出信号。

2. 在进场后,策略会实时追踪最低价的最新低点和最高价的最新高点,作为动态的止损位。具体来说,对于做多单,会追踪最低价的最近低点作为止损位;对于做空单,会追踪最高价的最近高点作为止损位。

3. 当检测到止损位发生变化时,策略会通过alert功能生成修改止损指令,发送到MT4/MT5以实时调整真实交易中的止损位。同时绘制图形标注以直观显示止损变化。

4. 该策略支持手动控制是否启用动态止损机制。启用后,可以根据市场波动实时调整止损追踪价格。

### 优势分析

1. 采用动态追踪止损机制,可以根据市场波动灵活调整止损位,实现止损追踪,有效控制风险。

2. 利用alert功能可将止损调整信息实时发送到MT4/MT5,实现自动化管理,无需人工干预。

3. 直观地在图形上标注止损调整信息,便于查看和验证止损追踪效果。

4. 支持手动控制是否启用止损追踪机制,灵活适应不同市场条件。

5. 结合Stoch指标判断时机,可以有效过滤假突破,提高策略稳定性。

### 风险分析

1. Stoch指标可能出现频繁交叉信号,带来更多无效操作的风险。可以适当调整参数以过滤信号。

2. 在极端行情中,止损可能被突破,无法完全规避巨额亏损的风险。应适时监控头寸风险。

3. alert连接可能出现中断、延迟等问题,无法实时反馈调整结果,需要做好容错处理。

4. 动态追踪止损需要相对密集的调整,可能带来更多交易成本。应平衡调整幅度与成本。

### 优化方向

1. 可以测试不同参数组合优化Stoch指标,获得更好的信号质量和策略效果。

2. 可以结合其他指标过滤信号或确定调整幅度,优化止损机制改善策略稳定性。

3. 可以研究不同的追踪算法,在降低调整频率的同时保证止损效果。

4. 可以优化与MT4/MT5的连接方式,确保alert及时高效,减少延迟问题。

5. 可以引入自动止损模式和手动模式切换,不同市场条件使用不同止损机制。


### 总结

本策略首先基于Stoch指标判断买卖时机,然后在持仓期间实时追踪价格波动调整止损位,通过alert指令自动化下发调整信息。这种动态止损机制可以根据市场变化主动管理头寸风险,并减少人工干预提高效率。同时直观的止损调整标记也便于监控。该策略可以进一步优化信号过滤和止损算法提高盈利空间。总体而言,动态止损追踪策略适合用于跟踪多变的市场,自动化调整头寸风险。

||

### Overview

This strategy uses the Stoch indicator to generate entry signals. After entering a position, it will track new highs or lows in real time to dynamically adjust the stop loss. At the same time, the strategy will also send stop loss modification information to MT4/MT5 through the alert function to adjust positions in real trading.

### Strategy Principle 

1. The strategy generates buy and sell signals based on the Stoch indicator. When the Stoch K line crosses above the D line from below, a buy signal is generated. When the K line crosses below the D line from above, a sell signal is generated.

2. After entering a position, the strategy tracks the latest low of the lowest price and the latest high of the highest price in real time as dynamic stop loss levels. Specifically, for long positions, the most recent low point of the lowest price is tracked as the stop loss level. For short positions, the most recent high point of the highest price is tracked as the stop loss level.

3. When a change in the stop loss level is detected, the strategy generates a modify stop loss order via the alert function and sends it to MT4/MT5 to adjust the stop loss level of actual trades in real time. Graphic annotations are also plotted for intuitive display of stop loss changes.

4. This strategy supports manually controlling whether to enable the dynamic stop loss mechanism. When enabled, stop losses can be adjusted in real time according to market fluctuations.

### Advantage Analysis

1. The dynamic trailing stop loss mechanism can flexibly adjust stop loss levels according to market fluctuations to effectively control risks.  

2. The alert function enables real-time sending of stop loss adjustment information to MT4/MT5 for automated management without manual intervention.

3. The visual annotations of stop loss adjustments on the chart facilitate view and verification of trailing stop loss effects.  

4. Support for manually controlling the stop loss trailing mechanism allows flexible adaptation to different market conditions.

5. Combined with the Stoch indicator to determine opportunity, the strategy can effectively filter false breakouts and improve stability.

### Risk Analysis

1. The Stoch indicator may generate frequent crossover signals, introducing the risk of more ineffective operations. Parameters can be adjusted to filter signals.

2. In extreme market conditions, stop losses could be penetrated, unable to completely avoid huge losses. Positions risks should be monitored in a timely manner.

3. Alert connection issues like interruptions and delays may occur, preventing real-time feedback of adjustments. Proper fault tolerance measures need to be in place. 

4. The dynamic trailing stop loss requires relatively frequent adjustments, potentially incurring higher trading costs. The adjustment range should be balanced against costs.

### Optimization Directions

1. Different parameter combinations can be tested to optimize the Stoch indicator for better signal quality and strategy performance.

2. Other indicators can be combined to filter signals or determine adjustment ranges to improve strategy stability. 

3. Different tracking algorithms can be studied to reduce adjustment frequency while ensuring stop loss effects.

4. The connection methods with MT4/MT5 can be enhanced to ensure timely and efficient alerts and minimize delays.

5. Automatic and manual stop loss modes can be introduced for using different mechanisms under different market conditions.


### Summary

This strategy first determines trading opportunities based on the Stoch indicator, then tracks price fluctuations during positions to dynamically adjust stop losses and automatically issues adjustment information via alert orders. Such a dynamic mechanism enables active position risk management according to market changes with less manual intervention. Meanwhile, the intuitive stop loss annotations also facilitate monitoring. Further optimizations on signal filtering and trailing algorithms can improve profitability. Overall, the dynamic trailing stop loss strategy is suitable for tracking volatile markets and automated position risk management.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|400|TakeProfitLevel|
|v_input_2|true|Enable Stoploss Modification Mechanism|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-27 00:00:00
end: 2024-01-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Peter_O

//@version=4
strategy(title="Moving Stop-Loss mechanism", overlay=true)

// This script was created for educational purposes only and it is a spin-off of my previous script:
// https://www.tradingview.com/script/9MJO3AgE-TradingView-Alerts-to-MT4-MT5-dynamic-variables-NON-REPAINTING/
// This spin-off adds very often requested Moving Stop-Loss Mechanism - the logic here moves the stop-loss each time 
// a new pivot is detected.
//
// Last lines of the script include alert() function calls, with a syntax compatible with TradingConnector
// for execution in Forex/indices/commodities/crypto markets via MetaTrader.
// Please note that "tradeid=" variable must be passed with each alert, so that MetaTrader knows which
// trade to modify.

TakeProfitLevel=input(400)

// **** Entries logic, based on Stoch **** {
periodK = 13 //input(13, title="K", minval=1)
periodD = 3 //input(3, title="D", minval=1)
smoothK = 4 //input(4, title="Smooth", minval=1)
k = sma(stoch(close, high, low, periodK), smoothK)
d = sma(k, periodD)

GoLong=crossover(k,d) and k<80
GoShort=crossunder(k,d) and k>20
// } End of entries logic

// **** Pivot-points and stop-loss logic **** {
piv_high = pivothigh(high,1,1)
piv_low = pivotlow(low,1,1)
var float stoploss_long=low
var float stoploss_short=high

pl=valuewhen(piv_low,piv_low,0)
ph=valuewhen(piv_high,piv_high,0)

if GoLong 
    stoploss_long := low<pl ? low : pl
if GoShort 
    stoploss_short := high>ph ? high : ph

plot(stoploss_long, color=color.red, title="stoploss_long")
plot(stoploss_short, color=color.lime, title="stoploss_short")

// Stop-Loss Updating mechanism
enable_stoploss_mechanism=input(true, title="Enable Stoploss Modification Mechanism")
UpdateLongStopLoss = strategy.position_size>0 and strategy.position_size[1]>0 and piv_low and pl!=stoploss_long and not GoLong and enable_stoploss_mechanism
UpdateShortStopLoss = strategy.position_size<0 and strategy.position_size[1]<0 and piv_high and ph!=stoploss_short and not GoShort and enable_stoploss_mechanism
if UpdateLongStopLoss
    stoploss_long := pl
if UpdateShortStopLoss
    stoploss_short := ph

plotshape(UpdateLongStopLoss ? stoploss_long[1]-300*syminfo.mintick : na, location=location.absolute, style=shape.labelup, color=color.lime, textcolor=color.white, text="SL\nmove")
plotshape(UpdateShortStopLoss ? stoploss_short[1]+300*syminfo.mintick : na, location=location.absolute, style=shape.labeldown, color=color.red, textcolor=color.black, text="SL\nmove")
// } End of Pivot-points and stop-loss logic

// **** Trade counter **** {
var int trade_id=0
if GoLong or GoShort
    trade_id:=trade_id+1
// } End of Trade counter

strategy.entry("Long", strategy.long, when=GoLong)
strategy.exit("XLong", from_entry="Long", stop=stoploss_long, profit=TakeProfitLevel)
strategy.entry("Short", strategy.short, when=GoShort)
strategy.exit("XShort", from_entry="Short", stop=stoploss_short, profit=TakeProfitLevel)

if GoLong
    alertsyntax_golong='long slprice=' + tostring(stoploss_long) + ' tradeid=' + tostring(trade_id) + ' tp=' + tostring(TakeProfitLevel)
    alert(message=alertsyntax_golong, freq=alert.freq_once_per_bar_close)
if GoShort
    alertsyntax_goshort='short slprice=' + tostring(stoploss_short) + ' tradeid=' + tostring(trade_id) + ' tp=' + tostring(TakeProfitLevel)
    alert(message=alertsyntax_goshort, freq=alert.freq_once_per_bar_close)
if UpdateLongStopLoss
    alertsyntax_updatelongstoploss='slmod slprice=' + tostring(stoploss_long) + ' tradeid=' + tostring(trade_id)
    alert(message=alertsyntax_updatelongstoploss, freq=alert.freq_once_per_bar_close)
if UpdateShortStopLoss
    alertsyntax_updateshortstoploss='slmod slprice=' + tostring(stoploss_short) + ' tradeid=' + tostring(trade_id)
    alert(message=alertsyntax_updateshortstoploss, freq=alert.freq_once_per_bar_close)

```

> Detail

https://www.fmz.com/strategy/437543

> Last Modified

2024-01-03 16:15:29
