
> Name

Pivot-Based-Volume-Weighted-Breakout-Reversal-Strategy

> Author

ianzeng123

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/2d87e45522d5ef9112c83.png)
![IMG](https://www.fmz.com/upload/asset/2d80d09add8daa10daa4e.png)





#### Overview  
This strategy combines support/resistance (S/R) breakout/reversal, volume filtering, and alert systems to capture key market turning points. It identifies price breakout/reversal signals validated by abnormal volume activity to improve reliability. The strategy employs a fixed 2% stop loss and adjustable take profit (default 3%) for risk management.  

#### Strategy Logic  
1. **S/R Identification**: Uses `ta.pivothigh()` and `ta.pivotlow()` to detect key price levels within a specified period (pivotLen). Signals trigger when price breaks resistance (upward >1%) or bounces from support (false breakdown recovery).  
2. **Volume Filter**: Calculates volume SMA (volSmaLength periods). A valid signal requires current volume exceeding SMA by volMultiplier (default 1.5x).  
3. **Long/Short Logic**:  
   - **Long Condition**: Price breaks resistance (close > resZone*1.01) with high volume, or shows false breakdown near support (±1% range) with volume confirmation.  
   - **Short Condition**: Price breaks support (close < supZone*0.99) with high volume, or shows false breakout near resistance (±1% range) with volume confirmation.  
4. **Risk Management**: Fixed 2% stop loss and adjustable take profit (default 3%) via `strategy.exit()`.  

#### Advantages  
1. **Multi-Factor Validation**: Combines price structure (S/R), volume, and market behavior (false breaks), significantly reducing false signals.  
2. **Dynamic Adaptation**: Auto-updates S/R levels to adapt to market changes.  
3. **Strict Risk Control**: Fixed stop loss prevents excessive losses; adjustable take profit suits varying market conditions.  
4. **High Visibility**: Real-time S/R plotting and clear signal labels.  
5. **Alert Integration**: Compatible with automated trading systems.  

#### Risks  
1. **Range-Bound Risk**: Frequent false breakouts in choppy markets. Solution: Add trend filters like ADX or EMA.  
2. **Parameter Sensitivity**: pivotLen and volMultiplier require market-specific tuning. Solution: Parameter optimization and Walk-Forward testing.  
3. **Volume Lag**: Abnormal volume may follow price moves. Solution: Incorporate order book data or reduce volSmaLength.  
4. **Gap Risk**: Opening gaps may skip stop levels. Solution: Use limit orders or avoid high-volatility sessions.  

#### Optimization Directions  
1. **Trend Filtering**: Add ADX>25 or 200EMA direction filters to avoid counter-trend trades.  
2. **Dynamic Parameters**: Auto-adjust pivotLen and volMultiplier based on volatility (e.g., ATR).  
3. **Scaled Take Profit**: Implement two-tier exits (e.g., close 50% at 2%, trail remainder).  
4. **Machine Learning**: Train models to optimize volMultiplier and tpPerc historically.  
5. **Multi-Timeframe Confirmation**: Validate signals with higher timeframe S/R levels.  

#### Conclusion  
This strategy establishes a high-probability framework through triple validation (price position, volume, price action), ideal for capturing early trend phases. Its transparency and controlled risk are key strengths, though range-bound performance requires caution. Future enhancements should focus on parameter self-adaptation and trend filtering for greater robustness.  



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-24 00:00:00
end: 2024-12-31 00:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"DOGE_USDT"}]
*/

//@version=5
strategy("S/R Breakout/Reversal + Volume + Alerts", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// === INPUTS ===
pivotLen       = input.int(10, "Pivot Lookback for S/R")
volSmaLength   = input.int(20, "Volume SMA Length")
volMultiplier  = input.float(1.5, "Volume Multiplier")
tpPerc         = input.float(3.0, "Take Profit %", step=0.1)
slPerc         = 2.0  // Stop Loss fixed at 2%

// === S/R ZONES ===
pivotHigh = ta.pivothigh(high, pivotLen, pivotLen)
pivotLow  = ta.pivotlow(low, pivotLen, pivotLen)

var float resZone = na
var float supZone = na
if not na(pivotHigh)
    resZone := pivotHigh
if not na(pivotLow)
    supZone := pivotLow

plot(supZone, title="Support", color=color.green, linewidth=2, style=plot.style_linebr)
plot(resZone, title="Resistance", color=color.red,   linewidth=2, style=plot.style_linebr)

// === VOLUME FILTER ===
volSma     = ta.sma(volume, volSmaLength)
highVolume = volume > volSma * volMultiplier

// === LONG LOGIC ===
priceAboveRes     = close > resZone * 1.01
nearSupport       = close >= supZone * 0.99 and close <= supZone * 1.01
rejectSupport     = low <= supZone and close > supZone
longBreakoutCond  = priceAboveRes and highVolume
longReversalCond  = nearSupport and rejectSupport and highVolume
longCondition     = longBreakoutCond or longReversalCond

// === SHORT LOGIC ===
priceBelowSup     = close < supZone * 0.99
nearResistance    = close >= resZone * 0.99 and close <= resZone * 1.01
rejectResistance  = high >= resZone and close < resZone
shortBreakoutCond = priceBelowSup and highVolume
shortReversalCond = nearResistance and rejectResistance and highVolume
shortCondition    = shortBreakoutCond or shortReversalCond

// === ENTRIES WITH LABELS ===
if (longCondition)
    strategy.entry("Long", strategy.long)
    label.new(bar_index, low * 0.995, "BUY", style=label.style_label_up, color=color.green, textcolor=color.white)

if (shortCondition)
    strategy.entry("Short", strategy.short)
    label.new(bar_index, high * 1.005, "SELL", style=label.style_label_down, color=color.red, textcolor=color.white)

// === TP/SL ===
longTP  = close * (1 + tpPerc / 100)
longSL  = close * (1 - slPerc / 100)
shortTP = close * (1 - tpPerc / 100)
shortSL = close * (1 + slPerc / 100)

strategy.exit("Long TP/SL",  from_entry="Long",  limit=longTP,  stop=longSL)
strategy.exit("Short TP/SL", from_entry="Short", limit=shortTP, stop=shortSL)

// === ALERT CONDITIONS ===
alertcondition(longCondition,  title="Buy Alert",  message="? BUY signal: S/R + Volume breakout/reversal")
alertcondition(shortCondition, title="Sell Alert", message="? SELL signal: S/R + Volume breakout/reversal")

```

> Detail

https://www.fmz.com/strategy/491895

> Last Modified

2025-04-24 17:08:39
