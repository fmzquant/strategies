
> Name

每日高低打击策略Daily-HIGH-LOW-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

这是一个结合每日高低点、移动平均线和成交量的简单日内交易策略。策略的主要思路是在突破前一日高点或低点时,结合移动平均线方向和资金流动方向作为入场信号。

### 策略原理

该策略主要基于以下几个指标进行判断:

1. 每日高低点:记录前一交易日的最高价和最低价,作为突破判断的基准。

2. 移动平均线:计算一定周期的收盘价移动平均值,作为大趋势判断的参考。

3. 成交量的多空指标:计算一定周期内成交量的归一化多空值,判断资金流入流出。

具体交易规则如下:

1. 做多条件:当天高点突破前一日高点,且收盘价高于移动平均线,成交量多空指标为正,则做多。

2. 平多条件:当收盘价跌破移动平均线时,平掉多单。 

3. 做空条件:当天低点突破前一日低点,且收盘价低于移动平均线,成交量多空指标为负,则做空。

4. 平空条件:当收盘价涨破移动平均线时,平掉空单。

该策略充分考虑了突破、趋势和资金流向等多个方面,形成比较全面的判断体系,可以有效过滤掉一些假突破的噪音。但由于仅基于日内数据进行决策,属于短线操作策略。

### 优势分析

这种高低突破策略具有以下几个优势:

1. 思路简单直观,容易理解实施。

2. 突破前一日高低点,可以捕捉到较强势力的方向。

3. 结合移动平均线进行过滤,避免了许多噪音讯号。

4. 借助资金流动指标,可以判断力量的多空分布。

5. 采用日内交易,可以通过反复进行多次交易来累积利润。

6. 无需复杂的参数优化,较为容易实施。

7. 可适用于不同品种,灵活性较高。

8. 总体来说,策略思路简单清晰,实施难度不大,利润空间可观。

### 风险分析

尽管该策略有许多优点,但也存在以下一些风险:

1. 依赖高低突破,可能发生假突破而造成损失。

2. 过于依赖日内交易,容易受到隔夜事件影响。

3. 移动平均线滞后性可能错过趋势转折点。

4. 成交量指标的效果不稳定,有时会发出错误信号。

5. 无法很好地控制单次损失大小,存在亏损过大的风险。

6. 日内反复交易易受交易费用影响。

7. 优化空间有限,难以持续获得超额收益。

8. 整体来说,策略信号频繁,但稳定性和盈利能力都有待考验。

### 优化方向

该策略可以从以下几个方面进行进一步优化:

1. 加入止损机制,以控制单次损失。

2. 优化移动平均线参数,使其更灵敏或更平稳。

3. 尝试不同的成交量指标,提高资金流判断的准确性。 

4. 增加更多过滤条件,减少假突破机会。

5. 尝试在更高时间框架运行策略,避免过于频繁交易。

6. 引入机器学习等手段,建立自适应交易信号系统。

7. 整合更多数据源进行决策,如新闻事件、宏观环境等。

8. 全面评估策略的稳定性和收益波动风险,不追求过高收益。

### 总结

本策略总体来说是一种简单直观的高低突破策略思路,核心在于掌握价量关系和趋势判断。它有一定的优势,但也存在风险,需要进一步优化和验证。如果能够控制风险、稳定盈利,这可以是一个具有实战价值的短线策略思路。但更高效稳定的策略还需要引入更多因素进行建模,并进行严格的回测验

证。

||

### Overview

This is a simple intraday trading strategy that combines daily high/low points, moving average and volume. The main idea is to use the breakout of previous day's high/low points, moving average direction and fund flow as entry signals.

### Strategy Logic

The strategy is mainly based on the following indicators:

1. Daily high/low points: Record the highest and lowest prices of the previous trading day as the benchmark for breakout judgment.

2. Moving average: Calculate the moving average of closing prices over a certain period as a reference for the overall trend. 

3. Volume money flow: Calculate the normalized long/short value of volume over a period to determine fund inflows and outflows.

The specific trading rules are:

1. Long condition: When the day high breaks the previous day's high, and the close is above the moving average, and volume money flow is positive, go long.

2. Close long position: When the close breaks below the moving average, close long positions.

3. Short condition: When the day low breaks the previous day's low, and the close is below the moving average, and volume money flow is negative, go short. 

4. Close short position: When the close breaks above the moving average, close short positions.

The strategy takes into account breakout, trend and capital flow comprehensively, forming a complete judgment system that can effectively filter out false breakout noises. But since it only makes decisions based on intraday data, it is a short-term trading strategy.

### Advantage Analysis 

This high/low breakout strategy has the following advantages:

1. The logic is simple and intuitive, easy to understand and implement.

2. Breaking the previous day's high/low points can capture the direction of stronger forces.

3. Filtering with moving averages avoids many noisy signals. 

4. Capital flow indicators help determine the long/short distribution of forces.

5. Intraday trading allows accumulating profits through multiple trades.

6. No complex parameter optimization is required, relatively easy to implement.

7. Applicable to different products with high flexibility.

8. Overall, the strategy idea is simple and clear, with little difficulty in implementation and considerable profit potential.

### Risk Analysis

Although the strategy has many advantages, there are also some risks:

1. Reliance on high/low breakouts may cause losses from false breakouts. 

2. Overly reliant on intraday trading, easily affected by overnight events.

3. Lagging of moving averages may miss trend turning points. 

4. Volume indicators can sometimes give wrong signals.

5. Unable to well control the loss size of single bets, with risk of oversized losses.

6. Frequent intraday trading is impacted by trading costs.

7. Limited optimization space makes it hard to achieve persistent alpha.

8. Overall, the strategy has high signal frequency but unproven stability and profitability.

### Optimization Directions

The strategy can be further optimized in the following aspects:

1. Add stop loss to control single bet risk.

2. Optimize moving average parameters for more sensitivity or smoothness.

3. Try different volume indicators to improve capital flow judgment.

4. Add more filters to reduce false breakout chances. 

5. Run the strategy in higher timeframes to avoid over-trading. 

6. Introduce machine learning for adaptive signal generation.

7. Incorporate more data for decision making, e.g. news, macros etc.

8. Comprehensively evaluate stability and risk, not pursuing excess returns.

### Conclusion

In summary, this is a simple and intuitive high/low breakout strategy, focusing on price-volume relationship and trend judgment. It has some merits but also risks, requiring further optimization and verification. If properly risk-managed, it can be a practical short-term strategy idea. But more efficient and robust strategies need more modeling factors and rigorous backtesting.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|24|(?Optimization paramters)Length MA|
|v_input_source_1_close|0|Source MA: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|20|CMF Length|


> Source (PineScript)

``` pinescript
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=5

strategy(title='Daily HIGH/LOW strategy', overlay=true, initial_capital=10000, calc_on_every_tick=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.1)

////////////////////////////GENERAL INPUTS//////////////////////////////////////
len = input.int(24, minval=1, title='Length MA', group='Optimization paramters')
src = input.source(close, title='Source MA', group='Optimization paramters')
out = ta.ema(src, len)

length = input.int(20, minval=1, title='CMF Length', group='Optimization paramters')
ad = close == high and close == low or high == low ? 0 : (2 * close - low - high) / (high - low) * volume
mf = math.sum(ad, length) / math.sum(volume, length)

f_secureSecurity(_symbol, _res, _src) =>
    request.security(_symbol, _res, _src[1], lookahead=barmerge.lookahead_on)

pricehigh = f_secureSecurity(syminfo.tickerid, 'D', high)
pricelow = f_secureSecurity(syminfo.tickerid, 'D', low)

plot(pricehigh, title='Previous Daily High', style=plot.style_linebr, linewidth=2, color=color.new(color.white, 0))
plot(pricelow, title='Previous Daily Low', style=plot.style_linebr, linewidth=2, color=color.new(color.white, 0))

short = ta.crossunder(low, pricelow) and close < out and mf < 0
long = ta.crossover(high, pricehigh) and close > out and mf > 0


if short and barstate.isconfirmed
    strategy.entry('short', strategy.short, when=barstate.isconfirmed, stop=pricelow[1])
    strategy.close('short', when=close > out)

if long and barstate.isconfirmed
    strategy.entry('long', strategy.long, when=barstate.isconfirmed, stop=pricehigh[1])
    strategy.close('long', when=close < out)



```

> Detail

https://www.fmz.com/strategy/427668

> Last Modified

2023-09-23 15:07:58
