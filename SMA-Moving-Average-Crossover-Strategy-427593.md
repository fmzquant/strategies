
> Name

SMA-Moving-Average-Crossover-Strategy-427593

> Author

ChaoZhang

> Strategy Description


## Overview

This is a simple trend following crossover strategy based on SMA moving averages, suitable for higher timeframes for trading BTCUSD and other crypto pairs.

## Strategy Logic

The strategy is based on two SMA moving averages with different periods. One is a 10-period SMA, the other is a 100-period SMA. The strategy keeps monitoring the values of the two SMAs. When the shorter 10-period SMA crosses above the longer 100-period SMA, it signals an uptrend, and the strategy goes long. When the 10-period SMA crosses below the 100-period SMA, it signals a downtrend, and the strategy goes short.

Specifically, the strategy determines the crossover by comparing the values of the 10-period SMA and 100-period SMA. If the 10-period SMA crosses above the 100-period SMA, the longCondition is set to true. The strategy then goes long through the strategy.entry function. Conversely, if the 10-period SMA crosses below the 100-period SMA, the shortCondition is set to true. The strategy then goes short through strategy.entry.

Through this simple SMA crossover system, the strategy can capture trend reversal points and get in and out of the market in a timely manner. It goes long when the shorter SMA crosses above the longer SMA, and goes short when the shorter SMA crosses below the longer SMA.

## Advantages

1. The logic is simple and clear, easy to understand and implement, suitable for beginners.

2. SMA crossover can effectively capture trend reversal points and enter the market in a timely manner. 

3. Moving averages can filter out market noise and identify trend directions.

4. The SMA periods can be adjusted for different market environments. For example, shorter periods for bull market and longer periods for bear market.

5. The strategy has been validated for a long time and works well in crypto markets.

## Risks

1. SMA crossover may lag and cause late entry and stop loss risks.

2. Shorter SMA may generate false breakouts and cause unnecessary whipsaws.

3. Need to set stop loss when holding positions for long term.

4. May lead to frequent losing trades in ranging markets. Need to combine with other indicators.

5. Inappropriate parameter settings may affect strategy performance. SMA periods need to be adjusted per market conditions.

## Enhancements

1. Combine SMA with other indicators like RSI, Bollinger Bands to improve accuracy.

2. Add stop loss mechanisms, like SMA breakout stop loss. 

3. Dynamically adjust SMA parameters based on market conditions, shorter periods for bull market and longer periods for bear market.

4. Use different position sizing based on crossover strength of short and long SMAs.

5. Add re-entry rules, like re-enter when price reverts to SMA.

6. Evaluate parameters and strategy through backtesting and paper trading.

## Summary

The SMA crossover strategy has simple and clear logic, easy to understand and implement. It captures trend reversal points through crossover of two SMAs with different periods. It is a classical trend following strategy. The advantages are direct logic and clear trading signals, able to track trends effectively. The disadvantages are possible lagging entry and false breakouts. We can optimize it by introducing other indicators and stop loss mechanisms to control risks and improve practical results. With continuous optimization and verification, this strategy can become a very useful trend following strategy for crypto trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_2|10|1st MA Length|
|v_input_3|0|1st MA Type: SMA|EMA|
|v_input_4|100|2nd MA Length|
|v_input_5|0|2nd MA Type: SMA|EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-22 00:00:00
end: 2023-09-21 00:00:00
period: 6h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//study(title="MA Crossover Strategy", overlay = true)
// Simple MA crossover strategy with a 10/100 MA crossover)

strategy("MA Crossover Strategy", overlay=true)
src = input(close, title="Source")

price = security(syminfo.tickerid, timeframe.period, src)
ma1 = input(10, title="1st MA Length")
type1 = input("SMA", "1st MA Type", options=["SMA", "EMA"])

ma2 = input(100, title="2nd MA Length")
type2 = input("SMA", "2nd MA Type", options=["SMA", "EMA"])

price1 = if (type1 == "SMA")
    sma(price, ma1)
else
    ema(price, ma1)
    
price2 = if (type2 == "SMA")
    sma(price, ma2)
else
    ema(price, ma2)


//plot(series=price, style=line,  title="Price", color=black, linewidth=1, transp=0)
plot(series=price1, style=line,  title="1st MA", color=blue, linewidth=2, transp=0)
plot(series=price2, style=line, title="2nd MA", color=green, linewidth=2, transp=0)


longCondition = crossover(price1, price2)
if (longCondition)
    strategy.entry("Long", strategy.long)

shortCondition = crossunder(price1, price2)
if (shortCondition)
    strategy.entry("Short", strategy.short)

```

> Detail

https://www.fmz.com/strategy/427593

> Last Modified

2023-09-22 14:40:03
