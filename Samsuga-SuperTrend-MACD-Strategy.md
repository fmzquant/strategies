
> Name

Samsuga-SuperTrend-MACD-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16ec00fc8fedb3abb86.png)

## Overview

This strategy combines the SuperTrend indicator and the MACD indicator to capture small trends for profit. It uses the SuperTrend indicator to determine the current market trend and the MACD indicator as an auxiliary condition for entry and exit. The strategy logic is clear and easy to understand and implement.

## Strategy Principle

1. Use the ta.supertrend function to calculate the SuperTrend indicator with parameters for ATR period and multiplier factor.
2. Determine the long/short trend based on changes in the direction of the SuperTrend indicator. When direction changes from greater than 0 to less than or equal to 0, it is considered an uptrend; otherwise, it is considered a downtrend.
3. Use the request.security function to obtain the MACD indicator values on the 30-minute timeframe, including the MACD line, signal line, and histogram.
4. In an uptrend, if the MACD histogram is greater than 0, open a long position and close any previous short position.
5. In a downtrend, if the MACD histogram is less than 0, open a short position and close any previous long position.

## Advantage Analysis

1. Combines trend following and momentum indicators, allowing it to adapt well to different market conditions.
2. Uses a longer timeframe MACD indicator as an auxiliary condition, which can effectively filter out some false signals.
3. The strategy logic is simple and straightforward, easy to understand and implement, suitable for beginners to learn.
4. Strategy parameters are adjustable and can be optimized for different markets and instruments.

## Risk Analysis

1. The strategy may generate frequent trading signals in choppy markets, leading to high trading frequency and slippage costs.
2. The SuperTrend indicator is sensitive to parameter settings, and different parameter values may produce different results.
3. The MACD indicator may experience divergence from price, resulting in erroneous trading signals.
4. The strategy lacks stop-loss measures, which may expose it to greater risk during weak trend continuity or unexpected events.

## Optimization Direction

1. Consider adding more filtering conditions, such as price breaking through important support/resistance levels, changes in trading volume, etc., to improve signal reliability.
2. For choppy markets, consider using a shorter timeframe MACD indicator or other indicators suitable for range-bound markets to determine the trend.
3. Incorporate stop-loss measures, such as fixed point stop-loss, trailing stop-loss, etc., to control the maximum risk per trade.
4. Optimize parameters for different markets and instruments to find the most suitable parameter combinations.

## Conclusion

By combining the SuperTrend indicator and MACD indicator, this strategy captures small trends while also considering trend continuity, making it a relatively comprehensive and balanced strategy. The strategy's strengths lie in its clear logic, ease of understanding and implementation, and the use of a longer timeframe MACD indicator as an auxiliary condition to effectively filter out false signals. However, the strategy also has some risks, such as the potential for frequent trading in choppy markets, sensitivity to parameter settings, and lack of stop-loss measures. To address these risks, improvements can be made by adding more filtering conditions, optimizing parameters, incorporating stop-losses, etc. Overall, this strategy can serve as a basic strategy framework that, with continuous optimization and improvement, has the potential to become a consistently profitable strategy.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|7|ATR Length|
|v_input_float_1|true|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-02-01 00:00:00
end: 2024-02-29 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Samsuga supertrend", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100)


atrPeriod = input.int(7,    "ATR Length", minval = 1)
factor =    input.float(1.0, "Factor",     minval = 0.01, step = 0.01)

[supertrend, direction] = ta.supertrend(factor, atrPeriod)

supertrend := barstate.isfirst ? na : supertrend
upTrend =    plot(direction <= 0 ? supertrend : na, "Up Trend",   color = color.green, style = plot.style_linebr)
downTrend =  plot(direction <= 0 ? na : supertrend, "Down Trend", color = color.red,   style = plot.style_linebr)
bodyMiddle = plot(barstate.isfirst ? na : (open + close) / 2, "Body Middle",display = display.none)
longcondition = direction[1] > direction 
shortCondition = direction[1] < direction 

macdp1 = 3
macdp2=10
macdp3=6

[macdLine, signalLine, histLine] =request.security(symbol = syminfo.tickerid, timeframe = "30",expression = ta.macd(close,macdp1,macdp2,macdp3),lookahead=barmerge.lookahead_on)
// plot(macdLine,   title = "MACD",   color = #2962FF)
// plot(signalLine, title = "Signal", color = #FF6D00)
// 8, 21, 5
// 8,13,9
// 12,26,9
//  1--> 3, 17, 5
// 3, 10, 16
// log.info(str.tostring(syminfo.tickerid)+str.tostring(histLine[0]))
//  /////////----------------METHOD 1-----------------////////////////
// if(longcondition)
//     if(strategy.opentrades>0)
//         strategy.close("Long","Prev Exit", immediately = true)
//     if( histLine[0] > 0.1)
//         strategy.entry(id= "Long", direction=strategy.long,  comment = "update long")

    
// else if(shortCondition and strategy.openprofit<=0.1) 
//     strategy.close("Long",comment = "Close",immediately = true)
//  /////////----------------METHOD 2-----------------////////////////
// if(longcondition)
//     if(histLine[0] > 0)
//         strategy.entry(id= "Long", direction=strategy.long,  comment = "update long" )
//         strategy.exit("Long", loss = close*0.2)


    
// else if(shortCondition ) 
//     strategy.close("Long",comment = "Close",immediately = true)
//  /////////----------------METHOD 3-----------------////////////////
// log.info(str.tostring(syminfo.tickerid)+str.tostring(histLine[0]))
if(longcondition)
    if(histLine[0] > 0)    
        strategy.close("Short",comment = "E-S", alert_message = "E-S",disable_alert = true)
        strategy.entry(id= "Long", direction=strategy.long,  comment = "L",alert_message = "L")
else if(shortCondition) 
    if(histLine[0] < 0)    
        strategy.close("Long",comment = "E-L",alert_message = "E-L",disable_alert = true)
        strategy.entry(id= "Short", direction=strategy.short,  comment = "S",alert_message = "S")
```

> Detail

https://www.fmz.com/strategy/444350

> Last Modified

2024-03-11 11:24:20
