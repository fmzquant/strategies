
> Name

Quantitative-Oscillation-Indicator-Combination-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/18ebc4815a695d28caa.png)

## Overview

This strategy combines Ehlers Elegant Oscillator, Ehlers Decycler, Ehlers Instantaneous Trendline and Ehlers Spearman Rank Correlation Coefficient into one strategy, forming a quantitative trading strategy that fully captures trends, oscillations, momentum and price & volume characteristics. The strategy name is "Quantitative Oscillation Indicator Combination Strategy".

## Strategy Principles  

This strategy uses 4 key indicators for judgment. 

Firstly, the Ehlers Elegant Oscillator, where the difference between the original line and signal line smoothed by an exponential moving average can determine the current trend direction and strength. Secondly, the Ehlers Decycler, which can effectively identify cycle low points and determine if the major trend is reversing. Next, the Ehlers Instantaneous Trendline tracks fast moving averages to judge short-term trend directions. Finally, the Ehlers Spearman Rank Correlation Coefficient judges the price-volume relationship, which can effectively filter false breakouts.

Specifically, the four entry conditions for the strategy are: the Elegant Oscillator signal line and Decycler signal line simultaneously breaking above 0; the original line breaking above the Decycler line; the original line being higher than the rising Instantaneous Trendline; and a positive Spearman Rank Correlation Coefficient.  

The exit conditions are much simpler: exiting when the original line falls below the Instantaneous Trendline.

The short conditions are similar to the long conditions, only reversed.

## Advantage Analysis 

The biggest advantage of this strategy lies in the appropriate combination of indicators, which can effectively leverage the strengths of each indicator, mutually verify, avoid false positives, filter out a lot of noise, and generate more reliable signals.

Specifically, the Elegant Oscillator can judge trend direction and strength, the Decycler can judge cycle turning points, the Instantaneous Trendline can judge short-term trends, and the Spearman Rank judges the price-volume relationship. The combination of the four can comprehensively judge market characteristics in terms of trend, cycle, momentum and price-volume, thus producing highly reliable trading signals.

In addition, with only mid-term prices as reference, the strategy avoids interference from short-term market noise and reduces unnecessary reversal trades. Also, with sparse signals and simple exit rules, trading frequency can be greatly reduced, avoiding over-trading problems.  

## Risk Analysis

The biggest risk of this strategy is the lack of a stop loss mechanism. In the event of violent market movements, inability to stop loss in time may lead to greater losses. It also lacks additional filters like Donchian Channels and energy indicators that may lead to some degree of false positive trades.

To mitigate these risks, a protective stop loss can be set to automatically stop loss when losses exceed certain levels. Also, indicators like MACD can be added for secondary confirmation to avoid risks from false breakouts.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Add in a risk management stop loss mechanism. Calculate maximum historical drawdown to set appropriate stop loss levels.

2. Add in more filters. Add indicators like MACD, Bollinger Bands for more filtering to further reduce false signals.

3. Incorporate more timeframes. Currently only one set of parameters is used. More timeframes can be added for multi-timeframe verification to improve stability. 

4. Dynamically adjust parameters. Add in parameter optimization to dynamically adjust indicator parameters based on changing market conditions to improve adaptability.

5. Cross-asset arbitrage. Apply strategy on different assets to look for arbitrage opportunities to better control risks.


## Conclusion  

This strategy cleverly combines 4 major Ehlers indicators to form a strategy that judges trends, cycles, momentum and price-volume in all aspects. It has superb noise filtering capabilities and can produce high quality signals. But the lack of a stop loss and auxiliary indicator filtering exposes it to some risks. By adding in stop losses, filters, more timeframes etc, it can be effectively optimized for higher stability and reliability.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_timeframe_1||Resolution|
|v_input_2|true|Allow Bar Color Change?|
|v_input_int_1|20|Length|
|v_input_int_2|50|Rms Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © simwai

//@version=5
strategy('Ehlers Elegant Oscillator + Ehlers Decycler + Ehlers Instantaneous + Ehlers Spearman Rank', 'Ehlers Combo', overlay=true, margin_long=100, margin_short=100)

// -- Inputs --
inp = input(title='Source', defval=close)
res = input.timeframe(title='Resolution', defval='')
bar = input(title='Allow Bar Color Change?', defval=true)
src = inp
length = input.int(title='Length', defval=20, minval=2, maxval=300)
rmsLength = input.int(title='Rms Length', defval=50, minval=2)
decyclerLength = length

// -- Calculation --
// Ehlers Elegant Oscillator
a1 = math.exp(-1.414 * math.pi / length)
b1 = 2 * a1 * math.cos(1.414 * math.pi / length)
c2 = b1
c3 = -a1 * a1
c1 = 1 - c2 - c3

deriv = src - nz(src[2])
rms = math.avg(math.pow(deriv, 2), rmsLength)
rms := rms != 0 ? math.sqrt(rms) : 0
nDeriv = rms != 0 ? deriv / rms : 0
iFish = nDeriv != 0 ? (math.exp(2 * nDeriv) - 1) / (math.exp(2 * nDeriv) + 1) : 0

ss = 0.0
ss := bar_index < 3 ? 0 : (c1 * ((iFish + nz(iFish[1])) / 2)) + (c2 * nz(ss[1])) + (c3 * nz(ss[2]))
ssSig = ta.wma(ss, length)

slo = ss - ssSig
sig = slo > 0 ? slo > nz(slo[1]) ? 2 : 1 : slo < 0 ? slo < nz(slo[1]) ? -2 : -1 : 0
eoColor = sig > 1 ? color.green : sig > 0 ? color.lime : sig < -1 ? color.maroon : sig < 0 ? color.red : color.black

hline(0)
plot(ssSig, title='EO', color=eoColor, linewidth=2)

// Ehlers Decycler
pi = 2 * math.asin(1)
twoPiPrd = 2 * pi / decyclerLength
alpha = (math.cos(twoPiPrd) + math.sin(twoPiPrd) - 1) / math.cos(twoPiPrd)

dec = 0.0
dec := ((alpha / 2) * (src + nz(src[1]))) + ((1 - alpha) * nz(dec[1]))

decyclerSig = src > dec ? 1 : src < dec ? -1 : 0
decColor = decyclerSig > 0 ? color.green : decyclerSig < 0 ? color.red : color.black
plot(dec, title='Decycler', color=decColor, linewidth=2)

// Ehlers Instantaneous Trendline
getItrend(src, alpha) =>
    Price = src
    Smooth = 0.0
    ITrend = 0.0
    Trigger = 0.0
    
    ITrend := (alpha - alpha * alpha / 4) * Price + .5 * alpha * alpha  * Price[1] - (alpha - .75 * alpha * alpha) * Price[2] + 2 * (1 - alpha) * nz(ITrend[1]) - (1 - alpha) * (1 - alpha) * nz(ITrend[2])
    if(bar_index < 7)
        ITrend := (Price + 2 * Price[1] + Price[2]) / 4
    Trigger := 2 * ITrend - ITrend[2]
    [ITrend, Trigger]

itrendAlpha = 2 / (length + 1) / 2
[iT, Tr] = getItrend(src, itrendAlpha)

iTColor = Tr > iT ? color.aqua : color.maroon
plot(iT, 'Instantaneous Trend', iTColor, 2)

// Ehlers Spearman Rank
priceArray = array.new_float(300, 0.0)
rank = array.new_float(300, 0.0)
for i = 1 to length
    array.set(priceArray, i, nz(src[i - 1]))
    array.set(rank, i, i)

for i = 1 to length
    count = length + 1 - i
    for j = 1 to length - count
        if array.get(priceArray, j + 1) < array.get(priceArray, j)
            tempPrice = array.get(priceArray, j)
            tempRank = array.get(rank, j)
            array.set(priceArray, j, array.get(priceArray, j + 1))
            array.set(rank, j, array.get(rank, j + 1))
            array.set(priceArray, j + 1, tempPrice)
            array.set(rank, j + 1, tempRank)
         
sum = 0.0   
for i = 1 to length
    sum := sum + math.pow(i - array.get(rank, i), 2)
signal = 2 * (0.5 - (1 - ((6 * sum) / (length * (math.pow(length, 2) - 1)))))
spearmanSlo = signal - nz(signal[1])
spearmanSig = spearmanSlo > 0 or signal > 0 ? spearmanSlo > nz(spearmanSlo[1]) ? 2 : 1 : spearmanSlo < 0 or signal < 0 ? spearmanSlo < nz(spearmanSlo[1]) ? -2 : -1 : 0

// -- Signals --
bool enterLong = ta.crossover(sig, 0) and ta.crossover(decyclerSig, 0) and ta.crossover(src, dec) and (src > iT) and iT[1] < iT and spearmanSig > 0
bool enterShort = ta.crossunder(sig, 0) and ta.crossunder(decyclerSig, 0) and ta.crossunder(src, dec) and (src < iT) and iT[1] > iT and spearmanSig < 0
bool exitLong = ta.crossunder(src[100], iT) 
bool exitShort = ta.crossover(src[100], iT)

barcolor(bar and strategy.position_size > 0 ? color.green : bar and strategy.position_size < 0 ? color.red : color.gray)

// -- Long Exits --
strategy.close('long', when=exitLong and strategy.position_size > 0, comment='EXIT_LONG')

// -- Short Exits --
strategy.close('short', when=exitShort and strategy.position_size < 0, comment='EXIT_SHORT')

bool isStrategyEntryEnabled = true
// -- Long Entries --
if (isStrategyEntryEnabled)
    strategy.entry('long', strategy.long, when=enterLong, comment='ENTER_LONG')
else
    strategy.order('long', strategy.long, when=enterLong, comment='ENTER_LONG')

// -- Short Entries --
if (isStrategyEntryEnabled)
    strategy.entry('short', strategy.short, when=enterShort, comment='ENTER_SHORT')
else
    strategy.order('short', strategy.short, when=enterShort, comment='ENTER_SHORT')


```

> Detail

https://www.fmz.com/strategy/442966

> Last Modified

2024-02-27 16:46:42
