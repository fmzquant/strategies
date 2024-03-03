
> Name

动态止损交易视图策略Dynamic-Stop-Loss-Alert-TradingView-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略展示如何使用TradingView的动态变量在警报中传递止损价格,并通过TradingConnector在MT4/5平台执行交易。策略使用Stochastic指标判断入场时机,动态设置最新支撑阻力作为止损点,还可以部分止盈。

## 策略原理

Stochastic指标的K线和D线金叉做多,死叉做空。计算最近的支撑阻力点作为止损价格。入场后,止损价格通过动态变量实时传递至broker。部分止盈设置为止损距离的一定比例。止盈价格也可以动态传递。

## 优势分析

- 动态止损使止损价格可精确设置
- 部分止盈提高资金利用效率
- 实时传递止损价至broker账户
- 回测止损价格接近实盘,拟真模拟

## 风险分析

- Stochastic指标存在滞后性
- 部分止盈过于频繁影响持仓
- 动态变量在不同时间框架效果不同 
- 需要优化部分止盈的比例

可适当缩短Stochastic的参数周期,调整部分止盈的比例等来控制风险。

## 优化方向

- 测试不同的Stochastic参数组合
- 优化部分止盈的比例设置
- 尝试不同的止损方式,如移动止损
- 在多市场多品种中测试

## 总结

该策略展示如何利用TradingView新功能在MT4/5执行动态止损交易。可作为 further backtesting的基础框架。仍需要针对具体品种进行优化调整。

||

## Overview

This strategy demonstrates passing dynamic stop loss prices via TradingView alerts for execution in MT4/5 platforms using TradingConnector. Entries are determined using Stochastic indicator with dynamic stops set at recent pivots. Partial profit taking is also possible.

## Strategy Logic

Long and short entries on Stochastic K and D line crosses. Recent pivot highs/lows are calculated as dynamic stop loss prices. These are passed real-time to the broker via alerts on entry. Partial profits are taken at certain percentage of stop loss distance. Profit prices can also be dynamically alerted.

## Advantages

- Dynamic stops allow surgical stop loss placement
- Partial profit taking improves capital efficiency
- Real-time passing of stop loss price to broker account
- Backtested stop loss mimics live, realistic simulation

## Risks  

- Lag exists in Stochastic indicator
- Frequent partial profit taking disturbs holding
- Dynamic variables behave differently across timeframes
- Partial profit percentage needs optimization

Risks can be managed by tuning Stochastic parameters, adjusting partial profit ratio etc.

## Enhancements

- Test different Stochastic parameter combinations
- Optimize partial profit take ratio  
- Explore other stop loss approaches like trailing stop 
- Test robustness across markets and products

## Conclusion

This strategy demonstrates executing dynamic stop loss trades from TradingView to MT4/5 using new features. It can serve as a framework for further backtesting. Optimization is required for specific assets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|400|TakeProfitLevel|
|v_input_2|150|TakePartialProfitLevel|
|v_input_3|14|K|
|v_input_4|3|D|
|v_input_5|4|Smooth|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// strategy(title="TradingView Alerts to MT4 MT5 Strategy example", commission_type=strategy.commission.cash_per_order, commission_value=0.00003, overlay=false, default_qty_value=100000, initial_capital=1000)
// study(title="TradingView Alerts to MT4 MT5 Strategy example")  //uncomment this line and comment previous one to make it a study producing alerts
//
// This script was created for educational purposes only.
// It is showing how to use dynamic variables in TradingView alerts.
// And how to execute them in Forex, indices and commodities markets
// thanks to www.tradingconnector.com

TakeProfitLevel=input(400)
TakePartialProfitLevel=input(150)

// **** Entries logic **** {
periodK = input(14, title="K", minval=1)
periodD = input(3, title="D", minval=1)
smoothK = input(4, title="Smooth", minval=1)
k = sma(stoch(close, high, low, periodK), smoothK)
d = sma(k, periodD)
plot(k, title="%K", color=color.blue)
plot(d, title="%D", color=color.orange)
h0 = hline(80)
h1 = hline(20)
fill(h0, h1, color=color.purple, transp=75)

GoLong=crossover(k,d)// and k<80
GoShort=crossunder(k,d)// and k>20
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
    trade_id:=trade_id[1]+1

TakePartialProfitLong = barssince(GoLong)<barssince(GoShort) and crossover(high,(valuewhen(GoLong,close,0)+TakePartialProfitLevel*syminfo.mintick))
TakePartialProfitShort = barssince(GoLong)>barssince(GoShort) and crossunder(low,(valuewhen(GoShort,close,0)-TakePartialProfitLevel*syminfo.mintick))
// } End of Trade counter and partial closing mechanism


strategy.entry("Long", strategy.long, when=GoLong)
strategy.exit("XPartLong", from_entry="Long", qty_percent=50, profit=TakePartialProfitLevel)
strategy.exit("XLong", from_entry="Long", stop=stoploss_long, profit=TakeProfitLevel)
strategy.entry("Short", strategy.short, when=GoShort)
strategy.exit("XPartShort", from_entry="Short", qty_percent=50, profit=TakePartialProfitLevel)
strategy.exit("XShort", from_entry="Short", stop=stoploss_short, profit=TakeProfitLevel)


// alertcondition("Long", when=GoLong, message="long slprice={{stoploss_long}} tradeid={{trade_id}} tp=TakeProfitLevel")
// alertcondition("Short", when=GoShort, message="short slprice={{stoploss_short}} tradeid={{trade_id}} tp=TakeProfitLevel")
// alertcondition("ClosePartLong", when=TakePartialProfitLong, message="closepart tradeit={{trade_id}} part=0.5")
// alertcondition("ClosePartShort", when=TakePartialProfitShort, message="closepart tradeit={{trade_id}} part=0.5")

```

> Detail

https://www.fmz.com/strategy/427161

> Last Modified

2023-09-18 17:20:06
