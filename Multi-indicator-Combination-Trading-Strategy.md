
> Name

Multi-indicator-Combination-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1c0fcffbdd5befe089c.png)


### Overview

This strategy combines CCI, ADX and AO indicators to generate trading signals for long and short positions. CCI identifies overbought and oversold levels, ADX determines trend strength and direction, and AO assists in oscillating markets. The multi-indicator combination improves the stability and efficiency of the trading system.

### Strategy Logic

1. CCI indicates overbought above 100 and oversold below -100. This strategy goes long when CCI is below 0.

2. ADX measures trend strength. DI+ shows uptrend strength, DI- shows downtrend strength. ADX is the average trend strength. This strategy goes long when DI+ is below 25.

3. AO is fast SMA minus slow SMA. Rising AO represents strengthening bullish momentum, and falling AO represents strengthening bearish momentum. This strategy goes long when AO is below 0.

4. The trading rules are: Go long when CCI < 0 and DI+ < 25 and AO < 0; Close long when DI+ > 25. 

5. Dynamically calculate order size as equity divided by close price and rounded down, to adjust orders as account equity changes.

6. Use strategy.entry for long signals, and strategy.close for exit signals.

### Advantages

1. CCI filters noise from ranging markets, reducing false signals.

2. ADX identifies stronger trends early.

3. AO avoids trading choppy markets. 

4. Multiple indicators verify signals, increasing reliability.

5. Dynamic position sizing manages risk effectively.

6. Simple and clear logic, easy to follow.

### Risks

1. CCI struggles identifying vkosd ranges.

2. ADX has lag in catching trend turns. 

3. AO struggles with choppy consolidation. 

4. Poor indicator settings lead to over-filtering and missed trades.

5. Dynamic sizing dependent on volatility and markets.

6. Potential for large drawdowns, requiring strict risk management.

### Enhancements

1. Optimize CCI parameters for different markets.

2. Optimize ADX parameters to catch trend changes.

3. Adjust AO parameters for volatility environments. 

4. Test combinations to find optimal indicator weighting.

5. Add stop loss for drawdown control.

6. Incorporate volume for false breakout avoidance. 

7. Customize fixed position sizing by instrument.

### Conclusion

This strategy combines CCI, ADX and AO to generate fairly reliable long signals. Dynamic sizing and position management control risk. The logic is simple and clear for beginners to follow. But it struggles in ranging markets, with significant optimization potential required for different markets. Further testing and tuning is needed for robustness across instruments and environments.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|buywhenadxabove|
|v_input_2|10|buywhendiplusbelow|
|v_input_3|false|buywhenccibelow|
|v_input_4|false|buywhenawesomeoscillatorbelow|
|v_input_5|25|sellwhendiplusabove|
|v_input_6|20|numberofbarsforcci|
|v_input_7|14|ADX Smoothing|
|v_input_8|14|DI Length|
|v_input_9|34|Length Slow|
|v_input_10|5|Length Fast|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-19 00:00:00
end: 2023-10-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("Strategy Niel", shorttitle="Strategy Niel", max_bars_back=2000, initial_capital=1000)

//Input variables
buywhenadxabove = input(25)
buywhendiplusbelow = input(10)
buywhenccibelow = input(0)
buywhenawesomeoscillatorbelow = input(0)
sellwhendiplusabove = input(25)

//CCI script
numberofbarsforcci = input(20)
CCI = cci(close,numberofbarsforcci)

//+DI and ADX
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
dirmov(len) =>
	up = change(high)
	down = -change(low)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(up > down and up > 0 ? up : 0, len) / truerange)
	minus = fixnan(100 * rma(down > up and down > 0 ? down : 0, len) / truerange)
	[plus, minus]

adx(dilen, adxlen) => 
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
	[adx, plus, minus]

[sig, up, down] = adx(dilen, adxlen)

//plot(sig, color=red, title="ADX")
//plot(up, color=blue, title="+DI")
//plot(down, color=orange, title="-DI")


//Awesome Oscillator
nLengthSlow = input(34, minval=1, title="Length Slow")
nLengthFast = input(5, minval=1, title="Length Fast")
xSMA1_hl2 = sma(hl2, nLengthFast)
xSMA2_hl2 = sma(hl2, nLengthSlow)
xSMA1_SMA2 = xSMA1_hl2 - xSMA2_hl2
cClr = xSMA1_SMA2 > xSMA1_SMA2[1] ? blue : red
//plot(xSMA1_SMA2, style=histogram, linewidth=1, color=cClr)

buy = sig > buywhenadxabove and up < buywhendiplusbelow  and CCI < buywhenccibelow and xSMA1_SMA2 < buywhenawesomeoscillatorbelow 

ordersize=floor(strategy.equity/close) // Floor returns largest integer, strategy.equity gives total equity remaining - allows to dynamically calculate the order size as the account equity increases or decreases.
strategy.entry("long",strategy.long,ordersize,when= buy) //strategy.entry let's you enter the market variables id ("long"), strategy.long (long position entry), size of the order and when the order should happen
bought = strategy.position_size[0] > strategy.position_size[1]
entry_price = valuewhen(bought, open, 0)
sell = up > sellwhendiplusabove 
strategy.close("long", when=sell ) //strategy.close let's you close your position with variables id ('long') and when this should happen



```

> Detail

https://www.fmz.com/strategy/430245

> Last Modified

2023-10-26 15:22:28
