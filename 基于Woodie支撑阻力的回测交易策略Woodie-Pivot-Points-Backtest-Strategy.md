
> Name

基于Woodie支撑阻力的回测交易策略Woodie-Pivot-Points-Backtest-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略利用Woodie模型计算支撑阻力位,进行突破回测交易。属于经典的支撑阻力突破类策略。

## 策略原理

1. 根据昨日高低收价格计算本期平衡点及上下轨。

2. 当价格从上方突破平衡点时,进行做多。

3. 当价格从下方突破平衡点时,进行做空。

4. 可选择反向交易信号。

5. 用不同颜色标记交易信号。

## 优势分析

1. Woodie模型计算简单直观。

2. 支撑阻力突破是常见的交易手法。

3. 可视化的支撑阻力位和信号标记。

4. 默认参数简单实用。

5. 代码易理解,适合修改优化。

## 风险分析

1. 可能出现突破后的假突破。

2. 无法有效设置止损止盈。

3. 模型及参数设置不当影响效果。

4. 无法区分趋势和盘整。

5. 信号可能时效性不强。

## 优化方向

1. 测试不同周期参数寻找最优参数。

2. 增加趋势判断指标进行过滤。

3. 加入止损止盈逻辑进行风险控制。

4. 评估突破后的回调情况产生继续信号。

5. 研究如何判断突破的力度效果。

6. 考虑与其他因子组合进行验证。

## 总结

该策略采用Woodie模型的支撑阻力位进行突破交易。优化参数设置、加入止损止盈等可以提高策略稳定性,将其打造成一个可靠的短期交易系统。

||

## Overview

This strategy uses Woodie model to calculate pivots and trade breakouts for backtest. It is a classic pivot breakout strategy.

## Strategy Logic

1. Calculate current period pivot and bands using previous period high, low and close.

2. Go long if price breaks above pivot from below.

3. Go short if price breaks below pivot from above.

4. Option to trade reverse signals. 

5. Color code different trade signals.

## Advantages

1. Woodie model calculation is simple and intuitive.

2. Trading pivot breakouts is a common technique. 

3. Visualized pivots and signal markings.

4. Simple and practical default parameters. 

5. Code is easy to understand and modify.

## Risks

1. Risks of false breakouts after initial breakout.

2. No effective way to set stops and exits.

3. Incorrect model and parameters negatively affect performance.

4. Fails to differentiate trends and ranges. 

5. Signals may not be timely.

## Enhancement

1. Test different period parameters for optimum values.

2. Add trend filter for additional validation.

3. Incorporate stop loss and take profit for risk control.

4. Assess pullbacks after breakouts for continuing signals.

5. Research ways to gauge the strength of breakouts. 

6. Consider combining with other factors for confirmation.

## Conclusion

This strategy trades Woodie pivot breakouts. Optimizing parameters, adding stops and exits can improve stability for a reliable short-term system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|width|
|v_input_2|false|Trade reverse|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-13 00:00:00
end: 2023-02-22 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 22/08/2018
// Simply input the vales of the high, low and closing price of the previous 
// period to calculate the Woodie pivot point and the associated resistance 
// and support levels for the present period.
//
// You can change long to short in the Input Settings
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="Woodie Pivot Points Backtest", overlay = true)
width = input(2, minval=1)
xHigh  = security(syminfo.tickerid,"D", high[1])
xLow   = security(syminfo.tickerid,"D", low[1])
xClose = security(syminfo.tickerid,"D", close[1])
reverse = input(false, title="Trade reverse")
xPP = (xHigh+xLow+(xClose*2)) / 4
pos = iff(close[1] < xPP[1] and close > xPP, 1,
       iff(close < xPP, -1, nz(pos[1], 0))) 
possig = iff(reverse and pos == 1, -1,
          iff(reverse and pos == -1, 1, pos))       
if (possig == 1) 
    strategy.entry("Long", strategy.long)
if (possig == -1)
    strategy.entry("Short", strategy.short)	   	    
barcolor(possig == -1 ? red: possig == 1 ? green : blue ) 
plot(xPP, color=blue, title="WPP", style = circles, linewidth = width)
```

> Detail

https://www.fmz.com/strategy/427397

> Last Modified

2023-09-20 17:08:11
