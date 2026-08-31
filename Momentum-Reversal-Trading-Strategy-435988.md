
> Name

Momentum-Reversal-Trading-Strategy-435988

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12043d88d08863d63b5.png)

### Overview

This is a reversal trading strategy based on the Momentum indicator. It uses the Ease of Movement (EOM) indicator to determine market trends and goes long or short when the indicator exceeds preset thresholds. It also provides reverse trading function that allows choosing between regular or reverse trading. 

### Strategy Logic

The Ease of Movement (EOM) indicator gauges the magnitude of price and volume changes. It returns both positive and negative values. A positive value means the price has gone up and a negative value means the price has gone down. The larger the absolute value, the bigger the price change and/or the smaller the trading volume.

The logic behind this strategy is:

1. Calculate current bar's EOM value 
2. Check if the EOM value exceeds long or short threshold 
    - If above long threshold (default 4000), go long
    - If below short threshold (default -4000), go short
3. Provide reverse trading function
    - By default, long = bullish, short = bearish 
    - When reverse is enabled, long = bearish, short = bullish

### Advantage Analysis  

The main advantages of this strategy:

1. Use EOM indicator to determine actual market trend based on price and volume changes
2. Customizable threshold for long/short
3. Provide reverse trading mode 
4. Intuitive long/short signal from bar color

### Risk Analysis

The main risks of this strategy:

1. EOM could have false breakout  
2. Improper threshold may lead to over/under trading
3. Need sufficient risk tolerance for reverse trading 

Solutions:

1. Use other indicators to avoid false signal
2. Optimize parameters and adjust threshold  
3. Evaluate your own risk tolerance level

### Optimization

This strategy can be optimized in the following aspects:

1. Add moving average to avoid false breakout
2. Add stop loss 
3. Optimize long/short threshold parameters  
4. Add more entry conditions to control trading frequency
5. Add risk management rules for reverse trading

By making the above optimizations, the strategy can become more robust, lower risks, and improve real trading performance.


### Conclusion

In conclusion, this strategy utilizes the Ease of Movement indicator to determine actual market trends, and profits from long/short trading. It is easy to use and considers both price change and volume change factors. When apply it in real trading, it is recommended to incorporate other technical indicators and optimize parameters properly for better performance.
> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4000|BuyZone|
|v_input_2|-4000|SellZone|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-19 00:00:00
end: 2023-12-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 19/06/2018
// This indicator gauges the magnitude of price and volume movement. 
// The indicator returns both positive and negative values where a 
// positive value means the market has moved up from yesterday's value 
// and a negative value means the market has moved down. A large positive 
// or large negative value indicates a large move in price and/or lighter 
// volume. A small positive or small negative value indicates a small move 
// in price and/or heavier volume.
// A positive or negative numeric value. A positive value means the market 
// has moved up from yesterday's value, whereas, a negative value means the 
// market has moved down. 
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Ease of Movement (EOM) Backtest", shorttitle="EOM")
BuyZone = input(4000, minval=1)
SellZone = input(-4000, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=blue, linestyle=line)
hline(BuyZone, color=green, linestyle=line)
hline(SellZone, color=red, linestyle=line)
xHigh = high
xLow = low
xVolume = volume
xHalfRange = (xHigh - xLow) * 0.5
xMidpointMove = mom(xHalfRange, 1)
xBoxRatio = iff((xHigh - xLow) != 0, xVolume / (xHigh - xLow), 0)
nRes = iff(xBoxRatio != 0, 1000000 * ((xMidpointMove - xMidpointMove[1]) / xBoxRatio), 0)
pos = iff(nRes > BuyZone, 1,
       iff(nRes < SellZone, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(nRes, color=red, title="EOM", style=histogram, linewidth=2)
```

> Detail

https://www.fmz.com/strategy/435988

> Last Modified

2023-12-20 16:09:50
