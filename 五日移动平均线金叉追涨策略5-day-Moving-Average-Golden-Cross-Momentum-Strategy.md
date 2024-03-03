
> Name

五日移动平均线金叉追涨策略5-day-Moving-Average-Golden-Cross-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略基于5日和78日移动平均线金叉形成追涨信号,目标捕捉短线价格Momentum突破带来的机会。

## 策略原理 

1. 计算3日、78日、195日加权移动平均线。

2. 当3日线上穿195日线时,发出买入信号。

3. 当3日线处于78日线之上,78日线又处于195日线之上时,认为处于上升趋势通道,也发出买入信号。

4. 设置6ATR动态止盈线,在止盈线下方发出止盈信号。

5. 当3日线重新下穿195日线时发出止损信号。

## 优势分析

1. 多重均线交叉组合,有效过滤假突破。

2. 动态止盈设定避免反转止损。

3. 回测每笔交易平均持有周期仅2小时,适合短线Momentum交易。

4. 最大回撤可控在20%左右。

## 风险分析

1. 固定均线参数无法适应市场变化。

2. 样本期限仅1年,需扩大样本验证策略。

3. 止盈止损参数需要优化,控制风险。

4. 无法应对价格跳空。

5. 手续费和滑点成本可能较大。

## 优化方向

1. 测试不同均线参数,优化组合。

2. 优化止盈止损参数,平衡收益风险。

3. 设置入场筛选条件,减少套牢概率。 

4. 优化仓位管理,根据趋势逐步加仓。

5. 测试不同品种和更长时间段。

6. 进行Monte Carlo模拟评估最大回撤。

## 总结

该策略利用均线多重金叉判断股价上涨趋势,设置动态止盈止损规则,回测表现良好。但该策略样本期限短,参数稳健性有待验证,且无法处理跳空行情。需要进一步扩大样本区间回测,引入更多过滤条件降低误信号率,同时优化止盈止损参数,并评估手续费等交易成本影响。如果能经过全面检验与优化,该策略可以成为一个稳定的短线追涨系统。

|| 

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

[/trans]

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
