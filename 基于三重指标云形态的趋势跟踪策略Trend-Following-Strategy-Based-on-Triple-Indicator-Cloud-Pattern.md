
> Name

基于三重指标云形态的趋势跟踪策略Trend-Following-Strategy-Based-on-Triple-Indicator-Cloud-Pattern

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“基于三重指标云形态的趋势跟踪策略”。该策略利用三种不同类型的趋势指标,整合形成云形态,在价格突破云形态时进行趋势跟踪交易。

策略采用以下三种指标:

考夫曼自适应移动平均线,能灵敏捕捉市场波动;

赫尔移动平均线,具有平滑转折特点,可过滤假信号; 

超趋止损机制,建立价格通道,避免追高杀跌。

这三者共同形成云形态,云顶为三者的最高值连线,云底为最低值连线。

具体交易逻辑:

当K线高点突破云顶时,表明突破上升趋势通道,产生买入信号;

当K线收盘价或低点下破云底时,表示下跌趋势开始,平掉多单。

该策略的优势是指标组合判定趋势状态较为准确,降低假信号。但参数优化仍然关键。止损策略也必不可少。

总体来说,多指标集成判断趋势是一种常见而有效的方法。但交易者仍需保持足够的判断力与策略调整的灵活性。

||


This strategy is named “Trend Following Strategy Based on Triple Indicator Cloud Pattern”. It integrates three different types of trend indicators to form a cloud pattern, trading breakouts of the cloud to follow trends.

The three indicators used are:

Kaufman Adaptive Moving Average, sensitive in capturing market volatility. 

Hull Moving Average, with its smooth turns, filters out false signals.

SuperTrend mechanism, forming price channels to avoid chasing highs and selling lows.

Together they form the cloud pattern, with the top band being the highest values of the three, and the bottom band the lowest values. 

The trading logic is:

When candlestick high breaks above the cloud top, it signals breaking the uptrend channel for a buy signal.

When close or low breaks below cloud bottom, it flags the start of a downtrend for closing longs.

The advantage of this strategy is the indicator combo judges trend status more accurately, reducing false signals. But parameter optimization remains critical. Stop loss is also essential.

In summary, using multiple indicators to determine trends is a common and effective approach. But traders still need sound discretion and flexibility in strategy adjustment.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Lengthkaufman|
|v_input_2|20|hull_len|
|v_input_3|2|atr_factor|
|v_input_4|5|atr_period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2023-02-03 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © SnarkyPuppy

//@version=5
strategy("HKST Cloud", overlay=true, default_qty_type= strategy.percent_of_equity, default_qty_value=100)



////////////////nAMA
Lengthkaufman = input(20) 
xPrice = ohlc4
xvnoise = math.abs(xPrice - xPrice[1])
nfastend = 0.666
nslowend = 0.0645
nsignal = math.abs(xPrice - xPrice[Lengthkaufman])
nnoise = math.sum(xvnoise, Lengthkaufman)
nefratio = nnoise != 0? nsignal / nnoise : 0
nsmooth = math.pow(nefratio * (nfastend - nslowend) + nslowend, 2) 
nAMA =  float(0)
nAMA := nz(nAMA[1]) + nsmooth * (xPrice - nz(nAMA[1]))

//plot(nAMA,color=color.red)
///short=input(true)



///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

////////hull moving average
hull_len=input(20)
hull= ta.hma(nAMA,hull_len)

///////atr trail
atr_factor=input(2)
atr_period=input(5)
[supertrend, direction] = ta.supertrend(atr_factor,atr_period)

/////////cloud
band1= math.max(supertrend,hull,nAMA)
band2= math.min(supertrend,hull,nAMA)

b1=plot(band1, "band1", color = color.rgb(76, 175, 79, 85), style=plot.style_linebr)
b2=plot(band2, "band2", color = color.rgb(255, 82, 82, 78), style=plot.style_linebr)
fill(b1,b2,color.rgb(12, 50, 186, 75))
longCondition = ta.crossover(high,band1) //or ta.crossover(low,band2)
if (longCondition)
    strategy.entry("Up", strategy.long)

shortCondition =  ta.crossunder(low,band2) or close<band2
if (shortCondition) 
    strategy.close("Up", shortCondition)


```

> Detail

https://www.fmz.com/strategy/426619

> Last Modified

2023-09-13 17:38:55
