
> Name

三角形突破趋势追踪策略Triangle-Breakout-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略属于趋势跟踪策略。当价格突破向上三角形形态时做多,当快速EMA下穿中期EMA时平仓。同时设置止损和止盈点以控制风险。

## 策略原理 

1. 使用快速EMA和中期EMA判断趋势方向。快速EMA上穿中期EMA为看涨信号。

2. 使用最近N根K线的最高价和最低价判断是否形成向上三角形。形成三角形做多信号。

3. 入市后,当快速EMA下穿中期EMA时认为趋势反转,发出平仓信号。

4. 设置止损点为入场价一定百分比下方,止损退出。

5. 设置止盈点为入场价一定百分比上方,部分止盈退出。

6. 使用200日EMA判断整体趋势方向,只有在趋势向上时操作。

## 优势分析

1. 使用三角形形态过滤假突破,提高入场准确率。

2. 快速EMA与中期EMA合理划分趋势和震荡,避免被套。 

3. 止损和止盈设置合理,可以控制单笔损失。

4. 只在趋势向上时操作,可避开盘整阶段。

## 风险分析

1. 三角形范围太小可能错过趋势,太大可能增加无谓交易。需优化参数N。

2. 停损点过近容易被击出,过远难以控制损失。需评估参数作用并优化。

3. 部分止盈设置不当可能使利润溢出。需评估合理比例。

4. 趋势判断指标参数不当可能导致持仓方向错误。需多品种回测优化。

## 优化方向

1. 优化三角形判定的参数N,找到最佳值。

2. 测试不同的EMA周期组合,提高趋势判断的准确性。

3. 根据不同品种特性优化止损止盈参数。

4. 增加其他指标判断,如MACD形态、布林带突破等,提高信号质量。

5. 添加 reopen 机制,在趋势继续时延长获利时间。

## 总结

该策略整体较为稳健,通过三角形判定能有效过滤假突破。参数优化空间较大,可望获得更好的效果。此外,可尝试加入更多辅助判断指标,或者改进止损止盈策略,进一步提升策略效果。总体而言,该策略具有成为优质趋势跟踪策略的潜力。

|| 

## Overview 

This is a trend following strategy. It goes long when price breaks out of an ascending triangle formation, and closes position when fast EMA crosses below medium EMA. Stop loss and take profit are also set to control risks.

## Strategy Logic

1. Use fast EMA and medium EMA to determine trend direction. Fast EMA crossing above medium EMA is long signal.

2. Use highest and lowest prices of last N bars to determine if an ascending triangle is formed. Triangle formation gives long signal.

3. After entry, when fast EMA crosses below medium EMA, it indicates trend reversal and gives exit signal.

4. Set stop loss at certain percentage below entry price for stop loss exit. 

5. Set take profit target at certain percentage above entry price for partial profit taking.

6. Use 200-day EMA to determine overall trend direction, only trade when trend is up.

## Advantage Analysis

1. Triangle formation filters false breakout and improves entry accuracy.

2. Fast EMA vs medium EMA reasonably divides trend and consolidation to avoid whipsaws.

3. Reasonable stop loss and take profit settings control single trade loss.

4. Only trading in uptrend avoids choppy periods.

## Risk Analysis

1. Too narrow triangle range may miss trends, while too wide range may increase unnecessary trades. Parameter N needs to be optimized.

2. Stop loss too close tends to get stopped out prematurely, while too wide fails to control loss. Evaluate and optimize parameter. 

3. Improper partial take profit setting may lead to profit overflow. Evaluate proper ratio.

4. Wrong trend indicator parameters may lead to wrong position direction. Multi-product backtest optimization needed.

## Improvement Directions

1. Optimize parameter N for triangle determination to find optimum value.

2. Test different EMA period combinations to improve trend accuracy.

3. Optimize stop loss and take profit parameters based on product characteristics. 

4. Add other indicators like MACD pattern, Bollinger breakout etc to improve signal quality.

5. Add reopen mechanism to extend profit when trend continues.

## Summary

The strategy is overall robust with triangle formation improving signal accuracy. Large parameter optimization space exists for further enhancement. Also try adding more auxiliary indicators or improving stop loss/take profit for greater efficacy. Overall this strategy has the potential to become a quality trend following strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Number of Bars|
|v_input_2|13|fast EMA|
|v_input_3|65|slow EMA|
|v_input_4|5|Stop Loss%|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee

//@version=4

strategy(title="TrianglePoint strategy", overlay=true,pyramiding=2, default_qty_value=3, default_qty_type=strategy.fixed,    initial_capital=10000, currency=currency.USD)
// variables  BEGIN

numPeriods=input(9,title="Number of Bars")
fastEMA = input(13, title="fast EMA", minval=1)
slowEMA = input(65, title="slow EMA", minval=1)

stopLoss = input(title="Stop Loss%", defval=5, minval=1)


HH = highest(close[1],numPeriods)
LL = lowest(close[1],numPeriods)
tringlePoint =  low > LL and high < HH

fastEMAval= ema(close, fastEMA)
slowEMAval= ema(close, slowEMA)
two100EMAval= ema(close, 200)

//plot emas
plot(fastEMAval, color = color.green, linewidth = 1, transp=0)
plot(slowEMAval, color = color.orange, linewidth = 1, transp=0)
plot(two100EMAval, color = color.purple, linewidth = 2, transp=0)

longCondition=fastEMAval>two100EMAval and tringlePoint

//plotshape(triP,style=shape.triangleup,text="Buy",color=color.green,location=location.belowbar)
//plotshape(longCondition,style=shape.triangleup,text="Buy",color=color.green,location=location.belowbar)

//Entry
strategy.entry(id="TBT LE", comment="TBT LE" , long=true,  when= longCondition and strategy.position_size<1)   

//Add
strategy.entry(id="TBT LE", comment="Add" , long=true,  when= longCondition and strategy.position_size>=1 and close<strategy.position_avg_price)   


//barcolor(strategy.position_size>=1 ? color.blue : na)

//Take profit
takeProfitVal=   strategy.position_size>=1 ?  (strategy.position_avg_price * (1+(stopLoss*0.01) )) : 0.00
//strategy.close(id="TBT LE", comment="Profit Exit",  qty=strategy.position_size/2,  when=close>=takeProfitVal and close<open and close<fastEMAval)   //crossunder(close,fastEMAval)
barcolor(strategy.position_size>=1  ? (close>takeProfitVal? color.purple : color.blue): na)

//Exit
strategy.close(id="TBT LE", comment="TBT Exit",   when=crossunder(fastEMAval,slowEMAval))


//stoploss
stopLossVal=   strategy.position_size>=1 ?  (strategy.position_avg_price * (1-(stopLoss*0.01) )) : 0.00

//stopLossVal= close> (strategy.position_avg_price * (1+(stopLoss*0.01) )) ? lowest(close,numPeriods) : (strategy.position_avg_price * (1-(stopLoss*0.01) ))


strategy.close(id="TBT LE", comment="SL Exit",   when= close < stopLossVal)
```

> Detail

https://www.fmz.com/strategy/427367

> Last Modified

2023-09-20 14:24:16
