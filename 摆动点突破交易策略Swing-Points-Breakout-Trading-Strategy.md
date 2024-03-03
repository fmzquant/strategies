
> Name

摆动点突破交易策略Swing-Points-Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

本策略通过识别价格的摆动高点和低点,进行趋势性的突破交易。该策略属于趋势跟踪类策略,旨在捕捉中长线趋势带来的价格波动。

策略原理:

1. 计算指定周期的摆动高点(swing high)和摆动低点(swing low)。

2. 当价格超过摆动高点时,进行买入操作。

3. 当价格跌破摆动低点时,进行卖出操作。

4. 设置止损点为前一摆动低点(多单)或前一摆动高点(空单),以控制风险。

5. 当价格重新跌破止损点时,止损退出仓位。

该策略的优势包括:

1. 识别摆动点可以有效判定趋势。趋势交易属于高胜率操作。

2. 突破摆动点造成价格 behaviors 加速,利于追踪趋势。

3. 止损点设置在关键支撑阻力位,可控制风险。

该策略的风险包括:

1. 识别摆动点常存在滞后,可能错过最佳入场时点。

2. 止损点过于接近,容易被震荡市场击出。应放宽止损范围。

3. 突破容易形成头部效应,必须设置止损以应对回调。

总之,摆动点突破策略通过跟踪中长线趋势,采取趋势性突破操作。该策略可获得较高胜率,但须注意入场时点选择与止损点设置,以优化策略效果。投资者应考虑本策略的风险特性,运用适当的资金管理方式,以obtain 长期稳定收益。

||



This strategy identifies swing highs and lows in price to trade breakouts in the trending direction. It is a trend-following strategy that aims to capture price swings during sustained trends.

Strategy Logic:

1. Identify swing highs and lows over a specified period. 

2. Go long when price breaks above swing high.

3. Go short when price breaks below swing low. 

4. Set stop loss at previous swing low (for long) or swing high (for short) to control risk.

5. If price reverses below stop loss, exit the position.

Advantages:

1. Swing points effectively identify trends. Trend trading has high win rate.

2. Breaking swing points accelerates price behaviors, good for trend following.

3. Stops at key support/resistance levels manage risk.

Risks:

1. Swing points often lag, risk missing best entry timing. 

2. Stops being too tight get hit by market noise. Consider widening range.

3. Breakouts prone to head fakes. Need stops to defend pullbacks.

In summary, the swing points breakout strategy follows medium/long-term trends using trend-based breakout trading. It can achieve high win rate but requires careful entry timing and stop loss placement to optimize performance. Investors should consider its risks and apply appropriate money management for long-term steady gains.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|leftBars|
|v_input_2|true|rightBars|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-12 00:00:00
end: 2023-09-11 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Swing Points", overlay=true)


leftBars = input(1)
rightBars=input(1)
sl = pivotlow(low, leftBars, rightBars)
sh = pivothigh(high, leftBars, rightBars)

last_sh=na
last_sh:= sh!=0 ? sh : nz(last_sh[1])

last_sl=na
last_sl:= sl!=0 ? sl : nz(last_sl[1])


EMA = ema(close,55)

longCondition = sh and high > EMA
shortCondition = sl and close < EMA
exitLongCondition = sl < sh[1]
exitShortCondition = sh > sl[1]

if longCondition 
    strategy.entry("swinghigh", strategy.long, stop=last_sh)
    
if shortCondition 
    strategy.entry("swinglow", strategy.short, stop=last_sl)
   
if exitLongCondition
    strategy.exit("stoplong", "swinghigh", stop = last_sl )

if exitShortCondition
    strategy.exit("stopshort", "swinglow", stop = last_sh )
    
plot(EMA,linewidth = 4)
```

> Detail

https://www.fmz.com/strategy/426480

> Last Modified

2023-09-12 14:40:56
