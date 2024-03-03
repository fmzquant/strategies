
> Name

MACD-DEMA-交易策略MACD-DEMA-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略结合MACD和DEMA双轨指标,通过多空线金叉死叉形成交易信号。策略捕捉MACD指标转折时机,利用DEMA滤波去噪实现较优入场。

## 策略原理

1. 计算快线DEMAfast,取价格的DEMA值,周期length为fastmacd。

2. 计算慢线DEMAslow,取prices的DEMA值,周期length为slowmacd。

3. MACD线为快慢线差值:DEMAfast - DEMAslow。

4. Signal线为MACD线的DEMA值,周期length为signalmacd。

5. 多空线交叉作为交易信号:金叉做多,死叉做空。

6. 添加年月日过滤,只在指定日期范围发出信号。

## 优势分析 

该策略主要有以下优点:

1. 结合MACD和DEMA,指标互补。MACD捕捉转折,DEMA滤波提高信号质量。

2. DEMA双轨设计可减少MACD指标的滞后性和噪声。

3. 多空线交叉易于判断,信号生成简单清晰。

4. 可灵活设置交易日期范围,适应不同策略需求。 

5. MACD参数可优化组合,灵活应对多种行情。

## 风险分析

该策略主要风险如下:

1. MACD作为趋势跟踪指标,不适合震荡横盘市。

2. 多空交叉可能产生假信号,须有效过滤。

3. 止损策略不完善,容易止损过大。 

4. 参数优化不全面,不同品种效果差异大。

5. 交易日期过滤过于死板,须动态调整。

对应解决方法:

1. 结合动量指标,避免横盘。

2. 增加价格条件,过滤假交叉信号。

3. 设定合理初始止损与追踪止损。

4. 测试多品种参数效果,动态优化。

5. 根据实时行情调整过滤日期。

## 优化方向

该策略可考虑以下几点优化:

1. 增加成交量指标进行信号过滤。

2. 优化MACD参数组合,测试不同品种数据。

3. 设置止损策略,如固定止损、追踪止损等。

4. 根据市场波动程度动态调整止损位置。

5. 跟踪趋势强弱,调整仓位大小。

## 总结

MACD DEMA策略结合双指标优势,利用交叉信号捕捉趋势。但MACD本质具有滞后性,需注意过滤假信号。此外,止损策略需优化减少非理性止损。实盘时,建议基于参数优化结果谨慎入场,持续优化。

|| 

## Overview 

This strategy combines the MACD and DEMA dual-rail indicators to generate trading signals from crossovers. It captures turning points of the MACD indicator and uses DEMA for filtering to achieve better entries.

## Strategy Principle

1. Calculate fast line DEMAfast as DEMA value of price with period length fastmacd.

2. Calculate slow line DEMAslow as DEMA value of price with period length slowmacd. 

3. MACD Line is difference between fast and slow lines: DEMAfast - DEMAslow.

4. Signal line is DEMA value of MACD line with period signalmacd.

5. Crossovers between MACD and signal lines generate trade signals: long on golden cross, short on death cross.

6. Add date filters to only generate signals within specified date range.

## Advantage Analysis

The main advantages of this strategy are:

1. Combining MACD and DEMA complements the indicators. MACD captures turns, DEMA filters to improve signal quality.

2. DEMA dual rails design reduces lagging and noise of MACD indicator.

3. MACD crossover signals are easy to interpret, clean and simple.

4. Flexible setting of date filters caters to different strategy needs.

5. MACD parameters can be optimized for flexibility across market conditions.

## Risk Analysis

Main risks of this strategy:

1. MACD struggles as trend following indicator in choppy sideways markets. 

2. Crossovers may generate false signals, needs effective filtering.

3. Stop loss strategy not robust, prone to oversized stops.

4. Parameter optimization not comprehensive enough, big performance difference across products.

5. Date filters too rigid, needs dynamic adjustment.

Solutions:

1. Add momentum indicator to avoid sideways market. 

2. Add price conditions to filter out false crosses.

3. Set reasonable initial and trailing stop loss. 

4. Test parameters across products, dynamic optimization.

5. Adjust filter dates based on real-time conditions.

## Optimization Directions

Some potential improvements for the strategy:

1. Add volume filter for crossover signals.

2. Optimize MACD parameter combinations across different products.

3. Add stop strategies like fixed or trailing stop loss. 

4. Dynamically adjust stop loss based on market volatility.

5. Track trend strength for position sizing.

## Summary

The MACD DEMA strategy combines the strengths of both indicators, using crossovers to capture trends. But MACD is inherently lagging, beware of false signals. Also optimize stops to avoid unreasonable liquidation. For live trading, cautious entry based on optimized parameters and continuous improvements are recommended.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|MACD Fast  Line Length|
|v_input_2|26|MACD Slow Line Length|
|v_input_3|9|Signal Line Length|
|v_input_4|2018|yearfrom|
|v_input_5|2019|yearuntil|
|v_input_6|true|monthfrom|
|v_input_7|12|monthuntil|
|v_input_8|true|dayfrom|
|v_input_9|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-09-18 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(" MACD DEMA STRATEGY ", overlay=true)

source=close
price=source



fastmacd = input(12,title='MACD Fast  Line Length')
slowmacd = input(26,title='MACD Slow Line Length')
signalmacd = input(9,title='Signal Line Length')

macdslowline1 = ema(close,slowmacd)
macdslowline2 = ema(macdslowline1,slowmacd)
DEMAslow = ((2 * macdslowline1) - macdslowline2 )

macdfastline1 = ema(close,fastmacd)
macdfastline2 = ema(macdfastline1,fastmacd)
DEMAfast = ((2 * macdfastline1) - macdfastline2)

MACDLine = (DEMAfast - DEMAslow)

SignalLine1 = ema(MACDLine, signalmacd)
SignalLine2 = ema(SignalLine1, signalmacd)
SignalLine = ((2 * SignalLine1) - SignalLine2 )


MACDSignal = SignalLine-MACDLine


colorbar= MACDSignal>0?green:red




yearfrom = input(2018)
yearuntil =input(2019)
monthfrom =input(1)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)







if ( crossover(MACDLine,SignalLine) ) 
    strategy.entry("MMAL", strategy.long, stop=close, oca_name="TREND",  comment="AL")
    
else
    strategy.cancel(id="MMAL")


if (  crossunder(MACDLine,SignalLine) ) 

    strategy.entry("MMSAT", strategy.short,stop=close, oca_name="TREND",  comment="SAT")
else
    strategy.cancel(id="MMSAT")
    
    
    
    
    
    
    
    
    
    
    
    

```

> Detail

https://www.fmz.com/strategy/427265

> Last Modified

2023-09-19 16:10:19
