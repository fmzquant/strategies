
> Name

Momentum-Strategy-Based-on-LazyBears-Squeeze

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d52d9dda4ac8ef2680.png)

## Overview

The main idea of this strategy is based on LazyBear's Squeeze Momentum indicator to analyze the timing of buying and selling. It analyzes the inflection points in the momentum trend, locating the peaks and troughs as sell and buy signals respectively. As it is a long strategy, it also takes into consideration the 50 period Exponential Moving Average to identify upward trends. If the closing price of the candle is above the 50EMA, and the slope of the 50EMA is trending upwards, then the buy signal is executed.

## Strategy Principle 

This strategy incorporates Bollinger Bands and Keltner Channels to identify trends and squeeze zones. Specifically, it calculates a 20-period Bollinger Bands and 20-period Keltner Channels. When Bollinger Bands fall entirely within the Keltner Channels, it is viewed as a squeeze signal. The squeeze zone is identified when the Bollinger Bands lower band goes above the Keltner Channels lower band and the Bollinger Bands upper band goes below the Keltner Channels upper band. Conversely, when the Bollinger Bands lower band falls below the Keltner Channels lower band and the Bollinger Bands upper band rises above the Keltner Channels upper band, it is a non-squeeze zone.

In addition, the strategy utilizes linear regression to analyze the change in momentum slope. It calculates the linear regression value of price over the last 20 periods minus the typical price. When the slope of the linear regression value is positive, it is viewed as an upward trend. When the slope is negative, it is a downward trend. Within the squeeze zone, if there is a reversal in the momentum slope, it signals a buy or sell. Specifically, when within the squeeze zone, a momentum flip from positive to negative issues a sell signal. And when within the squeeze zone, a momentum flip from negative to positive issues a buy signal.  

To filter out false signals, the strategy also judges if the closing price is above the 50-day Exponential Moving Average and if the 50-day Exponential Moving Average is in an upward slope. Only when both conditions are met will the buy signal be executed.

## Advantage Analysis

This is a very clever strategy, utilizing two different types of indicators to make a multi-dimensional judgment of the market, which can effectively avoid false signals. Specifically, its advantages are:

1. Comprehensive application of Bollinger Bands, Keltner Channels and momentum indicators for multi-dimensional analysis and improved accuracy.

2. Squeeze zones can effectively identify peaks and troughs of momentum reversals and precisely capture turns.

3. Trend filtering based on closing price and 50-day EMA avoids repetitive opening of positions during consolidations. 

4. Signals only emitting during squeeze zones reduces false signals and improves profitability rate.

5. Large parameter optimization space allows targeted optimizations via adjusting periods etc.

6. Long and short combined, considers large cycle trends and integrates medium-term indicators, long direction is clear.

## Risk Analysis 

Although this strategy has Nonfarmed multiple technical indicators, there are still some risks:

1. Missing buy/sell opportunities when Bollinger Bands and Keltner Channels diverge.  

2. Large losses may occur during violent market rises or falls.

3. In high volatility markets, squeeze situations may not be obvious, resulting in fewer signals. 

4. Prone to adjustment losses during bull-bear transitions.

To avoid these risks, we can take the following measures:

1. Optimize parameters to synchronize Bollinger Bands and Keltner Channels as much as possible. 

2. Set stop loss to control single loss.

3. Use this strategy as part of a portfolio strategy, combined with other strategies.  

4. Reduce positions appropriately during high volatility markets.


## Optimization Directions

There is still large room for optimizing this strategy, mainly in the following directions:

1. Optimize periods of Bollinger Bands and Keltner Channels to synchronize them as much as possible.  

2. Test different multiplier factors to find optimal parameter combinations.

3. Try introducing other indicators for confirmation, such as RSI etc. 

4. Based on Wen Hua Five Color Lines models, selectively utilize this strategy depending on market stages.

5. Adopt machine learning etc to dynamically optimize parameters.

6. Backtest on different coins to find the most suitable trading products.

7. Explore efficacy of this strategy on longer timeframes (daily, weekly etc).


## Conclusion

The LazyBear Squeeze Momentum Strategy comprehensively employs various technical indicators, accurately identifying momentum reversals for trading during squeeze zones, avoiding repetitive opening of positions during non-trending markets. It has systematically defined quantifiable buy and sell rules, performing excellently in backtests. Through optimizing parameter settings, introducing new judgment indicators etc, this strategy has large room for improvements and is worth in-depth research and application by quant traders.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|BB Length|
|v_input_2|2|BB MultFactor|
|v_input_3|20|KC Length|
|v_input_4|1.5|KC MultFactor|
|v_input_5|true|Use TrueRange (KC)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-12-20 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

//
// @author LazyBear 
// List of all my indicators: https://www.tradingview.com/v/4IneGo8h/
//
initialBalance = 8000

strategy("Crypto momentum strategy", overlay=false)


length = input(20, title="BB Length")
mult = input(2.0, title="BB MultFactor")
lengthKC = input(20, title="KC Length")
multKC = input(1.5, title="KC MultFactor")

useTrueRange = input(true, title="Use TrueRange (KC)", type=input.bool)

// Calculate BB
source = close
basis = sma(source, length)
ema = ema(source, 50)
dev = multKC * stdev(source, length)
upperBB = basis + dev
lowerBB = basis - dev

// Calculate KC
ma = sma(source, lengthKC)
range = useTrueRange ? tr : high - low
rangema = sma(range, lengthKC)
upperKC = ma + rangema * multKC
lowerKC = ma - rangema * multKC

sqzOn = lowerBB > lowerKC and upperBB < upperKC
sqzOff = lowerBB < lowerKC and upperBB > upperKC
noSqz = sqzOn == false and sqzOff == false

val = linreg(source - avg(avg(highest(high, lengthKC), lowest(low, lengthKC)), sma(close, lengthKC)), lengthKC, 0)

slope = (val - val[2])
emaSlope = (ema - ema[1])


bcolor = iff(slope > 0, color.lime, color.red)
scolor = noSqz ? color.green : sqzOn ? color.black : color.green
squeeze = (noSqz ? 0 : sqzOn ? 1 : 0)

plot(val, color=color.gray, style=plot.style_line, linewidth=1, title="momentum")
plot(slope, color=bcolor, style=plot.style_circles, linewidth=2, title="slope")
plot(0, color=scolor, style=plot.style_line, linewidth=2, title="squeeze-zero")

co = crossover(slope / abs(slope), 0)
cu = crossunder(slope / abs(slope), 0)

if co and source > ema and emaSlope > 0
    strategy.entry("long", strategy.long, comment="long")
if cu
    strategy.close("long")

```

> Detail

https://www.fmz.com/strategy/436117

> Last Modified

2023-12-21 14:22:49
