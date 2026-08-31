
> Name

BB-Keltner-Squeeze-Trading-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The BB Keltner Squeeze trading strategy identifies trend reversals by looking for compressions between Bollinger Bands and Keltner Channels. It is a short-term trading strategy. The strategy uses Bollinger Bands as the base indicator and Keltner Channels to confirm the signals. When the price breaks out of the Bollinger Bands, a squeeze with the Keltner Channels signals a trend reversal.  

## Strategy Principles

The core principles behind this strategy are:

1. Bollinger Bands gauge price volatility. It has upper, middle and lower bands to identify if price is in a volatile condition.

2. Keltner Channels validate Bollinger signals. Keltner Channels also measure price volatility. When price nears the Bollinger Bands, a squeeze with Keltner signifies heightened volatility and potential reversals.

3. Trade signals are generated based on compressions. Breakouts above Bollinger upper band with Keltner narrowing below it signal longs. Breakdowns below Bollinger lower band with Keltner narrowing above it signal shorts.

4. The middle band shows trend direction. Prices above middle band signal uptrend, and below signal downtrend. 

5. Entries and exits are based on middle band direction. Long/short on compression with middle band direction confirming signal; flatten if direction flips.

The strategy complements Bollinger Bands with Keltner Channels to identify reversal points. It exemplifies mean reversion trading strategies.

## Advantages

The main advantages of this strategy are:

1. Combining two indicators improves signal reliability, avoiding false breaks from single indicator.

2. Clear trend identification using middle band. Intuitively tracks real-time trend.

3. Flexible entry/exit logic based on middle band match. Avoids trading against trends. 

4. Fits short-term trading. Captures short-term breakouts and compressions for swift profits.

5. Intuitive visuals highlight compressions, middle band, MACD histogram etc. Clean graphical representation.

6. Easy to implement and replicate. Simple logic and configurable parameters make adoption effortless.

## Risks

The main risks to consider are:

1. Drawdown risk from extended moves. Compressions can fire off series of losing trades during strong trends.

2. Failed breakout risk. Initial Bollinger breakouts may be short-lived fakes.

3. Parameter optimization risk. Improper tuning of bands and channels may degrade performance. Requires rigorous testing. 

4. Bull market risk. Excessive shorts triggered in prolonged uptrends. Avoid applying during bull runs.

5. High frequency trading risk. Short-term nature may increase costs from fees and slippage.

6. Indicator failure risk. Signals may stop working during extreme conditions.

Risks need active management via stop losses, position sizing, parameter tuning, and robust contingency planning.

## Enhancement Opportunities

Some ways to improve the strategy are:

1. Incorporate additional indicators to reinforce signals, improving win rate.

2. Add stop loss mechanisms like trailing stops or ATR stops to constrain losses. 

3. Optimize parameters for bands and channels through rigorous testing.

4. Adjust position sizes based on market conditions and trend strength.

5. Apply machine learning for parameter optimization, signal enhancement and adaptation.

6. Distinguish bull vs bear regimes. Reduce counter-trend trades during strong directional bias.

7. Complement with volume, momentum indicators to enrich signal diversity.

With continuous improvements, the strategy can become a robust and consistent short-term trading system across various markets.

## Conclusion

The BB Keltner Squeeze strategy capitalizes on price reversals through compressions between Bollinger Bands and Keltner Channels. It combines dual indicators for high-probability signals, uses middle band to gauge trend direction, and identifies imminent reversals via squeezes. The strategy suits short-term traders seeking frequent opportunities. However, drawdown control and parameter tuning are essential. With ongoing enhancements, it has potential to become a sustainable short-term trading strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|2|Band 1 StDev|
|v_input_4|true|useTrueRange|
|v_input_5|1.5|Keltner Range|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-17 00:00:00
end: 2023-09-24 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("BB Keltner Squeeze Strategy", overlay=true, initial_capital=10000, currency='USD')
length = input(title="Length", type=input.integer, defval=20, minval=0)
src = input(close, title="Source")
bband(length, mult) =>
    sma(close, length) + mult * stdev(close, length)
keltner(length, mult) =>
    ema(close, length) + mult * ema(tr, length)


//BB
B2mult = input(2.0, minval=0.001, maxval=50, title="Band 1 StDev")
B2basis = sma(src, length)
B2dev = B2mult * stdev(src, length)
B2upper = B2basis + B2dev
B2lower = B2basis - B2dev
plot(B2basis, color=color.blue)
p1 = plot(B2upper, color=#00ffff, linewidth=2, title="Band 2SD upper")
p2 = plot(B2lower, color=#00ffff, linewidth=2, title="Band 2SD lower")

//Keltner
useTrueRange = input(true)
Kmult = input(1.5, title="Keltner Range")
Kma = ema(src, length)
Krange = useTrueRange ? tr : high - low
Krangema = ema(Krange, length)
Kupper = Kma + Krangema * Kmult
Klower = Kma - Krangema * Kmult
p5 = plot(Kupper, color=color.yellow, linewidth=2, style=plot.style_circles, title="Keltner upper")
p6 = plot(Klower, color=color.yellow, linewidth=2, style=plot.style_circles, title="Keltner lower")


e1 = (highest(high, length) + lowest(low, length)) / 2 + sma(close, length)
osc = linreg(close - e1 / 2, length, 0)
diff = bband(length, 2) - keltner(length, 1)
osc_color = osc[1] < osc[0] ? osc[0] >= 0 ? #00ffff : #cc00cc : 
   osc[0] >= 0 ? #009b9b : #ff9bff
mid_color = diff >= 0 ? color.green : color.red
fromYear = year > 2014
toYear = year < 2016


direction = 0
squeeze = Kupper > B2upper
midc = 0
midc := squeeze ? 0 : close > B2basis ? 1 : 2
midcolor = midc == 0 ? #666666 : midc == 1 ? #00ff00 : #ff0000
direction := midc[1]

plot(B2basis, color=midcolor, linewidth=4, title="BB Mid")
bgcolor(midc == 0 ? #333333 : #000000, transp=75)

if direction == 0
    if midc[1] == 0 and midc == 1
        strategy.entry("LONG", strategy.long)
        direction := 1
    else if midc[1] == 0 and midc == 2
        strategy.entry("SHORT", strategy.short)
        direction := 2
else if direction != midc
    strategy.close_all()
    direction := 0







```

> Detail

https://www.fmz.com/strategy/427810

> Last Modified

2023-09-25 17:38:08
