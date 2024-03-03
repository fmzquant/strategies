
> Name

布林带反转趋势策略Bollinger-Bands-Reversal-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ebeaebae735d7e35d9.png)
[trans]

## 概述
本策略通过布林带的上轨、中轨、下轨与200日移动平均线的关系来判断趋势方向。在多头趋势下,当价格触及布林带下轨时做多;在空头趋势下,当价格触及布林带上轨时做空。

## 原理
1. 判断趋势:当布林带上轨和下轨同时大于200日移动平均线时为多头趋势;当布林带上轨和下轨同时小于200日移动平均线时为空头趋势
2. 入场:多头趋势时,价格触及布林带下轨时做多;空头趋势时,价格触及布林带上轨时做空
3. 出场:多头持仓时,价格触及布林带上轨或下破250日简单移动平均线时平仓;空头持仓时,价格触及布林带下轨或上破300日简单移动平均线时平仓

## 优势
1. 使用布林带判断趋势方向,避免在无明确方向时的反复交易
2. 在趋势方向明确时,利用布林带波动范围判断适当入场和出场
3. 增加了移动平均线的辅助判断,避免出现意外损失

## 风险及解决
1. 布林带参数设置不当,导致判断失误:应调整布林带参数,寻找最适合的周期长度
2. 移动平均线getParameter不当,出现频繁停损或预期外损失:应测试不同的参数,找到最稳定的参数
3. 行情突发性变化,如重大消息面,导致异常波动:应设置止损,控制单笔损失

## 优化方向
1. 测试不同周期参数下的策略表现,找到最优参数
2. 增加止损机制,避免异常行情下的大幅亏损
3. 结合其他指标确认入场时机,提高策略胜率

## 总结
本策略通过布林带判断趋势方向,在明确趋势后通过布林带辅助移动平均线形成的交易体系,既保证了交易方向的正确性,也利用波动范围锁定适当盈利。同时也存在一些参数选择和止损方面的问题。通过优化参数设置、增加止损机制等进一步完善,可以获得更好的策略表现。

||

## Overview
This strategy uses the relationship between the upper band, middle band, lower band of Bollinger Bands and 200-day moving average to determine the trend direction. It goes long when price touches the lower band during an uptrend and goes short when price touches the upper band during a downtrend.

## Principles  
1. Determine trend: When both upper and lower bands of Bollinger Bands are above 200-day moving average, it is an uptrend. When both are below, it is a downtrend.   
2. Entry: Go long when price touches lower band in an uptrend. Go short when price touches upper band in a downtrend.  
3. Exit: When long, close position when price touches upper band or breaks below 250-day simple moving average. When short, close position when price touches lower band or breaks above 300-day simple moving average.

## Advantages
1. Use Bollinger Bands to determine trend direction, avoiding repetitive trading without a clear direction. 
2. Take proper entries and exits based on the volatility range of Bollinger Bands when trend direction is clear.
3. Added filtering with moving averages, avoiding unexpected losses.  

## Risks and Solutions
1. Improper Bollinger Bands parameter setting leads to misjudgment: Adjust parameters to find the optimal period length.  
2. Improper moving average parameter leading to over trading or unwanted losses: Test different parameters to find the most stable ones.
3. Sudden market change due to major news events causes anomalies: Set stop loss to limit per trade loss.   

## Optimization Directions  
1. Test strategy performance across different parameter periods to find the optimal parameters.
2. Add stop loss mechanism to avoid huge losses in anomalous market conditions.   
3. Incorporate other indicators to confirm entry signals to improve win rate.
   
## Conclusion
This strategy determines trend direction with Bollinger Bands first. It then utilizes the volatility range of Bollinger Bands together with moving averages to form a trading system that ensures directional correctness and locks in decent profits. There are still some issues with parameter selection and stop loss that can be further improved via optimization and mechanism additions to achieve better performance.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_float_1|2.3|mult|
|v_input_int_2|200|trend|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-29 00:00:00
end: 2023-12-06 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Aayonga

//@version=5
strategy("boll trend", overlay=true,initial_capital=1000,default_qty_type=strategy.fixed, default_qty_value=1 )
bollL=input.int(20,minval=1,title = "length")
bollmult=input.float(2.3,minval=0,step=0.1,title = "mult")
basis=ta.ema(close,bollL)
dev=bollmult*ta.stdev(close,bollL)
upper=basis+dev

lower=basis-dev

smaL=input.int(200,minval=1,step=1,title = "trend")
sma=ta.sma(close,smaL)
//多头趋势
longT=upper>sma and basis>sma and lower>=sma
//空头趋势
shortT=upper<sma and basis<sma and lower<=sma

//入场位
longE=ta.crossover(close,lower)

shortE=ta.crossover(close,upper)

//出场位

longEXIT=ta.crossover(high,upper) or ta.crossunder(close,ta.sma(close,300))
shortEXIT=ta.crossunder(low,lower) or ta.crossover(close,ta.sma(close,250)) 

if longT and longE 
    strategy.entry("多long",strategy.long)

if longEXIT
    strategy.close("多long",comment = "close long")

if shortE and shortT 
    strategy.entry("空short",strategy.short)

if shortEXIT
    strategy.close("空short",comment = "close short")
```

> Detail

https://www.fmz.com/strategy/434569

> Last Modified

2023-12-07 16:08:05
