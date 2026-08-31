
> Name

Momentum-Bollinger-Bands-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/11ed2a26f0d44fcb324.png)


## Overview  

The Momentum Bollinger Bands Breakout Strategy is a quantitative trading strategy that combines the Bollinger Bands indicator and the Moving Average indicator to make breakout operations under certain momentum conditions. The strategy mainly uses the upper and lower rails of Bollinger Bands to define prices and adds additional price filtering with moving averages, issuing buy and sell signals under certain momentum conditions to make breakout operations on the upper and lower rails of Bollinger Bands.

## Strategy Principle   

The strategy is mainly based on the Bollinger Bands indicator and the MA moving average indicator. Bollinger Bands and moving averages belong to trend-following indicators. Bollinger Bands use the standard deviation concept to depict the high and low fluctuation range of prices. The moving average smooths the price data and judges the direction of the price trend.

The core logic of the strategy is:

1. Initialize Bollinger Bands parameters and calculate the middle rail, upper rail and lower rail.

2. Initialize the moving average parameters.   

3. Buy signal: when the price breaks through the lower rail of the Bollinger Bands from bottom to top and the moving average is below the lower rail, go long.

4. Sell signal: when the price breaks through the upper rail of the Bollinger Bands from top to bottom and the moving average is above the upper rail, go short.  

5. Exit signal: when the price re-enters the Bollinger Bands range, close the position.

The strategy combines the use of Bollinger Bands and moving average indicators to generate trading signals under certain momentum conditions, which is a typical trend-following strategy.

## Advantages

1. Using Bollinger Bands to clearly judge the price fluctuation range and the moving average to determine the price trend direction, the trading signals formed by the combination of dual indicator filtering have relatively high reliability.  

2. In addition to the price breaking through the Bollinger Bands boundary, it also requires the moving average to break through, which ensures sufficient momentum support to avoid false breakouts.

3. The strategy parameters are set reasonably and flexibly, which can adjust the parameters of Bollinger Bands and moving average cycles to adapt to different varieties and market conditions. 

4. The strategy idea is clear and easy to understand, easy to implement and verify.

## Risks  

1. The Bollinger Bands volatility indicator itself has potential lag in rapidly changing trends, which may generate invalid trading signals.   

2. When used as a filtering indicator, the setting of its parameters directly affects the frequency of the strategy. Improper settings may miss trading opportunities.  

3. Relying on both the Bollinger Bands indicator and the moving average indicator to form effective signals, once one of them fails, the entire strategy will be affected.

4. Breakout strategies are more aggressive. When prices pullback to test the Bollinger Bands boundary, they are prone to being trapped.


## Optimization Directions   

1. Optimize Bollinger Bands parameters to adapt to varieties with different cycles and volatility, such as modifying the period and standard deviation multiplier parameters of Bollinger Bands.  

2. Optimize the moving average cycle parameters to balance frequency and filtering effect.

3. Increase stop loss strategy to control maximum loss per trade.  

4. Combine with other indicators such as RSI and MACD to form composite indicators and enrich trading signals for the strategy.  

5. Combine machine learning models to assist in judging price trend direction and breakout success rate.

## Conclusion   

This strategy integrates the Bollinger Bands indicator with the moving average indicator to generate entry and exit signals after ensuring a certain price breakout momentum. The strategy idea is clear and easy to implement, and can effectively track trending markets. But at the same time, there are also certain pullback risks. It needs to be optimized for parameter settings and stop losses to adapt to market changes.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|===BB Values===|
|v_input_2_close|0|BB Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|20|BB Length|
|v_input_4|2|BB Multiplier|
|v_input_5|false| BB Offset|
|v_input_6|true|===MA Values===|
|v_input_7|14|Moving Average Period|
|v_input_8_close|0|Moving Average Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|true|===Strategy Conditions===|
|v_input_10|false|Exit at Basis Line?|
|v_input_11|false|Use Moving Average Filter?|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-28 00:00:00
end: 2024-01-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//
strategy("Advanced Bollinger Bands Strategy", overlay=true) 
//BB Values 
wall1= input(defval=true,title="===BB Values===",type=input.bool)
source = input(defval=close,title="BB Source",type=input.source)
length = input(20,title="BB Length", minval=1)
mult = input(2.0,title="BB Multiplier",minval=0.001, maxval=50)
basis = sma(source, length)
dev = mult * stdev(source, length)
upper = basis + dev
lower = basis - dev 
offset = input(0, " BB Offset", type = input.integer, minval = -500, maxval = 500)
plot(basis, "Basis", color=#872323, offset = offset)
p1 = plot(upper, "Upper", color=color.teal, offset = offset)
p2 = plot(lower, "Lower", color=color.teal, offset = offset)
fill(p1, p2, title = "Background", color=#198787, transp=95)
//Moving Average Values 
wall2= input(defval=true,title="===MA Values===",type=input.bool)
nfl= input(defval=14,title="Moving Average Period",type=input.integer,minval=1,maxval=100) 
source1= input(defval=close,title="Moving Average Source",type=input.source)
noisefilter= sma(source1,nfl)
plot(noisefilter,style=plot.style_line,linewidth=2,color=color.yellow,title=" Moving Average Filter")
bgcolor(noisefilter<lower?color.green:noisefilter>upper?color.red:na,title="Moving Average Filter")
//Strategy Conditions
wall3= input(defval=true,title="===Strategy Conditions===",type=input.bool)
bl= input(defval=false,title="Exit at Basis Line?",type=input.bool)
nflb= input(defval=false,title="Use Moving Average Filter?",type=input.bool)

//Strategy Condition
buyEntry = crossover(source, lower)
sellEntry = crossunder(source, upper) 

if (nflb?(crossover(source,lower) and noisefilter<lower): crossover(source, lower))
	strategy.entry("BBandLE", strategy.long, oca_name="BollingerBands",  comment="BBandLE")
    
else
	strategy.cancel(id="BBandLE")
if (nflb?(crossunder(source,lower) and noisefilter>upper): crossunder(source, lower))
	strategy.entry("BBandSE", strategy.short, oca_name="BollingerBands",  comment="BBandSE") 
else
	strategy.cancel(id="BBandSE")  
	
strategy.close_all(when=bl?crossover(source,basis) or crossunder(source,basis):crossover(source,upper) or crossunder(source,lower))

```

> Detail

https://www.fmz.com/strategy/437659

> Last Modified

2024-01-04 15:52:31
