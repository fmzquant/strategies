
> Name

动量指标RSI捕捉反转交易策略Momentum-Indicator-RSI-Reversal-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16ff330734f8bf0be54.png)


#### Overview

This strategy first calculates ADX and SMA on higher timeframes to identify trend direction and changes. Then RSI is calculated on lower timeframes to identify overbought and oversold conditions to generate trading signals.

#### Strategy Logic

1. ADX on higher timeframes judges the strength of the trend. Rising ADX represents strengthening trend.

2. SMA on higher timeframes judges the direction of the trend. Rising SMA represents rising prices, falling SMA represents falling prices.

3. RSI on lower timeframes judges overbought and oversold conditions. RSI above threshold means overbought, RSI below threshold means oversold.

4. When ADX rises, SMA rises, and RSI overbought on lower timeframe, it's considered the uptrend is strengthening, go short here.

5. When ADX rises, SMA falls, and RSI oversold on lower timeframe, it's considered the downtrend is strengthening, go long here.

#### Advantage Analysis 

1. Combines trend judgment and reversal trading, can capture reversal opportunities in major trends.

2. Utilizes indicators across timeframes, improves reliability of signals.

3. RSI strategy is simple to understand and implement.

#### Risk Analysis

1. Potential for false RSI signals, causing losing trades. Can optimize parameters to reduce false signals.

2. Major cycle trend judgment can be wrong, making strategy not suitable for market condition. Can consider more indicators for trend judgment.  

3. Potentially high trading frequency, impacting profitability due to transaction costs. Can adjust RSI parameters to reduce number of trades.

#### Optimization Directions

1. Test more parameter combinations to find optimal match between RSI and ADX, SMA parameters.

2. Add stop loss mechanism to control single trade loss.

3. Consider volatility indicator to reduce position size when volatility is low. 

4. Optimize specific entry and exit prices, like entering short upon breaking previous bar's high.

#### Conclusion

This strategy combines trend judgment and reversal signals to find local reversals within major trends. Compared to solely using RSI, it is more reliable and avoids being trapped. Overall a relatively conservative strategy suitable for investors looking to reduce false signals. Further parameter testing and mechanism optimization can improve strategy performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Custom Resolution / TF ? |
|v_input_2|180|Custom Resolution / TF|
|v_input_3|14|ADX Smoothing|
|v_input_4|14|DI Length|
|v_input_5|7|RSI length|
|v_input_6|28|RSI oversold|
|v_input_7|68|RSI overbought|
|v_input_8|20|SMA HTF Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-27 00:00:00
end: 2024-01-02 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy("RSI scalping", overlay=true)

CustSession 	= input(defval=true,title= "Custom Resolution / TF ? ",type=bool)
SessionTF0	= input(title="Custom Resolution / TF", defval="180")
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
length = input(7, title= "RSI length")
overSold = input( 28, title= "RSI oversold" )
overBought = input( 68, title= "RSI overbought" )

RSI = rsi(close, 7)

res		=	CustSession ? SessionTF0 : period

o = request.security(syminfo.tickerid, res, open)
c = request.security(syminfo.tickerid, res, close)
l = request.security(syminfo.tickerid, res, low)
h = request.security(syminfo.tickerid, res, high)

 // ADX higher time frame
dirmov(len) =>
	up = change(h)
	down = -change(l)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
    minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
    truer = request.security(syminfo.tickerid, res, tr)
	truerange = rma(truer, len)
	plus = fixnan(100 * rma(plusDM, len) / truerange)
	minus = fixnan(100 * rma(minusDM, len) / truerange)
	[plus, minus]

adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)

sig = adx(dilen, adxlen)

// SMA higher time frame
len = input(20, minval=1, title="SMA HTF Length")
smma = 0.0
smma := na(smma[1]) ? sma(c, len) : (smma[1] * (len - 1) + c) / len

ADXrising = (sig > sig[1]) and (sig[1] > sig[2]) and (sig[2]  > sig[3]) and (sig > 15)
SMAdrop= (smma < smma[1]) and (smma[1] < smma[2]) and (smma[2] < smma[3])
SMArising = (smma > smma[1]) and (smma[1] > smma[2]) and (smma[2] > smma[3])
longCondition = crossover(RSI, overBought) and ADXrising and SMArising
shortCondition = crossunder(RSI, overSold) and SMAdrop and ADXrising 

if (longCondition)
    strategy.entry("Long entry", strategy.long)

if (shortCondition)
    strategy.entry("Short Entry", strategy.short)
```

> Detail

https://www.fmz.com/strategy/437506

> Last Modified

2024-01-03 12:09:48
