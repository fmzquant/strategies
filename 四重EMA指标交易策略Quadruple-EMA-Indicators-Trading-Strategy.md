
> Name

四重EMA指标交易策略Quadruple-EMA-Indicators-Trading-Strategy

> Author

ChaoZhang

> Strategy Description


This strategy uses four EMA lines with different parameters to form a clear trend-following system for mechanical trading. It aims to track medium-long term trends using a dual EMA crossover method.

Strategy Logic:

1. Calculate two fast and slow EMA pairs, typically 72 and 44 periods. 

2. Go long when fast EMA crosses above slow EMA.

3. Go short when fast EMA crosses below slow EMA.

4. Use colors to mark buy and sell signals. 

5. Backtest over specified period to execute signals.

Advantages:

1. Four EMAs form clear trend patterns.

2. Fast/slow EMA combos effectively track medium-long trends.

3. Crossover rules are simple and avoid overtrading.

Risks:

1. EMA lag may cause missed trend turns. 

2. No stops means unlimited loss on single trades.

3. Poor parameters may cause excessive signals or inconsistencies.

In summary, the quadruple EMA crossover strategy uses fast/slow EMA pairs for mechanical trend trading. The visual interface is intuitive for visual traders. But the lag and lack of stops means prudent risk management is still required for long-term steady gains.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|44|EMA Slow, always < EMA Fast - low short term, high long term |
|v_input_2|72|EMA Fast - low short term, high long term |
|v_input_3|14|Period|
|v_input_4|120|Resolution  - not lower than chart|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-12 00:00:00
end: 2023-09-11 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// strategy(title = "Cuathro EMA Strategy", shorttitle = "Cuathro EMA",initial_capital=1000, commission_value=0.2, commission_type =strategy.commission.percent, default_qty_value=100 , overlay = false, pyramiding=10, default_qty_type=strategy.percent_of_equity)
//@Moneros 2017
// based on OCC by @JayRogers
emaSlowPeriod    = input(defval = 44, title = "EMA Slow, always < EMA Fast - low short term, high long term ", minval = 1)
emaFastPeriod    = input(defval = 72, title = "EMA Fast - low short term, high long term ", minval = 1)
len    = input(defval = 14, title = "Period", minval = 1)
res = input(title="Resolution  - not lower than chart", defval="120")



closeSeries =  request.security(syminfo.tickerid, res, 2 * ta.ema(close, len) - ta.ema(ta.ema(close, len), len)  )
openSeries  = request.security(syminfo.tickerid,res, 2 * ta.ema(close[1], len) - ta.ema(ta.ema(close[1], len), len)  )


slowema = ta.ema(closeSeries - openSeries,emaSlowPeriod)
fastema = ta.ema(closeSeries - openSeries,emaFastPeriod)

plot(slowema, color=color.blue)
plot(fastema,color=color.red)


bgcolor(slowema< fastema ? color.red : na, transp=90)
bgcolor(slowema> fastema ? color.blue : na, transp=90)

bgcolor(ta.crossover(slowema, fastema) ? color.blue : na, transp=40)
bgcolor(ta.crossunder(slowema, fastema) ? color.red : na, transp=40)
strategy.order("BUY", strategy.long, 1, when = ta.crossover(slowema, fastema))
strategy.order("SELL", strategy.short, 1, when = ta.crossunder(slowema, fastema)) 

```

> Detail

https://www.fmz.com/strategy/426483

> Last Modified

2023-09-12 14:53:22
