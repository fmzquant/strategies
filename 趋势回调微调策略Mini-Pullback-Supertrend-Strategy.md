
> Name

趋势回调微调策略Mini-Pullback-Supertrend-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy aims to capture small pullbacks in a trend and go long when the pullback finishes to profit. It uses a combination of technical indicators like EMA, MACD, RSI to identify the trend and end of pullbacks. It also uses ATR to set stop loss and take profit prices.

## Principles 

The strategy first calculates EMA, MACD and RSI to determine current trend direction and strength. 

It uses 3 EMAs (21-period short, 50-period medium and 200-period long). When short EMA crosses above medium and long EMAs, it signals an uptrend.

MACD judges trend strength. When MACD line or histogram crosses above 0 line, it shows uptrend strengthening. 

RSI indicates whether overbought/oversold. RSI crossing above 50 suggests pullback may end.

Then SuperTrend indicator identifies specific buy point of pullback. Its flip from down to up gives buy signal.

Finally, stop loss and take profit are set based on ATR.

## Advantages

- More reliable signals using multiple indicator combo.
- Catch short-term opportunities in trends with high win rate. 
- Effective risk control with stop loss/take profit.

## Risks

- Prolonged pullback may lead to extended losses.
- Multiple indicators make parameter tuning complex. 
- Stop loss too loose may enlarge losses.

Risk management:

- Optimize parameters for indicator alignment.
- Adjust stop loss properly against big losses.
- Avoid stocks with prolonged pullbacks.

## Optimization

- Test different parameter combinations for best indicator values.
- Adjust stop loss/take profit based on stock's daily fluctuation.
- Add volume indicator to avoid low volume cases.

## Conclusion

The strategy combines multiple indicators reliably for trend and pullback identification. Strict stop loss mechanism controls risk and allows timely liquidation. With persistent parameter and universe tuning, it can achieve good returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_source_1_close|0|EMA Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|21|EMA 1 len|
|v_input_1|50|EMA 2 len|
|v_input_2|200|EMA 3 len|
|v_input_source_2_close|0|MACD Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|12|MACD Fast|
|v_input_int_3|26|MACD Signal|
|v_input_int_4|9|MACD Histogram|
|v_input_source_3_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_5|14|RSI Len|
|v_input_int_6|3|K|
|v_input_int_7|3|D|
|v_input_int_8|14|RSI Length|
|v_input_int_9|14|Stochastic Length|
|v_input_3_close|0|RSI Source Stoch: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_bool_1|true|Use EMA Filter|
|v_input_bool_2|true|Use RSI Filter|
|v_input_bool_3|true|Use MACD Filter|
|v_input_int_10|14|ATR Period|
|v_input_source_4_close|0|Supertrend Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|2|ATR Multiplier|
|v_input_bool_4|true|Change ATR Calculation Method ?|
|v_input_bool_5|true|Show Buy/Sell Signals ?|
|v_input_bool_6|true|Highlighter On/Off ?|
|v_input_int_11|5|Bars from cross to signal|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-10-06 00:00:00
end: 2023-10-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy(title="pullb", overlay = true, initial_capital = 10000, default_qty_value = 100, default_qty_type = strategy.percent_of_equity)

//variables

///emas var
ema_src = input.source(close, "EMA Source")
ema_1 = input.int(21, 'EMA 1 len')
ema_2 = input(50, 'EMA 2 len')
ema_3 = input(200, 'EMA 3 len')

///macd var
mac_src = input.source(close, "MACD Source")
mac_1 = input.int(12, 'MACD Fast')
mac_2 = input.int(26, 'MACD Signal')
mac_3 = input.int(9, 'MACD Histogram')

///rsi var
rsi_src = input.source(close, "RSI Source")
rsi_len = input.int(14, 'RSI Len')

///stoch var
smoothK = input.int(3, "K", minval=1)
smoothD = input.int(3, "D", minval=1)
lengthRSI = input.int(14, "RSI Length", minval=1)
lengthStoch = input.int(14, "Stochastic Length", minval=1)
stoch_src = input(close, title="RSI Source Stoch")

//usage variables
ema_b = input.bool(true, "Use EMA Filter")
rsi_b = input.bool(true, "Use RSI Filter")
macd_b = input.bool(true, "Use MACD Filter")
//stoch_b = input(title="Use STOCH Filter", type=bool, defval=true)

//emaas
ema1 = ta.ema(ema_src, ema_1)
ema2 = ta.ema(ema_src, ema_2)
ema3 = ta.ema(ema_src, ema_3)

//macd
[macdLine, signalLine, histLine] = ta.macd(mac_src, mac_1, mac_2, mac_3)

//rsi
rsi = ta.rsi(rsi_src, rsi_len)

//stoch
rsi1 = ta.rsi(stoch_src, lengthRSI)
k = ta.sma(ta.stoch(rsi1, rsi1, rsi1, lengthStoch), smoothK)
d = ta.sma(k, smoothD)

//supertrend
Periods = input.int(14, "ATR Period")
src_st = input.source(close, "Supertrend Source")
Multiplier = input.float(2.0 , "ATR Multiplier")
changeATR= input.bool(true, "Change ATR Calculation Method ?")
showsignals = input.bool(true, "Show Buy/Sell Signals ?")
highlighting = input.bool(true, "Highlighter On/Off ?")
atr2 = ta.sma(ta.tr, Periods)
atr3= changeATR ? ta.atr(Periods) : atr2
up=src_st-(Multiplier*atr3)
up1 = nz(up[1],up)
up := close[1] > up1 ? math.max(up,up1) : up
dn=src_st+(Multiplier*atr3)
dn1 = nz(dn[1], dn)
dn := close[1] < dn1 ? math.min(dn, dn1) : dn
trend = 1
trend := nz(trend[1], trend)
trend := trend == -1 and close > dn1 ? 1 : trend == 1 and close < up1 ? -1 : trend
buySignal = trend == 1 and trend[1] == -1
sellSignal = trend == -1 and trend[1] == 1

//conditions
///buy
rsi_cond_b = if rsi_b
    rsi >= 50
else 
    true

macd_cond_b = if macd_b
    (histLine >= 0 or histLine < histLine[1])
else
    true
ema_cond_b = if ema_b
    (ema1 > ema2 and ema2 > ema3)
else 
    true

look_for = input.int(5, "Bars from cross to signal")

stoch_signal_sum = 0
for i = 0 to (look_for)
    if k[i] > d[i] and k[i + 1] < d[i + 1] and (k[i + 1] < 20 and d[i + 1] < 20)
        stoch_signal_sum := stoch_signal_sum + 1
        
stoch_cond_b = if stoch_signal_sum > 0
    if k > 80 and d > 80
        false
    else
        true
else
    false


sup_cond_b = buySignal

buy_sig = (rsi_cond_b and macd_cond_b and ema_cond_b and stoch_cond_b and sup_cond_b)

tp_b = close + (ta.atr(14) * 3)
sl_b = close - (ta.atr(14) * 1.5)

if (buy_sig)
    strategy.entry("long", strategy.long)
    strategy.exit("exit", "long", stop = sl_b, limit = tp_b)
plot(tp_b)
plot(sl_b)


```

> Detail

https://www.fmz.com/strategy/429149

> Last Modified

2023-10-13 15:49:29
