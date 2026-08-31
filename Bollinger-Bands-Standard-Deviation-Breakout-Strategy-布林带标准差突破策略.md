
> Name

Bollinger-Bands-Standard-Deviation-Breakout-Strategy-布林带标准差突破策略

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17e887c1d237c9befce.png)


#### Overview
This strategy is based on the Bollinger Bands indicator. It enters a long position when the closing price breaks above the upper band and enters a short position when the closing price breaks below the lower band. The exit condition for the long position is when the price falls below the middle band, and the exit condition for the short position is when the price breaks above the middle band. The strategy uses the position of the price relative to the upper and lower bands of the Bollinger Bands to determine the trend direction and the timing of entries and exits.

#### Strategy Principle
1. Calculate the upper, middle, and lower bands of the Bollinger Bands. The middle band is the simple moving average of the closing price, and the upper and lower bands are the middle band plus or minus a certain multiple of the standard deviation.
2. When the closing price breaks above the upper band, enter a long position.
3. When the closing price breaks below the lower band, enter a short position.
4. When holding a long position, if the closing price falls below the middle band, close the long position.
5. When holding a short position, if the closing price breaks above the middle band, close the short position.

#### Strategy Advantages
1. The Bollinger Bands can effectively reflect the price volatility range and trend direction. Using the position of the price relative to the Bollinger Bands for entries and exits can capture trending markets.
2. The distance between the upper and lower bands and the middle band is a certain standard deviation, which can adapt to changes in price volatility. The larger the standard deviation, the farther the upper and lower bands are from the middle band.
3. The exit condition uses the middle band instead of a reverse break of the upper or lower bands, allowing for early stop-loss and profit-taking.
4. The parameters are adjustable, allowing for optimization of the Bollinger Band period, standard deviation multiplier, and other parameters to adapt to different symbols and timeframes.

#### Strategy Risks
1. In a ranging market, prices may oscillate repeatedly near the upper and lower bands, potentially causing frequent entries and exits, leading to increased transaction costs.
2. When the price accelerates in a trending movement, the entry point is relatively lagging, and the trend-following ability is weaker.
3. At the beginning of a trend reversal, a retracement touching the middle band will trigger an exit, missing out on subsequent price movements if the trend continues to develop.

#### Strategy Optimization Directions
1. ATR or other stop-loss indicators can be incorporated to control drawdowns.
2. Dynamic position sizing for long and short positions can be used to flexibly allocate positions based on trend strength.
3. More filtering conditions, such as volume and price indicators, can be added to the entry conditions to improve the reliability of entry signals.

#### Summary
This strategy is a classic trend-following strategy that captures trending markets using Bollinger Bands. The strategy logic is clear, and the advantages are obvious, but it also has certain risks. By optimizing stop-loss, profit-taking, position management, and entry filters, the strategy performance can be improved, and adaptability can be enhanced. However, every strategy has its limitations and needs to be flexibly applied in conjunction with actual market conditions.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|20|Length|
|v_input_float_1|2|Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-03-01 00:00:00
end: 2024-03-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// Bollinger Bands: Madrid : 14/SEP/2014 11:07 : 2.0
// This displays the traditional Bollinger Bands, the difference is 
// that the 1st and 2nd StdDev are outlined with two colors and two
// different levels, one for each Standard Deviation

strategy(shorttitle='MBB', title='Bollinger Bands', overlay=true)
src = input(close)
length = input.int(20, minval=1, title = "Length")
mult = input.float(2.0, minval=0.001, maxval=50, title = "Multiplier")

basis = ta.sma(src, length)
dev = ta.stdev(src, length)
dev2 = mult * dev

upper1 = basis + dev
lower1 = basis - dev
upper2 = basis + dev2
lower2 = basis - dev2

// Strategy
long_condition = ta.crossover(close, upper1)
short_condition = ta.crossunder(close, lower1)

if (long_condition)
    strategy.entry("Long", strategy.long)
if (short_condition)
    strategy.entry("Short", strategy.short)

// Exit conditions
exit_long_condition = ta.crossunder(close, basis)
exit_short_condition = ta.crossover(close, basis)

if (exit_long_condition)
    strategy.close("Long")
if (exit_short_condition)
    strategy.close("Short")


colorBasis = src >= basis ? color.blue : color.orange

pBasis = plot(basis, linewidth=2, color=colorBasis)
pUpper1 = plot(upper1, color=color.new(color.blue, 0), style=plot.style_circles)
pUpper2 = plot(upper2, color=color.new(color.blue, 0))
pLower1 = plot(lower1, color=color.new(color.orange, 0), style=plot.style_circles)
pLower2 = plot(lower2, color=color.new(color.orange, 0))

fill(pBasis, pUpper2, color=color.new(color.blue, 80))
fill(pUpper1, pUpper2, color=color.new(color.blue, 80))
fill(pBasis, pLower2, color=color.new(color.orange, 80))
fill(pLower1, pLower2, color=color.new(color.orange, 80))
```

> Detail

https://www.fmz.com/strategy/449961

> Last Modified

2024-04-30 16:51:34
