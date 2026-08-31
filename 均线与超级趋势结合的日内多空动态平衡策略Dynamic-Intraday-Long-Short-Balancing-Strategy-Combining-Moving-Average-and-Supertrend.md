
> Name

均线与超级趋势结合的日内多空动态平衡策略Dynamic-Intraday-Long-Short-Balancing-Strategy-Combining-Moving-Average-and-Supertrend

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/102ac881783effde42e.png)

## Strategy Overview

The Dynamic Intraday Long-Short Balancing Strategy Combining Moving Average and Supertrend is a quantitative trading strategy written in Pine Script™ 5. The strategy utilizes the MACD indicator and the Supertrend indicator to capture trending opportunities in the market, while controlling risk through dynamic long-short switching and stop-loss/take-profit.

## Strategy Principles

The core of this strategy is to combine the MACD indicator and the Supertrend indicator to determine the trend direction of the market. Specifically:

1. Use the Supertrend indicator to determine the current trend direction. When the Supertrend indicator changes, it indicates a reversal of the trend.
2. Use the histogram of the MACD indicator to judge the change in momentum. When the MACD histogram turns from negative to positive, it indicates an increase in upward momentum; when the MACD histogram turns from positive to negative, it indicates an increase in downward momentum.
3. Open a long position when both the Supertrend indicator and the MACD indicator give a long signal; open a short position when both the Supertrend indicator and the MACD indicator give a short signal.
4. Close all positions at a fixed time (such as 15:15) on each trading day to avoid overnight risk.
5. Re-open positions on a new trading day (such as 9:30) according to the indications of the Supertrend indicator and the MACD indicator.

Through dynamic long-short switching, the strategy can adapt to changes in the market and capture trending opportunities. At the same time, the design of closing positions at a fixed time also helps to control risk.

## Strategy Advantages

1. Trend tracking: By combining the Supertrend indicator and the MACD indicator, the strategy can effectively capture trending opportunities in the market.
2. Dynamic long-short switching: The strategy dynamically adjusts the position direction according to changes in the indicators, adapting to market changes.
3. Risk control: Through fixed-time position closing and dynamic long-short switching, the strategy can control risk relatively well.
4. Parameter flexibility: The parameters of the strategy (such as ATR period, factor, etc.) can be adjusted according to market characteristics and personal preferences, providing certain flexibility.

## Strategy Risks

1. Indicator failure risk: In some market environments, the MACD indicator and the Supertrend indicator may give false signals, leading to strategy failure.
2. Parameter optimization risk: The performance of the strategy depends on the choice of parameters, and inappropriate parameters may lead to poor strategy performance.
3. Stop-loss risk: The strategy does not have an explicit stop-loss logic, which may lead to significant losses in extreme market environments.
4. Overnight risk: Although the strategy closes positions intraday, it may still face the risk of overnight gaps when opening positions overnight.

## Optimization Directions

1. Add stop-loss logic: Add explicit stop-loss logic to the strategy, such as fixed percentage stop-loss or ATR stop-loss, to further control risk.
2. Parameter optimization: Optimize key parameters of the strategy, such as ATR period, factor, MACD parameters, etc., to improve the robustness and profitability of the strategy.
3. Signal filtering: Add more signal filtering conditions, such as price breakout, trading volume, etc., to improve the reliability of signals.
4. Multi-market testing: Test the strategy in different markets and instruments to evaluate its applicability and stability.

## Summary

The Dynamic Intraday Long-Short Balancing Strategy Combining Moving Average and Supertrend is a trading strategy based on trend tracking and momentum judgment. By combining the Supertrend indicator and the MACD indicator and dynamically adjusting the position direction, the strategy can adapt to changes in the market and capture trending opportunities. At the same time, the design of closing positions at a fixed time also helps to control overnight risk.

However, the strategy also has some risks and shortcomings, such as indicator failure risk, parameter optimization risk, stop-loss risk, etc. To further improve the strategy, one can consider adding stop-loss logic, optimizing parameters, adding more signal filtering conditions, and testing in multiple markets.

Overall, the Dynamic Intraday Long-Short Balancing Strategy Combining Moving Average and Supertrend provides a way of thinking for trend tracking and risk control. In practical application, traders should make appropriate adjustments and optimizations to the strategy based on their own risk preferences and market characteristics, and use it cautiously. Quantitative trading strategies can provide trading ideas, but the market is ever-changing, and no strategy can guarantee profits. Investors must understand the principles and risks of the strategy, reasonably control positions, strictly stop losses, and always remain alert in order to survive in the market for the long term.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|7|ATR Length|
|v_input_float_1|true|Factor|
|v_input_1|Asia/Kolkata|Timezone|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-03-05 00:00:00
end: 2024-03-10 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © smj31071995

//@version=5
strategy("EQ - INTRA - Samsuga supertrend prod", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, calc_on_every_tick = false)


atrPeriod = input.int(7,    "ATR Length", minval = 1)
factor =    input.float(1.0, "Factor",     minval = 0.01, step = 0.01)
st_tf = "3"
macd_tf="30"

[supertrend, direction] =request.security(symbol = syminfo.tickerid, timeframe = st_tf,expression =  ta.supertrend(factor, atrPeriod),lookahead=barmerge.lookahead_on)

supertrend := barstate.isfirst ? na : supertrend
upTrend =    plot(direction <= 0 ? supertrend : na, "Up Trend",   color = color.green, style = plot.style_linebr)
downTrend =  plot(direction <= 0 ? na : supertrend, "Down Trend", color = color.red,   style = plot.style_linebr)
bodyMiddle = plot(barstate.isfirst ? na : (open + close) / 2, "Body Middle",display = display.none)
longcondition = direction[1] > direction 
shortCondition = direction[1] < direction 

macdp1 = 2
macdp2=8
macdp3=4

[macdLine, signalLine, histLine] =request.security(symbol = syminfo.tickerid, timeframe = macd_tf,expression = ta.macd(close,macdp1,macdp2,macdp3),lookahead=barmerge.lookahead_on)
// log.info(str.tostring(syminfo.tickerid)+str.tostring(histLine[0]))
timezone_input = input("Asia/Kolkata", title="Timezone")
// log.info(timezone_input)
if(hour==15 and minute==15)
    strategy.close_all(comment = "DAY EXIT",alert_message = "X-D")
else if(hour==9 and minute==30)
    if(longcondition or histLine[1]>0)
        strategy.entry(id= "Long", direction=strategy.long,  comment = "DL",alert_message = "L")
    else if(shortCondition or histLine[1]<0) 
        strategy.entry(id= "Short", direction=strategy.short,  comment = "DS",alert_message = "S")
else
    if(longcondition)
        strategy.close("Short",comment = "X-S", alert_message = "X-S")
        if(histLine[1]>0)    
            strategy.entry(id= "Long", direction=strategy.long,  comment = "L",alert_message = "L")
    else if(shortCondition) 
        strategy.close("Long",comment = "X-L",alert_message = "X-L")
        if(histLine[1]<0)    
            strategy.entry(id= "Short", direction=strategy.short,  comment = "S",alert_message = "S")


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


```

> Detail

https://www.fmz.com/strategy/444352

> Last Modified

2024-03-11 11:33:47
