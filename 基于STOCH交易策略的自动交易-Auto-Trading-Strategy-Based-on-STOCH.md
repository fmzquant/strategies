
> Name

基于STOCH交易策略的自动交易-Auto-Trading-Strategy-Based-on-STOCH

> Author

ChaoZhang

> Strategy Description

[trans]


本策略基于STOCH指标设计了一个简单的自动交易系统。该策略适合外汇,股票指数,大宗商品等市场,也可扩展至股票和加密货币市场。

## 策略概述

该策略使用STOCH指标识别超买超卖状态,结合PIVOT点设定止损位置,实现趋势跟踪。当STOCH指标显示超买超卖时,进行做多做空操作;止损点设在当日PIVOT点附近,可有效控制风险;部分止盈点设定在一定盈利后关闭部分头寸。

## 策略原理

该策略使用STOCH指标的快线%K和慢线%D实现金叉做多和死叉做空。具体逻辑是,当%K线从下向上突破%D线时,进行做多操作;当%K线从上向下突破%D线时,进行做空操作。这样可捕捉超买超卖状态。 

为控制风险,长仓做多止损点设在当日最低PIVOT点附近,空仓做空止损点设在当日最高PIVOT点附近,可有效锁定风险。

部分止盈逻辑是,开仓后特定盈利水平时,关闭50%头寸。这样可优化资金使用效率。

综上,该策略整体 Capture超买超卖状态的恰当时点; Control风险控制方面;Optimize资金使用效率。可谓Capture, Control 和Optimize的有机结合。

## 策略优势

- 使用STOCH指标可有效捕捉超买超卖现象,辅以PIVOT点可控制风险,从而全面掌控交易风险。

- 部分止盈机制可优化资金使用效率。采用部分平仓的方法,既确保部分利润,也保留后续运行盈利空间。

- 策略参数可自定义,交易者可根据市场和风险偏好调整参数,实现策略的灵活运用。

- 策略逻辑非常简单清晰,容易理解掌握,适合不同交易者使用。代码直观易读,便于修改维护。


## 策略风险

- 作为趋势跟踪策略,容易被困于震荡行情中,无法实现盈利。

- STOCH指标可能产生错误信号,引发不必要的交易行为。应适当过滤信号,避免无谓交易。

- 止损点靠近当日枢轴点,在突破盘整后可能过于接近,应适当拉大止损距离。

- 部分策略参数如期间长度等需要根据不同市场调整,否则会影响策略表现。

- 回测仅基于历史数据,无法保证未来表现。实盘中会受到更多不可控因素影响。

- 自动交易系统需确保服务器稳定性,避免因连接问题导致无法正常交易。

## 策略优化方向

- 可引入趋势过滤,避免趋势不明时盲目交易。例如加入MA指标判断趋势方向。

- 可加入交易量监测,像放量,空头放量等,过滤假突破。避免被套。

- 可根据不同品种、周期调整参数,优化策略表现。例如调整STOCH的参数。

- 可考虑加入机器学习算法,利用大数据训练模型,自动优化参数。

- 可设定盈亏比来引入风险控制,避免出现大额亏损的单子。

- 可加入更多条件来过滤入场时机,提高策略胜率。如引入股票基本面模型等。

## 总结

本策略整体采用了较为简单直观的趋势跟踪方法,以STOCH指标识别超买超卖状态,并加入PIVOT止损来控制风险,同时引入部分止盈来优化资金效率。从Capture,Control和Optimize三个层面进行设计,形成一个较为完整的自动交易系统。该策略逻辑简单易懂,参数可自定义,可为不同交易者所用。但也存在一定的风险与不足,需要在实盘运用中不断测试与优化,方能长期产生稳定收益。

||


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

[/trans]


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
