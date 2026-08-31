
> Name

双重MACD价格行为突破追踪策略-Dual-MACD-Price-Action-Breakout-Trailing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1187044a8bffce7d680.png)


#### Overview
This is a trading strategy that combines dual MACD indicators with price action analysis. The strategy identifies market trends through color changes in the MACD histograms on the 15-minute timeframe, looks for strong candle patterns on the 5-minute timeframe, and confirms breakout signals on the 1-minute timeframe. It employs ATR-based dynamic stop-loss and trailing take-profit mechanisms to effectively manage risk while maximizing profit potential.

#### Strategy Principles
The strategy utilizes two MACD indicators with different parameters (34/144/9 and 100/200/50) to confirm market trends. When both MACD histograms show the same color trend, the system looks for strong candle patterns on the 5-minute chart, characterized by bodies 1.5 times larger than their shadows. Once a strong candle is identified, the system monitors for breakouts on the 1-minute chart. Positions are opened when price breaks above highs in uptrends or below lows in downtrends. Stops are set based on ATR, while a 1.5x ATR multiple is used for dynamic trailing take-profits.

#### Strategy Advantages
1. Multi-timeframe analysis: Combines 15-minute, 5-minute, and 1-minute timeframes for improved signal reliability
2. Trend confirmation: Uses dual MACD cross-validation to reduce false signals
3. Price action analysis: Identifies key price levels through strong candle patterns
4. Dynamic risk management: Adaptive stop-loss and trailing take-profit mechanisms based on ATR
5. Signal filtering: Strict entry conditions reduce false trades
6. High automation: Fully automated trading reduces human intervention

#### Strategy Risks
1. Trend reversal risk: False breakouts possible in highly volatile markets
2. Slippage risk: High-frequency trading on 1-minute timeframe may face slippage
3. Overtrading risk: Frequent signals may lead to excessive trading
4. Market environment dependence: May underperform in ranging markets
Mitigation measures:
- Add trend filters
- Set minimum volatility thresholds
- Implement trade frequency limits
- Introduce market environment recognition

#### Optimization Directions
1. MACD parameter optimization: Adjust MACD parameters based on market characteristics
2. Stop-loss optimization: Consider adding volatility-based dynamic stops
3. Trading time filters: Add trading window restrictions
4. Position management: Implement scaled entry and exit mechanisms
5. Market environment filtering: Add trend strength indicators
6. Drawdown control: Introduce equity curve-based risk control

#### Summary
This is a comprehensive strategy system combining technical analysis and risk management. It ensures trade quality through multi-timeframe analysis and strict signal filtering while effectively managing risk through dynamic stops and trailing profits. The strategy shows strong adaptability but requires continuous optimization based on market conditions. For live trading, thorough backtesting and parameter optimization are recommended, along with adjustments based on specific market characteristics.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-11-24 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=5
strategy("Price Action + Double MACD Strategy with ATR Trailing", overlay=true)

// Inputs for MACD
fastLength1 = input.int(34, title="First MACD Fast Length")
slowLength1 = input.int(144, title="First MACD Slow Length")
signalLength1 = input.int(9, title="First MACD Signal Length")

fastLength2 = input.int(100, title="Second MACD Fast Length")
slowLength2 = input.int(200, title="Second MACD Slow Length")
signalLength2 = input.int(50, title="Second MACD Signal Length")

// Input for ATR Trailing
atrMultiplier = input.float(1.5, title="ATR Multiplier for Trailing")

// Inputs for Stop Loss
atrStopMultiplier = input.float(1.0, title="ATR Multiplier for Stop Loss")

// MACD Calculations
[macdLine1, signalLine1, macdHist1] = ta.macd(close, fastLength1, slowLength1, signalLength1)
[macdLine2, signalLine2, macdHist2] = ta.macd(close, fastLength2, slowLength2, signalLength2)

// Get 15M MACD histogram colors
macdHist1Color = request.security(syminfo.tickerid, "15", (macdHist1 >= 0 ? (macdHist1[1] < macdHist1 ? #26A69A : #B2DFDB) : (macdHist1[1] < macdHist1 ? #FFCDD2 : #FF5252)))
macdHist2Color = request.security(syminfo.tickerid, "15", (macdHist2 >= 0 ? (macdHist2[1] < macdHist2 ? #26A69A : #B2DFDB) : (macdHist2[1] < macdHist2 ? #FFCDD2 : #FF5252)))

// Check MACD color conditions
isMacdUptrend = macdHist1Color == #26A69A and macdHist2Color == #26A69A
isMacdDowntrend = macdHist1Color == #FF5252 and macdHist2Color == #FF5252

// Function to detect strong 5M candles
isStrongCandle(open, close, high, low) =>
    body = math.abs(close - open)
    tail = math.abs(high - low) - body
    body > tail * 1.5  // Ensure body is larger than the tail

// Variables to track state
var float fiveMinuteHigh = na
var float fiveMinuteLow = na
var bool tradeExecuted = false
var bool breakoutDetected = false
var float entryPrice = na
var float stopLossPrice = na
var float longTakeProfit = na
var float shortTakeProfit = na

// Check for new 15M candle and reset flags
if ta.change(time("15"))
    tradeExecuted := false      // Reset trade execution flag
    breakoutDetected := false  // Reset breakout detection
    if isStrongCandle(open[1], close[1], high[1], low[1])
        fiveMinuteHigh := high[1]
        fiveMinuteLow := low[1]
    else
        fiveMinuteHigh := na
        fiveMinuteLow := na

// Get 1-minute close prices
close1m = request.security(syminfo.tickerid, "5", close)

// Ensure valid breakout direction and avoid double breakouts
if not na(fiveMinuteHigh) and not breakoutDetected
    for i = 1 to 3
        if close1m[i] > fiveMinuteHigh and not tradeExecuted  // 1M breakout check with close
            breakoutDetected := true
            if isMacdUptrend 
                // Open Long trade
                entryPrice := close
                stopLossPrice := close - (atrStopMultiplier * ta.atr(14))  // ATR-based stop loss
                longTakeProfit := close + (atrMultiplier * ta.atr(14)) // Initialize take profit

                strategy.entry("Long", strategy.long)
                tradeExecuted := true
            break // Exit the loop after detecting a breakout

        else if close1m[i] < fiveMinuteLow and not tradeExecuted  // 1M breakout check with close
            breakoutDetected := true
            if isMacdDowntrend
                // Open Short trade
                entryPrice := close
                stopLossPrice := close + (atrStopMultiplier * ta.atr(14))  // ATR-based stop loss
                shortTakeProfit := close - (atrMultiplier * ta.atr(14)) // Initialize take profit

                strategy.entry("Short", strategy.short)
                tradeExecuted := true
            break // Exit the loop after detecting a breakout

// Update trailing take-profit dynamically
if tradeExecuted and strategy.position_size > 0  // Long trade
    longTakeProfit := math.max(longTakeProfit, close + (atrMultiplier * ta.atr(14)))
    strategy.exit("Long TP/SL", "Long", stop=stopLossPrice, limit=longTakeProfit)

else if tradeExecuted and strategy.position_size < 0  // Short trade
    shortTakeProfit := math.min(shortTakeProfit, close - (atrMultiplier * ta.atr(14)))
    strategy.exit("Short TP/SL", "Short", stop=stopLossPrice, limit=shortTakeProfit)

// Reset trade state when position is closed
if strategy.position_size == 0
    tradeExecuted := false
    entryPrice := na
    longTakeProfit := na
    shortTakeProfit := na
```

> Detail

https://www.fmz.com/strategy/472938

> Last Modified

2024-11-25 11:15:50
