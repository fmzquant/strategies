
> Name

Dynamic-Stop-Loss-Trail-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10c68d409792da82e7c.png)


## Overview

The dynamic stop loss trail strategy calculates the average true range (ATR) of stocks as a benchmark, combined with ATR coefficients set by users to dynamically set stop loss lines and trail lines to achieve the purpose of stop loss trail. When the stock price breaks through the trail line, a long position is established using a traditional trend tracking strategy; when the stock price falls below the stop loss line, a short position is established using a reversal strategy to make profits through two-way trading. 

## Strategy Principle

The strategy mainly uses the ATR technical indicator to calculate the average true range of stock prices, and combines ATR coefficients entered by users as benchmarks for stock breakout purchases and stop loss sells. Specifically, the strategy first calculates the ATR value of the stock over the past 120 days, then multiplies by the sell ATR coefficient set by the user to obtain the stop loss sell reference price, i.e. the stop loss line; multiplies by the buy ATR coefficient to obtain the buy reference price, i.e. the trail line. When today's highest price breaks through the trail line, a long position is established using a trend tracking strategy; when today's lowest price falls below the stop loss line and holds a long position, a short position is established using a reversal strategy.

The strategy also draws stop loss lines and trail lines. The positions of these two lines will change according to fluctuations in stock prices, with some dynamic tracking capabilities. The ATR indicator can better reflect the average true fluctuation range of a stock. Using the ATR indicator to set stop loss trail lines can help avoid losses caused by huge stock fluctuations to some extent.  

## Advantage Analysis

- Use ATR indicators to calculate stock price fluctuation range, stop loss trail line position is reasonable;
- Stop loss lines and trail lines change dynamically, with some trend tracking capability;
- Go long and short at the same time, two-way trading, more profit space;
- Suitable for highly volatile stocks, ATR indicators help control risks.

## Risk Analysis  

- ATR indicators react inadequately to emergencies, cannot completely avoid risks;
- Trailing buy-ins and stop loss sells are solely based on breaking ATR lines, there is some blind obedience, over-trading may occur;  
- The rationality of user-entered ATR coefficients directly affects strategy efficacy, improper settings may cause losses;
- When stock fluctuation decreases, frequent stop loss trail may increase trading costs.  

## Optimization

- Combine other indicators to determine trading time, avoid blind tracking;
- Set position sizing rules and pyramiding rules to control risks;
- Add trading volume or volatility filters to avoid excessive trading;
- Dynamically adjust ATR parameters to optimize stop loss trail effect.

## Summary  

In summary, this is a typical stop loss trail strategy. The core idea is to set stop loss lines and trail lines based on ATR indicators for trend tracking. The advantages of this strategy are that two-way trading is enabled and positions are flexible; ATR indicators help control risks making it suitable for highly volatile stocks. However, there are some blind tracking risks due to rather simple trading rules; improper parameter settings also affect strategy efficacy. Future optimizations may focus on improving trade timing, controlling position sizes, reducing excess trading, etc. to make strategy performance more robust.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|120|Days Back|
|v_input_2|1.5|Selling Coefficent For ATR|
|v_input_3|1.2|Buying Coefficent For ATR|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-14 00:00:00
end: 2023-11-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © phobo3s

//@version=4
strategy("ATR Stop Buy Strategy",shorttitle="ATR-ST",initial_capital=1000, overlay = true, default_qty_type = strategy.percent_of_equity, pyramiding = 5, default_qty_value = 20, commission_type = strategy.commission.cash_per_order, commission_value = 1, calc_on_every_tick = true)

daysBack = input(defval=120, title="Days Back", type=input.integer)
sellCoeff = input(defval=1.5, title="Selling Coefficent For ATR", type=input.float, minval= 0.01, step=0.1)
buyCoeff = input(defval=1.2, title = "Buying Coefficent For ATR", type=input.float, minval= 0.01, step=0.1)

fromDate = timenow - (daysBack*24*60*60*1000)
toDate = timenow 

ATR = atr(14)
stopLossPoint = ATR * sellCoeff
buyPoint = ATR * buyCoeff

StoplossLine =  close[1] - stopLossPoint[1]
BuyLine = close[1] + buyPoint[1]

if (high > BuyLine and time >= fromDate and time <= toDate )
    strategy.entry("GG", strategy.long, comment="Gir")
if (low < StoplossLine and strategy.position_avg_price < close and time >= fromDate and time <= toDate )
    strategy.entry("GG", strategy.short, comment="Çık")

//longFlags = close < StoplossLine
//shortFlags = close > BuyLine
//plotshape(shortFlags, style=shape.triangledown, location=location.abovebar, color=color.red)
//plotshape(longFlags, style=shape.triangleup, location=location.belowbar, color=color.blue)
plot(StoplossLine)
plot(BuyLine)
```

> Detail

https://www.fmz.com/strategy/432794

> Last Modified

2023-11-21 15:22:44
