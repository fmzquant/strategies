
> Name

顺势而为RSI策略Go-With-The-Trend-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略结合了关键支撑阻力位反转策略和相对强弱指数(RSI)指标,在支撑阻力位形成时检查看RSI指标信号,以发现潜在趋势反转机会。

## 策略原理

该策略首先计算得到关键的支撑阻力位,即通过查看左右两端若干K线,得到最高价的支撑位和最低价的阻力位。在支撑阻力位形成时,进一步检查RSI指标值是否符合超买超卖的条件。具体来说,如果在阻力位时RSI低于超卖线,认为处于超卖状态,可以做多;如果在支撑位时RSI高于超买线,认为处于超买状态,可以做空。这样可以利用RSI指标过滤假突破的情况,在趋势反转点把握较好的入场时机。

代码细节如下:

1. 计算支撑阻力位

  - 使用pivothigh()和pivotlow()函数基于左右N根K线计算支撑和阻力位
  - 保存支撑阻力位,并设定看涨看跌的条件判断

2. 计算RSI指标

  - 使用rsi()函数计算RSI指标
  - 设定RSI超买超卖判断条件

3. 结合支撑阻力位和RSI信号

  - 如果在阻力位看涨,同时RSI低于超卖线,则做多
  - 如果在支撑位看跌,同时RSI高于超买线,则做空

4. 入场设置止损止盈

  - 多单止损为支撑位下方一个最小Movement
  - 空单止损为阻力位上方一个最小Movement

## 优势分析

该策略主要有以下优势:

1. 趋势验证:RSI指标可以过滤假突破,避免在暂时性调整中错误入场

2. 风险控制:止损设置在关键支撑阻力附近,有利于风险控制

3. 通用性强:适用于不同品种和时间周期

4. 实施简单:指标和参数设置较少,易于实施

5. 数据需求低:只需要OHLC即可,对数据品质要求不高  

## 风险分析

该策略也存在以下风险:

1. 支撑阻力位失效风险:市场处于剧烈变动时,原有支撑阻力可能被突破导致策略失败。可以通过调整参看数适当拉宽支撑阻力位的范围来降低该风险。

2. RSI发散风险:在震荡行情中,RSI可能发散,超买超卖判定失效。可以适当调整RSI参数或添加附加条件来验证RSI信号。  

3. 止损被套风险:在趋势运行中,止损有可能被突破导致亏损扩大。可以适当放宽止损距离。但需要权衡趋势获利和风险控制。

4. 回撤风险:该策略为逐笔执行,在趋势反转不顺时可能出现一定回撤。可以通过风险管理来控制回撤。

## 优化方向  

该策略可以从以下几个方面进行优化:

1. 优化支撑阻力位计算参数,改进定位准确性。可以测试不同的左右看数或增加条件过滤等。

2. 优化RSI参数,改进超买超卖判定的准确率。可以测试不同RSI长度,以及超买超卖线的位置。 

3. 添加额外验证条件,避免在震荡行情下被套。例如结合波动率指标等。

4. 优化止损止盈策略,在追求利润和控制风险间取得平衡。可以引入trailing stop等动态止损方式。

5. 引入基于统计分析的止损,通过根据历史数据计算确定止损范围。

6. 结合多个时间周期进行验证,利用多周期互证提高胜率。

## 总结

该顺势而为RSI策略综合运用了支撑阻力位和RSI指标来识别潜在的趋势反转点,在关键点位找到较优入场时机。相比单一使用支撑阻力或RSI等技术指标,该策略可以提高系统性和稳定性。通过不断优化参数和过滤条件,该策略可以进一步提升胜率和收益回撤比。总体来说,该策略是一个实用性强的短期跟踪趋势反转系统。

||

## Overview

This strategy combines the pivot point reversal strategy with the Relative Strength Index (RSI) indicator to detect potential trend reversal opportunities at pivot levels by checking RSI signals.

## Strategy Logic

The strategy first calculates the key support and resistance levels by looking left and right over a number of bars to find the highest high pivot and lowest low pivot. When a pivot level is established, it further checks if RSI meets overbought or oversold conditions. Specifically, if RSI is below oversold line at resistance, it is considered oversold for long entry. If RSI is above overbought line at support, it is considered overbought for short entry. This allows using RSI to filter false breakouts and identify better entry timing at trend reversal points. 

The code details are as follows:

1. Calculate pivot support and resistance

  - Use pivothigh() and pivotlow() to compute pivot levels based on left and right N bars
  - Save pivots and define conditions to determine uptrend or downtrend

2. Compute RSI 

  - Use rsi() to calculate RSI values
  - Define overbought/oversold thresholds for RSI

3. Combine pivot and RSI signals

  - Go long if uptrend at resistance and RSI below oversold line
  - Go short if downtrend at support and RSI above overbought line

4. Set stop loss and take profit

  - Long stop loss below support by one minimum tick 
  - Short stop loss above resistance by one minimum tick

## Advantage Analysis 

The main advantages of this strategy are:

1. Trend confirmation: RSI filters false breakouts and avoids wrong entries during temporary pullbacks.

2. Risk control: Stops are placed near key supports and resistances for better risk management. 

3. Versatility: Applicable to different products and timeframes. 

4. Simplicity: Minimal indicators and parameters for easy implementation.

5. Data efficiency: Only OHLC data needed and not sensitive to data quality.

## Risk Analysis

The potential risks are:

1. Pivot failure risk: Key levels may be broken during huge market swings, causing strategy failure. This can be mitigated by adjusting lookback periods to widen pivot ranges.

2. RSI divergence risk: RSI may diverge and become ineffective for overbought/oversold in choppy markets. RSI parameters can be tuned and additional filters added to validate RSI signals.

3. Stop loss risk: Stops can be hit during strong trends leading to increased losses. Wider stop loss distances could help but require balancing profits and risks. 

4. Drawdown risk: The strategy is executed on every tick and can face drawdowns during unfavorable reversals. Drawdowns can be controlled via risk management.

## Optimization Directions

The strategy can be improved in several aspects:

1. Optimize pivot calculation by testing different left/right lookback periods and adding filters to improve accuracy.

2. Optimize RSI parameters for better overbought/oversold detection. Test different lengths and threshold levels.

3. Add additional filters to avoid whipsaws in choppy markets, such as volatility indicators.

4. Optimize stops to balance profits and risks. Consider trailing stops and other dynamic mechanisms. 

5. Employ statistical stops based on historical data analysis to determine stop loss ranges.

6. Add multi-timeframe confirmation to improve win rate using multiple periods.

## Conclusion

The Go With The Trend RSI strategy combines pivot points and RSI to identify potential trend turning points and find optimal entries. Compared to using single techniques like pivot or RSI alone, this strategy improves robustness and consistency. Further optimizations on parameters and filters can enhance win rate and risk-adjusted returns. Overall, it is a practical system to trade short-term trend reversals.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|3|PP - Left Bars|
|v_input_2|3|PP - Right Bars|
|v_input_3|14|RSI - Length|
|v_input_4|70|RSI - Overbought level|
|v_input_5|30|RSI - Overold level|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-30 00:00:00
end: 2023-10-07 00:00:00
period: 45m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Pivot Point Reversal + RSI Strategy", shorttitle = 'PP + RSI Strategy', overlay=true)

////////////
// Inputs //

leftBars   = input(3,  title = 'PP - Left Bars')
rightBars  = input(3,  title = 'PP - Right Bars')
rsi_length = input(14, title = "RSI - Length")
rsi_long   = input(70, title = "RSI - Overbought level")
rsi_short  = input(30, title = "RSI - Overold level")

//////////////////
// Calculations //

// Pivot Points
swh = pivothigh(leftBars, rightBars)
swl = pivotlow(leftBars, rightBars)

// Pivot High 
swh_cond = not na(swh)
 
hprice = 0.0
hprice := swh_cond ? swh : hprice[1]
 
le = false
le := swh_cond ? true : (le[1] and high > hprice ? false : le[1])

// Pivot Low 
swl_cond = not na(swl)
 
lprice = 0.0
lprice := swl_cond ? swl : lprice[1]
 
se = false
se := swl_cond ? true : (se[1] and low < lprice ? false : se[1])

// RSI 
rsi = rsi(close, 14)

//////////////
// STRATEGY //

if (le and rsi[rightBars] < rsi_long )
    strategy.entry("PivRevLE", strategy.long,  comment = "PivRSI Long",  stop = hprice + syminfo.mintick)
 
if (se and rsi[rightBars] > rsi_short)
    strategy.entry("PivRevSE", strategy.short, comment = "PivRSI Short", stop = lprice - syminfo.mintick)
 
```

> Detail

https://www.fmz.com/strategy/428680

> Last Modified

2023-10-08 11:36:01
