
> Name

BMSB-布林麦克超级趋势交易策略-BMSB-Bollinger-SuperTrend-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8c614a44596f881703.png)

#### Overview
This strategy is a trend-following trading strategy based on Bollinger Bands and moving averages. By comparing the relationship between the simple moving average (SMA) and the exponential moving average (EMA), it determines the current trend direction. When the closing price crosses above the larger moving average, a buy signal is generated; when the closing price crosses below the smaller moving average, a sell signal is generated. The strategy attempts to capture the main trend of the market and close positions in time when the trend reverses, in order to profit from trending markets.

#### Strategy Principles
1. Calculate the 20-day simple moving average (SMA) and the 21-day exponential moving average (EMA).
2. Compare the size of SMA and EMA, define the larger one as bmsbmayor and the smaller one as bmsbmenor, representing the reference lines for bullish and bearish trends respectively.
3. When the closing price crosses above bmsbmayor, a buy signal is generated; if the current position is short, close the short position first, then open a long position.
4. When the closing price crosses below bmsbmenor, a sell signal is generated; if the current position is long, close the long position first, then open a short position.
5. Plot bmsbmayor and bmsbmenor on the chart, using green and red colors respectively, to visually display the bull and bear trend reference lines.

#### Strategy Advantages
1. Simple and easy to understand: The strategy logic is clear, using the most common moving average indicators, which are easy to understand and implement.
2. Trend tracking: By comparing the size of two moving averages, it can effectively determine the current trend direction and trade in line with the main trend.
3. Adaptability: Since exponential moving average is used, it reacts more sensitively to price changes and can better adapt to changes in market rhythm.
4. Timely stop-loss: When the trend reverses, the original position is closed in time, avoiding holding losing positions for too long and reducing potential losses.
5. Visually friendly: By plotting bull and bear trend reference lines on the chart, trend judgment becomes more intuitive, facilitating trading decisions.

#### Strategy Risks
1. Parameter optimization: The selection of moving average periods has a significant impact on strategy performance, and different markets and instruments may require different parameter settings, requiring parameter optimization and backtesting.
2. Choppy market: In a choppy market, the strategy may generate more false signals, leading to frequent trading and capital attrition.
3. Trend delay: Moving averages are lagging indicators, and there may be signal delays at the beginning and end of trends, missing the best entry and exit points.
4. Black swan events: The strategy is mainly based on historical price data and may not be able to respond in a timely manner to sudden major events and extreme market conditions.

#### Strategy Optimization Directions
1. Introduce more indicators: On the basis of moving averages, other technical indicators such as RSI and MACD can be introduced to comprehensively consider the signals of multiple indicators and improve the accuracy of trend judgment.
2. Dynamic parameter adjustment: According to market volatility and market characteristics, dynamically adjust the period of moving averages and other parameters to make the strategy more adaptable to market changes.
3. Add stop-loss and take-profit: Set reasonable stop-loss and take-profit levels to control the risk exposure of a single transaction and improve the risk-reward ratio.
4. Position management: According to the trend strength and signal credibility, dynamically adjust the position size, increasing the position when the trend strength is high and reducing the position when the trend is unclear.
5. Combine with fundamental analysis: Combine technical analysis with fundamental analysis, and on the basis of trend judgment, consider macro-economic, industry development and other factors to make more comprehensive trading decisions.

#### Summary
The BMSB Bollinger SuperTrend Trading Strategy is a simple and practical trend-following strategy that determines bull and bear trends by comparing the size of two moving averages, and can achieve good results in trending markets. However, the strategy also has some limitations, such as poor performance in choppy markets and signal delays. Therefore, in practical applications, we can consider introducing more indicators, optimizing parameters, strengthening risk management and other aspects to improve the strategy's stability and profitability. At the same time, we should also pay attention to combining fundamental analysis to make a comprehensive judgment of the market and make more reasonable trading decisions.



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-04-13 00:00:00
end: 2024-05-13 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("BMSB Strategy Mejora", overlay=true)

// Indicators
src = close
sma = ta.sma(src, 20)
ema = ta.ema(src, 21)

// Bull Super Market as var
bmsbmayor = sma > ema ? sma : ema
bmsbmenor = sma > ema ? ema : sma

// Buy and Sell conditions
buySignal = ta.crossover(close, bmsbmayor)
sellSignal = ta.crossunder(close, bmsbmenor)

// Buy and Sell orders
if (buySignal)
    if (strategy.position_size < 0)
        strategy.close("Sell")
    strategy.entry("Buy", strategy.long)

if (sellSignal)
    if (strategy.position_size > 0)
        strategy.close("Buy")
    strategy.entry("Sell", strategy.short)

// Plot
plot(bmsbmayor, color=color.green)
plot(bmsbmenor, color=color.red)



```

> Detail

https://www.fmz.com/strategy/451393

> Last Modified

2024-05-14 15:52:32
