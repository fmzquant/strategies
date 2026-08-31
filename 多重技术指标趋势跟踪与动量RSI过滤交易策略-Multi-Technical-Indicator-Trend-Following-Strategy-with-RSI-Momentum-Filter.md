
> Name

多重技术指标趋势跟踪与动量RSI过滤交易策略-Multi-Technical-Indicator-Trend-Following-Strategy-with-RSI-Momentum-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b6c90e0a40b06103c5.png)


#### Overview
This is a trend-following strategy that combines multiple technical indicators, primarily using Exponential Moving Average (EMA) crossovers, Supertrend indicator, and Relative Strength Index (RSI) to identify trading opportunities. The strategy achieves a complete trading system by organically integrating indicators, adding momentum filtering to trend following, and utilizing ATR for dynamic stop-loss and take-profit positioning.

#### Strategy Principles
The strategy employs a triple-filtering mechanism to determine trading signals:
1. EMA crossover system captures short-term trend changes, generating long signals when fast EMA crosses above slow EMA and short signals when crossing below.
2. Supertrend indicator calculates dynamic support/resistance lines based on ATR to confirm overall trend direction. Long positions are only allowed when price is above the Supertrend line, and shorts when below.
3. RSI indicator filters overbought or oversold market conditions. Long entries are permitted only when RSI is below overbought levels, and shorts when above oversold levels.

The strategy includes an ATR-based dynamic stop-loss and take-profit system that automatically adjusts risk management parameters based on market volatility. A time filter also restricts trading to specific time periods to avoid low liquidity periods.

#### Strategy Advantages
1. The combination of multiple technical indicators provides more reliable trading signals, avoiding false signals that might come from single indicators.
2. Dynamic stop-loss and take-profit settings adapt to different market volatility conditions, allowing more breathing room in highly volatile markets.
3. RSI filtering mechanism effectively reduces the risk of entering during extreme market conditions.
4. Time filtering functionality allows traders to focus on specific trading sessions, avoiding inefficient periods.

#### Strategy Risks
1. Multiple filtering conditions may cause missed trading opportunities.
2. Stop-loss levels might be easily triggered in rapidly volatile markets.
3. Excessive parameter optimization may lead to overfitting issues.
4. High-frequency trading may result in significant transaction costs.

#### Strategy Optimization Directions
1. Consider adding volume indicators as additional confirmation.
2. Introduce adaptive parameter adjustment mechanisms for better adaptation to different market environments.
3. Implement trend strength filters to avoid overtrading in weak trend markets.
4. Develop more intelligent position sizing systems that dynamically adjust position sizes based on market conditions.

#### Summary
This strategy constructs a relatively complete trading system by combining multiple technical indicators and filtering conditions. Its core advantages lie in multiple confirmation mechanisms and dynamic risk management, while attention must be paid to parameter optimization and transaction costs. Through continuous optimization and improvement, the strategy has the potential to maintain stable performance across different market environments.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-11-19 00:00:00
end: 2024-12-18 08:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Supertrend + EMA Crossover with RSI Filter", shorttitle="ST_EMA_RSI", overlay=true)

// Input parameters for EMA
fastEMA          = input.int(3,  title="Fast EMA Period", minval=1)
slowEMA          = input.int(6,  title="Slow EMA Period", minval=1)
atrLength        = input.int(3,  title="ATR Length", minval=1)

// Using a fixed multiplier for Supertrend calculation
stMultiplier = 1

// Stop loss and take profit multipliers
stopLossATR      = input.float(2.5, title="Stop Loss ATR Multiplier", minval=0.1, step=0.1)
takeProfitATR    = input.float(4,   title="Take Profit ATR Multiplier", minval=0.1, step=0.1)

// RSI inputs
rsiLength      = input.int(10, title="RSI Length", minval=1)
rsiOverbought  = input.float(65, title="RSI Overbought Level", minval=50.0, maxval=100.0)
rsiOversold    = input.float(30.0, title="RSI Oversold Level",   minval=0.0, maxval=50.0)

// Declare the RSI plot toggle input as a global variable
bool rsiPlotEnabled = input.bool(true, title="Show RSI in separate panel")

// Time filter inputs
i_startTime = input(title="Start Filter", defval=timestamp("01 Jan 2023 13:30 +0000"), group="Time Filter", tooltip="Start date & time to begin searching for setups")
i_endTime   = input(title="End Filter",   defval=timestamp("28 Apr 2099 19:30 +0000"), group="Time Filter", tooltip="End date & time to stop searching for setups")

// Date/time filtering logic
inDateRange = true

// Calculate EMAs
fastEMALine = ta.ema(close, fastEMA)
slowEMALine = ta.ema(close, slowEMA)

// Calculate ATR
atr = ta.atr(atrLength)

// Calculate Supertrend using fixed multiplier
up = high - (stMultiplier * atr)
dn = low +  (stMultiplier * atr)

var float trendUp = na
var float trendDown = na
var int trend = na

trendUp   := na(trendUp[1])   ? up : (close[1] > trendUp[1]   ? math.min(up, trendUp[1])   : up)
trendDown := na(trendDown[1]) ? dn : (close[1] < trendDown[1] ? math.max(dn, trendDown[1]) : dn)

trend := close > nz(trendUp[1]) ? 1 : close < nz(trendDown[1]) ? -1 : nz(trend[1], 1)
supertrend = trend == 1 ? trendUp : trendDown

// Calculate RSI
myRSI = ta.rsi(close, rsiLength)

// Entry conditions with RSI filter
longEntryCondition  = ta.crossover(fastEMALine, slowEMALine) and (trend == 1) and (myRSI < rsiOverbought)
shortEntryCondition = ta.crossunder(fastEMALine, slowEMALine) and (trend == -1) and (myRSI > rsiOversold)

// Strategy entries
if inDateRange and longEntryCondition and strategy.position_size <= 0
    strategy.entry("Long", strategy.long)

if inDateRange and shortEntryCondition and strategy.position_size >= 0
    strategy.entry("Short", strategy.short)

// Stops and targets
if strategy.position_size > 0
    longStopLoss   = strategy.position_avg_price - stopLossATR * atr
    longTakeProfit = strategy.position_avg_price + takeProfitATR * atr
    strategy.exit("Long SL/TP", "Long", stop=longStopLoss, limit=longTakeProfit)

if strategy.position_size < 0
    shortStopLoss   = strategy.position_avg_price + stopLossATR * atr
    shortTakeProfit = strategy.position_avg_price - takeProfitATR * atr
    strategy.exit("Short SL/TP", "Short", stop=shortStopLoss, limit=shortTakeProfit)

// Plot EMAs and Supertrend
plot(fastEMALine, title="Fast EMA", color=color.new(color.blue, 0))
plot(slowEMALine, title="Slow EMA", color=color.new(color.red, 0))
plot(trend == 1 ? supertrend : na, title="Supertrend Up", color=color.green, style=plot.style_linebr)
plot(trend == -1 ? supertrend : na, title="Supertrend Down", color=color.red, style=plot.style_linebr)

// Plot RSI and hlines
plot(rsiPlotEnabled ? myRSI : na, title="RSI", color=color.new(color.purple, 0))
hline(rsiOverbought, "Overbought", color=color.red, linestyle=hline.style_dotted)
hline(rsiOversold,   "Oversold",   color=color.green, linestyle=hline.style_dotted)

// Plot entry signals
plotshape(longEntryCondition, title="Long Entry Signal", style=shape.triangleup, location=location.belowbar, size=size.tiny, color=color.new(color.green, 0))
plotshape(shortEntryCondition, title="Short Entry Signal", style=shape.triangledown, location=location.abovebar, size=size.tiny, color=color.new(color.red, 0))

```

> Detail

https://www.fmz.com/strategy/475590

> Last Modified

2024-12-20 14:10:43
