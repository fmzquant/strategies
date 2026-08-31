
> Name

Breakthrough-Callback-Long-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d9a128877d2a64b510.png)

### Overview

The main idea of this strategy is to open a long position after a specific candlestick pattern emerges, namely opening a long position at the next bar's open after a downside gap (colorbar) followed by a pullback to the previous bar's low.   

### Strategy Logic

The specific conditions for this strategy are: the previous bar has a lower low and higher high compared to the prior two bars, indicating a downside gap; and the current bar's low is less than or equal to the previous bar's low, signaling a pullback has occurred. When both conditions are met, a long position is opened at the next bar's open.
  
After opening the long position, the stop loss is set at the pullback low, which is the previous bar's low, and take profit is set at more than 2% above the entry price. When either take profit or stop loss is touched, the position is closed.

### Advantage Analysis

The biggest advantage of this strategy is seizing the high probability rebound opportunity after the specific candlestick pattern. The downside gap followed by pullback represents an extremely powerful technical pattern that indicates the selling pressure may have exhausted at this level and a high probability rebound is likely to happen. Therefore, this strategy is more suitable for short-term trading.  

### Risk Analysis   

The major risk is the continuing dropdown after pullback ends. As we are taking long positions around pullback lows, significant losses may be incurred if unable to cut loss in time. Also, if the pullback range is small, the stop loss set too tightly may cause being stopped out. Thus this strategy is more preferable for short-term trading, requiring close market attention and timely stop loss.
  
### Optimization Direction  

Other technical indicators can be incorporated to improve signal accuracy and strategy stability, like entering on MACD gold cross, or checking typical price is at support level before entry. In addition, walk forward optimization can be conducted across different products and timeframes to find the optimal parameter set. Machine learning techniques may also be leveraged for automated parameter tuning.  

### Summary

In summary, this is a typical short-term breakout pullback long strategy. It captures the rebound opportunity after the strong pattern of downside gap followed by pullback. But it also bears the risk of huge losses if failing to cut losses in time. Frequent market monitoring is necessitated for favorable results. Further improvements can be made via filtering signals with more indicators and parameter optimization.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2|Take Profit %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-22 00:00:00
end: 2024-02-21 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//  Created by Leon Ross
//study(title="OutsideDownOpenLower", shorttitle="ODOL", overlay=true)
strategy(title = "Outside", shorttitle = "OB", overlay = true )
  

//Window of time
//start     = timestamp(2018, 01, 01, 00, 00)  // backtest start window
//finish    = timestamp(2018, 12, 31, 23, 59)        // backtest finish window
//window()  => time >= start and time <= finish ? true : false // create function "within window of time"  

//Conditions
outsideBar = low < low[1] and high > high[1] and close < open
allConditions = outsideBar
  
//Stop and Take Profit as percentages
//inpTakeProfit   = input(2, title='Take Profit %', type=float)/100
//takeProfitValue = strategy.position_avg_price * (1 + inpTakeProfit)
//useTakeProfit   = inpTakeProfit  > 0 ?  takeProfitValue : na
//inpStopLoss     = input(1, title='Stop Loss %', type=float)/100
//stopLossValue = strategy.position_avg_price * (1 - inpStopLoss)
//useStopLoss     = inpStopLoss    > 0 ?  stopLossValue   : na
//entry = strategy.position_avg_price



//Stop as last bars low and profit as percentage
entry = strategy.position_avg_price
inpTakeProfit   = input(2.0, title='Take Profit %', type=float)/100
takeProfitValue = strategy.position_avg_price * (1 + inpTakeProfit)
useTakeProfit   = inpTakeProfit  > 0 ?  takeProfitValue : na
inpStopLoss     = valuewhen(allConditions, low, 0)
stopLossValue = inpStopLoss
useStopLoss     = inpStopLoss    > 0 ?  stopLossValue   : na
    



//Plots
bgcolor(allConditions ==1 ? aqua : na, transp=70)
plot(entry, color=blue, style=linebr, linewidth=2)
plot(useStopLoss, color=red, style=linebr, linewidth=2)
plot(useTakeProfit, color=green, style=linebr, linewidth=2)


//Entires
strategy.entry(id = "Long", long = true, when = allConditions) // use function or simple condition to decide when to get in

//Exits
//if (barssince(allConditions) == 2)
    //strategy.close("Long")
//else
strategy.exit("Exit Long", from_entry = "Long", stop = useStopLoss)






```

> Detail

https://www.fmz.com/strategy/442519

> Last Modified

2024-02-22 15:41:53
