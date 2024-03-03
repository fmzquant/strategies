
> Name

Momentum-based-ZigZag

> Author

ChaoZhang

> Strategy Description

I spent a lot of time searching for the best ZigZag indicator . Difficulty with all of them is that they are always betting on some pre-defined rules which identify or confirm pivot points . Usually it is time factor - pivot point gets confirmed after a particular number of candles. This methodology is probably the best when market is moving relatively slow, but when price starts chopping up and down, there is no way the ZigZag follows accurately. On the other hand if you set it too tight (for example pivot confirmation after only 2 or even 1 candle), you will get hundreds of zigzag lines and they will tell you nothing.

My point of view is to follow the market. If it has reversed, then it has reversed, and there is no need to wait pre-defined number of candles for the confirmation. Such reversals will always be visible on momentum indicators, such as the most popular MACD . But a single-line moving average can be also good enough to notice reversals. Or my favourite one - QQE, which I borrowed (and improved) from JustUncleL, who borrowed it from Glaz, who borrowed it from... I don't even know where Quantitative Qualitative Estimation originates from. Thanks to all these guys for their input and code.

So whichever momentum indicator you choose - yes, there is a pick-your-poison-type selector as in in-famous Moving Average indicators - once it reverses, a highest (or lowest) point from the impulse is caught and ZigZag gets printed.

One thing I need to emphasize. This indicator DOES NOT REPAINT. It might look like the lines are a bit delayed, especially when compared to all the other ZigZag indicators on TradingView, but they are actually TRUE. There is a value in this - my indicator prints pivot points and Zigzag exactly on the moment they have been noticed, not earlier faking to be faster than they could be.

As a bonus, the indicator marks which impulse had strength in it. It is very nice to see a progressing impulse, but without force - a very likely that reversal on a bigger move is happening.

I'm about to publish some more scripts based on this ZigZag algo, so follow me on TradingView to get notified.

Enjoy!

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/1d7f462e0d596e3c7bb.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Color ZigZag lines to show force direction|
|v_input_string_1|0|Select Momentum Indicator:: _qqefactor|MovingAverage|QQE|
|v_input_2|200|TakeProfitLevel|
|v_input_int_1|12|(?if MACD Selected)Fast Length|
|v_input_int_2|26|Slow Length|
|v_input_source_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_3|9|Signal Smoothing|
|v_input_string_2|0|Oscillator MA Type: EMA|SMA|
|v_input_string_3|0|Signal Line MA Type: EMA|SMA|
|v_input_string_4|0|(?if Moving Average selected)Average type: SMA|EMA|WMA|VWMA|HMA|RMA|DEMA|
|v_input_int_4|20|Length|
|v_input_int_5|14|(?if _qqefactor selected)RSI Length|
|v_input_float_1|4.238|_qqefactor Factor|
|v_input_int_6|5|RSI Smoothing|
|v_input_int_7|10|Thresh-hold|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-05-09 00:00:00
end: 2022-05-15 23:59:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Peter_O

//@version=5
indicator('Momentum-based ZigZag', overlay=true)

var int momentum_direction = 0
color_zigzag_lines = input(true, title='Color ZigZag lines to show force direction')
momentum_select = input.string(title='Select Momentum Indicator:', defval='QQE', options=['MACD', 'MovingAverage', 'QQE'])


// ZigZag function {
zigzag(_momentum_direction) =>
    zz_goingup = _momentum_direction == 1
    zz_goingdown = _momentum_direction == -1
    var float zz_peak = na
    var float zz_bottom = na
    zz_peak := high > zz_peak[1] and zz_goingup or zz_goingdown[1] and zz_goingup ? high : nz(zz_peak[1])
    zz_bottom := low < zz_bottom[1] and zz_goingdown or zz_goingup[1] and zz_goingdown ? low : nz(zz_bottom[1])
    zigzag = zz_goingup and zz_goingdown[1] ? zz_bottom[1] : zz_goingup[1] and zz_goingdown ? zz_peak[1] : na
    zigzag
// } End of ZigZag function

// MACD  {
fast_length = input.int(title='Fast Length', defval=12, group='if MACD Selected', inline='macd')
slow_length = input.int(title='Slow Length', defval=26, group='if MACD Selected', inline='macd')
src = input.source(title='Source', defval=close, group='if MACD Selected', inline='macd')
signal_length = input.int(title='Signal Smoothing', minval=1, maxval=50, defval=9, group='if MACD Selected', inline='macd')
sma_source = input.string(title='Oscillator MA Type', defval='EMA', options=['SMA', 'EMA'], group='if MACD Selected', inline='macd')
sma_signal = input.string(title='Signal Line MA Type', defval='EMA', options=['SMA', 'EMA'], group='if MACD Selected', inline='macd')

fast_ma = sma_source == 'SMA' ? ta.sma(src, fast_length) : ta.ema(src, fast_length)
slow_ma = sma_source == 'SMA' ? ta.sma(src, slow_length) : ta.ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal == 'SMA' ? ta.sma(macd, signal_length) : ta.ema(macd, signal_length)

macdUP = ta.crossover(macd, signal)
macdDOWN = ta.crossunder(macd, signal)
// } End of MACD

// Moving Averages {
smoothing_type = input.string(title='Average type', defval='SMA', options=['EMA', 'SMA', 'WMA', 'VWMA', 'HMA', 'RMA', 'DEMA'], inline='movingaverage', group='if Moving Average selected')
ma_length = input.int(20, title='Length', inline='movingaverage', group='if Moving Average selected')
moving_average(_series, _length, _smoothing) =>
    _smoothing == 'EMA' ? ta.ema(_series, _length) : _smoothing == 'SMA' ? ta.sma(_series, _length) : _smoothing == 'WMA' ? ta.wma(_series, _length) : _smoothing == 'VWMA' ? ta.vwma(_series, _length) : _smoothing == 'HMA' ? ta.hma(_series, _length) : _smoothing == 'RMA' ? ta.rma(_series, _length) : _smoothing == 'DEMA' ? 2 * ta.ema(_series, _length) - ta.ema(ta.ema(_series, _length), _length) : ta.ema(_series, _length)
movingaverage = moving_average(close, ma_length, smoothing_type)
maUP = movingaverage > movingaverage[1] and movingaverage[2] > movingaverage[1]
maDOWN = movingaverage < movingaverage[1] and movingaverage[2] < movingaverage[1]
// } End of Moving Averages


// QQE {
RSI_Period = input.int(14, title='RSI Length', inline='qqe', group='if QQE selected')
qqeslow = input.float(4.238, title='QQE Factor', inline='qqe', group='if QQE selected')
SFslow = input.int(5, title='RSI Smoothing', inline='qqe', group='if QQE selected')
ThreshHold = input.int(10, title='Thresh-hold', inline='qqe', group='if QQE selected')
rsi_currenttf = ta.rsi(close, RSI_Period)

qqenew(_qqefactor, _smoothingfactor, _rsi, _threshold, _RSI_Period) =>
    RSI_Period = _RSI_Period
    SF = _smoothingfactor
    QQE = _qqefactor
    ThreshHold = _threshold
    Wilders_Period = RSI_Period * 2 - 1
    Rsi = _rsi
    RsiMa = ta.ema(Rsi, SF)
    AtrRsi = math.abs(RsiMa[1] - RsiMa)
    MaAtrRsi = ta.ema(AtrRsi, Wilders_Period)
    dar = ta.ema(MaAtrRsi, Wilders_Period) * QQE
    longband = 0.0
    shortband = 0.0
    trend = 0
    DeltaFastAtrRsi = dar
    RSIndex = RsiMa
    newshortband = RSIndex + DeltaFastAtrRsi
    newlongband = RSIndex - DeltaFastAtrRsi
    longband := RSIndex[1] > longband[1] and RSIndex > longband[1] ? math.max(longband[1], newlongband) : newlongband
    shortband := RSIndex[1] < shortband[1] and RSIndex < shortband[1] ? math.min(shortband[1], newshortband) : newshortband
    QQExlong = 0
    QQExlong := nz(QQExlong[1])
    QQExshort = 0
    QQExshort := nz(QQExshort[1])
    qqe_goingup = ta.barssince(QQExlong == 1) < ta.barssince(QQExshort == 1)
    qqe_goingdown = ta.barssince(QQExlong == 1) > ta.barssince(QQExshort == 1)
    var float last_qqe_high = high
    var float last_qqe_low = low
    last_qqe_high := high > last_qqe_high[1] and qqe_goingup or qqe_goingdown[1] and qqe_goingup ? high : nz(last_qqe_high[1])
    last_qqe_low := low < last_qqe_low[1] and qqe_goingdown or qqe_goingup[1] and qqe_goingdown ? low : nz(last_qqe_low[1])
    trend := ta.crossover(RSIndex, shortband[1]) or ta.crossover(high, last_qqe_high) ? 1 : ta.crossunder(RSIndex, longband[1]) or ta.crossunder(low, last_qqe_low) ? -1 : nz(trend[1], 1)
    FastAtrRsiTL = trend == 1 ? longband : shortband
    // Find all the QQE Crosses
    QQExlong := trend == 1 and trend[1] == -1 ? QQExlong + 1 : 0
    QQExshort := trend == -1 and trend[1] == 1 ? QQExshort + 1 : 0
    qqeLong = QQExlong == 1 ? FastAtrRsiTL[1] - 50 : na
    qqeShort = QQExshort == 1 ? FastAtrRsiTL[1] - 50 : na
    qqenew = qqeLong ? 1 : qqeShort ? -1 : na
    qqenew

qqeUP = qqenew(qqeslow, SFslow, rsi_currenttf, ThreshHold, RSI_Period) == 1
qqeDOWN = qqenew(qqeslow, SFslow, rsi_currenttf, ThreshHold, RSI_Period) == -1
// } End of QQE


momentumUP = momentum_select == 'MACD' ? macdUP : momentum_select == 'MovingAverage' ? maUP : momentum_select == 'QQE' ? qqeUP : qqeUP

momentumDOWN = momentum_select == 'MACD' ? macdDOWN : momentum_select == 'MovingAverage' ? maDOWN : momentum_select == 'QQE' ? qqeDOWN : qqeDOWN

momentum_direction := momentumUP ? 1 : momentumDOWN ? -1 : nz(momentum_direction[1])

// { Force detection
rsi5 = ta.rsi(close, 5)
ob = 80
os = 20
barssince_momentumUP = ta.barssince(momentumUP)
barssince_momentumDOWN = ta.barssince(momentumDOWN)
momentum_DOWN_was_force_up = momentumDOWN and (barssince_momentumUP >= ta.barssince(rsi5 > ob))[1]
momentum_UP_was_force_down = momentumUP and (barssince_momentumDOWN >= ta.barssince(rsi5 < os))[1]
zzcolor_rsi5 = momentum_DOWN_was_force_up ? color.lime : momentum_UP_was_force_down ? color.red : color.black
// } End of Force detection


ZigZag = zigzag(momentum_direction)
plot(ZigZag, linewidth=5, color=color_zigzag_lines ? zzcolor_rsi5 : color.black, title='ZIGZAG', style=plot.style_line, transp=0)

GoShort = momentumDOWN and not momentum_DOWN_was_force_up
GoLong = momentumUP and not momentum_UP_was_force_down

if GoShort
    label.new(bar_index, ZigZag, style=label.style_label_down, color=color.red, text=str.tostring('SHORT\n\npivot high: \n' + str.tostring(ZigZag)))
if GoLong
    label.new(bar_index, ZigZag, style=label.style_label_up, color=color.lime, text=str.tostring('LONG\n\npivot low: \n' + str.tostring(ZigZag)))


var float stoploss_long = low
var float stoploss_short = high

pl = ta.valuewhen(momentumUP, ZigZag, 0)
ph = ta.valuewhen(momentumDOWN, ZigZag, 0)

if GoLong
    stoploss_long := low < pl ? low : pl
    stoploss_long
if GoShort
    stoploss_short := high > ph ? high : ph
    stoploss_short

TakeProfitLevel=input(200)

if GoLong
    alertsyntax_golong = 'long slprice=' + str.tostring(stoploss_long) + ' tp=' + str.tostring(TakeProfitLevel)
    alert(message=alertsyntax_golong, freq=alert.freq_once_per_bar_close)
if GoShort
    alertsyntax_goshort = 'short slprice=' + str.tostring(stoploss_short) + ' tp=' + str.tostring(TakeProfitLevel)
    alert(message=alertsyntax_goshort, freq=alert.freq_once_per_bar_close)




if GoLong
    strategy.entry("Enter Long", strategy.long)
else if GoShort
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/363824

> Last Modified

2022-05-17 16:29:07
