
> Name

多层波动带交易策略-Multi-Layer-Volatility-Band-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10a76ac57e69a617f6c.png)


#### Overview

The Multi-Layer Volatility Band Trading Strategy is a quantitative trading approach based on price volatility. This strategy utilizes multiple volatility bands to identify overbought and oversold areas in the market, initiating trades when prices touch these areas. The core idea is to establish positions when prices deviate from the mean and profit when they revert. This method draws on mean reversion theory while incorporating elements of the Martingale strategy, increasing positions during adverse price movements to enhance profit opportunities.

#### Strategy Principles

1. Moving Average Calculation: The strategy uses selectable moving average types (SMA, EMA, SMMA, WMA, VWMA) to calculate the basis line.

2. Volatility Band Setup: Multiple volatility bands are set up based on the basis line, using standard deviation multiplied by a factor.

3. Fibonacci Levels: Fibonacci retracement levels (23.6%, 38.2%, 50%, 61.8%) are used to subdivide the volatility bands, creating more trading opportunities.

4. Dynamic Adjustment: An option to use dynamic multipliers based on ATR (Average True Range) to automatically adjust the width of volatility bands.

5. Entry Logic: Positions are established when the price touches or crosses a volatility band in the corresponding direction.

6. Position Scaling: If the price continues to move unfavorably, the strategy adds to the position at further volatility band levels, embodying the Martingale strategy concept.

7. Exit Logic: Profits are taken when the price reverts to the basis line. An option to close positions when the price crosses the basis line is also available.

#### Strategy Advantages

1. Multi-level Entry: By setting multiple volatility bands and Fibonacci levels, the strategy provides more trading opportunities, capturing market volatility at different price levels.

2. High Flexibility: The strategy allows users to choose different types of moving averages, periods, and parameters to adapt to various market environments and trading instruments.

3. Dynamic Adaptation: The optional dynamic multiplier feature enables the strategy to automatically adjust according to market volatility, enhancing adaptability.

4. Risk Management: By increasing positions during adverse price movements, the strategy attempts to lower the average entry price, increasing the probability of ultimate profitability.

5. Mean Reversion Concept: The strategy is based on the idea that prices will eventually revert to the mean, which performs well in many markets and timeframes.

6. Customizability: Users can adjust parameters such as share size and Fibonacci levels according to their risk preferences and trading style.

#### Strategy Risks

1. Consecutive Loss Risk: In strong trending markets, prices may continuously break through multiple volatility bands, leading to consecutive position increases and accumulating significant losses.

2. Capital Management Pressure: The Martingale-style position scaling can lead to rapidly increasing capital requirements, potentially exceeding account capacity.

3. Overtrading: Multiple volatility bands may generate excessive trading signals in range-bound markets, increasing transaction costs.

4. Parameter Sensitivity: Strategy performance is highly dependent on parameter settings; inappropriate parameters may lead to poor performance.

5. Slippage and Liquidity Risk: In highly volatile markets, significant slippage may be encountered, especially when scaling positions.

6. Drawdown Risk: Although the strategy aims to lower average costs through position scaling, it may still face substantial drawdowns under extreme market conditions.

#### Strategy Optimization Directions

1. Introduce Trend Filters: Add long-term trend indicators to open positions only in the trend direction, avoiding frequent counter-trend trades in strong trends.

2. Dynamic Position Sizing: Adjust the number of shares traded based on account size and market volatility to better control risk.

3. Optimize Exit Mechanisms: Consider introducing trailing stops or volatility-based dynamic stop-losses to better lock in profits and control risks.

4. Add Time Filters: Implement trading time window restrictions to avoid periods of high volatility or poor liquidity.

5. Integrate Market Sentiment Indicators: Incorporate volatility indicators like VIX to adjust strategy parameters or pause trading during high volatility periods.

6. Introduce Machine Learning: Use machine learning algorithms to dynamically optimize parameters, improving the strategy's adaptability to market changes.

7. Add Fundamental Filters: Incorporate fundamental data to allow trading only under specific fundamental conditions, improving trade quality.

#### Conclusion

The Multi-Layer Volatility Band Trading Strategy is a complex trading system combining technical analysis, probability theory, and risk management. It attempts to capture profits from price fluctuations through multi-level entry points and Martingale-style position scaling. The strategy's strengths lie in its flexibility and utilization of mean reversion, but it also faces risks in strong trending markets.

To successfully apply this strategy, traders need a deep understanding of market characteristics, careful parameter setting, and strict risk management implementation. Through continuous optimization and backtesting, combined with market insights, this strategy has the potential to become an effective trading tool. However, given its complexity and potential risks, it is advisable to conduct thorough simulated testing and risk assessment before live trading.

Overall, the Multi-Layer Volatility Band Trading Strategy provides an interesting and challenging framework for quantitative traders. Its successful application requires technical analysis skills, risk management techniques, and ongoing strategy optimization.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-06-30 00:00:00
end: 2024-07-30 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © abtov

//@version=5
strategy("Spider Strategy", overlay=true)

ma(source, length, type) =>
    switch type
        "SMA" => ta.sma(source, length)
        "Bollinger Bands" => ta.sma(source, length)
        "EMA" => ta.ema(source, length)
        "SMMA (RMA)" => ta.rma(source, length)
        "WMA" => ta.wma(source, length)
        "VWMA" => ta.vwma(source, length)

stdev = input.int(56, "STDEV", group="Stdev")
mult = input.float(2.3, "Multiplier", group="Stdev")
ma_len = input.int(230, "Basis Length", group="Stdev")
ma_type = input.string("SMA", title="MA Type", options=["SMA", "Bollinger Bands", "EMA", "SMMA (RMA)", "WMA", "VWMA"], group="Stdev")
auto_mult = input.bool(true, "Dynamic Mult.", group="Stdev")
basis_exit = input.bool(false, "Basis Exit", group="Stdev")

col_int = input.int(12, "Collective Value", group="Collective")
col_input = input.bool(true, "Collective Input", group="Collective")


fib1 = input.float(0.236, "Fibonacci Level 1", group = "Fibonacci")
fib2 = input.float(0.382, "Fibonacci Level 2", group = "Fibonacci")
fib3 = input.float(0.5, "Fibonacci Level 3", group = "Fibonacci")
fib4 = input.float(0.618, "Fibonacci Level 4", group = "Fibonacci")

atr_len = input.int(30, "ATR", group="ATR")
atr_bias = input.float(0.72, "Bias", group="ATR")

shares = input.int(1, "Shares Amount", group="Strategy")

if(col_input == true)
    stdev := col_int
    ma_len := col_int
    atr_len := col_int

if(auto_mult == true)
    mult := ma(ta.tr(true), atr_len, ma_type) * atr_bias


basis = ma(close, ma_len, ma_type)
lower = basis - stdev * mult
upper = basis + stdev * mult

lower2 = basis - stdev * mult * fib1
upper2 = basis + stdev * mult * fib1

lower3 = basis - stdev * mult * fib2
upper3 = basis + stdev * mult * fib2

lower4 = basis - stdev * mult * fib3
upper4 = basis + stdev * mult * fib3

lower5 = basis - stdev * mult * fib4
upper5 = basis + stdev * mult * fib4


var lowerAct = false
var lower2Act = false
var lower3Act = false
var lower4Act = false
var lower5Act = false

var upperAct = false
var upper2Act = false
var upper3Act = false
var upper4Act = false
var upper5Act = false


plot(upper, "limit short", color.red)
plot(upper2, "limit 1 short", color.red)
plot(upper3, "limit 2 short", color.red)
plot(upper4, "limit 3 short", color.red)
plot(upper5, "limit 4 short", color.red)
plot(basis, "basis", color.white)
plot(lower, "limit long", color.green)
plot(lower2, "limit 1 long", color.green)
plot(lower3, "limit 2 long", color.green)
plot(lower4, "limit 3 long", color.green)
plot(lower5, "limit 4 long", color.green)


if(lowerAct == false)
    if(close < lower)
        strategy.entry("long", strategy.long, shares)
        lowerAct := true
else
    if(low > basis)
        lowerAct := false


if(lower2Act == false)
    if(close < lower2)
        strategy.entry("long", strategy.long, shares)
        lower2Act := true
else
    if(low > basis)
        lower2Act := false


if(lower3Act == false)
    if(close < lower3)
        strategy.entry("long", strategy.long, shares)
        lower3Act := true
else
    if(low > basis)
        lower3Act := false


if(lower4Act == false)
    if(close < lower4)
        strategy.entry("long", strategy.long, shares)
        lower4Act := true
else
    if(low > basis)
        lower4Act := false


if(lower5Act == false)
    if(close < lower5)
        strategy.entry("long", strategy.long, shares)
        lower5Act := true
else
    if(low > basis)
        lower5Act := false





if(upperAct == false)
    if(close > upper)
        strategy.entry("short", strategy.short, shares)
        upperAct := true
else
    if(high < basis)
        upperAct := false


if(upper2Act == false)
    if(close > upper2)
        strategy.entry("short", strategy.short, shares)
        upper2Act := true
else
    if(high < basis)
        upper2Act := false


if(upper3Act == false)
    if(close > upper3)
        strategy.entry("short", strategy.short, shares)
        upper3Act := true
else
    if(high < basis)
        upper3Act := false


if(upper4Act == false)
    if(close > upper4)
        strategy.entry("short", strategy.short, shares)
        upper4Act := true
else
    if(high < basis)
        upper4Act := false


if(upper5Act == false)
    if(close > upper5)
        strategy.entry("short", strategy.short, shares)
        upper5Act := true
else
    if(high < basis)
        upper5Act := false


if((ta.crossover(close, basis) and basis_exit == true))
    strategy.close("short")
    strategy.close("long")
```

> Detail

https://www.fmz.com/strategy/458264

> Last Modified

2024-07-31 14:08:36
