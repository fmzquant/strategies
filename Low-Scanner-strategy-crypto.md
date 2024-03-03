
> Name

Low-Scanner-strategy-crypto

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0|Strategy Direction: long|short|all|
|v_input_2|10|min|
|v_input_3|60|tf3|
|v_input_4|true|min1|
|v_input_5|0|Timeframe: 60|5|15|30|1|120|240|360|720|D|W|
|v_input_6|24|Period|
|v_input_7|true|Shift|
|v_input_8|25|len|
|v_input_9|100|Lot Risk Percent|
|v_input_10|true|leverage|
|v_input_11|10| stop loss|
|v_input_12|25| qty_percent1|
|v_input_13|25| qty_percent2|
|v_input_14|25| qty_percent3|
|v_input_15|true| Take profit1|
|v_input_16|2| Take profit2|
|v_input_17|3| Take profit3|
|v_input_18|5| Take profit4|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
// © theCrypster 2020

//@version=4
strategy(title = "Low Scanner strategy crypto", overlay = false, pyramiding=1,initial_capital = 1000, default_qty_type= strategy.percent_of_equity, default_qty_value = 100, calc_on_order_fills=false, slippage=0,commission_type=strategy.commission.percent,commission_value=0.075)
strat_dir_input = input(title="Strategy Direction", defval="long", options=["long", "short", "all"])
strat_dir_value = strat_dir_input == "long" ? strategy.direction.long : strat_dir_input == "short" ? strategy.direction.short : strategy.direction.all
strategy.risk.allow_entry_in(strat_dir_value)
leng=1
p1=close[1]
min=input(10)
len55 = timeframe.isintraday and timeframe.multiplier >= 1 ? 
   min / timeframe.multiplier * 7 : 
   timeframe.isintraday and timeframe.multiplier < 60 ? 
   60 / timeframe.multiplier * 24 * 7 : 7
//taken from https://www.tradingview.com/script/Ql1FjjfX-security-free-MTF-example-JD/
tf3 = input("60", type=input.resolution)
ti = change( time(tf3) ) != 0
T_c = fixnan( ti ? close : na )

vrsi = rsi(cum(change(T_c) * volume), leng)
pp=wma(vrsi,len55)

d=(vrsi[1]-pp[1])
min1 =input(1)
len100 = timeframe.isintraday and timeframe.multiplier >= 1 ? 
   min1 / timeframe.multiplier * 7 : 
   timeframe.isintraday and timeframe.multiplier < 60 ? 
   60 / timeframe.multiplier * 24 * 7 : 7
x=ema(d,len100)
//
zx=x/-1
col=zx > 0? color.lime : color.orange
plot(zx,color=col,linewidth=1)
//

tf10 = input("60", title = "Timeframe", type = input.resolution, options = ["1", "5", "15", "30", "60","120", "240","360","720", "D", "W"])

length = input(24, title = "Period", type = input.integer)
shift = input(1, title = "Shift", type = input.integer)

hma(_src, _length)=>
    wma((2 * wma(_src, _length / 2)) - wma(_src, _length), round(sqrt(_length)))
    
hma3(_src, _length)=>
    p = length/2
    wma(wma(close,p/3)*3 - wma(close,p/2) - wma(close,p),p)


a = security(syminfo.tickerid, tf10, hma(close, length))
b =security(syminfo.tickerid, tf10, hma3(close[1], length)[shift])
//plot(a,color=color.gray)
//plot(b,color=color.yellow)
close_price = close[0]
len = input(25)

linear_reg = linreg(close_price, len, 0)


ge(value, precision) => round(value * (pow(10, precision))) / pow(10, precision)
risk     = input(100, title = "Lot Risk Percent", type = input.float, step = 0.1, minval = 0.1, maxval = 100)
leverage = input(1, defval = 1, minval = 1, maxval = 100, title = "leverage")
c = ge((strategy.equity * leverage / open) * (risk / 100), 4)

buy=crossover(linear_reg, b) 
sell=crossunder(linear_reg, b) 
//
l = crossover(zx,0) or buy
        
if l 
    strategy.entry("buy", strategy.long,c)

per(pcnt) =>
    strategy.position_size != 0 ? round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
stoploss=input(title=" stop loss", defval=10, minval=0.01)
los = per(stoploss)
q1=input(title=" qty_percent1", defval=25, minval=1)
q2=input(title=" qty_percent2", defval=25, minval=1)
q3=input(title=" qty_percent3", defval=25, minval=1)
tp1=input(title=" Take profit1", defval=1, minval=0.01)
tp2=input(title=" Take profit2", defval=2, minval=0.01)
tp3=input(title=" Take profit3", defval=3, minval=0.01)
tp4=input(title=" Take profit4", defval=5, minval=0.01)
strategy.exit("x1", qty_percent = q1, profit = per(tp1), loss = los)
strategy.exit("x2", qty_percent = q2, profit = per(tp2), loss = los)
strategy.exit("x3", qty_percent = q3, profit = per(tp3), loss = los)
strategy.exit("x4", profit = per(tp4), loss = los)

```

> Detail

https://www.fmz.com/strategy/366538

> Last Modified

2022-05-29 20:48:52
