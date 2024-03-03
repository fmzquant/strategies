
> Name

EMA多头突破过滤交易策略EMA-Breakout-Filter-Long-Only-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略仅进行做多操作,使用ATR构建通道,过滤EMA均线的假突破信号,追求稳定的多头交易。该策略属于趋势跟踪类策略。

策略原理:

1. 计算n周期EMA均线,代表中长期趋势。 

2. 计算n周期ATR,构建范围通道上下轨。

3. 当价格由下向上突破通道上轨时,进行做多操作。

4. 当价格由上向下突破通道下轨时,进行多单平仓。 

5. ATR通道设置可有效过滤小幅或短期的假突破。

该策略的优势:

1. 使用ATR通道判断,可提高做多信号的可靠性。

2. 仅做多,可减少判断难度,降低风险。

3. 参数优化简单,轻松应对不同市场类型。

该策略的风险:

1. 仅做多无法获得空头行情的超额收益。

2. EMA和ATR均存在滞后问题,入场时点不佳。

3. 长期震荡市场中难以获得持续做多信号。

总之,该策略作为一种简单的趋势跟踪策略,在多头行情中可以获得较优结果,但需警惕滞后及持续震荡的问题。

|| 

This long-only strategy uses an ATR channel to filter fake EMA breakouts for stable trend-following long trades. It focuses solely on long side trading.

Strategy Logic: 

1. Calculate n-period EMA as intermediate-term trend.

2. Calculate n-period ATR for range channel bands.

3. Go long when price breaks above channel top. 

4. Exit long when price breaks below channel bottom.

5. ATR channel filters insignificant or short-term false breakouts.

Advantages:

1. ATR channel improves reliability of long signals.

2. Long only reduces complexity and risks.

3. Simple optimization adapts easily across markets.

Risks:

1. Unable to profit from short-side moves.

2. Both EMA and ATR lag, causing poor entry timing. 

3. Hard to sustain signals in prolonged ranges.

In summary, this simple system can perform well in bull trends but requires caution on lagging indicators and ranging markets.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|21|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2020-09-11 00:00:00
end: 2021-04-17 00:00:00
period: 7d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("EMA Long Only Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)

len = input(21,  minval=1, title="Length")

price = sma(close, 2)
average = ema(close, len)
diff = atr(len)
bull_level = average + diff
bear_level = average - diff
bull_cross = crossover(price, bull_level)
bear_cross = crossover(bear_level, price)

strategy.entry("Buy", strategy.long, when=bull_cross) 
strategy.close("Buy", when=bear_cross) //strategy.entry("Sell", strategy.short, when=bear_cross)
    
plot(price, title="price", color=green, transp=50, linewidth = 4)
plot(average, title="average", color=red, transp=50, linewidth = 4)
a1 = plot(bull_level, title="bull", color=red, transp=50, linewidth = 1)
a2 = plot(bear_level, title="bear", color=red, transp=50, linewidth = 1)
fill(a2, a1, color=red, transp=95)

```

> Detail

https://www.fmz.com/strategy/426516

> Last Modified

2023-09-12 17:12:22
