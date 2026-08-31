
> Name

Momentum-Stacking-Strategy-of-Different-Timeframes

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d5016c45234b78bfac.png)



## Overview

The Momentum Stacking Strategy mainly calculates the Rate of Change (ROC) over different periods, weights and stacks them to form a comprehensive momentum indicator for judging the trend direction. This strategy stacks short-term, intermediate-term and long-term momentum indicators to balance short-term and long-term trends and avoid false signals.

## Strategy Logic

The strategy first calculates the ROC indicators over 10-day, 15-day, 20-day periods, etc. Then smooths the ROC and stacks them in a 1-4 weighted ratio to get the formula:

```
roc1 = (sma(roc(close,10),10)*1)
roc2 = (sma(roc(close,15),10)*2)  
...
osc = roc1+roc2+roc3+roc4+...
```

Where roc1-roc12 represent ROC calculations over different periods from 10-day to 530-day. 

It then smoothes osc by a SMA of a (default 10) days to get oscsmt.

Compares osc with oscsmt, when osc crosses over oscsmt as the bullish signal and enters long. When osc crosses below oscsmt as the bearish signal and enters short.

Finally, it can choose to reverse the trading direction.

## Advantages

1. Stacking short-term and long-term momentum indicators can capture both short-term and long-term trends, avoiding false signals.

2. Comparing osc and oscsmt can reduce unnecessary trading in sideways markets. 

3. Customizable parameters to adjust ROC periods and SMA smoothness.

4. Reversible trading direction caters to different trading styles. 

5. Visual indicators make buying and selling points intuitive.

## Risks and Optimizations

1. ROC is very sensitive to sudden price abnormalities, which may generate wrong signals. Can increase the SMA smoothness to lower ROC sensitivity.

2. Default parameters may not suit all trading instruments. Need optimization to find the best parameter combination based on different characteristics.

3. Trades only based on osc and oscsmt crossover. Can add other indicators to filter signals and reduce errors.

4. More suitable for medium-long term trading. May need to adjust ROC periods to optimize usage scenario. 

## Conclusion

The Momentum Stacking Strategy calculates multiple ROC periods to get a comprehensive momentum indicator, capturing both short-term and long-term trends, avoiding false signals. Compared to a single ROC, it greatly improves signal quality and reliability. But it still carries some monitoring risks. Parameters need optimization and combining other indicators to maximize usefulness.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Smooth|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-25 00:00:00
end: 2023-10-25 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter 08/08/2017
// Pring's Special K is a cyclical indicator created by Martin Pring. 
// His method combines short-term, intermediate and long-term velocity 
// into one complete series. Useful tool for Long Term Investors
// Modified for any source.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Martin Pring's Special K Backtest", shorttitle="UCS_Pring_sK")
a = input(10, title = "Smooth" )
sources = input(title="Source",  defval=close)
reverse = input(false, title="Trade reverse")
roc1 = (sma(roc(sources,10),10)*1)
roc2 = (sma(roc(sources,15),10)*2)
roc3 = (sma(roc(sources,20),10)*3)
roc4 = (sma(roc(sources,30),15)*4)
roc5 = (sma(roc(sources,40),50)*1)
roc6 = (sma(roc(sources,65),65)*2)
roc7 = (sma(roc(sources,75),75)*3)
roc8 = (sma(roc(sources,100),100)*4)
roc9 = (sma(roc(sources,195),130)*1)
roc10 = (sma(roc(sources,265),130)*2)
roc11 = (sma(roc(sources,390),130)*3)
roc12 = (sma(roc(sources,530),195)*4)
osc = roc1+roc2+roc3+roc4+roc5+roc6+roc7+roc8+roc9+roc10+roc11+roc12
oscsmt = sma(osc,a)
pos = iff(osc > oscsmt, 1,
	     iff(osc < oscsmt, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(osc, color=blue, title="Martin Pring's Special K")
plot(oscsmt, color = red, title = "Smooth")
hline(0, title="Zero Line")
```

> Detail

https://www.fmz.com/strategy/430285

> Last Modified

2023-10-26 17:39:26
