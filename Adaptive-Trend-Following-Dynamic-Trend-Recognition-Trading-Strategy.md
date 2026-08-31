
> Name

Adaptive-Trend-Following-Dynamic-Trend-Recognition-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11f344aa60260109dc3.png)

#### Overview
This strategy is a trend-following trading system that combines the Supertrend indicator with the Kaufman Adaptive Moving Average (KAMA). It dynamically identifies market trend changes, seeks long opportunities in uptrends, and employs flexible stop-loss mechanisms for risk control. The core concept relies on the Supertrend indicator's trend direction determination capability, combined with KAMA's market volatility adaptive characteristics, to establish long positions in upward market trends.

#### Strategy Principles
The strategy employs a dual technical indicator confirmation system. First, the Supertrend indicator calculates trend direction using ATR and custom coefficients, indicating an uptrend when the indicator line is below the price. Second, the KAMA indicator adjusts moving average sensitivity through an adaptive mechanism, better accommodating different market conditions. Entry signals require two simultaneous conditions: Supertrend indicating an uptrend and price above the KAMA line. Similarly, exit signals need dual confirmation: Supertrend switching to downtrend and price falling below the KAMA line. This dual confirmation mechanism effectively reduces false signals.

#### Strategy Advantages
1. Implements dual technical indicator confirmation, improving signal reliability
2. KAMA indicator features adaptive characteristics, adjusting sensitivity to market volatility
3. Supertrend indicator provides clear trend direction signals
4. Comprehensive stop-loss mechanism for effective risk control
5. Clear strategy logic with adjustable parameters
6. Definitive entry and exit signals, easy to execute

#### Strategy Risks
1. May generate frequent trading signals in choppy markets, increasing transaction costs
2. Potential lag during initial trend reversals, affecting stop-loss effectiveness
3. Improper parameter selection may lead to oversensitivity or sluggishness
4. Significant slippage possible during rapid market fluctuations
5. Trading costs and slippage may impact overall strategy returns

#### Strategy Optimization Directions
1. Introduce volatility filtering mechanism to adjust parameters or pause trading during high volatility
2. Add volume indicators for additional confirmation
3. Optimize stop-loss mechanism, consider implementing trailing stops
4. Enhance market environment assessment for strategy applicability
5. Implement time filtering to avoid trading during specific periods
6. Develop adaptive parameter optimization system

#### Conclusion
This strategy constructs a robust trend-following trading system by combining Supertrend and KAMA technical indicators. Its main advantages lie in adaptability and risk control capabilities, with enhanced trading signal reliability through dual confirmation. While facing challenges in choppy markets, the strategy's overall performance can be further improved through appropriate parameter settings and optimization implementations. It is particularly suitable for medium to long-term trend trading and performs well in markets with clear trends.

> Source (PineScript)

``` pinescript
/*backtest
start: 2019-12-23 08:00:00
end: 2024-12-25 08:00:00
period: 1d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=6
strategy("Supertrend + KAMA Long Strategy", overlay=true, commission_type=strategy.commission.percent, commission_value=0.1, slippage=3)

// User-defined inputs for date range
startDate   = input(timestamp("2018-01-01 00:00:00"), title="Start Date")
endDate     = input(timestamp("2069-12-31 23:59:59"), title="End Date")
inDateRange = true

// Inputs for KAMA and Supertrend
kamaLength  = input.int(21, title="KAMA Length", minval=1)
atrPeriod   = input.int(10, title="Supertrend ATR Length", minval=1)
factor      = input.float(3.0, title="Supertrend Factor", minval=0.01, step=0.01)

//------------------------- Kaufman Moving Average Adaptive (KAMA) -------------------------
xPrice   = close
xvnoise  = math.abs(xPrice - xPrice[1])
Length   = kamaLength
nfastend = 0.666
nslowend = 0.0645
nsignal  = math.abs(xPrice - xPrice[Length])
float nnoise = 0.0
for i = 0 to Length - 1
    nnoise := nnoise + xvnoise[i]
nefratio = nnoise != 0.0 ? nsignal / nnoise : 0.0
nsmooth  = math.pow(nefratio * (nfastend - nslowend) + nslowend, 2)
var float nAMA = na
nAMA := nz(nAMA[1]) + nsmooth * (xPrice - nz(nAMA[1]))
plot(nAMA, color=color.blue, linewidth=2, title="Kaufman KAMA")

//------------------------- Supertrend Calculation -------------------------
[stValue, dirValue] = ta.supertrend(factor, atrPeriod)
upTrend   = dirValue < 0
downTrend = dirValue >= 0
plot(dirValue < 0 ? stValue : na, "Up Trend", color=color.green, style=plot.style_linebr)
plot(dirValue >= 0 ? stValue : na, "Down Trend", color=color.red, style=plot.style_linebr)

//------------------------- Strategy Logic -------------------------
// Entry condition: Supertrend is in uptrend AND price is above KAMA
canLong = inDateRange and upTrend and close > nAMA

// Exit condition (Take Profit): Supertrend switches to downtrend AND price is below KAMA
stopLoss = inDateRange and downTrend and close < nAMA

if canLong
    strategy.entry("Long", strategy.long)
    label.new(bar_index, low, "BUY", color=color.green, textcolor=color.white, style=label.style_label_down, size=size.normal)

if stopLoss
    strategy.close("Long", comment="Stop Loss")
    label.new(bar_index, high, "STOP LOSS", color=color.red, textcolor=color.white, style=label.style_label_up, size=size.normal)

//------------------------- Alerts -------------------------
alertcondition(canLong, title="Long Entry", message="Supertrend + KAMA Long Signal")
alertcondition(stopLoss, title="Stop Loss", message="Supertrend switched to Downtrend and Price below KAMA")

```

> Detail

https://www.fmz.com/strategy/476273

> Last Modified

2024-12-27 15:41:30
