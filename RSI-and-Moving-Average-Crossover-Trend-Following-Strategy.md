
> Name

RSI-and-Moving-Average-Crossover-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1126c66b27ccfe50f7e.png)


## Overview  

This strategy utilizes the RSI indicator and fast/slow moving averages to determine entry and exit points. It goes long when RSI rises 5 points and is below 70; and when the 9-day MA crosses above the 50-day MA. It exits when the 50-day MA crosses below the 9-day MA.

## Strategy Logic

The strategy mainly employs a combination of the RSI indicator and moving averages. The RSI indicator shows whether a stock or cryptocurrency is overbought or oversold. Values below 30 are considered oversold while values above 70 are considered overbought. This strategy uses RSI to determine appropriate entry points outside of these extreme areas.  

Moving averages are widely used to identify trend direction. The fast moving average reacts more quickly to price changes while the slow MA filters out false breakouts. When the fast MA crosses above the slow MA, an uptrend begins. The opposite signals a downtrend. This strategy uses the 9 and 50-day MAs and their crosses to determine the trend and entries/exits.

## Advantage Analysis 

The biggest advantage of this strategy is using RSI to avoid buying at extreme overbought levels and using the fast/slow MAs combo to filter out false breakouts and lock in the trend direction for higher profitability.  

The additional condition of 5 consecutive RSI point increase prevents unnecessary buys in overbought zones. Also, the partial position sizing greatly reduces loss risks per trade.

## Risks and Prevention  

The biggest risk is lagging signals from RSI and MAs during violent price swings, causing buys at tops or sells at bottoms.  

To prevent this, a faster MA is used to catch price changes more rapidly and reduce lag. Also, partial sizing reduces loss per trade.

## Optimization Directions

Possible optimization paths:

1. Test RSI periods for optimal parameters  

2. Test more fast/slow MA combinations for better filtering  

3. Optimize position sizing with different parameters

4. Add stop loss conditions to lock profits

## Conclusion  

Overall this strategy is well-suited for trend trading. It avoids overbought/oversold areas with RSI and uses fast/slow MAs for trend and support/resistance detection. Partial sizing allows for high win rates and profitability. Further parameter optimization and risk management can enhance performance.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Show Date Range|
|v_input_2|14|length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-12 00:00:00
end: 2023-12-12 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Coinrule

//@version=5
strategy("RSI with Slow and Fast MA Crossing Strategy (by Coinrule)",
         overlay=true,
         initial_capital=10000,
         process_orders_on_close=true,
         default_qty_type=strategy.percent_of_equity,
         default_qty_value=30,
         commission_type=strategy.commission.percent,
         commission_value=0.1)

showDate = input(defval=true, title='Show Date Range')
timePeriod = time >= timestamp(syminfo.timezone, 2020, 1, 1, 0, 0)
notInTrade = strategy.position_size <= 0


// RSI
length = input(14)
vrsi = ta.rsi(close, length)

// Moving  Averages for Buy Condition
buyFastEMA = ta.ema(close, 9)
buySlowEMA = ta.ema(close, 50)
buyCondition1 = ta.crossover(buyFastEMA, buySlowEMA)


increase = 5
if ((vrsi > vrsi[1]+increase) and buyCondition1 and vrsi < 70 and timePeriod)
    strategy.entry("Long", strategy.long)


// Moving  Averages for Sell Condition
sellFastEMA = ta.ema(close, 9)
sellSlowEMA = ta.ema(close, 50)
plot(request.security(syminfo.tickerid, "60", sellFastEMA), color = color.blue)
plot(request.security(syminfo.tickerid, "60", sellSlowEMA), color = color.green)


condition = ta.crossover(sellSlowEMA, sellFastEMA)
//sellCondition1 = request.security(syminfo.tickerid, "60", condition)

strategy.close('Long', when = condition and timePeriod)





```

> Detail

https://www.fmz.com/strategy/435287

> Last Modified

2023-12-13 17:50:34
