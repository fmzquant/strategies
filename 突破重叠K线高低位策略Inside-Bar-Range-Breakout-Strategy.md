
> Name

突破重叠K线高低位策略Inside-Bar-Range-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8b06d23033c421585d.png)

[trans]

## 概述

突破重叠K线高低位策略是根据重叠K线形态进行交易决策的价格行动策略。该策略发生在当前K线的价差范围小于前一根K线的情况下,表明市场正在蓄势整理或犹豫不决。当价格突破向上或向下突破前一根K线的最高价或最低价时,这就提供了可能的入场信号。  

## 策略原理

该策略使用以下指标和变量:

- 平均真实波幅(ATR):使用ATR函数计算的过去N根K线的平均真实波幅。
- 价差Range:当前K线的最高价与最低价之差。  
- insideBar:布尔变量,如果当前K线的价差Range小于前一根K线,则为真,表示发生了重叠K线。
- 向上突破:布尔变量,如果收盘价高于前一根K线的最高价,则为真,表示发生了向上突破。
- 向下突破:布尔变量,如果收盘价低于前一根K线的最低价,则为真,表示发生了向下突破。  
- 向上流动性:过去N根K线中的最高价,代表 möglich的电阻位置。 
- 向下流动性:过去N根K线中的最低价,代表可能的支撑位置。

入场决策基于价差Range和前一根K线最高最低价的突破。具体来说,发生向上突破并且当前K线最低价高于向下流动性时,产生多头入场信号;发生向下突破并且当前K线最高价低于向上流动性时,产生空头入场信号。

止损使用ATR的倍数乘以当前价差停损。止盈使用ATR倍数乘以当前价差止盈。

## 优势分析

该策略具有以下优势:

1. 利用重叠K线整理行情,蓄势向一方突破的交易机会。
2. 结合突破方向和流动性位,避免被套。 
3. mStop损和止盈清晰,容易实现。
4. 方向性强,突破后的蓄势继续行情中实现盈利目标的概率大。

## 风险分析

该策略也存在以下风险:  

1. 突破失败,被套。采用合理的止损水平,避免承受大额损失。
2. 行情剧烈波动,止损被击穿。调整ATR周期,确保止损距离合理。 
3. 流动性位判断失误,选错方向入场。优化流动性位参数,细化入场条件。
4. 反转失败,无法实现盈利目标。适当缩小止盈倍数,保证止盈水平合理。

## 优化方向  

该策略可从以下方面进行优化:

1. 最优化ATR参数,寻找最合适的ATR周期参数。
2. 测试不同的止损倍数,确定合理的止损距离。
3. 测试不同的止盈倍数,平衡获利大小和成交概率。
4. 优化流动性位参数,提高入场的准确率。
5. 增加其他过滤条件,如交易量,优化入场时机。
6. 结合趋势指标,采用趋势跟踪方法。

## 总结  

突破重叠K线高低位策略,利用行情蓄势准备和突破原理,在价格突破前一根K线价差范围时入场。结合流动性位避免被套风险。止损止盈设置合理,突破后可顺势运行达到盈利目标。该策略有望在中间周期获得较好的交易表现。通过参数优化和过滤条件优化,可以进一步扩大策略优势,提高系统稳定性。

||

## Overview  

The inside bar range breakout strategy is a price action strategy that makes trading decisions based on inside bar patterns. It occurs when the range of the current bar, measured by the difference between high and low, is smaller than that of the previous bar, indicating consolidation or indecision in the market. A breakout above or below the previous bar's high or low provides a potential entry signal in the direction of the breakout.   

## Strategy Logic

The strategy utilizes the following indicators and variables:  

- Average True Range (ATR): The average true range over the past N bars calculated using the ATR function.  
- Range: The difference between high and low of the current bar.
- insideBar: A boolean variable that is true if Range of current bar is smaller than previous bar, indicating an inside bar.
- breakoutUp: A boolean variable that is true if close is higher than previous bar's high, indicating an upward breakout. 
- breakoutDown: A boolean variable that is true if close is lower than previous bar's low, indicating a downward breakout.   
- liquidityUp: Highest high over past N bars, representing a potential resistance area.  
- liquidityDown: Lowest low over past N bars, representing a potential support area.
  
Entry decisions are based on Range breakouts beyond previous bar's high/low. Specifically, long entry when upward breakout happens and current low is above liquidityDown, and short entry when downward breakout happens and current high is below liquidityUp.
  
Stop loss uses ATR multiplied by Range. Take profit uses ATR multiplied by Range.
  
## Advantage Analysis

The advantages of this strategy include:
  
1. Captures trading opportunity from range expansion after inside bar consolidation. 
2. Prevents getting trapped combining breakout direction and liquidity levels.  
3. Clear stop loss and take profit rules, easy to implement.  
4. Strong directionality, high chance of reaching profit target after momentum breakout.
 
## Risk Analysis
  
Risks of this strategy:  

1. Failed breakout resulting in getting trapped. Use reasonable stop loss to limit loss amount.
2. Volatile market causing stop loss being hit. Adjust ATR period to ensure proper stop distance.  
3. Inaccurate liquidity level leading to wrong entry. Optimize lookback period to refine entry criteria.  
4. Failed reversal unable to reach profit target. Reduce take profit multiplier for sensible target. 
 
## Optimization Directions
 
Areas of optimization:  

1. Find optimum ATR period for maximum performance.  
2. Test different stop loss multipliers for ideal stop distance.
3. Test different take profit multipliers to balance size and probability.  
4. Optimize lookback period for better accuracy on liquidity levels.
5. Add filters like volume to improve entry timing.  
6. Incorporate trend indicators to add trend following.
 
## Summary

The inside bar range breakout strategy capitalizes on range expansion from consolidation by entering when price breaks out of previous bar's range. Liquidity levels avoid getting trapped. Reasonable stop loss and take profit settings allow riding the momentum after breakout to reach profit target. The strategy can yield good results on intermediate time frames. Further enhancing advantages and system robustness can be achieved through parameter optimization and improving entry filters.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|Lookback Period|
|v_input_float_1|1.5|ATR Multiplier|
|v_input_int_2|14|ATR Length|
|v_input_float_2|2|Stop Loss Multiplier|
|v_input_float_3|3|Take Profit Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-04 00:00:00
end: 2023-12-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ilikelyrics560

//@version=5
strategy("Inside Bar Range Breakout Strategy", overlay=true)

// Inputs
lookback = input.int(20, "Lookback Period", minval=1)
atrMult = input.float(1.5, "ATR Multiplier", step=0.1)
atrLen = input.int(14, "ATR Length", minval=1)
slMult = input.float(2, "Stop Loss Multiplier", step=0.1)
tpMult = input.float(3, "Take Profit Multiplier", step=0.1)

// Variables
atr = ta.atr(atrLen)
Range = high - low 
insideBar = Range < Range[1]
breakoutUp = close > high[1]
breakoutDown = close < low[1]
liquidityUp = ta.highest(high, lookback)
liquidityDown = ta.lowest(low, lookback)
longEntry = breakoutUp and low > liquidityDown
shortEntry = breakoutDown and high < liquidityUp
longExit = close < low[1] 
shortExit = close > high[1]

// Plotting
plot(liquidityUp, "Liquidity Up", color.new(color.green, 30), 1)
plot(liquidityDown, "Liquidity Down", color.new(color.red, 30), 1)
bgcolor(longEntry ? color.new(color.green, 30) : na, title="Long Entry")
bgcolor(shortEntry ? color.new(color.maroon, 30) : na, title="Short Entry")

// Trading
if (longEntry)
    strategy.entry("Long", strategy.long)
    strategy.exit("Long Exit", "Long", stop=low - slMult * atr, limit=high + tpMult * atr)

if (shortEntry)
    strategy.entry("Short", strategy.short)
    strategy.exit("Short Exit", "Short", stop=high + slMult * atr, limit=low - tpMult * atr)
```

> Detail

https://www.fmz.com/strategy/434989

> Last Modified

2023-12-11 15:16:53
