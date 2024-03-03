
> Name

震荡指数变换策略Oscillator-Index-Transformation-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1318c1c3a4cd8093d7d.png)
[trans]

## 概述

震荡指数变换策略(Oscillator Index Transformation Strategy)利用布雷瑟特(Bressert)的3-10振荡指数与其16日简单移动平均之间的交叉来产生交易信号。该策略适用于日内和隔夜交易。

## 策略原理  

该策略基于布雷瑟特的3-10振荡指数,该指数是3日指数移动平均线和10日指数移动平均线的差值。当快线(3-10 振荡指数)上穿慢线(16日简单移动平均线)时做多,当快线下穿慢线时做空。

具体来说,策略首先计算3日EMA、10日EMA和它们的差值作为振荡指数。然后计算16日振荡指数的简单移动平均作为信号线。当振荡指数上穿信号线时做多,下穿时做空。允许反转做法。

## 优势分析

1. 使用经典的布雷瑟特振荡指数,具有一定的效果  
2. 结合快慢线交叉形成交易信号,容易判断 entry 和 exit  
3. 允许反转做法,可以适应不同市场环境  
4. 可在日内和隔夜交易中使用  

## 风险分析  

1. 布雷瑟特振荡指数效果并不稳定,存在一定盈亏波动  
2. 快线和慢线交叉信号可能出现假信号  
3. 反转做法风险较大,需要谨慎运用  
4. 日内交易需考虑止损策略,隔夜交易需考虑资金管理 

## 优化方向  

1. 优化参数,调整移动平均线周期,找到最佳参数组合
2. 增加过滤条件,结合其他指标或价格形态判断信号质量  
3. 增加止损策略,设置合理的止损点,控制单笔损失  
4. 优化资金管理,调整仓位大小,降低单笔损失对总资金的影响  

## 总结  

震荡指数变换策略属于短线交易策略,通过布雷瑟特的3-10振荡指数和其信号线的交叉来产生交易信号,简单实用。该策略可适用于日内和隔夜交易,但存在一定盈亏波动和假信号风险,需增加过滤条件优化止损来改进。如果参数优化和资金管理得当,该策略可获得一定的超额收益。

||

## Overview  

The Oscillator Index Transformation strategy utilizes the crossovers between Bressert's 3-10 oscillator index and its 16-day simple moving average to generate trading signals. It is suitable for intraday and overnight trading.  

## Strategy Logic  

The strategy is based on Bressert's 3-10 oscillator index, which is the difference between 3-day and 10-day exponential moving averages. It goes long when the fast line (3-10 oscillator) crosses above the slow line (16-day SMA), and goes short when the fast line crosses below the slow line.  

Specifically, the strategy first calculates the 3-day EMA, 10-day EMA and their difference as the oscillator index. It then calculates the 16-day simple moving average of the oscillator index as the signal line. It goes long when the oscillator index crosses above the signal line and goes short when it crosses below. Reversal trades are allowed.  

## Advantages Analysis 

1. Uses the classic Bressert oscillator index which is quite effective  
2. Forms clear trading signals with fast and slow line crossovers  
3. Allows reversal trades to adapt to different market regimes 
4. Can be used in both intraday and overnight trading  

## Risk Analysis   

1. Bressert oscillator performance is unstable with profit/loss fluctuations  
2. Fast and slow line crossovers may generate false signals 
3. Reversal trades have higher risks and should be used cautiously  
4. Requires stop loss for intraday and position sizing for overnight trades  

## Optimization Directions  

1. Optimize parameters by adjusting moving average periods  
2. Add filters using other indicators or price action  
3. Add stop loss strategy to limit single trade loss size  
4. Optimize capital management to reduce overall drawdown impact  

## Conclusion  

The Oscillator Index Transformation strategy is a short-term trading strategy generating signals from 3-10 oscillator and signal line crossovers. It is simple and practical for both intraday and overnight usage, but has inherent PnL fluctuations and false signals risks. Additional filters, stop loss and position sizing are required to refine the strategy. With proper optimization it can achieve consistent alpha.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|Length1|
|v_input_2|10|Length2|
|v_input_3|16|Length3|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-15 00:00:00
end: 2023-12-21 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 27/03/2017
// TradeStation does not allow the user to make a Multi Data Chart with 
// a Tick Bar Chart and any other type a chart. This indicator allows the 
// user to plot a daily 3-10 Oscillator on a Tick Bar Chart or any intraday interval.
// Walter Bressert's 3-10 Oscillator is a detrending oscillator derived 
// from subtracting a 10 day moving average from a 3 day moving average. 
// The second plot is an 16 day simple moving average of the 3-10 Oscillator. 
// The 16 period moving average is the slow line and the 3/10 oscillator is 
// the fast line.
// For more information on the 3-10 Oscillator see Walter Bressert's book 
// "The Power of Oscillator/Cycle Combinations" 
//
// You can change long to short in the Input Settings
// Please, use it only for learning or paper trading. Do not for real trading.
////////////////////////////////////////////////////////////
strategy(title="D_Three Ten Osc", shorttitle="D_Three Ten Osc")
Length1 = input(3, minval=1)
Length2 = input(10, minval=1)
Length3 = input(16, minval=1)
reverse = input(false, title="Trade reverse")
hline(0, color=green, linestyle=line)
xPrice =  request.security(syminfo.tickerid,"D", hl2)
xfastMA = ema(xPrice, Length1)
xslowMA = ema(xPrice, Length2)
xMACD = xfastMA - xslowMA
xSignal = sma(xMACD, Length3)
pos = iff(xSignal > xMACD, -1,
	     iff(xSignal < xMACD, 1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )
plot(request.security(syminfo.tickerid, "D", xMACD), color=blue, title="D_Three Ten Osc")
plot(request.security(syminfo.tickerid, "D", xSignal), color=red, title="D_Three Ave")
```

> Detail

https://www.fmz.com/strategy/436242

> Last Modified

2023-12-22 14:21:28
