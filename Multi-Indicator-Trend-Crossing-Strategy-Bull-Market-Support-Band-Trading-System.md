
> Name

Multi-Indicator-Trend-Crossing-Strategy-Bull-Market-Support-Band-Trading-System

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/1756bd7de5cab74e8e2.png)

#### Overview
This strategy is a trend-following trading system based on the Bull Market Support Band. It primarily uses crossover signals between the 20-week Simple Moving Average (SMA) and 21-week Exponential Moving Average (EMA) to determine market trend direction and make trading decisions. The strategy generates long signals when the moving averages cross upward and exits when they cross downward, aiming to capture medium to long-term trend opportunities.

#### Strategy Principles
The core logic of the strategy is to monitor the relative position of the 20-week SMA and 21-week EMA to judge market trends. When the shorter-term average (20-week SMA) breaks above the longer-term average (21-week EMA), it indicates a potential uptrend, triggering a long position entry. When the shorter-term average falls below the longer-term average, it signals a potential end to the uptrend, triggering position closure. The strategy employs percent_of_equity position management, with a trading commission of 0.1% and slippage of 3 basis points.

#### Strategy Advantages
1. Strong trend following: Uses weekly timeframe moving average crossovers to filter short-term market noise and capture medium to long-term trend opportunities
2. Reasonable risk control: Uses dynamic moving averages as stop-loss references for timely market exits
3. Scientific parameter setting: 20-week and 21-week parameters ensure signal stability without excessive lag
4. Clear execution logic: Entry and exit signals are explicit, eliminating subjective judgment
5. Flexible capital management: Supports position sizing based on account equity, allowing dynamic position adjustment

#### Strategy Risks
1. Ineffective in ranging markets: Frequent crossovers during sideways markets can lead to false breakouts and consecutive losses
2. Significant slippage impact: Weekly timeframe trades may face substantial slippage in real trading
3. Delayed entry timing: Moving average crossover signals are inherently lagging, potentially missing optimal entry points
4. Insufficient drawdown control: Relying solely on moving average crossovers for stop-loss can lead to large drawdowns
5. High capital requirements: Weekly timeframe trading demands substantial capital and psychological resilience

#### Optimization Directions
1. Add filtering indicators: Incorporate RSI, MACD, etc., to confirm trends and improve signal reliability
2. Optimize stop-loss mechanism: Implement dynamic stop-loss using ATR indicator to enhance risk control
3. Improve position management: Dynamically adjust position sizes based on market volatility
4. Add trend filtering: Introduce longer-term trend judgment to trade only in the primary trend direction
5. Enhance trade execution: Optimize trading rules to reduce slippage impact and improve strategy stability

#### Summary
The Bull Market Support Band trading strategy is a trend-following system based on classical technical analysis theory. It captures medium to long-term trend opportunities through weekly timeframe moving average crossovers, featuring clear logic and controllable risk. However, the strategy performs poorly in ranging markets and exhibits some lag. Through the addition of auxiliary indicators, stop-loss optimization, and improved capital management, the strategy has significant room for optimization. It is suitable for investors with substantial capital and risk tolerance.
> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-25 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0
// © zkdev

//@version=6
strategy(title='Demo GPT - Bull Market Support Band', 
     overlay=true, 
     default_qty_type=strategy.percent_of_equity, 
     default_qty_value=100, 
     commission_type=strategy.commission.percent, 
     commission_value=0.1, 
     slippage=3)

// -------------------------------------------------------------------------
// Compile-time timestamp constants for default date range
// (2018-01-01 00:00:00 UTC -> 1514764800000
//  2069-12-31 23:59:59 UTC -> 3155759999000)
// -------------------------------------------------------------------------
const int defaultFromDate = 1514764800000
const int defaultToDate   = 3155759999000

// -------------------------------------------------------------------------
// Inputs: date range
// -------------------------------------------------------------------------
fromDate = input(title='Start Date', defval=defaultFromDate)
toDate   = input(title='End Date',   defval=defaultToDate)

// -------------------------------------------------------------------------
// Indicator settings & calculations
// -------------------------------------------------------------------------
smaLength = 20
emaLength = 21

source = close
sma    = ta.sma(source, smaLength)
ema    = ta.ema(source, emaLength)

// -------------------------------------------------------------------------
// Fetch weekly SMA & EMA
// -------------------------------------------------------------------------
outSma = request.security(syminfo.tickerid, 'W', sma, gaps=barmerge.gaps_on, lookahead=barmerge.lookahead_off)
outEma = request.security(syminfo.tickerid, 'W', ema, gaps=barmerge.gaps_on, lookahead=barmerge.lookahead_off)

// -------------------------------------------------------------------------
// Plot visuals (20w SMA, 21w EMA, fill in between)
// -------------------------------------------------------------------------
smaPlot = plot(outSma, color=color.new(color.red,   0), title='20w SMA')
emaPlot = plot(outEma, color=color.new(color.green, 0), title='21w EMA')
fill(smaPlot, emaPlot, color=color.new(color.orange, 75), fillgaps=true)

// -------------------------------------------------------------------------
// We evaluate crossover/crossunder on *every bar* and store the result
// -------------------------------------------------------------------------
crossUp   = ta.crossover(outSma, outEma)
crossDown = ta.crossunder(outSma, outEma)

// -------------------------------------------------------------------------
// Trade logic: only operate within chosen date range
// Buy when outSma crosses above outEma; Sell (close) when outSma crosses below outEma
// -------------------------------------------------------------------------
inDateRange = true

if inDateRange
    // If we have a crossUp event on this bar, buy (go Long)
    if crossUp
        strategy.entry('Long', strategy.long)

    // If we have a crossDown event on this bar, sell (close Long)
    if crossDown
        strategy.close('Long')

```

> Detail

https://www.fmz.com/strategy/476252

> Last Modified

2024-12-27 14:35:53
