
> Name

回弹趋势双均线交易系统结合ATR动态止损优化策略-Dual-EMA-Pullback-Trading-System-with-ATR-Based-Dynamic-Stop-Loss-Optimization

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8558571623d2fe5205.png)


#### Overview
This strategy is a trend-following trading system based on dual EMA and ATR dynamic stop-loss. It uses 38-period and 62-period Exponential Moving Averages (EMA) to identify market trends, determines entry signals through price crossovers with the fast EMA, and incorporates ATR indicator for dynamic stop-loss management. The strategy offers both aggressive and conservative trading modes to accommodate traders with different risk preferences.

#### Strategy Principles
The core logic is based on the following key elements:
1. Trend Determination: Market trend is identified through the relative position of 38-period and 62-period EMAs. An uptrend is confirmed when the fast EMA is above the slow EMA, and vice versa.
2. Entry Signals: Long signals are generated when price breaks above the fast EMA during uptrends; short signals occur when price breaks below the fast EMA during downtrends.
3. Risk Management: Employs an ATR-based dynamic stop-loss system that adjusts the stop level as price moves favorably, protecting profits while avoiding premature exits. Fixed percentage stop-loss and profit targets are also implemented.

#### Strategy Advantages
1. Superior Trend Following: The dual EMA system effectively captures medium to long-term trends while avoiding frequent trades in ranging markets.
2. Comprehensive Risk Control: Combines fixed and dynamic stops to limit maximum risk while protecting profits.
3. High Adaptability: Offers both aggressive and conservative trading modes, adaptable to market conditions and personal risk preferences.
4. Clear Visual Feedback: Market conditions and trading signals are intuitively displayed through colored bars and arrows.

#### Strategy Risks
1. Trend Reversal Risk: May experience consecutive stops at trend reversal points. Trading should be limited to periods of clear trends.
2. Slippage Risk: Actual execution prices may significantly deviate from signal prices during high volatility. Stop-loss ranges should be appropriately widened.
3. Parameter Sensitivity: Strategy performance is significantly affected by EMA periods and ATR multiplier selection. Optimization for different market conditions is necessary.

#### Strategy Optimization Directions
1. Add Trend Strength Filter: Incorporate trend strength indicators like ADX to enter only during clear trends.
2. Optimize Stop-Loss Mechanism: Dynamically adjust ATR multiplier based on volatility for more adaptive stops.
3. Include Volume Confirmation: Enhance signal reliability by incorporating volume analysis at entry points.
4. Market Environment Classification: Dynamically adjust strategy parameters based on different market conditions (trending/ranging).

#### Summary
This strategy builds a complete trend-following trading system by combining classic dual EMA system with modern dynamic stop-loss techniques. Its strengths lie in comprehensive risk control and high adaptability, though traders still need to optimize parameters and manage risks according to specific market conditions. Through the suggested optimization directions, the strategy's stability and profitability can be further enhanced.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-10 00:00:00
end: 2025-01-08 08:00:00
period: 4h
basePeriod: 4h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © aalapsharma

//@version=5
strategy(title="CM_SlingShotSystem - Strategy", shorttitle="SlingShotSys_Enhanced_v5", overlay=true, initial_capital=100000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, pyramiding=1)

// Inputs
sae = input.bool(true, "Show Aggressive Entry Bars? (Highlight only)")
sce = input.bool(true, "Show Conservative Entry Bars? (Highlight only)")
st = input.bool(true, "Show Trend Arrows (Top/Bottom)?")
def = input.bool(false, "(Unused) Only Choose 1 - Either Conservative Entry Arrows or 'B'-'S' Letters")
pa = input.bool(true, "Show Conservative Entry Arrows?")
sl = input.bool(false, "Show 'B'-'S' Letters?")
useStopLoss = input.bool(true, "Use Stop-Loss?")
stopLossPerc = input.float(5.0, "Stop-Loss (%)", step=0.1)
useTakeProfit = input.bool(true, "Use Take-Profit?")
takeProfitPerc = input.float(20.0, "Take-Profit (%)", step=0.1)
useTrailingStop = input.bool(false, "Use ATR Trailing Stop?")
atrLength = input.int(14, "ATR Length", minval=1)
atrMult = input.float(2.0, "ATR Multiple for Trailing Stop", step=0.1)

// Calculations
emaSlow = ta.ema(close, 62)
emaFast = ta.ema(close, 38)
upTrend = emaFast >= emaSlow
downTrend = emaFast < emaSlow
pullbackUpT() => emaFast > emaSlow and close < emaFast
pullbackDnT() => emaFast < emaSlow and close > emaFast
entryUpT() => emaFast > emaSlow and close[1] < emaFast and close > emaFast
entryDnT() => emaFast < emaSlow and close[1] > emaFast and close < emaFast
entryUpTrend = entryUpT() ? 1 : 0
entryDnTrend = entryDnT() ? 1 : 0
atrValue = ta.atr(atrLength)

// Trailing Stop Logic (Improved)
var float trailStopLong = na
var float trailStopShort = na

if (strategy.position_size > 0)
    trailStopLong := math.max(close - (atrValue * atrMult), nz(trailStopLong[1], close))
    trailStopLong := strategy.position_avg_price > trailStopLong ? strategy.position_avg_price : trailStopLong
else
    trailStopLong := na

if (strategy.position_size < 0)
    trailStopShort := math.min(close + (atrValue * atrMult), nz(trailStopShort[1], close))
    trailStopShort := strategy.position_avg_price < trailStopShort ? strategy.position_avg_price : trailStopShort
else
    trailStopShort := na

// Plotting
col = emaFast > emaSlow ? color.lime : emaFast < emaSlow ? color.red : color.yellow
p1 = plot(emaSlow, "Slow MA (62)", linewidth=4, color=col)
p2 = plot(emaFast, "Fast MA (38)", linewidth=2, color=col)
fill(p1, p2, color=color.silver, transp=50)
barcolor((sae and pullbackUpT()) ? color.yellow : (sae and pullbackDnT()) ? color.yellow : na)
barcolor((sce and entryUpT()) ? color.aqua : (sce and entryDnT()) ? color.aqua : na)
plotshape(st and upTrend, title="Trend UP", style=shape.triangleup, location=location.bottom, color=color.lime)
plotshape(st and downTrend, title="Trend DOWN", style=shape.triangledown, location=location.top, color=color.red)
plotarrow((pa and entryUpTrend == 1) ? 1 : na, title="Up Entry Arrow", colorup=color.lime, maxheight=30, minheight=30)
plotarrow((pa and entryDnTrend == 1) ? -1 : na, title="Down Entry Arrow", colordown=color.red, maxheight=30, minheight=30)
plotchar(sl and entryUpTrend ? (low - ta.tr) : na, title="Buy Entry (Letter)", char='B', location=location.absolute, color=color.lime)
plotchar(sl and entryDnTrend ? (high + ta.tr) : na, title="Short Entry (Letter)", char='S', location=location.absolute, color=color.red)
plot(useTrailingStop and strategy.position_size > 0 ? trailStopLong : na, "Trailing Stop Long", color=color.green, style=plot.style_linebr)
plot(useTrailingStop and strategy.position_size < 0 ? trailStopShort : na, "Trailing Stop Short", color=color.red, style=plot.style_linebr)

// Function to calculate stop and limit prices
f_calcStops(_entryPrice, _isLong) =>
    _stopLoss = _isLong ? _entryPrice * (1.0 - stopLossPerc / 100.0) : _entryPrice * (1.0 + stopLossPerc / 100.0)
    _takeProfit = _isLong ? _entryPrice * (1.0 + takeProfitPerc / 100.0) : _entryPrice * (1.0 - takeProfitPerc / 100.0)
    [_stopLoss, _takeProfit]

// Entry and Exit Logic (Simplified using strategy.close)
if (entryUpT() and strategy.position_size == 0)
    strategy.entry("Long", strategy.long)

if (entryDnT() and strategy.position_size == 0)
    strategy.entry("Short", strategy.short)

// Exit conditions based on Stop-loss and Take-profit
[slPrice, tpPrice] = f_calcStops(strategy.position_avg_price, strategy.position_size > 0)

if (strategy.position_size > 0)
    strategy.exit("Exit Long", "Long", stop=slPrice, limit=tpPrice, trail_price = trailStopLong, trail_offset = atrValue * atrMult)

if (strategy.position_size < 0)
    strategy.exit("Exit Short", "Short", stop=slPrice, limit=tpPrice, trail_price = trailStopShort, trail_offset = atrValue * atrMult)

// Close opposite position on new entry signal
if (entryUpT() and strategy.position_size < 0)
    strategy.close("Short", comment="Close Short on Long Signal")

if (entryDnT() and strategy.position_size > 0)
    strategy.close("Long", comment="Close Long on Short Signal")
```

> Detail

https://www.fmz.com/strategy/477950

> Last Modified

2025-01-10 15:19:40
