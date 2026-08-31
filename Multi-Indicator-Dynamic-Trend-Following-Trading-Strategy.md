
> Name

Multi-Indicator-Dynamic-Trend-Following-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f3459bc572a6315a86.png)

 

This is a trend-following strategy based on multiple technical indicators that implements swing trading through dynamic position adjustment. The strategy primarily uses Exponential Moving Average (EMA), Relative Strength Index (RSI), and Average Directional Index (ADX) for market trend analysis and trade signal generation, while using Average True Range (ATR) to set dynamic stop-loss and profit targets.

#### Strategy Overview
This strategy is a trend-following trading system that combines multiple technical indicators. It primarily uses EMA to determine price trend direction, RSI to judge market overbought/oversold conditions, ADX to verify trend strength, and finally uses ATR to dynamically adjust position size and risk management parameters. The strategy supports various position calculation methods, including account percentage-based, fixed capital, and fixed contract size approaches.

#### Strategy Principles
1. Entry Signals: Long signals are generated when price crosses above EMA with RSI>50 and ADX above threshold; Short signals are generated when price crosses below EMA with RSI<50 and ADX above threshold.
2. Position Management: Position size is calculated based on user-selected method, supporting risk ratio, capital percentage, fixed capital amount, and fixed contract size approaches.
3. Risk Control: Uses ATR to dynamically calculate stop-loss and profit targets, while implementing trailing stops to protect profits.

#### Strategy Advantages
1. Multi-dimensional Trend Confirmation: Uses EMA, RSI, and ADX triple indicators to confirm trends, improving trade signal reliability.
2. Flexible Position Management: Supports multiple position calculation methods to meet different traders' needs.
3. Dynamic Risk Management: ATR-based dynamic stop-loss and profit target setting adapts to market volatility changes.
4. Trailing Stop Mechanism: Protects profits through trailing stops, improving overall profitability.

#### Risk Analysis
1. Lag Risk: Technical indicators have inherent lag, potentially causing delayed entry timing.
2. Ranging Market Risk: May generate frequent false signals in sideways markets.
3. Parameter Sensitivity: Multiple indicator parameters significantly affect strategy performance.
4. Leverage Risk: Support for high leverage may bring substantial capital risk.

#### Optimization Directions
1. Market Environment Adaptation: Can add market environment recognition mechanism to dynamically adjust parameters under different market conditions.
2. Signal Filtering: Introduce volume and other auxiliary indicators to improve signal quality.
3. Profit-Taking Optimization: Can design more flexible staged profit-taking mechanisms to improve profitability.
4. Risk Control Enhancement: Add maximum drawdown control and other risk management mechanisms.

#### Summary
This is a trend-following strategy that comprehensively utilizes multiple technical indicators, achieving relatively stable trading through multi-dimensional trend confirmation and comprehensive risk management mechanisms. The strategy's advantages lie in its systematic trend confirmation mechanism and flexible position management, but attention must be paid to indicator lag and market environment adaptability issues. Through continuous optimization and risk control improvements, this strategy has the potential to maintain stable performance across various market environments.

> Source (PineScript)

``` pinescript
/*backtest
start: 2025-02-10 00:00:00
end: 2025-02-17 00:00:00
period: 45m
basePeriod: 45m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("EMA Momentum Scalper", shorttitle="EMS", overlay=true, pyramiding=0)

// === ПАРАМЕТРЫ ===
posSizeMethod = input.string("Capital %", title="Метод расчета позиции", options=["% Based", "Capital %", "Fixed Capital Based", "Fixed Contract Size"])
riskPerTrade = input.float(3, title="Риск на сделку (%)", minval=0.1, maxval=100, step=0.5) / 100
capitalPctPerTrade = input.float(10, title="Доля капитала на сделку (%)", minval=0.1, maxval=100, step=0.5) / 100
fixedCapitalAmount = input.float(100, title="Фиксированная сумма капитала", minval=0)
fixedContractSize = input.int(10, title="Фиксированный размер контракта")
atrLength = input.int(14, title="Длина ATR")
atrMultiplierSL = input.float(2.5, title="ATR множитель для SL")
atrMultiplierTP = input.float(1.5, title="ATR множитель для TP")
timeoutBars = input.int(20, title="Выход через X баров, если нет TP/SL")
emaLength = input.int(50, title="Длина EMA")
rsiLength = input.int(14, title="Длина RSI")
rsiOverbought = input.int(70, title="RSI перекупленность")
rsiOversold = input.int(30, title="RSI перепроданность")
adxLength = input.int(14, title="Длина ADX")
adxThreshold = input.float(20, title="Порог ADX для тренда")
leverage = input.int(15, title="Плечо", minval=1, maxval=100)

// === ИНДИКАТОРЫ ===
atr = ta.atr(atrLength)
ema = ta.ema(close, emaLength)
rsi = ta.rsi(close, rsiLength)

// === ADX ===
diPlus = ta.rma(math.max(high - high[1], 0), adxLength)
diMinus = ta.rma(math.max(low[1] - low, 0), adxLength)
dx = 100 * math.abs(diPlus - diMinus) / (diPlus + diMinus)
adx = ta.rma(dx, adxLength)

// === УСЛОВИЯ ВХОДА ===
longEntry = ta.crossover(close, ema) and rsi > 50 and adx > adxThreshold
shortEntry = ta.crossunder(close, ema) and rsi < 50 and adx > adxThreshold

// === РАСЧЕТ РАЗМЕРА ПОЗИЦИИ ===
var float qty = na
riskAmount = strategy.equity * riskPerTrade
stopLossDistance = atr * atrMultiplierSL
positionSize = riskAmount / stopLossDistance

if (posSizeMethod == "% Based")
    qty := strategy.equity * riskPerTrade / (atr * atrMultiplierSL)
else if (posSizeMethod == "Capital %")
    qty := strategy.equity * capitalPctPerTrade / close
else if (posSizeMethod == "Fixed Capital Based")
    qty := fixedCapitalAmount / close
else if (posSizeMethod == "Fixed Contract Size")
    qty := fixedContractSize

qty := qty * leverage  // Умножаем на плечо

// === СТОП-ЛОСС И ТЕЙК-ПРОФИТ ===
entryPrice = close
stopLossLong = entryPrice - atrMultiplierSL * atr
stopLossShort = entryPrice + atrMultiplierSL * atr
takeProfit1 = entryPrice + atrMultiplierTP * atr * (longEntry ? 1 : -1)
takeProfit2 = entryPrice + atrMultiplierTP * atr * (longEntry ? 2 : -2) / 1.5

// === ТРЕЙЛИНГ-СТОП ===
trailStopDistance = atr * atrMultiplierSL

if (longEntry)
    strategy.entry("Long", strategy.long, qty=qty)
    strategy.exit("Exit Long", "Long", stop=stopLossLong, limit=takeProfit1, trail_points=trailStopDistance)
    alertMessage = syminfo.ticker + " LONG\n" +
                   "Leverage: Cross " + str.tostring(leverage) + "x\n" +
                   "➡️ Entry: " + str.tostring(entryPrice) + "\n" +
                   "? Take profit 1: " + str.tostring(takeProfit1) + "\n" +
                   "? Stop loss: " + str.tostring(stopLossLong)
    alert(alertMessage, alert.freq_once_per_bar_close)

if (shortEntry)
    strategy.entry("Short", strategy.short, qty=qty)
    strategy.exit("Exit Short", "Short", stop=stopLossShort, limit=takeProfit1, trail_points=trailStopDistance)
    alertMessage = syminfo.ticker + " SHORT\n" +
                   "Leverage: Cross " + str.tostring(leverage) + "x\n" +
                   "➡️ Entry: " + str.tostring(entryPrice) + "\n" +
                   "? Take profit 1: " + str.tostring(takeProfit1) + "\n" +
                   "? Stop loss: " + str.tostring(stopLossShort)
    alert(alertMessage, alert.freq_once_per_bar_close)

// === ВИЗУАЛИЗАЦИЯ ===
plotshape(longEntry, color=color.green, style=shape.labelup, location=location.belowbar, text="BUY")
plotshape(shortEntry, color=color.red, style=shape.labeldown, location=location.abovebar, text="SELL")
plot(ema, color=color.blue, title="EMA")
bgcolor(rsi > rsiOverbought or rsi < rsiOversold ? color.new(color.gray, 80) : na)

```

> Detail

https://www.fmz.com/strategy/482430

> Last Modified

2025-02-18 14:02:44
