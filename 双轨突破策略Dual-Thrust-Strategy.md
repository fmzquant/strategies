
> Name

双轨突破策略Dual-Thrust-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]
## 概述

双轨突破策略基于开盘价及前一天波动幅度设置上下轨,以突破上轨做多和突破下轨做空。该策略捕捉突破形成的趋势交易机会。

## 策略原理

1. 计算最近N根K线的最高价HH和最低价LL。

2. 计算前一天的最高收盘价HC和最低收闭价LC。 

3. 前一天波动幅度Range为HH-LC和HC-LL中的较大值。

4. 上轨BuyLine为开盘价加上k1*Range。

5. 下轨SellLine为开盘价减去k2*Range。

6. 当收盘价上穿上轨时做多。当收盘价下穿下轨时做空。

## 优势分析

该策略主要优点:

1. 抓住开盘价附近的突破形成的趋势交易机会。

2. 上下轨基于历史波动自动设置,避免主观。

3. k值可自定义,适应涨跌幅不同的品种。

4. 突破形态清晰,信号质量较高。

5. 可灵活设置持仓周期,捕捉不同级别趋势。

## 风险分析

该策略主要风险:

1. 无法确定上下轨合理范围,存在过优化风险。

2. 突破可能为假突破,须设置止损。

3. 固定持仓时间无法动态响应行情。

4. 回测周期较短,可能存在曲拟合。

5. 多空双边交易,实现难度较大。

对应解决方法:

1. 优化k值参数,扩大数据回测范围。

2. 设置合理止损位置,控制单笔损失。

3. 增加趋势判断,避免逆势交易。 

4. 考虑缩短持仓周期至当日。

5. 实盘验证,分阶段逐步扩大仓位。

## 优化方向

该策略可考虑以下几点优化:

1. 动态调整上下轨参数k值。

2. 结合交易量等指标确认突破信号。

3. 增加移动止损保护利润。

4. 评估突破强弱,调整开仓手数。

5. 区分趋势和区间,进行策略分解。

## 总结

双轨突破策略可以捕捉开盘价附近的趋势交易机会。但其参数设定和持仓时间优化空间较大,需要充分考虑风险控制。实盘时建议从保守参数开始,分批逐步扩大仓位。

||
## Overview

The dual thrust strategy sets upper and lower bands based on the opening price and previous day's range, going long on upside breakouts and short on downside breakouts. It aims to capture trend trading opportunities formed by the breakouts.

## Strategy Principle 

1. Calculate the highest high HH and lowest low LL over the recent N bars.

2. Calculate the highest close HC and lowest close LC of the previous day.

3. The previous day's range Range is the larger of HH-LC and HC-LL. 

4. The upper band BuyLine is opening price plus k1*Range.

5. The lower band SellLine is opening price minus k2*Range.

6. Go long when close breaks above BuyLine. Go short when close breaks below SellLine.

## Advantage Analysis

Main advantages of this strategy:

1. Captures trend formed by breakouts around the opening price.

2. Bands are set automatically based on historical volatility, avoiding subjectivity.

3. Customizable k values suit products with different volatility. 

4. Breakout signals have relatively high quality. 

5. Flexible holding periods to capture trends on different timeframes.

## Risk Analysis

Main risks of this strategy: 

1. Difficulty determining reasonable range for the bands, overfit risks.

2. Breakouts may turn out to be false signals, need stop loss.

3. Fixed holding period cannot adapt dynamically to market.

4. Insufficient backtest data leads to curve fitting. 

5. Difficulty implementing long and short trading together.

Solutions:

1. Optimize k values on larger dataset to avoid overfitting.

2. Set proper stop loss to limit loss per trade. 

3. Add trend filter to avoid countertrend trading.

4. Consider reducing holding period to intraday. 

5. Live validation with gradual position sizing.

## Optimization Directions

Some ways to improve the strategy:

1. Dynamically adjust k values for the bands.

2. Add volume filter to confirm breakout signals.

3. Use moving stop loss to protect profits.

4. Assess breakout strength for position sizing. 

5. Distinguish between trend and range to decompose strategy.

## Summary

The dual thrust strategy can capture trend trading opportunities around the opening price. But parameter settings and holding period optimizations have large room for improvements considering risk control. For live trading, start with conservative parameters and size up positions gradually.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0.67|k1|
|v_input_2|0.62|k2|
|v_input_3|240|TimeFrame|
|v_input_4|20|len|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-18 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Dual Thrust Strategy",overlay=true,initial_capital=1000)
k1=input(0.67,type=float,step=0.01)
k2=input(0.62,type=float,step=0.01)
TimeFrame=input('240')
len=input(20)
HH=security(syminfo.tickerid,TimeFrame,highest(high,len),barmerge.lookahead_off)
LC=security(syminfo.tickerid,TimeFrame,lowest(close,len),barmerge.lookahead_off)
HC=security(syminfo.tickerid,TimeFrame,highest(close,len),barmerge.lookahead_off)
LL=security(syminfo.tickerid,TimeFrame,lowest(low,len),barmerge.lookahead_off)
Range=max(HH-LC,HC-LL)
BuyLine=security(syminfo.tickerid,"D",open,barmerge.lookahead_off)+k1*Range
SellLine=security(syminfo.tickerid,"D",open,barmerge.lookahead_off)-k2*Range
plot(BuyLine,color=blue,linewidth=2,offset=1,transp=70)
plot(SellLine,color=red,linewidth=2,offset=1,transp=70)


LongCondition=crossover(close,BuyLine)
ShortCondition=crossunder(close,SellLine)
strategy.entry("enter long",true,1,when=LongCondition)
strategy.entry("enter short",false,1,when=ShortCondition)
plotshape(LongCondition and strategy.position_size<0?low:na,style=shape.labelup,location=location.absolute,color=blue,text="Long",textcolor=white,size=size.small)
plotshape(ShortCondition and strategy.position_size>0?high:na,style=shape.labeldown,location=location.absolute,color=red,text="Short",textcolor=white,size=size.small)
alertcondition(LongCondition and strategy.position_size<0,title='Long_DT')
alertcondition(ShortCondition and strategy.position_size>0,title='Short_DT')
```

> Detail

https://www.fmz.com/strategy/427267

> Last Modified

2023-09-19 16:27:12
