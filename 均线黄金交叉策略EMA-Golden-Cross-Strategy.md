
> Name

均线黄金交叉策略EMA-Golden-Cross-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]
## 概述

均线黄金交叉策略是一种比较常见的量化交易策略。该策略使用两个不同参数的指数移动均线(EMA),当短期EMA上穿长期EMA时,做多;当短期EMA下穿长期EMA时,平仓。该策略利用了短期EMA能更快响应价格变化,长期EMA更能反映趋势的特点,采用EMA交叉形成交易信号。

## 策略原理

该策略首先定义了两个EMA均线,ema1长度为10,ema2长度为21。然后计算出两条均线的值。当ema1上穿ema2时,说明价格开始向上突破,属于做多信号;当ema1下穿ema2时,说明价格跌破EMA均线,属于平仓信号。 

为了过滤假突破,代码还定义了一个阈值threshold,计算公式为:

```pine
threshold = ((ema1 - ema2)*100) / ((ema1 + ema2)/2)
```

该阈值表示两均线间距占均线平均值的百分比。当threshold大于0.15%时为做多信号,小于-0.006时为平仓信号。

综上,该策略的交易信号总结为:

- 做多信号:ema1上穿ema2,且threshold >= 0.15%
- 平仓信号:ema1下穿ema2,且threshold <= -0.006%

## 优势分析

该策略具有以下优势:

1. 使用EMA均线能平滑价格数据,有利于产生交易信号。

2. 双EMA设定不同参数,可以在响应速度和稳定性上达到平衡。

3. 增加threshold阈值可以过滤假突破,避免无谓交易。

4. 策略思路简单清晰,容易理解实现,适合量化交易初学者。

5. 可灵活调整EMA参数和threshold阈值,优化策略效果。

## 风险分析

该策略也存在一些风险:

1. EMA均线滞后于价格,可能错过短线操作机会。

2. 存在被套牢的风险,如果趋势反转可能造成较大损失。

3. threshold阈值设定不当可能过滤掉有效信号或者发出错误信号。

4. EMA参数不合适,短期和长期EMA无明显特征差异,产生假信号。

5. 大盘波动可能导致止损而被突破,应设置合理的止损。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化EMA参数,测试不同周期参数对策略效果的影响。

2. 优化threshold阈值,平衡过滤假信号和保留有效信号。

3. 增加其他技术指标判断,如MACD,KDJ等,综合判定交易信号。 

4. 加入止损机制,可以是移动止损或者挂单止损,控制单笔损失。

5. 可以考虑加入分批建仓的方法,降低单一入场的风险。

6. 测试不同持仓时间,寻找更合适的持仓周期。

## 总结

均线黄金交叉策略整体思路清晰易懂,利用EMA均线的特点进行交易信号判定。该策略存在一定的优势,同时也要注意一些潜在风险。通过参数优化、止损设置、信号过滤等方法可以获得更好的策略效果。该策略适合作为量化交易的入门策略来学习和实践。

|| 

## Overview

The EMA golden cross strategy is a common quantitative trading strategy. It uses two exponential moving averages (EMAs) with different parameters. When the shorter period EMA crosses above the longer period EMA, it goes long. When the shorter period EMA crosses below the longer period EMA, it closes the position. This strategy utilizes the faster reaction of short period EMA and the trend following ability of long period EMA to generate trading signals.

## Strategy Logic

The strategy first defines two EMAs, ema1 with length 10 and ema2 with length 21. Then it calculates the values of the two EMAs. When ema1 crosses above ema2, it signals an upward breakthrough, which is a long signal. When ema1 crosses below ema2, it signals a breakdown through the EMAs, which is a close position signal.

To filter false breakouts, the code also defines a threshold value, calculated as:

```pine
threshold = ((ema1 - ema2)*100) / ((ema1 + ema2)/2) 
```

This threshold represents the percentage of EMA distance versus the EMA average. When threshold is above 0.15%, it is a long signal. When threshold is below -0.006%, it is a close position signal. 

In summary, the trading signals of this strategy are:

- Long signal: ema1 crosses above ema2, and threshold >= 0.15%  
- Close position signal: ema1 crosses below ema2, and threshold <= -0.006%

## Advantage Analysis

The advantages of this strategy include:

1. Using EMAs can smooth the price data and help generate trading signals.

2. The dual EMA setup balances responsiveness and stability. 

3. The threshold filters false breakouts and avoids unnecessary trades.

4. The strategy logic is simple and clear, suitable for beginners.

5. The EMA parameters and threshold can be optimized.

## Risk Analysis

The risks of this strategy include:

1. EMAs lag prices and may miss short-term opportunities. 

2. Risk of being trapped when trend reverses, potentially leading to large losses.

3. Improper threshold may filter valid signals or generate false signals. 

4. If EMA parameters are unsuitable, the two EMAs may not show significant differences, generating false signals.

5. Stop loss should be set reasonably to avoid being broken by large market swings.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize EMA parameters and test different periods.

2. Optimize the threshold value to balance false signals and valid signals.

3. Add other technical indicators like MACD, KDJ to confirm signals.

4. Add stop loss mechanisms like trailing stop or OCO orders to limit losses.

5. Consider partial position entries to lower risk. 

6. Test different holding periods to find optimal duration.

## Conclusion

The EMA golden cross strategy has clear and simple logic, utilizing the characteristics of EMAs to generate trading signals. The strategy has certain advantages but potential risks exist. The strategy can be improved by optimizing parameters, setting stop loss, filtering signals etc. It is suitable as a beginner's quantitative trading strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|EMA #1 length|
|v_input_2_close|0|EMA Source #1: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|21|EMA #2 length|
|v_input_4_close|0|EMA Source #2: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

if high > ta.highest(high[1], 5)
    strategy.entry("Enter Long", strategy.long)
else if low < ta.lowest(low[1], 5)
    strategy.entry("Enter Short", strategy.short)//@version=3
strategy(title="ema10-21", shorttitle="10/21", overlay=true, pyramiding = 0, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, initial_capital = 2500, commission_type = strategy.commission.percent, commission_value = 0.2)

len1 = input(10, minval=1, title="EMA #1 length")
src1 = input(close, title="EMA Source #1")
a = ta.ema(src1, len1)
plot(a, title="EMA #1", color=color.orange, linewidth=2, style=plot.style_line)

len2 = input(21, minval=1, title="EMA #2 length")
src2 = input(close, title="EMA Source #2")
b = ta.ema(src2, len2)
plot(b, title="EMA #2", color=color.blue, linewidth=2, style=plot.style_line)

threshold = ((a-b)*100)/((a+b)/2)
thresholdUp = threshold > 0.15
thresholdDown = threshold < -0.006

if (thresholdUp) 
    strategy.entry("Buy", strategy.long)
if (thresholdDown) 
    strategy.close("Buy", strategy.long)

//goLong() => (crossover(a, b)) and (threshold >= 0.0025)
//killLong() => (crossunder(a, b)) and (threshold <= -0.0025)
//strategy.entry("Buy", strategy.long, when = goLong())
//strategy.close("Buy", when = killLong())

//threshold = ((a-b)*100)/((a+b)/2)

//achat = out1 > out2
//vente = out1 < out2 //and threshold < -0.025

//strategy.entry("long", true, when = achat)
//strategy.exit("exit", "long", when = vente)
```

> Detail

https://www.fmz.com/strategy/427182

> Last Modified

2023-09-18 21:18:17
