
> Name

基于-T3-和-ATR-的自动跟踪趋势策略Automatic-Tracking-Trend-Strategy-Based-on-T3-and-ATR

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12db182fed613036254.png)

## Overview  

The core of this strategy lies in using the T3 indicator smoothed moving average and ATR indicator dynamic stop loss to identify trend direction and track trends. The strategy combines trend tracking and trend reversal opportunities, aiming to achieve greater profits in trending markets.

## Strategy Logic  

The strategy uses the T3 indicator to calculate the smoothed moving average of prices, and uses the ATR indicator to calculate the average true range of the current cycle. Trading signals are generated when prices break through the ATR dynamic stop loss. Specifically, a buy signal is generated when prices break above the ATR stop loss line, and a sell signal is generated when prices break below the ATR stop loss line.  

To filter false signals, the strategy additionally requires that prices must also break through the T3 moving average before confirming the signal. In addition, the strategy calculates the stop loss and take profit based on ATR values to implement risk management.

## Advantage Analysis

Compared with traditional moving averages, the T3 indicator has higher sensitivity and less lag, which can capture changes in price trends faster. In addition, T3 has mathematical advantages that can provide a more accurate, smoothed moving average.  

The ATR value reflects the current volatility and risk level of the market. ATR dynamic tracking stops and profits can dynamically adjust position sizes to achieve greater profits in trending markets and reduce losses in volatile markets.

## Risk Analysis  

The strategy relies on indicator calculations and risks being arbitraged. In addition, T3 smoothed moving averages and ATR dynamic stops have lagging problems that may miss opportunities for rapid price reversals. Parameters can be adjusted accordingly or combined with other indicators for optimization.

When trend fluctuates and reverses, stop losses may be broken leading to greater losses. Reasonable widening of stop loss ranges or using other parameters such as the Handle number can be explored.


## Optimization Directions  

- Adjust T3 indicator parameters to optimize sensitivity.  

- Test different ATR cycle parameters to find optimal values.
 
- Try different risk reward ratios to determine the best parameters.  

- Add other indicators to filter signals, such as Money Flow Index.

- Use machine learning methods to automatically optimize parameter combinations.

## Summary

This strategy integrates the trend tracking capability of the T3 smoothed moving average and the ATR's dynamic stop-loss adjustment capability. With proper parameter optimization and risk control, it promises good returns. The strategy considers both trend tracking and reversal opportunities, making it a versatile quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|T3|
|v_input_2|true|Key Value. "This changes the sensitivity"|
|v_input_3|50|ATR Period|
|v_input_4|true|Signals from Heikin Ashi Candles|
|v_input_5|true|Risk Reward Ratio|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-26 00:00:00
end: 2024-01-02 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title='NinjaView Example 1 (UTBA "QuantNomad" Strategy)', overlay=true)
T3 = input(100)//600
// Input for Long Settings
// Input for Long Settings


xPrice3 = close
xe1 = ta.ema(xPrice3, T3)
xe2 = ta.ema(xe1, T3)
xe3 = ta.ema(xe2, T3)
xe4 = ta.ema(xe3, T3)
xe5 = ta.ema(xe4, T3)
xe6 = ta.ema(xe5, T3)

b3 = 0.7
c1 = -b3*b3*b3
c2 = 3*b3*b3+3*b3*b3*b3
c3 = -6*b3*b3-3*b3-3*b3*b3*b3
c4 = 1+3*b3+b3*b3*b3+3*b3*b3
nT3Average = c1 * xe6 + c2 * xe5 + c3 * xe4 + c4 * xe3

//plot(nT3Average, color=color.white, title="T3")

// Buy Signal - Price is below T3 Average
buySignal3 = xPrice3 < nT3Average
sellSignal3 = xPrice3 > nT3Average
// Inputs
a = input(1, title='Key Value. "This changes the sensitivity"')
c = input(50, title='ATR Period')
h = input(true, title='Signals from Heikin Ashi Candles')
riskRewardRatio = input(1, title='Risk Reward Ratio')

xATR = ta.atr(c)
nLoss = a * xATR

src = h ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close, lookahead=barmerge.lookahead_off) : close

xATRTrailingStop = 0.0
iff_1 = src > nz(xATRTrailingStop[1], 0) ? src - nLoss : src + nLoss
iff_2 = src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0) ? math.min(nz(xATRTrailingStop[1]), src + nLoss) : iff_1
xATRTrailingStop := src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0) ? math.max(nz(xATRTrailingStop[1]), src - nLoss) : iff_2

pos = 0
iff_3 = src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0) ? -1 : nz(pos[1], 0)
pos := src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0) ? 1 : iff_3

xcolor = pos == -1 ? color.red : pos == 1 ? color.green : color.blue

ema = ta.ema(src, 1)
above = ta.crossover(ema, xATRTrailingStop)
below = ta.crossunder(ema, xATRTrailingStop)

buy = src > xATRTrailingStop and above
sell = src < xATRTrailingStop and below

barbuy = src > xATRTrailingStop
barsell = src < xATRTrailingStop

plotshape(buy, title='Buy', text='Buy', style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), textcolor=color.new(color.white, 0), size=size.tiny)
plotshape(sell, title='Sell', text='Sell', style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), textcolor=color.new(color.white, 0), size=size.tiny)

barcolor(barbuy ? color.new(color.green, 90) : na)
barcolor(barsell ? color.new(color.red, 90) : na)

var float entryPrice = na
var float takeProfitLong = na
var float stopLossLong = na
var float takeProfitShort = na
var float stopLossShort = na

if buy and buySignal3
    entryPrice := src
    takeProfitLong := entryPrice + nLoss * riskRewardRatio
    stopLossLong := entryPrice - nLoss
    takeProfitShort := na
    stopLossShort := na

if sell and sellSignal3
    entryPrice := src
    takeProfitShort := entryPrice - nLoss * riskRewardRatio
    stopLossShort := entryPrice + nLoss
    takeProfitLong := na
    stopLossLong := na

// Strategy order conditions
acct = "Sim101"
ticker = "ES 12-23"
qty = 1

OCOMarketLong = '{ "alert": "OCO Market Long", "account": "' + str.tostring(acct) + '", "ticker": "' + str.tostring(ticker) + '", "qty": "' + str.tostring(qty) + '", "take_profit_price": "' + str.tostring(takeProfitLong) + '", "stop_price": "' + str.tostring(stopLossLong) + '", "tif": "DAY" }'
OCOMarketShort = '{ "alert": "OCO Market Short", "account": "' + str.tostring(acct) + '", "ticker": "' + str.tostring(ticker) + '", "qty": "' + str.tostring(qty) + '", "take_profit_price": "' + str.tostring(takeProfitShort) + '", "stop_price": "' + str.tostring(stopLossShort) + '", "tif": "DAY" }'
CloseAll = '{ "alert": "Close All", "account": "' + str.tostring(acct) + '", "ticker": "' + str.tostring(ticker) + '" }'

strategy.entry("Long", strategy.long, when=buy and buySignal3, alert_message=OCOMarketLong)
strategy.entry("Short", strategy.short, when=sell and sellSignal3, alert_message=OCOMarketShort)

// Setting the take profit and stop loss for long trades
strategy.exit("Take Profit/Stop Loss", "Long", stop=stopLossLong, limit=takeProfitLong,alert_message=CloseAll)

// Setting the take profit and stop loss for short trades
strategy.exit("Take Profit/Stop Loss", "Short", stop=stopLossShort, limit=takeProfitShort,alert_message=CloseAll)

// Plot trade setup boxes
bgcolor(buy ? color.new(color.green, 90) : na, transp=0, offset=-1)
bgcolor(sell ? color.new(color.red, 90) : na, transp=0, offset=-1)

// longCondition = buy and not na(entryPrice)
// shortCondition = sell and not na(entryPrice)

// var line longTakeProfitLine = na
// var line longStopLossLine = na
// var line shortTakeProfitLine = na
// var line shortStopLossLine = na

// if longCondition
//     longTakeProfitLine := line.new(bar_index, takeProfitLong, bar_index + 1, takeProfitLong, color=color.green, width=2)
//     longStopLossLine := line.new(bar_index, stopLossLong, bar_index + 1, stopLossLong, color=color.red, width=2)
//     label.new(bar_index + 1, takeProfitLong, str.tostring(takeProfitLong, "#.#####"), color=color.green, style=label.style_none, textcolor=color.green, size=size.tiny)
//     label.new(bar_index + 1, stopLossLong, str.tostring(stopLossLong, "#.#####"), color=color.red, style=label.style_none, textcolor=color.red, size=size.tiny)

// if shortCondition
//     shortTakeProfitLine := line.new(bar_index, takeProfitShort, bar_index + 1, takeProfitShort, color=color.green, width=2)
//     shortStopLossLine := line.new(bar_index, stopLossShort, bar_index + 1, stopLossShort, color=color.red, width=2)
//     label.new(bar_index + 1, takeProfitShort, str.tostring(takeProfitShort, "#.#####"), color=color.green, style=label.style_none, textcolor=color.green, size=size.tiny)
//     label.new(bar_index + 1, stopLossShort, str.tostring(stopLossShort, "#.#####"), color=color.red, style=label.style_none, textcolor=color.red, size=size.tiny)

alertcondition(buy, 'UT Long', 'UT Long')
alertcondition(sell, 'UT Short', 'UT Short')

```

> Detail

https://www.fmz.com/strategy/437504

> Last Modified

2024-01-03 11:58:25
