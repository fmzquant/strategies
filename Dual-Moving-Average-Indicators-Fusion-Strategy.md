
> Name

Dual-Moving-Average-Indicators-Fusion-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
双均线指标融合交易策略

该策略通过整合2/20均线指标和绝对价格震荡指标APO,形成交易信号。

首先,它计算20周期的EMA均线,当价格跌破或突破均线时产生简单的做多做空信号。其次,它计算快速EMA均线和慢速EMA均线的差值得到APO指标,根据其正负情况判断多头和空头趋势。

最后,该策略整合两种指标:当2/20均线和APO同时发出做多或做空信号时,对应的开仓;当两者发出相反信号时,进行平仓。

这种双指标策略的优势在于能够发挥各自的技术优势,互相验证信号,改善策略表现。但也存在整合时滞后的问题。

总的来说,双均线指标融合策略结合简单和复杂指标,能够过滤掉一些噪音交易,但需要适当优化参数,并严格遵循建议的使用时间范围,否则实盘效果无法保证。

||Dual Moving Average Indicators Fusion Strategy

This strategy integrates the 2/20 MA indicator and the Absolute Price Oscillator (APO) to generate trading signals.

First, it calculates a 20-period EMA and generates simple long/short signals when price breaks above or below the EMA. Second, it computes the APO indicator from fast and slow EMA differential to determine bullish/bearish momentum. 

Finally, the strategy combines both indicators: long/short entries are triggered when 2/20 MA and APO both give corresponding signals; exits occur when the two issue opposite signals.

The advantage of this dual-indicator strategy is tapping into the technical strengths of each and verifying signals to improve performance. However, integration lag exists.

In summary, the dual moving average fusion strategy synergizes simple and complex indicators to filter noise trades, but proper parameter tuning is required, along with strictly following the suggested usage timeframe, otherwise live performance cannot be guaranteed.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|(?●═════ 2/20 EMA ═════●)Length|
|v_input_int_2|10|(?●═════ Absolute Price Oscillator APO  ═════●)LengthShortEMA|
|v_input_int_3|20|LengthLongEMA|
|v_input_bool_1|false|(?●═════ MISC ═════●)Trade reverse|
|v_input_int_4|true|(?●═════ Time Start ═════●)From Day|
|v_input_int_5|true|From Month|
|v_input_int_6|2005|From Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-03-23 00:00:00
period: 12h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 14/01/2022
// This is combo strategies for get a cumulative signal. 
//
// First strategy
// This indicator plots 2/20 exponential moving average. For the Mov 
// Avg X 2/20 Indicator, the EMA bar will be painted when the Alert criteria is met.
//
// Second strategy
// The Absolute Price Oscillator displays the difference between two exponential 
// moving averages of a security's price and is expressed as an absolute value.
// How this indicator works
//    APO crossing above zero is considered bullish, while crossing below zero is bearish.
//    A positive indicator value indicates an upward movement, while negative readings 
//      signal a downward trend.
//    Divergences form when a new high or low in price is not confirmed by the Absolute Price 
//      Oscillator (APO). A bullish divergence forms when price make a lower low, but the APO 
//      forms a higher low. This indicates less downward momentum that could foreshadow a bullish 
//      reversal. A bearish divergence forms when price makes a higher high, but the APO forms a 
//      lower high. This shows less upward momentum that could foreshadow a bearish reversal.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
EMA20(Length) =>
    pos = 0.0
    xPrice = close
    xXA = ta.ema(xPrice, Length)
    nHH = math.max(high, high[1])
    nLL = math.min(low, low[1])
    nXS = nLL > xXA or nHH < xXA ? nLL : nHH
    iff_1 = nXS < close[1] ? 1 : nz(pos[1], 0)
    pos := nXS > close[1] ? -1 : iff_1
    pos

APO(LengthShortEMA, LengthLongEMA) =>
    pos = 0.0
    xPrice = close
    xShortEMA = ta.ema(xPrice, LengthShortEMA)
    xLongEMA = ta.ema(xPrice, LengthLongEMA)
    xAPO = xShortEMA - xLongEMA
    iff_1 = xAPO < 0 ? -1 : nz(pos[1], 0)
    pos := xAPO > 0 ? 1 : iff_1
    pos

strategy(title='Combo 2/20 EMA & Absolute Price Oscillator (APO) ', shorttitle='Combo', overlay=true)
var I1 = '●═════ 2/20 EMA ═════●'
Length = input.int(14, minval=1, group=I1)
var I2 = '●═════ Absolute Price Oscillator (APO)  ═════●'
LengthShortEMA = input.int(10, minval=1, group=I2)
LengthLongEMA = input.int(20, minval=1, group=I2)
var misc = '●═════ MISC ═════●'
reverse = input.bool(false, title='Trade reverse', group=misc)
var timePeriodHeader = '●═════ Time Start ═════●'
d = input.int(1, title='From Day', minval=1, maxval=31, group=timePeriodHeader)
m = input.int(1, title='From Month', minval=1, maxval=12, group=timePeriodHeader)
y = input.int(2005, title='From Year', minval=0, group=timePeriodHeader)

StartTrade = time > timestamp(y, m, d, 00, 00) ? true : false
posEMA20 = EMA20(Length)
prePosAPO = APO(LengthShortEMA, LengthLongEMA)
iff_1 = posEMA20 == -1 and prePosAPO == -1 and StartTrade ? -1 : 0
pos = posEMA20 == 1 and prePosAPO == 1 and StartTrade ? 1 : iff_1
iff_2 = reverse and pos == -1 ? 1 : pos
possig = reverse and pos == 1 ? -1 : iff_2
if possig == 1
    strategy.entry('Long', strategy.long)
if possig == -1
    strategy.entry('Short', strategy.short)
if possig == 0
    strategy.close_all()
barcolor(possig == -1 ? #b50404 : possig == 1 ? #079605 : #0536b3)
```

> Detail

https://www.fmz.com/strategy/426377

> Last Modified

2023-09-11 16:32:22
