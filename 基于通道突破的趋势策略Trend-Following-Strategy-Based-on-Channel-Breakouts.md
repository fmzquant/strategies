
> Name

基于通道突破的趋势策略Trend-Following-Strategy-Based-on-Channel-Breakouts

> Author

ChaoZhang

> Strategy Description



This article explains in detail a trend trading strategy utilizing channel breakouts. It identifies trend direction with EMA channels and makes counter-trend trades using Bollinger Bands.

I. Strategy Logic

The main components are:

1. Set middle EMA and extend upper/lower channels based on percentages.

2. Go long on upper channel breakouts and short on lower channel breaks to follow trends.

3. When BB narrows, judge trend reversal for counter-trend trades.

4. Use ATR stops to limit loss risks.

5. Customizable channel parameters for optimization.

It combines EMA channels for trend direction and BB for reversals to form a complete system.

II. Advantages of the Strategy

The biggest advantage is the sensible indicator usage, with EMA determining mainstream trend and BB for reversals.

Another advantage is the direct and effective stop loss for risk control.

Finally, customizable parameters allow optimization across products.

III. Potential Risks

However, some risks exist:

Firstly, both EMA and BB have lagging issues. 

Secondly, failed reversal trades need consideration.

Lastly, extensive optimization is required to prevent overfitting.

IV. Summary

In summary, this article has explained a trend following strategy based on EMA channel breakouts, with counter-trend trades at reversals. It can achieve steady profits through parameter optimization but requires managing optimization difficulty and indicator lags.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|EMA Length|
|v_input_2_close|0|EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|true|Inside Channel (%)|
|v_input_4|2|Outside Channel (%)|
|v_input_5|20|length|
|v_input_6_close|0|Close price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7|2|Multiplier|
|v_input_8|14|(?ATR Stoploss)ATR Period|
|v_input_9|1.75|ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-15 00:00:00
end: 2023-09-14 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="[mdeacey] EMA Percentage Channel + Bollinger Band Trending Strategy", shorttitle="[mdeacey] EMA% Channel + BB Trend Strategy", overlay=true)

//EMA 200

len = input(title="EMA Length", type=input.integer, defval=100)
srce = input(title="EMA Source", type=input.source, defval=close)

ema1= ema(srce,len)

percent = input(title="Inside Channel (%)", type=input.float, defval= 1) 
valuee = (percent*ema1)/100
upperbande = ema1 + valuee
lowerbande = ema1 - valuee
///2
percent2 = input(title="Outside Channel (%)", type=input.float, defval= 2) 
valuee2 = (percent2*ema1)/100
upperbande2 = ema1 + valuee2
lowerbande2 = ema1 - valuee2

plot(upperbande, title='Inside Channel Upperband', color=color.black, linewidth=1, style=plot.style_line )
plot(lowerbande, title='Inside Channel Lowerband', color=color.black, linewidth=1, style=plot.style_line )
plot(upperbande2, title='Outside Channel Upperband', color=color.black, linewidth=1, style=plot.style_line )
plot(lowerbande2, title='Outside Channel Lowerband', color=color.black, linewidth=1, style=plot.style_line )

length = input(20, minval=2)
src = input(close, title="Close price")
mult = input(2.0, title="Multiplier", minval=0.001, maxval=50)

MA2 = sma(src, length)
dev = mult * stdev(src, length)
upper = MA2 + dev
lower = MA2 - dev

signalColor = crossunder(close, upper) ? color.red : crossover(close, lower) ? color.green : color.white

barcolor(color=signalColor)
nopo= strategy.position_size==0

upperBand = plot(upper, title='Upper Bollinger Band', color=color.gray, linewidth=1)
lowerBand = plot(lower, title='Lower Bollinger Band', color=color.gray, linewidth=1)
fill(upperBand, lowerBand, title='Bollinger Band', color=color.black)
strategy.entry("Long",true,when = crossover(close,lower)  and close <lowerbande and close>lowerbande2)
strategy.close("Long",when = crossunder(close,lowerbande2))//crossunder(close,lowerbande) or crossunder(close,lowerbande2))

strategy.entry("Short",false,when = crossunder(close,upper)  and close >upperbande and close<upperbande2)
strategy.close("Short",when = crossover(close,upperbande2) )//crossover(close,upperbande) or crossover(close,upperbande2) )

//Inputs
atrPeriod = input(defval=14, title="ATR Period",group='ATR Stoploss', type=input.integer) // Adjust this to change the ATR calculation length
multiplierPeriod = input(defval=1.75, title="ATR Multiplier",group='ATR Stoploss',  type=input.float)// Adjust this to change the distance between your candles and the line

//ATR Calculation
pine_rma(x, y) =>
    alpha = y
    sum = 0.0
    sum := (x + (alpha - 1) * nz(sum[1])) / alpha

true_range() =>
    max(high - low, max(abs(high - close[1]), abs(low - close[1])))

//Long SL
plot(low - pine_rma(true_range() * multiplierPeriod, atrPeriod), "Long Stop", color=color.red, offset = 1)
// Short SL
plot(high +pine_rma(true_range() * multiplierPeriod, atrPeriod), "Short Stop", color=color.red, offset = 1)
strategy.exit("Exit","Long",limit=upper ,stop = low - pine_rma(true_range() * multiplierPeriod, atrPeriod)  )
strategy.exit("Exit","Short",limit=lower ,stop =high +pine_rma(true_range() * multiplierPeriod, atrPeriod)  )

/////////////////////new strategy
strategy.entry("Long",true,stop =upperbande  ,when = close <upperbande and  close[1] <upperbande and nopo )
strategy.close("Long",when = crossunder(close,upper) )//  and close <upperbande and close>lowerbande)

strategy.entry("Short",false,stop =lowerbande  ,when = close >lowerbande and close[1] >lowerbande and nopo )
strategy.close("Short",when = crossover(close, lower) )

strategy.exit("Exit","Long",stop = low - pine_rma(true_range() * multiplierPeriod, atrPeriod)  )
strategy.exit("Exit","Short",stop =high +pine_rma(true_range() * multiplierPeriod, atrPeriod)  )

```

> Detail

https://www.fmz.com/strategy/426890

> Last Modified

2023-09-15 12:02:10
