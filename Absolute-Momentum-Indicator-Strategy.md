
> Name

Absolute-Momentum-Indicator-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1bcea81cfe1913af0aa.png)

## Overview

The Absolute Momentum Indicator Strategy is an improved version based on the momentum indicator CMO developed by Tushar Chande. This strategy judges whether the market is currently overbought or oversold by calculating the absolute value of price momentum to capture medium-term price fluctuations in the market.

## Strategy Principle   

The core indicator of this strategy is the improved CMO indicator, called AbsCMO. The calculation formula of AbsCMO is:  

``` 
AbsCMO = abs(100 * (latest closing price - closing price Length periods ago) / (simple moving average of absolute price fluctuations over Length period * Length))
```

Where Length represents the length of averaging period. The range of AbsCMO values is from 0 to 100. This indicator combines directionality and strength of momentum monumentality to clearly determine medium-term market trends and overbought/oversold areas.  

When AbsCMO breaks through the specified upper rail (default 70), it indicates the market has entered overbought territory and goes short; when AbsCMO breaks through the specified lower rail (default 20), it indicates the market has entered oversold territory and goes long.

## Advantage Analysis   

Compared with other momentum indicators, the AbsCMO indicator has the following advantages:  

1. It reflects the absolute momentum of price and judges medium-term trends more accurately;
2. It identifies overbought/oversold conditions more clearly by incorporating directionality and strength;  
3. Its range is limited between 0-100, making it more suitable for comparison across different products;  
4. It is less sensitive to short-term volatility, reflecting medium-term trends;
5. Customizable parameters make it highly adaptable.   

## Risk Analysis   

The main risks of this strategy are:   

1. As a medium-term indicator, it is less sensitive to short-term fluctuations;  
2. The default parameters may not suit all products and need to be optimized;
3. Long holding periods can lead to large drawdowns.  

These risks could be reduced by shortening holding periods, optimizing parameters, or incorporating other indicators.  

## Optimization Directions  

This strategy can be optimized from the following aspects:  

1. Optimize the parameters of AbsCMO to adapt to more products;  
2. Incorporate other indicators to filter false signals;
3. Set stop loss and take profit rules to control risks;
4. Leverage technologies like deep learning to find better entry points.

## Conclusion  

In summary, the Absolute Momentum Indicator Strategy is a useful medium-term trading strategy. It reflects the absolute momentum characteristics of price over the medium term and has strong predictive power of medium-term trends. However, this strategy is less sensitive to short-term fluctuations and carries certain risks. Further improvements like parameter optimization, indicator filters, stop loss mechanisms can make its live performance more steady and reliable.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Length|
|v_input_2|70|TopBand|
|v_input_3|20|LowBand|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-12 00:00:00
end: 2024-02-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 17/02/2017
//    This indicator plots the absolute value of CMO. CMO was developed by Tushar 
//    Chande. A scientist, an inventor, and a respected trading system developer, 
//    Mr. Chande developed the CMO to capture what he calls "pure momentum". For 
//    more definitive information on the CMO and other indicators we recommend the 
//    book The New Technical Trader by Tushar Chande and Stanley Kroll.
//    The CMO is closely related to, yet unique from, other momentum oriented indicators 
//    such as Relative Strength Index, Stochastic, Rate-of-Change, etc. It is most closely 
//    related to Welles Wilder`s RSI, yet it differs in several ways:
//        - It uses data for both up days and down days in the numerator, thereby directly 
//          measuring momentum;
//        - The calculations are applied on unsmoothed data. Therefore, short-term extreme 
//          movements in price are not hidden. Once calculated, smoothing can be applied to 
//          the CMO, if desired;
//        - The scale is bounded between +100 and -100, thereby allowing you to clearly see 
//          changes in net momentum using the 0 level. The bounded scale also allows you to 
//          conveniently compare values across different securities.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////

strategy(title="CMOabs", shorttitle="CMOabs")
Length = input(9, minval=1)
TopBand = input(70, minval=1)
LowBand = input(20, minval=0)
reverse = input(false, title="Trade reverse")
// hline(0, color=gray, linestyle=dashed)
// hline(TopBand, color=red, linestyle=line)
// hline(LowBand, color=green, linestyle=line)
xMom = abs(close - close[1])
xSMA_mom = sma(xMom, Length)
xMomLength = close - close[Length]
nRes = abs(100 * (xMomLength / (xSMA_mom * Length)))
pos = iff(nRes > TopBand, -1,
	     iff(nRes < LowBand, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(nRes, color=blue, title="CMO")
```

> Detail

https://www.fmz.com/strategy/442108

> Last Modified

2024-02-19 14:13:01
