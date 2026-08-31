
> Name

三内在上涨反转策略Three-Inside-Up-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10fc9d799add7abfc1e.png)



## Overview

The Three Inside Up reversal strategy is a reversal trading strategy that aims to buy low and sell high by identifying specific three-bar candlestick patterns. It consists of three bars where the first two form a bullish harami pattern and the third bar opens above the previous close and closes above the highs of the first two bars. This candlestick combination indicates a potential reversal from a downtrend to an uptrend and signals an opportunity to enter a reversal trade.

## Strategy Logic

The key conditions for this strategy are:

1. Bar 1: Bearish candle, open higher than close 

2. Bar 2: Bullish candle, close higher than open and lower than Bar 1 open

3. Bar 3: Bullish candle, open higher than Bar 2 close and close higher than highs of Bars 1 and 2

When this pattern is detected, we take a short position and set profit take and stop loss levels. The trading logic is as follows:

1. Enter short at the open of Bar 3 when Three Inside Up pattern is identified

2. Set profit target: Close trade and flatten position if price rises by the input number of profit points  

3. Set stop loss: Close trade and flatten if price declines by the input number of loss points

4. Clear position when target or stop is hit, await next signal

This allows us to quickly enter a short when an uptrend reversal signal is identified, and realize gains or limit losses using pre-defined profit and stop levels, implementing a low buy high sell reversal strategy.

## Advantages

- Captures reversal points for reversal trading

- Shorts tops and buys bottoms aligning with trends  

- Clear entry, profit take, and stop loss mechanics

- Simple 3-bar pattern, easy to identify and implement

- Customizable profit take and stop loss points to control risk

- Code is simple, clean, easy to understand and optimize

In summary, this strategy leverages pattern recognition, risk management, simplicity, and reliability making it an effective short-term reversal trading strategy.

## Risks

- Pattern may be misidentified, leading to false signals

- Inadequate profit take or stop loss levels could lead to premature exit or missed profits

- Frequent trading increases overtrading risk 

- Entry, position sizing, and management can be further optimized

- Careful stock selection required, better for volatile stocks

- Impact of commissions and slippage on profits

- Requires ongoing monitoring and tuning for changing markets

Proper parameter optimization, stock selection, monitoring and other measures can help control the risks.

## Enhancement Opportunities

- Optimize pattern parameters to improve accuracy

- Refine profit take and stop loss for better risk-reward

- Add filters using other indicators to improve signal reliability 

- Incorporate dynamic position sizing aligned to market conditions

- Optimize capital allocation for better profit balancing

- Test different holding periods to determine optimal duration

- Streamline code with comments for clarity

- Backtest versus live performance to validate efficacy

- Adjust stock universe and test sector and name fit

- Continuously track performance and tune as required

## Conclusion

The Three Inside Up Reversal strategy aims to profit from shorting tops when an uptrend reversal signal is identified based on a specific three-candlestick pattern. With clear logic, risk controls, ease of use, and optimization potential, it is a reliable and practical short-term reversal trading strategy. But uncertainties exist requiring ongoing optimizations, risk management, and monitoring to generate consistent excess returns in live trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Take Profit pip|
|v_input_2|20|Stop Loss pip|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-29 00:00:00
end: 2023-10-29 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 12/02/2019
//    This is a three candlestick bullish reversal pattern consisting of a 
//    bullish harami pattern formed by the first 2 candlesticks then followed 
//    by up candlestick with a higher close than the prior candlestick.
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title = "Three Inside Up Backtest", overlay = true)
input_takeprofit = input(20, title="Take Profit pip", step=0.01)
input_stoploss = input(20, title="Stop Loss pip", step=0.01)
barcolor(open[2] > close[2] ? close[1] > open[1] ? close[1] <= open[2] ? close[2] <= open[1] ? close[1] - open[1] < open[2] - close[2] ? close > open ? close > close[1] ? open > open[1] ? close > open[2] ? yellow :na :na : na : na : na:na : na : na : na)
posprice = 0.0
pos = 0.0
barcolor(nz(pos[1], 0) == -1 ? red: nz(pos[1], 0) == 1 ? green : blue ) 
posprice := open[2] > close[2] ? close[1] > open[1] ? close[1] <= open[2] ? close[2] <= open[1] ? close[1] - open[1] < open[2] - close[2] ? close > open ? close > close[1] ? open > open[1] ? close > open[2]  ? close :nz(posprice[1], 0) :nz(posprice[1], 0) : nz(posprice[1], 0) : nz(posprice[1], 0) :nz(posprice[1], 0):nz(posprice[1], 0):nz(posprice[1], 0):nz(posprice[1], 0):nz(posprice[1], 0) 
pos := iff(posprice > 0, -1, 0)
if (pos == 0) 
    strategy.close_all()
if (pos == -1)
    strategy.entry("Short", strategy.short)
posprice := iff(low <= posprice - input_takeprofit and posprice > 0, 0 ,  nz(posprice, 0))
posprice := iff(high >= posprice + input_stoploss and posprice > 0, 0 ,  nz(posprice, 0))
```

> Detail

https://www.fmz.com/strategy/430583

> Last Modified

2023-10-30 15:36:07
