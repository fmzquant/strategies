
> Name

baguette-by-multigrain

> Author

ChaoZhang

> Strategy Description

**Rationale**
The rationale behind this indicator is that: when the price of an asset reaches an extreme, regardless of the trend, there is a (maybe not equal but) opposite reaction.

**Settings**
The default settings will not be the best for whatever timeframe you choose. I personally believe a longer than 'normal' JMA Length is best.

JMA Source: The source in which the Jurik Moving Average calculations are based off of.
JMA Length: Controls the length of the Jurik Moving Average.
JMA Phase: A lag controller of sorts. Increasing the phase increases overshoots but reduces lag, decreasing the phase decreases overshoots but increases lag.

ATR Length: The length in which an average true range value will be calculated with.
ATR Multiplier: This multiplier controls the 'width' of our envelope or our extreme bands.

**Credits**
@gorx1 for the improved and more accurate (?) Jurik Moving Average calculations.
@redktrader for the ATR envelope calculations.

**回测**

 ![IMG](https://www.fmz.com/upload/asset/b551d763796cea8a3c.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_hlc3|0|(?JMA)JMA Source: hlc3|high|low|open|hl2|close|hlcc4|ohlc4|
|v_input_int_1|144|JMA Length|
|v_input_int_2|34|JMA Phase|
|v_input_int_3|34|(?Envelope)ATR Length|
|v_input_float_1|3|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-07 00:00:00
end: 2022-05-06 23:59:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © multigrain
//@version=5

indicator('baguette by multigrain', 'baguette', overlay = true)
//NAME            TYPE               DEFVAL     TITLE               MIN     MAX         GROUP       
jmaSrc          = input.source      (hlc3,      'JMA Source',                           group='JMA')
jmaLen          = input.int         (144,       'JMA Length',                           group='JMA')
jmaPhs          = input.int         (34,        'JMA Phase',        -100,   100,        group='JMA')


atrLen          = input.int         (34,        'ATR Length',                           group='Envelope')
atrMul          = input.float       (3,       'ATR Multiplier',                       group='Envelope')


// Jurik Moving Average
// credit to @gorx1
f_jma(_src, _length, _phase) =>
    lower_band  = _src
    upper_band  = _src
    del2        = math.abs(_src - lower_band[1])
    del1        = math.abs(_src - upper_band[1])

    vola        = del1 == del2 ? 0 : math.max(del1, del2)

    vola_sum    = 0.0
    vola_sum    := nz(vola_sum[1]) + 0.1 * (vola - vola[10])

    avg_len     = 65

    y           = bar_index + 1

    avg_vola    = 0.0
    avg_vola    := if y <= avg_len + 1
        nz(avg_vola[1]) + 2.0 * (vola_sum - nz(avg_vola[1])) / (avg_len + 1)
    else
        ta.sma(vola_sum, avg_len)

    len         = 0.5 * (_length - 1)
    len1        = math.max(math.log(math.sqrt(len)) / math.log(2) + 2, 0)
    pow1        = math.max(len1 - 2, 0.5)

    r_vola      = avg_vola > 0 ? vola / avg_vola : 0
    r_vola      := if r_vola > math.pow(len1, 1 / pow1)
        math.pow(len1, 1 / pow1)
    else if r_vola < 1
        1
    else
        r_vola

    pow2        = math.pow(r_vola, pow1)
    len2        = math.sqrt(len) * len1
    bet         = len2 / (len2 + 1)
    kv          = math.pow(bet, math.sqrt(pow2))

    lower_band  := y == 1 ? _src : del2 < 0 ? _src : _src - kv * del2
    upper_band  := y == 1 ? _src : del1 < 0 ? _src : _src + kv * del1

    beta        = 0.45 * (len - 1) / (0.45 * (len - 1) + 2)
    pr          = _phase < -100 ? 0.5 : _phase > 100 ? 2.5 : _phase / 100 + 1.5
    alpha       = math.pow(beta, pow2)

    ma1         = 0.0
    det0        = 0.0
    jma         = 0.0
    det1        = 0.0

    ma1         := (1 - alpha) * _src + alpha * nz(ma1[1])
    det0        := (_src - ma1) * (1 - beta) + beta * nz(det0[1])
    ma2         = ma1 + pr * det0
    det1        := (ma2 - nz(jma[1])) * math.pow(1 - alpha, 2) + math.pow(alpha, 2) * nz(det1[1])
    jma         := nz(jma[1]) + det1
    jma


// Jurik Moving Average Envelope
// credit to @redktrader
f_atrEnv(_src, _length, _multiplier) =>
    atr         = ta.atr(_length) * _multiplier
    atr_us      = atr
    atr_ls      = atr
    atr_us      := ta.change(_src) != 0 ? atr : atr_us[1]
    atr_ls      := ta.change(_src) != 0 ? atr : atr_ls[1]
    atr_upper   = _src + atr_us
    atr_lower   = _src - atr_ls
    [atr_upper, atr_lower]



// Calculations
j               = f_jma(jmaSrc, jmaLen, jmaPhs)
[j_up, j_low]   = f_atrEnv(j, atrLen, atrMul)
long            = ta.crossover(hlc3, j_low) ? close : na
short           = ta.crossunder(hlc3, j_up) ? close : na

// Colors
green           = #0F7173  
red             = #F05D5E 
tan             = #D8A47F
white           = #FFFFFF
           
// Plots
plot            (j,         'JMA Centerline', tan, display=display.none)
plot            (j_up,      'ATR Upper', green)
plot            (j_low,     'ATR Lower', red)
// Alerts
if long
    strategy.entry("Enter Long", strategy.long)
else if short
    strategy.entry("Enter Short", strategy.short)
```

> Detail

https://www.fmz.com/strategy/361794

> Last Modified

2022-05-09 00:17:31
