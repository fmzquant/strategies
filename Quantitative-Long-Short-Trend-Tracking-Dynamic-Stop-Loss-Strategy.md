
> Name

Quantitative-Long-Short-Trend-Tracking-Dynamic-Stop-Loss-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8725ab4dcd79cd79662.png)
![IMG](https://www.fmz.com/upload/asset/2d8f34f267abfbbe9cdee.png)





#### Overview

This is a long-short trend tracking strategy based on Average True Range (ATR) and Exponential Moving Average (EMA). The strategy achieves precise market trend capture and risk management through dynamic stop-loss and trend determination.

#### Strategy Principle

The core principles include:
1. Calculate dynamic stop-loss points using ATR
2. Determine price trend direction with EMA
3. Confirm trading signals through price and stop-loss point relationship
4. Optional Heikin Ashi candle optimization

Key Calculation Logic:
- Dynamic Stop-Loss = Current Price ± (ATR * Sensitivity Coefficient)
- Trend Determined by EMA and Stop-Loss Point Crossover
- Trading Signals Generated When Price Breaks Stop-Loss and EMA Crosses

#### Strategy Advantages

1. Dynamic Risk Management: ATR adaptive stop-loss calculation
2. Precise Trend Tracking: EMA quickly responds to price changes
3. High Flexibility: Customizable ATR period and sensitivity
4. Optional Heikin Ashi Candles for Signal Refinement
5. Low-Frequency Trading, Reduced Transaction Costs
6. Multi-Market and Multi-Variety Adaptability

#### Strategy Risks

1. Potential Frequent False Signals in Volatile Markets
2. Improper Parameter Settings May Cause Over-Trading
3. Does Not Consider Fundamental Factors
4. Potential Divergence Between Backtesting and Live Trading

Risk Control Recommendations:
- Optimize Parameters
- Combine with Confirmation Indicators
- Implement Stop-Loss and Position Management
- Continuous Monitoring and Dynamic Adjustment

#### Strategy Optimization Directions

1. Introduce Machine Learning for Parameter Optimization
2. Add Multi-Timeframe Verification
3. Combine with Additional Technical Indicators
4. Develop Adaptive Parameter Selection Mechanism
5. Enhance Risk Adjustment Module

Optimization Goals: Improve Strategy Stability, Reduce Drawdown, Enhance Profit Efficiency

#### Summary

A dynamic trend tracking strategy based on ATR and EMA, achieving stable market participation through flexible stop-loss mechanisms and trend judgment. The strategy demonstrates good adaptability and risk management characteristics, requiring continuous optimization and validation.



> Source (PineScript)

``` pinescript
/*backtest
start: 2025-01-01 00:00:00
end: 2025-04-02 00:00:00
period: 3h
basePeriod: 3h
exchanges: [{"eid":"Futures_Binance","currency":"BNB_USDT"}]
*/

//@version=6
strategy("ducanhmaster v1", overlay=true, commission_type=strategy.commission.percent, commission_value=0.1, slippage=3, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Inputs
a = input.int(1, title="Key Value. 'This changes the sensitivity'")
c = input.int(10, title="ATR Period")
h = input.bool(false, title="Signals from Heikin Ashi Candles")

xATR  = ta.atr(c)
nLoss = a * xATR

// Compute Heikin Ashi values
heikinAshiOpen = (open + close) / 2
heikinAshiClose = (open + high + low + close) / 4
heikinAshiHigh = math.max(high, math.max(heikinAshiOpen, heikinAshiClose))
heikinAshiLow = math.min(low, math.min(heikinAshiOpen, heikinAshiClose))

src = h ? heikinAshiClose : close

// Declare xATRTrailingStop as a float variable and initialize it with 'na'
var float xATRTrailingStop = na
if (src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0))
    xATRTrailingStop := math.max(nz(xATRTrailingStop[1]), src - nLoss)
else if (src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0))
    xATRTrailingStop := math.min(nz(xATRTrailingStop[1]), src + nLoss)
else
    xATRTrailingStop := src > nz(xATRTrailingStop[1], 0) ? src - nLoss : src + nLoss

// Declare 'pos' as an integer variable instead of leaving it undefined
var int pos = na
if (src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0))
    pos := 1
else if (src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0))
    pos := -1
else
    pos := nz(pos[1], 0)

xcolor = pos == -1 ? color.red : pos == 1 ? color.green : color.blue

ema = ta.ema(src, 1)
above = ta.crossover(ema, xATRTrailingStop)
below = ta.crossover(xATRTrailingStop, ema)

buy  = src > xATRTrailingStop and above
sell = src < xATRTrailingStop and below

barbuy  = src > xATRTrailingStop
barsell = src < xATRTrailingStop

// Plot buy/sell signals on the chart
plotshape(buy, title="Buy", text='Buy', style=shape.labelup, location=location.belowbar, color=color.new(color.green, 0), textcolor=color.white, size=size.tiny)
plotshape(sell, title="Sell", text='Sell', style=shape.labeldown, location=location.abovebar, color=color.new(color.red, 0), textcolor=color.white, size=size.tiny)

// Change bar color when buy/sell conditions are met
barcolor(barbuy ? color.green : na)
barcolor(barsell ? color.red : na)

// Enter a Long trade when a buy signal appears and exit when a sell signal appears
if (buy)
    strategy.entry("long", strategy.long)

if (sell)
    strategy.close("long")

```

> Detail

https://www.fmz.com/strategy/489301

> Last Modified

2025-04-03 11:34:48
