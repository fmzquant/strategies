
> Name

黄金交叉死叉策略Golden-Cross-Death-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]


## 概述

该策略运用简单移动平均线的黄金交叉和死叉原理,实现股票的长短仓。当快线从下方向上突破慢线时,做多;当快线从上方向下跌破慢线时,做空。

## 策略原理

该策略首先定义了回测的起止时间,然后设置两个平均线的计算参数,包括平均线类型和周期长度。

通过getMAType()函数计算两个平均线的值。其中fastMA为短周期平均线,slowMA为长周期平均线。

策略的核心逻辑在于:

- 当fastMA上穿slowMA时,发出做多信号long;

- 当fastMA下穿slowMA时,发出做空信号short。

最后,在回测期内,遇到做多信号就采取长仓策略;遇到做空信号就采取空仓策略。

## 优势分析

- 策略思路清晰简单,容易理解实现。
- 运用广泛的均线交叉原理,适用于大部分股票品种。
- 可自定义平均线类型和参数,适应性强。
- 采用镶嵌式策略结构,各部分功能明确,便于后期优化。

## 风险分析

- 均线交叉具有一定滞后性,可能错过部分交易机会。
- 无法有效过滤震荡市,容易被套。
- 参数优化不够全面系统,需人工经验辅助。
- 无法有效控制单次交易风险和损失。

针对风险,可以从以下方面进一步优化:

1. 增加其他技术指标过滤,以识别趋势。

2. 增加止损策略,控制单次损失。

3. 引入量能指标等,避免震荡市场的套利。

4. 建立参数优化机制,自动寻找最佳参数组合。

## 优化方向  

该策略可以从以下几个方面进行进一步优化:

1. 增加止损策略,如设定固定止损点或追踪止损,控制损失。

2. 增加仓位管理策略,如固定仓位、动态仓位,控制交易风险。

3. 增加过滤器,结合其他技术指标识别趋势,提高胜率。

4. 优化参数设置,通过网格搜索、线性回归等方法寻找最优参数。 

5. 扩展做多做空策略,如破位反转、分批建仓等,丰富交易策略。

6. 增加量能指标,避免在震荡行情中被套。

7. 丰富交易品种,扩展至股指期货、外汇、数字货币等更多品种。

## 总结

本策略基于移动平均线的交叉原理实现股票的长短仓选择。策略思路简单明了,使用广泛,适应性强,具有一定的实用价值。但该策略也存在一定的滞后性、无法有效过滤震荡等缺点。未来可从完善止损、优化参数、增加过滤器等方面进行优化,使策略更具优势。

||


## Overview

This strategy uses the golden cross and death cross principles of simple moving averages to implement long and short positions for stocks. It goes long when the fast MA crosses above the slow MA, and goes short when the fast MA crosses below the slow MA.

## Strategy Logic

The strategy first defines the backtesting timeframe, then sets the calculation parameters for the two moving averages, including MA type and period length. 

The getMAType() function calculates the values of the two MAs. fastMA is the shorter period MA, and slowMA is the longer period MA.

The core logic:

- When fastMA crosses above slowMA, a long signal is triggered.

- When fastMA crosses below slowMA, a short signal is triggered.

Finally, during backtesting, take long position when seeing long signal, and take short position when seeing short signal.

## Advantage Analysis 

- Simple and clear strategy idea, easy to understand and implement.
- Uses widely applied MA crossover principles, suitable for most stock products. 
- Customizable MA types and parameters, high adaptability.
- Modular strategy structure, clear functionality, easy to optimize.

## Risk Analysis

- MA crossovers have some lag, may miss some trading opportunities.
- Cannot effectively filter whipsaw markets, prone to being trapped.
- Parameter optimization is not comprehensive enough, requires manual experience. 
- Unable to effectively control per trade risk and losses.

Possible optimizations against the risks:

1. Add other technical indicators for trend identification.

2. Add stop loss to control per trade loss amount. 

3. Add volume indicators to avoid whipsaw markets.

4. Build parameter optimization mechanisms to find optimal parameter sets automatically.

## Optimization Directions

The strategy can be further optimized in the following aspects:

1. Add stop loss strategies like fixed stop loss points or trailing stop loss to control losses.

2. Add position sizing strategies like fixed or dynamic position sizing to control trading risks.

3. Add filters by combining with other technical indicators to identify trends and improve win rate.

4. Optimize parameters by methods like grid search and linear regression to find optimum values.

5. Expand entry strategies like breakout pullback, scale in orders to enrich trading tactics. 

6. Add volume indicators to avoid whipsaw markets.

7. Expand products to stock indexes, forex, cryptocurrencies etc. 

## Summary 

This strategy implements long/short stock selection based on MA crossover principles. The strategy idea is simple and clear, widely used, highly adaptable, and practically valuable. But it also has some lagging and whipsaw filtering issues. Future optimizations can focus on improving stop loss, parameter optimization, adding filters etc to make it more advantageous.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2010|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|true|Backtest Start Day|
|v_input_4|2019|Backtest Stop Year|
|v_input_5|12|Backtest Stop Month|
|v_input_6|31|Backtest Stop Day|
|v_input_7_close|0|MA Source 1: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8|0|MA Type 1: sma|ema|swma|wma|
|v_input_9|50|MA Length 1|
|v_input_10_close|0|MA Source 2: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_11|0|MA Type 2: sma|ema|swma|wma|
|v_input_12|200|MA Length 2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-10 00:00:00
end: 2023-10-10 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//strategy("Golden X BF Strategy", overlay=true, initial_capital=10000, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.0)

/////////////// Time Frame ///////////////
testStartYear = input(2010, "Backtest Start Year") 
testStartMonth = input(1, "Backtest Start Month")
testStartDay = input(1, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay, 0, 0)

testStopYear = input(2019, "Backtest Stop Year")
testStopMonth = input(12, "Backtest Stop Month")
testStopDay = input(31, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay, 0, 0)

testPeriod() =>  true

///////////// MA Params /////////////
source1 = input(title="MA Source 1", defval=close)
maType1 = input(title="MA Type 1", defval="sma", options=["sma", "ema", "swma", "wma"])
length1 = input(title="MA Length 1", defval=50)

source2 = input(title="MA Source 2", defval=close)
maType2 = input(title="MA Type 2", defval="sma", options=["sma", "ema", "swma", "wma"])
length2 = input(title="MA Length 2", defval=200)

///////////// Get MA Function /////////////
getMAType(maType, sourceType, maLen) => 
    res = sma(close, 1)
    
    if maType == "ema"
        res := ema(sourceType, maLen)
    if maType == "sma"
        res := sma(sourceType, maLen)
    if maType == "swma"
        res := swma(sourceType)
    if maType == "wma"
        res := wma(sourceType, maLen)
    res
    
///////////// MA /////////////
fastMA = getMAType(maType1, source1, length1)
slowMA = getMAType(maType2, source2, length2)

long = crossover(fastMA, slowMA)
short = crossunder(fastMA, slowMA)

/////////////// Plotting /////////////// 
checkColor() => fastMA > slowMA
colCheck = checkColor() ? color.lime : color.red
p1 = plot(fastMA, color = colCheck, linewidth=1)
p2 = plot(slowMA, color = colCheck, linewidth=1)
fill(p1, p2, color = checkColor() ? color.lime : color.red)
bgcolor(long ? color.lime : short ? color.red : na, transp=20)

/////////////// Execution /////////////// 
if testPeriod()
    strategy.entry("Long", strategy.long, when=long)
    strategy.entry("Short", strategy.short, when=short)
```

> Detail

https://www.fmz.com/strategy/428986

> Last Modified

2023-10-11 16:33:18
