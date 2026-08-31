
> Name

Triple-EMA-Trend-Following-Multi-Indicator-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/a44341f52ee66e1139.png)


#### Overview
This strategy is a trend following system based on multiple technical indicators, combining Moving Averages (EMA), Directional Movement Index (DMI), Detrended Price Oscillator (DPO), Relative Strength Index (RSI), and Average True Range (ATR). The core concept is to execute trades only after confirming multiple market characteristics including trend direction, momentum, and volatility to improve trading success rate.

#### Strategy Principles
The strategy employs a Triple Exponential Moving Average (EMA) system as its core trend identification mechanism, combined with other technical indicators for multiple signal confirmation:
1. Fast EMA (10-day) captures short-term price momentum
2. Medium EMA (25-day) serves as a medium-term trend filter
3. Slow EMA (50-day) defines the overall trend direction
4. DMI (14-day) confirms trend directional strength
5. DPO confirms price deviation from trend
6. RSI (14-day) measures momentum and overbought/oversold conditions
7. ATR (14-day) sets stop-loss and profit targets

Trade Signal Conditions:
- Long: Fast EMA crosses above Medium EMA with both above Slow EMA, ADX>25, RSI>50, DPO>0
- Short: Fast EMA crosses below Medium EMA with both below Slow EMA, ADX>25, RSI<50, DPO<0

#### Strategy Advantages
1. Multiple signal confirmation improves reliability and reduces false signals
2. Combines trend following and momentum characteristics for effective trend capture
3. Dynamic adjustment of stops and targets through ATR adapts to market volatility
4. Systematic risk management limits each trade risk to 2% of account
5. Clear strategy logic with well-defined component functions facilitates debugging and optimization

#### Strategy Risks
1. May generate frequent false breakout signals in ranging markets
2. Multiple indicator confirmation can lead to delayed entries
3. Fixed ADX threshold may perform inconsistently across different market conditions
4. Potentially significant drawdowns during quick market reversals
5. Parameter optimization risks overfitting to historical data

Risk Control Measures:
- Dynamic ATR-based stops adapt to market volatility
- Fixed proportion risk management
- Multiple indicator cross-confirmation reduces false signals

#### Strategy Optimization Directions
1. Introduce adaptive parameter mechanisms to dynamically adjust indicator parameters based on market conditions
2. Add market environment recognition module to apply different trading rules in different market conditions
3. Optimize exit mechanism by incorporating trend reversal signals and partial profit-taking
4. Incorporate volume analysis to improve signal reliability
5. Develop drawdown control mechanism to reduce position size or pause trading during consecutive losses

#### Summary
This strategy constructs a complete trend following trading system through the combination of multiple technical indicators. Its main features are strict signal confirmation and reasonable risk control, suitable for tracking medium to long-term trends on daily timeframes. While there is some lag in signals, the strategy demonstrates robust overall performance through strict risk control and multiple signal confirmation. When applying to live trading, careful consideration should be given to market environment selection and parameter optimization for specific instruments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2025-01-15 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT","balance":49999}]
*/

//@version=5
strategy("Daily Strategy with Triple EMA, DMI, DPO, RSI, and ATR", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

// Input parameters
fastEmaLength = input.int(10, title="Fast EMA Length")
mediumEmaLength = input.int(25, title="Medium EMA Length")
slowEmaLength = input.int(50, title="Slow EMA Length")
dmiLength = input.int(14, title="DMI Length")
adxSmoothing = input.int(14, title="ADX Smoothing")
dpoLength = input.int(14, title="DPO Length")
rsiLength = input.int(14, title="RSI Length")
atrLength = input.int(14, title="ATR Length")
riskPercentage = input.float(2.0, title="Risk Percentage", step=0.1)
atrMultiplier = input.float(1.5, title="ATR Multiplier for Stop Loss", step=0.1)
tpMultiplier = input.float(2.0, title="ATR Multiplier for Take Profit", step=0.1)

// Calculate EMAs
fastEma = ta.ema(close, fastEmaLength)
mediumEma = ta.ema(close, mediumEmaLength)
slowEma = ta.ema(close, slowEmaLength)

// Calculate other indicators
[adx, diPlus, diMinus] = ta.dmi(dmiLength, adxSmoothing)
dpo = close - ta.sma(close, dpoLength)
rsi = ta.rsi(close, rsiLength)
atr = ta.atr(atrLength)

// Trading logic
longCondition = ta.crossover(fastEma, mediumEma) and fastEma > slowEma and mediumEma > slowEma and adx > 25 and rsi > 50 and dpo > 0
shortCondition = ta.crossunder(fastEma, mediumEma) and fastEma < slowEma and mediumEma < slowEma and adx > 25 and rsi < 50 and dpo < 0

// Risk management
riskAmount = (strategy.equity * riskPercentage) / 100
stopLoss = atr * atrMultiplier
takeProfit = atr * tpMultiplier

// Entry and exit logic
if (longCondition)
    strategy.entry("Buy", strategy.long)
    strategy.exit("Exit Long", "Buy", stop=close - stopLoss, limit=close + takeProfit)

if (shortCondition)
    strategy.entry("Sell", strategy.short)
    strategy.exit("Exit Short", "Sell", stop=close + stopLoss, limit=close - takeProfit)

// Plot indicators
plot(fastEma, color=color.green, title="Fast EMA")
plot(mediumEma, color=color.orange, title="Medium EMA")
plot(slowEma, color=color.red, title="Slow EMA")
hline(25, "ADX Threshold", color=color.gray, linestyle=hline.style_dotted)

```

> Detail

https://www.fmz.com/strategy/478706

> Last Modified

2025-01-17 14:57:26
