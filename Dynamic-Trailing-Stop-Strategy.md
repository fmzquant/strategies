
> Name

Dynamic-Trailing-Stop-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1afc532d51fa268bbc2.png)

## Overview

This strategy aims to utilize Bitmex's trailing stop function to dynamically adjust the stop loss price for more accurate and flexible stops. The strategy is not used for entries or exits, but rather gives reasonable stop loss ranges under different market conditions. It is suggested to backtest with different values. The strategy can also be integrated into existing strategies that give entries/exits to act as a stop loss.

## Strategy Logic  

The strategy mainly uses 3 indicators: highest price, lowest price and close price. The strategy first defines the stop loss ranges for long and short positions, namely the `longoffset` for long trailing stop distance and `shortoffset` for short trailing stop distance. The default long distance is 228.5 points and the short distance is 243.5 points.  

Then the strategy uses the following logic to adjust the trailing stop price `trailstop`:  

- If the lowest price of the latest candle is lower than the trailing stop price of the previous candle, and the lowest price of the candle before that is higher than the trailing stop price of the previous 2 candles, then the current candle's trailing stop price = close price + short trailing stop distance

- If the highest price of the latest candle is higher than the trailing stop price of the previous candle, and the highest price of the candle before that is lower than the trailing stop price of the previous 2 candles, then the current candle's trailing stop price = close price - long trailing stop distance  

- If the highest price of the latest candle is higher than the trailing stop price of the previous candle, then the current candle's trailing stop price = max(previous candle's trailing stop price, latest candle's highest price - long trailing stop distance)

- If the lowest price of the latest candle is lower than the trailing stop price of the previous candle, then the current candle's trailing stop price = min(previous candle's trailing stop price, latest candle's lowest price + short trailing stop distance)  

- Otherwise the current candle's trailing stop price = close price

This dynamically adjusts the trailing stop price based on changes in the highest and lowest market prices to achieve dynamic stops.  

## Advantage Analysis

The biggest advantage of this strategy is the implementation of truly dynamic and flexible trailing stops. Compared to fixed stop loss prices, dynamic trailing can adjust the stop loss range based on market fluctuations, avoiding unnecessary losses due to too large stop distances, while also avoiding being stopped out by normal price fluctuations when the distance is too small. This reduces unnecessary losses while also reducing the probability of premature stops.  

Another advantage is that the stop loss distance is customizable and optimizable. Users can choose stop loss ranges suitable for themselves according to the characteristics of different products and trading styles. This allows the strategy to be applied to a wider range of scenarios.   

Finally, the stop loss logic of this strategy is simple and clear, easy to understand, and easy to further develop and integrate into other strategies. This is also one of its advantages.

## Risk Analysis

The main risks of this strategy are:  

1. Dynamic stops can only reduce losses under normal market conditions, but cannot withstand major events or extreme market conditions. This is an inherent limitation.   

2. If the trailing stop distance is set too large, it may lead to greater losses. If set too small, it may stop out prematurely. The setting needs careful testing and optimization based on product characteristics.

3. In the first few candles after opening a position, due to the mechanism of trailing stops, the stop distance may be too large, posing some additional risk during this period.

## Optimization Directions

This strategy can be optimized in the following aspects:  

1. Parameter optimization for different products: Choose reasonable long and short trailing stop distances based on volatility, intraday range and other metrics for different products. This is the most critical direction.  

2. Reduce extra risk in early candles after opening positions: Limit the adjustment range of trailing stop distances in the first few candles to avoid too large distances.

3. Incorporate trading volume indicators: For example, reduce stop distance during surges in volume to avoid being stopped out by arbitrage.   

4. Combine with other entry/exit strategies: The main function of this strategy is trailing stop loss. It can be integrated with other strategies with entry and exit rules.  

## Conclusion

This strategy implements dynamic trailing stop loss based on changes in highest and lowest market prices. It can effectively reduce unnecessary losses under normal market conditions, and solves the problem of fixed distances being too large or small. The key optimization directions are testing suitable parameters across different products, and controlling risks in the early candles after opening positions. The stop loss logic is simple and clear, easy to understand and integrate into other strategies or use standalone as a stop loss tool.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|228.5|Long Trailing Stop Size|
|v_input_2|243.5|Short Trailing Stop Size |


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-02-20 00:00:00
end: 2024-02-26 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//By River
strategy("BitMex Trailing Stop Strategy", overlay=true)
longoffset = input(defval=228.5, title="Long Trailing Stop Size", type=float, minval=0.5, maxval=1000, step=0.5)
shortoffset = input(defval=243.5, title="Short Trailing Stop Size ", type=float, minval=0.5, maxval=1000, step=0.5)

hiprice = request.security(syminfo.tickerid, "1", high)
loprice = request.security(syminfo.tickerid, "1", low)
price = request.security(syminfo.tickerid, "1", close)

trailstop = price
trailstop := (loprice <= trailstop[1] and loprice[1] >= trailstop[2]) ? price + shortoffset : ((hiprice >= trailstop[1] and hiprice[1] <= trailstop[2]) ? price - longoffset : (hiprice > trailstop[1] ? max(hiprice - longoffset, trailstop[1]) : (loprice < trailstop[1] ? min(loprice + shortoffset, trailstop[1]) : price)))

trailcol = trailstop > price ? red : green
plot(trailstop, color=trailcol)

longCondition =  trailcol == green
alertcondition(longCondition, "Long Stop alert", "BUY")
if (longCondition)
    strategy.entry("Long", strategy.long)
shortCondition = trailcol == red
alertcondition(shortCondition, "Short alert", "SELL")
if (shortCondition)
    strategy.entry("Short", strategy.short)


```

> Detail

https://www.fmz.com/strategy/442937

> Last Modified

2024-02-27 15:02:34
