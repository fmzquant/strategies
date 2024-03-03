
> Name

历史波动率区间突破交易策略Volatility-Range-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans] 

## 概述

本策略基于价格的历史波动区间来确定交易信号。它计算一定周期内的最高价与最低价的差值,并通过移动平均线形成波动区间。当价格突破该区间的上下轨时,产生交易信号。属于基于价格突破的趋势跟踪策略。

## 策略原理  

该策略的核心指标是价格的历史波动率。具体计算方法是:

1. 计算过去N根Bar的最高价和最低价之差,记为HL

2. 计算过去N根Bar的最高价和最低价的平均值avg(H, L) 

3. 波动率 = HL / avg(H, L)

其中N为"Volatility Length"参数。

得到波动率后,计算上下轨:

上轨 = 当前close + 当前close * 波动率

下轨 = 当前close - 当前close * 波动率

上下轨再通过WMA均线做平滑处理,参数为"Average Length"。

当价格突破上轨时,做多;当价格突破下轨时,做空。

平仓信号根据"Exit Type"参数给定:

1. Exit Type为Volatility MA时,价格回破WMA均线平仓;

2. Exit Type为Range Crossover时,价格回破上下轨平仓。

## 策略优势

- 使用价格波动率,适合捕捉趋势性行情
- WMA均线处理让区间更稳定可靠
- 突破式入场容易把握趋势转折点
- 回破均线或上下轨可及时止损
- 参数优化空间大,可针对不同市场进行调整

## 策略风险

- 区间突破容易出现冲高回落的风险
- 趋势反转时容易损失较大
- WMA均线有时识别趋势转折不够敏感  
- 针对参数优化不易,需要大量反复试错
- 回撤风险较大,需要注重资金管理

可以通过以下措施减少风险:

- 优化参数,使区间更稳定可靠
- 加入其他指标判断,避免冲高回落
- 缩小交易 SIZE,注重资金管理
- 考虑加入重新入场机制

## 优化方向

该策略可以从以下几个方面进行优化:

1. 参数优化
  
  通过测试不同的Length参数,找到最佳参数组合。

2. 加入其他指标判断

  例如在价格突破上轨时,如果MACD也同时金叉,才入场做多。

3. 优化止损方式

  可以优化为带有弹性的追踪止损,而不是简单的区间突破止损。

4. 添加再入场机制

  在止损出场后,如果趋势继续,可以设置再入场条件,对趋势进行再次追踪。

5. 优化仓位管理

  可以根据市场波动率的高低,动态调整交易仓位。

## 总结

该策略总体来说比较适合趋势性行情,通过波动率上的轨和下轨来判断趋势方向和强度,并配合WMA均线形成较为可靠的交易区间,从而产生突破买卖点。但也存在一些问题,如趋势判断滞后,止损方式可以改进等。需要我们针对实盘数据进行大量的回测和优化,调整参数设置和策略规则,降低误入误出 probability,使策略在不同市场中都能有较好的表现。同时,严格的资金管理也是该策略能否长期盈利的关键。

|| 

## Overview

This strategy generates trading signals based on the historical volatility range of the price. It calculates the difference between the highest and lowest prices over a certain period, and forms a volatility range using moving averages. Trading signals are triggered when the price breaks through the upper or lower bands of the range. It belongs to the trend-following breakout strategies.

## Strategy Logic

The core indicator is the historical volatility of the price. The specific calculation is:

1. Calculate the difference between the highest and lowest prices over the past N bars, called HL

2. Calculate the average of the highest and lowest prices over N bars, avg(H, L)  

3. Volatility = HL / avg(H, L)

Where N is the "Volatility Length" parameter. 

After getting the volatility, the bands are calculated as:

Upper Band = Current close + Current close * Volatility

Lower Band = Current close - Current close * Volatility

The bands are then smoothed by WMA with period set as "Average Length".

When price breaks above the upper band, go long. When price breaks below the lower band, go short.

Exit signals are defined by "Exit Type":

1. If Exit Type is Volatility MA, exit when price crosses back below WMA. 

2. If Exit Type is Range Crossover, exit when price crosses back below the bands.

## Advantages

- Volatility catches trending moves well  
- WMA makes the bands more stable and reliable
- Breakout signals catch trend turns timely
- Exits based on WMA/bands cut losses fast
- Much room for parameter tuning for different markets

## Risks

- Breakouts may whipsaw with price reversing 
- Risks large losses at trend reversals
- WMA sometimes lags in detecting trend turns
- Parameter optimization not easy, needs much trial and error
- Larger drawdowns, need good risk management

Risks can be reduced by:

- Optimizing parameters for more reliable bands
- Adding other indicators to avoid whipsaws
- Smaller sizes and better risk management 
- Considering re-entries

## Optimization Directions

The strategy can be improved by:

1. Parameter tuning

  Test different Length values to find optimal combinations.
  
2. Adding other indicators

  For example, when price breaks above upper band, check if MACD also golden crosses.
  
3. Better stop loss

  Optimizing to trailing stops instead of simple range break stops.
  
4. Re-entries

  Set re-entry rules to catch trends again after stops.

5. Position sizing
  
  Dynamically adjust sizes based on market volatility.

## Summary

This strategy works well for trending markets in general by using volatility-based bands to gauge trend strength and WMA to form reliable trading ranges for breakout signals. But some issues exist like lagging trend detection, improvable stops, etc. Extensive backtesting and optimization is needed using real data to adjust parameters and rules, reducing false signals and making it robust across different market conditions. Also strict risk management is key for long-term profitability.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|100|Average Length|
|v_input_int_2|100|Volatility Length|
|v_input_source_1_close|0|Volatility Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_source_2_close|0|Exit Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_string_1|0|Exit Type: Volatility MA|Range Crossover|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-13 00:00:00
end: 2023-09-20 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © wbburgin

//@version=5
strategy("Volatility Range Breakout Strategy [wbburgin]", shorttitle = "VRB Strategy [wbburgin]", overlay=true,
 pyramiding=20,max_bars_back=2000,initial_capital=10000)

wma(float priceType,int length,float weight) =>
    norm = 0.0
    sum = 0.0
    for i = 0 to length - 1
        norm := norm + weight
        sum := sum + priceType[i] * weight
    sum / norm

// This definition of volatility uses the high-low range divided by the average of that range.
volatility(source,length) =>
    h = ta.highest(source,length)
    l = ta.lowest(source,length)
    vx = 2 * (h - l) / (h + l)
    vx

vm1 = input.int(100,"Average Length")
volLen = input.int(100,"Volatility Length")
vsrc = input.source(close,"Volatility Source")
cross_type = input.source(close,"Exit Source")
exit_type = input.string("Volatility MA",options=["Volatility MA","Range Crossover"],title="Exit Type")

volatility = volatility(vsrc,volLen)

highband1 = close + (close * volatility)
lowband1 = close - (close * volatility)
hb1 = wma(highband1,vm1,volatility)
lb1 = wma(lowband1,vm1,volatility)
hlavg = math.avg(hb1,lb1)

upcross = ta.crossover(high,hb1)    //Crossing over the high band of historical volatility signifies a bullish breakout
dncross = ta.crossunder(low,lb1)    //Crossing under the low band of historical volatility signifies a bearish breakout

vlong = upcross
vshort = dncross
vlong_exit = switch
    exit_type == "Volatility MA" => ta.crossunder(cross_type,hlavg)
    exit_type == "Range Crossover" => ta.crossunder(cross_type,hb1)
vshort_exit = switch
    exit_type == "Volatility MA" => ta.crossover(cross_type,hlavg)
    exit_type == "Range Crossover" => ta.crossover(cross_type,lb1)

if vlong
    strategy.entry("Long",strategy.long)
if vlong_exit
    strategy.close("Long")
if vshort
    strategy.entry("Short",strategy.short)
if vshort_exit
    strategy.close("Short")

plot(hlavg,color=color.white,title="Weighted Volatility Moving Average")
t = plot(hb1,color=color.new(color.red,50),title="Volatility Reversal Band - Top")
b = plot(lb1,color=color.new(color.green,50),title="Volatility Reversal Band - Bottom")

alertcondition(vlong,"Volatility Long Entry Signal")
alertcondition(vlong_exit,"Volatility Long Exit Signal")
alertcondition(vshort,"Volatility Short Entry Signal")
alertcondition(vshort_exit,"Volatility Short Exit Signal")

fill(t,b,color=color.new(color.aqua,90))
```

> Detail

https://www.fmz.com/strategy/427507

> Last Modified

2023-09-21 20:38:29
