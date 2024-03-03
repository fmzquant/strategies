
> Name

基于DI交叉的日内交易策略Dual-DI-Crossover-Daily-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/13cc2e99e18f12c6352.png)
[trans]


## 概述

本策略基于平均真实范围指标(ATR)以及趋向指标(DMI)的正向指标(DI+)和负向指标(DI-)的交叉来判断买入和卖出时机。该策略属于趋势跟踪策略,通过DI+和DI-的交叉来判断趋势的转折点,ATR用于设置止损和止盈价格。

## 策略原理

1. 计算ATR(14):利用过去14天的最高价,最低价和收盘价计算出平均真实波动范围

2. 计算DI+和DI-:

    - DI+ = 100 * RMA(MAX(UP,0),N) / ATNR 

    - DI- = 100 * RMA(MAX(DOWN,0),N) / ATNR

    其中UP为当日最高价和昨日收盘价的差值,DOWN为当日最低价和昨日收盘价的差值,N为参数长度,默认为14,ATNR为上一步计算所得的ATR

3. 判断买入和卖出:

    - 当DI+上穿DI-,产生买入信号

    - 当DI+下穿DI-,产生卖出信号

4. 设置止损止盈:

    - 多单止损价为入场价减去ATR乘以止损倍数

    - 多单止盈价为入场价加上ATR乘以止盈倍数

    - 空单止损价为入场价加上ATR乘以止损倍数 

    - 空单止盈价为入场价减去ATR乘以止盈倍数

## 策略优势分析

1. 利用DI+和DI-交叉判断趋势转换点,能够及时捕捉新的趋势方向

2. ATR作为动态止损止盈指标,能够根据市场波动程度来设定合理的止损止盈点

3. 策略参数较少,容易理解和实现

4. 回测数据显示,该策略具有正向的盈利因子,表现优于买持策略

## 风险及解决方法分析

1. DI交叉产生误交易风险

    - 出现假突破时,会产生不必要的交易信号,可适当调整DI周期参数以过滤误信号

2. 止损止盈点过于靠近

    -市场出现剧烈波动时,靠近的止损止盈容易被触发,可调整ATR倍数以适应市场波动频率

3. 无法有效处理趋势震荡市

    - 震荡行情中 DI 会频繁交叉,产生过多无效交易信号,可结合其他指标过滤信号

4. 回撤风险

    - 策略最大回撤可接受,但无法完全避免系统性回撤,可调整仓位管理策略来控制回撤

## 优化建议

1. 结合移动平均线等指标过滤DI交叉信号,避免在震荡行情中产生误交易

2. 增加仓位管理机制,如固定份额、马丁格尔等方式,以控制回撤并提高盈利性

3. 优化ATR参数,使止损止盈更符合不同交易品种的波动范围

4. 进行参数优化,找到最佳的参数组合,如DI周期、ATR周期和ATR倍数等

5. 增加夜盘和早盘的交易判断逻辑,使策略全天候运行

## 总结

本策略整体较为简单实用,通过DI的交叉判定买卖时机,并用ATR动态设置止损止盈。策略参数量少,容易 tester 和实盘验证,也方便进行优化调整。但DI交叉对震荡行情判断效果不佳,这也是本策略需要改进的方向。总体来说,本策略表现稳定,适合用作日内短线交易策略。

||


## Overview

This strategy generates trading signals based on the crossover of the positive directional indicator (DI+) and negative directional indicator (DI-) calculated from the average true range (ATR). It belongs to the trend following strategy that identifies trend reversal points through the crossover of DI+ and DI-. ATR is used to set stop loss and take profit levels.

## Strategy Logic

1. Calculate ATR(14): Compute the average true range over the past 14 days using high, low and close prices.

2. Compute DI+ and DI-:

    - DI+ = 100 * RMA(MAX(UP,0),N) / ATNR  

    - DI- = 100 * RMA(MAX(DOWN,0),N) / ATNR

    Where UP is the difference between current high and previous close, DOWN is the difference between current low and previous close, N is the parameter period, default to 14, and ATNR is the ATR calculated from step 1.

3. Determine entry and exit: 

    - When DI+ crosses over DI-, a buy signal is generated.

    - When DI+ crosses below DI-, a sell signal is generated.

4. Set stop loss and take profit:

    - Long stop loss is entry price minus ATR multiplied by the stop loss multiplier

    - Long take profit is entry price plus ATR multiplied by the take profit multiplier

    - Short stop loss is entry price plus ATR multiplied by the stop loss multiplier

    - Short take profit is entry price minus ATR multiplied by the take profit multiplier

## Advantage Analysis

1. Using DI+/DI- crossover to determine trend reversal provides timely signal for new trend direction.

2. ATR as dynamic stop loss/take profit indicator can set reasonable levels based on market volatility.

3. The strategy has few parameters and is easy to understand and implement. 

4. Backtest results show this strategy has positive profit factor and outperforms buy & hold.

## Risks and Solutions

1. False signal risk from DI crossover

    - Filter signals with moving averages etc. to avoid false breakout.

2. Stop loss/take profit too close

    - Adjust ATR multiplier to accommodate volatility.

3. Ineffective in range-bound market

    - Combine with other indicators to filter signals in consolidation.

4. Drawdown risk

    - Drawdown is acceptable but unavoidable for systematic strategies. Adjust position sizing to control drawdown.

## Optimization Suggestions

1. Add filters like moving average to avoid false signals in range-bound periods.

2. Implement position sizing like fixed fractional or Martingale to control drawdown and boost profitability.  

3. Optimize ATR parameters to match volatility of different trading instruments.

4. Parameter optimization on DI period, ATR period, ATR multiplier etc. to find optimum combination.

5. Add overnight and early session logic to run strategy 24/7.

## Conclusion

This is a simple and practical strategy generating signals from DI crossover and setting dynamic stop loss/take profit with ATR. With few parameters, it is easy to test and optimize. But DI crossover is less effective during consolidation. Going forward, combining additional filters is the main improvement area. Overall this strategy demonstrates stable performance suitable for short-term day trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|ATR Multiplier|
|v_input_2|14|Length di|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-06 00:00:00
end: 2023-11-12 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © TheHulkTrading
//@version=4
strategy("DI Crossing Daily Straregy HulkTrading", overlay=true)
// ATR Multiplier. Recommended values between 1..4
atr_multiplier = input(1, minval=1, title="ATR Multiplier") 
//Length of DI. Recommended default value = 14
length = input(14, minval=1, title="Length di")
up = change(high)
down = -change(low)
range = rma(tr, 14)

//DI+ and DI- Calculations
di_plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, length) / range)
di_minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, length) / range)

//Long and short conditions
longCond = crossover(di_plus,di_minus)
shortCond = crossunder(di_plus,di_minus) 


//Stop levels and take profits
stop_level_long = strategy.position_avg_price - atr_multiplier*atr(14)
take_level_long = strategy.position_avg_price + 2*atr_multiplier*atr(14)
stop_level_short = strategy.position_avg_price + atr_multiplier*atr(14)
take_level_short = strategy.position_avg_price - 2*atr_multiplier*atr(14)


//Entries and exits 
strategy.entry("Long", strategy.long, when=longCond)
strategy.exit("Close Long","Long", stop=stop_level_long, limit = take_level_long)
strategy.entry("Short", strategy.short, when=shortCond)
strategy.exit("Close Short","Short", stop=stop_level_short, limit = take_level_short)


```

> Detail

https://www.fmz.com/strategy/431923

> Last Modified

2023-11-13 11:32:08
