
> Name

基于阿隆指标的量化策略Aroon-Indicator-Based-Quantitative-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略仅使用阿隆指标来判断市场趋势方向,以发出简单的买入和卖出信号。它结合阿隆指标的趋势捕捉能力,目标是开发一个纯粹依赖该指标判断的机械交易系统。

## 策略原理

1. 计算7日内最高价所在的柱形和最低价所在的柱形

2. 计算最高价柱形和总柱形数量的比值作为上轨

3. 计算最低价柱形和总柱形数量的比值作为下轨 

4. 当上轨值大于下轨值时产生买入信号

5. 当下轨值大于上轨值时产生卖出信号

6. 在策略参数中控制具体的入场方向

7. 在指定的时间段内完成订单的开平

## 优势分析

1. 完全依赖阿隆指标判断,实现纯粹的指标驱动交易

2. 指标参数简单,容易理解和优化

3. 可灵活选择做多做空方向,适应不同品种

4. 可自定义时间段进行回测或实盘交易

5. 操作信号非常清晰,容易掌握和执行

## 风险分析

1. 作为单一指标,容易产生错误信号

2. 无法 accurattly 判定市场真实趋势中涨和跌的力度

3. 存在一定的滞后,无法及时捕捉转折

4. 无法根据市场变化进行动态调整

5. 存在一定程度的回撤风险

## 优化方向

1. 测试不同的品种和周期参数

2. 增加过滤条件,提高信号质量

3. 结合趋势指标,确定大趋势方向

4. 开发动态出场机制,根据趋势调整

5. 优化参数,进行多组指标组合测试

6. 增加仓位和风险管理

## 总结

该策略通过阿隆指标提供简单的趋势判断买卖信号。在避免误导信号及风险控制方面还有优化空间。但其思路简单清晰,可作为量化交易的基础策略进行改进。整体来说,该策略可实用性强,值得进一步测试和优化。

|| 

## Overview 

This strategy purely uses the Aroon indicator to determine market trend direction for generating simple buy and sell signals. It combines Aroon's trend capturing ability to build a mechanical trading system purely based on the indicator.

## Strategy Logic

1. Calculate bars with highest high and lowest low over 7 periods.

2. Calculate ratio of highest high bar over total bars as upper line.

3. Calculate ratio of lowest low bar over total bars as lower line.

4. Generate buy signal when upper line is greater than lower line.

5. Generate sell signal when lower line is greater than upper line.

6. Control entry directions via strategy parameters. 

7. Open and close orders within specified timeframe.

## Advantage Analysis

1. Purely indicator driven trading based solely on Aroon.

2. Simple indicator parameters, easy to understand and optimize.

3. Flexible selection of long/short direction for different instruments.

4. Customizable timeframe for backtest and live trading.

5. Clear trading signals, easy to grasp and execute.

## Risk Analysis

1. Prone to false signals as a single indicator. 

2. Cannot accurately judge strength of uptrends/downtrends.

3. Has some lag, unable to timely capture reversals. 

4. Cannot dynamically adjust based on market changes.

5. Possibility of drawdown risks.

## Optimization Directions 

1. Test across different instruments and timeframes.

2. Add filters to improve signal quality. 

3. Incorporate trend indicators to determine overall trend.

4. Develop dynamic exits based on evolving trends.

5. Optimize parameters and test combinations. 

6. Add position sizing and risk management.

## Summary

This strategy provides simple trend signals based on Aroon. There is room for improvement in avoiding misleading signals and risk control. But the logic is simple and clear, serving as basic quant strategy for enhancement. Overall a practical strategy worth further testing and optimization.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|7|length|
|v_input_4|1900|From Year|
|v_input_5|2100|To Year|
|v_input_6|true|From Month|
|v_input_7|12|To Month|
|v_input_8|true|From Day|
|v_input_9|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-19 00:00:00
end: 2023-09-18 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018
//@version=2

strategy(title = "Noro's Aroon Strategy v1.0", shorttitle = "Aroon str 1.0", overlay = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(false, defval = false, title = "Short")
length = input(7, defval = 7, minval = 1, maxval = 1000)
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From Day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To Day")

//Aroon
upper = 200 * (highestbars(high, length+1) + length)/length
lower = 200 * (lowestbars(low, length+1) + length)/length
plot(upper, color=#FF6A00)
plot(lower, color=#0094FF)

//Signals
up = upper > lower
dn = upper < lower

//Trading
if up
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)
    
if dn
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
 
if true
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/427258

> Last Modified

2023-09-19 15:47:21
