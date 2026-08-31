
> Name

Golden-Bollinger-Band-Gap-Reversion-System

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d61ea212f6073cd390.png)

### Overview

This is a forex gap trading system based on Bollinger Bands. It is suitable for major currency pairs, with lowest possible commission (below 1 pip) and timeframes ranging from 1-15 min.
  

### Strategy Logic

The system uses Bollinger Bands, RSI and ADX indicators to identify trading opportunities.  

Bollinger Bands are used to identify price breakouts. Go long when price breaks above upper band, go short when price breaks below lower band. RSI is used to avoid false breakouts. Breakouts are considered valid only when RSI reverses (falling from overbought zone or rising from oversold zone). ADX is used to filter out markets without a clear trend, only taking trades when ADX is below 32.

Specific entry rules are: Long entry requires price breaking above upper band, RSI rising from oversold zone and crossing 30 line, ADX below 32 at the same time. Short entry requires price breaking below lower band, RSI falling from overbought zone and crossing 70 line, ADX below 32 at the same time.  

Exit rules include take profit/stop loss and middle line reversion. Namely: Set fixed take profit/stop loss points. Close position when price returns to Bollinger middle line.


### Advantage Analysis  

The system has the following advantages:  

1. Using Bollinger Bands to catch gap trading opportunities, which have great profit potential.
  
2. Combining RSI indicator to avoid false breakouts and improve profit probability.   

3. Using ADX indicator to filter out markets without clear trends, avoiding unnecessary trades.  

4. Closing on middle line reversion locks in most profits and avoids profit retracement.
  
5. Suitable for high leverage trading, profits can be amplified quickly.


### Risk Analysis

There are also some risks:   

1. Relies on gap breakouts. No profits if no gap captures. 

2. Backtest overfitting risk. Live results may diverge from backtests.
  
3. Insufficient trend duration. Whipsaws can cause losses.   

4. High leverage amplifies risks. Single loss can be large. 

5. Trading time restrictions may cause missing trades.


### Optimization Directions

The system can be improved from the following aspects:

1. Optimize parameters to improve indicator effectiveness, e.g. Bollinger period, RSI settings etc. 

2. Add or improve filters to increase percentage of winning trades, e.g. combining more indicators or fundamentals.

3. Optimize profit taking strategy to maximize per trade profit, e.g. trailing stop loss, ATR based stop loss etc.  

4. Automatically determine suitable leverage level to maximize expected return.  

5. Use machine learning techniques to find optimal parameters automatically instead of manual iteration.


### Conclusion

The Golden Bollinger Band Gap Reversion System is a typical short-term breakout system. It aims to capture profits from price gaps. Multiple filters are used to improve quality of signals. It demonstrates good profitability in backtests. But live performance is still to be validated, with liquidity and slippage impacting results. Overall this is a promising short-term trading strategy, worth live testing and optimization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|length|
|v_input_2|35|overSold|
|v_input_3|65|overBought|
|v_input_4|60|lengthB|
|v_input_5_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_6|2|StdDev|
|v_input_7|14|ADX Smoothing|
|v_input_8|14|DI Length|
|v_input_9|90|tp|
|v_input_10|90|sl|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © exlux99

//@version=4
strategy("Bollinger Bands, RSI and ADX Trading System", overlay=true)


timeinrange(res, sess) => time(res, sess) != 0


timer = color.red


//bgcolor(timeinrange(timeframe.period, "0300-0600") or timeinrange(timeframe.period, "0900-1300") or timeinrange(timeframe.period, "2030-2300") ? timer : na, transp=70)


//RSI
length = input( 20 )
overSold = input( 35 )
overBought = input( 65 )
price = close
vrsi = rsi(price, length)
co = crossover(vrsi, overSold)
cu = crossunder(vrsi, overBought)
//if (not na(vrsi))


//BB
lengthB = input(60, minval=1)
src = input(close, title="Source")
mult = input(2.0, minval=0.001, maxval=50, title="StdDev")
basis = sma(src, lengthB)
dev = mult * stdev(src, lengthB)
upper = basis + dev
lower = basis - dev


//adx
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
dirmov(len) =>
	up = change(high)
	down = -change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = rma(tr, len)
	plus = fixnan(100 * rma(plusDM, len) / truerange)
	minus = fixnan(100 * rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * rma(abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
sig = adx(dilen, adxlen)

longEntry = close < upper and crossover(vrsi,overSold) and sig < 32 //and (timeinrange(timeframe.period, "0301-0600") or timeinrange(timeframe.period, "0901-1300") or timeinrange(timeframe.period, "2031-2300"))

shortEntry = close > upper and crossunder(vrsi,overBought) and sig < 32 //and (timeinrange(timeframe.period, "0301-0600") or timeinrange(timeframe.period, "0901-1300") or timeinrange(timeframe.period, "2031-2300"))


tp=input(90, step=10)
sl=input(90, step=10)

strategy.entry("long",1,when=longEntry)
strategy.exit("X_long", "long", profit=tp,  loss=sl )
strategy.close("long",when=crossunder(close,basis))

strategy.entry('short',0,when=shortEntry)
strategy.exit("x_short", "short",profit=tp, loss=sl)
strategy.close("short",when=crossover(close,basis))






```

> Detail

https://www.fmz.com/strategy/440701

> Last Modified

2024-02-01 11:46:13
