
> Name

SMA-Crossover-Ichimoku-Market-Depth-Volume-Based-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d8c1c6ddb80ddf8fef.png)
 ## Overview  

This strategy is named "SMA Crossover Ichimoku Market Depth Volume Based Quantitative Trading Strategy". It mainly uses the golden cross and dead cross signals of the SMA lines, combined with Ichimoku market depth cloud chart indicators and trading volume indicators, to implement automatic trading of bitcoin in both directions.

## Principle   

The strategy is mainly based on the following principles:

1. Use SMA lines with different parameters to construct golden cross and dead cross trading signals. A buy signal is generated when the short term SMA crosses over the long term SMA, and a sell signal is generated when the short term SMA crosses below the long term SMA.  

2. Use the Ichimoku cloud chart indicator to determine market depth and trends. A buy signal is only generated when the closing price is higher than the leading span A and leading span B of the cloud chart, and a sell signal is only generated when the closing price is lower than span A and span B, which filters out most false signals.   

3. Use trading volume indicators to filter out false signals with low volume. Buy and sell signals are only generated when the trading volume is greater than the average volume over a certain period.  

4. Use the plotshape function to mark the positions of buy and sell signals on the chart.  

In this way, the strategy takes into account short-term and long-term trends, market depth indicators and trading volume indicators to optimize trading decisions.

## Advantage Analysis   

The advantages of this strategy include:  

1. Use SMA golden and dead cross to generate basic buy and sell signals, avoiding too much complexity.  
2. Use Ichimoku cloud chart to determine market depth and medium-long term trends, which can effectively filter out noise.
3. Combine trading volume indicators to avoid false breakouts with low volume.   
4. Large parameter tuning space for optimization across different markets.  
5. Clear logic and easy to understand and modify.  
6. Intuitively display buy and sell signals for ease of strategy testing and optimization.

## Risk Analysis   

The risks of this strategy also include:  

1. SMA lines can easily generate misleading signals and require filters.  
2. The effect of Ichimoku cloud chart judging market structure depends on parameter settings.  
3. Trading volume magnification effect may interfere with volume indicator judgement.   
4. Trending and oscillating markets need different parameter settings.  
5. There is some time lag.  

These risks can be reduced by optimizing parameters like SMA, Ichimoku, volume, and selecting suitable trading products.

## Optimization Directions   

The strategy can be optimized in several ways:  

1. Test more MA indicators like EMA, VIDYA, etc.  
2. Try different Ichimoku parameter settings.
3. Use momentum indicators for supplementary judgement. 
4. Add stop loss mechanisms.
5. Optimize parameters for different markets and products.  
6. Use machine learning to dynamically optimize parameters.  

## Conclusion   

This strategy integrates SMA crossover, market depth indicators and volume indicators to form a relatively stable and reliable quantitative trading strategy. It can be further optimized through parameter tuning, adding new technical indicators, etc. The backtest and live results are promising. In summary, this strategy provides a good learning case for beginners.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Short SMA Length|
|v_input_2|21|Long SMA Length|
|v_input_3|20|Volume Moving Average Length|
|v_input_4|9|Tenkan Length|
|v_input_5|26|Kijun Length|
|v_input_6|52|Senkou B Length|
|v_input_7|26|Displacement|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-16 00:00:00
end: 2024-01-23 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("SMA Crossover with Ichimoku & Volume", shorttitle="SCIV", overlay=true)

// Define the length of SMA
shortSmaLength = input(14, title="Short SMA Length")
longSmaLength = input(21, title="Long SMA Length")
volumeLength = input(20, title="Volume Moving Average Length")

// Calculate the SMA and Volume MA
shortSma = sma(close, shortSmaLength)
longSma = sma(close, longSmaLength)
volumeMa = sma(volume, volumeLength)

// Define the lengths of the Ichimoku Cloud components
tenkanLength = input(9, title="Tenkan Length")
kijunLength = input(26, title="Kijun Length")
senkouBLength = input(52, title="Senkou B Length")
displacement = input(26, title="Displacement")

// Calculate the Ichimoku Cloud components
tenkan = (highest(high, tenkanLength) + lowest(low, tenkanLength)) / 2
kijun = (highest(high, kijunLength) + lowest(low, kijunLength)) / 2
senkouA = (tenkan + kijun) / 2
senkouB = (highest(high, senkouBLength) + lowest(low, senkouBLength)) / 2

// Define the conditions for entry and exit with Ichimoku filter and Volume filter
buyEntry = crossover(shortSma, longSma) and close > senkouA[displacement] and close > senkouB[displacement] and volume > volumeMa
sellEntry = crossunder(shortSma, longSma) and close < senkouA[displacement] and close < senkouB[displacement] and volume > volumeMa

// Plot buy/sell conditions on the chart for visual inspection
plotshape(buyEntry, style=shape.labelup, location=location.belowbar, color=color.green, text="Buy", size=size.small)
plotshape(sellEntry, style=shape.labeldown, location=location.abovebar, color=color.red, text="Sell", size=size.small)

// Execute the strategy
if (buyEntry)
    strategy.entry("Buy", strategy.long)
if (sellEntry)
    strategy.entry("Sell", strategy.short)
```

> Detail

https://www.fmz.com/strategy/439856

> Last Modified

2024-01-24 14:21:42
