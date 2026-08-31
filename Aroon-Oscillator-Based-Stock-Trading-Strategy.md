
> Name

Aroon-Oscillator-Based-Stock-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16d6267c0a0ae3086e3.png)
 ## Strategy Overview

This strategy is named "Saucius Aroon Oscillator Strategy". It suits stocks, indexes and commodities with high volatility but unclear trend, where the prospects of future prices are uncertain. The strategy identifies price trends using the Aroon Oscillator indicator and sets entry and exit conditions based on multiple parameters to implement automated trading of these risky assets.

## Strategy Logic  

The idea behind this strategy originated from Aroon lines creator Tushar Chande. Chande suggested that uptrends and downtrends can be identified when the Aroon Oscillator is above or below 50. This helps to mitigate the shortcomings of simple Aroon lines and crosses in non-trending periods.

Specifically, the strategy first calculates the 19-period Aroon Up, Aroon Down lines and Aroon Oscillator. The oscillator is calculated by subtracting the Down line from the Up line. The middle line is then set at -25, upper rail at 75 and lower rail at -85. When the oscillator goes above the middle line, long position is opened. When it goes below, short position is opened. Exit conditions are closing long when the oscillator goes above the upper rail and closing short when it goes below the lower rail.  

Thus, the middle line is used to determine the trend direction to entry, the upper and lower rails are used to exit when trend reversal, realizing automated trading based on the Aroon Oscillator indicator.

## Advantages

Compared with traditional trend following strategies, this strategy has the following advantages:

1. Suits assets with high volatility and unclear trends, works better than simple trend strategies  
2. Identifying trends via Aroon Oscillator is more reliable
3. Multiple parameter settings make the trading conditions rigorous, avoiding wrong trades  
4. Fast profit taking and effective loss risk control  

In summary, by combining the strengths of the Aroon Oscillator indicator, the strategy achieves automated trading of specific assets with good win rate and profitability.

## Risks  

There are also some risks with this strategy:  

1. Parameter tuning is needed for different assets, otherwise it may affect performance  
2. High trading frequency may increase transaction and slippage costs
3. Relying on technical indicators, losses may occur when indicators fail  

These risks can be reduced and improved by adjusting parameters and optimizing the code. In addition, proper position sizing and money management can also effectively control potential risks.  

## Optimization

To further improve strategy performance, optimizations can be made in the following aspects:  

1. Adjust parameters and test under different assets and market environments  
2. Add combinations of other technical indicators for stronger trading signals 
3. Add stop loss strategies to effectively limit per trade loss size  
4. Incorporate volume indicators to avoid false breakouts  
5. Optimize entry conditions to reduce unnecessary trades  

Through comprehensive testing and optimization, the stability, win rate and profitability of the strategy can be greatly improved.

## Conclusion  

This strategy creatively achieved automated trading of assets with high volatility and unclear trends based on the Aroon Oscillator indicator. Compared with traditional trend strategies, it performs better on these types of assets, and its rigorous trading conditions are also achieved through parameter settings. The advantages of the strategy are remarkable, but there is still room for improvement. Further enhancement can be obtained through targeted optimizations. The strategy provides a reference for quantitative trading practices.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|19|length|
|v_input_2|-25|level_middle|
|v_input_3|75|levelhigh|
|v_input_4|-85|levellow|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-15 00:00:00
end: 2024-01-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// by Saucius Finance https://saucius-finance.blogspot.com/
// copyrights reserved :)
// This strategy derives form the consideration of the author, Tushar Chande, that, in "more patterns" paragraph, 
// long and short trends are identified by oscillator < or > line 50. 
// This helps because simple Aroon and Aroon crosses suffer in not trending periods.
// original article avabile in:" Stocks & Commodities, V. 13:9 (369-374) : A Time Price Oscillator by Tushar Chande, Ph.D.""
strategy("Aroon Oscillator strategy by Saucius", overlay=false)
//building aroon lines, Embodying both Aroon line (Up and Down) and Aroon Oscillator
length = input(19, minval=1)
level_middle = input(-25, minval=-90, maxval=90, step = 5)
levelhigh = input(75,  minval=-100, maxval=100, step = 5)
levellow = input(-85,  minval=-100, maxval=100, step = 5)
upper = 100 * (highestbars(high, length+1) + length)/length
lower = 100 * (lowestbars(low, length+1) + length)/length
oscillator = upper - lower 
plot(upper, title="Aroon Up", color=blue)
plot(lower, title="Aroon Down", color=red)
plot(oscillator, title="Aroon Oscillator", color = yellow)
hline(level_middle, title="middle line", color=gray,  linewidth=2)
hline(levelhigh, title ="upper border", color=gray,  linewidth=1)
hline(levellow, title ="lower border", color=gray, linewidth=1)

// Entry //
entryl = oscillator[1] < level_middle[1] and oscillator > level_middle
entrys = oscillator[1] > level_middle[1] and oscillator < level_middle
strategy.entry("Long", true, when = entryl)
strategy.entry("Short", false, when = crossunder (oscillator, level_middle))


// === EXIT===
exitL1 = oscillator[1] > levelhigh[1] and oscillator < levelhigh
exitS1 =  oscillator[1] < levellow[1] and oscillator > levellow
strategy.close("Long", when=entrys)
strategy.close("Short", when=entryl)
strategy.close("Long", when= exitL1)
strategy.close("Short", when= exitS1)

```

> Detail

https://www.fmz.com/strategy/438795

> Last Modified

2024-01-15 14:08:33
