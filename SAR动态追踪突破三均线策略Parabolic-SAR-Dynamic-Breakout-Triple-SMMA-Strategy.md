
> Name

SAR动态追踪突破三均线策略Parabolic-SAR-Dynamic-Breakout-Triple-SMMA-Strategy

> Author

ChaoZhang

> Strategy Description


![IMG](https://www.fmz.com/upload/asset/1a4f3ced46ef3f60589.png)


### Overview

This is a breakout trading strategy combining the parabolic SAR indicator and triple SMMA lines with different periods. It goes long when all three SMMA lines are rising and goes short when all are falling, while using the SAR indicator to determine the trend direction and taking counter trend entries when SAR flips directions. The strategy also incorporates stop loss and take profit.

### Strategy Logic

The strategy is based on the following key points:

1. Using the parabolic SAR indicator to determine the current trend direction. SAR can dynamically track price changes and identify uptrends and downtrends.

2. Setting up three SMMA lines with different periods (fast line 21, mid line 50, slow line 200). When all three lines are rising, it signals an uptrend. When all are falling, it signals a downtrend.

3. Going long when SAR flips down while all three SMMA lines are rising. 

4. Going short when SAR flips up while all three SMMA lines are falling.

5. Incorporating stop loss based on SAR and take profit at certain percentage of entry price.

Specifically, the strategy first checks if SAR flips directions on the current bar. If SAR flips from up to down while SMMAs are rising, it goes long. If SAR flips from down to up while SMMAs are falling, it goes short. 

After entry, the stop loss is set at the SAR price on the next bar, using SAR as a dynamic trailing stop loss. Take profit is set at 10% of the entry price. When price reaches either take profit or stop loss levels, the position is closed.

### Advantage Analysis

This strategy combines the advantage of a trend-following indicator and multiple time frame moving averages, allowing timely entries at trend reversals while filtering out false breaks with SMMAs. The main advantages are:

1. SAR can quickly detect trend changes and capture reversal opportunities.

2. The triple SMMAs effectively filter out market noise and avoid false breaks.

3. Using SMMA results in smoother curves and less interference from MA whipsaws. 

4. Incorporating stop loss and take profit helps control single trade loss and lock in partial profits.

5. Flexible parameter settings allow optimization for different markets.

### Risk Analysis

There are also some risks to consider:

1. SAR may flip frequently during choppy trends, increasing costs from excessive trading.

2. SMMA settings may not fit all instruments well, requiring individual optimization.

3. SAR stop loss has time lag, potentially increasing losses. 

4. SAR may flip on false breaks in steady trends. Smoothening SAR parameters can help.

5. Poor SMMA settings may cause missed trends or bad signals. Careful testing is needed.

To address the risks, optimizations can focus on:

1. Adjusting SAR parameters based on volatility to reduce flips.

2. Tuning SMMA periods to fit instrument characteristics. 

3. Improving stop loss, e.g. with trailing or limit orders.

4. Using limit orders for stop loss in active trading.

5. Extensive testing and tuning of parameters.

### Optimization Directions

Based on the above analysis, optimizations may involve:

1. Optimizing SAR parameters for smoother curves and fewer flips.

2. Adjusting SMMA lengths to match trading instruments.

3. Employing dynamic stop loss like trailing stops or limit orders. 

4. Using limit orders for stop loss in high-frequency trading.

5. Adding filters like RSI, KD to improve signal quality.

6. Improving entry conditions, e.g. checking candle patterns with SAR flips.

7. Adding re-entry conditions after stop loss triggers.

8. Enhancing take profit with trailing, partial close, staggering levels.

9. Parameter tuning based on backtest results and sensitivity analysis.

### Summary

In summary, this is a simple and practical breakout strategy combining the sensitivity of SAR in catching trend changes and the filtering effect of moving averages. It can identify trend reversal points fast. The use of stop loss and take profit helps control risks and lock in profits. Further optimizations on parameter settings, entry/exit rules, and robustness against false breaks can enhance strategy performance for different trading instruments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|0.02|(?SAR)start|
|v_input_float_2|0.02|increment|
|v_input_float_3|0.2|maximum|
|v_input_float_4|0.1|(?Stop Loss and Take Profit)Take Profit (%)|
|v_input_float_5|true|StopLoss (%)|
|v_input_int_1|21|(?Smooth Moving Average)Fast Length|
|v_input_int_2|50|Mid Length|
|v_input_int_3|200|Slow Length|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-08 00:00:00
end: 2023-11-07 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="SAR + 3SMMA with SL & TP", overlay=true, calc_on_order_fills=false, calc_on_every_tick=false, default_qty_type=strategy.percent_of_equity, default_qty_value=100, currency=currency.USD, commission_type= strategy.commission.percent, commission_value=0.03)
start = input.float(0.02, step=0.01, group="SAR")
increment = input.float(0.02, step=0.01, group="SAR")
maximum = input.float(0.2, step=0.01, group="SAR")

//Take Profit Inputs     
take_profit = input.float(title="Take Profit (%)", minval=0.0, step=0.1, defval = 0.1, group="Stop Loss and Take Profit", inline="TP") * 0.01

//Stop Loss Inputs
stop_loss = input.float(title="StopLoss (%)", minval=0.0, step=0.1, defval=1, group="Stop Loss and Take Profit", inline="SL") * 0.01

// Smooth Moving Average
fastSmmaLen = input.int(21, minval=1, title="Fast Length", group = "Smooth Moving Average")
midSmmaLen = input.int(50, minval=1, title="Mid Length", group = "Smooth Moving Average")
slowSmmaLen = input.int(200, minval=1, title="Slow Length", group = "Smooth Moving Average")

src = input(close, title="Source", group = "Smooth Moving Average")

smma(ma, src, len) => 
    smma = 0.0
    smma := na(smma[1]) ? ma : (smma[1] * (len - 1) + src) / len
    smma

fastSma = ta.sma(src, fastSmmaLen)
midSma = ta.sma(src, midSmmaLen)
slowSma = ta.sma(src, slowSmmaLen)

fastSmma = smma(fastSma, src, fastSmmaLen)
midSmma = smma(midSma, src, midSmmaLen)
slowSmma = smma(slowSma, src, slowSmmaLen)

isSmmaUpward = ta.rising(fastSmma, 1) and ta.rising(midSmma, 1) and ta.rising(slowSmma, 1)

var bool uptrend = na
var float EP = na
var float SAR = na
var float AF = start
var float nextBarSAR = na

if bar_index > 0
	firstTrendBar = false
	SAR := nextBarSAR
	if bar_index == 1
		float prevSAR = na
		float prevEP = na
		lowPrev = low[1]
		highPrev = high[1]
		closeCur = close
		closePrev = close[1]
		if closeCur > closePrev
			uptrend := true
			EP := high
			prevSAR := lowPrev
			prevEP := high
		else
			uptrend := false
			EP := low
			prevSAR := highPrev
			prevEP := low
		firstTrendBar := true
		SAR := prevSAR + start * (prevEP - prevSAR)
	if uptrend
		if SAR > low
			firstTrendBar := true
			uptrend := false
			SAR := math.max(EP, high)
			EP := low
			AF := start
	else
		if SAR < high
			firstTrendBar := true
			uptrend := true
			SAR := math.min(EP, low)
			EP := high
			AF := start
	if not firstTrendBar
		if uptrend
			if high > EP
				EP := high
				AF := math.min(AF + increment, maximum)
		else
			if low < EP
				EP := low
				AF := math.min(AF + increment, maximum)
	if uptrend
		SAR := math.min(SAR, low[1])
		if bar_index > 1
			SAR := math.min(SAR, low[2])
	else
		SAR := math.max(SAR, high[1])
		if bar_index > 1
			SAR := math.max(SAR, high[2])
	nextBarSAR := SAR + AF * (EP - SAR)

sarIsUpTrend = uptrend ? true : false

sarFlippedDown = sarIsUpTrend and not sarIsUpTrend[1] ? true : false
sarFlippedUp = not sarIsUpTrend and sarIsUpTrend[1] ? true : false


longEntryCondition = isSmmaUpward and sarFlippedDown
shortEntryCondition = not isSmmaUpward and sarFlippedUp

if(longEntryCondition)
    strategy.entry("L", strategy.long, stop=nextBarSAR, comment="L")

if(shortEntryCondition)
    strategy.entry("S", strategy.short, stop=nextBarSAR, comment="S")


strategy.exit("CL", when=strategy.position_size > 0, limit=strategy.position_avg_price * (1+take_profit), stop=strategy.position_avg_price*(1-stop_loss))
strategy.exit("CS", when=strategy.position_size < 0, limit=strategy.position_avg_price * (1-take_profit), stop=strategy.position_avg_price*(1+stop_loss))


plot(SAR, style=plot.style_cross, linewidth=1, color=color.orange)
plot(nextBarSAR, style=plot.style_cross, linewidth=1, color=color.aqua)
plot(series = fastSmma, title="fastSmma", linewidth=1)
plot(series = midSmma, title="midSmma", linewidth=2)
plot(series = slowSmma, title="slowSmma", linewidth=3)
plotchar(series = isSmmaUpward, title="isSmmaUpward", char='')
plotchar(series=sarIsUpTrend, title="sarIsUpTrend", char='')
plotchar(series=sarFlippedUp, title="sarFlippedUp", char='')
plotchar(series=sarFlippedDown, title="sarFlippedDown", char='')
plotchar(series=longEntryCondition, title="longEntryCondition", char='')
plotchar(series=shortEntryCondition, title="shortEntryCondition", char='')
plotchar(series=strategy.position_size > 0, title="inLong", char='')
plotchar(series=strategy.position_size < 0, title="inShort", char='')


//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)


```

> Detail

https://www.fmz.com/strategy/431495

> Last Modified

2023-11-08 11:53:09
