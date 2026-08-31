
> Name

双均线随机震荡策略系统趋势跟踪与动量结合的量化交易模型-Dual-EMA-Stochastic-Oscillator-System-A-Quantitative-Trading-Model-Combining-Trend-Following-and-Momentum

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/793cea9f9600e91a15.png)


#### Overview
This strategy is a quantitative trading system that combines dual Exponential Moving Averages (EMA) with the Stochastic Oscillator. It utilizes 20-period and 50-period EMAs to determine market trends while using the Stochastic Oscillator to identify trading opportunities in overbought and oversold zones, achieving a perfect blend of trend and momentum. The strategy implements strict risk management measures, including fixed stop-loss and profit targets.

#### Strategy Principles
The core logic consists of three components: trend identification, entry timing, and risk control. Trend identification primarily relies on the relative position of fast EMA (20-period) and slow EMA (50-period), where an uptrend is confirmed when the fast line is above the slow line, and vice versa. Entry signals are confirmed by Stochastic Oscillator crossovers, seeking high-probability trades in overbought and oversold zones. Risk control employs fixed percentage stop-losses and 2:1 profit targets, ensuring clear risk-reward ratios for each trade.

#### Strategy Advantages
1. Combines trend following and momentum indicators for consistent profits in trending markets
2. Implements scientific money management through fixed risk percentages
3. Indicator parameters can be flexibly adjusted for different markets
4. Clear and easy-to-understand strategy logic
5. Applicable across multiple timeframes

#### Strategy Risks
1. May generate frequent false signals in ranging markets
2. EMA parameter selection significantly impacts strategy performance
3. Stochastic overbought/oversold levels need market-specific adjustment
4. Stop-loss levels may be too wide in volatile markets
5. Trading costs need to be considered for strategy profitability

#### Optimization Directions
1. Add volume indicators for additional confirmation
2. Incorporate ATR for dynamic stop-loss adjustment
3. Develop adaptive parameter adjustment based on market volatility
4. Implement trend strength filters to reduce false signals
5. Develop adaptive profit target calculation methods

#### Summary
This strategy establishes a complete trading system by combining trend and momentum indicators. Its core strengths lie in its clear logical framework and strict risk control, though practical application requires parameter optimization based on specific market conditions. Through continuous improvement and optimization, the strategy has the potential to maintain stable performance across various market environments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-12-06 00:00:00
end: 2025-01-04 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("EMA + Stochastic Strategy", overlay=true)

// Inputs for EMA
emaShortLength = input.int(20, title="Short EMA Length")
emaLongLength = input.int(50, title="Long EMA Length")

// Inputs for Stochastic
stochK = input.int(14, title="Stochastic %K Length")
stochD = input.int(3, title="Stochastic %D Smoothing")
stochOverbought = input.int(85, title="Stochastic Overbought Level")
stochOversold = input.int(15, title="Stochastic Oversold Level")

// Inputs for Risk Management
riskRewardRatio = input.float(2.0, title="Risk-Reward Ratio")
stopLossPercent = input.float(1.0, title="Stop Loss (%)")

// EMA Calculation
emaShort = ta.ema(close, emaShortLength)
emaLong = ta.ema(close, emaLongLength)

// Stochastic Calculation
k = ta.stoch(high, low, close, stochK)
d = ta.sma(k, stochD)

// Trend Condition
isUptrend = emaShort > emaLong
isDowntrend = emaShort < emaLong

// Stochastic Signals
stochBuyCrossover = ta.crossover(k, d)
stochBuySignal = k < stochOversold and stochBuyCrossover
stochSellCrossunder = ta.crossunder(k, d)
stochSellSignal = k > stochOverbought and stochSellCrossunder

// Entry Signals
buySignal = isUptrend and stochBuySignal
sellSignal = isDowntrend and stochSellSignal

// Strategy Execution
if buySignal
    strategy.entry("Buy", strategy.long)
    stopLoss = close * (1 - stopLossPercent / 100)
    takeProfit = close * (1 + stopLossPercent * riskRewardRatio / 100)
    strategy.exit("Take Profit/Stop Loss", from_entry="Buy", stop=stopLoss, limit=takeProfit)

if sellSignal
    strategy.entry("Sell", strategy.short)
    stopLoss = close * (1 + stopLossPercent / 100)
    takeProfit = close * (1 - stopLossPercent * riskRewardRatio / 100)
    strategy.exit("Take Profit/Stop Loss", from_entry="Sell", stop=stopLoss, limit=takeProfit)

// Plotting
plot(emaShort, color=color.blue, title="Short EMA")
plot(emaLong, color=color.red, title="Long EMA")
```

> Detail

https://www.fmz.com/strategy/477533

> Last Modified

2025-01-06 11:48:55
