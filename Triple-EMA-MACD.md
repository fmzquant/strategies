
> Name

Triple-EMA-MACD

> Author

ChaoZhang

> Strategy Description

long 50>200 ema
short 50<200 ema

tyvm have a nice day

**backtest**

 ![IMG](https://www.fmz.com/upload/asset/11f50a9e26890f755a7.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Enable 2nd MA|
|v_input_2|true|Enable 3rd MA|
|v_input_3|50|First length|
|v_input_4|150|Second length|
|v_input_5|200|Third length|
|v_input_6_close|0|First source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_7_close|0|Second source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_8_close|0|Third source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_9|26|fastLength|
|v_input_10|49|slowlength|
|v_input_11|2|MACDLength|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-10 00:00:00
end: 2022-05-03 23:59:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//@Author: AdventTrading
//Modified by viraltaco_

// This indicator was made to allow three moving averages to be displayed 
// without needing to use up 3 charting indicators individually

strategy(title = "Triple EMA + MACD", shorttitle = "tEMACd", overlay = true, default_qty_value = 750)

// Checkbox's for the other 2 MA's
line_2 = input(true, title = "Enable 2nd MA")
line_3 = input(true, title = "Enable 3rd MA")

len_1 = input( 50, minval = 1, title = "First length")
len_2 = input(150, minval = 1, title = "Second length")
len_3 = input(200, minval = 1, title = "Third length")

src_1 = input(close, title = "First source")
src_2 = input(close, title = "Second source")
src_3 = input(close, title = "Third source") 

tit_1 = "EMA 50"
tit_2 = "EMA 150"
tit_3 = "EMA 200"

plot(ema(src_1, len_1), title = tit_1, color = #10aaff)
plot((line_2) ? ema(src_2, len_2) : na, title = tit_2, color = #10ad00)
plot((line_3) ? ema(src_3, len_3) : na, title = tit_3, color = #ad0010)

//strategy("MACD Strategy", overlay=true)

fastLength = input(26)
slowlength = input(49)
MACDLength = input(2)

SMema = ema(src_1, len_1)
LGema = ema(src_3, len_3)
MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD


if (crossover(delta, 0) and SMema > LGema)
    strategy.entry("MacdLE", strategy.long, comment="MacdLE")


if (crossunder(delta, 0) and SMema < LGema)
    strategy.entry("MacdSE", strategy.short, comment="MacdSE")

//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/362430

> Last Modified

2022-05-11 16:17:19
