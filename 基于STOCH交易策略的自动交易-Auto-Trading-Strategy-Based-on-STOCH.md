
> Name

基于STOCH交易策略的自动交易-Auto-Trading-Strategy-Based-on-STOCH

> Author

ChaoZhang

> Strategy Description



This strategy designs a simple auto trading system based on the STOCH indicator. It is suitable for Forex, stock indices, commodities and can be extended to stocks and crypto markets.

## Strategy Overview

This strategy identifies overbought and oversold statuses using the STOCH indicator combined with PIVOT points to set stop loss positions, realizing trend following. It goes long or short when the STOCH indicator shows overbought or oversold signals. Stop loss points are set near the PIVOT points of the day to effectively control risks. Partial take profit points are set to close partial positions after certain profit level.

## Strategy Logic

This strategy utilizes the crossing of %K and %D lines of the STOCH indicator to generate long and short signals. Specifically, when the %K line crosses above the %D line, it will go long. When the %K line crosses below the %D line, it will go short. This captures the overbought and oversold statuses.

To control risks, the long stop loss point is set near the daily lowest PIVOT point and the short stop loss point is set near the daily highest PIVOT point. This effectively locks in the risks. 

For partial take profit, it closes 50% of the position after a certain profit level after opening the position. This optimizes capital utilization efficiency.

In summary, this strategy Captures overbought and oversold points appropriately; Controls risks using stop loss; and Optimizes capital usage efficiency. It combines Capture, Control and Optimize organically.

## Strategy Strengths

- Using the STOCH indicator effectively captures overbought and oversold statuses. With PIVOT points, it controls risks comprehensively.

- The partial take profit mechanism optimizes capital usage efficiency. Partial closing ensures some profit while retaining room for further gains.

- Customizable parameters allow flexibility based on market conditions and risk preference.

- Simple and clear logic, easy to understand and master for all traders. Clean code facilitates modifications and maintenance. 


## Strategy Risks

- As a trend following strategy, it may get stuck in range-bound markets and fail to profit.

- STOCH may generate false signals, causing unnecessary trades. Proper signal filtering is needed to avoid unwanted trades.

- Stop loss near pivot points may be too close after breakouts. Widen stop loss distance properly.

- Some parameters like period may need adjustments for different markets, otherwise it affects strategy performance.

- Backtest only relies on historical data. Cannot guarantee future performance. More uncontrollable factors in live trading.

- Auto trading systems require stable connections to avoid trade execution issues.

## Strategy Optimization

- Add trend filter to avoid trading without clear trends. Such as using MA to determine trend direction.

- Add volume analysis to detect false breakouts and avoid traps. E.g. bullish/bearish volume.

- Adjust parameters like STOCH inputs based on different products and timeframes to optimize performance.

- Consider machine learning algorithms to train models using big data and auto-optimize parameters.

- Set profit factor ratio to introduce risk control and avoid huge losing trades.

- Add more filters like trading conditions, fundamentals to improve win rate.

## Conclusion

This strategy adopts a simple and intuitive trend following approach based on the STOCH indicator to identify overbought/oversold points. With PIVOT stop loss to control risk and partial take profit to optimize capital efficiency. The design covers Capture, Control and Optimize. The logic is simple and customizable. But it also has some risks and can be further optimized. Continuous testing and improvement in live trading is crucial for steady profitability.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|400|TakeProfitLevel|
|v_input_2|150|TakePartialProfitLevel|
|v_input_3|13|K|
|v_input_4|3|D|
|v_input_5|4|Smooth|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Peter_O

//@version=4
// strategy(title="TradingView Alerts to MT4 MT5 - Forex, indices, commodities, stocks, crypto", commission_type=strategy.commission.cash_per_contract, commission_value=0.00003, overlay=false, default_qty_value=20000, initial_capital=1000)
//
// This script was created for educational purposes only.
// It is showing how to use Alerts-Straight-From-Strategies and
// dynamic variables in TradingView alerts.
// And how to auto-execute them in Forex, indices, commodities markets
// 
// (This method will also work with stocks and crypto - anything your 
// broker is offering via their MT4/MT5 platform).
 
TakeProfitLevel=input(400)
TakePartialProfitLevel=input(150)

// **** Entries logic **** {
periodK = input(13, title="K", minval=1)
periodD = input(3, title="D", minval=1)
smoothK = input(4, title="Smooth", minval=1)
k = sma(stoch(close, high, low, periodK), smoothK)
d = sma(k, periodD)
plot(k, title="%K", color=color.blue)
plot(d, title="%D", color=color.orange)
h0 = hline(80)
h1 = hline(20)
fill(h0, h1, color=color.purple, transp=75)

GoLong=crossover(k,d) and k<80 and year>2009
GoShort=crossunder(k,d) and k>20 and year>2009

AlertTest=open>close or open<close or open==close
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
// } End of Pivot-points and stop-loss logic

// **** Trade counter and partial closing mechanism **** {
var int trade_id=0
if GoLong or GoShort
    trade_id:=trade_id+1

TakePartialProfitLong = barssince(GoLong)<barssince(GoShort) and crossover(high,(valuewhen(GoLong,close,0)+TakePartialProfitLevel*syminfo.mintick))
TakePartialProfitShort = barssince(GoLong)>barssince(GoShort) and crossunder(low,(valuewhen(GoShort,close,0)-TakePartialProfitLevel*syminfo.mintick))
// } End of Trade counter and partial closing mechanism

strategy.entry("Long", strategy.long, when=GoLong)
strategy.exit("XPartLong", from_entry="Long", qty_percent=50, profit=TakePartialProfitLevel)
strategy.exit("XLong", from_entry="Long", stop=stoploss_long, profit=TakeProfitLevel)
strategy.entry("Short", strategy.short, when=GoShort)
strategy.exit("XPartShort", from_entry="Short", qty_percent=50, profit=TakePartialProfitLevel)
strategy.exit("XShort", from_entry="Short", stop=stoploss_short, profit=TakeProfitLevel)

if GoLong
    alertsyntax_golong='long slprice=' + tostring(stoploss_long) + ' tradeid=' + tostring(trade_id) + ' tp=' + tostring(TakeProfitLevel)
    alert(message=alertsyntax_golong, freq=alert.freq_once_per_bar_close)
if GoShort
    alertsyntax_goshort='short slprice=' + tostring(stoploss_short) + ' tradeid=' + tostring(trade_id) + ' tp=' + tostring(TakeProfitLevel)
    alert(message=alertsyntax_goshort, freq=alert.freq_once_per_bar_close)
if TakePartialProfitLong
    alertsyntax_closepartlong='closepart tradeid=' + tostring(trade_id) + ' part=0.5'
    alert(message=alertsyntax_closepartlong, freq=alert.freq_once_per_bar_close)
if TakePartialProfitShort
    alertsyntax_closepartshort='closepart tradeid=' + tostring(trade_id) + ' part=0.5'
    alert(message=alertsyntax_closepartshort, freq=alert.freq_once_per_bar_close)

```

> Detail

https://www.fmz.com/strategy/428066

> Last Modified

2023-09-28 11:38:44
