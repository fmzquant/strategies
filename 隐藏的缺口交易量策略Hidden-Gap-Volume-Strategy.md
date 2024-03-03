
> Name

隐藏的缺口交易量策略Hidden-Gap-Volume-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]

## 概述

隐藏的缺口交易量策略是基于交易量的技术指标来发现隐藏的价格走势。它分析不同时间段内的交易量变化,来判断市场目前的供需关系和未来可能的价格变动方向。

## 策略原理 

该策略通过计算不同周期交易量的最高值和最低值,来判断交易量增大和减小的关键区域。

1. 如果交易量低于之前20周期的最低值,则交易量绘制为灰色,表示进入供过于求的阶段。

2. 如果交易量高于之前40周期的最高值,则交易量绘制为黑色,表示进入求过于供的阶段。

3. 如果交易量低于之前2周期的最低值,则交易量绘制为紫色,表示供求关系急剧变化。

4. 如果交易量低于上一周期,则交易量绘制为红色,表示供过于求。

5. 如果交易量高于上一周期,则交易量绘制为蓝色,表示求过于供。

6. 其他情况下,交易量绘制为白色。

根据交易量的颜色判断市场目前的供求关系,如果交易量提示供过于求,做多;如果交易量提示求过于供,做空。

另外,该策略还在交易量绘制移动平均线,来判断总体交易量的多空。如果交易量高于移动平均线则看多,低于移动平均线则看空。

## 优势分析

该策略最大的优势是利用交易量的变化来发现市场中的供求关系,这种关系往往隐藏在价格行情之下,very hard to detect. 但是通过分析交易量的变化,可以揭示出这些隐藏信息,从而提前判断市场的未来走势。

另外,相比仅以价格为基础的技术指标,交易量提供了非常独特和有价值的视角来判断市场结构。所以这种基于交易量思路的策略具有非常强大的优势。

## 风险分析

该策略主要依赖交易量,但是有时交易量的变化并不能完全反映市场供求关系,这是该策略最大的风险。

例如,交易量突然下降,并不一定表示供过于求,有可能是操作者暂时离场,等一个机会重新入市。所以仅凭交易量的判断,容易产生错误信号。

另外,交易量数据的质量也会影响策略效果。如果交易量数据不准确,就很难正确判断供求关系。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 结合其他技术指标,例如价格形态、移动平均线等,来验证交易量信号,避免错误交易。

2. 优化交易量多空判断的周期参数,适应不同周期和市场环境。

3. 加入止损策略,以控制每单损失。

4. 优化资金管理,设定合理的仓位管理。

5. 进行回测优化,选择合适的交易品种,时间段等。

## 总结

隐藏的缺口交易量策略通过分析交易量的变化来判断市场结构,这种基于交易量的思路非常独特和有效。该策略能揭示出价格行情背后的供求关系,提前捕捉市场变化趋势。但交易量信号的准确性需要组合其他技术指标来验证,同时要注意风险控制。如果应用得当,该策略可以成为一个独特和有效的交易工具。


||


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

[/trans]


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
