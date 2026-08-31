
> Name

基于双EMA价格摆动策略The-Dual-EMA-Price-Swing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/913c26eb71715e742d.png)

## Overview

The Dual EMA Price Swing strategy judges market sentiment and momentum by calculating the difference between two EMAs of different periods. An up-crossing of the difference value above 0 is a bullish signal. A down-crossing below 0 is a bearish signal.

The strategy is simple and easy to use, judging market momentum and direction through EMA difference. However, it also has some laggingness and cannot timely capture turning points.  

## Principle  

The core indicator of the Dual EMA Price Swing strategy is APO, namely Absolute Price Oscillator, representing the difference between two EMAs. Its formula is:  

```
APO = EMA(short period) − EMA(long period)
```

Specifically, the APO in this strategy is calculated as:

```
xShortEMA = ema(close price, LengthShortEMA)  

xLongEMA = ema(close price, LengthLongEMA)

xAPO = xShortEMA − xLongEMA
```

Where LengthShortEMA and LengthLongEMA represent the cycle lengths of the short-term and long-term EMAs respectively.

Several key judgment rules of APO:

1. An up-crossing of APO above 0 is a bullish signal
2. A down-crossing of APO below 0 is a bearish signal
3. A positive APO indicates a current bull state 
4. A negative APO indicates a current bear state

Determine market sentiment and entry timing based on the real-time value of APO.

## Advantage Analysis 

The Dual EMA Price Swing Strategy has the following main advantages:

1. Using exponential moving average can effectively smooth price data and reduce noise impact
2. The APO indicator combines two EMAs to judge both price trend and market momentum
3. The strategy signal is simple and clear, easy to determine and implement  
4. Customizable EMA cycles adapt to different varieties and trading styles
5. Reversible signals apply to reverse and short trading

## Risk Analysis

The Dual EMA Price Swing Strategy also has some risks, mainly in:

1. EMA itself has laggingness and cannot capture price turning points in time
2. Default parameters may not apply to all varieties, parameters need optimization
3. Frequent signals tend to produce false signals  
4. Unable to determine stop loss and take profit after opening position
5. There is certain lag, possibly missing the best entry timing

We can cope with and reduce these risks by applying reasonable stop loss to reduce single loss; optimizing parameters to adapt cycles; combining other indicators to filter signals and improve strategy stability.

## Optimization Directions

The Dual EMA Price Swing Strategy can be optimized in the following aspects:  

1. Optimize EMA cycle parameters, test combinations of length 5 to 60 to find optimum
2. Add other indicators like MA, KDJ, MACD to set filter conditions and avoid false signals
3. Use Bollinger Bands, KD to determine reasonable stop loss and take profit  
4. Combine trend index to judge price trend, avoid trading against trend
5. Add trading volume indicator to ensure signals with volume support 
6. Set re-entry conditions to reduce transactions and trading frequency

## Conclusion

In summary, the Dual EMA Price Swing Strategy judges market sentiment by calculating the APO difference between two EMAs. The strategy signal is simple and practical, but also has some drawbacks. We can optimize it through parameter tuning, adding filters, setting stops and more. Easy to use for beginners, also with great potential for expansions. Suitable for quant trading learners to study and apply.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|LengthShortEMA|
|v_input_2|20|LengthLongEMA|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-19 00:00:00
end: 2024-02-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 30/05/2017
// The Absolute Price Oscillator displays the difference between two exponential 
// moving averages of a security's price and is expressed as an absolute value.
// How this indicator works
//    APO crossing above zero is considered bullish, while crossing below zero is bearish.
//    A positive indicator value indicates an upward movement, while negative readings 
//      signal a downward trend.
//    Divergences form when a new high or low in price is not confirmed by the Absolute Price 
//      Oscillator (APO). A bullish divergence forms when price make a lower low, but the APO 
//      forms a higher low. This indicates less downward momentum that could foreshadow a bullish 
//      reversal. A bearish divergence forms when price makes a higher high, but the APO forms a 
//      lower high. This shows less upward momentum that could foreshadow a bearish reversal.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Absolute Price Oscillator (APO) Backtest", shorttitle="APO")
LengthShortEMA = input(10, minval=1)
LengthLongEMA = input(20, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=gray, linestyle=line)
xPrice = close
xShortEMA = ema(xPrice, LengthShortEMA)
xLongEMA = ema(xPrice, LengthLongEMA)
xAPO = xShortEMA - xLongEMA
pos = iff(xAPO > 0, 1,
       iff(xAPO < 0, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(xAPO, color=blue, title="APO")
```

> Detail

https://www.fmz.com/strategy/442834

> Last Modified

2024-02-26 13:52:41
