
> Name

Momentum-Swing-Effective-Profit-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/de670b298f6f52814f.png)
#### Overview

The Momentum Swing Effective Profit Strategy is a quantitative trading strategy designed to capture profitable opportunities in mid-term financial markets by integrating swing trading principles and momentum indicators. The strategy utilizes a combination of technical indicators including moving averages, crossover signals, and volume analysis to generate buy and sell signals. The goal is to identify market trends and capitalize on price momentum for profits.

#### Strategy Logic

The buy signal is determined by multiple factors including A1, A2, A3, XG and weeklySlope. Specifically:

A1 Condition: Checks for specific price relationships, verifying the ratio of highest price to closing price is less than 1.03, ratio of opening price to lowest price is less than 1.03, and ratio of highest price to previous closing price is greater than 1.06. This condition looks for a specific pattern indicating potential bullish momentum.

A2 Condition: Checks for price relationships related to closing price, verifying ratio of closing price to opening price is greater than 1.05 or ratio of closing price to previous closing price is greater than 1.05. This condition looks for signs of upward price movement and momentum. 

A3 Condition: Focuses on volume, checking if current volume crosses above the highest volume over the last 60 periods. This condition aims to identify increased buying interests and potentially confirms the strength of the potential upward price movement.

XG Condition: Combines the A1 and A2 conditions and checks if they are true for both the current and previous bars. It also verifies the ratio of closing price to 5-period EMA crosses above the 9-period SMA of the same ratio. This condition helps identify potential buy signals when multiple factors align, indicating strong bullish momentum and potential entry point.

Weekly Trend Factor: Calculates the slope of 50-period SMA on a weekly timeframe. It checks if the slope is positive, indicating an overall upward trend on a weekly basis. This condition provides additional confirmation that the stock is in an upward trend.

When all these conditions are met, the buy condition is triggered, indicating a favorable time to enter a long position.

The sell condition is relatively simple in the strategy:

Sell Signal: The sell condition simply checks if the closing price crosses below the 10-period EMA. When this condition is met, it indicates a potential reversal or weakening of the upward price momentum, and a sell signal is generated.

#### Advantage Analysis

- Combines swing trading and momentum indicators, integrating different strategy ideas
- Optimizes the combination of multiple technical indicators to identify high probability trading opportunities
- Employs position sizing and stop loss techniques for risk management
- Good backtest results with considerable net profits and win rate

#### Risk Analysis  

- More effective in bull market, unable to adapt to bear markets
- False breakouts may lead to wrong trades
- Improper position sizing and stop loss settings may amplify losses
- Parameters need proper adjusting for different market environments

#### Optimization

- Add filtering indicators to improve signal quality
- Optimize stop loss methods like trailing stop loss
- Dynamically adjust position sizing 
- Combine machine learning to improve parameter optimization

#### Conclusion

The Momentum Swing Effective Profit Strategy integrates swing trading principles and momentum indicators through parameter optimization and conditions integration, achieving considerable profits in backtests. It captures mid-term trends well but should be aware of trend reversal risks. Further optimizations may improve its robustness and live performance.




> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © fzj20020403
//@version=5
strategy("Slight Swing Momentum Strategy.", overlay=true)

// Position Status Definition
var inPosition = false

// Moving Average Definition
ma60 = ta.sma(close, 60)

// A1 Condition Definition
A1 = high / close < 1.03 and open / low < 1.03 and high / close[1] > 1.06

// A2 Condition Definition
A2 = close / open > 1.05 or close / close[1] > 1.05

// A3 Condition Definition
highestVol = ta.highest(volume, 60)
A3 = ta.crossover(volume, highestVol[1])

// B1 Condition Definition
ema5 = ta.ema(close, 5)
B1 = close / ema5

// XG Condition Definition
A1andA2 = (A1 and A2) and (A1[1] and A2[1])
XG = ta.crossover(B1, ta.sma(B1, 9))

// Weekly Trend Factor Definition
weeklyMa = ta.sma(close, 50)
weeklySlope = (weeklyMa - weeklyMa[4]) / 4 > 0

// Buy Signal using XG Condition
buySignal = A1 and close > ma60 or A2 and A3 and XG and close > ma60 and weeklySlope 

// Sell Signal Condition
sellSignal = close < ta.ema(close, 10)

// Buy and Sell Conditions
buyCondition = buySignal and not inPosition
sellCondition = sellSignal and inPosition

// Execute Buy and Sell Operations
if (buyCondition)
    strategy.entry("Buy", strategy.long)
    inPosition := true
if (sellCondition)
    strategy.close("Buy")
    inPosition := false

// Stop Loss and Take Profit Levels
stopLoss = strategy.position_avg_price * 0.5
takeProfit = strategy.position_avg_price * 1.30

// Apply Stop Loss and Take Profit Levels
if inPosition
    strategy.exit("Long Stop Loss", "Buy", stop=stopLoss)
    strategy.exit("Long Take Profit", "Buy", limit=takeProfit)

// Plot Buy and Sell Signal Shapes
plotshape(buyCondition, style=shape.arrowdown, location=location.belowbar, color=color.green, size=size.small)
plotshape(sellCondition, style=shape.arrowup, location=location.abovebar, color=color.red, size=size.small)

// EMA Variable Definition
ema = ta.ema(close, 5)

// Plot Indicator Line
plot(ema, color=color.green, title="EMA")

```

> Detail

https://www.fmz.com/strategy/430854

> Last Modified

2023-11-02 15:02:05
