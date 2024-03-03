
> Name

开仓高收盘低吃单交易策略Open-High-Close-Low-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/182bbfbfa131788ee9f.png)
[trans]
## 概述

开仓高收盘低吸单交易策略是一种趋势跟踪型交易策略。该策略通过判断K线的开盘价和收盘价的关系,识别价格的短期趋势方向,在趋势启动的时候建仓做多做空,达到快速进入市场,跟踪趋势的目的。

## 策略原理  

该策略主要判断K线的开盘价和收盘价的大小关系,当开盘价等于最低价时产生做多信号;当开盘价等于最高价时产生做空信号。这样可以捕捉到价格短期上的突破,跟踪趋势。 

进入信号后,会立即使用固定数量开仓建立仓位。止损位会参考ATR指标设定,追踪市场波动。止盈目标是止损位到入场价之间的距离的RR比例部分。当价格触碰止损位或止盈目标时,会及时止损或止盈。

该策略还会在用户设定的时间点,例如美国市场收盘前半小时,将所有头寸平仓,防止隔夜大幅波动的风险。

## 优势分析

该策略具有以下几点优势:

1. 使用开盘价和收盘价的关系判断趋势方向,可以快速识别价格的短期突破。

2. 入场信号简单明确,容易实现。

3. 及时止损和止盈,可以锁定盈利,避免亏损扩大。

4. 在特定时间段强制平仓,可以规避隔夜波动的风险。

5. 无需选择具体交易品种,适用于外汇、股票、加密货币等市场。

## 风险分析  

该策略也存在一些风险:  

1. 使用ATR止损,在震荡行情中可能会频繁止损。

2. 没有考虑交易品种和时间段的特点,存在过拟合的可能。

3. 固定止盈目标可能与市场条件不匹配,无法持续盈利。

4. 强制平仓时点不当可能错过趋势机会或承担额外亏损。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化止损方式,在趋势行情中采用留守止损,在震荡行情中采用挂单止损等。

2. 添加过滤条件,结合趋势指标等确定入场时点,避免假突破。 

3. 动态调整止盈位置,根据市场波动程度确定合理的止盈距离。

4. 优化平仓时间,针对不同交易品种和地区选择合适的平仓时间。

## 总结

开仓高收盘低吃单交易策略通过简单判定价格短期趋势的方式快速建立仓位。具有入场简单、止盈止损明确的优点。但也存在一些可以优化的方面,如止损方式、过滤信号等。通过不断测试和优化,可以使该策略 Parameters 适应更多市场环境,具有较强的适应性和盈利能力。

||

## Overview

The Open High Close Low breakout trading strategy is a trend-following strategy. It identifies the short-term trend direction by checking the relationship between the open and close prices on candlestick charts. When a trend starts, it enters long or short positions to catch the momentum quickly.

## Strategy Logic

The core logic is to check if the open price equals the lowest or highest price of the candlestick. A long signal is triggered when the open price equals the low. A short signal is triggered when the open price equals the high. This aims to catch breakouts that suggest a short-term trend.

Once a signal is triggered, a fixed size position will be opened immediately. The stop loss is set based on the ATR indicator to trail the market volatility. The take profit level is a fixed RR multiple of the stop loss distance from the entry price. When the price hits either the stop loss or take profit, the position will be closed accordingly.

The strategy also flattens all positions at a user-defined daily cutoff time, such as 30 minutes before the US market close. This avoids overnight gap risk. 

## Advantage Analysis 

The main advantages are:

1. Using open/close prices to identify breakout signals fast. 

2. Clear entry signals that are easy to implement.  

3. Timely stop loss and take profit to lock in profits and limit losses.

4. Flatten positions at the daily cutoff to avoid overnight gap risk.

5. Market-neutral, applies to forex, stocks, crypto etc.

## Risk Analysis

Some risks to consider:

1. Frequent stop loss with ATR in choppy markets. 

2. Overfit to specific instruments and sessions without additional filters.

3. Fixed take profit level may underperform in strong trends.

4. Bad timing on flattening positions could miss trends or cause unnecessary losses.

## Improvement Areas

Some ways to further optimize it:

1. Experiment with various stop loss techniques for different market conditions.  

2. Add filters using momentum indicators etc to avoid false signals.

3. Dynamically adjust take profit levels based on market volatility. 

4. Optimize the daily cutoff time for various trading instruments and sessions. 

## Conclusion

The Open High Close Low breakout strategy offers a simple way to trade momentum. Clear entry and exit rules make it easy to implement and manage. But further optimizations on parameters like stop loss, take profit, filters would improve its robustness across more market conditions. Fine-tuned over time via rigorous testing, it has the potential to achieve strong risk-adjusted returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|(?StopLoss settings)ATR Period for placing SL|
|v_input_bool_1|false|(?Stolploss settings)Show SL lines in chart|
|v_input_float_1|2|(?Trade settings)Risk:Reward|
|v_input_int_2|1500|Close all trades, default is 3:00 PM, 1500 hours (integer)|
|v_input_bool_2|true|Markets that never closed (Crypto, Forex, Commodity)|
|v_input_int_3|true|Lot Size|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// Open-High-Low strategy

strategy('Strategy: OLH', shorttitle="OLH", overlay=true)

// Inputs
slAtrLen = input.int(defval=14, title="ATR Period for placing SL", group="StopLoss settings")
showSLLines = input.bool(defval=false, title="Show SL lines in chart", tooltip="Show SL lines also as dotted lines in chart. Note: chart may look untidy.", group="Stolploss settings")
// Trade related
rrRatio = input.float(title='Risk:Reward', step=0.1, defval=2.0, group="Trade settings")
endOfDay = input.int(defval=1500, title="Close all trades, default is 3:00 PM, 1500 hours (integer)", group="Trade settings")
mktAlwaysOn = input.bool(defval=true, title="Markets that never closed (Crypto, Forex, Commodity)", tooltip="Some markers never closes. For those cases, make this checked.", group="Trade settings")
lotSize = input.int(title='Lot Size', step=1, defval=1, group="Trade settings")


// Utils
green(open, close) => close > open ? true : false
red(open, close) => close < open ? true : false
body(open, close) => math.abs(open - close)
lowerwick = green(open, close) ? open - low : close - low
upperwick = green(open, close) ? high - close : high - open
crange = high - low
crangep = high[1] - low[1] // previous candle's candle-range
bullish = close > open ? true : false
bearish = close < open ? true : false


// Trade signals
longCond = barstate.isconfirmed and (open == low)
shortCond = barstate.isconfirmed and (open == high)

// For SL calculation
atr = ta.atr(slAtrLen)
highestHigh = ta.highest(high, 7)
lowestLow = ta.lowest(low, 7)
longStop = showSLLines ? lowestLow - (atr * 1) : na
shortStop = showSLLines ? highestHigh + (atr * 1) : na
plot(longStop, title="Buy SL", color=color.green, style=plot.style_cross)
plot(shortStop, title="Sell SL", color=color.red, style=plot.style_cross)

// Trade execute
h = hour(time('1'), syminfo.timezone)
m = minute(time('1'), syminfo.timezone)
hourVal = h * 100 + m
totalTrades = strategy.opentrades + strategy.closedtrades
if (mktAlwaysOn or (hourVal < endOfDay))
    // Entry
    var float sl = na
    var float target = na
    if (longCond)
        strategy.entry("enter long", strategy.long, lotSize, limit=na, stop=na, comment="Enter Long")
        sl := longStop
        target := close + ((close - longStop) * rrRatio)
        alert('Buy:' + syminfo.ticker + ' ,SL:' + str.tostring(math.floor(sl)) + ', Target:' + str.tostring(target), alert.freq_once_per_bar)
    if (shortCond)
        strategy.entry("enter short", strategy.short, lotSize, limit=na, stop=na, comment="Enter Short")
        sl := shortStop
        target := close - ((shortStop - close) * rrRatio)
        alert('Sell:' + syminfo.ticker + ' ,SL:' + str.tostring(math.floor(sl)) + ', Target:' + str.tostring(target), alert.freq_once_per_bar)

    // Exit: target or SL
    if ((close >= target) or (close <= sl))
        strategy.close("enter long", comment=close < sl ? "Long SL hit" : "Long target hit")
    if ((close <= target) or (close >= sl))
        strategy.close("enter short", comment=close > sl ? "Short SL hit" : "Short target hit")
else if (not mktAlwaysOn)
    // Close all open position at the end if Day
    strategy.close_all(comment = "Close all entries at end of day.")


```

> Detail

https://www.fmz.com/strategy/440817

> Last Modified

2024-02-02 12:03:45
