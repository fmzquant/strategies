
> Name

The-Bollinger-Bands-Stop-Loss-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c52dfe7436a4578570.png)


#### Overview

The Bollinger Bands Strategy is a classic strategy that utilizes Bollinger Bands for trend tracking and overbought/oversold signals. This version adds stop loss mechanisms to control risks over the original strategy.  

The strategy judges overbought/oversold conditions through golden/dead crossovers of the upper/lower Bollinger Bands to establish positions. The area between the bands reflects current market volatility range. The bands consist of middle, upper and lower bands, where the middle band is the N-day simple moving average and the upper/lower bands are middle band +/- K standard deviations.

#### Principles 

Bollinger Bands reflect market volatility and oscillation range. Touching the lower band means oversold status quo - gaps have higher probabilities of being filled up. Thus long positions should be considered based on mean-reversion principle. Likewise, touching the upper band represents potential overbought conditions and likely price reversals, so short positions can be established to profit on the down moves.

This strategy combines the overbought/oversold signals from Bollinger Bands for trend tracking entries. Stop loss mechanisms are incorporated to control risks. 

When price crosses above the lower band, market exits oversold area into reasonable range. Long positions can be opened. When price crosses below upper band, market becomes overbought. Shorts can then be opened.  

After orders are filled, fixed percentage stop loss levels are set to manage risks. When losses exceed stop loss percentage, current positions are stopped out to limit further losses.

#### Advantages

1. Identify overbought/oversold levels with Bollinger Bands for low-buy-high-sell setups judging by band crossovers.

2. Capture trends through volatility property of Bollinger Bands.  

3. Stop loss mechanism effectively limits max loss per trade.

4. Combining trend tracking and stop loss leads to steady gains.

#### Risks and Optimization  

1. Parameter settings impacts signal quality. Middle band length N and standard deviation multiplier K should be rationally set for different markets, or accuracy will suffer.

2. Oversized or undersized stop loss hurts return stability. Overlarge percentage risks heavier losses per trade, while undersized percentage risks premature stop loss triggers. Reasonable percentage should be set based on different products. 

3. Additional filters with other indicators may improve signal accuracy.  

4. Different holding period settings can be tested, such as combining hourly or shorter period bands for higher frequency trading and capital usage efficiency improvements.

#### Conclusion

This strategy leverages Bollinger Bands for overbought/oversold signals and incorporates stop loss for risk control. It is a common trend tracking strategy. Through optimizing parameters, integrating more accurate signals and stop loss levels, steady profits can be achieved.  


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|20|length|
|v_input_float_1|2|mult|
|v_input_float_2|true|Stop Loss Percent|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-15 00:00:00
end: 2023-11-22 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="Bollinger Bands Strategy", overlay=false, shorttitle="BBS", pyramiding=0, currency=currency.USD, commission_type=strategy.commission.percent, commission_value=0.03, initial_capital=1000)
source = input(close, "Source")
length = input.int(20, minval=1)
mult = input.float(2.0, minval=0.001, maxval=50, step=0.001)
stopLossFactor = input.float(1, "Stop Loss Percent", maxval = 100, minval = 0, step=0.1)

basis = ta.sma(source, length)
dev = mult * ta.stdev(source, length)
upper = basis + dev
lower = basis - dev

var float lastTradePrice = na
var float stopLossLow = na
var float stopLossHigh = na
var bool currentIsLong = na

var bool nextExpectedIsLong = true

var bool existedLong = false
var bool existedShort = false

buyEntry = ta.crossover(source, lower)
sellEntry = ta.crossunder(source, upper)

if (buyEntry and nextExpectedIsLong == true)
	strategy.entry("BBandLE", strategy.long, comment="BBandLE")
	nextExpectedIsLong := false
	if(nz(strategy.position_size[1], 0) < 0) // new position detected
	    lastTradePrice := close
	    stopLossLow := lastTradePrice * (1 - (stopLossFactor / 100))
	    stopLossHigh := lastTradePrice * (1 + (stopLossFactor / 100))
else
    strategy.cancel("BBandLE")

if (sellEntry and nextExpectedIsLong == false)
	strategy.entry("BBandSE", strategy.short, comment="BBandSE")
	nextExpectedIsLong := true
	if(nz(strategy.position_size[1], 0) > 0) // new position detected
        lastTradePrice := close
        stopLossLow := lastTradePrice * (1 - (stopLossFactor / 100))
        stopLossHigh := lastTradePrice * (1 + (stopLossFactor / 100))
else
    strategy.cancel("BBandSE")

strategy.close("BBandLE", close < stopLossLow)
strategy.close("BBandSE", close > stopLossHigh)

// if(nz(strategy.position_size[1], 0) < 0 and close > stopLossHigh)
//     strategy.entry("BBandLE", strategy.long, comment="BBandLE")
// 	lastTradePrice := close
// 	stopLossLow := lastTradePrice * (1 - (stopLossFactor / 100))
// 	stopLossHigh := lastTradePrice * (1 + (stopLossFactor / 100))
// if(nz(strategy.position_size[1], 0) > 0 and close < stopLossLow)
//     strategy.exit("BBandSE", strategy.short, comment="BBandSE")
//     lastTradePrice := close
//     stopLossLow := lastTradePrice * (1 - (stopLossFactor / 100))
//     stopLossHigh := lastTradePrice * (1 + (stopLossFactor / 100))

plot(source, "close", color.blue)
plot(lower, "lower", color.red)
plot(upper, "upper", color.red)
plot(stopLossLow, "StopLossLow", color.black)
plot(stopLossHigh, "StopLossHigh", color.black)
plot(lastTradePrice, "lastTradePrice", color.green)
plotchar(strategy.position_size > 0, char="-", size=size.tiny, location=location.bottom, color=color.green)
plotchar(strategy.position_size < 0, char="-", size=size.tiny, location=location.bottom, color=color.red)



```

> Detail

https://www.fmz.com/strategy/433013

> Last Modified

2023-11-23 15:49:12
