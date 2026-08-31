
> Name

Hidden-Gap-Volume-Strategy

> Author

ChaoZhang

> Strategy Description




## Overview

The Hidden Gap Volume strategy utilizes volume-based technical indicators to detect hidden trends in price action. It analyzes changes in trading volume over different timeframes to gauge current supply and demand dynamics and anticipate potential future price moves.

## Strategy Logic

The strategy calculates highest and lowest values of trading volume over different lookback periods to identify areas of increasing and decreasing volume.

1. If volume is below the lowest value over the past 20 periods, color volume gray to indicate a supply exceeding demand phase. 

2. If volume is above the highest value over the past 40 periods, color volume black to indicate a demand exceeding supply phase.

3. If volume is below the lowest value over the past 2 periods, color volume purple to indicate a sharp change in supply/demand dynamics.

4. If volume is below the previous period, color volume red to indicate supply exceeding demand. 

5. If volume is above the previous period, color volume blue to indicate demand exceeding supply.

6. Otherwise, color volume white.

Use the color of volume to determine current supply/demand and go long if volume suggests supply exceeding demand, and go short if volume suggests demand exceeding supply. 

Additionally, plot a moving average of volume to gauge overall volume trend. Go long if volume is above MA and short if below.

## Advantage Analysis 

The biggest advantage of this strategy is utilizing volume changes to uncover supply/demand dynamics hidden beneath price action that are very hard to detect. Analyzing shifts in volume reveals these hidden insights early to anticipate future market direction.

Compared to price-based indicators, volume provides a very unique and valuable perspective for judging market structure. So this volume-based approach has powerful edge.

## Risk Analysis

The main risk is that volume changes don't always fully reflect supply/demand dynamics. For example, a sudden drop in volume doesn't necessarily mean supply exceeding demand, but rather traders temporarily stepping aside before re-entering. Relying solely on volume can generate incorrect signals.

Also, quality of volume data affects strategy performance. Accurately judging supply/demand requires accurate volume data.

## Optimization Directions

The strategy can be optimized by:

1. Incorporating other technical indicators like price patterns and moving averages to confirm volume signals and avoid bad trades.

2. Optimizing volume oscillator lookback periods for different timeframes and market conditions. 

3. Adding stop loss to control loss per trade.

4. Optimizing position sizing and risk management.

5. Backtesting to select optimal instruments, timeframes, etc.

## Conclusion

The Hidden Gap Volume strategy provides a unique and effective approach by analyzing volume changes to judge market structure. It uncovers supply/demand dynamics hidden in price action to get an early read on shifting market trends. But volume signals should be confirmed with other technicals, and risk control is crucial. When applied properly, this strategy can become a unique and powerful trading tool.



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|40|Length_HH|
|v_input_2|2|Length_LLSmall|
|v_input_3|20|Length_LLBig|
|v_input_4|20|LengthMA|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/06/2017
// If Volume is less then the previous 20 intervals, Volume is gray.
// If Volume is greater then the previous 40 intervals, Volume is black.
// If Volume is less then the previous 2 intervals, Volume is purple.
// If Volume is less then the previous, Volume is red.
// If Volume is greater then the previous, Volume is blue.
// Other - white.
// You can add on the indicator a 2.5 Standart Deviation of a 20 period 
// Bollinger Band Shifted 3 periods forward.
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="Hidden Gap`s VSA Volume")
Length_HH = input(40, minval=1)
Length_LLSmall = input(2, minval=2)
Length_LLBig = input(20, minval=2)
LengthMA    = input(20, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=gray, linestyle=hline.style_dashed)
xSMA_vol = sma(volume, LengthMA)
xHH_vol = highest(volume, Length_HH)
xLL_volSmall = lowest(volume, Length_LLSmall)
xLL_volBig = lowest(volume, Length_LLBig)
BarColor = iff(volume > xHH_vol[1], black,
             iff(volume < xLL_volBig[1], gray,
              iff(volume < xLL_volSmall[1], purple,
               iff(volume > volume[1], blue, 
                 iff(volume < volume[1], red, white)))))
pos = iff(volume > xSMA_vol, -1,
	     iff(volume < xSMA_vol, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )                 
plot(volume, color=BarColor, title="Vol", style=histogram, linewidth=2)
plot(xSMA_vol, color=black, title="SMA")
```

> Detail

https://www.fmz.com/strategy/428967

> Last Modified

2023-10-11 14:44:26
