
> Name

RSI差异反转策略RSI-Divergence-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略是基于RSI指标的反转策略。它计算两条不同周期的RSI曲线,并在两条RSI曲线发生金叉或死叉时进行买入或卖出操作。

### 策略原理

1. 计算两条RSI曲线:一条短周期RSI曲线,一条长周期RSI曲线。

2. 当短周期RSI上穿长周期RSI时,判定为看涨信号,做多。

3. 当短周期RSI下穿长周期RSI时,判定为看跌信号,做空。

4. 发出买入信号时,设置止损价为最新价格。 

5. 发出卖出信号时,设置止损价为最新价格。

6. 如果价格触及止损价,则止损退出当前头寸。

### 优势分析

1. 使用RSI指标判断趋势反转点,具有一定的可靠性。

2. 双RSI曲线组合可过滤掉部分噪音交易信号。

3. 设置止损来控制每个头寸的损失。

4. 策略逻辑简单直观,容易实现。

5. RSI参数可自定义,适用于不同市场环境。

### 风险分析

1. RSI指标存在滞后,可能错过突发趋势的反转时点。

2. 止损设置不当可能造成不必要的损失。

3. 双RSI组合仍无法完全避免假突破带来的风险。

- 风险1可以结合其他指标如布林带确认反转。

- 风险2可以采用跟踪止损或挂单止损优化止损策略。

- 风险3可以增加趋势过滤条件,避免假突破。

### 优化方向

1. 测试不同参数的RSI周期组合效果。

2. 评估与其他指标如MACD、KD等组合效果。

3. 增加止损策略如跟踪止损、挂单止损。

4. 加入趋势过滤,避免反向操作。

5. 评估在不同品种和周期的效果。

### 总结

该策略通过RSI差异交叉实现简单的反转交易。双RSI过滤和止损控制了风险。后续可通过多指标组合、优化止损策略等进一步改进效果。

||

### Overview

This strategy is a reversal strategy based on the RSI indicator. It calculates two RSI lines with different lookback periods and enters long or short trades when the two RSI lines cross over.

### Strategy Logic

1. Calculate two RSI lines, one with shorter period and one with longer period.

2. When the shorter period RSI crosses above the longer period RSI, determine a bullish signal for going long.

3. When the shorter period RSI crosses below the longer period RSI, determine a bearish signal for going short.

4. When going long, set stop loss at the latest price.

5. When going short, set stop loss at the latest price. 

6. If price hits stop loss, exit the current position.

### Advantages

1. Using RSI to identify potential reversal points is reasonably reliable.

2. Dual RSI crossover filters out some false signals.

3. Stop loss controls risk for each position.

4. Simple and intuitive logic, easy to implement.

5. Customizable RSI parameters suit different markets.

### Risks

1. RSI lag may miss reversal timing of sudden trend changes. 

2. Improper stop loss setting may cause unnecessary losses.

3. Dual RSI cannot fully avoid false breakout risks.

- Risk 1 can be mitigated by combining indicators like Bollinger Bands.

- Risk 2 can be improved via trailing or pending order stops. 

- Risk 3 can be reduced by adding trend filters.

### Enhancement Opportunities 

1. Test effectiveness of different RSI period combinations.

2. Evaluate combining with indicators like MACD, KD etc.

3. Add stop loss techniques like trailing stops or pending orders.

4. Add trend filter to avoid trading reversals.

5. Assess performance across different products and timeframes.

### Conclusion

This strategy executes simple reversal trades using RSI divergences. Dual RSI and stops control risks. Further improvements can be made through combining indicators, optimizing stops and more.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|length1|
|v_input_2|100|length2|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-18 00:00:00
end: 2023-09-17 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI cross Strategy by alireza v1.1.1", overlay=true)
length1 = input( 25 )
length2 = input( 100 )
price = close


vrsi1 = ta.rsi(price, length1)
vrsi2 = ta.rsi(price, length2)

GC = (close > open)
RC = (open > close)

HH = (close > close[2])
LL = (close < close[2])




cu = ta.crossover(vrsi1, vrsi2)
cd = ta.crossunder(vrsi1, vrsi2)



if (not na(vrsi1))
	if (cu) 
	    sll=price
		strategy.entry("BUY", strategy.long )
		strategy.exit("SL" , limit = sll )
	if (cd)
	    sls=price
		strategy.entry("SELL", strategy.short )
		strategy.exit("SL" , limit = sls )


```

> Detail

https://www.fmz.com/strategy/427119

> Last Modified

2023-09-18 13:54:48
