
> Name

平滑RSI回测策略V2Smoothed-RSI-Backtesting-Strategy-V2

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是John Ehlers开发的RSI指标的改进版本。其最大优势是在降低滞后性的同时平滑RSI曲线。

## 策略原理

1. 计算价格的6条平均值xValue。

2. 根据xValue计算上涨总和CU23和下跌总和CD23。

3. 计算Normalized RES值nRes,即CU23/(CU23 + CD23)。

4. 比较nRes与上下阈值,生成多空信号。

5. 可选反向交易。

6. 根据信号进行多空交易。

## 策略优势

- 平滑RSI曲线,减少误报信号
- 可调参数 finding optimal values
- 可反向交易,适应多种市场情况
- 简单直观的实现逻辑

## 策略风险

- 参数优化不当可能导致过多错误信号
- 存在一定滞后,可能错过短线反转
- 反向交易增加了交易频率和成本

## 优化方向

- 优化参数以找到最佳参数组合
- 结合其他指标过滤误报信号
- 添加止损逻辑控制单笔损失
- 进行回测找出最佳持仓周期
- 尝试利用机器学习进行参数优化

## 总结

该策略通过改进RSI指标计算方式有效平滑了曲线,在一定程度上减少了误报信号。优化参数设置和添加其他过滤条件可以进一步提高策略表现。但作为倾向型系统,无法完全避免滞后问题。整体来说,该策略是一个简单可靠的突破系统,值得进一步研究优化。

|| 

## Overview

This strategy is an enhanced version of the RSI indicator developed by John Ehlers. Its main advantage is smoothing the RSI curve while minimizing lag.

## How it Works 

1. Calculate price average xValue using 6 bars.

2. Calculate upward sum CU23 and downward sum CD23 based on xValue.

3. Compute normalized RES value nRes as CU23/(CU23 + CD23).

4. Generate long/short signals by comparing nRes to thresholds.

5. Option to reverse signals. 

6. Enter long/short based on signals.

## Advantages

- Smoothed RSI curve reduces false signals
- Adjustable parameters for finding optimal values
- Reverse trading adaptable to various market conditions
- Simple and intuitive logic

## Risks

- Poor parameter optimization can cause excessive false signals
- Some lag remains, may miss short reversals  
- Reverse trading increases trade frequency and costs

## Optimization Directions

- Optimize parameters to find best combination
- Filter signals with additional indicators 
- Add stop loss logic to control single loss
- Backtest to find optimal holding period
- Explore machine learning for parameter optimization

## Conclusion

The strategy effectively smoothes the RSI curve by enhancing its calculation, reducing false signals to some degree. Further filtering and parameter optimization can improve performance. But some lag persists as a momentum system. Overall, a simple and reliable breakout system worth further research and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|Length|
|v_input_2|0.8|TopBand|
|v_input_3|0.2|LowBand|
|v_input_4|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-13 00:00:00
end: 2023-09-19 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 20/11/2017
// This is new version of RSI oscillator indicator, developed by John Ehlers. 
// The main advantage of his way of enhancing the RSI indicator is smoothing 
// with minimum of lag penalty. 
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Smoothed RSI Backtest ver.2")
Length = input(10, minval=1)
TopBand = input(0.8, step=0.01)
LowBand = input(0.2, step=0.01)
reverse = input(false, title="Trade reverse")
hline(TopBand, color=red, linestyle=line)
hline(LowBand, color=green, linestyle=line)
xValue = (close + 2 * close[1] + 2 * close[2] + close[3] ) / 6
CU23 = sum(iff(xValue > xValue[1], xValue - xValue[1], 0), Length)
CD23 = sum(iff(xValue < xValue[1], xValue[1] - xValue, 0), Length)
nRes = iff(CU23 + CD23 != 0, CU23/(CU23 + CD23), 0)
pos = iff(nRes > TopBand, 1,
	   iff(nRes < LowBand, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))	   
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue )  
plot(nRes, color=blue, title="Smoothed RSI")
```

> Detail

https://www.fmz.com/strategy/427467

> Last Modified

2023-09-21 15:02:06
