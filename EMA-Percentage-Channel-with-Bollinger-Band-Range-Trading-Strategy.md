
> Name

EMA-Percentage-Channel-with-Bollinger-Band-Range-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12e3b8663cd04c217cb.png)


## Overview

This strategy is based on the user's selection of an EMA and defined percentage channel. It goes long when the price is below the upper band and goes short when the price is above the lower band. If the price starts trending and moves outside the channel, all positions are closed to prevent loss.

For trending markets, the sister "EMA Percentage Channel with Bollinger Band Trend Trading Strategy" should be used instead.

## Principles 

1. Calculate the 200-period EMA as the baseline EMA.

2. Calculate the upper and lower bands based on the user-defined percentage:
    Upper Band = EMA * (1 + Percentage) 
    Lower Band = EMA * (1 - Percentage)

3. Calculate the 20-period Bollinger Bands to depict the channel range.

4. Go long when the closing price crosses above the lower Bollinger Band from below. Go short when the closing price crosses below the upper Bollinger Band from above.

5. Use ATR to calculate the stop loss to avoid excessive losses. 

6. If the price moves outside the defined percentage channel range, close all positions to prevent further losses.

## Advantages

1. The EMA baseline helps better capture trend reversal points.

2. The percentage channel sets a reasonable trading range to avoid overtrading. 

3. The Bollinger Bands provide support and resistance levels to aid entry timing.

4. The ATR trailing stop dynamically sets stop loss to effectively control per trade risk.

5. Closing all positions when the price breaches the channel quickly controls losses.

6. The customizable parameters are flexible for different market conditions.

## Risks

1. A channel range that is too wide may miss trends or delay stopping losses.

2. A channel range that is too narrow may cause overtrading and increase transaction costs.

3. Poor Bollinger Bands parameter settings may cause missed trading opportunities. 

4. A stop loss threshold set too loosely can lead to excessive losses per trade.

5. Parameters need to be optimized to find the optimal trading range.

## Optimization Directions

1. Test different EMA periods to find the most suitable moving average.

2. Optimize the percentage channel parameters to determine the optimal channel range.

3. Adjust the Bollinger Bands period to better capture volatility.

4. Tune the ATR period and multiplier to further refine the stop loss strategy.

5. Test long-only above EMA or short-only below EMA conditions and see if it improves win rate. 

6. Incorporate trend indicators to determine if early exit is needed.

## Conclusion

This strategy combines the strengths of moving averages, channels, volatility and more to create a relatively stable range trading system. The key is finding the most suitable parameter settings for each specific market to balance risk and reward. Future improvements can continue optimizing rules and parameters, or combining with trend strategies.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|200|EMA Length|
|v_input_2_close|0|EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|true|Channel Percentage (%)|
|v_input_4|20|length|
|v_input_5_close|0|Close price: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|2|mult|
|v_input_7|14|(?ATR Settings)ATR Period|
|v_input_8|1.75|ATR Multiplier Period|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-05 00:00:00
end: 2023-11-12 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="[mdeacey] EMA% Channel + BB Range Strategy", shorttitle="[mdeacey] EMA% Channel + BB Range Strategy", overlay=true)

//EMA 200

len = input(title="EMA Length", type=input.integer, defval=200)
srce = input(title="EMA Source", type=input.source, defval=close)

ema1= ema(srce,len)

percent = input(title="Channel Percentage (%)", type=input.float, defval= 1) 
valuee = (percent*ema1)/100
upperbande = ema1 + valuee
lowerbande = ema1 - valuee


plot(ema1, title='EMA200', color=color.gray, linewidth=1, style=plot.style_line )
plot(upperbande, title='EMA Upper Band', color=color.gray, linewidth=1, style=plot.style_line )
plot(lowerbande, title='EMA Lower Band', color=color.gray, linewidth=1, style=plot.style_line )

length = input(20, minval=2)
src = input(close, title="Close price")
mult = input(2.0, minval=0.001, maxval=50)

MA2 = sma(src, length)
dev = mult * stdev(src, length)
upper = MA2 + dev
lower = MA2 - dev

signalColor = crossunder(close, upper) ? color.red : crossover(close, lower) ? color.green : color.white

barcolor(color=signalColor)


upperBand = plot(upper, color=color.gray, linewidth=1)
lowerBand = plot(lower, color=color.gray, linewidth=1)
fill(upperBand, lowerBand,color=color.gray)
strategy.entry("Long",true,when = crossover(close,lower)  and close <upperbande and close>lowerbande)
strategy.close("Long",when = crossunder(close,lowerbande))
strategy.entry("Short",false,when = crossunder(close,upper)  and close <upperbande and close>lowerbande)
strategy.close("Short",when = crossover(close,upperbande))

//Inputs
atrPeriod = input(defval=14, title="ATR Period",group='ATR Settings', type=input.integer) // Adjust this to change the ATR calculation length
multiplierPeriod = input(defval=1.75, title="ATR Multiplier Period",group='ATR Settings',  type=input.float)// Adjust this to change the distance between your candles and the line

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
strategy.exit("Exit Long","Long",limit=upper ,stop = low - pine_rma(true_range() * multiplierPeriod, atrPeriod)  )
strategy.exit("eExit Short","Short",limit=lower ,stop =high +pine_rma(true_range() * multiplierPeriod, atrPeriod)  )

```

> Detail

https://www.fmz.com/strategy/431967

> Last Modified

2023-11-13 17:38:01
