
> Name

动态RSI震荡操作策略Dynamic-RSI-Oscillation-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/117825ac55ae3bcae6d.png)
[trans]


## 概述

本策略结合了动态支撑/阻力位和相对强弱指标RSI,设定RSI超买超卖范围,在突破动态支撑/阻力位时判断RSI是否进入超买超卖区域,从而产生买入和卖出信号。

## 原理

**1. 动态支撑/阻力位**

使用security函数获取收盘价作为动态支撑/阻力位,当价格突破此动态位时产生交易信号。

**2. RSI指标**

计算一定周期内的平均涨幅和平均跌幅,通过比较两者生成RSI值,判断是否进入超买超卖区域。

**3. 交易信号**

价格突破动态位时,如果RSI未进入超买超卖区域,产生买入/卖出信号。如果已进入,则忽略突破产生的信号。

**4. 退出信号** 

价格回落到动态位时平仓,或RSI回到正常区域时平仓。

## 优势分析

1. 利用动态支撑/阻力位判断趋势方向,提高获利概率。

2. RSI指标过滤假突破,避免乱入。

3. 结合趋势和指标,适用于不同行情。

4. 规则清晰易于实施。

## 风险及解决方案

1. 动态位可能出现多次测试突破,造成错误信号,可适当放宽突破幅度过滤。

2. 单一RSI指标可能产生误判,可引入其他指标进行组合过滤。 

3. 震荡行情中可能出现频繁开仓平仓,交易成本较高,可适当放宽RSI正常值范围,减少交易频率。

4. 参数设置不当可能导致漏单或乱单,应根据不同品种合理选择参数。

## 优化方向

1. 利用机器学习技术自动优化RSI参数。

2. 增加止损止盈策略,以锁定利润和减少亏损。

3. 结合更多指标进行组合过滤,提高策略稳定性。 

4. 增加波动率指标,在低波动时降低仓位。

5. 优化仓位数算法,使仓位动态调整,适应不同市场环境。

## 总结

本策略结合趋势判断和指标过滤,能有效识别价格在关键水平附近的破坏,在控制风险的前提下获取较高盈利。通过进一步优化参数设置、增加止损止盈、引入更多指标等,可将策略的稳定性和适应性进一步提升,使其能够在更广泛的市场中获得稳定收益。

||


## Overview

This strategy combines dynamic support/resistance levels and the relative strength index (RSI) indicator. It sets overbought/oversold thresholds for RSI and generates buy/sell signals when price breaks the dynamic support/resistance levels while RSI is not in the overbought/oversold area.

## Principles 

**1. Dynamic Support/Resistance**

Use the security function to get closing price as dynamic support/resistance levels. Trading signals are generated when price breaks through these dynamic levels.

**2. RSI Indicator** 

Calculate the average gain and average loss over a certain period to generate RSI values and determine if RSI reaches the overbought/oversold area.

**3. Trading Signals**

When price breaks the dynamic levels, if RSI is not in the overbought/oversold area, buy/sell signals are generated. Otherwise, the breakout signals are ignored.

**4. Exit Signals**

Close positions when price falls back to the dynamic level, or when RSI returns to normal range.

## Advantage Analysis

1. Use dynamic support/resistance to determine trend direction for higher winning rate.

2. RSI filters out false breakouts and avoids false entries. 

3. Combining trend and indicator makes the strategy adaptable to different market conditions.

4. Simple and clear rules make it easy to implement.

## Risks and Solutions

1. Multiple tests of dynamic levels may generate false signals. Widen the breakout range to filter.

2. Solo RSI may cause misjudgement. Add other indicators for combo filtering.

3. Frequent trading in range-bound market leads to higher costs. Widen RSI's normal range to lower frequency. 

4. Improper parameter settings lead to missing or false signals. Optimize parameters based on different assets.

## Optimization Directions

1. Use machine learning to auto optimize RSI parameters.

2. Add stop loss/profit taking strategy to lock in profits and reduce losses.

3. Incorporate more indicators for combo filtering to improve stability.

4. Add volatility indicator to lower position size when volatility is low. 

5. Optimize position sizing algorithm to dynamically adjust positions for different market environments.

## Summary

This strategy combines trend judgment and indicator filtering to effectively identify trend reversal around key levels while controlling risks. Further optimizations on parameter tuning, stop loss/profit taking, more indicators etc. can improve its stability and adaptability to generate steady profits in a wider range of markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Capital, %|
|v_input_4|W|timeframe 1|
|v_input_5_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_6|true|antipila|
|v_input_7|true|color filter|
|v_input_8|7|RSI Period|
|v_input_9|30|RSI Limit|
|v_input_10|1900|From Year|
|v_input_11|2100|To Year|
|v_input_12|true|From Month|
|v_input_13|12|To Month|
|v_input_14|true|From day|
|v_input_15|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-26 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's Levels+RSI Strategy v1.0", shorttitle = "Levels+RSI str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 3)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
tf = input('W', title = "timeframe 1")
src = input(ohlc4, "Source")
ap = input(true, defval = true, title = "antipila")
cf = input(true, defval = true, title = "color filter")
rsiperiod = input(7, defval = 7, minval = 2, maxval = 100, title = "RSI Period")
rsilimit = input(30, defval = 30, minval = 1, maxval = 50, title = "RSI Limit")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Level
level = request.security(syminfo.tickerid, tf, src[1])
plot(level, linewidth = 3, color = silver)

//RSI
uprsi = rma(max(change(close), 0), rsiperiod)
dnrsi = rma(-min(change(close), 0), rsiperiod)
rsi = dnrsi == 0 ? 100 : uprsi == 0 ? 0 : 100 - (100 / (1 + uprsi / dnrsi))

//Level Signals
ls = close > level and ap == false ? true : low > level ? true : false
up1 = strategy.position_size == 0 and ls and (close < open or cf == false)
exit1 = close < level and ap == false ? true : high < level ? true : false 

//RSI Signal

up2 = rsi < rsilimit and (close < open or cf == false)
exit2 = rsi > rsilimit and ls == false

//Trading
lot = strategy.position_size != strategy.position_size[1] ? strategy.equity / close * capital / 100 : lot[1]

if up1 or up2 
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot)
    
if  (exit1 and rsi > rsilimit) or exit2
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430874

> Last Modified

2023-11-02 16:04:07
