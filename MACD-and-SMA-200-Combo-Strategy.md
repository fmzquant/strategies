
> Name

MACD-and-SMA-200-Combo-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

MACD与SMA 200组合策略

该策略将经典的MACD指标与200周期SMA移动平均线组合使用,形成交易信号。

具体来说,当MACD的直方图和MACD动量均高于0,快速移动平均线高于慢速移动平均线时做多。同时价格高于200周期SMA作为追踪多头的第二条件。反之当直方图和MACD动量低于0,快速移动平均线低于慢速移动平均线并且价格低于200周期SMA时做空。

这种策略的优势是同时利用MACD判断短期趋势和波动节奏,以及SMA判断长期趋势方向。组合使用提高判断准确性,避免被套。但MACD和SMA均有滞后问题,无法及时捕捉转折。

总体来说,MACD与SMA 200组合策略适用于中长期持仓。能够有效捕捉主要趋势转换点。但需要关注指标发出信号时的时间节点,防止追高杀跌之嫌。

||

This strategy combines the classic MACD indicator with the 200-period SMA moving average to generate trading signals.

Specifically, it goes long when both MACD histogram and momentum are above 0, fast MA is above slow MA. Price above 200-period SMA serves as the second filter for bullish bias. The opposite logic triggers shorts.

The advantage of this strategy is utilizing MACD for short-term trend and rhythm, and SMA for long-term trend direction. Combination improves accuracy and avoids whipsaws. However, both MACD and SMA have lagging issues and cannot promptly detect reversals.

In summary, the MACD & SMA 200 combo strategy suits medium-long term holding. It effectively captures major trend change points. But attention is needed on timing of indicator signals to avoid chasing tops/bottoms.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|12|MACD fast moving average|
|v_input_3|26|MACD slow moving average|
|v_input_4|9|MACD signal line moving average|
|v_input_5|200|Very slow moving average|
|v_input_6|true|Enable Bar Color?|
|v_input_7|true|Enable Moving Averages?|
|v_input_8|true|Enable Background Color?|
|v_input_9|50|Max Intraday Loss(%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-11 00:00:00
end: 2023-09-10 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("MACD + SMA 200 Strategy (by ChartArt)", shorttitle="CA_-_MACD_SMA_strategy", overlay=true)

// ChartArt's MACD + SMA 200 Strategy
//
// Version 1.0
// Idea by ChartArt on November 30, 2015.
//
// Here is a combination of the MACD with the
// slow moving average SMA 200 as a strategy.
//
// This strategy goes long if the MACD histogram
// and the MACD momentum are both above zero and
// the fast MACD moving average is above the
// slow MACD moving average. As additional long filter
// the recent price has to be above the SMA 200.
// If the inverse logic is true, the strategy
// goes short. For the worst case there is a
// max intraday equity loss of 50% filter.


// Input
source = input(close)
fastLength = input(12, minval=1, title="MACD fast moving average")
slowLength=input(26,minval=1, title="MACD slow moving average")
signalLength=input(9,minval=1, title="MACD signal line moving average")
veryslowLength=input(200,minval=1, title="Very slow moving average")
switch1=input(true, title="Enable Bar Color?")
switch2=input(true, title="Enable Moving Averages?")
switch3=input(true, title="Enable Background Color?")

// Calculation
fastMA = sma(source, fastLength)
slowMA = sma(source, slowLength)
veryslowMA = sma(source, veryslowLength)
macd = fastMA - slowMA
signal = sma(macd, signalLength)
hist = macd - signal

// Colors
MAtrendcolor = change(veryslowMA) > 0 ? green : red
trendcolor = fastMA > slowMA and change(veryslowMA) > 0 and close > slowMA ? green : fastMA < slowMA and change(veryslowMA) < 0 and close < slowMA ? red : blue
bartrendcolor = close > fastMA and close > slowMA and close > veryslowMA and change(slowMA) > 0 ? green : close < fastMA and close < slowMA and close < veryslowMA and change(slowMA) < 0 ? red : blue
backgroundcolor = slowMA > veryslowMA and crossover(hist, 0) and macd > 0 and fastMA > slowMA and close[slowLength] > veryslowMA ? green : slowMA < veryslowMA and crossunder(hist, 0) and macd < 0 and fastMA < slowMA and close[slowLength] < veryslowMA ? red : na
bgcolor(switch3?backgroundcolor:na,transp=80)
barcolor(switch1?bartrendcolor:na)

// Output
F=plot(switch2?fastMA:na,color=trendcolor)
S=plot(switch2?slowMA:na,color=trendcolor,linewidth=2)
V=plot(switch2?veryslowMA:na,color=MAtrendcolor,linewidth=4)
fill(F,V,color=gray)

// Strategy
buyprice = low
sellprice = high
cancelLong = slowMA < veryslowMA
cancelShort = slowMA > veryslowMA

if (cancelLong)
    strategy.cancel("MACDLE")

if crossover(hist, 0) and macd > 0 and fastMA > slowMA and close[slowLength] > veryslowMA 
    strategy.entry("MACDLE", strategy.long, stop=buyprice, comment="Bullish")

if (cancelShort)
    strategy.cancel("MACDSE")

if crossunder(hist, 0) and macd < 0 and fastMA < slowMA and close[slowLength] < veryslowMA 
    strategy.entry("MACDSE", strategy.short, stop=sellprice, comment="Bearish")

maxIdLossPcnt = input(50, "Max Intraday Loss(%)", type=float)
// strategy.risk.max_intraday_loss(maxIdLossPcnt, strategy.percent_of_equity)

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/426390

> Last Modified

2023-09-11 17:32:34
