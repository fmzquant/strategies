
> Name

EMA-Parabolic-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18e88a6e7a7c99b19de.png)

## Overview

The EPTS strategy is a trend-following strategy based on the Parabolic SAR indicator and two exponential moving averages (EMAs) with different periods. The strategy uses the Parabolic SAR indicator to determine the current market trend direction and generates entry signals by considering the relative positions of the fast and slow EMAs. The main idea behind the strategy is "trend following," which means going long in an uptrend and short in a downtrend to achieve stable returns.

## Strategy Principles

1. The Parabolic SAR indicator is used to determine the direction of the current market trend. When the parabolic is above the candlesticks, the market is in a downtrend; when the parabolic is below the candlesticks, the market is in an uptrend.

2. Two exponential moving averages (EMAs) with different periods are used to confirm the trend and generate entry signals. This strategy uses a 5-day EMA and a 20-day EMA. When the 5-day EMA is above the 20-day EMA, the market is considered to be in an uptrend; otherwise, it is considered to be in a downtrend.

3. Entry conditions: When both the Parabolic SAR and EMAs indicate an uptrend, a long signal is generated; when both the Parabolic SAR and EMAs indicate a downtrend, a short signal is generated.

4. Exit conditions: When the Parabolic SAR crosses the candlesticks, the current position is closed, and the strategy waits for the next entry signal.

5. Stop-loss: When entering a position, the stop-loss price is set at the current position of the Parabolic SAR. As the Parabolic SAR moves, the stop-loss position is dynamically adjusted, implementing a trailing stop-loss.

By combining the Parabolic SAR indicator and EMAs, the EPTS strategy can effectively capture market trends and close positions in a timely manner when the trend reverses, controlling risk. Additionally, the dynamic stop-loss setting further reduces the strategy's drawdown risk.

## Advantages

1. Trend following: The EPTS strategy is based on the idea of trend following, which can effectively capture the main trends in the market and achieve stable returns.

2. Dynamic stop-loss: The strategy uses the Parabolic SAR as a dynamic stop-loss, adjusting the stop-loss position as the trend develops, effectively controlling risk.

3. Dual confirmation: By using dual confirmation from the Parabolic SAR and EMAs, the reliability of entry signals is improved, reducing false signals.

4. Simple and easy to use: The strategy logic is clear, and parameter settings are simple, making it easy to understand and implement.

## Risk Analysis

1. Choppy markets: In choppy markets where trends are not obvious, the strategy may generate more false signals, leading to frequent trades and larger drawdowns.

2. Trend reversals: When market trends suddenly reverse, the strategy may delay closing positions, incurring some losses.

3. Parameter settings: The performance of the strategy is influenced by parameter settings, and different parameters may lead to different results.

## Optimization Directions

1. Introduce more indicators: In addition to the existing Parabolic SAR and EMAs, introduce other trend-related indicators such as MACD and ADX to improve the accuracy of trend identification.

2. Optimize entry conditions: Optimize the entry conditions by considering factors such as the distance between the price and EMAs, trading volume, etc., to improve the quality of entry signals.

3. Dynamic parameter optimization: Dynamically adjust strategy parameters based on changes in market conditions, such as the step size of the Parabolic SAR and the periods of the EMAs, to adapt to different market environments.

4. Incorporate position sizing: Dynamically adjust position sizes based on the strength of market trends and account risk to control risk while improving returns.

## Summary

The EPTS strategy is a trend-following strategy based on the Parabolic SAR indicator and moving averages. By capturing the main market trends and closing positions in a timely manner to control risk, it aims to achieve stable returns. The strategy logic is clear and easy to implement, suitable for market environments with clear trends. However, in choppy markets, the strategy may face significant drawdown risks and needs to be combined with other indicators and optimization methods to improve its adaptability and robustness. In addition, reasonable parameter settings and position sizing are also key to the successful operation of the strategy. Overall, the EPTS strategy provides a simple and effective approach to trend following, but still requires optimization and improvement based on actual market conditions to achieve better strategy performance.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.02|start|
|v_input_2|0.02|increment|
|v_input_3|0.2|maximum|
|v_input_4|20|EMA 20 Length|
|v_input_5|5|EMA 5 Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-29 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("febin2024", overlay=true)

// Parabolic SAR Parameters
start = input(0.02)
increment = input(0.02)
maximum = input(0.2)

// EMA Parameters
ema20_length = input(20, title="EMA 20 Length")
ema5_length = input(5, title="EMA 5 Length")

// Calculate EMAs
ema20 = ta.ema(close, ema20_length)
ema5 = ta.ema(close, ema5_length)

// Parabolic SAR Logic
var bool uptrend = na
var float EP = na
var float SAR = na
var float AF = start
var float nextBarSAR = na

if bar_index > 0
    firstTrendBar = false
    SAR := nextBarSAR
    if bar_index == 1
        float prevSAR = na
        float prevEP = na
        lowPrev = low[1]
        highPrev = high[1]
        closeCur = close
        closePrev = close[1]
        if closeCur > closePrev
            uptrend := true
            EP := high
            prevSAR := lowPrev
            prevEP := high
        else
            uptrend := false
            EP := low
            prevSAR := highPrev
            prevEP := low
        firstTrendBar := true
        SAR := prevSAR + start * (prevEP - prevSAR)
    if uptrend
        if SAR > low
            firstTrendBar := true
            uptrend := false
            SAR := math.max(EP, high)
            EP := low
            AF := start
    else
        if SAR < high
            firstTrendBar := true
            uptrend := true
            SAR := math.min(EP, low)
            EP := high
            AF := start
    if not firstTrendBar
        if uptrend
            if high > EP
                EP := high
                AF := math.min(AF + increment, maximum)
        else
            if low < EP
                EP := low
                AF := math.min(AF + increment, maximum)
    if uptrend
        SAR := math.min(SAR, low[1])
        if bar_index > 1
            SAR := math.min(SAR, low[2])
    else
        SAR := math.max(SAR, high[1])
        if bar_index > 1
            SAR := math.max(SAR, high[2])
    nextBarSAR := SAR + AF * (EP - SAR)
    if barstate.isconfirmed
        if uptrend
            strategy.entry("ParSE", strategy.short, stop=nextBarSAR, comment="ParSE")
            strategy.cancel("ParLE")
        else
            strategy.entry("ParLE", strategy.long, stop=nextBarSAR, comment="ParLE")
            strategy.cancel("ParSE")

// Plot Parabolic SAR
plot(SAR, style=plot.style_cross, linewidth=3, color=color.orange)
plot(nextBarSAR, style=plot.style_cross, linewidth=3, color=color.aqua)

// Plot EMAs
plot(ema20, color=color.blue, linewidth=2, title="EMA 20")
plot(ema5, color=color.red, linewidth=2, title="EMA 5")

// Equity Plot
plot(strategy.equity, title="Equity", color=color.green, linewidth=2)

```

> Detail

https://www.fmz.com/strategy/446334

> Last Modified

2024-03-27 17:59:11
