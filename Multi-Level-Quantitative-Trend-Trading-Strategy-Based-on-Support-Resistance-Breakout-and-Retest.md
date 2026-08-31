
> Name

Multi-Level-Quantitative-Trend-Trading-Strategy-Based-on-Support-Resistance-Breakout-and-Retest

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d886439c2ab33d317c8d.png)
![IMG](https://www.fmz.com/upload/asset/2d8dbab0fb019186c877a.png)

#### Overview
This is a quantitative trading strategy based on support-resistance breakout and retest. The strategy identifies key price support and resistance levels, executing trades at retest confirmation points after breakouts. It uses dynamic left and right bar lookback to locate key levels and incorporates retest tolerance to filter false breakouts, thereby improving trading accuracy and stability.

#### Strategy Principles
The strategy includes the following core logic:
1. Identifies key support and resistance pivot points using specified left and right bar lookback
2. Uses state variables to track breakout and retest situations for candidate support-resistance levels
3. Updates candidate support-resistance levels when new pivot points appear
4. Executes trades when price breaks and retests candidate support-resistance levels:
   - Goes long when price drops below support and rebounds near support
   - Goes short when price breaks above resistance and falls back near resistance
5. Uses tolerance parameter to filter price fluctuations during retests, improving signal quality

#### Strategy Advantages
1. Based on classic technical analysis theory, clear and easy to understand
2. Strong adaptability through dynamic key level identification
3. Reduces false signals by combining breakout and retest confirmation
4. Filters noise using tolerance parameters, improving accuracy
5. Clear code structure, easy to maintain and extend
6. Applicable to multiple timeframes and instruments

#### Strategy Risks
1. May result in losses from frequent trading in ranging markets
2. False breakout signals still exist
3. Parameter optimization may lead to overfitting
4. Large stop losses possible during high market volatility
5. Need to consider impact of trading costs

#### Strategy Optimization Directions
1. Add trend filter to trade only in primary trend direction
2. Incorporate volume confirmation mechanism
3. Optimize entry timing by adding technical indicator confirmation
4. Improve stop loss and take profit mechanism
5. Add position management logic
6. Consider multi-timeframe analysis

#### Summary
The strategy is built on classic support-resistance theory and breakout-retest logic with a solid theoretical foundation. Stable trading results can be achieved through parameter optimization and risk control. The strategy code structure is clear, easy to understand and extend, with strong practical value. It is recommended to adjust parameters appropriately in live trading based on market conditions and personal risk preference.
> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-21 00:00:00
end: 2025-02-18 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Binance","currency":"ETH_USDT"}]
*/

//@version=5
strategy("SR Breakout & Retest Strategy (4hr)", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=10)

// ===== USER INPUTS =====
leftBars    = input.int(3, "Left Pivot Bars", minval=1)
rightBars   = input.int(3, "Right Pivot Bars", minval=1)
tolerance   = input.float(0.005, "Retest Tolerance (Fraction)", step=0.001)

// ===== PIVOT CALCULATION =====
pLow  = ta.pivotlow(low, leftBars, rightBars)
pHigh = ta.pivothigh(high, leftBars, rightBars)

// ===== STATE VARIABLES FOR CANDIDATE LEVELS =====
var float candidateSupport  = na
var bool  supportBroken     = false
var bool  supportRetested   = false

var float candidateResistance = na
var bool  resistanceBroken    = false
var bool  resistanceRetested  = false

// ===== UPDATE CANDIDATE LEVELS =====
if not na(pLow)
    candidateSupport := pLow
    supportBroken    := false
    supportRetested  := false

if not na(pHigh)
    candidateResistance := pHigh
    resistanceBroken    := false
    resistanceRetested  := false

// ===== CHECK FOR BREAKOUT & RETEST =====
// -- Support: Price breaks below candidate support and then retests it --
if not na(candidateSupport)
    if not supportBroken and low < candidateSupport
        supportBroken := true

    if supportBroken and not supportRetested and close >= candidateSupport and math.abs(low - candidateSupport) <= candidateSupport * tolerance
        supportRetested := true
        label.new(bar_index, candidateSupport, "Support Retest", 
                  style=label.style_label_up, color=color.green, textcolor=color.white, size=size.tiny)
        // Example trading logic: Enter a long position on support retest
        strategy.entry("Long_Support", strategy.long)

// -- Resistance: Price breaks above candidate resistance and then retests it --
if not na(candidateResistance)
    if not resistanceBroken and high > candidateResistance
        resistanceBroken := true

    if resistanceBroken and not resistanceRetested and close <= candidateResistance and math.abs(high - candidateResistance) <= candidateResistance * tolerance
        resistanceRetested := true
        label.new(bar_index, candidateResistance, "Resistance Retest", 
                  style=label.style_label_down, color=color.red, textcolor=color.white, size=size.tiny)
        // Example trading logic: Enter a short position on resistance retest
        strategy.entry("Short_Resistance", strategy.short)

// ===== PLOTTING =====
plot(pLow, title="Pivot Low (Support)", style=plot.style_circles, color=color.green, linewidth=2)
plot(pHigh, title="Pivot High (Resistance)", style=plot.style_circles, color=color.red, linewidth=2)


```

> Detail

https://www.fmz.com/strategy/482873

> Last Modified

2025-02-20 16:00:35
