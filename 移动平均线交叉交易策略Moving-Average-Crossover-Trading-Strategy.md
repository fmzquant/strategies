
> Name

移动平均线交叉交易策略Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c0b459113bd7fc17e4.png)
[trans]

### 概述

移动平均线交叉交易策略通过计算不同周期的移动平均线,在它们发生金叉或死叉时进行买入或卖出操作,属于技术分析类交易策略。该策略简单易行,资金占用少,回撤较小,适合中长线操作。

### 策略原理  

该策略通过计算20周期和50周期的指数移动平均线(EMA)。当20周期EMA上穿50周期EMA时,进行买入操作。当20周期EMA下穿50周期EMA时,进行卖出操作。

EMA指指数移动平均线,它对最近的数据给予较大权重。EMA的计算公式为:

EMAtoday = (Pricetoday * k) + EMAyesterday * (1-k)

其中,k = 2/(周期数+1)

这样,当短期EMA上穿长期EMA时,表示价格走势转 bullish,LONG;当短期EMA下穿长期EMA时,表示价格走势转 bearish,SHORT。

### 优势分析

该策略具有以下优势:

1. 操作简单,容易理解执行。
2. 资金占用少,回撤较小,有利于资金管理。
3. 参数调整灵活,可针对不同市场定制。
4. 可在任何品种上应用,适用于日内和趋势交易。

### 风险及优化

该策略也存在以下风险:  

1. 价格震荡时,会出现频繁的交易信号,需要考虑过滤手段。
2. 在突破买卖点挂单易被套牢,需要考虑止盈止损。 
3. 交易受困于参数优化,需要更多历史数据验证。

因此,该策略可从以下几个方面进行优化:

1. 加入布林线指标等过滤器,减少虚假信号。
2. 加入止盈止损逻辑,避免套牢。
3. 针对不同品种寻找最佳参数组合。
4. 结合交易量指标等确认买卖信号。

### 总结

移动平均线交叉交易策略属于简单有效的技术交易策略,它易于理解实施,历经市场检验。通过参数优化、加入辅助条件等手段,可以进一步减少交易风险,提高策略稳定性。该策略可以成为量化交易的一个基础模块。

||

### Overview

The moving average crossover trading strategy generates buy and sell signals when shorter and longer term moving averages cross. It belongs to technical analysis based trading strategies. This strategy is simple, capital efficient with smaller drawdowns, suitable for medium-long term trading.  

### Strategy Logic

This strategy calculates the 20 and 50 period Exponential Moving Average (EMA). It triggers long position when the 20 EMA crosses over 50 EMA. It triggers short position when 20 EMA crosses under 50 EMA.

EMA gives more weight to recent data. The formula is:

EMAtoday = (Pricetoday * k) + EMAyesterday * (1-k)

Where k = 2/(number of periods + 1)

When shorter term EMA crosses over longer term EMA, it indicates bullish price move to LONG. When it crosses under, it indicates bearish price reversal to SHORT.

### Pros  

The pros of this strategy:

1. Simple logic, easy to understand and execute
2. Less capital required, smaller drawdowns  
3. Flexible parameter tuning for different markets
4. Applicable to any instruments for scalping or trend trading

### Risks and Enhancements 

The risks include: 

1. Frequent trading signals during price oscillation. Filters can help.
2. Stop loss needed to avoid being trapped.
3. Parameter optimization requires more historical data.

Enhancements:

1. Adding filters like Bollinger Bands to reduce false signals
2. Adding stop loss/take profit to avoid being trapped
3. Finding optimal parameter sets for different instruments  
4. Combining with volume to confirm signals

### Conclusion  

The moving average crossover strategy is a simple yet effective technical strategy that is proven by the market. Further improvements on risk control and robustness can be achieved by parameter tuning, adding filters etc. It serves as a fundamental building block for quantitative trading.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|20|1st MA Length|
|v_input_string_1|0|1st MA Type: EMA|
|v_input_3|50|2nd MA Length|
|v_input_string_2|0|2nd MA Type: EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-20 00:00:00
end: 2023-11-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © brandlabng

//@version=5
//study(title="Holly Grail", overlay = true)
strategy('HG|E15m', overlay=true)
src = input(close, title='Source')

price = request.security(syminfo.tickerid, timeframe.period, src)
ma1 = input(20, title='1st MA Length')
type1 = input.string('EMA', '1st MA Type', options=['EMA'])

ma2 = input(50, title='2nd MA Length')
type2 = input.string('EMA', '2nd MA Type', options=['EMA'])

price1 = if type1 == 'EMA'
    ta.ema(price, ma1)

price2 = if type2 == 'EMA'
    ta.ema(price, ma2)


//plot(series=price, style=line,  title="Price", color=black, linewidth=1, transp=0)
plot(series=price1, style=plot.style_line, title='1st MA', color=color.new(#219ff3, 0), linewidth=2)
plot(series=price2, style=plot.style_line, title='2nd MA', color=color.new(color.purple, 0), linewidth=2)


longCondition = ta.crossover(price1, price2)
if longCondition
    strategy.entry('Long', strategy.long)

shortCondition = ta.crossunder(price1, price2)
if shortCondition
    strategy.entry('Short', strategy.short)
```

> Detail

https://www.fmz.com/strategy/433446

> Last Modified

2023-11-27 17:25:36
