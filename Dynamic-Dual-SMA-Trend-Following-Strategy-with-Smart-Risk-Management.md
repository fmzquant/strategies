
> Name

Dynamic-Dual-SMA-Trend-Following-Strategy-with-Smart-Risk-Management

> Author

ChaoZhang

> Strategy Description
![IMG](https://www.fmz.com/upload/asset/d28e2b1511d18c4b1c.png)

#### Overview
This strategy is an intelligent trend-following system based on dual moving averages, which identifies market trends by calculating moving averages of highs and lows along with slope indicators, combined with dynamic profit-taking and stop-loss mechanisms for risk management. The strategy's core lies in filtering false signals through slope thresholds while using trailing stops to lock in profits, achieving an organic combination of trend following and risk control.

#### Strategy Principles
The strategy employs a dual moving average system as its core trading logic, calculating moving averages on both high and low price series. Long signals are generated when price breaks above the upper average with a significantly positive slope, while short signals occur when price breaks below the lower average with a significantly negative slope. To avoid frequent trading in oscillating markets, the strategy incorporates a slope threshold mechanism, confirming trend validity only when the moving average slope change exceeds the set threshold. For risk management, the strategy implements dynamic profit-taking and stop-loss mechanisms, setting initially aggressive profit targets while using trailing stops to protect gained profits.

#### Strategy Advantages
1. High accuracy in trend identification: The combination of dual moving averages and slope thresholds effectively filters out false signals in sideways markets
2. Comprehensive risk control: Dynamic stop-loss mechanism automatically adjusts with price movement, both protecting profits and allowing trends to develop
3. Flexible parameters: Key parameters such as moving average period, profit/loss ratios, and slope threshold can be adjusted for different market characteristics
4. Clear and simple logic: Strategy logic is intuitive and easy to understand, facilitating maintenance and optimization
5. High adaptability: Applicable to different timeframes and trading instruments

#### Strategy Risks
1. Trend reversal risk: During sudden trend reversals, trailing stops may not lock in all profits in time
2. Parameter sensitivity: Strategy performance is sensitive to parameter settings, different market environments may require different parameter combinations
3. Oscillating market performance: Despite slope filtering, false signals may still occur in highly volatile markets
4. Slippage impact: During highly volatile periods, actual execution prices may significantly deviate from signal prices

#### Optimization Directions
1. Introduce volatility adaptive mechanism: Consider dynamically adjusting slope thresholds and stop-loss distances based on ATR
2. Add market environment filtering: Include trend strength indicators to use different parameter combinations in different market conditions
3. Optimize profit-taking and stop-loss mechanisms: Design multi-level profit targets to gradually lock in partial profits
4. Add volume analysis: Incorporate volume data to verify trend validity
5. Introduce time filtering: Avoid trading during highly volatile market periods

#### Summary
This is a quantitative trading strategy that organically combines trend following with risk management. Through the cooperation of a dual moving average system and slope thresholds, the strategy can accurately capture market trends, while dynamic profit-taking and stop-loss mechanisms provide comprehensive risk control. Although there is room for improvement in parameter selection and market adaptability, its clear logical framework and flexible parameter system provide a good foundation for subsequent optimization. It is recommended that traders thoroughly backtest and optimize various parameters according to specific market characteristics and their own risk preferences when applying the strategy in live trading.
> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-11-27 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("SMA Buy/Sell Strategy with Significant Slope", overlay=true)

// Parametri configurabili
smaPeriod = input.int(20, title="SMA Period", minval=1)
initialTPPercent = input.float(5.0, title="Initial Take Profit (%)", minval=0.1)  // Take Profit iniziale (ambizioso)
trailingSLPercent = input.float(1.0, title="Trailing Stop Loss (%)", minval=0.1) // Percentuale di trailing SL
slopeThreshold = input.float(0.05, title="Slope Threshold (%)", minval=0.01)    // Soglia minima di pendenza significativa

// SMA calcolate su HIGH e LOW
smaHigh = ta.sma(high, smaPeriod)
smaLow = ta.sma(low, smaPeriod)

// Funzioni per pendenza significativa
isSignificantSlope(sma, threshold) =>
    math.abs(sma - sma[5]) / sma[5] > threshold / 100

slopePositive(sma) =>
    sma > sma[1] and isSignificantSlope(sma, slopeThreshold)

slopeNegative(sma) =>
    sma < sma[1] and isSignificantSlope(sma, slopeThreshold)

// Condizioni di BUY e SELL
buyCondition = close > smaHigh and low < smaHigh and close[1] < smaHigh and slopePositive(smaHigh)
sellCondition = close < smaLow and high > smaLow and close[1] > smaLow and slopeNegative(smaLow)

// Plot delle SMA
plot(smaHigh, color=color.green, linewidth=2, title="SMA 20 High")
plot(smaLow, color=color.red, linewidth=2, title="SMA 20 Low")

// Gestione TP/SL dinamici
longInitialTP = strategy.position_avg_price * (1 + initialTPPercent / 100)
shortInitialTP = strategy.position_avg_price * (1 - initialTPPercent / 100)

// Trailing SL dinamico
longTrailingSL = close * (1 - trailingSLPercent / 100)
shortTrailingSL = close * (1 + trailingSLPercent / 100)

// Chiusura di posizioni attive su segnali opposti
if strategy.position_size > 0 and sellCondition
    strategy.close("Buy", comment="Close Long on Sell Signal")
if strategy.position_size < 0 and buyCondition
    strategy.close("Sell", comment="Close Short on Buy Signal")

// Apertura di nuove posizioni con TP iniziale e Trailing SL
if buyCondition
    strategy.entry("Buy", strategy.long, comment="Open Long")
    strategy.exit("Long TP/Trailing SL", from_entry="Buy", limit=longInitialTP, stop=longTrailingSL)

if sellCondition
    strategy.entry("Sell", strategy.short, comment="Open Short")
    strategy.exit("Short TP/Trailing SL", from_entry="Sell", limit=shortInitialTP, stop=shortTrailingSL)

```

> Detail

https://www.fmz.com/strategy/473321

> Last Modified

2024-11-29 11:06:38
