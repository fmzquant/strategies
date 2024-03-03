
> Name

枢轴点预测震荡指标回测策略Pivot-Point-Forecast-Oscillator-Backtesting-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16efba19215062cf34b.png)
 [trans]

## 概述

该策略是基于Tushar Chande开发的枢轴点预测震荡指标(Pivot Point Forecast Oscillator)进行回测。该指标计算收盘价与n周期线性回归预测价格的百分比差异。当预测价格高于收盘价时,该指标上穿0;当预测价格低于收盘价时,该指标下穿0。这可以用来识别市场的转折点。

## 策略原理  

该策略运用枢轴点预测震荡指标判断市场的多空。具体来说,是计算n周期的线性回归预测价格,与实际收盘价计算差额百分比。当差额百分比上穿0时作多头;当差额百分比下穿0时作空头。完整的交易逻辑如下:

1. 计算n周期线性回归预测价格xLG
2. 计算收盘价与预测价格的百分比差异xCFO
3. 判断差异百分比xCFO与0的关系,输出多空信号possig
   1. xCFO > 0且允许做多,possig = 1
   2. xCFO < 0且允许做空,possig = -1
   3. 否则,possig = 0
4. 根据possig信号,做多或做空

该策略简单直接,通过比较实际价格与预测价格,判断市场是否被高估或低估,从而产生交易信号。

## 优势分析

该策略具有以下优势:  

1. 逻辑清晰,易于理解实现。
2. 参数少,便于调整。
3. 可灵活选择周期,适应不同市场。
4. 可方便地切换做多做空方向。
5. 可视化指标,形成明确的交易信号。

## 风险分析  

该策略也存在一些风险:  

1. 线性回归预测有时效性,不能持续有效。
2. 选取参数不当可能导致过于频繁交易。 
3. 突发事件可能导致指标产生错误信号。

对策:  

1. 结合其他指标,确保线性回归预测的有效性。
2. 优化参数,降低交易频率。
3. 增加止损策略,控制单笔损失。

## 优化方向  

该策略可从以下方面进行优化:  

1. 结合移动平均线等指标,丰富交易信号。
2. 加入止损策略,规避巨额亏损。
3. 优化参数,获得最佳参数组合。
4. 增加自动止盈策略。
5. 考虑交易费率,设定合理的止盈止损幅度。

## 总结  

枢轴点预测震荡指标是一种利用线性回归预测价格的量化交易策略。该策略逻辑简单、参数设置灵活,能够产生清晰的交易信号。在优化止损策略、参数选择以及结合其他指标信号等方面,该策略还有进一步改进的空间,能够获得更好的交易效果。

||


## Overview  

This strategy backtests the Pivot Point Forecast Oscillator developed by Tushar Chande. The oscillator calculates the percentage difference between the closing price and the n-period linear regression forecasted price. It crosses above 0 when the forecast price is greater than the closing price and crosses below 0 when less than. This can be used to identify turning points in the market.

## Strategy Logic

The strategy utilizes the Pivot Point Forecast Oscillator to determine market direction. Specifically, it calculates the percentage difference between the n-period linear regression forecasted price and the actual closing price. When the percentage difference crosses above 0, it goes long. When the percentage difference crosses below 0, it goes short. The complete trading logic is as follows:

1. Calculate n-period linear regression forecast price xLG  
2. Calculate percentage difference between closing price and forecast price xCFO
3. Determine relationship between xCFO and 0 to output signal possig
   1. xCFO > 0 and long is allowed, possig = 1 
   2. xCFO < 0 and short is allowed, possig = -1  
   3. Otherwise, possig = 0
4. Go long or short based on possig signal

The strategy is simple and straight-forward, comparing actual price with forecast price to determine if the market is overestimated or underestimated, thus generating trading signals.  

## Advantage Analysis 

The strategy has the following advantages:

1. Clear logic, easy to understand and implement.  
2. Few parameters, easy to tune.
3. Flexible in choosing timeframes, adaptable to different markets.
4. Convenient to switch between long and short.
5. Visual indicator forms clear trading signals.

## Risk Analysis   

The strategy also has some risks:  

1. Linear regression prediction has timeliness, may not sustain effectiveness.
2. Improper parameter selection may cause over-trading.  
3. Black swan events may cause incorrect signals.

Counter measures:

1. Combine with other indicators to ensure validity of linear regression prediction.  
2. Optimize parameters to lower trading frequency. 
3. Add stop loss to control single trade loss.

## Optimization Directions  

The strategy can be improved in the following aspects:

1. Combine with MA and other indicators to enrich trading signals. 
2. Add stop loss to avoid huge losses.
3. Optimize parameters to find best combination.
4. Add automatic take profit.
5. Consider trading costs, set reasonable stop loss and take profit.

## Conclusion  

The Pivot Point Forecast Oscillator is a quant trading strategy utilizing linear regression forecast prices. The strategy has simple logic and flexible parameters, generating clear trading signals. There is room for further improvement in optimizing stop loss, parameter selection, combining other indicator signals etc, to achieve better trading performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|false|Offset|
|v_input_3|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-13 00:00:00
end: 2023-12-19 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 19/03/2018
// The Chande Forecast Oscillator developed by Tushar Chande The Forecast 
// Oscillator plots the percentage difference between the closing price and 
// the n-period linear regression forecasted price. The oscillator is above 
// zero when the forecast price is greater than the closing price and less 
// than zero if it is below.
//
// You can change long to short in the Input Settings
// WARNING:
//  - For purpose educate only
//  - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Chande Forecast Oscillator Backtest", shorttitle="CFO")
Length = input(14, minval=1)
Offset = input(0)
reverse = input(false, title="Trade reverse")
hline(0, color=black, linestyle=line)
xLG = linreg(close, Length, Offset)
xCFO = ((close -xLG) * 100) / close
pos = iff(xCFO > 0, 1,
       iff(xCFO < 0, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xCFO, color=red, title="CFO")
```

> Detail

https://www.fmz.com/strategy/435951

> Last Modified

2023-12-20 13:44:26
