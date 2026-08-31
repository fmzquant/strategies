
> Name

双随机动能指标筛选策略Stochastic-Momentum-Dual-Indicators-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy uses dual stochastic momentum indicators (SMI and RSI) for long and short signals, along with martingale and body filter for trade signal selection, aiming to capture mid-term trends and price fluctuations. 

## Strategy Logic

The strategy judges long and short using two stochastic indicators SMI and RSI. SMI is calculated based on moving average of bar range and close price, good at identifying reversal points. RSI compares bull and bear power to determine overbought and oversold status. Strategy goes long when SMI is below -50 and RSI is below 20; goes short when SMI is above 50 and RSI is above 80. 

To filter false breakouts, strategy also uses 1/3 of 10-period body SMA as the breakthrough filter condition. When body breaks through 1/3 of SMA, the breakout is considered valid.

In addition, the strategy adopts optional martingale, which is to scale up lots on losing trades, attempting to recover previous losses.  

Backtest functionality backtests the strategy by inputting a date range.

## Advantage Analysis

The strategy combines dual stochastic indicators and filters, able to effectively identify reversal points, capture mid-term trends, and track price fluctuations.

- SMI has strong reversal point recognition ability and can determine overbought and oversold conditions effectively.
- Adding RSI avoids missing trades. 
- Body filter removes false breakouts and improves signal accuracy.
- Optional martingale strategy allows recovering part of the losses.

## Risk Analysis

- As lagging indicators, SMI and RSI have risks of chasing highs and killing lows. 
- Martingale carries the risk of accelerating losses.
- Filters may filter out some valid signals in ranging markets.

Risks can be mitigated by optimizing SMI and RSI parameters to lower chasing/killing probability, using martingale strategically by controlling scale-up ratio and times, and enabling filters discretionarily based on market conditions.

## Optimization Directions 

- Optimize SMI and RSI parameters for best judgement effectiveness.
- Adjust filter parameters to lower the probability of filtering valid signals.  
- Optimize martingale scale-up times and ratio.
- Incorporate trend indicators to avoid trading against the trend.
- Add stop loss to limit losses on single trades.

## Summary

The strategy combines dual stochastic indicators to capture reversal points, with filters and martingale for trade signal selection and chase. It can effectively identify mid-term trends and track price fluctuations, suitable for investors pursuing high win rate. Pay attention to indicator lagging and ranging market risks, manage risks by parameter optimization and stop loss.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long|
|v_input_2|true|Short|
|v_input_3|false|Use Martingale|
|v_input_4|100|Capital, %|
|v_input_5|true|Use SMI Strategy|
|v_input_6|true|Use RSI Strategy|
|v_input_7|true|Use Body-Filter|
|v_input_8|5|SMI Percent K Length|
|v_input_9|3|SMI Percent D Length|
|v_input_10|50|SMI Limit|
|v_input_11|2017|From Year|
|v_input_12|2100|To Year|
|v_input_13|true|From Month|
|v_input_14|12|To Month|
|v_input_15|true|From day|
|v_input_16|31|To day|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-30 00:00:00
end: 2023-10-06 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
// strategy(title = "CS Basic Scripts - Stochastic Special (Strategy)", shorttitle = "Stochastic Special", overlay = false, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, pyramiding = 0)

//Settings 
needlong = input(true, defval = true, title = "Long")
needshort = input(true, defval = true, title = "Short")
usemar = input(false, defval = false, title = "Use Martingale")
capital = input(100, defval = 100, minval = 1, maxval = 10000, title = "Capital, %")
usesmi = input(true, defval = true, title = "Use SMI Strategy")
usersi = input(true, defval = true, title = "Use RSI Strategy")
usebod = input(true, defval = true, title = "Use Body-Filter")
a = input(5, "SMI Percent K Length")
b = input(3, "SMI Percent D Length")
limit = input(50, defval = 50, minval = 1, maxval = 100, title = "SMI Limit")

//Backtesting Input Range
fromyear = input(2017, defval = 2017, minval = 1900, maxval = 2100, title = "From Year")
toyear = input(2100, defval = 2100, minval = 1900, maxval = 2100, title = "To Year")
frommonth = input(01, defval = 01, minval = 01, maxval = 12, title = "From Month")
tomonth = input(12, defval = 12, minval = 01, maxval = 12, title = "To Month")
fromday = input(01, defval = 01, minval = 01, maxval = 31, title = "From day")
today = input(31, defval = 31, minval = 01, maxval = 31, title = "To day")

//Fast RSI
fastup = rma(max(change(close), 0), 7)
fastdown = rma(-min(change(close), 0), 7)
fastrsi = fastdown == 0 ? 100 : fastup == 0 ? 0 : 100 - (100 / (1 + fastup / fastdown))

//Stochastic Momentum Index
ll = lowest (low, a)
hh = highest (high, a)
diff = hh - ll
rdiff = close - (hh+ll)/2
avgrel = ema(ema(rdiff,b),b)
avgdiff = ema(ema(diff,b),b)
SMI = avgdiff != 0 ? (avgrel/(avgdiff/2)*100) : 0
SMIsignal = ema(SMI,b)

//Lines
plot(SMI, color = blue, linewidth = 3, title = "Stochastic Momentum Index")
plot(SMIsignal, color = red, linewidth = 3, title = "SMI Signal Line")
plot(limit, color = black, title = "Over Bought")
plot(-1 * limit, color = black, title = "Over Sold")
plot(0, color = blue, title = "Zero Line")

//Body Filter
nbody = abs(close - open)
abody = sma(nbody, 10)
body = nbody > abody / 3 or usebod == false

//Signals
up1 = SMI < -1 * limit and close < open and body and usesmi
dn1 = SMI > limit and close > open and body and usesmi
up2 = fastrsi < 20 and close < open and body and usersi
dn2 = fastrsi > 80 and close > open and body and usersi
exit = ((strategy.position_size > 0 and close > open) or (strategy.position_size < 0 and close < open)) and body

//Trading
profit = exit ? ((strategy.position_size > 0 and close > strategy.position_avg_price) or (strategy.position_size < 0 and close < strategy.position_avg_price)) ? 1 : -1 : profit[1]
mult = usemar ? exit ? profit == -1 ? mult[1] * 2 : 1 : mult[1] : 1
lot = strategy.position_size == 0 ? strategy.equity / close * capital / 100 * mult : lot[1]

if up1 or up2
    if strategy.position_size < 0
        strategy.close_all()
        
    strategy.entry("long", strategy.long, needlong == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))

if dn1 or dn2
    if strategy.position_size > 0
        strategy.close_all()
        
    strategy.entry("Short", strategy.short, needshort == false ? 0 : lot, when=(time > timestamp(fromyear, frommonth, fromday, 00, 00) and time < timestamp(toyear, tomonth, today, 23, 59)))
    
if time > timestamp(toyear, tomonth, today, 23, 59) or exit
    strategy.close_all()
```

> Detail

https://www.fmz.com/strategy/428630

> Last Modified

2023-10-07 16:45:25
