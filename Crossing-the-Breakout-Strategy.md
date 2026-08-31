
> Name

Crossing-the-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description



## Overview

The moving average crossover strategy is a very common quantitative trading strategy. It uses the golden cross and death cross of moving averages to determine trends and profit. When the short-term moving average crosses above the long-term moving average, it signals an uptrend, and a long position can be taken. When the short-term moving average crosses below the long-term moving average, it signals a downtrend, and a short position can be taken.

## Strategy Logic

This strategy is based on the golden cross and death cross of moving averages to determine entry and exit points. The code uses two boolean input parameters `upOrDown` and `longOrShort` to determine long or short; `percentInput` to set the threshold percentage of price change; `closePositionDays` to set the number of days to hold the position. 

The core logic is: calculate the increase/decrease of today relative to yesterday. If it reaches the input threshold percentage, a trading signal is triggered. If it's a long signal, when today's price increases more than threshold relative to yesterday, go long. If it's a short signal, when today's price decreases more than threshold relative to yesterday, go short.

After going long/short, the entry day and next 4 days will be marked with colors on the chart. The position will be closed automatically after 4 days.

## Advantages

- Using moving average crossovers to determine trend is a mature and reliable method
- Simple and clear strategy logic, easy to understand and implement
- The frequency can be controlled by adjusting parameters
- The automatic stop loss mechanism effectively controls risks

## Risks

- Moving averages have lagging effects, may miss best timing of rapid price changes
- Significant price swings may happen in short term, generating unnecessary signals
- Inappropriate parameter settings may affect strategy performance 
- Unable to respond effectively to impacts of unexpected events

Risk management:

1. Optimize moving average parameters, longer periods help filter noise
2. Increase threshold percentage to reduce unnecessary trades
3. Test different holding periods to control single loss
4. Combine with other indicators to further confirm signals

## Optimization Directions

- Consider using EMA, DMA instead of SMA to make it more sensitive 
- Add stop loss mechanisms, e.g. stop loss when breaking the average
- Add other technical indicators like MACD, KDJ for combination, improving win rate
- Try machine learning methods to auto optimize parameters
- Optimize entry and exit timing, such as breakout, etc.

## Summary

The moving average crossover strategy is a very simple and practical quantitative trading strategy. By judging the relationship between short-term and long-term trends, it profits from the trending nature of asset prices. This strategy is easy to implement with clear logic, and forms the foundation of many quantitative trading strategies. We can obtain better performance through parameter tuning and optimizations. But we also need to manage risks and avoid misuse.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Long=Checked Short=Unchecked|
|v_input_2|true|Direction of Today vs. Previous day: Up=Checked Down=Unchecked|
|v_input_3|4.5|Percent|
|v_input_4|4|How Many Days to Close Position|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-10-11 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//  Created by Leon Ross

strategy(title = "DaysAfterCertainPercentChangev1", shorttitle = "DACPCv1", overlay = true, 
  pyramiding = 0, default_qty_type = strategy.percent_of_equity, default_qty_value = 100, 
  calc_on_every_tick=true, initial_capital=100000)
  
//Inputs
longOrShort = input(title="Long=Checked Short=Unchecked", type=bool, defval=true) //long=true, down=false
upOrDown = input(title="Direction of Today vs. Previous day: Up=Checked Down=Unchecked", type=bool, defval=true) //up=true, down=false: this is the direction of days vs previous day
percentInput = input(title="Percent", type=float, defval=4.5)
closePositionDays = input(title="How Many Days to Close Position", defval=4)

//Conditions
//percentUpValue = (close / close[1]) - 1
//percentUp = percentUpValue >= (percentInput/100.0)
//upConditions = percentUp
//percentDownValue = 1- (close / close[1])
//percentDown = percentDownValue >= (percentInput/100.0)
//downConditions = percentDown
upValue = (close / close[1]) - 1
downValue = 1 - (close / close[1])
allConditions = if(upOrDown)
    upValue >= (percentInput/100.0)
else
    downValue >= (percentInput/100.0)
    
//Plots
bgcolor(allConditions ? (upOrDown ? green : red) : na, transp=70)
bgcolor(allConditions ? silver : na, transp=70, offset=1)
bgcolor(allConditions ? silver : na, transp=70, offset=2)
bgcolor(allConditions ? silver : na, transp=70, offset=3)
bgcolor(allConditions ? silver : na, transp=70, offset=4)
//bgcolor(downConditions == 1 ? red : na, transp=70)
//bgcolor(downConditions == 1 ? silver : na, transp=70, offset=1)
//bgcolor(downConditions == 1 ? silver : na, transp=70, offset=2)
//bgcolor(downConditions == 1 ? silver : na, transp=70, offset=3)
//bgcolor(downConditions == 1 ? silver : na, transp=70, offset=4)

//Entires
if(longOrShort)
    strategy.entry(id = "Long", long = true, when = allConditions) 
else
    strategy.entry(id = "Short", long = false, when = allConditions)

//Exits
if (barssince(allConditions) == closePositionDays)
    if(longOrShort)
        strategy.close("Long")
    else
        strategy.close("Short")



```

> Detail

https://www.fmz.com/strategy/429081

> Last Modified

2023-10-12 16:47:55
