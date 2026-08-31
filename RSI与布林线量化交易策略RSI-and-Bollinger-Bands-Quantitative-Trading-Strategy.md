
> Name

RSI与布林线量化交易策略RSI-and-Bollinger-Bands-Quantitative-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1866d15489b3d4952f1.png)

## Overview

This strategy combines Relative Strength Index (RSI) and Bollinger Bands to identify trading opportunities, belonging to mean reversion strategies in quantitative trading. It buys when RSI is below a threshold and closes position when price breaks above the middle band of Bollinger Bands. There is no shorting opportunity.

## Strategy Logic   

1. Use RSI indicator to judge if the market is oversold. RSI below 30 is considered an oversold signal.  

2. Use Bollinger Bands to determine if price starts rebounding upward. When price bounces from the lower band and breaks above the middle band, the long direction ends.

3. Combine the RSI oversold signal and Bollinger Bands breakout signal to set buy entry points. Buy when both signals trigger and close position when price breaks above the middle band to take profit.

## Advantage Analysis   

1. The strategy combines mean reversion indicator RSI and channel indicator Bollinger Bands to locate entry points more precisely. 

2. The RSI indicator can filter out many false breakouts and reduce unnecessary trades.

3. The Bollinger Bands acts as a stop loss to control the risk of each trade.  

## Risk Analysis

1. RSI indicator may give wrong signals, leading to missing buy opportunities.  

2. Improper parameter settings of Bollinger Bands can result in stop loss being too loose or strict.

3. Choosing improper trading instruments, such as trading small cap stocks with higher liquidity risk.

## Optimization Direction  

1. Test different parameter combinations like RSI period, Bollinger period and multiplier to find optimum parameters.

2. Incorporate other indicators like KD, MACD to set more strict buy conditions to filter signals. 

3. Set stop loss based on volatility for different trading instruments, such as using volatility stop loss.

## Conclusion  

This strategy utilizes the logic of buying at RSI lows and selling at Bollinger highs, belonging to mean reversion strategies. Compared to using single indicators like RSI or Bollinger Bands, this strategy can locate entry and exit points more precisely, thus achieving better results. Next steps could be improving through parameter optimization, signal filtering, stop loss strategies etc.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Lot, %|
|v_input_2|true|Use RSI|
|v_input_3|true|Use BB|
|v_input_4|true|Show BB Overlay|
|v_input_5|20|BB period|
|v_input_6_ohlc4|0|BB source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|
|v_input_7|2|BB Mult|
|v_input_8|7|RSI period|
|v_input_9_close|0|RSI source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_10|30|RSI Limit|
|v_input_11|1900|From Year|
|v_input_12|2100|To Year|
|v_input_13|true|From Month|
|v_input_14|12|To Month|
|v_input_15|true|From Day|
|v_input_16|31|To Day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-08 00:00:00
end: 2024-01-07 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//Noro
//2018

//@version=3
strategy(title = "Noro's BB + RSI Strategy v1.0", shorttitle = "BB+RSI str 1.0", overlay = true, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 5)

//Settings
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Lot, %")
rsiuse = input(true, defval = true, title = "Use RSI")
bbuse = input(true, defval = true, title = "Use BB")
showbb = input(true, defval = true, title = "Show BB Overlay")
bbperiod = input(20, defval = 20, minval = 2, maxval = 1000, title = "BB period")
bbsource = input(ohlc4, title = "BB source")
bbmult = input(2, defval = 2, minval = 1, maxval = 100, title = "BB Mult")
rsiperiod = input(7, defval = 7, minval = 2, maxval = 1000, title = "RSI period")
rsisource = input(close, title = "RSI source")
rsilimit = input(30, defval = 30, minval = 1, maxval = 49, title = "RSI Limit")
fromyear = input(1900, defval = 1900, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From Day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To Day")

//RSI
rsi = rsi(rsisource, rsiperiod)

//BB
basis = sma(bbsource, bbperiod)
dev = bbmult * stdev(bbsource, bbperiod)
upper = basis + dev
lower = basis - dev

//Overlay
col = showbb ? blue : na
plot(upper, color = col)
plot(basis, color = col)
plot(lower, color = col)

//Signals
up = (rsi < rsilimit or rsiuse == false) and (low < lower or bbuse == false)
cl = close > open

//Trading
lot = 0.0 
lot := strategy.position_size == 0 ? strategy.equity / close * capital / 100 : lot[1]
if up
    strategy.entry("Long", strategy.long, lot)
if cl
    strategy.entry("Close", strategy.short, 0)
if time > timestamp(toyear, tomonth, today, 23, 59)
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/438007

> Last Modified

2024-01-08 10:16:22
