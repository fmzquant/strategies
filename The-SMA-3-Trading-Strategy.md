
> Name

The-SMA-3-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

The SMA-3 trading strategy is a technical analysis approach that uses 3 simple moving averages to identify trading opportunities. It was created by trader Noro and aims to capitalize on short-term price trends.

How It Works

The strategy utilizes 3 SMA lines - a middle line, an upper line, and a lower line. The middle SMA tracks the closing price. The upper and lower SMAs are offset by a fixed percentage above and below the middle SMA.

When price breaks above the upper SMA, a long position is entered. When price falls below the lower SMA, a short position is taken. Profit targets are set at the opposite SMA line.

The SMA parameters, capital allocation, date filters, and other settings are customizable. The strategy aims to ride short-term trends until a SMA breakout occurs in the opposite direction.

Advantages and Risks

A key advantage of SMA-3 is its simplicity. It aims to capitalize on high probability breakouts confirmed by moving average crossovers. The fixed percentage stops help lock in profits if the trend continues.

However, like all technical strategies, it is prone to whipsaws and false breakouts. Slippage on entries and exits can erode profitability. Optimizing the SMA lengths and offset percentages is crucial for results.

The strategy may underperform in sideways or volatile markets. Strict risk management is advised when position sizing. Applying prudent money management is key.

Overall, SMA-3 offers a straightforward approach to trading short-term price swings. It can be robust if implemented properly, but requires fine-tuning and discipline. Trailing stops and prudent adjustments can aid strategy longevity.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|false|Short|
|v_input_3|100|Capital, %|
|v_input_4|20|bars|
|v_input_5|15|percent|
|v_input_6|true|Show Lines?|
|v_input_7|1900|From Year|
|v_input_8|2100|To Year|
|v_input_9|true|From Month|
|v_input_10|12|To Month|
|v_input_11|true|From day|
|v_input_12|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-04 00:00:00
end: 2023-09-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=2
strategy(title = "Noro's SMA-3 Strategy v1.0", shorttitle = "SMA-3 str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 5)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(false, defval = false, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
p = input(20, "bars")
d = input(15, "percent")
showlines = input(true, defval = true, title = "Show Lines?")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//SMAs
sma = sma(close, p)
upex = sma * ((100 + d) / 100)
dnex = sma * ((100 - d) / 100)
exit = high > sma and low < sma

//Lines
col = showlines ? blue : na
plot(upex, linewidth = 3, color = col, transp = 0)
plot(sma, linewidth = 3, color = col, transp = 0)
plot(dnex, linewidth = 3, color = col, transp = 0)

//Trading
lot = strategy.position_size != strategy.position_size[1] ? strategy.equity / close * capital / 100 : lot[1]

if true
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, limit = dnex, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, limit = upex, when = (time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/426320

> Last Modified

2023-09-11 08:33:43
