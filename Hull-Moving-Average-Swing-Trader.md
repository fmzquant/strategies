
> Name

Hull-Moving-Average-Swing-Trader

> Author

ChaoZhang

> Strategy Description

Hull Moving Average Strategy
2 X HMA's,
1st HMA on current price (recommended source OPEN)
2nd HMA on previous candle. signal on crossover.
Buy and Sell signals on chart, red & green view pane (Green Buy, Red Sell)

**backtest**


 ![IMG](https://www.fmz.com/upload/asset/1a38528566ff6c42af6.png) 

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|210|HullMA Period|
|v_input_2_open|0|Price data: open|high|low|close|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|true|From Month|
|v_input_4|true|From Day|
|v_input_5|2020|From Year|
|v_input_6|true|To Month|
|v_input_7|true|To Day|
|v_input_8|9999|To Year|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-04-25 00:00:00
end: 2022-05-24 23:59:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//                               Hull Moving Average Swing Trader by SEASIDE420
strategy("Hull Moving Average Swing Trader", shorttitle="HMA_Swing_Trader", default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_order_fills=true, calc_on_every_tick=true, pyramiding=0)
hullperiod = input(title="HullMA Period", type=input.integer, defval=210, minval=1)
price = input(open, type=input.source, title="Price data")
FromMonth = input(defval=1, title="From Month", minval=1, maxval=12)
FromDay = input(defval=1, title="From Day", minval=1, maxval=31)
FromYear = input(defval=2020, title="From Year", minval=2017)
ToMonth = input(defval=1, title="To Month", minval=1, maxval=12)
ToDay = input(defval=1, title="To Day", minval=1, maxval=31)
ToYear = input(defval=9999, title="To Year", minval=2017)
start = timestamp(FromYear, FromMonth, FromDay, 00, 00)
finish = timestamp(ToYear, ToMonth, ToDay, 23, 59)
window() =>true
n2ma = 2 * wma(price, round(hullperiod / 2))
nma = wma(price, hullperiod)
diff = n2ma - nma
sqn = round(sqrt(hullperiod))
n2ma1 = 2 * wma(price[1], round(hullperiod / 2))
nma1 = wma(price[1], hullperiod)
diff1 = n2ma1 - nma1
n1 = wma(diff, sqn)
n2 = wma(diff1, sqn)
Hull_Line = n1 / n1 * n2
Hull_retracted = if n1 > n2
    Hull_retracted = Hull_Line - 2
else
    Hull_retracted = Hull_Line + 2
c1 = Hull_retracted + n1 - price
c2 = Hull_retracted - n2 + price
c4 = n1 > n2 ? color.green : color.red
c2p = plot(c2, color=color.black, linewidth=1)
c3p = plot(price, color=color.black, linewidth=1)
fill(c3p, c2p, color=c4, transp=75)
//plot(cross(c1, c2) ? c1 : na, style=plot.style_circles, color=c4, linewidth=4)
if price < c2
    strategy.close("BUY", when=window())
if price > c2
    strategy.close("SELL", when=window())
if price > c2 and price[1] > c1
    strategy.entry("BUY", strategy.long, when=window())
if price < c1 and price[1] < c2
    strategy.entry("SELL", strategy.short, when=window())  //        /L'-, 
//                               ,'-.      `   ````                 /  L '-, 
//     .                    _,--dMMMM\        `   ` ` '`..         /       '-, 
//     :             _,--,  )MMMMMMMMM),.      `     ,<>          /_      '-,' 
//     ;     ___,--. \MM(    `-'   )M//MM\          ,',.;      .-'* ;     .' 
//     |     \MMMMMM) \MM\       ,dM//MMM/     ___ < ,; `.      )`--'    / 
//     |      \MM()M   MMM)__   /MM(/MP'  ___, \  \ `  `. `.   /__,    ,' 
//     |       MMMM/   MMMMMM( /MMMMP'__, \     | /      `. `-,_\     / 
//     |       MM     /MMM---' `--'_ \     |-'  |/         `./ .\----.___ 
//     |      /MM'   `--' __,-  \""   |-'  |_,               `.__) . .F. )-. 
//     |     `--'       \   \    |-'  |_,     _,-/            J . . . J-'-. `-., 
//     |         __  \`. |   |   |         \    / _           |. . . . \   `-.  F 
//     |   ___  /  \  | `|   '      __  \   |  /-'            F . . . . \     '` 
//     |   \  \ \  /  |        __  /  \  |  |,-'        __,- J . . . . . \ 
//     |    | /  |/     __,-  \  ) \  /  |_,-     __,--'     |. .__.----,' 
//     |    |/    ___     \    |'.  |/      __,--'           `.-;;;;;;;;;\ 
//     |     ___  \  \     |   |  `   __,--'                  /;;;;;;;;;;;;. 
//     |     \  \  |-'\    '    __,--'                       /;;;;;;;;;;;;;;\ 
// \   |      | /  |      __,--'                             `--;;/     \;-'\ 
//  \  |      |/    __,--'                                   /  /         \  \ 
//   \ |      __,--'                                        /  /           \  \ 
//    \|__,--'                                          _,-;M-K,           ,;-;\ 
//                                                     <;;;;;;;;           '-;;;; 
//                                                                                  :D

```

> Detail

https://www.fmz.com/strategy/365884

> Last Modified

2022-05-26 15:54:32
