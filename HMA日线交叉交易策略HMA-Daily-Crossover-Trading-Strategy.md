
> Name

HMA日线交叉交易策略HMA-Daily-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略通过HMA均线和日线的交叉信号进行入场,并设置止损止盈逻辑来管理头寸。该策略结合不同时间周期指标,适用于中长线趋势交易。

## 策略原理

该策略主要通过以下指标和规则判断交易信号:

- HMA均线:计算价格的Hull移动平均,判断中长线趋势方向。

- 日线收盘价:判断较短周期价格走势。 

- 入场信号:HMA上穿昨日收盘价,且短周期价格高于前一日价格视为做多信号;反之则做空。

- 止盈止损:设置固定止损止盈点,当价格触及止损或止盈价格则平仓。

## 策略优势

- HMA指标平滑参数可调,适应性强。

- 考虑不同时间周期指标,提高信号质量。

- 设置止损止盈逻辑,有利于风险控制。

- 清晰的入场规则和头寸管理策略。

- 回测参数可优化,适应不同市场环境。

## 风险分析

- HMA滞后性可能错过最佳入场时点。

- 固定止损止盈参数可能过于激进或保守。

- 缺乏趋势强弱判断,可能反向建仓。

- 简单的交易规则容易产生假信号。

可考虑以下措施来减少风险:

1. 优化HMA参数以平衡滞后性。

2. 设置跟踪止损,实时调整止损位置。

3. 增加量价指标判断趋势强弱。

4. 添加MACD等指标验证交易信号。

## 策略优化方向

该策略可优化的方向:

1. 优化HMA参数,找到最佳参数组合。

2. 增加趋势强弱指标,避免逆势交易。

3. 使用动态止损止盈,而非固定点位。

4. 引入机器学习算法,利用大数据自动优化参数。

5. 增加模拟交割功能,测试实盘表现。

## 总结

该策略整体思路清晰,但仍存在可优化空间。加入趋势判断指标、动态止损等可以提高策略稳定性。总体而言,策略框架合理,有助于把握中长线趋势。

||


## Overview 

This strategy enters trades based on HMA line and daily candlestick crosses and manages positions using stop loss and take profit logic. It combines different timeframe indicators for trend trading.

## Strategy Logic

The main signals and rules:

- HMA line: Calculates Hull Moving Average to determine medium-long term trend.

- Daily close price: Judges short-term price action.

- Entry signal: HMA crossing above previous daily close, with price higher than previous day's price for long. Reverse for short.

- Stop loss/take profit: Fixed levels to close positions when hit.

## Advantages

- Adjustable HMA parameters for adaptability.

- Considers multi-timeframe indicators for higher quality signals.

- Stop loss/take profit facilitates risk management.

- Clear entry rules and position management.

- Backtest parameters can be optimized for different markets.

## Risks

- HMA lag may miss best entry timing.

- Fixed stop loss/take profit may be too aggressive or conservative.

- Lacks trend strength filter, risks countertrend trades.

- Simple rules prone to false signals.

Improvements:

1. Optimize HMA parameters for lag.

2. Use trailing stop loss instead of fixed.

3. Add volume or momentum indicators to judge trend strength. 

4. Incorporate other indicators like MACD for signal confirmation.

## Optimization

Potential ways to optimize the strategy:

1. Optimize HMA parameters for ideal combo.

2. Add trend strength filter to avoid countertrends.

3. Use dynamic stops instead of fixed levels.

4. Incorporate machine learning for auto parameter optimization.

5. Add simulated trading to test real-world performance.

## Summary

The strategy logic is clear but has room for improvement. Adding trend filters, dynamic stops can improve stability. Overall provides a reasonable framework for catching medium-long term trends.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|-0.05|StopLoss $|
|v_input_2|0.05|TargetPoint $|
|v_input_3_open|0|Source: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|14|Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-22 00:00:00
end: 2023-09-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// created by SeaSide420       Enters on crossovers, exits Basket when profit $ = TP
// strategy(title="HMA & D1 crossover", overlay=true, currency="BTC", initial_capital=1, default_qty_type=strategy.percent_of_equity, default_qty_value=1, commission_type=strategy.commission.percent,commission_value=0.25,slippage=1)
SL=input(defval=-0.05,title="StopLoss $",type=input.float,step=0.01, maxval=-0.01)
TP=input(defval=0.05,title="TargetPoint $",type=input.float,step=0.01, minval=0.01)
price=input(title="Source",type=input.source,defval=open)
Period=input(14, minval=1)
hma = wma(2*wma(price, Period/2)-wma(price, Period), round(sqrt(Period)))
s1=security(syminfo.tickerid, timeframe.period, price, barmerge.gaps_off, barmerge.lookahead_off)
s2=security(syminfo.tickerid, "D", price, barmerge.gaps_off, barmerge.lookahead_off)
cp=s2<price?color.lime:color.red
cp1=plot((s2),color=color.black,title="DailyCandle1",linewidth=2,transp=0)
cp2=plot((s2[1]),color=color.black,title="DailyCandle2",linewidth=2,transp=0)
cp3=plot(hma,title="HMA",color=color.black)
fill(cp1,cp2,color=cp,transp=1)
fill(cp1,cp3,color=cp,transp=75)
closeall=strategy.openprofit<SL or strategy.openprofit>TP
if closeall
    strategy.close_all(comment = "Close All")
if (hma>hma[1] and s1>s2 and s2[1]>s2[2] and s1>s2[1])
    strategy.order("Buy", strategy.long)
if (hma<hma[1] and s1<s2 and s2[1]<s2[2] and s1<s2[1])
    strategy.order("Sell", strategy.short)
```

> Detail

https://www.fmz.com/strategy/427615

> Last Modified

2023-09-22 17:07:15
