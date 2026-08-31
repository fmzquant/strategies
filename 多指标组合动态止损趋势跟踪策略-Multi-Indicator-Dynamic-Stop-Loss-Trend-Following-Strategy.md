
> Name

多指标组合动态止损趋势跟踪策略-Multi-Indicator-Dynamic-Stop-Loss-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/145a2a8ace87b4bdf7b.png)


#### Overview

This strategy is a composite trading system that combines multiple technical indicators, primarily using the Ultimate Trailing Stop Bot (UT Bot), Hull Moving Average (HMA), and Open Range Breakout (ORB) to generate trading signals. The core idea is to capture market trends through a dynamic stop-loss mechanism while using HMA to confirm trend direction, ultimately achieving more precise trade entries and exits.

#### Strategy Principles

1. UT Bot: This indicator calculates a dynamic stop-loss line based on the Average True Range (ATR), adapting to market volatility. When the price breaks through the stop-loss line, it may generate a trading signal.

2. HMA: The Hull Moving Average is used to reduce the lag of traditional moving averages, providing clearer trend direction indications. The color of the HMA (green for uptrend, red for downtrend) is used to validate trading signals.

3. Signal Confirmation: The strategy only executes trades when the following conditions are met:
   - Buy Signal: Price is above the UT Bot stop-loss line, and HMA is green (uptrend)
   - Sell Signal: Price is below the UT Bot stop-loss line, and HMA is red (downtrend)

4. ORB: The Open Range Breakout indicator is used to identify potential breakout opportunities at the beginning of each trading session, adding timeliness to trades.

#### Strategy Advantages

1. Multi-Indicator Synergy: By combining multiple indicators, the strategy provides a more comprehensive market analysis, reducing false signals.

2. Dynamic Risk Management: The UT Bot's dynamic stop-loss mechanism automatically adjusts based on market volatility, effectively controlling risk.

3. Trend Confirmation: Using HMA color changes to confirm trend direction improves the reliability of trading signals.

4. High Adaptability: The strategy can adapt to different market conditions and volatility, demonstrating good flexibility.

5. Precise Entries and Exits: Through a strict signal confirmation mechanism, it achieves more accurate timing of trades.

#### Strategy Risks

1. Overtrading: In range-bound markets, frequent trading signals may be generated, increasing transaction costs.

2. Lag: Although HMA reduces lag, signals may still lag in rapidly reversing markets.

3. False Breakouts: In low-volatility markets, false breakout signals may occur, leading to unnecessary trades.

4. Parameter Sensitivity: Strategy performance may be highly sensitive to input parameters (such as UT Bot sensitivity), requiring careful optimization.

#### Strategy Optimization Directions

1. Introduce Filters: Consider adding volatility filters to reduce trading frequency in low-volatility markets.

2. Optimize Parameters: Conduct backtesting to optimize parameters for UT Bot and HMA, finding the best parameter combinations.

3. Add Volume Analysis: Introduce volume indicators to help confirm the validity of price breakouts.

4. Time Filtering: Consider adding time filters to avoid executing trades during unfavorable trading sessions.

5. Risk Management Optimization: Implement dynamic position sizing, adjusting trade size based on market volatility.

#### Summary

This multi-indicator dynamic stop-loss trend following strategy integrates UT Bot, HMA, and ORB to create a comprehensive and flexible trading system. Its main advantages lie in its ability to adapt to market volatility, provide reliable trend confirmation, and achieve precise trade timing. However, the strategy also faces risks such as overtrading and parameter sensitivity. By introducing additional filtering mechanisms, optimizing parameter settings, and improving risk management methods, this strategy has the potential to achieve more robust performance under various market conditions. Overall, it is a promising strategy framework that, with proper optimization and risk management, can become an effective trading tool.




> Source (PineScript)

``` pinescript
/*backtest
start: 2024-08-26 00:00:00
end: 2024-09-24 08:00:00
period: 2h
basePeriod: 2h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy('SVMKR_UT_HMA_ORB_Strategy', overlay=true)

// Inputs
a = input(2, title='UT Key Value. \'This changes the sensitivity\'')
c = input(1, title='UT ATR Period')
h = input(false, title='Signals from Heikin Ashi Candles')

// UT Bot Logic
xATR = ta.atr(c)
nLoss = a * xATR
src = h ? request.security(ticker.heikinashi(syminfo.tickerid), timeframe.period, close, lookahead=barmerge.lookahead_off) : close

xATRTrailingStop = 0.0
iff_1 = src > nz(xATRTrailingStop[1], 0) ? src - nLoss : src + nLoss
iff_2 = src < nz(xATRTrailingStop[1], 0) and src[1] < nz(xATRTrailingStop[1], 0) ? math.min(nz(xATRTrailingStop[1]), src + nLoss) : iff_1
xATRTrailingStop := src > nz(xATRTrailingStop[1], 0) and src[1] > nz(xATRTrailingStop[1], 0) ? math.max(nz(xATRTrailingStop[1]), src - nLoss) : iff_2

pos = 0
iff_3 = src[1] > nz(xATRTrailingStop[1], 0) and src < nz(xATRTrailingStop[1], 0) ? -1 : nz(pos[1], 0)
pos := src[1] < nz(xATRTrailingStop[1], 0) and src > nz(xATRTrailingStop[1], 0) ? 1 : iff_3

ema = ta.ema(src, 1)
above = ta.crossover(ema, xATRTrailingStop)
below = ta.crossover(xATRTrailingStop, ema)

// Hull Moving Average Calculation
n = input(31, title='Hull MA Period')
n2ma = 2 * ta.wma(close, math.round(n / 2))
nma = ta.wma(close, n)
diff = n2ma - nma
sqn = math.round(math.sqrt(n))

n1 = ta.wma(diff, sqn)
c1 = n1 > n1[1] ? color.green : color.red

plot(n1, color=c1, linewidth=2, title='HullMA')

// Strategy Buy and Sell Conditions
buyCondition = src > xATRTrailingStop and above and close > n1 and c1 == color.green
sellCondition = src < xATRTrailingStop and below and close < n1 and c1 == color.red

// Execute Strategy Orders
if buyCondition
    strategy.entry('Buy', strategy.long)

if sellCondition
    strategy.entry('Sell', strategy.short)


```

> Detail

https://www.fmz.com/strategy/468331

> Last Modified

2024-09-26 16:03:18
