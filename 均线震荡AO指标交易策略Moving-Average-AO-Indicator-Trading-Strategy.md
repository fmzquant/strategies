
> Name

均线震荡AO指标交易策略Moving-Average-AO-Indicator-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过组合运用均线系统和AO摇摆指标,识别趋势方向并进行趋势交易。该策略属于短线震荡交易类型,旨在捕捉短线价格的反转机会。

策略原理: 

1. 计算快速EMA均线和慢速SMA均线,构建均线系统。

2. 计算AO摇摆指标的快线和慢线,并得到差值。

3. 当快线上穿慢线,且收盘价高于慢线,且AO为上涨状态时,做多。

4. 当快线下穿慢线,且收盘价低于慢线,且AO为下跌状态时,做空。

5. AO通过差值比较确定多空状态,避免假信号。

该策略的优势:

1. 均线系统判断主要趋势,AO指标识别反转时点。

2. AO通过差值比较,可有效过滤假信号。

3. 组合使用指标,可提高信号准确性。

该策略的风险: 

1. 需优化均线和AO参数以匹配市场行情。

2. 均线和AO均存在滞后问题,可能错过最佳入场点位。

3. 震荡行情中止损难以设置,亏损风险较大。

总之,该策略综合均线系统和AO指标的优点进行交易。可在一定程度上提高信号质量,但需警惕滞后问题,并采取适当止损策略,方能获得长期稳定收益。

||

This strategy combines moving averages and the AO oscillator to identify trends and trade pullbacks. It aims to capture short-term reversals in price oscillation. 

Strategy Logic:

1. Calculate fast EMA and slow SMA to construct a moving average system.

2. Calculate fast and slow AO lines and the difference between them.

3. Go long when fast MA crosses above slow MA, close is above slow MA, and AO rises. 

4. Go short when fast MA crosses below slow MA, close is below slow MA, and AO falls.

5. AO compares differences to avoid false signals.

Advantages:

1. MAs determine main trend, AO times reversals.

2. AO difference filters false signals. 

3. Combining indicators improves accuracy.

Risks:

1. Tuning required to match MA and AO with market conditions.

2. Both MAs and AO lag, potentially missing best entries.

3. Hard to set stops in ranging markets, increasing loss risks.

In summary, this strategy combines the strengths of MAs and AO for trading. This can improve signal quality to some extent but proper stops are still required to manage risks for steady returns.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Start Year|
|v_input_2|12|Month|
|v_input_3|17|Day|
|v_input_4|9999|End Year|
|v_input_5|true|Month|
|v_input_6|true|Day|
|v_input_7|8|Fast EMA|
|v_input_8|20|Slow SMA|
|v_input_9|5|Awesome Length Fast|
|v_input_10|8|Awesome Length Slow|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-04 00:00:00
end: 2023-09-11 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("MA&AO", overlay = true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075, currency='USD')
startP = timestamp(input(2017, "Start Year"), input(12, "Month"), input(17, "Day"), 0, 0)
end   = timestamp(input(9999, "End Year"),   input(1, "Month"),   input(1, "Day"),   0, 0)
_testPeriod() =>
    true

//Inputs
fast_ma = input(8, title="Fast EMA", minval=2)
slow_ma = input(20, minval=1, title="Slow SMA")
AO_fast = input(5, minval=1, title="Awesome Length Fast")
AO_slow = input(8, minval=1, title="Awesome Length Slow")

//MA
fast  = ema(close, fast_ma)
slow =  sma(close, slow_ma)

//AO
AO_1 = sma(hl2, AO_fast)
AO_2 = sma(hl2, AO_slow)
dif = AO_1 - AO_2
AO = dif>=0? dif > dif[1] ? 1 : 2 : dif > dif[1] ? -1 : -2

long   =  crossover(fast, slow) and close > slow and abs(AO)==1
short =   fast < slow and close < slow and abs(AO)==2

long_condition =  long and _testPeriod() 
strategy.entry('BUY', strategy.long, when=long_condition)  
 
short_condition = short 
strategy.close('BUY', when=short_condition)


plot(fast, color=color.green)
plot(slow, color=color.red)
```

> Detail

https://www.fmz.com/strategy/426500

> Last Modified

2023-09-12 16:09:01
