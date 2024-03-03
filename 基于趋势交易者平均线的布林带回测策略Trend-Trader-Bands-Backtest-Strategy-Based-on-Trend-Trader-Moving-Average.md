
> Name

基于趋势交易者平均线的布林带回测策略Trend-Trader-Bands-Backtest-Strategy-Based-on-Trend-Trader-Moving-Average

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/152ae6aaf78c490087c.png)
[trans]

## 概述

该策略的主要思想是利用移动平均线和布林带,对价格趋势进行判断和交易信号产生。具体来说,首先计算出一定周期的平均真实波动范围ATR,然后结合最高价和最低价得到限制通道。如果价格突破该通道,则让close价格等于通道价格。之后对限制后的close价格求移动平均线,再在其上下画布林带,形成交易信号。当价格突破布林带上轨时做多,突破布林带下轨时做空。

## 策略原理  

该策略首先计算出ATR波动范围,然后与最高价和最低价结合,得到限制通道。只有当价格突破该通道时,close价格才会被限制在通道价格。之后对限制后的close价格求移动平均线,这条移动平均线被称为趋势交易者平均线(Trend Trade AVR)。该移动平均线反映了价格的中长期趋势方向。最后,在趋势交易者平均线上下各画一条平行线,作为布林带上下轨。当价格突破布林带上轨时产生做多信号,突破布林带下轨时产生做空信号。

该策略判断趋势的核心在于趋势交易者平均线,它体现了中长期趋势方向。布林带的作用则是过滤掉部分假突破,使交易信号更加可靠。整个策略结合趋势跟踪和突破判断,形成较强的趋势系统。

## 策略优势  

1. 利用ATR结合最高最低价格形成通道,可有效跟踪市场波动
2. 趋势交易者平均线清晰判断中长期趋势
3. 布林带过滤假突破,提高信号质量
4. 系统整体反映强劲趋势,长期持有能获得良好收益

## 策略风险

1. 中长期持有时,可能遭遇突发事件亏损较大
2. 参数设置不当可能导致交易频繁,增加交易费用和滑点损失
3. 效果与参数设置高度相关,需要调优找到最佳参数

对策:
1. 可适当缩短持仓周期,及时止损
2. 优化参数,使信号具有一定 buffer 
3. 利用历史数据和实盘优化参数

## 策略优化方向  

1. 更加详细研究不同市场不同周期参数设置
2. 测试是否能增加其他指标过滤假突破
3. 尝试结合止损策略,控制单笔亏损

## 总结

该策略整体是一个较强的趋势跟踪系统。它能在中长线判断市场趋势,并结合布林带产生交易信号。通过参数优化,能获得稳定的超额收益。但也需要注意风险控制,避免长期持有时遭遇重大事件导致的亏损。总的来说,该策略值得进一步研究和优化,以获得长期持续的alpha。

||

## Overview

The main idea of this strategy is to judge price trends and generate trading signals using moving averages and Bollinger bands. Specifically, it first calculates the average true range (ATR) over a certain period to get volatility range, then combines highest and lowest prices to form a limiting channel. If price breaks through this channel, the close price is set to be the channel price. After that, it calculates moving average of the limited close prices, which is called Trend Trader moving average (AVR). Finally, draw Bollinger bands above and below Trend Trader moving average to form trading signals. Go long when price breaks through upper band, and go short when breaking through lower band.


## Strategy Logic

The strategy first calculates ATR range and forms a limiting channel combined with highest and lowest prices. The close price will be limited to the channel price only when it breaks through the channel. After that, it calculates Trend Trader moving average of the limited close prices, which reflects mid-long term trend direction. At last, draw a upper band and a lower band parallel to the Trend Trader moving average as Bollinger bands. Breaking through upper band generates long signal and breaking through lower band generates short signal.

The core of judging trend lies in Trend Trader moving average, which embodies mid-long term trend direction. The role of Bollinger bands is to filter some false breakouts and make trading signals more reliable. The whole strategy combines trend following and breakout, forming a strong trend system.

## Advantages

1. ATR and price range build an adaptive channel to track market volatility
2. Trend Trade AVR clearly judges mid-long term trend 
3. Bollinger Bands filter false breakouts and improve signal quality
4. The system reflects strong trend, long holding can obtain good returns

## Risks

1. Long holding may suffer huge loss due to some sudden events
2. Improper parameter setting may lead to over-trading, increasing transaction costs and slippage 
3. Performance relies heavily on parameter tuning

Solutions:
1. Properly reduce holding period and set stop loss
2. Optimize parameters to give signals enough buffer
3. Utilize historical data and live trading for parameter tuning

## Optimization Directions 

1. Research parameters settings on different markets and timeframes
2. Test whether other indicators can filter false breakouts  
3. Try to incorporate stop loss to limit per trade loss

## Conclusion

The strategy is overall a strong trend following system. It can judge mid-long term trend and generate trading signals combined with Bollinger bands. Through parameter optimization, it can obtain stable alpha. But risk control is also important to avoid huge losses due to some sudden events when holding for long term. Generally speaking, the strategy deserves further research and optimization for long term sustainable alpha.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Length|
|v_input_2|21|LengthMA|
|v_input_3|20|BandStep|
|v_input_4|3|Multiplier|
|v_input_5|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-04 00:00:00
end: 2023-12-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 16/10/2018
// This is plots the indicator developed by Andrew Abraham 
// in the Trading the Trend article of TASC September 1998  
// It was modified, result values wass averages.
// And draw two bands above and below TT line.
////////////////////////////////////////////////////////////
strategy(title="Trend Trader Bands Backtest", overlay = true)
Length = input(21, minval=1),
LengthMA = input(21, minval=1),
BandStep = input(20),
Multiplier = input(3, minval=1)
reverse = input(false, title="Trade reverse")
avgTR      = wma(atr(1), Length)
highestC   = highest(Length)
lowestC    = lowest(Length)
hiLimit = highestC[1]-(avgTR[1] * Multiplier)
loLimit = lowestC[1]+(avgTR[1] * Multiplier)
ret = 0.0
ret :=  iff(close > hiLimit and close > loLimit, hiLimit,
         iff(close < loLimit and close < hiLimit, loLimit, nz(ret[1], 0)))
nResMA = ema(ret, LengthMA)        
pos = 0.0
pos := iff(close < nResMA - BandStep , -1,
       iff(close > nResMA + BandStep, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
barcolor(pos == -1 ? red: pos == 1 ? green : blue )
plot(nResMA, color= blue , title="Trend Trader AVR")
plot(nResMA+BandStep, color= red , title="Trend Trader UpBand")
plot(nResMA-BandStep, color= green, title="Trend Trader DnBand")
```

> Detail

https://www.fmz.com/strategy/434966

> Last Modified

2023-12-11 13:12:44
