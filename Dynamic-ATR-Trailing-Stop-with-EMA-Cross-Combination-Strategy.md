
> Name

Dynamic-ATR-Trailing-Stop-with-EMA-Cross-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12039bfa4a130d423bf.png)

#### Overview
This strategy is a comprehensive trading system that combines ATR dynamic trailing stop-loss and EMA crossovers, integrating multiple technical indicators for trade filtering and risk control. Operating on a 15-minute timeframe, the strategy utilizes multiple dimensions of indicators including EMA, ATR volatility, RSI, and volume to determine trading signals while employing dynamic trailing stops for risk management.

#### Strategy Principles
The core logic includes several key components:
1. Entry conditions with multiple filters:
   - Price above/below 100-period EMA
   - 1-hour 100 EMA trend confirmation
   - Price crossover with ATR trailing stop line
   - RSI between 30-70 in neutral zone
   - Current volume above 20-period average volume
2. Risk control system:
   - Dynamic trailing stop based on 3x ATR
   - Take profit set at 2x ATR
3. Exit mechanism:
   - 15 and 17 period EMA crossover signals on consecutive bars
   - Trailing stop or take profit trigger

#### Strategy Advantages
1. Multiple technical indicators cross-validation reduces false signals
2. Multi-timeframe trend filtering improves directional accuracy
3. Dynamic ATR stop-loss adapts to market volatility
4. Profit targets linked to stop-loss ensures dynamic risk-reward balance
5. EMA crossover exits prevent premature position closure
6. Volume confirmation increases trade validity

#### Strategy Risks
1. Multiple filtering conditions may cause missed trading opportunities
2. ATR stops may be too wide in highly volatile markets
3. Consecutive EMA crossover exits may lead to profit giveback
4. Strong dependency on market trends, potentially underperforming in ranging markets
5. High computational complexity may result in execution delays

#### Strategy Optimization Directions
1. Introduce adaptive parameter optimization:
   - Dynamic adjustment of ATR multiplier based on market conditions
   - Automatic optimization of EMA periods based on volatility
2. Enhance market state recognition:
   - Add trend strength indicators
   - Incorporate volatility cycle detection
3. Improve risk control:
   - Implement staged position building and reduction
   - Add maximum holding time limits
4. Optimize exit mechanism:
   - Dynamic adjustment of profit targets based on trend strength
   - Add time-based stop-loss mechanism

#### Summary
This strategy constructs a relatively complete trading system through the comprehensive use of multiple technical indicators and risk control measures. The main feature is the use of dynamic ATR trailing stops to adapt to market volatility, while utilizing multiple indicator filters and EMA crossovers to confirm trading signals. While there is room for optimization, the overall design philosophy aligns with modern quantitative trading requirements and demonstrates good practical application value.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-19 00:00:00
end: 2025-02-16 08:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title='UT Bot Strategy with 100 EMA Filter, Trailing Stop and EMA Cross Exit', overlay=true)

// Inputs
a = input(1, title='Key Value. \'This changes the sensitivity\'')
c = input(10, title='ATR Period')
h = input(false, title='Signals from Heikin Ashi Candles')

// Higher timeframe trend filter (1-hour)
higherTimeframeEMA = request.security(syminfo.tickerid, "60", ta.ema(close, 100)) // 1-hour EMA

xATR = ta.atr(c)

// Adjusting ATR multiplier for Gold on 15-minute timeframe
atrMultiplier = 3
nLoss = atrMultiplier * xATR  // ATR-based loss calculation

src = h ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close, lookahead=barmerge.lookahead_off) : close

// Trailing Stop Calculation
xATRTrailingStop = 0.0
iff_1 = src > nz(xATRTrailingStop[1], 0) ? src - nLoss : src + nLoss
iff_2 = src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0) ? math.min(nz(xATRTrailingStop[1]), src + nLoss) : iff_1
xATRTrailingStop := src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0) ? math.max(nz(xATRTrailingStop[1]), src - nLoss) : iff_2

pos = 0
iff_3 = src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0) ? -1 : nz(pos[1], 0)
pos := src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0) ? 1 : iff_3

xcolor = pos == -1 ? color.red : pos == 1 ? color.green : color.blue

// Define 100 EMA
ema100 = ta.ema(src, 100)
plot(ema100, title="100 EMA", color=color.black, linewidth=2)

// Define 15 EMA and 17 EMA for exit conditions
ema15 = ta.ema(src, 15)
ema17 = ta.ema(src, 17)
plot(ema15, title="15 EMA", color=color.blue, linewidth=1)
plot(ema17, title="17 EMA", color=color.purple, linewidth=1)

// Define Entry Conditions
longCondition = src > ema100 and src > xATRTrailingStop and close > higherTimeframeEMA and ta.crossover(ta.ema(src, 1), xATRTrailingStop)
shortCondition = src < ema100 and src < xATRTrailingStop and close < higherTimeframeEMA and ta.crossover(xATRTrailingStop, ta.ema(src, 1))

// RSI Filter
rsi = ta.rsi(close, 14)
longCondition := longCondition and rsi > 30 and rsi < 70  // Ensure RSI is not in extreme conditions
shortCondition := shortCondition and rsi > 30 and rsi < 70

// Volume Filter
volumeMA = ta.sma(volume, 20)
longCondition := longCondition and volume > volumeMA
shortCondition := shortCondition and volume > volumeMA

// ** Trailing Stop Setup **
trailOffset = nLoss  // The trailing stop distance is based on ATR, which is already calculated
trailPriceLong = close - trailOffset  // The trailing stop for long trades is below the entry price
trailPriceShort = close + trailOffset  // The trailing stop for short trades is above the entry price

// Define Take Profit (TP) condition
takeProfitMultiplier = 2  // This sets the take profit at 2x the ATR from the entry
takeProfitLong = close + takeProfitMultiplier * nLoss
takeProfitShort = close - takeProfitMultiplier * nLoss

// Strategy Entries
if (longCondition)
    strategy.entry('long', strategy.long)

if (shortCondition)
    strategy.entry('short', strategy.short)

// Exit conditions for 15 and 17 EMA cross (must be consecutive on two bars)
exitLong = ta.crossover(ema15, ema17) and ta.crossover(ema15[1], ema17[1])  // Exit long if both the current and previous bars have 15 EMA crossing above 17 EMA
exitShort = ta.crossunder(ema15, ema17) and ta.crossunder(ema15[1], ema17[1])  // Exit short if both the current and previous bars have 15 EMA crossing below 17 EMA

// Apply trailing stop and take profit along with EMA cross exit
strategy.exit("Exit Long", "long", trail_price=trailPriceLong, trail_offset=trailOffset, limit=takeProfitLong)  // Long exit with trailing stop and TP
strategy.exit("Exit Short", "short", trail_price=trailPriceShort, trail_offset=trailOffset, limit=takeProfitShort)  // Short exit with trailing stop and TP

// Close positions when 15 and 17 EMAs cross consecutively
strategy.close("long", when=exitLong)
strategy.close("short", when=exitShort)

// Alert condition for trade closure
longExitAlert = exitLong  // Only trigger alert for long if both consecutive bars show crossover
shortExitAlert = exitShort  // Only trigger alert for short if both consecutive bars show crossunder

alertcondition(longExitAlert, title="Close Long Trade", message="Long trade closed. 15 EMA crossed above 17 EMA on two consecutive bars.")
alertcondition(shortExitAlert, title="Close Short Trade", message="Short trade closed. 15 EMA crossed below 17 EMA on two consecutive bars.")

```

> Detail

https://www.fmz.com/strategy/482475

> Last Modified

2025-02-18 15:48:18
