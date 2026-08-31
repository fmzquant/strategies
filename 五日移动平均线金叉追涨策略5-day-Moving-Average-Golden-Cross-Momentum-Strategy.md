
> Name

五日移动平均线金叉追涨策略5-day-Moving-Average-Golden-Cross-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses 5-day and 78-day MA crosses to generate momentum chasing signals, aiming to capture short-term price breakouts.

## Strategy Logic

1. Calculate 3-day, 78-day and 195-day weighted moving averages.

2. 3-day crossover above 195-day triggers buy signal. 

3. When 3-day sits above 78-day, and 78-day above 195-day, consider uptrend channel formed, also triggers buy.

4. Set 6ATR dynamic profit taking line, sell when price falls below line.

5. Sell signal when 3-day crosses back below 195-day.

## Advantages  

1. Multiple MA crosses filter false breakouts effectively.

2. Dynamic profit taking avoids whipsaws.

3. Backtest shows average 2 hours holding time per trade, suits short-term momentum trading.  

4. Max drawdown controlled around 20%.

## Risks

1. Fixed MA parameters fail to adapt to changing markets.

2. 1-year sample period limited, needs larger data to verify strategy.

3. Profit taking and stop loss parameters need optimization for risk control.

4. Fails to adapt to price gaps.

5. High transaction costs likely.

## Enhancements

1. Test different MA combos for optimization.

2. Optimize profit take and stop loss for risk-return balance.

3. Set entry filters to reduce trapped probability.

4. Optimize position sizing, pyramid on strength.  

5. Test across different products and longer timeframes. 

6. Monte Carlo simulation to evaluate max drawdown.

## Summary

This strategy identifies uptrend with MA crosses and sets dynamic profit stop rules with good backtest results. But limited sample period, param stability remains verified and fails on gaps. Requires further backtesting over larger datasets, more filters to reduce false signals, optimized profit stop parameters, evaluation on transaction costs. If passes comprehensive optimization and verification tests, can become a robust short-term momentum chasing system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|s_len|
|v_input_2|78|m_len|
|v_input_3|195|l_len|
|v_input_4|390|xl_len|
|v_input_5|40|ATR Period|
|v_input_6|6|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// © FinTasticTrading 2021/2/14
// This is a 5 day moving average crossing long strategy, used in short term momentum trading strategy.
// Momentum trading Strategy: When S&P 500 index is at up trend (or above 60 sma), buy 10+ stocks in top 20% stock RS ranking at equal weight using this MA5X_L strategy. Change stocks when any stock exited by algorithm.  
// Back test start since 2020/7/1, each long entry for condition 1 is $30000, condition 2 is $20000, with max of 2 long positions.
// Setup: 10 minutes chart
// Buy condition 1) 3 wma cross up 180 wma (5day) 2) 3wma > 60wma > 180wma UP Trend Arrangement (UTA)
// Exit condition 1) 3 wma cross under 180 wma 2) position profit > 20% and 3 wma cross under 6 ATRs line (green)
//@version=4

strategy("MA5X_L", overlay=true, pyramiding=2,default_qty_type=strategy.cash, default_qty_value=100000)
s_len = input( 3 )
m_len = input( 78 )  // 2 day moving average
l_len = input( 195)  // equal to 5 Day moving average
xl_len = input(390)  // 10 day moving average
//Draw WMAs
s_ma = wma(close,s_len)
m_ma = wma(close,m_len)
l_ma = wma(close,l_len)
xl_ma = sma(close,xl_len)
plot(s_ma, color=color.yellow, linewidth=2)
plot(m_ma, color=color.fuchsia, linewidth=2)
plot(l_ma, color=color.blue, linewidth=2)
plot(xl_ma, color = color.gray, linewidth=2)

//ATR Stop Profit , length = 40 or 1 day
Periods = input(title="ATR Period", type=input.integer, defval=40)
Multiplier = input(title="ATR Multiplier", type=input.float, step=0.1, defval=6.0)
sl=hl2-(Multiplier*atr(Periods))
sl1 = nz(sl[1], sl)
sl := s_ma[1] > sl1 ? max(sl, sl1) : sl
plot(strategy.position_size > 0 ? sl:na, title="Stop Loss", style=plot.style_linebr, linewidth=2, color=color.green)

//Backtest since
condition100 = time>=timestamp(2020, 07, 01, 00, 00) 

//Long Entry Condition 1 : s_ma Cross UP l_ma
if crossover(s_ma, l_ma) and condition100
    strategy.entry("X Up", strategy.long, qty = 30000/close, comment="X Up")

//Long Entry Condition 2 : s_ma > m_ma > l_ma
condition31 = s_ma>m_ma and m_ma>l_ma
condition32 = condition31[1]==false and condition31 == true and condition100
strategy.entry("UTA", strategy.long, qty = 20000/close, when = condition32, comment="UTA")

//Long Exit Condition 1 :  3 wma cross under 180 wma
condition50 = crossunder(s_ma, l_ma)
strategy.close_all(when = condition50, comment="X Dn")

//Long Exit Condition 2 : position profit > 20% and 3 wma cross under 6 ATRs line (green)
strategy.close_all(when = crossunder(close,sl) and strategy.openprofit>30000*0.2, comment="Stop")

```

> Detail

https://www.fmz.com/strategy/427461

> Last Modified

2023-09-21 12:16:22
