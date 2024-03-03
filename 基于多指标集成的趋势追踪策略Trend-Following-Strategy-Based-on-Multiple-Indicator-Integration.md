
> Name

基于多指标集成的趋势追踪策略Trend-Following-Strategy-Based-on-Multiple-Indicator-Integration

> Author

ChaoZhang

> Strategy Description


[trans]
本策略名称为“基于多指标集成的趋势追踪策略”。该策略整合运用RSI、ADX和MACD三个指标,在确认上涨趋势后进行做多,在确认下跌趋势后进行平仓。

RSI指标判断超买超卖状态。RSI上穿30代表超卖结束,考虑做多;RSI下穿70代表超买结束,考虑平仓。

ADX指标判断趋势力度。ADX值上穿25意味着进入趋势状态,下穿25代表趋势结束。

MACD指标判定短期趋势。DIFF上穿DEA代表短线上涨,考虑做多。DIFF下穿DEA代表短线下跌,考虑平仓。

当RSI、ADX和MACD三指标同时显示多头信号时,进行做多。当三指标显示多头趋势结束时,进行平仓。

该策略的优势在于多指标确认,可以有效防止出现假信号。但指标参数需要单独优化,且止损策略不可或缺。

总体来说,指标集成应用提高了判断效果,但交易者仍需保持辨别力,根据实际情况调整并验证策略参数。



||



This strategy is named “Trend Following Strategy Based on Multiple Indicator Integration”. It combines the RSI, ADX and MACD indicators to go long after confirming uptrend, and close positions after confirming downtrend.

The RSI indicator determines overbought/oversold status. RSI crossing above 30 represents end of oversold, considering long entry. RSI crossing below 70 flags end of overbought, considering closing positions.

The ADX indicator gauges trend strength. ADX crossing above 25 means entering a trend, while crossing below 25 represents trend ending. 

The MACD judges short-term trend. DIFF crossing above DEA represents short-term uptrend, considering long entry. Crossing below flags short-term downtrend, considering closing positions.

When RSI, ADX and MACD all show bullish signals, long trades are taken. When all indicate trend ending, positions are closed.

The advantage is using multiple indicators for confirmation can effectively prevent false signals. But parameters need individual optimization, and stop loss is indispensable.

In summary, indicator integration improves judgment effectiveness, but traders still need discretion to adjust and validate strategy parameters based on actual conditions.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|RSIlength|
|v_input_2|30|overSold|
|v_input_3|70|overBought|
|v_input_4|14|adxlen|
|v_input_5|14|dilen|
|v_input_6|25|adxThreshold|
|v_input_7|false|MACDZero|
|v_input_8|12|fastLength|
|v_input_9|26|slowlength|
|v_input_10|9|MACDLength|
|v_input_11|20|length|
|v_input_12|2|mult|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-05 00:00:00
end: 2023-09-08 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// RSI
//@version=3
// strategy("Femi Strategy", overlay=true)
strategy("Femi Strategy", overlay=false)
RSIlength = input( 14 )
overSold = input( 30 )
overBought = input( 70 )
price = close

vrsi = rsi(price, RSIlength)



//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)





// ADX

//@version=3
adxlen = input(14)
dilen = input(14)
adxThreshold = input( 25 )
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


// MACD
//@version=3
MACDZero = input(0)
fastLength = input(12)
slowlength = input(26)
MACDLength = input(9)

MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD



source = close
length = input(20, minval=1)
mult = input(2.0, minval=0.001, maxval=50)

basis = sma(source, length)
dev = mult * stdev(source, length)

upper = basis + dev
lower = basis - dev

if (not na(vrsi))
    if (crossover(delta, MACDZero))
        strategy.entry("FEMIMACDLE", strategy.long, comment="FEMIMACDLE")
    else
        strategy.cancel(id="FEMIMACDLE")
        
    
    if (crossunder(vrsi, overSold))
        strategy.entry("FEMIRSILE", strategy.long, comment="FEMIRSILE")
    else
        strategy.cancel(id="FEMIRSILE")
        
        
    // if(crossover(sig, adxThreshold)) // crossover(sig, adxThreshold) crossover(delta, MACDZero) crossunder(vrsi, overSold)
    //     strategy.entry("FEMIADXLE", strategy.long, comment="FEMIADXLE")
    // else
    //     strategy.cancel(id="FEMIADXLE")
        
        
    // if (crossover(source, lower))
    //     strategy.entry("FEMIBBLE", strategy.long, comment="FEMIBBLE")
    // else
    //     strategy.cancel(id="FEMIBBLE")
        
    // if(crossunder(sig, adxThreshold))
        // strategy.cancel(id="FEMILE")
        // strategy.exit(id="FEMILE")
        
    // if (crossunder(delta, MACDZero))
        // strategy.entry("FEMIMACDSE", strategy.short, comment="FEMIMACDSE")
    if (crossover(vrsi, overBought))
        // strategy.entry("FEMIRSISE", strategy.short, comment="FEMIRSISE")
        strategy.close("FEMIRSILE")
        strategy.close("FEMIMACDLE")
        strategy.close("FEMIADXLE")
        strategy.close("FEMIBBLE")
    
    if (crossunder(sig, adxThreshold) and crossunder(delta, MACDZero) and crossunder(source, upper)) // crossover(delta, MACDZero) crossover(vrsi, overSold) crossover(sig, adxThreshold)
        strategy.close("FEMIRSILE")
        strategy.close("FEMIMACDLE")
        strategy.close("FEMIADXLE")
        strategy.close("FEMIBBLE")
        
    // if(crossunder(source, upper))
    //     strategy.close("FEMIRSILE")
    //     strategy.close("FEMIMACDLE")
    //     strategy.close("FEMIADXLE")
    //     strategy.close("FEMIBBLE")
        // strategy.entry("FEMIADXSE", strategy.short, comment="FEMIADXSE")
    // else
    //     strategy.cancel(id="FEMISE")

// plot(sig, color=red, title="ADX", linewidth=2, style=areabr)
// plot(adxThreshold, color=blue, title="ADX")


// plot(vrsi, color=green, title="RSI", linewidth=2, style=areabr)
// plot(overSold, color=blue, title="RSI")
// plot(overBought, color=red, title="RSI")

// plot(delta, color=green, title="MACD", linewidth=2, style=areabr)
// plot(MACDZero, color=blue, title="MACD")
// plot(overBought, color=red, title="MACD")
//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/426612

> Last Modified

2023-09-13 17:16:51
