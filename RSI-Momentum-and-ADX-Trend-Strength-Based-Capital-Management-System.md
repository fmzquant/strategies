
> Name

RSI-Momentum-and-ADX-Trend-Strength-Based-Capital-Management-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d727085206ec4fcf88.png)

#### Overview
This strategy is a hybrid system combining trend following and swing trading, achieving stable trading through multiple technical indicator screening and strict capital management. The strategy adopts a stepped take-profit approach to lock in profits while setting maximum drawdown control to manage risk while ensuring returns. The system uses RSI momentum indicator and ADX trend strength indicator as the main trading signal triggers, combined with volume, ATR, and EMA multiple filters to ensure trading effectiveness.

#### Strategy Principle
The core logic of the strategy includes the following key elements:
1. Entry conditions require simultaneous satisfaction: trading volume greater than 1M, ADX greater than 25 indicating clear trend, RSI greater than 60 showing strong momentum, ATR greater than 2 ensuring sufficient volatility range, price above 200-day moving average maintaining uptrend.
2. Stepped take-profit design: first take-profit at 15%, closing 50% position; second take-profit at 30%, closing remaining position. This design both locks in partial profits early and doesn't miss big trends.
3. Stop-loss control: 15% stop-loss position protects capital, while also exiting when RSI falls below 50 or price breaks below 200 MA.
4. Drawdown management: real-time tracking of strategy equity, triggering systemic risk control and clearing all positions when drawdown exceeds 30%.

#### Strategy Advantages
1. Multiple technical indicators cross-validation improves trading signal reliability
2. Stepped take-profit design balances short-term profit and capturing major trends
3. Complete risk control system, including individual stock stop-loss and systemic risk control
4. Strict trading conditions effectively filter false signals
5. Clear strategy logic, easy to adjust parameters based on market conditions

#### Strategy Risks
1. Multiple indicator filtering may miss some trading opportunities
2. Frequent stop-losses may be triggered in oscillating markets
3. Fixed percentage stop-loss and take-profit settings may not suit all market environments
4. Strategy relies on technical indicators, may have insufficient response to fundamental sudden events
5. Requires larger capital scale to meet trading volume requirements

#### Strategy Optimization Directions
1. Introduce adaptive stop-loss and take-profit mechanisms, dynamically adjusting based on market volatility
2. Add market environment judgment module, using different parameter settings under different market conditions
3. Optimize ADX calculation method, consider using adaptive periods
4. Include transaction cost consideration, optimize position management system
5. Develop machine learning-based signal filtering mechanism

#### Summary
This strategy is a comprehensive trading system achieving stable trading through multiple technical indicators and strict capital management. The core advantages of the strategy lie in its complete risk control system and stepped take-profit mechanism, but attention needs to be paid to timely parameter adjustments based on market conditions in practical application. The strategy's further optimization space mainly lies in parameter dynamic adaptation and signal filtering mechanism improvement.



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-20 00:00:00
end: 2024-12-18 08:00:00
period: 2d
basePeriod: 2d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Swing Strategy (<30% DD)", shorttitle="SwingStratDD", overlay=true)

//-----------------------------------------------------
// Example Indicators and Logic
//-----------------------------------------------------
emaLen   = input.int(200, "EMA Length", minval=1)
emaValue = ta.ema(close, emaLen)

plot(emaValue, color=color.yellow, linewidth=2, title="EMA 200")


//-----------------------------------------------------
// User Inputs
//-----------------------------------------------------
adxLen           = input.int(14,  "ADX Length",      minval=1)
rsiLen           = input.int(14,  "RSI Length",      minval=1)
atrLen           = input.int(14,  "ATR Length",      minval=1)

rsiBuyThresh     = input.float(60, "RSI Buy Threshold",     minval=1, maxval=100)
adxThresh        = input.float(25, "ADX Threshold (Trend)", minval=1, maxval=100)
minVolume        = input.float(1e6,"Minimum Volume",         minval=1)
minATR           = input.float(2,  "Minimum ATR(14)",        minval=0.1, step=0.1)

stopLossPerc     = input.float(15, "Stop-Loss %",            minval=0.1, step=0.1)
// We’ll do two partial take-profit levels to aim for consistent cashflow:
takeProfit1Perc  = input.float(15, "Take-Profit1 %",         minval=0.1, step=0.1)
takeProfit2Perc  = input.float(30, "Take-Profit2 %",         minval=0.1, step=0.1)

ddLimit          = input.float(30, "Max Drawdown %",         minval=0.1, step=0.1)

//-----------------------------------------------------
// Indicators
//-----------------------------------------------------

rsiValue = ta.rsi(close, rsiLen)
atrValue = ta.atr(atrLen)

//--- Fully Manual ADX Calculation ---
upMove      = high - high[1]
downMove    = low[1] - low
plusDM      = (upMove > downMove and upMove > 0) ? upMove : 0.0
minusDM     = (downMove > upMove and downMove > 0) ? downMove : 0.0
smPlusDM    = ta.rma(plusDM, adxLen)
smMinusDM   = ta.rma(minusDM, adxLen)
smTR        = ta.rma(ta.tr, adxLen)
plusDI      = (smPlusDM / smTR) * 100
minusDI     = (smMinusDM / smTR) * 100
dx          = math.abs(plusDI - minusDI) / (plusDI + minusDI) * 100
adxValue    = ta.rma(dx, adxLen)

//-----------------------------------------------------
// Screener-Like Conditions (Technical Only)
//-----------------------------------------------------
volumeCondition   = volume > minVolume
adxCondition      = adxValue > adxThresh
rsiCondition      = rsiValue > rsiBuyThresh
atrCondition      = atrValue > minATR
aboveEmaCondition = close > emaValue

longCondition = volumeCondition and adxCondition and rsiCondition and atrCondition and aboveEmaCondition

//-----------------------------------------------------
// Strategy Entry / Exit Logic
//-----------------------------------------------------
var bool inTrade = false

// Entry
if longCondition and not inTrade
    strategy.entry("Long", strategy.long)

// Basic Exit Condition: RSI < 50 or Price < EMA
exitCondition = (rsiValue < 50) or (close < emaValue)
if inTrade and exitCondition
    strategy.close("Long")

// Update inTrade status
inTrade := strategy.position_size > 0

//-----------------------------------------------------
// Multi-Level Stop-Loss & Partial Profits
//-----------------------------------------------------
if inTrade
    float entryPrice = strategy.position_avg_price

    // Stop-Loss
    float stopPrice     = entryPrice * (1 - stopLossPerc / 100)

    // Two partial take-profit levels
    float tp1Price      = entryPrice * (1 + takeProfit1Perc / 100)
    float tp2Price      = entryPrice * (1 + takeProfit2Perc / 100)

    // Example approach: exit half at TP1, half at TP2
    strategy.exit("TP1/SL",     from_entry="Long", stop=stopPrice,    limit=tp1Price, qty_percent=50)
    strategy.exit("TP2",        from_entry="Long", limit=tp2Price,    qty_percent=50)

//-----------------------------------------------------
// Dynamic Drawdown Handling
//-----------------------------------------------------
var float peakEquity = strategy.equity
peakEquity := math.max(peakEquity, strategy.equity)

currentDrawdownPerc = (peakEquity - strategy.equity) / peakEquity * 100
if currentDrawdownPerc > ddLimit
    strategy.close_all("Max Drawdown Exceeded")

//-----------------------------------------------------
// Plotting
//-----------------------------------------------------
plot(emaValue, title="EMA 200", color=color.yellow, linewidth=2)
plotchar(rsiValue, title="RSI", char='●', location=location.bottom, color=color.new(color.teal, 50))
plot(adxValue, title="Manual ADX", color=color.orange)

```

> Detail

https://www.fmz.com/strategy/475594

> Last Modified

2024-12-20 14:24:34
