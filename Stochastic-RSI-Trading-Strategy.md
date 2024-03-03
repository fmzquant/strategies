
> Name

Stochastic-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
Stochastic RSI交易策略

该策略根据Stochastic RSI指标的交叉信号进行交易。

具体交易规则如下:

- 当Stochastic RSI上穿30时做多

- 当Stochastic RSI下穿70时做空

该策略还包括两个附加入场条件: 

- 做多时,9周期SMA必须高于21周期SMA

- 做空时,9周期SMA必须低于21周期SMA

- 做多仅在价格低于VWAP时发出信号

- 做空仅在价格高于VWAP时发出信号

该策略采用止损和止盈进行风险管理:

- 无论做多做空,止损设置为20ticks

- 无论做多做空,止盈设置为25ticks

该策略的优势在于利用Stochastic RSI识别超买超卖区域,并加入SMA和VWAP进行过滤,可有效减少错误信号。但该策略较适合趋势行情,在盘整行情中容易被套住。

||Stochastic RSI Trading Strategy

This strategy trades based on crossover signals from the Stochastic RSI indicator. 

The specific entry rules are:

- Enter long when Stochastic RSI crosses above 30

- Enter short when Stochastic RSI crosses below 70

Additional entry filters:

- Longs require 9-period SMA above 21-period SMA 

- Shorts require 9-period SMA below 21-period SMA

- Longs only below VWAP, shorts only above VWAP

The strategy uses stop loss and take profit for risk management:

- Stop loss set at 20 ticks for both longs and shorts

- Take profit set at 25 ticks for both longs and shorts

The key advantage is using Stochastic RSI to identify overbought/oversold regions combined with SMA and VWAP filters to reduce false signals. However, this strategy works better in trending rather than range-bound markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|3|K|
|v_input_4|3|D|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-03 00:00:00
end: 2023-09-10 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © thedoggwalker

//@version=4
strategy("Stochastic RSI Strategy", overlay=true)

// Stochastic RSI
length = input(14, title="Length")
src = input(close, title="Source")
smoothK = input(3, title="K")
smoothD = input(3, title="D")

rsiValue = rsi(src, length)
highestRSI = highest(rsiValue, length)
lowestRSI = lowest(rsiValue, length)
k = (rsiValue - lowestRSI) / (highestRSI - lowestRSI) * 100
d = sma(k, smoothD)

// Moving averages
maShort = sma(close, 9)
maLong = sma(close, 21)

// Spread between moving averages
spread = maShort - maLong

// VWAP
vwapValue = vwap(hlc3)

// Entry conditions
longCondition = crossover(k, 30) and spread > 0 and close < vwapValue
shortCondition = crossunder(k, 70) and spread < 0 and close > vwapValue

// Entry orders
if (longCondition)
    strategy.entry("Long", strategy.long)

if (shortCondition)
    strategy.entry("Short", strategy.short)

// Exit orders
// longStopLoss = close - 20 * syminfo.mintick
// longTakeProfit = close + 25 * syminfo.mintick
// strategy.exit("Exit Long", "Long", stop=longStopLoss, limit=longTakeProfit)

// shortStopLoss = close + 20 * syminfo.mintick
// shortTakeProfit = close - 25 * syminfo.mintick
// strategy.exit("Exit Short", "Short", stop=shortStopLoss, limit=shortTakeProfit)
```

> Detail

https://www.fmz.com/strategy/426336

> Last Modified

2023-09-11 11:57:39
