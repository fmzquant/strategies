
> Name

ATR-Dynamic-Trailing-Stop-Trend-Following-Trading-System

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d8777b94db5631ca2646.png)
![IMG](https://www.fmz.com/upload/asset/2d8aecd0ae154c5f0252b.png)

#### Overview
This strategy is a trend following system based on ATR (Average True Range) dynamic trailing stop. It combines EMA as trend filter and controls signal generation through adjustable sensitivity parameters and ATR period. The system supports both long and short trades with comprehensive profit management mechanism.

#### Strategy Principle
1. Uses ATR indicator to calculate price volatility and determines trailing stop distance based on set sensitivity coefficient (Key Value)
2. Uses EMA to judge market trend direction, only opening long positions above EMA and short positions below EMA
3. Triggers trading signals when price breaks through trailing stop line and aligns with trend direction
4. System employs staged profit management:
   - At 20%-50% profit, raises stop loss to breakeven
   - At 50%-80% profit, takes partial profit and tightens stop loss
   - At 80%-100% profit, further tightens stop loss to protect profits
   - Above 100% profit, closes entire position

#### Strategy Advantages
1. Dynamic trailing stop effectively follows trends while preventing premature exits
2. EMA trend filtering effectively reduces false breakout risks
3. Staged profit mechanism ensures profit realization while giving trends room to develop
4. Supports both long and short trading, fully capturing market opportunities
5. Strong parameter adjustability, adapting to different market environments

#### Strategy Risks
1. May result in losses from frequent trading in ranging markets
2. Potentially large drawdowns during trend reversal initiation
3. Improper parameter settings may affect strategy performance
Risk control suggestions:
- Recommended use in clear trending markets
- Careful parameter selection through backtesting
- Set maximum drawdown limits
- Consider adding market condition filters

#### Strategy Optimization Directions
1. Add market environment recognition mechanism to use different parameters under different market conditions
2. Introduce volume and other auxiliary indicators to enhance signal reliability
3. Optimize profit management mechanism with dynamic profit targets based on volatility
4. Add time filters to avoid trading during unfavorable periods
5. Consider adding volatility filters to reduce trading frequency during excessive volatility

#### Summary
This is a well-structured trend following system with clear logic. Through the combination of ATR dynamic tracking and EMA trend filtering, it captures trends while maintaining good risk control. The staged profit mechanism design reflects mature trading thinking. The strategy has strong practicality and extensibility, with potential for better trading results through continuous optimization and improvement.


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-15 00:00:00
end: 2025-02-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Enhanced UT Bot with Long & Short Trades", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Input Parameters
keyvalue = input.float(1.1, title="Key Value (Sensitivity)", step=0.1)
atrperiod = input.int(200, title="ATR Period")
emaPeriod = input.int(50, title="EMA Period")
roi_close = input.float(100, title="Close Trade at ROI (%)", step=1)

// ATR Calculation
src = close
xATR = ta.atr(atrperiod)
nLoss = keyvalue * xATR

// EMA for Trend Filtering
ema = ta.ema(src, emaPeriod)

// Trailing Stop Logic
var float xATRTrailingStop = na
if na(xATRTrailingStop)
    xATRTrailingStop := src - nLoss

if src > nz(xATRTrailingStop[1]) and src[1] > nz(xATRTrailingStop[1])
    xATRTrailingStop := math.max(nz(xATRTrailingStop[1]), src - nLoss)
else if src < nz(xATRTrailingStop[1]) and src[1] < nz(xATRTrailingStop[1])
    xATRTrailingStop := math.min(nz(xATRTrailingStop[1]), src + nLoss)
else
    xATRTrailingStop := src > nz(xATRTrailingStop[1]) ? src - nLoss : src + nLoss

// Buy/Sell Signal with Trend Filter
buySignal = ta.crossover(src, xATRTrailingStop) and src > ema
sellSignal = ta.crossunder(src, xATRTrailingStop) and src < ema

// Strategy Logic: Long Trades
if buySignal and strategy.position_size <= 0
    strategy.entry("Buy", strategy.long)

if sellSignal and strategy.position_size > 0
    strategy.close("Buy")

// Strategy Logic: Short Trades
if sellSignal and strategy.position_size >= 0
    strategy.entry("Sell", strategy.short)

if buySignal and strategy.position_size < 0
    strategy.close("Sell")

// ROI Calculation for Both Long and Short Trades
var float entryPrice = na
var bool isLong = na
if strategy.position_size > 0
    entryPrice := strategy.opentrades.entry_price(0)
    isLong := true
if strategy.position_size < 0
    entryPrice := strategy.opentrades.entry_price(0)
    isLong := false

// Calculate current profit
currentProfit = isLong ? (close - entryPrice) / entryPrice * 100 : (entryPrice - close) / entryPrice * 100

// Enhanced ROI Management
if strategy.position_size > 0 // Long Position
    if currentProfit >= 20 and currentProfit < 50
        stopLevel = entryPrice // Breakeven
        strategy.exit("TSL Breakeven", from_entry="Buy", stop=stopLevel)
    if currentProfit >= 50 and currentProfit < 80
        stopLevel = entryPrice * 1.30 // 30% ROI
        strategy.exit("TSL 30%", from_entry="Buy", stop=stopLevel)
        strategy.close("Partial Profit", qty_percent=50) // Take 50% profit
    if currentProfit >= 80 and currentProfit < roi_close
        stopLevel = entryPrice * 1.60 // 60% ROI
        strategy.exit("TSL 60%", from_entry="Buy", stop=stopLevel)
    if currentProfit >= roi_close
        strategy.close("Full Exit at 100% ROI")

if strategy.position_size < 0 // Short Position
    if currentProfit >= 20 and currentProfit < 50
        stopLevel = entryPrice // Breakeven
        strategy.exit("TSL Breakeven", from_entry="Sell", stop=stopLevel)
    if currentProfit >= 50 and currentProfit < 80
        stopLevel = entryPrice * 0.70 // 30% ROI (Short stop)
        strategy.exit("TSL 30%", from_entry="Sell", stop=stopLevel)
        strategy.close("Partial Profit", qty_percent=50) // Take 50% profit
    if currentProfit >= 80 and currentProfit < roi_close
        stopLevel = entryPrice * 0.40 // 60% ROI (Short stop)
        strategy.exit("TSL 60%", from_entry="Sell", stop=stopLevel)
    if currentProfit >= roi_close
        strategy.close("Full Exit at 100% ROI")

// Plotting
plot(xATRTrailingStop, color=buySignal ? color.green : sellSignal ? color.red : color.gray, title="Trailing Stop")
plot(ema, color=color.blue, title="EMA Trend Filter")
plotshape(buySignal, title="Buy Signal", style=shape.labelup, location=location.belowbar, color=color.green, text="Buy")
plotshape(sellSignal, title="Sell Signal", style=shape.labeldown, location=location.abovebar, color=color.red, text="Sell")

```

> Detail

https://www.fmz.com/strategy/482822

> Last Modified

2025-02-20 14:53:21
