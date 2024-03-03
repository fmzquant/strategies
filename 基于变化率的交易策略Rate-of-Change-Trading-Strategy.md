
> Name

基于变化率的交易策略Rate-of-Change-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

这个策略通过计算一定时间段内的变化率,来确定买入和卖出的时机。它可以帮助交易者抓住短期价格变动的机会。

## 策略原理

这个策略主要基于以下几个指标:

1. 快速简单移动平均线(默认14天):用于判断价格的短期趋势
2. 慢速简单移动平均线(默认100天):用于判断价格的长期趋势  
3. 参考简单移动平均线(默认30天):用于确定买入卖出的大方向
4. 变化率:通过计算过去一定周期(默认12根K线)的最高价和最低价变化,判断价格波动幅度

具体买入规则:
1. 价格低于参考简单移动平均线 
2. 变化率高于设定的低变化率阈值(默认2.3%)
3. 快速SMA上涨且慢速SMA下跌,表示两条曲线可能会交叉

具体卖出规则:
1. 价格高于参考简单移动平均线
2. 变化率高于设定的高变化率阈值(默认4.7%) 
3. 价格连续上涨3根K线
4. 当前有盈利
5. 快速SMA高于慢速SMA

订单规模根据总权益的百分比设定(默认96%),可以提供杠杆效应。

## 策略优势分析

该策略主要具有以下优势:

1. 运用变化率判断波动,可以抓住短期价格快速上涨或下跌的机会,实现更高收益。
2. 结合快慢SMA判断趋势,可以更准确地把握低买高卖的时机。
3. 设定参考SMA作为大方向指引,可以避免被prices注的短线行情误导。
4. 利用追踪止损来锁定利润,降低下行风险。
5. 订单规模提供杠杆效应,可以放大盈利。

总体来说,该策略充分利用了价格变化率、SMA指标等工具,可以在波动行情中获得较好的绩效。

## 风险分析

该策略也存在以下风险:

1. 变化率和SMA参数设置不当可能导致交易信号错失或错误。需要针对不同市场调整参数。

2. 订单规模过大会放大风险。建议在测试阶段优化订单比例。

3. 追踪止损在震荡行情中可能过早止损。可以考虑调整止损幅度。 

4. 策略 transactionsstab可步行情易受套利。应该结合趋势判断和止损管理风险。

5. 回测数据拟合风险。应该在不同市场多次实盘验证策略健壮性。

针对这些风险,可以通过参数优化、订单调整、止损策略优化、实盘验证等手段进行风险控制。

## 策略优化方向

该策略还可以从以下方面进行优化:

1. 增加其他技术指标判断,如波动率、成交量等,提高信号准确性。

2. 优化交易次数,通过降低交易频率来减少 transactionsstab行情的影响。

3. 结合突破策略,在关键价格位附近设置突破交易信号。

4. 利用机器学习方法自动优化参数设置。

5. 在多市场多时间段测试策略健壮性,提高适应性。

6. 考虑股票、外汇等不同品种的特点,设定专门的参数组合。

7. 根据实盘结果不断迭代优化策略信号和风险控制方法。

## 总结

本策略通过变化率和SMA指标判断,在短线价格波动中寻找交易机会。它有利于抓住快速行情,但也需要注意风险控制。通过参数优化、订单调整、止损策略改进以及实盘验证,可以不断提升策略的稳健性和适应性。该策略为量化交易提供了一个参考模板,但实际运用中需要根据市场特点进行调整优化。

||


## Overview

This strategy calculates the rate of change over time to determine buy/sell signals. It can help traders capture opportunities in short-term price fluctuations.

## Strategy Logic

The strategy is mainly based on the following indicators:

1. Fast Simple Moving Average (default 14 days): to gauge short-term trend
2. Slow Simple Moving Average (default 100 days): to gauge long-term trend
3. Reference Simple Moving Average (default 30 days): to determine overall direction
4. Rate of Change: calculated based on highest/lowest price over lookback period (default 12 bars) to judge magnitude of price fluctuation

Specific entry rules:

1. Price below reference SMA
2. ROC above preset low ROC threshold (default 2.3%) 
3. Fast SMA rising and slow SMA falling, indicating potential crossover

Specific exit rules:

1. Price above reference SMA
2. ROC above preset high ROC threshold (default 4.7%)
3. 3 consecutive rising bars  
4. Current profit > 0
5. Fast SMA above slow SMA

Position size is percentage (default 96%) of total equity for leverage.

## Advantage Analysis 

The strategy has the following advantages:

1. Using ROC to detect swings allows capturing upside/downside moves for higher returns.

2. Combining fast/slow SMA helps more accurately identify low/high points. 

3. Reference SMA provides overall direction to avoid distraction from short-term noise.

4. Trailing stop loss locks in profits and reduces downside risk.

5. Leverage from position sizing amplifies profits.

Overall, the strategy utilizes ROC, SMA and other tools effectively to capitalize on price oscillations. It can achieve good results in volatile markets.

## Risk Analysis

The strategy also has the following risks:

1. Incorrect ROC and SMA parameters may cause missed signals or bad trades. Optimization is needed for different markets.

2. Excessive position size increases risk. Order percentage should be tested and tuned.

3. Trailing stop loss may exit prematurely in choppy markets. Stop loss percentage can be adjusted.

4. Prone to whipsaws in ranging markets. Should incorporate trend filters and risk management. 

5. Backtest overfitting risk. Robustness should be verified through live trading across markets.

Risks can be managed through parameter optimization, position sizing, stop loss adjustments, robustness testing etc.

## Optimization Directions

The strategy can be improved in the following aspects:

1. Add other technical indicators like volatility, volume to improve signal accuracy.

2. Optimize number of trades by reducing trading frequency to minimize whipsaw impacts.

3. Incorporate breakout techniques around key price levels.

4. Use machine learning to auto optimize parameters.

5. Test robustness across different markets and time frames. 

6. Tune specialized parameters for different products like stocks, forex etc.

7. Continuously refine signals and risk controls based on live results.

## Summary

This strategy identifies trading opportunities around short-term oscillations using ROC and SMA analysis. It helps capitalize on quick swings but also requires proper risk controls. Fine tuning parameters, position sizing, stop losses and robustness testing can enhance its stability and adaptability. The strategy serves as a reference template for quantified trading but needs customization for different markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|SMA Fast (days)|
|v_input_2|100|SMA Slow (days)|
|v_input_3|30|SMA Reference (days)|
|v_input_4|0.023|ROC Low (%)|
|v_input_5|0.047|ROC High (%)|
|v_input_6|0.96|Order Stake (%)|
|v_input_7|12|Lookback Candles|
|v_input_8|3.62|Trailing Stoploss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-21 00:00:00
end: 2023-09-27 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=4
// Author: Sonny Parlin (highschool dropout)
// Best if run on 5m timeframe
strategy(shorttitle="ROC+Strategy", title="Rate of Change Strategy",
                                      overlay=true,  currency=currency.USD,
                                      initial_capital=10000)

// Inputs and variables
ss = input(14, minval=10, maxval=50, title="SMA Fast (days)")
ff = input(100, minval=55, maxval=200, title="SMA Slow (days)")
ref = input(30, minval=20, maxval=50, title="SMA Reference (days)")
lowOffset = input(0.023, "ROC Low (%)", minval=0, step=0.01)
highOffset = input(0.047, "ROC High (%)", minval=0, step=0.01)
orderStake = input(0.96, "Order Stake (%)", minval=0, step=0.01)
lookback = input(12, "Lookback Candles", minval=1, step=1) 

// SMA
smaFast = sma(close, ss)
smaSlow = sma(close, ff)
smaRef = sma(close, ref)
ROC = (max(close[lookback],close) - min(close[lookback],close)) / max(close[lookback],close)

// Set up SMA plot but don't show by default
plot(smaFast, "smaFast", color=#00ff00, display = 0)
plot(smaSlow, "smaSlow", color=#ff0000, display = 0)
plot(smaRef, "smaRef", color=#ffffff, display = 0)

// The buy stratey:
// Guard that the low is under our SMA Reference line 
// Guard that the rate of change over the lookback period is greater than our 
// ROC lowOffset %, default is 0.023. (low < smaRef) and (ROC > lowOffset)
// SMA fast is on the rise and SMA slow is falling and they are very likely
// to cross. (rising(smaFast,1)) and (falling(smaSlow, 1)) 
enterLong = (low < smaRef) and (ROC > lowOffset) and (rising(smaFast,1)) and (falling(smaSlow,1)) 

// The sell Strategy:
// Guard that close is higher than our SMA reference line and that the rate of 
// change over the lookback period is greater than our highOffset %, default
// is 0.047. (close > smaRef) and (ROC > highOffset)
// Guard that close has risen by 3 candles in a row (rising(close,3)) 
// Guard that we currently have profit (strategy.openprofit > 0)
// Guard that SMA fast is higher than smaSlow (smaFast > smaSlow)
// If it keeps going up past our close position the trailing stoploss will kick in!
enterShort = (close > smaRef) and (ROC > highOffset) and (rising(close,3)) and (strategy.openprofit > 0) and (smaFast > smaSlow)

// Order size is based on total equity
// Example 1:
// startingEquity = 2000
// close = 47434.93
// orderStake = 0.45
// (2,000 × orderStake) / close = orderSize = 0.0189733599 = approx $900

// Example 2:
// startingEquity = 2000
// close = 1.272
// orderStake = 0.45
// (startingEquity × orderStake) / close = orderSize = 707.5471698113 = approx $900
orderSize = (strategy.equity * orderStake) / close

// Trailing Stoploss
// I'm using 2.62 as my default value, play with this for different results.
longTrailPerc = input(title="Trailing Stoploss (%)",
     type=input.float, minval=0.0, step=0.1, defval=3.62) * 0.01
     
longStopPrice = 0.0

longStopPrice := if (strategy.position_size > 0)
    stopValue = close * (1 - longTrailPerc)
    max(stopValue, longStopPrice[1])
else
    0

if (enterLong)
    strategy.entry("Open Long Position", strategy.long, orderSize, when=strategy.position_size <= 0)
    
if (enterShort)
    strategy.exit(id="Close Long Position", stop=longStopPrice)


//plot(strategy.equity)
```

> Detail

https://www.fmz.com/strategy/428060

> Last Modified

2023-09-28 11:26:44
