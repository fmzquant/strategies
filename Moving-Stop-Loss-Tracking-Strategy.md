
> Name

Moving-Stop-Loss-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1106796096d688de581.png)

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
