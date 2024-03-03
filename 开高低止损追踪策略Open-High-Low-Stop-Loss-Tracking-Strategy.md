
> Name

开高低止损追踪策略Open-High-Low-Stop-Loss-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/110de81942aa476240a.png)
[trans]
### 概述

本策略基于K线的开高低数据设计 Entries,以寻找趋势的反转点。 Entries后会根据ATR指标设定止损线,并追踪止损。策略还会根据风险回报比例计算Target位,在达到Target或被止损后平仓。

### 策略原理

该策略的 Entries 信号来自开高低点。当某根K线的开盘价等于最低价时产生买入信号,当开盘价等于最高价时产生卖出信号,表示可能存在趋势反转机会。

Entries后会根据ATR指标计算动态追踪止损。买入后止损线为最近N根K线内的最低价减去1倍ATR;卖出后止损线为最近N根K线内的最高价加上1倍ATR。止损线会动态更新,追踪价格运行。 

目标利润按照设置的风险回报比率计算。买入的目标价为Entry价格加上(Entry价格与止损价差额的风险回报比倍数);卖出目标价为Entry价格减去(止损价与Entry价差额的风险回报比倍数)。

当价格触及止损价或目标价时,发出平仓指令。

### 优势分析

该策略具有以下优势:

1. Entries信号简单清晰,容易判断,避免多次震荡。

2. 动态ATR止损,最大程度锁定盈利,避免追高杀低。

3. 风险回报率控制,避免利润遗留和超短线操作。

4. 适用于不同品种,容易优化。

### 风险分析 

该策略也存在一定的风险:

1. Entries信号可能存在一定程度的滞后,错过行情最佳点位。

2. 止损价靠近或者过于宽松,可能被套或失去盈利。

3. 无趋势判断模块,在震荡行情中容易被套。

4. 无法处理隔夜建仓的情况。

对应优化方向:
1. 结合其他指标判断趋势,避免震荡行情的套利。

2. 调整ATR参数或加入波动率控制,优化止损线位。

3.增加趋势判断或过滤模块,减少Entries信号的误差。 

4. 加入隔夜处理模块,处理特定品种的隔夜仓位。

### 总结

本策略总体来说较为简单直接,Entries信号清晰,止损思路合理,风险控制到位。但也存在一定Limitation,如趋势判断不足,信号滞后等问题。这些问题也为未来的优化提供了方向。通过结合更多指标判断和风控模块,该策略可以进一步增强效果,变得更加通用。

||

### Overview

This strategy is designed based on the open, high and low data of candlestick charts to identify trend reversal points for entries. After entries, stop loss lines will be set based on the ATR indicator and tracked. Targets will also be calculated based on the risk-reward ratio. When price hits either the stop loss or profit target, orders will be sent to close positions.

### Strategy Logic

The entry signals of this strategy come from the open, high and low prices. A buy signal is generated when the opening price equals the low of the candlestick, and a sell signal is generated when the opening price equals the high, indicating potential trend reversal opportunities.

After entry, dynamic trailing stop loss is calculated based on the ATR indicator. The long stop loss is set at the lowest low of recent N bars minus 1 ATR; the short stop loss is set at the highest high of recent N bars plus 1 ATR. The stop loss line will update dynamically to trail price moves.

Profit targets are calculated based on the risk-reward ratio setting. The long target is set at the entry price plus (the risk difference between entry price and stop loss multiplied by the risk-reward ratio); the short target is set at the entry price minus (the risk difference between stop loss and entry price multiplied by the risk-reward ratio).

When price hits either the stop loss or profit target, orders will be sent to flatten positions.

### Advantage Analysis 

The advantages of this strategy include:

1. Simple and clear entry signals, avoiding multiple whipsaws. 

2. Dynamic ATR trailing stop locks in profits and prevents chasing highs and lows.

3. Risk-reward ratio control avoids leaving profits on table and over-trading.

4. Applicable to different products, easy to optimize.

### Risk Analysis

There are also some risks of this strategy:

1. Entry signals may lag to some extent, missing best market entry.

2. Stop loss too tight or too loose, causing unnecessary stop loss or missing profits. 

3. No trend determination, prone to being trapped in ranging markets.

4. Unable to handle overnight positions.

The optimization directions are:

1. Incorporate other indicators for trend bias to avoid whipsaws.  

2. Fine tune ATR parameters or add volatility control for better stop loss.

3. Add trend filtering to reduce signal noise.

4. Add overnight position handling for certain products. 

### Conclusion

In conclusion, this is a simple and straightforward strategy with clear entry logic, reasonable stop loss methodology and good risk control. But there are some limitations like insufficient trend bias, signal lagging etc. These flaws also point out directions for future optimization. By incorporating more indicators filters and risk management modules, this strategy can be further enhanced and made more robust.
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

strategy('Strategy: OLH', shorttitle="OLH", overlay=true )

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

https://www.fmz.com/strategy/441989

> Last Modified

2024-02-18 14:30:08
