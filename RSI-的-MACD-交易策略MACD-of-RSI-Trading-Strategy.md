
> Name

RSI-的-MACD-交易策略MACD-of-RSI-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略使用MACD指标来判断RSI指标的趋势,从而产生交易信号。属于利用指标组合进行滤波的策略类型。

## 策略原理

该策略主要基于两部分指标进行判断:

1. RSI指标
计算常规的14周期RSI值。

2. RSI的MACD
对RSI指标计算MACD值,默认快线12周期,慢线26周期,信号线9周期。

当RSI的MACD柱体由负转正,即MACD快慢线金叉时判断为多头趋势,进行买入。

当RSI的MACD由正转负,即MACD快慢线死叉时判断为空头趋势,进行卖出。 

这里使用MACD指数平滑移动平均线来判断RSI本身的长期趋势方向,从而产生更准确的交易信号。

## 策略优势

- 利用MACD判断RSI趋势方向,提高信号准确性
- RSI作为主指标,MACD作为辅助判断指标
- MACD指数平滑移动平均线,判断稳定
- 组合指标互相验证,可避免冲高回落
- 结合参数优化,可以灵活适应市场变化

## 策略风险

- RSI和MACD都可能出现滞后,信号不准确
- MACD参数不当时会出现更多错信号
- 仅基于指标组合,对突发事件敏感
- 止损方法可以进一步完善改进
- 需针对不同品种分别测试参数优化

可以通过以下措施降低风险:

- 优化RSI和MACD的参数组合
- 加入其它指标或交易规则进行确认 
- 适当放宽止盈止损标准,减少过早出场
- 考虑加入重新入场机制
- 调整仓位管理,防止单笔损失过大

## 优化方向

该策略可以从以下几个方面进行优化:

1. 测试RSI和MACD的参数组合

2. 在MACD信号发出时,添加第二确认条件

   例如考虑K线形态、交易量或布林带位置等

3. 优化止盈止损策略,改为追踪止损

4. 加入重新入场机制

   在止损退出后,如果趋势继续,可以重新建立仓位

5. 根据市场波动率调整仓位

   在高波动时减小仓位,低波动时增加仓位

## 总结

本策略通过组合RSI和MACD两个指标,互相验证判断趋势方向,可以有效提高信号的准确性和稳定性。但仍需优化参数,并辅以其他技术指标或交易规则进一步确认,减少被突发事件影响的可能。同时要注重止损策略的优化改进,以及动态调整仓位的资金管理。只有不断学习和优化,才能适应市场的变化,获取持续稳定的收益。

|| 

## Overview

This strategy uses the MACD indicator to determine the trend of the RSI indicator, generating trading signals. It belongs to the indicator combo filter strategy type.

## Strategy Logic

The strategy is based on two main indicators:

1. RSI 
   Calculates the regular 14-period RSI.

2. MACD of RSI
   Calculates MACD values on the RSI, with default fast MA 12, slow MA 26, signal line 9.

When MACD of RSI crosses up, the fast and slow MAs golden cross, it determines an uptrend and goes long. 

When MACD crosses down, the fast and slow MAs dead cross, it determines a downtrend and goes short.

The exponential moving averages of MACD help determine the longer term trend of RSI itself, resulting in more accurate signals.

## Advantages

- MACD judges RSI trend direction for higher accuracy
- RSI as primary indicator, MACD as secondary 
- Exponential MAs make trend determination stable
- Combination verifies each other, avoiding whipsaws
- Parameter tuning provides flexibility for different markets

## Risks

- Both RSI and MACD can lag, leading to inaccurate signals
- Wrong MACD parameters may generate more false signals
- Purely indicator-based, sensitive to sudden events
- Stop loss mechanism needs further improvements 
- Parameter optimization required for different products

Risks can be reduced by:

- Optimizing RSI and MACD parameter combinations
- Adding other filters for confirmation
- Relaxing TP/SL to avoid premature exit
- Considering re-entries 
- Position sizing to limit single loss

## Enhancement Directions

The strategy can be improved from:

1. Testing RSI and MACD parameter combinations

2. Adding secondary confirmation when MACD signals

   e.g. candlestick patterns, volume, Bollinger bands etc.

3. Optimizing stops to trailing stops

4. Adding re-entry rules

   Re-establish positions after stops are hit if trend continues

5. Adjusting position sizes by volatility

   Smaller size during high volatility, larger size in low volatility
   
## Summary

This strategy combines RSI and MACD indicators to verify each other for more accurate and stable trend detection. But parameters need optimization, and additional technical filters or trading rules are required for confirmation, avoiding sudden events. Also stop loss mechanisms and dynamic position sizing are important. Continued learning and optimizing is crucial for adapting to changing market conditions for steady profits.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Length|
|v_input_2|12|fastLength|
|v_input_3|26|slowLength|
|v_input_4|9|signalLength|
|v_input_5|6|monthfrom|
|v_input_6|12|monthuntil|
|v_input_7|true|dayfrom|
|v_input_8|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-14 00:00:00
end: 2023-09-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3

strategy(title = "MACD of RSI", overlay = false)

//////////////////////// RSI ///////////////////////////

src = close, len = input(14, minval=1, title="Length")
up = sma(max(change(src), 0), len)
down = sma(-min(change(src), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))


//////////////////////// RSI   //////////////////////////

//////////////// MACD  ////////////////////////////

sourcemacd = rsi 

fastLength = input(12, minval=1), slowLength=input(26,minval=1)
signalLength=input(9,minval=1)


fastMA = ema(sourcemacd, fastLength)
slowMA = ema(sourcemacd, slowLength)

macd = fastMA - slowMA
signal = ema(macd, signalLength)
delta=macd-signal

swap1 = delta>0?green:red

plot(delta,color=swap1,style=columns,title='Histo',histbase=0,transp=20)
p1 = plot(macd,color=blue,title='MACD Line')
p2 = plot(signal,color=red,title='Signal')
fill(p1, p2, color=blue)
hline(0)




/////////////////////////MACD  //////////////////////////


// Conditions



longCond = na
sellCond = na
longCond :=  crossover(delta,0)
sellCond :=  crossunder(delta,0)




monthfrom =input(6)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)



if (  longCond  ) 
    strategy.entry("BUY", strategy.long, stop=close, oca_name="TREND", comment="BUY")
    
else
    strategy.cancel(id="BUY")


if ( sellCond   ) 

    strategy.close("BUY")






```

> Detail

https://www.fmz.com/strategy/427511

> Last Modified

2023-09-21 20:48:50
