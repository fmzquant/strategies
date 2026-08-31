
> Name

Multi-Indicator-Dynamic-Adaptive-Position-Sizing-with-ATR-Volatility-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1091c674d8dbd378ac5.png)


#### Overview
This strategy is a quantitative trading system combining multiple technical indicators with dynamic risk management. It integrates EMA trend following, ATR volatility, RSI overbought/oversold conditions, and candlestick pattern recognition, achieving balanced returns through adaptive position sizing and dynamic stop-loss mechanisms.

#### Strategy Principles
The strategy implements trading through:
1. Using 5-period and 10-period EMA crossovers for trend direction
2. RSI indicator for overbought/oversold zones
3. ATR indicator for dynamic stop-loss and position sizing
4. Candlestick patterns (engulfing, hammer, shooting star) as entry signals
5. ATR-based dynamic slippage compensation
6. Volume confirmation for signal filtering

#### Strategy Advantages
1. Multiple signal cross-validation improves reliability
2. Dynamic risk management adapts to market volatility
3. Partial profit-taking strategy locks in gains
4. Trailing stop-loss protects accumulated profits
5. Daily loss limits control risk exposure
6. Dynamic slippage compensation improves order execution

#### Strategy Risks
1. Multiple indicators may cause signal lag
2. Frequent trading may incur high costs
3. Stop-losses may trigger frequently in ranging markets
4. Subjective factors in candlestick pattern recognition
5. Parameter optimization risks overfitting

#### Optimization Directions
1. Introduce market cycle detection for dynamic parameter adjustment
2. Add trend strength filters to reduce false signals
3. Optimize position sizing algorithms for better capital efficiency
4. Incorporate additional market sentiment indicators
5. Develop adaptive parameter optimization system

#### Summary
This is a sophisticated strategy system combining multiple technical indicators, enhancing trading stability through dynamic risk management and multiple signal validation. The core strengths lie in its adaptability and comprehensive risk control system, though it requires thorough validation and continuous optimization in live trading.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-10-01 00:00:00
end: 2024-10-31 23:59:59
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Optimized Scalping with High Risk-Reward", overlay=true)

// Input for EMA periods
shortEMA_length = input(5, title="Short EMA Length")
longEMA_length = input(10, title="Long EMA Length")

// ATR for dynamic stop-loss
atrPeriod = input(14, title="ATR Period")
atrMultiplier = input(1.5, title="ATR Multiplier for Stop Loss")

// Calculate EMAs
shortEMA = ta.ema(close, shortEMA_length)
longEMA = ta.ema(close, longEMA_length)

// ATR calculation for dynamic stop loss
atr = ta.atr(atrPeriod)

// RSI for overbought/oversold conditions
rsi = ta.rsi(close, 14)

// Plot EMAs
plot(shortEMA, color=color.blue, title="Short EMA")
plot(longEMA, color=color.red, title="Long EMA")

// Dynamic Slippage based on ATR
dynamic_slippage = math.max(5, atr * 0.5)

// Candlestick pattern recognition
bullish_engulfing = close[1] < open[1] and close > open and close > open[1] and close > close[1]
hammer = close > open and (high - close) / (high - low) > 0.6 and (open - low) / (high - low) < 0.2
bearish_engulfing = open[1] > close[1] and open > close and open > open[1] and close < close[1]
shooting_star = close < open and (high - open) / (high - low) > 0.6 and (close - low) / (high - low) < 0.2

// Enhanced conditions with volume and RSI check
buy_condition = (bullish_engulfing or hammer) and close > shortEMA and shortEMA > longEMA and volume > ta.sma(volume, 20) and rsi < 70
sell_condition = (bearish_engulfing or shooting_star) and close < shortEMA and shortEMA < longEMA and volume > ta.sma(volume, 20) and rsi > 30

// Dynamic ATR multiplier based on recent volatility
volatility = atr
adaptiveMultiplier = atrMultiplier + (volatility - ta.sma(volatility, 50)) / ta.sma(volatility, 50) * 0.5

// Execute buy trades with slippage consideration
if (buy_condition)
    strategy.entry("Buy", strategy.long)
    stop_loss_buy = strategy.position_avg_price - atr * adaptiveMultiplier - dynamic_slippage
    take_profit_buy = strategy.position_avg_price + atr * adaptiveMultiplier * 3 + dynamic_slippage
    strategy.exit("Exit Buy", "Buy", stop=stop_loss_buy, limit=take_profit_buy)

// Execute sell trades with slippage consideration
if (sell_condition)
    strategy.entry("Sell", strategy.short)
    stop_loss_sell = strategy.position_avg_price + atr * adaptiveMultiplier + dynamic_slippage
    take_profit_sell = strategy.position_avg_price - atr * adaptiveMultiplier * 3 - dynamic_slippage
    strategy.exit("Exit Sell", "Sell", stop=stop_loss_sell, limit=take_profit_sell)

// Risk Management
maxLossPerTrade = input.float(0.01, title="Max Loss Per Trade (%)", minval=0.01, maxval=1, step=0.01)  // 1% max loss per trade
dailyLossLimit = input.float(0.03, title="Daily Loss Limit (%)", minval=0.01, maxval=1, step=0.01) // 3% daily loss limit

maxLossAmount_buy = strategy.position_avg_price * maxLossPerTrade
maxLossAmount_sell = strategy.position_avg_price * maxLossPerTrade

if (strategy.position_size > 0)
    strategy.exit("Max Loss Buy", "Buy", stop=strategy.position_avg_price - maxLossAmount_buy - dynamic_slippage)

if (strategy.position_size < 0)
    strategy.exit("Max Loss Sell", "Sell", stop=strategy.position_avg_price + maxLossAmount_sell + dynamic_slippage)

// Daily loss limit logic
var float dailyLoss = 0.0
if (dayofweek != dayofweek[1])
    dailyLoss := 0.0  // Reset daily loss tracker at the start of a new day

if (strategy.closedtrades > 0)
    dailyLoss := dailyLoss + strategy.closedtrades.profit(strategy.closedtrades - 1)

if (dailyLoss < -strategy.initial_capital * dailyLossLimit)
    strategy.close_all("Daily Loss Limit Hit")

// Breakeven stop after a certain profit with a delay
if (strategy.position_size > 0 and close > strategy.position_avg_price + atr * 1.5 and bar_index > strategy.opentrades.entry_bar_index(0) + 5)
    strategy.exit("Breakeven Buy", from_entry="Buy", stop=strategy.position_avg_price)

if (strategy.position_size < 0 and close < strategy.position_avg_price - atr * 1.5 and bar_index > strategy.opentrades.entry_bar_index(0) + 5)
    strategy.exit("Breakeven Sell", from_entry="Sell", stop=strategy.position_avg_price)

// Partial Profit Taking
if (strategy.position_size > 0 and close > strategy.position_avg_price + atr * 1.5)
    strategy.close("Partial Close Buy", qty_percent=50)  // Use strategy.close for partial closure at market price

if (strategy.position_size < 0 and close < strategy.position_avg_price - atr * 1.5)
    strategy.close("Partial Close Sell", qty_percent=50) // Use strategy.close for partial closure at market price

// Trailing Stop with ATR type
if (strategy.position_size > 0)
    strategy.exit("Trailing Stop Buy", from_entry="Buy", trail_offset=atr * 1.5, trail_price=strategy.position_avg_price)

if (strategy.position_size < 0)
    strategy.exit("Trailing Stop Sell", from_entry="Sell", trail_offset=atr * 1.5, trail_price=strategy.position_avg_price)

```

> Detail

https://www.fmz.com/strategy/471674

> Last Modified

2024-11-12 11:41:30
