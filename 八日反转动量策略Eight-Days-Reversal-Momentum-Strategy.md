
> Name

八日反转动量策略Eight-Days-Reversal-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/dc004000dc448841b4.png)


## Overview

This strategy mainly utilizes the reversal feature of prices after continuously closing above or below the 5-day simple moving average for 8 days to capture the momentum effect in medium and short term. It goes long when the closing price crosses above the 5-day line again after continuously closing below the 5-day line for 8 days; it goes short when the closing price crosses below the 5-day line again after continuously closing above the 5-day line for 8 days.

## Strategy Logic  

1. Calculate the 5-day simple moving average SMA.
2. Define the uptrend TrendUp as close greater than or equal to SMA, downtrend TrendDown as close less than or equal to SMA.
3. Confirm the condition for trend reversal: trigger buy signal when closing price closes below SMA for consecutive 8 days and turns to uptrend (crosses above SMA) the next day; trigger sell signal when closing price closes above SMA for consecutive 8 days and turns to downtrend (crosses below SMA) the next day.  
4. Entry: long when the buy condition Buy is triggered yesterday and the current trend is downtrend; short when the sell condition Sell is triggered yesterday and the current trend is uptrend.
5. Exit: close long position when closing price crosses below SMA; close short position when closing price crosses above SMA.

## Advantage Analysis  

1. Captures momentum by utilizing price reversal features, suitable for medium and short term trading.
2. High trading opportunities as continuous SMA breakout for 8 days happens frequently.  
3. 5-day SMA parameter performs well, avoids too many false breakouts. 
4. Controllable risk with clear stop loss point.

## Risk Analysis

1. Stop loss may be triggered frequently during market consolidation.  
2. May miss the best entry point if the breakout days are set too long.
3. Hard to profit if there is a prolonged trend.

Can optimize SMA parameters, improve entry criteria to prevent false breakout, combine with trend indicators to strengthen the strategy.  

## Optimization Directions

1. Parameter optimization: test different periods of SMA to find better parameters.  
2. Entry optimization: add volume indicators to avoid false breakouts; or judge bull/bear candles to avoid whipsaws.
3. Exit optimization: test fixed percentage trailing stop loss to give more room.   
4. Risk control: set maximum daily stop loss times to limit losses.
5. Combine indicators: add RSI, MACD to determine trend to identify market conditions.

## Conclusion  

The strategy captures the price movement from breakout to pullback by judging the momentum, implements the trading logic of avoiding whipsaws and trend following. The keys are strict parameter settings and robust entry criteria to prevent noise; reasonable stop loss to limit losses. Combining with trend indicators can achieve better results. The strategy logic is simple and clean. It is worthwhile to explore further optimization.




> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-04 00:00:00
end: 2023-12-04 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Marcuscor

//@version=5

// Inpsired by Linda Bradford Raschke: a strategy for trading momentum in futures markets

strategy("8D Run", initial_capital = 50000, commission_value = 0.0004) 


SMA = ta.sma(close,5)

TrendUp = close >= SMA

TrendDown = close <= SMA


//logic to long

TriggerBuy = ta.barssince(close < SMA) >= 8

Buy = TriggerBuy[1] and TrendDown 

strategy.entry("EL", strategy.long, when = Buy)
strategy.close(id = "EL", when = close > SMA)

// 1) color background when "run" begins and 2) change color when buy signal occurs
bgcolor(TriggerBuy? color.green : na, transp = 90)
bgcolor(Buy ? color.green : na, transp = 70)


// logic to short 

TriggerSell = ta.barssince(close > SMA) >= 8

Sell = TriggerSell[1] and TrendUp

strategy.entry("ES", strategy.short, when = Sell)
strategy.close(id = "ES", when = close < SMA)

// 1) color background when "run" begins and 2) change color when sell signal occurs
bgcolor(TriggerSell ? color.red : na, transp = 90)
bgcolor(Sell ? color.red : na, transp = 70) 






```

> Detail

https://www.fmz.com/strategy/434294

> Last Modified

2023-12-05 10:56:37
