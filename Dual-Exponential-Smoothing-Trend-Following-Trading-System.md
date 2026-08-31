
> Name

Dual-Exponential-Smoothing-Trend-Following-Trading-System

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/f9af59acffda983922.png)

#### Overview
This strategy is an innovative trend following trading system that employs dual-layer exponential smoothing technology to identify market trends. The system processes price data through a special exponential smoothing technique to generate two trend lines for capturing short-term and long-term market movements. It integrates a complete risk management module, including profit-taking and stop-loss settings, along with flexible position management capabilities.

#### Strategy Principle
The core of the strategy lies in its unique dual-layer exponential smoothing algorithm. First, the system applies weighted processing to the closing price, calculated as (High+Low+2*Close)/4, which helps reduce market noise. Then, through a custom exponential smoothing function, it calculates 9-period and 30-period smoothing curves. Trading signals are generated when the short-term curve crosses the long-term curve. An upward cross generates a long signal, while a downward cross generates a short signal. The system also includes a percentage-based position management system, defaulting to 100% of account equity for trading.

#### Strategy Advantages
1. Clear signal generation mechanism based on classic trend-following principles, easy to understand and execute.
2. Dual-layer exponential smoothing technology effectively filters market noise and improves signal quality.
3. Integrated complete risk management system, including profit-taking, stop-loss, and position management.
4. System can adapt to different market environments and is suitable for various trading instruments.
5. Provides clear visual indicators for traders to quickly judge market direction.

#### Strategy Risks
1. May generate frequent false signals in ranging markets, leading to consecutive stops.
2. Default 100% equity usage for trading may carry excessive leverage risk.
3. Fixed-point profit-taking and stop-loss settings may not suit all market environments.
4. System may experience slippage in volatile markets, affecting execution quality.
5. Historical backtest results cannot guarantee future performance.

#### Strategy Optimization Directions
1. Introduce volatility indicators (like ATR) to dynamically adjust profit-taking and stop-loss levels.
2. Add trend strength filters to reduce trading frequency in weak trend environments.
3. Incorporate market environment recognition module to automatically adjust strategy parameters in ranging markets.
4. Develop dynamic position management system to automatically adjust trading size based on market conditions.
5. Integrate fundamental analysis module to improve trading decision accuracy.

#### Summary
This is a well-designed trend following system with clear logic. Through dual-layer exponential smoothing technology and a complete risk management system, the strategy can perform well in trending markets. However, users need to adjust position sizes according to their risk tolerance and are advised to conduct thorough backtesting before live trading. Through the suggested optimization directions, this strategy has room for further improvement.
> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-10 00:00:00
end: 2025-02-08 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5  
strategy("Dynamic Trend Navigator AI [CodingView]", overlay=true, initial_capital=100000, default_qty_type=strategy.percent_of_equity , default_qty_value=200 )  


// ==================================================================================================  
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/  
// © CodingView_23
//  
// Script Name: Dynamic Trend Navigator  
// Developed by: theCodingView Team  
// Contact: support@theCodingView.com  
// Website: www.theCodingView.com  
//  
// Description: Implements an adaptive trend-following strategy using proprietary smoothing algorithms.  
// Features include:  
// - Dual timeframe trend analysis  
// - Custom exponential smoothing technique  
// - Integrated risk management (profit targets & stop-loss)  
// - Visual trend direction indicators  
// ==================================================================================================  



// ====== Enhanced Input Configuration ======  
primaryLookbackWindow = input.int(9, "Primary Trend Window", minval=2)  
secondaryLookbackWindow = input.int(30, "Secondary Trend Window", minval=5)  

// ====== Custom Exponential Smoothing Implementation ======  
customSmoothingFactor(periods) =>  
    smoothingWeight = 2.0 / (periods + 1)  
    smoothingWeight  

adaptivePricePosition(priceSource, lookback) =>  
    weightedSum = 0.0  
    smoothingCoefficient = customSmoothingFactor(lookback)  
    cumulativeWeight = 0.0  
    for iteration = 0 to lookback - 1 by 1  
        historicalWeight = math.pow(1 - smoothingCoefficient, iteration)  
        weightedSum := weightedSum + priceSource[iteration] * historicalWeight  
        cumulativeWeight := cumulativeWeight + historicalWeight  
    weightedSum / cumulativeWeight  

// ====== Price Transformation Pipeline ======  
modifiedClose = (high + low + close * 2) / 4  
smoothedSeries1 = adaptivePricePosition(modifiedClose, primaryLookbackWindow)  
smoothedSeries2 = adaptivePricePosition(modifiedClose, secondaryLookbackWindow)  

// ====== Signal Detection System ======  
trendDirectionUp = smoothedSeries1 > smoothedSeries2 and smoothedSeries1[1] <= smoothedSeries2[1]  
trendDirectionDown = smoothedSeries1 < smoothedSeries2 and smoothedSeries1[1] >= smoothedSeries2[1]  

// ====== Visual Representation Module ======  
plot(smoothedSeries1, "Dynamic Trend Line", #4CAF50, 2)  
plot(smoothedSeries2, "Market Phase Reference", #F44336, 2)  

// ====== Risk Management Configuration ======  
enableRiskParameters = input.bool(true, "Activate Risk Controls")  
profitTargetUnits = input.float(30, "Profit Target Points")  
lossLimitUnits = input.float(30, "Stop-Loss Points")  

// ====== Position Management Logic ======  
var float entryPrice = na  
var float profitTarget = na  
var float stopLoss = na  

// ====== Long Position Logic ======  
if trendDirectionUp  
    strategy.close("Short", comment="Short Close")  
    strategy.entry("Long", strategy.long)  
    entryPrice := close  
    profitTarget := close + profitTargetUnits  
    stopLoss := close - lossLimitUnits  

if enableRiskParameters  
    strategy.exit("Long Exit", "Long", limit=profitTarget, stop=stopLoss)  

// ====== Short Position Logic ======  
if trendDirectionDown  
    strategy.close("Long", comment="Long Close")  
    strategy.entry("Short", strategy.short)  
    entryPrice := close  
    profitTarget := close - profitTargetUnits  
    stopLoss := close + lossLimitUnits  

if enableRiskParameters  
    strategy.exit("Short Exit", "Short", limit=profitTarget, stop=stopLoss)  

// ====== Visual Signals ======  
plotshape(trendDirectionUp, "Bullish", shape.labelup, location.belowbar, #00C853, text="▲", textcolor=color.white)  
plotshape(trendDirectionDown, "Bearish", shape.labeldown, location.abovebar, #D50000, text="▼", textcolor=color.white)  

// ====== Branding Module ======  
var brandingTable = table.new(position.bottom_right, 1, 1)  
if barstate.islast  
    table.cell(brandingTable, 0, 0, "Trading System v2.0", text_color=color.new(#607D8B, 50))
```

> Detail

https://www.fmz.com/strategy/481355

> Last Modified

2025-02-10 14:46:36
