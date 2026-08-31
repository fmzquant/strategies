
> Name

Chande-Kroll-Stop-Dynamic-ATR-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/cc5ac7909507bcf04a.png)


#### Overview
The Chande-Kroll Stop Dynamic ATR Trend Following Strategy is a quantitative trading strategy based on the Chande-Kroll stop indicator and the Simple Moving Average (SMA). The strategy aims to capture upward market trends while managing risk using dynamic stop-loss levels. The Chande-Kroll stop indicator dynamically adjusts stop-loss levels based on the Average True Range (ATR) to adapt to different market volatility conditions. The 21-period SMA is used as a trend filter to ensure trades are made in the direction of the primary trend.

#### Strategy Principles
The core of the strategy is the Chande-Kroll stop indicator, which uses ATR to calculate dynamic stop-loss levels. ATR measures market volatility, and the stop-loss levels are dynamically adjusted based on ATR and a multiplier. This ensures that the stop-loss positions adapt to current market conditions. Additionally, the 21-period SMA acts as a trend filter, and long signals are triggered only when the closing price is above the SMA. This helps avoid trading during bear markets.
Long entry condition: When the closing price breaks above the Chande-Kroll lower band and is above the 21-period SMA, a long position is initiated.
Exit condition: When the closing price falls below the Chande-Kroll upper band, the position is closed.

#### Strategy Advantages
1. Dynamic stop-loss: The Chande-Kroll stop indicator calculates dynamic stop-loss levels based on ATR, adapting to different market volatility conditions and improving the effectiveness of stop-losses.
2. Trend following: The 21-period SMA acts as a trend filter, ensuring trades align with the primary trend direction and reducing the risk of counter-trend trading.
3. Parameter flexibility: Strategy parameters such as ATR period, ATR multiplier, stop-loss period, and SMA period can be adjusted according to user preferences, enhancing the adaptability of the strategy.
4. Position sizing: Position sizes are dynamically adjusted based on the risk multiplier and current market volatility, achieving dynamic risk management.

#### Strategy Risks
1. Parameter optimization risk: Strategy parameters need to be optimized based on different market conditions and trading instruments. Improper parameter settings may lead to poor strategy performance.
2. Trend identification risk: During range-bound markets or early trend reversals, the strategy may generate false signals, resulting in losses.
3. Slippage and transaction costs: In actual trading, slippage and transaction costs will affect the net returns of the strategy.
Risk management measures include: conducting comprehensive backtesting and parameter optimization of the strategy; strictly following strategy rules and controlling the risk of each trade in actual trading; regularly evaluating strategy performance and making adjustments when necessary.

#### Strategy Optimization Directions
1. Long-short trading: Currently, the strategy only has long signals. It can be extended to long-short trading to fully capture opportunities in different market environments.
2. Dynamic parameter optimization: Use machine learning or optimization algorithms to adjust strategy parameters in real-time based on market conditions, improving adaptability.
3. Combining other technical indicators: Introduce other trend or oscillator indicators to build a multi-factor strategy and improve signal reliability.
4. Incorporating market sentiment indicators: Combine market sentiment indicators such as VIX to control trading during extreme market sentiment and enhance risk management capabilities.

#### Summary
The Chande-Kroll Stop Dynamic ATR Trend Following Strategy is a quantitative trading strategy based on dynamic stop-loss and trend-following principles. By combining the Chande-Kroll stop indicator and the SMA trend filter, the strategy can capture upward trends while effectively managing risk. The flexibility of strategy parameters and dynamic position sizing further enhance the adaptability of the strategy. Although the strategy has certain risks, with reasonable risk management measures and continuous optimization and improvement, the strategy has the potential to achieve long-term stable returns.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-06-08 00:00:00
end: 2024-06-13 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Chande Kroll Stop Strategy", overlay=true, initial_capital = 1000, commission_type = strategy.commission.percent, commission_value = 0.01, slippage = 3)

// Chande Kroll Stop parameters
calcMode = input.string(title="Calculation Mode", defval="Exponential", options=["Linear", "Exponential"])
riskMultiplier = input(5, "Risk Multiplier")
atrPeriod = input(10, "ATR Period")
atrMultiplier = input(3, "ATR Multiplier")
stopLength = input(21, "Stop Length")
smaLength = input(21, "SMA Length")

// Calculate ATR
atr = ta.atr(atrPeriod)

// Calculate Chande Kroll Stop
highStop = ta.highest(high, stopLength) - atrMultiplier * atr
lowStop = ta.lowest(low, stopLength) + atrMultiplier * atr

sma21 = ta.sma(close, smaLength)

// Entry and Exit conditions
longCondition = ta.crossover(close, lowStop) and close > sma21
exitLongCondition = close < highStop

// Funktion zur Berechnung der Menge
calc_qty(mode, riskMultiplier) =>
    lowestClose = ta.lowest(close, 1560)
    if mode == "Exponential"
        qty = riskMultiplier / lowestClose * 1000 * strategy.equity / strategy.initial_capital
    else
        qty = riskMultiplier / lowestClose * 1000

// Berechnung der Menge basierend auf der Benutzerwahl
qty = calc_qty(calcMode, riskMultiplier)

// Execute strategy
if (longCondition)
    strategy.entry("Long", strategy.long, qty=qty)
    alert("Buy Signal", alert.freq_once_per_bar_close)

if (exitLongCondition)
    strategy.close("Long")
    alert("Sell Signal", alert.freq_once_per_bar_close)

// Plotting
plotshape(series=longCondition, location=location.belowbar, color=#0097a7, style=shape.triangleup, size=size.small, title="Buy Signal")
plotshape(series=ta.crossunder(close, highStop), location=location.abovebar, color=#ff195f, style=shape.triangledown, size=size.small, title="Sell Signal")
plot(sma21, color=color.gray)
plot(highStop, color=#0097a7)
plot(lowStop, color=#ff195f)


```

> Detail

https://www.fmz.com/strategy/454137

> Last Modified

2024-06-14 15:15:43
