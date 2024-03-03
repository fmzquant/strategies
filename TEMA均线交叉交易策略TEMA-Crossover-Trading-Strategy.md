
> Name

TEMA均线交叉交易策略TEMA-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略采用两条不同周期的TEMA指标进行交叉交易,捕捉中间周期的价格趋势。TEMA指标可有效过滤价格噪音,识别趋势反转。

策略原理:

1. 分别计算一快一慢两条TEMA均线。典型参数为快线5周期,慢线8周期。

2. 当快线从下方向上突破慢线时,进行做多操作。

3. 当快线从上方向下突破慢线时,进行做空平仓操作。

4. 可选择根据K线实体方向进行过滤,避免反向交易。 

5. 设置回测周期,模拟历史交易信号。

该策略的优势:

1. TEMA指标对价格噪音的过滤作用强。

2. 快慢TEMA配合,可捕捉中间周期趋势。

3. 方向过滤避免逆势建仓,可提高获胜概率。

该策略的风险:

1. TEMA仍存在滞后问题,可能错过最佳入场时点。

2. 需要对参数组合进行优化,以达到最佳匹配度。

3. 震荡 Musikschule下难以持续获取信号。

总之,该策略通过两TEMA交叉进行跟踪交易,可有效过滤噪音,提高稳定性。但TEMA滞后问题依然存在,需优化参数以顺应市场节奏。

||

This strategy trades the crossover between two TEMA lines of different periods to capture intermediate-term trends. TEMA filters noise well for identifying trend reversals. 

Strategy Logic:

1. Calculate fast and slow TEMA lines, typically 5 and 8 periods.

2. Go long when fast TEMA crosses above slow TEMA.

3. Exit long when fast TEMA crosses below slow TEMA.

4. Option to filter based on candle direction to avoid counter-trend trades.

5. Backtest over specified period to simulate historical signals.

Advantages:

1. TEMA strongly filters price noise. 

2. Fast/slow combo captures intermediate trends.

3. Direction filter improves win rate by avoiding counter-trend entries.

Risks:

1. TEMA still lags, potentially missing best entries.

2. Parameter tuning needed for ideal match.

3. Difficult to sustain signals in ranging markets.

In summary, this strategy crosses TEMA lines to trade trends with noise filtering for stability. But TEMA lag persists, requiring optimization to match market pace. 

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Start Year|
|v_input_2|12|Start Month|
|v_input_3|17|Start Day|
|v_input_4|9999|End Year|
|v_input_5|true|End Month|
|v_input_6|true|End Day|
|v_input_7|5|Fast TEMA|
|v_input_8|8|Slow TEMA|
|v_input_9|true|Use bar's direction ?|
|v_input_10|2|direction bars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-11 00:00:00
end: 2023-09-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("Tema",overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, commission_type=strategy.commission.percent, commission_value=0.075)
startP = timestamp(input(2017, "Start Year"), input(12, "Start Month"), input(17, "Start Day"), 0, 0)
end   = timestamp(input(9999, "End Year"),   input(1, "End Month"),   input(1, "End Day"),   0, 0)
_testPeriod() =>
    iff(time >= startP and time <= end, true, false)

tema_length_1 = input(5, "Fast TEMA")
tema_length_2 = input(8, "Slow TEMA")
usedir       = input(true, "Use bar's direction ?" )
dirtime      = input(2,"direction bars")

tema(sec, length)=>
    tema1= ema(sec, length)
    tema2= ema(tema1, length)
    tema3= ema(tema2, length)
    tema = 3*tema1-3*tema2+tema3

tema1 = tema(hlc3, tema_length_1)
tema2 = tema(hlc3, tema_length_2)

dir=if close/close[dirtime] > 1
    1
else
    -1

plot(tema1, color=color.green, transp=50)
plot(tema2, color=color.red, transp=50)


up =  crossover(tema1, tema2) 
down = crossunder(tema1, tema2)

long_condition =  up and (usedir ? dir==1 : true) and _testPeriod()
strategy.entry('BUY', strategy.long, when=long_condition)  
 
short_condition =  down
strategy.close('BUY', when=short_condition)
```

> Detail

https://www.fmz.com/strategy/426510

> Last Modified

2023-09-12 16:40:50
