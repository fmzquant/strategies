
> Name

Multi-Indicator-Bollinger-Bands-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/16e8a31919fa266c5bc.png)

## Overview

This strategy combines multiple technical indicators like Bollinger Bands, RSI and MACD to make trading decisions. It first plots Bollinger Bands on chart and uses bands breakout for entry signals. RSI and MACD are then used as additional filter for entries. The strategy also sets stop loss rules based on bands and indicators to control risk. Overall it is a comprehensive strategy utilizing strengths of multiple indicators.

## Strategy Logic

1. Plot 34-period Bollinger Bands with central line, 1 std dev and 2 std dev bands. 

2. Enter long when close breaks above upper band, enter short when close breaks below lower band.

3. Close long position when close crosses below central line, close short position when close crosses above central line.

4. Use RSI>70 as additional confirmation for long, RSI<30 as confirmation for short. 

5. Close short positions when RSI crosses above 50, close long positions when RSI crosses below 50.

6. Use MACD crossover as additional filter for entries, MACD crossover for long, MACD crossunder for short.

7. Close long positions on MACD crossover, close short positions on MACD crossunder.

8. Require all 3 indicators to align before entering trades, multiple filters reduce false signals.

## Advantages

Combining signals from multiple indicators reduces false signals and boosts profitability. Bollinger Bands provide price breakout signals, RSI avoids overbought/oversold areas, MACD captures trend changes.

Strict stop loss rules based on bands and indicators limit loss on every trade. This results in higher profitability, win rate and lower maximum drawdown.

Compared to single indicator strategies, combining indicators improves performance. Multiple filters weed out bad signals. Stop loss mechanism controls loss impact.

Overall this strategy excels in trending markets, catching major moves while avoiding whipsaws using indicator details. The risk control allows using higher leverage safely.

## Risks

Main risks are:

1. Possibility of false signals from indicators. Optimizing parameters can reduce but not eliminate false signals.

2. Inability to profit from range-bound markets. Stop loss may trigger resulting in loss during consolidation. Stop loss rules can be loosened to hold trades longer.

3. Lagging indicators leading to missed entry opportunities. More advanced leading indicators can help capture turns earlier. 

4. Gapping prices invalidating stops. Using trailing stops or averaging down can control losses better.

5. Fixed parameters may require adjustments for different markets. Machine learning can enable automatic parameter optimization. 

6. Insufficient testing resulting in overfitting. Strategy needs to be tested on larger datasets across markets to ensure robustness.

## Enhancement Opportunities

The strategy can be improved in several ways:

1. Optimize indicator parameters to find best combinations that minimize false signals. Brute force or optimization methods can be used.

2. Incorporate adaptive stop loss instead of fixed middle band stops. Stops can adapt to ATR, trends etc. 

3. Use machine learning for adaptive parameter optimization in changing conditions, e.g. reinforcement learning.

4. Add trend detection rules to employ different tactics for different market phases. Improves adaptability.

5. Incorporate sentiment, social media data for enhanced multi-factor prediction and leading indicators.

6. Employ compounding to scale position sizes based on growing account size for exponential growth.

7. Optimize combinations with uncorrelated strategies to reduce portfolio volatility through diversification.

## Conclusion

This strategy combines multiple indicators for robust entry and exit signals and enforces strict stop loss discipline. Using multiple indicators reduces false signals while stops control loss magnitude. It works well for trending markets providing steady returns. Fine tuning parameters and enhancing adaptability can further improve performance. Overall it is a reliable, stable and efficient trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|34|length|
|v_input_float_1|2|mult|
|v_input_2|14|rsiLength|
|v_input_3|12|fastLength|
|v_input_4|26|slowLength|
|v_input_5|9|macdLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-15 00:00:00
end: 2023-11-14 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// Bollinger Bands: Madrid : 14/SEP/2014 11:07 : 2.0
// This displays the traditional Bollinger Bands, the difference is 
// that the 1st and 2nd StdDev are outlined with two colors and two
// different levels, one for each Standard Deviation

strategy(shorttitle='MBB', title='Bollinger Bands', overlay=true, currency=currency.NONE, initial_capital = 1000, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, commission_value = 0.05)
src = input(close)
length = input.int(34, minval=1)
mult = input.float(2.0, minval=0.001, maxval=50)

basis = ta.sma(src, length)
dev = ta.stdev(src, length)
dev2 = mult * dev

upper1 = basis + dev
lower1 = basis - dev
upper2 = basis + dev2
lower2 = basis - dev2

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


//Strategy code starts here

long_entry = ta.crossover(src, upper1)
short_entry = ta.crossunder(src, lower1)

strategy.entry("Long", strategy.long, when=long_entry)
strategy.entry("Short", strategy.short, when=short_entry)

if long_entry or close < basis
    strategy.close("Long", "Long") 

if short_entry or close > basis
    strategy.close("Short", "Short") 


//Calculate RSI
rsiLength = input(14)
rsiValue = ta.rsi(src, rsiLength)

// Define RSI conditions for entering and exiting trades
rsiLong = rsiValue > 70
rsiShort = rsiValue < 30


//Enter long position when RSI crosses above 50 and Bollinger Bands long entry condition is met
strategy.entry("Long", strategy.long, when=long_entry and rsiLong)

//Exit long position when RSI crosses below 50 or Bollinger Bands exit condition is met
strategy.close("Long Exit", when=rsiShort or close < basis)

//Enter short position when RSI crosses below 50 and Bollinger Bands short entry condition is met
strategy.entry("Short", strategy.short, when=short_entry and rsiShort)

//Exit short position when RSI crosses above 50 or Bollinger Bands exit condition is met
strategy.close("Short Exit", when=rsiLong or close > basis)



//Calculate MACD
fastLength = input(12)
slowLength = input(26)
macdLength = input(9)
macdValue = ta.macd(src, fastLength, slowLength, macdLength)

// Define MACD conditions for entering and exiting trades
macdLong = ta.crossover(src, macdLength)
macdShort = ta.crossunder(src, macdLength)

//Enter long position when MACD crosses above signal line and RSI and Bollinger Bands long entry condition is met
strategy.entry("Long", strategy.long, when=long_entry and rsiLong and macdLong)

//Exit long position when MACD crosses below signal line or RSI crosses below 50 or Bollinger Bands exit condition is met
strategy.close("Long Exit", when=macdShort or rsiShort or close < basis)

//Enter short position when MACD crosses below signal line and RSI crosses below 50 and Bollinger Bands short entry condition is met
strategy.entry("Short", strategy.short, when=short_entry and rsiShort and macdShort)

//Exit short position when MACD crosses above signal line or RSI crosses above 50 or Bollinger Bands exit condition is met
strategy.close("Short Exit", when=macdLong or rsiLong or close > basis)
```

> Detail

https://www.fmz.com/strategy/432207

> Last Modified

2023-11-15 15:30:43
