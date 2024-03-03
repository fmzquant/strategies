
> Name

形态识别吊颈线交易策略Pattern-Recognition-Pinbar-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略通过识别K线形态实现价格形态交易。它会寻找最近出现的吊颈线形态,根据形态信号做多或做空。交易者可以设置止盈止损的倍数。趋势跟踪止损可以锁定更多利润。

## 策略原理

识别当前K线是否符合吊颈线的形态要求:实体处于下半段,收盘价和开盘价接近低点。做多信号则相反,实体在上半段,收开接近高点。寻找最后一个交易信号的K线,计算该K线实体高度。设置止盈为该高度的N倍,止损为该高度的M倍(M小于N)。

入场后开始趋势跟踪,将止盈线逐渐向利润方向移动,止损线保持不变,直到止盈或止损触发为止。

## 优势分析

- 利用价格形态识别信号,避免频繁交易
- 止盈止损倍数可自定义,兼顾风险和收益
- 趋势跟踪止损锁定更多利润
- 可过滤假突破,避免被套

## 风险分析

- 形态识别准确率无法达到100%
- 止损范围过小可能被价格震荡止损
- 趋势跟踪时需要及时移动止盈线

可通过优化参数、辅助指标等方法来减少风险。

## 优化方向 

- 测试不同的止盈止损设置
- 结合其他指标过滤假信号
- 优化形态识别条件逻辑
- 在不同品种中测试参数健壮性

## 总结

该策略利用形态识别发现交易机会,回测表现良好。止盈止损设定合理,可控制单笔交易风险。通过参数优化等进一步完善,可以成为简单实用的交易系统。

||


## Overview 

This strategy implements price pattern trading by identifying candlestick patterns. It looks for the nearest pinbar pattern and goes long or short based on the signal. Traders can set take profit and stop loss multiples. A trailing stop locks in more profit as the trend develops.

## Strategy Logic

Identify if the current candle meets pinbar requirements - body in lower half, close and open near low. Long signal is the opposite - body in upper half, close/open near high. Find the last signal candle and calculate its body height. Set take profit to N times the height, and stop loss to M times the height (M < N). 

After entry, begin trailing the stop. Keep moving take profit towards profit while maintaining stop loss, until either is hit. 

## Advantage Analysis 

- Price patterns identify low frequency signals, avoiding overtrading
- Customizable profit/loss multiples balance risk and reward
- Trailing stop locks in more profits
- Filters false breakouts avoiding traps

## Risk Analysis

- Pattern recognition accuracy is never 100% 
- Small stop loss risks being stopped out by noise
- Take profit needs timely adjusting when trailing 

Risks can be reduced via parameter optimization, adding indicators etc.

## Optimization Directions

- Test different take profit and stop loss settings
- Add indicators to filter false signals
- Optimize pattern recognition logic  
- Test robustness across products

## Conclusion

This strategy identifies opportunities through pattern recognition with good backtest results. Reasonable stops control trade risk. Further refinements like parameter optimization can make it a simple and practical system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|2|(?Profit options)Profit multiplier|
|v_input_float_2|true|Loss multiplier|
|v_input_bool_1|true|(?Trading options)Use trailing stops?|
|v_input_bool_2|false|Close trade if opposit signal occures?|
|v_input_bool_3|true|Enter long trades?|
|v_input_bool_4|true|Enter short trades?|
|v_input_bool_5|true|(?Backtest Time Period)Begin Backtest at Start Date|
|v_input_1|timestamp(1 Jan 2021)|Start Date|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-09-17 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// 
// Pinbar strategy script by samgozman (https://github.com/samgozman)
// 
// Detailed instruction how to use this script: https://github.com/samgozman/pinbar-strategy-tradingview
//
// If you liked the script and want to support me: https://paypal.me/sgozman
// 
// ++++++++++ Warning: The script is provided for educational purposes only. ++++++++++ //

strategy('Pinbar strategy', default_qty_type=strategy.percent_of_equity, default_qty_value=100, initial_capital=10000)

profitMultiplier = input.float(2.0, "Profit multiplier", minval=0.1, step=0.1, group="Profit options", tooltip="X times signal candle size from high")
lossMultiplier =  input.float(1.0, "Loss multiplier", minval=0.1, step=0.1, group="Profit options", tooltip="X times signal candle size from low")

isTrailingStop = input.bool(true, "Use trailing stops?", group="Trading options", tooltip="Highly recommended!")
isCloseOnOppositSignal = input.bool(false, "Close trade if opposit signal occures?", group="Trading options", tooltip="Close long on short signal")
isLongEligible = input.bool(true, "Enter long trades?", group="Trading options")
isShortEligible = input.bool(true, "Enter short trades?", group="Trading options")

useDateFilter = input.bool(true, title="Begin Backtest at Start Date", group="Backtest Time Period")
backtestStartDate = input(timestamp("1 Jan 2021"), title="Start Date", group="Backtest Time Period")

// Predefined time trading zone for back testing
inTradeWindow = true

// HELPER FUNCTIONS //

// calculate candle size for N bars back. Use 0 for current
calcCandle(int periods) =>
    math.abs(high[periods] - low[periods])

// if body is below 50% and close/open below 30%
isBearishPinbar(float candle) =>
    lower30 = low + candle * 0.30
    bottomHalf1 = close < hl2
    bottomHalf2 = open < hl2
    lowerRegion1 = close < lower30
    lowerRegion2 = open < lower30
    
    con1 = bottomHalf1 and bottomHalf2
    con2 = lowerRegion1 and lowerRegion2
    con3 = high > high[1]
    
    con1 and con2 and con3

// if body is above 50% and close/open above 30%  
isBullishPinbar(float candle) =>
    upper30 = high - candle * 0.30
    topHalf1 = close > hl2
    topHalf2 = open > hl2
    upperRegion1 = close > upper30
    upperRegion2 = open > upper30
    
    con1 = topHalf1 and topHalf2
    con2 = upperRegion1 and upperRegion2
    con3 = low < low[1]
    
    con1 and con2 and con3
    
barsSinceLastEntry() =>
    strategy.opentrades > 0 ? bar_index - strategy.opentrades.entry_bar_index(strategy.opentrades - 1) : na

// Calculate trading signals
currentCandle = calcCandle(0)
longSignal = isBullishPinbar(currentCandle) and inTradeWindow
shortSignal = isBearishPinbar(currentCandle) and inTradeWindow

// ENTER THE TRADE //
if longSignal and isLongEligible
    strategy.entry("buy", strategy.long, when = strategy.position_size == 0)

if shortSignal and isShortEligible 
    strategy.entry("sell", strategy.short, when = strategy.position_size == 0)

// CALCULATE STOPS //
barsSinceEntry = barsSinceLastEntry()
candleFromEntry = calcCandle(barsSinceEntry)
// long
long_take_limit = strategy.position_avg_price + (candleFromEntry*profitMultiplier)
long_target_percent_profit = long_take_limit / strategy.position_avg_price - 1
long_target_percent_loss = (long_target_percent_profit / profitMultiplier) * lossMultiplier
long_stop_limit = low[barsSinceEntry] * (1 - long_target_percent_loss)
//short
short_take_limit = strategy.position_avg_price - (candleFromEntry*profitMultiplier)
short_target_percent_profit = strategy.position_avg_price / short_take_limit - 1
short_target_percent_loss = (short_target_percent_profit / profitMultiplier) * lossMultiplier
short_stop_limit = high[barsSinceEntry] * (1 + short_target_percent_loss)

// EXIT THE TRADE //
if strategy.position_size > 0 or strategy.position_size < 0
    if isTrailingStop
        strategy.exit(id="exit", from_entry="buy", trail_price = long_take_limit, stop=long_stop_limit)
        strategy.exit(id="exit", from_entry="sell", trail_price = short_take_limit, stop=short_stop_limit)
    else
        strategy.exit(id="exit", from_entry="buy", limit = long_take_limit, stop=long_stop_limit)
        strategy.exit(id="exit", from_entry="sell", limit = short_take_limit, stop=short_stop_limit)
    if isCloseOnOppositSignal
        strategy.close("buy", when = shortSignal)
        strategy.close("sell", when = longSignal)

// PLOT SIGNALS //
plotshape(longSignal, style=shape.arrowup, color=color.new(color.green, 0), size=size.large, location=location.belowbar)
plotshape(shortSignal, style=shape.arrowdown, color=color.new(color.red, 0), size=size.large, location=location.abovebar)
```

> Detail

https://www.fmz.com/strategy/427127

> Last Modified

2023-09-18 14:14:51
