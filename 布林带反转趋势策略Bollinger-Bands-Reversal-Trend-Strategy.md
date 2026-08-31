
> Name

布林带反转趋势策略Bollinger-Bands-Reversal-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1ebeaebae735d7e35d9.png)

## Overview
This strategy uses the relationship between the upper band, middle band, lower band of Bollinger Bands and 200-day moving average to determine the trend direction. It goes long when price touches the lower band during an uptrend and goes short when price touches the upper band during a downtrend.

## Principles  
1. Determine trend: When both upper and lower bands of Bollinger Bands are above 200-day moving average, it is an uptrend. When both are below, it is a downtrend.   
2. Entry: Go long when price touches lower band in an uptrend. Go short when price touches upper band in a downtrend.  
3. Exit: When long, close position when price touches upper band or breaks below 250-day simple moving average. When short, close position when price touches lower band or breaks above 300-day simple moving average.

## Advantages
1. Use Bollinger Bands to determine trend direction, avoiding repetitive trading without a clear direction. 
2. Take proper entries and exits based on the volatility range of Bollinger Bands when trend direction is clear.
3. Added filtering with moving averages, avoiding unexpected losses.  

## Risks and Solutions
1. Improper Bollinger Bands parameter setting leads to misjudgment: Adjust parameters to find the optimal period length.  
2. Improper moving average parameter leading to over trading or unwanted losses: Test different parameters to find the most stable ones.
3. Sudden market change due to major news events causes anomalies: Set stop loss to limit per trade loss.   

## Optimization Directions  
1. Test strategy performance across different parameter periods to find the optimal parameters.
2. Add stop loss mechanism to avoid huge losses in anomalous market conditions.   
3. Incorporate other indicators to confirm entry signals to improve win rate.
   
## Conclusion
This strategy determines trend direction with Bollinger Bands first. It then utilizes the volatility range of Bollinger Bands together with moving averages to form a trading system that ensures directional correctness and locks in decent profits. There are still some issues with parameter selection and stop loss that can be further improved via optimization and mechanism additions to achieve better performance.  

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|length|
|v_input_float_1|2.3|mult|
|v_input_int_2|200|trend|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-29 00:00:00
end: 2023-12-06 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Aayonga

//@version=5
strategy("boll trend", overlay=true,initial_capital=1000,default_qty_type=strategy.fixed, default_qty_value=1 )
bollL=input.int(20,minval=1,title = "length")
bollmult=input.float(2.3,minval=0,step=0.1,title = "mult")
basis=ta.ema(close,bollL)
dev=bollmult*ta.stdev(close,bollL)
upper=basis+dev

lower=basis-dev

smaL=input.int(200,minval=1,step=1,title = "trend")
sma=ta.sma(close,smaL)
//多头趋势
longT=upper>sma and basis>sma and lower>=sma
//空头趋势
shortT=upper<sma and basis<sma and lower<=sma

//入场位
longE=ta.crossover(close,lower)

shortE=ta.crossover(close,upper)

//出场位

longEXIT=ta.crossover(high,upper) or ta.crossunder(close,ta.sma(close,300))
shortEXIT=ta.crossunder(low,lower) or ta.crossover(close,ta.sma(close,250)) 

if longT and longE 
    strategy.entry("多long",strategy.long)

if longEXIT
    strategy.close("多long",comment = "close long")

if shortE and shortT 
    strategy.entry("空short",strategy.short)

if shortEXIT
    strategy.close("空short",comment = "close short")
```

> Detail

https://www.fmz.com/strategy/434569

> Last Modified

2023-12-07 16:08:05
