
> Name

RSI-and-Dual-EMA-Crossover-Signal-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1aa9cecb35dc69823e6.png)


#### Overview
This strategy uses the crossover signals of the RSI indicator and two EMA lines to determine buy and sell points. A buy signal is generated when the closing price falls below both EMA100 and EMA20, and the RSI value is below 30. A sell signal is generated when the closing price breaks above both EMA100 and EMA20, and the RSI value is above 70. The main idea of this strategy is to use the RSI indicator to judge overbought and oversold conditions, combined with the trend judgment of EMA lines, in order to capture the low and high points of market fluctuations and perform low-buy and high-sell operations.

#### Strategy Principle
1. Calculate the RSI indicator value to determine overbought and oversold conditions in the market. An RSI below 30 is considered oversold, while an RSI above 70 is considered overbought.
2. Calculate the EMA100 of the closing price and the EMA20 of the lowest price as the basis for trend judgment.
3. When the closing price falls below both EMA100 and EMA20, and the RSI is below 30, it is judged as oversold and the trend is downward, generating a buy signal.
4. When the closing price breaks above both EMA100 and EMA20, and the RSI is above 70, it is judged as overbought and the trend is upward, generating a sell signal.
5. Open a long position when a buy signal is triggered, and close the position when a sell signal is triggered.

#### Advantage Analysis
1. Combining the RSI indicator with EMA moving averages can better judge trend turning points and overbought/oversold timing, reducing false signals.
2. Parameters are adjustable and can be optimized for different underlying assets and periods, providing certain adaptability and flexibility.
3. The logic is simple and clear, easy to understand and implement, and does not require too much technical analysis foundation.
4. Suitable for use in a fluctuating market, it can capture the highs and lows of fluctuations and profit from price differences.

#### Risk Analysis
1. It may fail in unilateral trend markets, and will repeatedly generate false signals and be stuck after the trend is formed.
2. Parameters are fixed and lack the ability to dynamically adapt to the market, easily affected by changes in market rhythm.
3. Frequent trading in a fluctuating market may generate significant slippage and transaction fees, affecting strategy returns.
4. Lack of position management and risk control measures, drawdown and maximum loss are uncontrollable.

#### Optimization Direction
1. Add trend judgment conditions, such as MA crossover, DMI, etc., to avoid premature entry and getting stuck in unilateral trends.
2. Optimize the parameters of RSI and EMA to find the most suitable parameter combination for the underlying asset and period, improving signal accuracy.
3. Introduce a position management model, such as ATR position sizing or Kelly formula, to control the proportion of funds in each trade and reduce risk.
4. Set stop-loss and take-profit conditions, such as fixed percentage stop-loss or trailing stop-loss, to control the maximum loss and profit surrender of a single trade.
5. Combine with other auxiliary indicators such as MACD, Bollinger Bands, etc., to improve signal confirmation and reduce misjudgments.

#### Summary
The RSI and Dual EMA Crossover Signal Quantitative Strategy is a simple and practical quantitative trading strategy. By combining the RSI indicator with EMA moving averages, it can better capture the highs and lows in a fluctuating market and conduct arbitrage. However, this strategy also has some limitations and risks, such as failure in trend markets, lack of position management and risk control measures, etc. Therefore, in practical application, it needs to be appropriately optimized and improved according to market characteristics and personal preferences to improve the robustness and profitability of the strategy. This strategy can be used as an entry-level strategy for quantitative trading to learn and use, but it needs to be treated with caution and risk must be strictly controlled.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|RSI Length|
|v_input_int_2|100|EMA Length (Closing Price)|
|v_input_int_3|20|EMA Length (Low Price)|
|v_input_int_4|30|Oversold Level|
|v_input_int_5|70|Overbought Level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-01 00:00:00
end: 2024-03-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI-EMA100&20 Buy/Sell Signal", overlay=true)

// Input parameters
rsiLength = input.int(14, "RSI Length")
emaCloseLength = input.int(100, "EMA Length (Closing Price)")
emaLowLength = input.int(20, "EMA Length (Low Price)")
oversoldLevel = input.int(30, "Oversold Level")
overboughtLevel = input.int(70, "Overbought Level")

// Calculate RSI
rsi = ta.rsi(close, rsiLength)

// Calculate EMA of closing price
emaClose = ta.ema(close, emaCloseLength)

// Calculate EMA of low price
emaLow = ta.ema(low, emaLowLength)

// Determine overbought and oversold conditions
isOversold = rsi <= oversoldLevel
isOverbought = rsi >= overboughtLevel

// Plot RSI and its EMAs
plot(rsi, color=color.blue, title="RSI")
plot(emaClose, color=color.green, title="EMA 100 (Closing Price)")
plot(emaLow, color=color.orange, title="EMA 20 (Low Price)")

// Strategy entry condition: Closing price is below both EMAs and RSI is less than or equal to oversold level
buySignal = close < emaClose and close < emaLow and isOversold

// Plot buy signals
plotshape(series=buySignal, style=shape.triangleup, location=location.abovebar, color=color.green, size=size.small)

// Strategy entry
if (buySignal)
    strategy.entry("Buy", strategy.long)

// Strategy exit condition: Price crosses above both EMAs and RSI is greater than or equal to overbought level
sellSignal = close > emaClose and close > emaLow and isOverbought

// Plot sell signals
plotshape(series=sellSignal, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small)

// Strategy exit
if (sellSignal)
    strategy.entry("Sell", strategy.short)

// Plot sell signals
plotshape(series=sellSignal, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small)

// Strategy exit
if (sellSignal)
    strategy.entry("Sell", strategy.short)

```

> Detail

https://www.fmz.com/strategy/449553

> Last Modified

2024-04-26 17:36:08
