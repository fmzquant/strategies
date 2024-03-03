
> Name

利用双均线反转策略Dual-Moving-Average-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/156d6cb538d36d08558.png)

[trans]

### 概述

本策略是一个利用双均线判断市场反转的短线交易策略。它通过判断前三根K线的收盘关系来判断目前处于上涨趋势还是下跌趋势,当检测到趋势发生转折时,采取适当的做多做空操作。同时,策略还利用简单移动平均线来过滤做空信号,降低交易风险。

### 策略原理

本策略主要判断指标为前三根K线的收盘价格关系。如果前三根K线都是阴线,则判断目前处于下跌趋势;如果前三根K线都是阳线,则判断目前处于上涨趋势。当下跌趋势后出现大阳线时,做多;当上涨趋势后出现大阴线时,做空。

做多的具体判断逻辑是:如果前三根K线都是阴线,且最后一根K线为大阴线,则做多。平仓判断逻辑为当价格涨破前一根K线的最高点时平仓。

做空的具体判断逻辑是:如果前三根K线都是阳线,且最后一根K线为大阳线,同时价格低于简单移动平均线时做空。平仓判断逻辑为当价格跌破前一根K线的最低点时平仓。

移动平均线长度和判断大阳大阴线的幅度大小由用户设置输入。

### 策略优势

1. 利用K线形态判断市场反转点,避免在趋势中互相追击,减少亏损。

2. 结合移动平均线过滤信号,避免在目标上行中过早做空。

3. 策略逻辑简单清晰,容易理解和修改。

4. 可自定义参数,适应不同品种和时间周期。

5. 在一定条件下,有利于及时捕捉短期调整机会。

### 策略风险

1. 市场可能出现连续三根大阴线或者大阳线的假反转,此时入场会被套牢。可设置更严格的反转条件以降低此风险。

2. 反转失败后容易被追涨杀跌。可设置止损点以控制风险。

3. 参数设置不当可能导致过于频繁出入场或者错过良机。需反复测试优化参数。 

4. 大盘震荡时,容易被套。可加大阳线阴线判定标准避免误判。

### 策略优化

1. 利用更复杂指标结合K线形态判断反转,例如BOLL,MACD等,可提高判断准确率。

2. 增加交易量或者波动度等指标与K线形态组合,避免Volume空头。

3. 增加止损逻辑。设置固定点数止损或跟踪止损。

4. 对参数进行优化,找到最佳参数组合。

5. 测试更多品种和周期的数据,寻找最佳适用环境。

### 总结

本策略总体来说是一个利用简单指标捕捉市场短期反转的较为通用的短线策略。它的优点是容易理解,逻辑清晰,通过一定优化可以取得不错效果。但也存在一些典型的反转策略风险,需要通过设置止损,严格反转条件判断等手段来控制风险。该策略可作为量化交易的入门策略来学习和实践。

|| 

### Overview  

This is a short-term trading strategy that utilizes dual moving averages to determine market reversals. It judges the current uptrend or downtrend by examining the closing relationship of the previous three candlestick bars. When a trend reversal is detected, appropriate long or short positions are taken. Meanwhile, the strategy also uses a simple moving average to filter short signals and reduce trading risk.

### Strategy Principle

The main judging indicator of this strategy is the closing price relationship of the previous three candlestick bars. If the previous three bars are all black candles, it is judged that the current is in a downward trend; if the previous three bars are all white candles, it is judged that the current is in an upward trend. When a large white candle appears after a downward trend, go long; when a large black candle appears after an upward trend, go short.

The specific judgment logic for going long is: if the previous three candlestick bars are all black candles, and the last candlestick bar is a large black candle, then go long. The closing logic is to close the position when the price breaks through the highest point of the previous candlestick bar.

The specific judgment logic for going short is: if the previous three candlestick bars are all white candles, and the last candlestick bar is a large white candle, and the price is below the simple moving average, then go short. The closing logic is to close the position when the price breaks through the lowest point of the previous candlestick bar.

The length of the moving average and the magnitude to judge large white and black candles are set by user input.

### Advantages of the Strategy

1. Use candlestick patterns to determine market reversal points, avoid chasing each other in the trend, and reduce losses.

2. Combine the moving average to filter signals and avoid going short prematurely during the target rally.

3. The strategy logic is simple and clear, easy to understand and modify.

4. Customizable parameters suit different varieties and time cycles.

5. In certain conditions, it is beneficial to capture short-term adjustment opportunities in a timely manner.

### Risks of the Strategy  

1. The market may have consecutive three large black or white candles forming a false reversal, causing losses if taking positions. Set stricter reversal criteria to reduce this risk.

2. Failure to reverse will likely result in being chased by the trend. Set stop loss points to control risk.

3. Improper parameter settings may lead to over-trading or missing opportunities. Parameters need repeated testing and optimization.

4. It is easy to be trapped when the broader market fluctuates greatly. Raise white/black candle determination standards to avoid misjudgment.

### Optimization of the Strategy

1. Use more complex indicators combined with candlestick patterns to determine reversal, such as BOLL, MACD, etc. to improve judgment accuracy.  

2. Add trading volume or volatility indicators combined with candlestick patterns to avoid volume shortages.

3. Add stop loss logic. Set fixed point or tracking stop loss.  

4. Optimize parameters to find the best parameter combination.

5. Test more varieties and cycle data to find the optimal application environment.

### Summary

In general, this strategy is a relatively universal short-term strategy that captures short-term market reversals using simple indicators. Its advantages are easy to understand, clear logic, and good results through some optimization. But there are also some typical reversal strategy risks that need means like stop loss, strict reverse criteria, etc. to control. It can serve as a introductory strategy for quantitative trading to learn and practice.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|70|moveLimit|
|v_input_2|200|maLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-07 00:00:00
end: 2023-12-14 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © stormis
// Based on strategy by hackertrader (original idea by QuantpT)

//@version=5
strategy(title="Mean reversion", shorttitle="MeanRev", precision=16 , overlay=true)

moveLimit = input(70)
maLength = input(200)

ma = ta.sma(close, maLength)

downBar = open > close
isThreeDown = downBar and downBar[1] and downBar[2]
isThreeUp = not downBar and not downBar[1] and not downBar[2]
isBigMoveDown = ((open - close) / (0.001 + high - low)) > moveLimit / 100.0
isBigMoveUp = ((close - open) / (0.001 + high - low)) > moveLimit / 100.0

isLongBuy = isThreeDown and isBigMoveDown
isLongExit = close > high[1]

isShortBuy = isThreeUp and isBigMoveUp
isShortExit = close < low[1]

strategy.entry("Entry Long", strategy.long, when=isLongBuy)
strategy.close("Entry Long", when=isLongExit)

strategy.entry("Entry Short", strategy.short, when=close < ma and isShortBuy)
strategy.close("Entry Short", when=isShortExit)

plot(ma, color=color.gray)
```

> Detail

https://www.fmz.com/strategy/435519

> Last Modified

2023-12-15 16:38:33
