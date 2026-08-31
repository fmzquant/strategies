
> Name

Multi-Timeframe-Liquidity-Pivot-Heatmap-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16c9b5886da5a58b8a9.png)

#### Overview
This strategy is a quantitative trading system based on multi-timeframe liquidity pivot point detection. It analyzes price action across three different timeframes (15-minute, 1-hour, and 4-hour) to identify key support and resistance levels and make trading decisions accordingly. The system incorporates money management features, including fixed-dollar take-profit and stop-loss levels, while providing intuitive visual feedback to help traders better understand market structure.

#### Strategy Principle
The core of the strategy lies in detecting price pivot points across multiple timeframes using ta.pivothigh and ta.pivotlow functions. For each timeframe, the system uses left and right reference bars (default 7) to determine significant highs and lows. When a new pivot low appears on any timeframe, the system generates a buy signal; when a new pivot high appears, it generates a sell signal. Trade execution employs fixed-dollar stop-loss and take-profit management, converting dollar amounts to corresponding points using the moneyToSLPoints function.

#### Strategy Advantages
1. Multi-timeframe analysis provides a more comprehensive market perspective, helping capture trading opportunities at different levels
2. Pivot-based trading logic has a solid technical analysis foundation, making it easy to understand and execute
3. Integrated money management features effectively control risk for each trade
4. Visual interface intuitively displays trading status, including positions, take-profit/stop-loss levels, and profit/loss zones
5. Strategy parameters are adjustable, offering strong adaptability for optimization under different market conditions

#### Strategy Risks
1. Multi-timeframe signals may conflict, requiring a reasonable signal priority mechanism
2. Fixed-dollar take-profit and stop-loss may not suit all market conditions, suggesting dynamic adjustment based on volatility
3. Lag in pivot point detection may result in delayed entries
4. False breakout signals may occur during periods of intense volatility
5. Need to consider liquidity differences across different timeframes

#### Strategy Optimization Directions
1. Introduce volatility indicators for dynamic adjustment of take-profit and stop-loss levels
2. Add volume confirmation mechanism to improve pivot point reliability
3. Develop timeframe priority system to resolve signal conflicts
4. Integrate trend filters to avoid overtrading in ranging markets
5. Consider adding price structure analysis to improve entry timing accuracy

#### Summary
The Multi-Timeframe Liquidity Pivot Heatmap Strategy is a well-structured, logically sound trading system. Through multi-dimensional market analysis and strict risk management, it provides traders with a reliable trading framework. While there are some inherent risks and limitations, through continuous optimization and improvement, the strategy shows promise for maintaining stable performance across various market conditions.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-19 00:00:00
end: 2024-12-18 08:00:00
period: 4h
basePeriod: 4h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © pmotta41
//@version=5
strategy("GPT Session Liquidity Heatmap Strategy", overlay=true)

// Inputs
timeframe1 = input.timeframe("15", title="Intraday Timeframe 1")
timeframe2 = input.timeframe("60", title="Intraday Timeframe 2")
timeframe3 = input.timeframe("240", title="Higher Timeframe")
leftBars = input.int(7, title="Left Bars for Pivot", minval=2, maxval=20)
rightBars = input.int(7, title="Right Bars for Pivot", minval=2, maxval=20)
takeProfitDollar = input(200, title="Take Profit $$")
stopLossDollar = input(100, title="Stop Loss $$")

// Pivot Detection Function
detectPivot(highs, lows, left, right) =>
    pivotHigh = ta.pivothigh(highs, left, right)
    pivotLow = ta.pivotlow(lows, left, right)
    [pivotHigh, pivotLow]

// Get Pivots from Different Timeframes
[pivotHigh1, pivotLow1] = request.security(syminfo.tickerid, timeframe1, detectPivot(high, low, leftBars, rightBars))
[pivotHigh2, pivotLow2] = request.security(syminfo.tickerid, timeframe2, detectPivot(high, low, leftBars, rightBars))
[pivotHigh3, pivotLow3] = request.security(syminfo.tickerid, timeframe3, detectPivot(high, low, leftBars, rightBars))

// Plot Pivots
plotshape(series=pivotHigh1, title="Pivot High 1", location=location.abovebar, color=color.red, style=shape.labeldown, text="H1")
plotshape(series=pivotLow1, title="Pivot Low 1", location=location.belowbar, color=color.green, style=shape.labelup, text="L1")
plotshape(series=pivotHigh2, title="Pivot High 2", location=location.abovebar, color=color.red, style=shape.labeldown, text="H2")
plotshape(series=pivotLow2, title="Pivot Low 2", location=location.belowbar, color=color.green, style=shape.labelup, text="L2")
plotshape(series=pivotHigh3, title="Pivot High 3", location=location.abovebar, color=color.red, style=shape.labeldown, text="H3")
plotshape(series=pivotLow3, title="Pivot Low 3", location=location.belowbar, color=color.green, style=shape.labelup, text="L3")

// Strategy Logic
buyCondition = pivotLow1 or pivotLow2 or pivotLow3
sellCondition = pivotHigh1 or pivotHigh2 or pivotHigh3

if (buyCondition)
    strategy.entry("Buy", strategy.long)

if (sellCondition)
    strategy.entry("Sell", strategy.short)

// Function to Convert $$ to Points for Stop Loss and Take Profit
moneyToSLPoints(money) =>
    strategy.position_size != 0 ? (money / syminfo.pointvalue / math.abs(strategy.position_size)) / syminfo.mintick : na

p = moneyToSLPoints(takeProfitDollar)
l = moneyToSLPoints(stopLossDollar)

// Exit Conditions
strategy.exit("Exit Buy", from_entry="Buy", profit=p, loss=l)
strategy.exit("Exit Sell", from_entry="Sell", profit=p, loss=l)

// Visualization for Stop Loss and Take Profit Levels
pointsToPrice(pp) =>
    na(pp) ? na : strategy.position_avg_price + pp * math.sign(strategy.position_size) * syminfo.mintick

tp = plot(pointsToPrice(p), style=plot.style_linebr, color=color.green, title="Take Profit Level")
sl = plot(pointsToPrice(-l), style=plot.style_linebr, color=color.red, title="Stop Loss Level")
avg = plot(strategy.position_avg_price, style=plot.style_linebr, color=color.blue, title="Entry Price")
fill(tp, avg, color=color.new(color.green, 90), title="Take Profit Area")
fill(avg, sl, color=color.new(color.red, 90), title="Stop Loss Area")

// Background for Gain/Loss
gainBackground = strategy.position_size > 0 and close > strategy.position_avg_price
lossBackground = strategy.position_size > 0 and close < strategy.position_avg_price
bgcolor(gainBackground ? color.new(color.green, 90) : na, title="Gain Background")
bgcolor(lossBackground ? color.new(color.red, 90) : na, title="Loss Background")

```

> Detail

https://www.fmz.com/strategy/475593

> Last Modified

2024-12-20 14:20:11
