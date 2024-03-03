
> Name

移动平均线组合趋势策略Derivative-Based-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/171d46293f3643d6f75.png)
[trans]

## 概述

本策略通过组合使用不同周期的移动平均线来确定趋势方向,并利用有限差分法近似导数来预测可能的反转点。该策略适用于小时级别的低波动性货币对。

## 策略原理

该策略同时使用20期、40期和80期的简单移动平均线。当收盘价高于这3条移动平均线时,定义为上升趋势;当收盘价低于这3条移动平均线时,定义为下降趋势。只有当最低价高于或最高价低于这3条移动平均线时,才确认趋势。

为了预测可能的反转点,策略利用3期中项移动平均线的有限差分法近似第一导数。当第一导数为正时,表示上升趋势稳定;当第一导数为负时,表示下降趋势稳定。

具体交易规则是:

1. 当快速线高于中线,中线高于慢速线,并且第一导数>0时,做多;

2. 当快速线低于中线,中线低于慢速线,并且第一导数<0时,做空;  

3. 多头止损当第一导数<=0时;

4. 空头止损当第一导数>=0时。

## 优势分析

该策略具有以下优势:

1. 使用多组移动平均线组合判断趋势,使趋势判断更可靠;

2. 利用导数预测反转点,可以及时止损,回撤更小;

3. 策略逻辑简单清晰,容易理解实现,适合新手学习;

4. 只做趋势后的反转,避免被套,胜率较高。

## 风险分析

该策略也存在一些风险:  

1. 在震荡行情中,移动平均线组合可能发出错误信号;

2. 导数反转信号可能滞后,无法完全避免损失;

3. 止损点设定不当可能扩大损失。

针对这些风险,我们可以通过优化移动平均线的参数,调整止损位置,结合其他指标等方法来改进。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 优化移动平均线的周期,使其更符合不同市场的特点;

2. 尝试不同类型的移动平均线,如指数移动平均线; 

3. 利用波动率指标设定动态止损;

4. 结合其他指标进行確認,避免错误信号。

## 总结

该移动平均线组合趋势策略,利用多组移动平均线判断趋势方向,并用导数预测反转点,可以有效控制风险,适合中短线操作。策略简单易用,容易优化,是非常适合新手学习实践的趋势跟踪策略。通过进一步优化,可以使策略参数更加适应不同品种,从而获得更好的效果。

|| 

## Overview  

This strategy uses a combination of moving averages with different periods to establish trends and uses finite difference derivative approximations to predict possible reversals. It works best on hourly charts of less volatile currency pairs.

## Strategy Logic

The strategy uses 20-, 40-, and 80-period simple moving averages simultaneously. When the closing price is above these 3 moving averages, it is defined as an uptrend; when the closing price is below these 3 moving averages, it is defined as a downtrend. The trend is confirmed only when the lowest price is above or the highest price is below these 3 moving averages.

To predict possible reversal points, the strategy uses the finite difference derivative approximation of the first derivative of the 40-period simple moving average. When the first derivative is positive, it indicates a stable uptrend; when the first derivative is negative, it indicates a stable downtrend.

The specific trading rules are:

1. When the fast line is above the middle line and the middle line is above the slow line, and the first derivative > 0, go long;  

2. When the fast line is below the middle line and the middle line is below the slow line, and the first derivative <0, go short;

3. Close long position when the first derivative <= 0;  

4. Close short position when the first derivative >= 0.

## Advantage Analysis   

The advantages of this strategy include:

1. Using multiple moving averages to determine trends makes trend judgment more reliable;

2. Predicting reversal points with derivatives allows timely stop loss and smaller drawdowns;

3. The logic is simple and easy to understand, suitable for beginners;  

4. Only trading reversals after trends avoids being trapped and has a higher win rate.

## Risk Analysis

There are also some risks with this strategy:

1. The moving average combination may give wrong signals during range-bound markets;

2. The derivative reversal signals may lag and cannot completely avoid losses; 

3. Improper stop loss setting may expand losses.

To address these risks, we can optimize the parameters of the moving averages, adjust the stop loss, combine with other indicators to improve the strategy.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize the moving average periods to better suit different market conditions;  

2. Try different types of moving averages, like EMAs;

3. Use volatility indicators to set dynamic stops; 

4. Combine other indicators for confirmation to avoid false signals.

## Conclusion  

This moving average combination trend strategy uses multiple moving averages to determine trend direction and derivatives to predict reversals, which can effectively control risks and is suitable for medium-term trading. The strategy is simple and easy to optimize, making it ideal for beginners to learn and practice trend following strategies. Further optimizations can make the parameters more adaptive to different products for better results.

[/trans]



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
strategy("Big 3",overlay=true, default_qty_type=strategy.percent_of_equity)
 
// enter on Arrows
// take profit on touch with 80 SMA, gray, or at discretion
 
fast = sma(close,20)
mid = sma(close,40)
slow = sma(close,80)
 
plot(fast,linewidth=1)
plot(mid,linewidth=2)
plot(slow,linewidth=4)
 
isUptrend = close > fast and close > mid and close > slow
isDowntrend = close < fast and close < mid and close < slow
 
confirmed = (low > fast and low > mid and low > slow) or (high < fast and high < mid and high < slow)
deriv = 3 * mid[0] - 4 * mid[1] + mid[2]

stableUptrend = (fast > mid) and (mid > slow) and (deriv > 0)
stableDowntrend = (fast < mid) and (mid < slow) and (deriv < 0)
 
barcolor(isUptrend ? green : isDowntrend ? red : gray)
plotshape(not confirmed[1] and confirmed and isUptrend ? close : na,style=shape.arrowup,location=location.belowbar,color=green)
plotshape(not confirmed[1] and confirmed and isDowntrend ? close : na,style=shape.arrowdown,location=location.abovebar,color=red)

stop = na
//stop = input(1000, "Stop")


strategy.entry("long", strategy.long, when=(stableUptrend), stop=stop)
strategy.close("long", when=(deriv <= 0))

strategy.entry("short", strategy.short, when=(stableDowntrend), stop=stop)
strategy.close("short", when=(deriv >= 0))




```

> Detail

https://www.fmz.com/strategy/435005

> Last Modified

2023-12-11 16:28:20
