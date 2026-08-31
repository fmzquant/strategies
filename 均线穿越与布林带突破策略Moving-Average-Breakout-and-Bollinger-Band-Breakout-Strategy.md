
> Name

均线穿越与布林带突破策略Moving-Average-Breakout-and-Bollinger-Band-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16c59433070ef4d5eeb.png)

## Overview

This strategy combines the use of RSI indicator to identify overbought and oversold signals, Bollinger Bands to determine price breakouts, and moving average crossovers to judge the market in different trend stages, in order to profit.  

## Strategy Logic

The strategy consists of the following main indicators:

1. RSI indicator: When the RSI line crosses over the overbought threshold or crosses below the oversold threshold, long or short trades are placed accordingly.

2. Bollinger Bands: When price breaks through the Bollinger upper band, a short trade is placed; when price breaks down the Bollinger lower band, a long trade is placed.  

3. Moving Average: The highest and lowest prices over a certain period (e.g. 5 periods) are calculated. When price is higher than the highest point over the past 5 periods, a long trade is placed; when price is lower than the lowest point over the past 5 periods, a short trade is placed.  

4. MACD: The crossover and death cross of fast line, slow line and MACD line are used as auxiliary judgement indicators.  

These indicators work together to judge the market in trending and consolidating stages. Bollinger Bands identify breakouts and reversions to mean. Moving averages determine trend reversal points during consolidation. RSI extremes spot overbought/oversold market conditions for counter-trend trades.

## Advantage Analysis 

The advantages of this strategy are:

1. Combination of multiple indicators improves accuracy. RSI, Bollinger Bands, moving average and more interact to produce reliable trading signals.  

2. Applicable to different market conditions. Bollinger Bands for trends, moving averages for consolidation, RSI for extremes. Flexibility is ensured.

3. Reasonable trading frequency. Indicator parameters are set conservatively to avoid over-trading. 

4. Clean code structure. Easy to understand, edit and build upon.

## Risk Analysis

Some risks need attention:

1. Parameter risks. Inappropriate indicator parameters may generate incorrect trading signals. Parameters need continuous testing and optimization.

2. Long/short switch risks. Frequent long/short position changes around trend reversals increase trading costs. Holding period can be adjusted.

3. Coding risks. Logical flaws hidden in the code could lead to abnormal trades. Exception handling and logging should be improved.  

## Optimization 

The strategy can be upgraded in the following aspects:

1. Add stop loss to lock in profits and reduce losses. 

2. Incorporate trading volume to avoid false signals. E.g. check volume on Bollinger breakouts.

3. Introduce machine learning to find optimal parameters based on historical data.  

4. Build graphical interface for intuitive display of performance.

5. Conduct backtesting to find best parameter combinations.

## Conclusion

This strategy combines moving average, Bollinger Bands, RSI and more to generate trading signals. Its versatility and accuracy are clear strengths, while parameter setting and coding risks need to be managed. Next steps are to add stops, machine learning for parameter optimization, GUI for monitoring, and to improve exceptions handling.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|lengthrsi|
|v_input_2|30|overSold|
|v_input_3|70|overBought|
|v_input_4|20|lengthbb|
|v_input_5|2|mult|
|v_input_6|false|Strategy Direction|
|v_input_7|12|fastLength|
|v_input_8|26|slowlength|
|v_input_9|9|MACDLength|
|v_input_10|3|consecutiveBarsUp|
|v_input_11|3|consecutiveBarsDown|
|v_input_12|5|lengthch|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-19 00:00:00
end: 2024-02-15 00:00:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=2
strategy("MD strategy", overlay=true)
lengthrsi = input( 14 )
overSold = input( 30 )
overBought = input( 70 )
price = close
source = close
lengthbb = input(20, minval=1)
mult = input(2.0, minval=0.001, maxval=50)
direction = input(0, title = "Strategy Direction",minval=-1, maxval=1)
fastLength = input(12)
slowlength = input(26)
MACDLength = input(9)
consecutiveBarsUp = input(3)
consecutiveBarsDown = input(3)
lengthch = input( minval=1, maxval=1000, defval=5)
upBound = highest(high, lengthch)
downBound = lowest(low, lengthch)



ups = price > price[1] ? nz(ups[1]) + 1 : 0
dns = price < price[1] ? nz(dns[1]) + 1 : 0
MACD = ema(close, fastLength) - ema(close, slowlength)
aMACD = ema(MACD, MACDLength)
delta = MACD - aMACD

strategy.risk.allow_entry_in(direction == 0 ? strategy.direction.all : (direction < 0 ? strategy.direction.short : strategy.direction.long))

basis = sma(source, lengthbb)
dev = mult * stdev(source, lengthbb)

upper = basis + dev
lower = basis - dev

vrsi = rsi(price, lengthrsi)

if (not na(vrsi))
    if (crossover(vrsi, overSold))
        strategy.entry("RsiLE", strategy.long, comment="RsiLE")
    if (crossunder(vrsi, overBought))
        strategy.entry("RsiSE", strategy.short, comment="RsiSE")

if (crossover(source, lower))
    strategy.entry("BBandLE", strategy.long, stop=lower, oca_name="BollingerBands",  comment="BBandLE")
else
    strategy.cancel(id="BBandLE")

if (crossunder(source, upper))
    strategy.entry("BBandSE", strategy.short, stop=upper, oca_name="BollingerBands",  comment="BBandSE")
else
    strategy.cancel(id="BBandSE")
    
    
if (not na(close[lengthch]))
    strategy.entry("ChBrkLE", strategy.long, stop=upBound + syminfo.mintick, comment="ChBrkLE")
    strategy.entry("ChBrkSE", strategy.short, stop=downBound - syminfo.mintick, comment="ChBrkSE")
    
    
//plot(strategy.equity, title="equity", color=red, linewidth=2, style=areabr)
```

> Detail

https://www.fmz.com/strategy/442109

> Last Modified

2024-02-19 14:18:00
