
> Name

Dual-Moving-Average-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description



This strategy uses both SMA and EMA moving averages to determine long and short direction based on price breakouts. It goes long when the close is above both SMA and EMA, goes short when the close is below both SMA and EMA, and flattens out when the close is between the SMA and EMA. The SMA and EMA periods can be customized by the user. 

The advantage of this dual moving average breakout strategy is combining two moving average systems can improve accuracy. However, issues like false signals during range-bound markets and lagging signals exist. Also, no stop loss is implemented to control losses.

In summary, this strategy works better when strong trends are present, but should be traded cautiously. Optimization of parameters, adding stops, and extra filters can improve the strategy by reducing false signals. 

Overall, the dual moving average breakout strategy has a simple trading logic, but requires proper risk control and parameter tuning to be applied successfully in live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|long|
|v_input_2|true|short|
|v_input_3|true|Use MA1 (SMA, blue)|
|v_input_4|true|Use MA2 (EMA, red)|
|v_input_5|40|MA1 length|
|v_input_6|40|MA2 length|
|v_input_7|true|Use color-filter|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-11 00:00:00
end: 2023-09-10 00:00:00
period: 10m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy(title = "Noro's Multima v1.0", shorttitle = "Multima 1.0", overlay=true, default_qty_type = strategy.percent_of_equity, default_qty_value=100.0, pyramiding=0)

needlong = input(true, "long")
needshort = input(true, "short")

usema1 = input(true, "Use MA1 (SMA, blue)")
usema2 = input(true, "Use MA2 (EMA, red)")
lenma1 = input(40, defval = 40, minval = 2, maxval = 1000, title = "MA1 length")
lenma2 = input(40, defval = 40, minval = 2, maxval = 1000, title = "MA2 length")
//anti = input(true, defval = true, title = "Antipila")
usecf = input(true, defval = true, title = "Use color-filter")

//Strategy
ma1 = sma(close, lenma1)
ma2 = ema(close, lenma2)
signal1 = usema1 == false ? 0 : close > ma1 ? 1 : -1
signal2 = usema2 == false ? 0 : close > ma2 ? 1 : -1
lots = signal1 + signal2

//Lines
plot(ma1, color = blue, linewidth = 3, transp = 0)
plot(ma2, color = red, linewidth = 3, transp = 0)

//Trading
if lots > 0 and (close < open or usecf == false)
    strategy.entry("Long", strategy.long, needlong == false ? 0 : na)

if lots < 0 and (close > open or usecf == false)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : na)
    
if lots == 0
    strategy.close_all()
    
    
    
```

> Detail

https://www.fmz.com/strategy/426340

> Last Modified

2023-09-11 12:31:51
