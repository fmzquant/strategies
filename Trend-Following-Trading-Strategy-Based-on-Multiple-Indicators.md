
> Name

Trend-Following-Trading-Strategy-Based-on-Multiple-Indicators

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f7df4de0b770f757f0.png)

# Overview

The trend following trading strategy based on multiple indicators is a quantitative trading strategy that combines the MACD, Stochastic and SMA moving average. This strategy aims to identify the trend direction in the market and get in the market in a timely manner when a new trend begins. It then uses a combination of signals from multiple indicators to determine when to exit the market.

# Strategy Logic  

This strategy uses three technical indicators, MACD, Stochastic and SMA, to judge the strength and direction of the market trend. When the MACD line crosses above the signal line, the %K line of the Stochastic crosses above %D and is above the overbought level, and the fast SMA crosses above the slow SMA, a buy signal is triggered. When the opposite situations happen, a sell signal is identified.

By combining multiple indicators, fake signals can be filtered out and the real beginning and ending of a trend can be recognized. At the same time, different indicators can form verification and reduce the probability of erroneous trades.

# Advantage Analysis

The biggest advantage of this strategy is the combination of multiple indicators, which can effectively filter out market noise and lock in the real beginning and ending of trends. Compared with using a single MACD, Stochastic or SMA, the recognition effect is much better.

In addition, this strategy is flexible in parameter tuning and can be adjusted for different products and cycles, making it highly adaptable.

# Risk Analysis

The main risk of this strategy is that the combination of multiple indicators increases the trading frequency and brings the risk of overtrading. In addition, improper parameter settings can also introduce the risk of erroneous trades.

To reduce risks, trading frequency should be appropriately controlled, longer cycles selected, and parameters optimized. When necessary, stop loss can be considered to control single trade loss.

# Optimization Directions  

The strategy can be optimized in the following aspects:

1. Test the effects of different products and cycle parameters
2. Increase indicator weighting and filtering conditions to reduce erroneous signals  
3. Incorporate stop loss to control risks
4. Further optimize indicator parameters to improve profit factors

# Conclusion

The trend following trading strategy based on multiple indicators improves signal accuracy through composite validation of indicators, and can effectively identify the beginning and ending of trends. Parameter optimization and risk control are the keys to the success of this strategy. In general, this strategy has small drawdowns and large profit potential, making it a very practical quantitative trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|fastLength|
|v_input_2|17|slowlength|
|v_input_3|9|MACDLength|
|v_input_4|14|stochasticLength|
|v_input_5|80|stochasticOverBought|
|v_input_6|20|stochasticOverSold|
|v_input_7|10|emaSignal|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-05 00:00:00
end: 2024-01-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Rule Number 1 Signals", overlay=true)

//Calculate MACD crossing or not
fastLength = input(8)
slowlength = input(17)
MACDLength = input(9)

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
macdDelta = MACD - aMACD

//Calculate Stochastic Crossing

stochasticLength = input(14, minval=1)
stochasticOverBought = input(80)
stochasticOverSold = input(20)
emaSignal = input(10)
smoothK = 5
smoothD = 5

k = sma(stoch(close, high, low, stochasticLength), smoothK)
d = sma(k, smoothD)

//Crossovers and Over /Under
macdCrossOver = crossover(macdDelta, 0)
macdCrossUnder = crossunder(macdDelta, 0)
macdOver = macdDelta > 0
macdUnder = macdDelta < 0

stochasticCrossOver = crossover(k, d)
stochasticCrossUnder = crossunder(k, d)
stochasticOver = k > d
stochasticUnder = k < d

ema = ema(close, emaSignal)
smaCrossOver = crossover(close, ema)
smaCrossUnder = crossunder(close, ema)
smaOver = close > ema
smaUnder = close < ema

if ((macdCrossOver and stochasticOver and smaOver) or (macdOver and stochasticCrossOver and smaOver) or (macdOver and stochasticOver and smaCrossOver))
    strategy.entry("Rule 1 Buy", strategy.long, comment="Rule 1 Buy")
if ((macdCrossUnder and stochasticUnder and smaUnder) or (macdUnder and stochasticCrossUnder and smaUnder) or (macdUnder and stochasticUnder and smaCrossUnder))
    strategy.entry("Rule 1 Sell", strategy.short, comment="Rule 1 Sell")


//Plot the Oversold Study
bgcol = k < stochasticOverSold ? green : k > stochasticOverBought ? red : na
bgcolor(bgcol)
```

> Detail

https://www.fmz.com/strategy/438460

> Last Modified

2024-01-12 11:25:04
