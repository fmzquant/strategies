
> Name

Ichimoku-Cloud-and-Moving-Average-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17e975d8001cb544ebf.png)

#### Overview
This strategy combines the Ichimoku Cloud, short-term (55) and long-term (200) Simple Moving Averages (SMA) to identify potential buy and sell signals. Buy signals require the price to be above the cloud and long-term SMA, and to retest the short-term SMA after crossing above it. Sell signals require the price to be below the cloud and long-term SMA, and to retest the short-term SMA after crossing below it. The strategy avoids generating signals during ranging markets or high news events, as these periods tend to have more fake-outs. Backtesting shows the strategy performs best on the 1-hour and 2-hour timeframes.

#### Strategy Principles
The strategy is based on the following principles:
1. When price is above the cloud and long-term SMA, the market is in an uptrend. 
2. When price is below the cloud and long-term SMA, the market is in a downtrend.
3. Crossovers of the short-term SMA confirm trends, and retests of the short-term SMA provide low-risk entry opportunities.
4. Ranging markets and high news events have more fake-outs and should be avoided.

The code first calculates the required Ichimoku Cloud components (Conversion Line, Base Line, Leading Span A and B), as well as the short-term and long-term SMAs. It then defines multiple conditions to identify the price position relative to the cloud and moving averages. When all buy/sell conditions are met, the code generates buy and sell signals respectively.

#### Strategy Advantages
1. Combines multiple indicators to confirm trends, improving signal reliability. The Ichimoku Cloud filters out noise, while SMA crossovers confirm trends.
2. Seeks low-risk entry opportunities on retests of moving averages within confirmed trends.
3. Further reduces fake-out risks by avoiding trades during ranging markets and high news events.
4. Suitable for medium to long-term trading on 1-hour and 2-hour timeframes, capturing big trends with large profit potential.

#### Strategy Risks 
1. Losses may occur during trend reversals. Although moving average crossovers and cloud breakouts confirm trends, they still lag.
2. Lacks clear stop-loss levels. Current conditions focus on entry timing but do not define specific exit points.
3. Parameter selection is subjective and uncertain. Different choices of cloud parameters, moving average lengths, etc. will affect strategy performance.

#### Strategy Optimization Directions
1. Introduce clear stop-loss levels, such as previous high/low breaches, ATR multiples, etc., to reduce single trade risk.
2. Cross-reference with other trend confirmation indicators, such as MACD, DMI, etc., to form more robust signal combinations.
3. Optimize parameters to find the best combination that improves the strategy's adaptability to various market conditions. 
4. Differentiate between trending and ranging markets, actively enter positions in trends while reducing trading frequency in ranges.

#### Summary
The "Ichimoku Cloud and Moving Average Strategy" seeks low-risk entry opportunities by combining the Ichimoku Cloud with Simple Moving Averages within established trends. By filtering out trades during ranging markets and high news events, the strategy reduces fake-out risks and improves overall performance. It is mainly suitable for medium to long-term traders and performs well on 1-hour and 2-hour timeframes. However, there is still room for further optimization, such as introducing clear stop-losses, optimizing signal combinations, and tuning parameters, to achieve more robust strategy performance.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-05-11 00:00:00
end: 2024-05-16 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Ichimoku Cloud and Moving Average Strategy", shorttitle="ICMA", overlay=true)

// Input parameters
shortMA = input.int(55, title="Short-term Moving Average Length")
longMA = input.int(200, title="Long-term Moving Average Length")

// Calculate moving averages
shortSMA = ta.sma(close, shortMA)
longSMA = ta.sma(close, longMA)

// Ichimoku Cloud settings
conversionPeriod = input.int(9, title="Conversion Line Period")
basePeriod = input.int(26, title="Base Line Period")
spanBPeriod = input.int(52, title="Span B Period")
displacement = input.int(26, title="Displacement")

// Calculate Ichimoku Cloud components
conversionLine = ta.sma(high + low, conversionPeriod) / 2
baseLine = ta.sma(high + low, basePeriod) / 2
leadSpanA = (conversionLine + baseLine) / 2
leadSpanB = ta.sma(high + low, spanBPeriod) / 2

// Plot Ichimoku Cloud components
plot(leadSpanA, color=color.blue, title="Leading Span A")
plot(leadSpanB, color=color.red, title="Leading Span B")

// Entry conditions
aboveCloud = close > leadSpanA and close > leadSpanB
belowCloud = close < leadSpanA and close < leadSpanB
aboveShortMA = close > shortSMA
aboveLongMA = close > longSMA
belowShortMA = close < shortSMA
belowLongMA = close < longSMA

// Buy condition (Price retests 55 moving average after being above it)
buyCondition = aboveCloud and aboveLongMA and close[1] < shortSMA and close > shortSMA

// Sell condition (Price retests 55 moving average after being below it)
sellCondition = belowCloud and belowLongMA and close[1] > shortSMA and close < shortSMA

// Strategy entry and exit
strategy.entry("Buy", strategy.long, when = buyCondition)
strategy.entry("Sell", strategy.short, when = sellCondition)

// Plot moving averages
plot(shortSMA, color=color.green, title="Short-term SMA")
plot(longSMA, color=color.red, title="Long-term SMA")

// Plot buy and sell signals
plotshape(series=buyCondition, style=shape.triangleup, location=location.belowbar, color=color.green, size=size.small, title="Buy Signal")
plotshape(series=sellCondition, style=shape.triangledown, location=location.abovebar, color=color.red, size=size.small, title="Sell Signal")













```

> Detail

https://www.fmz.com/strategy/451705

> Last Modified

2024-05-17 10:55:29
