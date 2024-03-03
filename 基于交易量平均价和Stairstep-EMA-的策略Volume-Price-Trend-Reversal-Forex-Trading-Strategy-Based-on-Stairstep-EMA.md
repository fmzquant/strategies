
> Name

基于交易量平均价和Stairstep-EMA-的策略Volume-Price-Trend-Reversal-Forex-Trading-Strategy-Based-on-Stairstep-EMA

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18570a8fd65b8c926ed.png)
[trans]


## 概述

这是一个短周期(1-5分钟)的外汇黄金交易策略,主要利用潮位理论中的量价关系和多重 Stairstep EMA 来预测趋势反转点,进行短周期的趋势跟踪交易。该策略适用于高频交易。

## 原理

该策略的交易信号来源于两部分:

1. 基于交易量平均价的量价关系判断。具体来说,策略通过计算不同周期(可配置)的交易量平均价EMA,来判断多空趋势的变化。如果短周期EMA上穿较长周期的EMA,认为是看涨信号;如果短周期EMA下穿较长周期的EMA,认为是看跌信号。

2. 基于Stairstep EMA判断的反转信号。Stairstep EMA指的是设置不同参数的多重EMA均线,例如10日线、20日线、50日线等,根据它们的排列顺序来判断趋势反转。如果短周期EMA先于长周期EMA转折,说明趋势在反转。

策略会综合这两种信号来决定入场。具体来说,如果量价关系判断为看涨,并且Stairstep EMA显示多重EMA均已转折看涨,那么将入场做多;相反,如果量价关系判断为看跌,并且Stairstep EMA显示多重EMA均已转折看跌,那么将入场做空。

## 优势

这种策略结合了交易量平均价和多重EMA的优势,可以提高信号的准确性和稳定性:

1. 基于交易量平均价判断量价关系,可以比单纯的价格EMA判断更准确,避免被增强的价格震荡误导。

2. Stairstep EMA可以通过不同参数EMA的排列顺序增加判断的维度,避免单一EMA带来的噪音。

3. 两种信号的结合可以实现互相验证,减少假信号。

4. 适用于高频短周期交易,可以快速抓取小范围的反转机会。

5. 策略参数可以灵活配置,适应不同品种和周期的优化。

## 风险

该策略也存在一些风险:

1. 过于依赖技术指标,存在被异动行情误导的可能。

2. 短周期操作对交易成本比较敏感,需要控制好滑点和手续费。 

3. 短周期EMA参数需要经常优化,否则可能失效。

4. 量价背离不一定产生反转,存在误判风险。

5. 多重EMA排列顺序的判断并不完全可靠,也可能产生误判。

对应措施:

1. 结合更多基本面因素进行判断。 

2. 调整仓位确保单笔止损不会过大。

3. 定期重新测试和优化参数。

4. 在关键支持阻力区域附近交易,提高成功率。

5. 与其他指标结合使用,进行多维度验证。

## 优化方向 

该策略还可以从以下方面进行优化:

1. 测试不同的量价关系计算方式,寻找更稳定的参数。

2. 增加更多层次的Stairstep EMA指标判断。

3. 结合其他指标信号进行过滤,例如RSI,MACD等。

4. 优化止损机制,例如移动止损、挂单止损等。

5. 根据不同品种特点优化参数,制定适合该品种的参数集。

6. 增加机器学习算法,利用大数据训练判断模型。

7. 探索不同的exit策略,例如固定退出,趋势跟踪退出等。

8. 引入自适应参数机制,根据市场变化自动调整参数。

## 总结

本策略综合利用交易量平均价和Stairstep EMA两种指标优势进行短周期趋势跟踪交易。该策略具有较高的稳定性和准确性,但也需要注意风险控制和参数优化。如果持续优化测试,配合其他技术指标使用,可以成为高效的短周期交易策略。

||

# 

## Overview

This is a short-term (1-5 minutes) forex trading strategy that mainly utilizes the volume price relationship in tidal theory and multiple Stairstep EMAs to predict trend reversal points for short-term trend tracking trading. The strategy is suitable for high-frequency trading.

## Principle 

The trading signals of this strategy come from two parts:

1. Volume price relationship judgment based on volume average price. Specifically, the strategy calculates the EMA of volume average price of different periods (configurable) to judge the change in bullish and bearish trends. If the short period EMA crosses above the longer period EMA, it is considered a bullish signal. If the short period EMA crosses below the longer period EMA, it is considered a bearish signal.

2. Trend reversal signals judged by Stairstep EMA. Stairstep EMA refers to setting multiple EMAs with different parameters, such as 10-day, 20-day, 50-day, etc. Judging trend reversal according to their order. If the short period EMA turns ahead of the long period EMA, it means the trend is reversing.

The strategy will combine these two signals to determine entry. Specifically, if the volume price relationship is judged as bullish, and the Stairstep EMA shows that multiple EMAs have turned bullish, long positions will be taken. Conversely, if the volume price relationship is judged as bearish, and the Stairstep EMA shows multiple EMAs have turned bearish, short positions will be taken.

## Advantages

This strategy combines the advantages of volume average price and multiple EMAs, which can improve the accuracy and stability of signals:

1. Judging the volume price relationship based on volume average price can be more accurate than simply price EMA judgment, avoiding being misled by enhanced price fluctuations.

2. Stairstep EMA can increase the dimension of judgment by the order of different parameter EMAs, avoiding the noise of a single EMA. 

3. The combination of the two signals enables mutual verification and reduces false signals.

4. It is suitable for high-frequency short-term trading and can quickly capture small reversal opportunities within the range.

5. The strategy parameters can be flexibly configured to optimize for different varieties and frequencies.

## Risks

This strategy also has some risks:

1. Overly dependent on technical indicators, there is a possibility of being misled by erratic market conditions.

2. Short-term operations are relatively sensitive to trading costs, slippage and commissions need to be well controlled.

3. Short-term EMA parameters need frequent optimization, otherwise they may become invalid. 

4. Volume price divergence does not necessarily generate reversal, there is a risk of misjudgment.

5. The order of multiple EMAs is not completely reliable and may also cause misjudgments.

Countermeasures:

1. Combine more fundamental factors for judgment.

2. Adjust positions to ensure losses on single trades are not too large. 

3. Regularly retest and optimize parameters.

4. Trade near key support/resistance levels to increase success rate.

5. Use with other indicators for multi-dimensional verification.

## Optimization Directions

This strategy can also be optimized in the following aspects:

1. Test different methods of calculating volume price relationship to find more stable parameters.

2. Increase more levels of Stairstep EMA indicators.

3. Combine other indicator signals for filtering, such as RSI, MACD, etc.

4. Optimize stop loss mechanisms like moving stop loss, pending orders, etc.

5. Optimize parameters based on characteristics of different trading instruments to develop suitable parameter sets.

6. Introduce machine learning algorithms to train judgment models using big data.

7. Explore different exit strategies such as fixed exits, trend tracking exits, etc. 

8. Introduce adaptive parameter mechanisms to automatically adjust parameters based on market changes.

## Summary 

This strategy combines the advantages of volume average price and Stairstep EMA for short-term trend tracking trading. The strategy has high stability and accuracy, but risk control and parameter optimization need to be noted. With continuous optimization and testing, combined with other technical indicators, it can become an efficient short-term trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|2|(?Optimization Parameters)Period Fractals|
|v_input_1_hl2|0|Source for EMA's: hl2|high|low|open|close|hlc3|hlcc4|ohlc4|
|v_input_int_2|10|Length EMA 1|
|v_input_int_3|20|Length EMA 2|
|v_input_int_4|100|Length EMA 3|
|v_input_2|25|(?Risk Management)TP in PIPS|
|v_input_3|25|SL in PIPS|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-01 00:00:00
end: 2023-10-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=5

strategy("Forex Fractal EMA Scalper", overlay=true)
// Define "n" as the number of periods and keep a minimum value of 2 for error handling.
n = input.int(title="Period Fractals", defval=2, minval=2, group="Optimization Parameters")

src = input(hl2, title="Source for EMA's", group="Optimization Parameters")
len1 = input.int(10, minval=1, title="Length EMA 1", group="Optimization Parameters")
out1 = ta.ema(src, len1)
len2 = input.int(20, minval=1, title="Length EMA 2", group="Optimization Parameters")
out2 = ta.ema(src, len2)
len3 = input.int(100, minval=1, title="Length EMA 3", group="Optimization Parameters")
out3 = ta.ema(src, len3)



// UpFractal
bool upflagDownFrontier = true
bool upflagUpFrontier0 = true
bool upflagUpFrontier1 = true
bool upflagUpFrontier2 = true
bool upflagUpFrontier3 = true
bool upflagUpFrontier4 = true

for i = 1 to n
    upflagDownFrontier := upflagDownFrontier and (high[n-i] < high[n])
    upflagUpFrontier0 := upflagUpFrontier0 and (high[n+i] < high[n])
    upflagUpFrontier1 := upflagUpFrontier1 and (high[n+1] <= high[n] and high[n+i + 1] < high[n])
    upflagUpFrontier2 := upflagUpFrontier2 and (high[n+1] <= high[n] and high[n+2] <= high[n] and high[n+i + 2] < high[n])
    upflagUpFrontier3 := upflagUpFrontier3 and (high[n+1] <= high[n] and high[n+2] <= high[n] and high[n+3] <= high[n] and high[n+i + 3] < high[n])
    upflagUpFrontier4 := upflagUpFrontier4 and (high[n+1] <= high[n] and high[n+2] <= high[n] and high[n+3] <= high[n] and high[n+4] <= high[n] and high[n+i + 4] < high[n])
flagUpFrontier = upflagUpFrontier0 or upflagUpFrontier1 or upflagUpFrontier2 or upflagUpFrontier3 or upflagUpFrontier4

upFractal = (upflagDownFrontier and flagUpFrontier)


// downFractal
bool downflagDownFrontier = true
bool downflagUpFrontier0 = true
bool downflagUpFrontier1 = true
bool downflagUpFrontier2 = true
bool downflagUpFrontier3 = true
bool downflagUpFrontier4 = true

for i = 1 to n
    downflagDownFrontier := downflagDownFrontier and (low[n-i] > low[n])
    downflagUpFrontier0 := downflagUpFrontier0 and (low[n+i] > low[n])
    downflagUpFrontier1 := downflagUpFrontier1 and (low[n+1] >= low[n] and low[n+i + 1] > low[n])
    downflagUpFrontier2 := downflagUpFrontier2 and (low[n+1] >= low[n] and low[n+2] >= low[n] and low[n+i + 2] > low[n])
    downflagUpFrontier3 := downflagUpFrontier3 and (low[n+1] >= low[n] and low[n+2] >= low[n] and low[n+3] >= low[n] and low[n+i + 3] > low[n])
    downflagUpFrontier4 := downflagUpFrontier4 and (low[n+1] >= low[n] and low[n+2] >= low[n] and low[n+3] >= low[n] and low[n+4] >= low[n] and low[n+i + 4] > low[n])
flagDownFrontier = downflagUpFrontier0 or downflagUpFrontier1 or downflagUpFrontier2 or downflagUpFrontier3 or downflagUpFrontier4

downFractal = (downflagDownFrontier and flagDownFrontier)

// plotshape(downFractal, style=shape.triangledown, location=location.belowbar, offset=-n, color=#F44336, size = size.small)
// plotshape(upFractal, style=shape.triangleup,   location=location.abovebar, offset=-n, color=#009688, size = size.small)


long= out1 > out2 and out2>out3 and upFractal
short= out1 < out2 and out2<out3 and downFractal


strategy.entry("long",strategy.long,when= short)
strategy.entry("short",strategy.short,when=long)

tp=input(25, title="TP in PIPS", group="Risk Management")*10
sl=input(25, title="SL in PIPS", group="Risk Management")*10


strategy.exit("X_long", "long", profit=tp,  loss=sl  )
strategy.exit("x_short", "short",profit=tp, loss=sl  )

```

> Detail

https://www.fmz.com/strategy/431426

> Last Modified

2023-11-07 17:03:57
