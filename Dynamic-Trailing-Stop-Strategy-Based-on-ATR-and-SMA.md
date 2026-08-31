
> Name

Dynamic-Trailing-Stop-Strategy-Based-on-ATR-and-SMA

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/f1c5134f002b90bb04.png)

## Overview

This strategy combines the ATR (Average True Range) indicator and the SMA (Simple Moving Average) indicator to implement a dynamic trailing stop trading system. When the price is above the SMA, it opens a long position and sets a dynamic stop loss based on ATR. The stop loss price will continue to rise as the price rises. When the price falls below the dynamic stop loss price, the position is closed. The main idea of this strategy is to lock in profits and reduce drawdowns in trend markets using dynamic stop loss.

## Strategy Principles

1. Calculate the 50-day SMA. When the closing price is greater than the 50-day SMA, open a long position.
2. Calculate the ATR indicator with a period of 10, multiplied by a key value (default is 3) to get the stop loss range nLoss.
3. Calculate the dynamic stop loss price xATRTrailingStop, with an initial value of 0.
   - When the closing price and the previous closing price are both greater than the previous stop loss price, the new stop loss price is the larger of the previous stop loss price and (closing price - nLoss).
   - When the closing price and the previous closing price are both less than the previous stop loss price, the new stop loss price is the smaller of the previous stop loss price and (closing price + nLoss).
   - In other cases, the new stop loss price is (closing price - nLoss) or (closing price + nLoss).
4. When the closing price falls below the dynamic stop loss price, close the position.
5. The stop loss points are marked with different colors: green for long stop loss, red for short stop loss, and blue for other cases.

## Advantage Analysis

1. The dynamic stop loss mechanism can protect profits and reduce drawdown risk in trend markets. Compared with fixed stop loss, dynamic stop loss is more flexible and can adapt to different market conditions.
2. The stop loss range is calculated based on the ATR indicator. ATR can well reflect the size of market volatility, so the stop loss distance will automatically adjust according to the volatility of recent market conditions. It increases the stop loss space when volatility increases and reduces the stop loss space when volatility decreases.
3. Using SMA as the basis for trend judgment can capture relatively clear trend markets. Opening long positions above the SMA can intervene in the early stages of the trend and aim for greater profit space.
4. Allows users to set ATR period and key value parameters, which can flexibly adjust strategy parameters to adapt to the characteristics of different varieties and cycles.

## Risk Analysis

1. In unclear or oscillating markets, this strategy may experience frequent opening and closing of positions, leading to increased transaction costs and reduced profits.
2. This strategy only has long logic and cannot profit in a downward trend, facing the risk of a one-sided market. Consider adding short logic to achieve two-way trading.
3. The stop loss point is based on ATR calculation. When the market fluctuates violently, the stop loss space may be too large, leading to increased risk. Consider setting a maximum stop loss range to control the maximum loss of a single transaction.
4. Improper parameter selection may lead to strategy failure. For example, if the ATR period is too small, it may lead to overly sensitive stop loss and frequent triggers; if it is too large, it may not stop loss in time and amplify losses.

## Optimization Direction

1. Add short logic to profit in downward trends and improve the adaptability of the strategy. You can open a short position when the price falls below the SMA, and also use dynamic stop loss logic.
2. Introduce long and short position management to adjust the position size according to the trend strength. Increase positions when the trend is strong to increase returns; decrease positions when the trend is weak to control risk.
3. Optimize the stop loss logic and set a maximum stop loss range to prevent excessive losses in extreme situations. At the same time, consider setting a take profit point to actively close the position when the expected return is reached, rather than holding it until the stop loss is triggered.
4. Optimize parameters by traversing different parameter combinations to find the best parameter settings. Intelligent optimization methods such as genetic algorithms can be used to improve optimization efficiency.
5. Consider adding more filtering conditions, such as trading volume and volatility indicators, to better judge trends and risks and improve the reliability of signals.

## Summary

This strategy implements a dynamic trailing stop trading system based on the ATR and SMA indicators, which can automatically adjust the stop loss position in trend markets to protect profits and control risks. The strategy logic is clear and has obvious advantages, but it also has some limitations and risk points. Through reasonable optimization and improvement, such as adding short logic, optimizing position management, setting maximum stop loss, etc., the robustness and profitability of the strategy can be further improved. In practical applications, it is necessary to flexibly adjust strategy parameters according to different trading varieties and cycles, and strictly control risks. In general, this strategy provides a feasible idea for quantitative trading and is worthy of further exploration and optimization.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Key Value. 'This changes the sensitivity'|
|v_input_2|10|ATR Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-05 00:00:00
end: 2024-03-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Trailingstop", overlay=true)

if close > sma(close, 50)
    strategy.entry("long", strategy.long)

// Trailing stop loss for long positions
Trailperc = 0.20
price_stop_long = 0.0

if (strategy.position_size > 0)
    stopValue = close * (1 - Trailperc)
    price_stop_long := max(stopValue, price_stop_long[1])
else
    price_stop_long := 0

if (strategy.position_size > 0)
    strategy.exit(id="stoploss_long", stop=price_stop_long)

// Trailing stop loss for short positions
Trailperc_short = 0.20
price_stop_short = 0.0

if (strategy.position_size < 0)
    stopValue_short = close * (1 + Trailperc_short)
    price_stop_short := min(stopValue_short, price_stop_short[1])
else
    price_stop_short := 0

if (strategy.position_size < 0)
    strategy.exit(id="stoploss_short", stop=price_stop_short)

// ATR Trailing Stop for visualization
keyvalue = input(3, title="Key Value. 'This changes the sensitivity'", step=0.5)
atrperiod = input(10, title="ATR Period")
xATR = atr(atrperiod)
nLoss = keyvalue * xATR

xATRTrailingStop = 0.0
xATRTrailingStop := iff(close > nz(xATRTrailingStop[1], 0) and close[1] > nz(xATRTrailingStop[1], 0), max(nz(xATRTrailingStop[1]), close - nLoss),
   iff(close < nz(xATRTrailingStop[1], 0) and close[1] < nz(xATRTrailingStop[1], 0), min(nz(xATRTrailingStop[1]), close + nLoss),
   iff(close > nz(xATRTrailingStop[1], 0), close - nLoss, close + nLoss)))

pos = 0  
pos :=   iff(close[1] < nz(xATRTrailingStop[1], 0) and close > nz(xATRTrailingStop[1], 0), 1,
   iff(close[1] > nz(xATRTrailingStop[1], 0) and close < nz(xATRTrailingStop[1], 0), -1, nz(pos[1], 0)))

xcolor = pos == -1 ? color.red: pos == 1 ? color.green : color.blue

plot(xATRTrailingStop, color = xcolor, title = "Trailing Stop")
```

> Detail

https://www.fmz.com/strategy/444361

> Last Modified

2024-03-11 11:55:21
