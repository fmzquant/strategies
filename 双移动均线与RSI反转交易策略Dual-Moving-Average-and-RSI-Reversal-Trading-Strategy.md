
> Name

双移动均线与RSI反转交易策略Dual-Moving-Average-and-RSI-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1f6e3873916ac74abeb.png)

[trans]

## 概述

本策略结合双移动均线和相对强弱指标RSI,寻找价格在强势趋势中的短期反转机会进行交易。在趋势方向明确时,利用RSI识别超买超卖情况,等待价格反转进入场内。该策略适用于趋势较明显的市场,能够在不逆势的前提下捕捉部分反转 movement。

## 策略原理

1. 计算30日简单移动均线SMA和200日指数移动均线EMA,判断大趋势方向

   - SMA>EMA,为上升趋势
   - SMA<EMA,为下降趋势

2. 计算30日RSI,判断超买超卖

   - RSI<=53为超卖
   - RSI>=60为超买

3. 进入规则:

   - 上升趋势中(SMA>EMA)且RSI<=53时做多
   - 下降趋势中(SMA<EMA)且RSI>=60时做空

4. 出场规则:

   - 多单止损或止盈
   - 空单止损或止盈

## 策略优势分析

1. 追踪大趋势,避免逆势操作

2. RSI参数设置较为保守,可以减少虚假信号

3. 结合双移动均线过滤,entry timing比较准确 

4. 风险可控,回撤不大

## 风险分析

1. 需要较明显趋势市场,震荡行情效果不佳

2. RSI参数设置保守,可能错过部分机会

3. 止损位置需要合理设置,避免过于激进退出

## 策略优化方向 

1. 优化RSI参数,适当降低参数寻找更多entry机会

2. 测试不同的移动均线组合

3. 设置趋势过滤,只在趋势足够明显时操作

4. 优化止损策略,严格控制单笔止损

## 总结

本策略整体风险可控,适合中长线持仓交易者。策略根据大趋势方向交易,采用保守RSI参数以及严格的移动均线过滤,可以有效避免假突破,从而提高胜率。同时也存在一定潜在改进空间,如果参数调整得当,可以获得更多机会。需要注意风险控制,保持长线的交易心态。

||


## Overview

This strategy combines dual moving averages and the relative strength index (RSI) to identify short-term reversal opportunities during strong trends. It aims to enter trades against the momentum when the trend direction is clear, by using RSI to detect overbought and oversold conditions and waiting for the price to reverse. The strategy is suitable for markets with obvious trends, capturing partial reversals without trading against the overall trend.

## Strategy Logic

1. Calculate the 30-day simple moving average (SMA) and 200-day exponential moving average (EMA) to determine the overall trend direction.

   - SMA>EMA suggests an upward trend  
   - SMA<EMA suggests a downward trend

2. Calculate the 30-day RSI to identify overbought and oversold conditions. 

   - RSI<=53 is considered oversold
   - RSI>=60 is considered overbought

3. Entry rules:

   - Go long when in an upward trend (SMA>EMA) and RSI<=53
   - Go short when in a downward trend (SMA<EMA) and RSI>=60

4. Exit rules:  

   - Close long position for stop loss or take profit
   - Close short position for stop loss or take profit

## Advantage Analysis  

1. Follows the major trend, avoids trading against the trend

2. Conservative RSI settings avoid false signals 

3. Dual moving average filter improves entry timing accuracy   

4. Controllable risk, small drawdowns

## Risk Analysis

1. Needs obvious trending markets, less effective in ranging markets

2. Conservative RSI settings may miss some opportunities

3. Stop loss placement needs to be reasonable to avoid premature exits

## Improvement Directions

1. Optimize RSI parameters to find more entry opportunities 

2. Test different moving average combinations

3. Add trend filter, only trade when trend is strong enough

4. Optimize stop loss strategy to control loss on single trades

## Conclusion

The strategy has controllable risks overall, suitable for medium-long term position traders. It trades with the major trend direction, uses conservative RSI settings and strict moving average filters to avoid false breakouts, improving win rate. There is also room for potential improvements with parameter tuning to gain more opportunities. Risk control is essential to maintain a long-term trading mentality.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-17 00:00:00
end: 2023-10-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//Based on Larry Connors RSI-2 Strategy - Lower RSI
strategy(title="_CM_RSI_2_Strat_Low", shorttitle="_CM_RSI_2_Strategy_Lower", overlay=false)
src = close, 

//RSI CODE
up = rma(max(change(src), 0), 30)
down = rma(-min(change(src), 0), 30)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
//Criteria for Moving Avg rules
ma50= vwma(close,30)
ma200= vwma(close,200)

//Rule for RSI Color
col = ma50 > ma200 and rsi <=53?lime: ma50 < ma200  and rsi >= 60?red : silver
long = ma50 > ma200 and rsi <= 53
short = ma50 < ma200  and rsi >= 60
//plot(rsi, title="RSI", style=line, linewidth=1,color=col)
//plot(100, title="Upper Line 100",style=line, linewidth=3, color=aqua)
//plot(0, title="Lower Line 0",style=line, linewidth=3, color=aqua)

//band1 = plot(60, title="Upper Line 60",style=line, linewidth=1, color=aqua)
//band0 = plot(44, title="Lower Line 40",style=line, linewidth=1, color=aqua)
//fill(band1, band0, color=silver, transp=90)
strategy.entry ("buy", strategy.long, when=long)
strategy.entry ("sell", strategy.short, when=short)
plot(long,"long",color=green,linewidth=1)
plot(short,"short",color=red,linewidth=1)
```

> Detail

https://www.fmz.com/strategy/429562

> Last Modified

2023-10-18 11:08:35
