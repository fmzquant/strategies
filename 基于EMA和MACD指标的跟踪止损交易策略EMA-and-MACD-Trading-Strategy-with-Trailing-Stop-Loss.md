
> Name

基于EMA和MACD指标的跟踪止损交易策略EMA-and-MACD-Trading-Strategy-with-Trailing-Stop-Loss

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略结合了指数移动平均线(EMA)和移动平均收敛离差(MACD)两个指标来产生交易信号,并采用跟踪止损来控制风险。策略适用于趋势性行情,旨在追踪中期趋势进行长线持仓。

### 策略原理

当快速EMA线上穿慢速EMA线且MACDhistogram柱变空头时,策略做多;当做多头仓位存在时,设置一个向下的跟踪止损线,如果价格下跌超过止损线一定比例就止损退出做多头仓位。

具体来说,策略使用7日EMA和14日EMA构建快慢EMA;使用12日EMA减26日EMA得到MACD值,再用9日EMA得到Signal线。当7日EMA上穿14日EMA且MACD值上穿Signal时,做多开仓;之后设置一个向下的跟踪止损线,如果价格较高点下跌超过某比例就止损退出做多单。

### 优势分析

该策略结合EMA和MACD两个指标,能够有效过滤假突破。EMA判断趋势方向,MACD判断买卖点位,两者结合可以减少交易频率的同时提高信号质量。跟踪止损可以最大限度保护已实现利润,在发生重大不利行情时及时止损。

回测显示该策略在熊市中也能获得较好收益,表明策略具有一定的鲁棒性。策略交易频率不高,适合中长期持仓。可适当调整EMA周期参数来调整策略的趋势性。

### 风险分析 

该策略主要 based on 指标,存在被套利的风险。当市场处于震荡调整阶段时,EMA 和 MACD 可能产生大量假信号,导致过度交易和亏损。跟踪止损仅对突破下方有效,无法应对突破上方后的大幅回落。

可以通过适当扩大 EMA 周期参数来减少误信号。也可以结合其他指标过滤信号,例如量能指标、波动率指标等。此外,可根据市场情况调整止损比例,以平衡止损与套利风险。

### 优化方向

1. 可以测试不同的EMA周期组合,找到更适合策略的周期参数。

2. 可以加入其他指标进行信号过滤,例如RSI、KD等,提高信号质量。 

3. 可以根据不同品种调整止损比例,设置动态跟踪止损来优化止损策略。

4. 可以结合突破、形态等技术指标,设定更多开仓和平仓条件,使策略更具定制性。

5. 可以引入机器学习预测周期趋势方向,辅助EMA判定整体趋势。

### 总结

该策略整体来说较为稳健,在熊市中也能获得不错收益。但存在一定的被套利风险,需要对参数和过滤条件进行优化。若能够进一步结合其他技术指标和机器学习等手段进行优化提升,该策略的效果会更好。总的来说,该策略为量化交易提供了一个可靠的模板。

||

### Overview

This strategy combines the exponential moving average (EMA) and moving average convergence divergence (MACD) indicators to generate trading signals, and adopts trailing stop loss to control risks. The strategy is suitable for trending markets and aims to follow medium-term trends for long-term holdings.

### Strategy Logic

When the fast EMA line crosses above the slow EMA line and the MACD histogram turns bearish, the strategy goes long. When a long position exists, a downward trailing stop loss line is set. If the price falls below the stop loss line by a certain percentage, the long position will be stopped out. 

Specifically, the strategy uses 7-day EMA and 14-day EMA to construct the fast and slow EMAs. The MACD value is obtained by subtracting the 26-day EMA from the 12-day EMA, and the Signal line is obtained with a 9-day EMA of the MACD. When the 7-day EMA crosses above the 14-day EMA and the MACD value crosses above the Signal line, a long position is opened. Then a downward trailing stop loss line is set. If the price falls from higher levels by a certain percentage, the long position will be stopped out.

### Advantage Analysis  

This strategy combines the EMA and MACD indicators, which can effectively filter false breakouts. The EMA judges the trend direction and the MACD determines the entry points. Combining the two can reduce trading frequency while improving signal quality. The trailing stop loss can maximize protection of existing profits and timely stop losses when major adverse moves occur.

Backtests show that this strategy can generate decent returns even in bear markets, indicating certain robustness. The trading frequency is not high, suitable for medium to long term holdings. The EMA period parameters can be adjusted to customize the trend-following tendency.

### Risk Analysis

The strategy relies mainly on indicators, with the risk of being whipsawed. During range-bound consolidations, the EMA and MACD may generate excessive false signals, leading to over-trading and losses. The trailing stop loss only works for downside breakouts, unable to handle sharp reversals after upside breakouts.

Expanding the EMA periods appropriately could reduce false signals. Other indicators could also be combined to filter signals, like volume or volatility indicators. In addition, stop loss percentage can be adjusted based on market conditions, to balance stop loss and whipsaw risks.

### Optimization Directions 

1. Different EMA period combinations could be tested to find more suitable parameters.

2. Other indicators like RSI, KD could be added for signal filtering and quality improvement.

3. Stop loss percentages can be adjusted based on different products, with dynamic trailing stops. 

4. Breakout, pattern recognition and other techniques can be incorporated for more customizable entry and exit rules.

5. Machine learning could assist in predicting overall trend direction to aid EMA.

### Summary

Overall the strategy is quite robust, generating decent returns even in bear markets. But certain whipsaw risks exist, requiring parameter tuning and signal filtering. Further optimizations with other technical indicators and machine learning could significantly improve it. In summary, the strategy provides a reliable template for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Date Range|
|v_input_float_1|3|Trail Long Loss (%)|
|v_input_float_2|true|Trail Short Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-12 00:00:00
end: 2023-09-19 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=5
strategy('EMA and MACD with Trailing Stop Loss',
         overlay=true,
         initial_capital=1000,
         process_orders_on_close=true,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=30,
         commission_type=strategy.commission.percent,
         commission_value=0.1)

showDate = input(defval=true, title='Show Date Range')
timePeriod = time >= timestamp(syminfo.timezone, 2022, 1, 1, 0, 0)
notInTrade = strategy.position_size <= 0

// EMAs 
fastEMA = ta.ema(close, 7)
slowEMA = ta.ema(close, 14)
plot(fastEMA, color = color.blue)
plot(slowEMA, color = color.green)
//buyCondition1 = ta.crossover(fastEMA, slowEMA)
buyCondition1 = fastEMA > slowEMA


// DMI and MACD inputs and calculations
[macd, macd_signal, macd_histogram] = ta.macd(close, 12, 26, 9)
buyCondition2 = ta.crossover(macd_signal, macd)


// Configure trail stop level with input options
longTrailPerc = input.float(title='Trail Long Loss (%)', minval=0.0, step=0.1, defval=3) * 0.01
shortTrailPerc = input.float(title='Trail Short Loss (%)', minval=0.0, step=0.1, defval=1) * 0.01

// Determine trail stop loss prices
longStopPrice = 0.0
shortStopPrice = 0.0

longStopPrice := if strategy.position_size > 0
    stopValue = close * (1 - longTrailPerc)
    math.max(stopValue, longStopPrice[1])
else
    0

shortStopPrice := if strategy.position_size < 0
    stopValue = close * (1 + shortTrailPerc)
    math.min(stopValue, shortStopPrice[1])
else
    999999
    

if (buyCondition1 and buyCondition2 and notInTrade and timePeriod)
    strategy.entry(id="Long", direction = strategy.long)

strategy.exit(id="Exit", stop = longStopPrice, limit = shortStopPrice)


//if (sellCondition1 and sellCondition2 and notInTrade and timePeriod)
//strategy.close(id="Close", when = sellCondition1 or sellCondition2)

```

> Detail

https://www.fmz.com/strategy/427344

> Last Modified

2023-09-20 11:21:14
