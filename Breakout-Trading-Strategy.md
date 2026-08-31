
> Name

Breakout-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/dd811ea776f0688134.png)

## Overview

This strategy is based on the breakout theory, comparing the moving averages of highest and lowest prices to determine if the trend is reversing, in order to find potential breakout points and trade when breakout happens. The strategy is simple and straightforward, suitable for tracking symbols with drastic price changes.

## Strategy Logic  

This strategy first calculates the moving averages of highest and lowest prices within a user-defined period. The highest price moving average represents the upper band, and the lowest price moving average represents the lower band. When price breaks through the upper band, it signals an uptrend, and the strategy will open long position. When price breaks through the lower band, it signals a downtrend, and the strategy will open short position. Users can configure to only long or only short.

The strategy also provides optional stop loss and take profit settings. When long, the stop loss is set at upper band; when short, stop loss is set at lower band. This reduces losses. Users can also choose to set stop loss at the breakout point, i.e. when long, stop loss is lower band, and when short, stop loss is upper band. This allows more profit potential.

## Advantages

The advantages of this strategy are:

1. The logic is simple and straightforward, easy to understand and implement.

2. It can quickly capture trend reversal points and adjust positions accordingly. 

3. It provides optional stop loss and take profit settings to fit personal risk preference.

4. The trading signals are clear, without too many false signals.

5. There are few configurable parameters, easy to use.

6. Flexibility to configure long only or short only.

## Risks

The risks of this strategy include:

1. Breakout signal may be false breakout and cannot sustain.  

2. Improper breakout period setting may miss longer term trends.

3. It does not consider volume on breakout, may cause chasing highs and killing lows.

4. There is certain lag, may miss good portion of the move.

5. In volatile market, stop loss may get hit.

6. Relies solely on breakout for trading, profit is uncertain.

## Enhancements

The strategy can be enhanced in the following aspects:

1. Incorporate volume indicator to avoid false breakouts. For example, enlarged volume on breakout signals validity.

2. Optimize moving average period parameter to match trend changes in different cycle. Also try different moving average types. 

3. Set a pullback threshold after breakout for further confirmation to avoid false breakout.

4. Add Bollinger Bands etc. on top of breakout basis for more directional guidance.

5. Incorporate other INDICATORs like RSI, MACD for additional trading signals and improve accuracy.

6. Optimize stop loss and take profit strategies to better cope with market fluctuation while controlling risk.

## Summary 

The breakout trading strategy has a clear logic of tracking price breakout of upper and lower bands for entry and exit. There is large room for enhancement, by incorporating more indicator information and optimizing parameters to strengthen the strategy. After getting familiar with the basic logic, traders can customize parameters based on their needs and obtain good trading results.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|100|Capital, %|
|v_input_4|4|Length|
|v_input_5|false|Body mode|
|v_input_6|false|Revers|
|v_input_7|true|Show Lines?|
|v_input_8|1900|From Year|
|v_input_9|2100|To Year|
|v_input_10|true|From Month|
|v_input_11|12|To Month|
|v_input_12|true|From day|
|v_input_13|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-02 00:00:00
end: 2023-11-01 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Noro's Brakeout Strategy v2.0", shorttitle = "Brakeout str 2.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
len = input(4, defval = 4, minval = 1, maxval = 1000, title = "Length")
bod = input(false, defval = false, title = "Body mode")
rev = input(false, defval = false, title = "Revers")
showlines = input(true, defval = true, title = "Show Lines?")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Extremums
min = bod ? min(open, close) : low
max = bod ? max(open, close) : high
upex = highest(max, len) + syminfo.mintick * 10
dnex = lowest(min, len) - syminfo.mintick * 10
col = showlines ? blue : na
plot(upex, color = col, linewidth = 2)
plot(dnex, color = col, linewidth = 2)

//Trading
lot = 0.0
lot := strategy.position_size != strategy.position_size[1] ? strategy.equity / close * capital / 100 : lot[1]

if (not na(close[len])) and rev == false
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, stop = upex)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, stop = dnex)
    
if (not na(close[len])) and rev == true
    strategy.entry("Long", strategy.long, needlong == false ? 0 : lot, limit = dnex)
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, limit = upex)

if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/430883

> Last Modified

2023-11-02 16:40:26
