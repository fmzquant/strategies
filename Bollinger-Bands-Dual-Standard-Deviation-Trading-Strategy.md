
> Name

Bollinger-Bands-Dual-Standard-Deviation-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/129c302fdd0715cc33e.png)
 ## Overview

This strategy is a trading strategy designed based on the Bollinger Bands dual standard deviation model. It uses the upper and lower rails of Bollinger Bands and one and two standard deviations as trading signals. It goes long when the price breaks through the upper rail and goes short when the price breaks through the lower rail. The strategy also uses one and two standard deviations as stop loss lines.

## Strategy Logic  

The strategy first calculates the middle rail, upper rail and lower rail of the Bollinger Bands. The middle rail is the SMA of CLOSE, the upper rail is middle rail + 2*standard deviation, and the lower rail is middle rail - 2*standard deviation. When the price breaks through the upper rail, a buy signal is generated to go long. When the price breaks through the lower rail, a sell signal is generated to go short. In addition, the strategy also plots the lines of middle rail + 1 standard deviation and middle rail - 1 standard deviation. They are used as stop loss lines. The specific logic is:

1. Calculate the SMA of CLOSE as the middle rail of Bollinger Bands  
2. Calculate the standard deviation STD of CLOSE, and calculate 2*STD
3. Middle rail + 2*STD is the upper rail of Bollinger Bands, middle rail - 2*STD is the lower rail
4. Go long when price breaks through the upper rail  
5. Go short when price breaks through the lower rail
6. Middle rail + 1*STD serves as the stop loss line. If the stop loss line is broken, close the position.

## Advantages of the Strategy  

1. The dual standard deviation design makes the breakout judgment more strict to avoid wrong signals  
2. The dual stop loss lines design maximizes risk control
3. Large parameter optimization space, the period of middle rail and the multiple of standard deviation can be adjusted  
4. The drawdown can be controlled by adjusting the stop loss level

## Risks of the Strategy

1. Bollinger Bands strategies are prone to false breakouts, leading to inaccurate trading signals  
2. The dual standard deviation and dual stop loss lines setting may be too strict, missing opportunities by filtering out too many signals
3. Improper parameter settings may increase the risk of the strategy
4. The drawdown control is not perfect enough to effectively control losses in extreme market conditions

## Optimization Directions 

1. Consider combining other indicators to filter Bollinger Bands trading signals to avoid false breakouts
2. Test different parameter settings and optimize parameters for better return/drawdown ratio
3. Design dynamic stop loss mechanisms such as trailing stop loss or equity percentage stop loss
4. Combine machine learning algorithms to automatically optimize parameters

## Conclusion

In general, this strategy is a typical Bollinger Bands breakout strategy. It uses dual standard deviations to increase the strictness of signal judgment and adopts dual stop loss lines to actively control risks. The strategy has some parameter optimization space. By adjusting parameters like middle rail period and standard deviation multiplier, better strategy performance can be obtained. At the same time, the strategy also faces the common problem of false breakouts in Bollinger Bands strategies. In addition, there is room for further improvement and optimization in the stop loss mechanism.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|src: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|34|length|
|v_input_float_1|2|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-11 00:00:00
end: 2023-12-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// Bollinger Bands: Madrid : 14/SEP/2014 11:07 : 2.0
// This displays the traditional Bollinger Bands, the difference is 
// that the 1st and 2nd StdDev are outlined with two colors and two
// different levels, one for each Standard Deviation

strategy(shorttitle='MBB', title='Bollinger Bands', overlay=true)
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

// Entry conditions
longCondition = ta.crossover(close, upper1)
shortCondition = ta.crossunder(close, lower1)

// Entry and exit strategy
strategy.entry("Buy", strategy.long, when=longCondition)
strategy.entry("Sell", strategy.short, when=shortCondition)

strategy.close("Buy", when=shortCondition)
strategy.close("Sell", when=longCondition)
```

> Detail

https://www.fmz.com/strategy/435767

> Last Modified

2023-12-18 17:23:42
