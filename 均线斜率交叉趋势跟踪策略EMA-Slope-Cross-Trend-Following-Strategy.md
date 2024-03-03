
> Name

均线斜率交叉趋势跟踪策略EMA-Slope-Cross-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10019300e5af2ad23bf.png)

[trans]


## 概述

该策略利用两条不同长度的指数移动平均线(EMA)的斜率交叉来生成趋势跟踪信号。默认使用长度为130和400的EMA,这两个参数的组合效果很好。

当快线EMA斜率上穿慢线EMA斜率且价格高于200周期的EMA时做多;当快线EMA斜率下穿慢线EMA斜率且价格低于200周期的EMA时做空。

斜率方向相反交叉时平仓。

该策略在比特币和流动性强、市值大的Altcoin上表现最佳,但在波动性较大的资产上也运作良好,尤其是这些资产经常出现趋势行情时。

最适合4小时时间框架。

还配套了一个可选的波动率过滤器,仅当两条斜率之间的差值大于特定阈值时才开仓,目的是避免价格横盘震荡时噪音远大于信号时打开仓位。

效果惊人,请享用!

## 策略原理

该策略的核心是比较两条不同长度EMA指数移动平均线的斜率。

首先计算长度为130和400的EMA,然后计算各自的斜率,再对各自的斜率计算长度为3的EMA得到平滑后的斜率曲线。

当快线EMA斜率上穿慢线EMA斜率时产生买入信号;当快线EMA斜率下穿慢线EMA斜率时产生卖出信号。

为过滤震荡,可以选配200周期的EMA作为趋势过滤器,仅在价格高于该EMA时考虑做多信号,低于时考虑做空信号。

此外,还可以选配一个波动率过滤器,仅当两条斜率之间的差值大于预设阈值时才产生信号,从而过滤掉斜率交叉但波动率不足的情况。

当快慢斜率反向交叉时,平掉仓位停止盈亏。

## 优势分析

1. 使用斜率交叉产生信号,可以有效跟踪趋势

2. 调整EMA周期参数组合,可以适应不同的市场环境

3. 趋势过滤器能避免被震荡行情误导

4. 波动率过滤器可过滤假信号

5. 规则简单清晰,容易理解实现

6. 可在多个时间框架上使用

## 风险分析

1. 大幅震荡行情中可能出现频繁 Open 和 Close

2. EMA周期参数不当可能错过趋势转折点

3. 须适当调整参数组合以适应市场环境变化

4. 与 MA 系统类似,大趋势末尾可能反转损失

## 优化方向

1. 尝试不同的 EMA 周期组合参数,寻找最佳参数

2. 根据不同币种特性和市场环境选择参数

3. 可以考虑加入止损策略控制风险

4. 可以考虑动态调整 EMA 周期参数

5. 尝试不同的波动率阈值参数

6. 测试在不同时间框架上的效果

## 总结

该策略整体思路清晰易懂,利用 EMA 斜率交叉产生信号,可有效跟踪趋势;配套趋势过滤器和波动率过滤器可减少噪音交易。通过调整 EMA 周期参数组合可适应不同市场环境。总体来说是一种简单实用的趋势跟踪策略,值得在实盘中测试优化。

||

## Overview

This strategy uses the cross of the slopes of two EMAs with different lengths to generate trend following signals. By default, 130 and 400 are used, which perform very well. 

The conditions that make the strategy enter the market are:
- Fast Slope > Slow Slope and price > EMA 200: go Long
- Fast Slope < Slow Slope and price < EMA 200: go Short

When the simple slopes cross in the opposite direction, it closes the position.

The strategy performs best on Bitcoin and the most liquid and capitalized altcoins, but works greatly on volatile assets as well, in particular if they often go trending. 
Works best on the 4h timeframe.

There is also an optional Volatility filter, which opens the position only if the difference between the two slopes is more than a specific value. The purpose is to avoid opening positions when the price is going sideways and the noise is much greater than the signal.

Enjoy it!

## Strategy Logic

The core of this strategy is to compare the slopes of two EMAs with different lengths. 

First, EMAs with lengths of 130 and 400 are calculated, then the slopes of each are calculated, then EMAs of length 3 are calculated on each slope to get smoothed slope curves.

When the fast EMA slope crosses above the slow EMA slope, a buy signal is generated. When the fast EMA slope crosses below the slow EMA slope, a sell signal is generated.

To filter out noise, a 200 period EMA can be used as a trend filter, considering long signals only when the price is above the EMA, and short signals only when below.

In addition, a volatility filter can be used, generating signals only when the difference between the two slopes is greater than a threshold, to avoid cases where the slopes cross but volatility is insufficient.

When the fast and slow slopes cross inversely, positions are closed to stop profits/losses.

## Advantage Analysis 

1. Using slope crosses to generate signals can effectively track trends

2. Adjusting EMA period combinations can adapt to different market conditions

3. The trend filter avoids being misled by choppy price action

4. The volatility filter filters out false signals

5. Simple and clear logic, easy to understand and implement

6. Can be used on multiple timeframes

## Risk Analysis

1. Frequent opens and closes may occur in large ranging markets

2. Inappropriate EMA periods could miss trend turning points

3. Parameters should be tuned to adapt to changing market conditions

4. Like MA systems, large trends may reverse at extremes

## Optimization Directions

1. Try different EMA period combinations to find optimal parameters

2. Choose parameters according to asset characteristics and market conditions

3. Consider adding stop loss strategies to control risk

4. Consider dynamically adjusting EMA periods 

5. Test different volatility threshold values

6. Test effectiveness across timeframes

## Summary

The strategy has clear, easy to understand logic, using EMA slope crosses to generate signals and effectively track trends. The trend and volatility filters reduce noisy trades. Tuning EMA period combinations adapts it to varying market conditions. Overall a simple and practical trend following strategy that is worth testing and optimizing in live trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2018|start year|
|v_input_2|true|start month|
|v_input_3|true|start day|
|v_input_4|2020|end year|
|v_input_5|true|end month|
|v_input_6|true|end day|
|v_input_7|0|Source MA Type: EMA|SMA|
|v_input_8|130|Fast MA Length|
|v_input_9|400|Slow MA Length|
|v_input_10|0|Smoothing MAs Type: EMA|SMA|
|v_input_11|3|Smoothing MAs Length|
|v_input_12|true|Trend Filter|
|v_input_13|200|Trend Filter MA Period|
|v_input_14|0|Trend Filter MA Type: EMA|SMA|
|v_input_15|false|Volatility Filter|
|v_input_16|0.0003|Delta Slopes EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-09 00:00:00
end: 2023-10-16 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
// strategy(title="Slopes",initial_capital=1000, default_qty_type=strategy.percent_of_equity, commission_type=strategy.commission.percent, commission_value=0.06, slippage = 2, default_qty_value=30, overlay=false)

//definizione input

start = timestamp(input(2018, "start year"), input(1, "start month"), input(1, "start day"), 00, 00)
end = timestamp(input(2020, "end year"), input(1, "end month"), input(1, "end day"), 00, 00)

average = input (title="Source MA Type", type=input.string, defval="EMA",options=["EMA","SMA"])

len1=input(130,title="Fast MA Length")
len2=input(400,title="Slow MA Length")

smoothingavg = input (title="Smoothing MAs Type", type=input.string, defval="EMA",options=["EMA","SMA"])
smoothingavglen = input (3,title="Smoothing MAs Length")

trendfilter=input(true,title="Trend Filter")
trendfilterperiod=input(200,title="Trend Filter MA Period")
trendfiltertype=input (title="Trend Filter MA Type", type=input.string, defval="EMA",options=["EMA","SMA"])

volatilityfilter=input(false,title="Volatility Filter")
volatilitydelta=input(0.0003,step=0.0001,title="Delta Slopes EMA")

//variabili

m1 = if average == "EMA" 
    ema(close,len1)
else
    sma(close,len1)

m2=if average == "EMA" 
    ema(close,len2)
else
    sma(close,len2)

slp1=(m1-m1[1])/m1
slp2=(m2-m2[1])/m2

e1=if smoothingavg == "EMA" 
    ema(slp1,smoothingavglen)
else
    sma(slp1,smoothingavglen)

e2=if smoothingavg == "EMA" 
    ema(slp2,smoothingavglen)
else
    sma(slp2,smoothingavglen)

plot(e1,color=color.yellow)
plot(e2,color=color.red)
//plot (abs(e1-e2),color=color.white)
//plot (ema(e1-e2,9),color=color.yellow)

//variabili accessorie e condizioni

TrendConditionL=if trendfiltertype =="EMA"
    close>ema(close,trendfilterperiod)
else
    close>sma(close,trendfilterperiod)
    
TrendConditionS=if trendfiltertype =="EMA"
    close<ema(close,trendfilterperiod)
else
    close<sma(close,trendfilterperiod)
    
VolatilityCondition = abs(e1-e2) > volatilitydelta

ConditionEntryL= if trendfilter == true
    if volatilityfilter == true
        e1>e2 and TrendConditionL and VolatilityCondition
    else
        e1>e2 and TrendConditionL
else
    if volatilityfilter == true
        e1>e2 and VolatilityCondition
    else 
        e1>e2

ConditionEntryS= if trendfilter == true
    if volatilityfilter == true
        e1<e2 and TrendConditionS and VolatilityCondition
    else 
        e1<e2 and TrendConditionS
else
    if volatilityfilter == true
        e1<e2 and VolatilityCondition
    else
        e1<e2

ConditionExitL=crossunder(e1,e2)
ConditionExitS=crossover(e1,e2)

if true
    if ConditionExitS
        if strategy.position_size < 0
            strategy.close("SLPShort")

if true
    if ConditionExitL
        if strategy.position_size > 0
            strategy.close("SLPLong")

if true
    if ConditionEntryL
        strategy.entry ("SLPLong",long=true)
        
if true
    if ConditionEntryS 
        strategy.entry("SLPShort",long=false)
```

> Detail

https://www.fmz.com/strategy/429505

> Last Modified

2023-10-17 17:02:30
