
> Name

ATR趋势跟踪策略ATR-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用平均真实波幅(ATR)来捕捉价格趋势,并以ATR来设置止损位,实现趋势跟踪。

## 策略原理

1. 计算ATR值。

2. 根据ATR值确定止损位。

3. 当价格突破止损线时,做多做空。

4. 通过动态调整止损位锁定利润。

## 策略优势 

- 使用ATR自动调整止损,无需人工干预
- 策略简单直观,容易实现
- 可避免被套,及时止损
- 可利用趋势运行盈利
- 可通过调整ATR参数控制交易频率

## 策略风险

- ATR参数设定不当可导致过于Loose或Tight  
- 无法有效识别趋势结束
- 存在一定时间滞后
- 可能因反转损失部分利润

## 优化方向

- 优化ATR周期参数
- 测试不同的ATR倍数作为止损距离
- 结合其他指标识别趋势反转
- 尝试机器学习参数优化
- 考虑附加止盈策略

## 总结

该策略利用ATR有效捕捉趋势,并动态调整止损实现利润锁定。优化参数设置可以提高策略表现。但ATR滞后问题无法完全规避。整体而言,该策略是一个简单实用的趋势跟踪解决方案。

|| 

## Overview

This strategy uses Average True Range (ATR) to capture price trends and sets stops based on ATR for trend following.

## How it Works

1. Calculate ATR value. 

2. Determine stop loss level based on ATR.

3. Enter long/short when price breaks stop level.  

4. Lock in profits by adjusting stops dynamically.

## Advantages

- ATR automatically adjusts stops, no manual intervention needed
- Simple and intuitive logic, easy to implement
- Helps avoid being trapped, timely stop loss
- Profits from riding trends  
- Trade frequency controlled via ATR parameters

## Risks

- Poor ATR parameters can cause stops to be too Loose or Tight
- Unable to effectively identify trend end  
- Some time lag exists
- Reversals may cut profits

## Optimization Directions 

- Optimize ATR period parameter
- Test different ATR multiples for stop distance
- Add filters to detect trend reversal
- Explore machine learning for parameter optimization
- Consider additional profit taking mechanisms

## Conclusion

The strategy effectively catches trends using ATR and locks in profits with dynamic stops. Fine tuning parameters can improve performance. But ATR lag cannot be completely eliminated. Overall a simple and practical trend following solution.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|nATRPeriod|
|v_input_2|3.5|nATRMultip|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

strategy(title="ATR Strategy", overlay = true,  commission_type=strategy.commission.percent,commission_value=0.075)
//credits to HPotter for the orginal code
nATRPeriod = input(5)
nATRMultip = input(3.5)
xATR = ta.atr(nATRPeriod)
nLoss = nATRMultip * xATR
xATRTrailingStop = iff(close > nz(xATRTrailingStop[1], 0) and close[1] > nz(xATRTrailingStop[1], 0), math.max(nz(xATRTrailingStop[1]), close - nLoss),
                    iff(close < nz(xATRTrailingStop[1], 0) and close[1] < nz(xATRTrailingStop[1], 0), math.min(nz(xATRTrailingStop[1]), close + nLoss), 
                        iff(close > nz(xATRTrailingStop[1], 0), close - nLoss, close + nLoss)))
pos =	iff(close[1] < nz(xATRTrailingStop[1], 0) and close > nz(xATRTrailingStop[1], 0), 1,
	    iff(close[1] > nz(xATRTrailingStop[1], 0) and close < nz(xATRTrailingStop[1], 0), -1, nz(pos[1], 0))) 
color = pos == -1 ? color.red: pos == 1 ? color.green : color.blue 
plot(xATRTrailingStop, color=color, title="ATR Trailing Stop")

barbuy = close > xATRTrailingStop 
barsell = close < xATRTrailingStop 

strategy.entry("Long", strategy.long, when = barbuy) 
strategy.entry("Short", strategy.short, when = barsell) 

barcolor(barbuy? color.green:color.red)


```

> Detail

https://www.fmz.com/strategy/427470

> Last Modified

2023-09-21 15:13:47
