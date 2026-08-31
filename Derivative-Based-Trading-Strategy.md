
> Name

Derivative-Based-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10e1b9181f9ea518bcb.png)


## Overview

This strategy invests equal percentages of capital based on utilizing the 1st, 2nd, 3rd and 4th time derivatives of the Hull Moving Average (HMA). Entry points are identified by trends in the 2nd, 3rd and 4th derivatives while exit points are created at either a new entry point or a trailing stop loss percentage.

## Strategy Logic  

The strategy first calculates the HMA. The Hull Moving Average is a weighted moving average calculated with the following formula:  

```
hullma = wma(2*wma(src,sm/2)-wma(src,sm),round(sqrt(sm))) 
```

where src is the price and sm is an input parameter controlling the length of the average.  

The strategy then calculates the speed (1st derivative), acceleration (2nd derivative), jerk (3rd derivative) and jounce (4th derivative). These are calculated by taking the difference between the HMA and its lagged values divided by the length len. For example, the speed calculation is:  

```
speed = (hullma-hullma[len])/len
```

The other derivatives are calculated similarly.   

The strategy determines entries and exits by looking at the signs of the acceleration, jerk and jounce. If all three indicators are positive, it will go long. If all three are negative, it will go short.  

In addition, the strategy will also trail stop losses to lock in profits. Long positions will have stop losses set based on an adjustable input percentage, and short positions likewise.

## Advantage Analysis   

A key advantage of this strategy is it uses multiple derivatives as entry and exit signals, which can filter out some false signals. Relying solely on speed (1st derivative) to determine entries is often too fragile, but combining the 2nd, 3rd and 4th derivatives can build a more robust system.  

Another advantage is that this strategy is very flexible. It has multiple adjustable parameters including HMA length, lengths of the various derivatives, stop loss percentages etc. which can be optimized for different markets.  

The use of adjustable trailing stops is also an advantage. This can help the strategy capture more profits in trending markets, while exiting in a timely manner during choppy markets, limiting maximum drawdown.  

## Risk Analysis

The main risk of this strategy is decreased hit rate due to sudden events. If there are no relevant filters in place, major news events could cause multiple derivatives to give wrong signals at the same time, leading to larger losses. Some news filters could be implemented or the strategy could be paused for some time after burst events to mitigate this risk.  

Another risk is parameters could be easily overfit. The HMA length, derivative lengths etc. could all impact results. This requires rigorous backtesting to evaluate the robustness of these parameters across different markets. Also the trailing stop loss percentages should not be too wide, otherwise losses could snowball.

## Optimization Directions   

This strategy could be optimized in several ways:  

1. Add filters based on burst events to pause trading for some time after major news events, avoiding missing entry points leading to large losses

2. Conduct robustness test of parameters across markets. Backtest on different products, time periods to evaluate stability of parameters  

3. Attempt to improve entry logic. Introduce machine learning models to identify trends instead of simple positive/negative judgments  

4. Improve stop loss methodology. Use volatility or machine learning stops instead of simple percentage trailing stops

5. Add profit taking exits. The current logic relies mainly on stops, could add additional upside trailing or target profit exits

## Conclusion  

This is a multi-timeframe trend following strategy utilizing multiple derivatives of the Hull Moving Average as entry and exit signals with trailing stops to lock in profits. Key advantages include filtering out false signals using multiple derivatives, flexible tunable parameters etc. Risks to note include impacts from burst events and potential parameter overfitting. The strategy could be optimized by adding filters, improving parameter robustness, enhancing entry/exit logic and so on to make it a more reliable automated trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Derivatives Length|
|v_input_2|4|HMA Length|
|v_input_3|25|Trail Long Loss %|
|v_input_4|25|Trail Short Loss %|
|v_input_5_ohlc4|0|Source: ohlc4|high|low|open|hl2|hlc3|hlcc4|close|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-01 00:00:00
end: 2023-12-31 23:59:59
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Derivative Based Strategy", shorttitle="DER", currency="USD", calc_on_order_fills=true, default_qty_type=strategy.percent_of_equity, default_qty_value=10, initial_capital=1000)
len = input(1, minval=1, title="Derivatives Length")
sm = input(4, minval=1, title="HMA Length")
longTrailPerc=input(title="Trail Long Loss %", type=float,minval=0.0,step=0.1,defval=25)*0.01
shortTrailPerc=input(title="Trail Short Loss %",type=float,minval=0.0,step=0.1,defval=25)*0.01
longStopPrice=0.0
shortStopPrice=0.0
src = input(ohlc4, title="Source")
hullma = wma(2*wma(src,sm/2)-wma(src,sm),round(sqrt(sm)))
speed = (hullma-hullma[len])/len
accel = (speed-speed[len])/len
jerk = (accel-accel[len])/len
jounce = (jerk-jerk[len])/len
plot(speed, color=green)
plot(accel, color=purple)
plot(jerk, color=red)
plot(jounce, color=blue)
// hline(0, linestyle=solid, color=black)
if accel>0 and jerk>0 and jounce>0// and strategy.opentrades==0
    strategy.entry("openlong", strategy.long)
if accel<0 and jerk<0 and jounce<0// and strategy.opentrades==0
    strategy.entry("openshort",strategy.short)
speed_profit = (strategy.openprofit-strategy.openprofit[1])/len
accel_profit = (speed_profit-speed_profit[1])/len
jerk_profit = (accel_profit-accel_profit[1])/len
longStopPrice:=if(strategy.position_size>0)
    stopValue=ohlc4*(1-longTrailPerc)
    max(stopValue,longStopPrice[1])
else
    0
shortStopPrice:=if(strategy.position_size<0)
    stopValue=ohlc4*(1+shortTrailPerc)
    min(stopValue,shortStopPrice[1])
else
    999999
if(strategy.position_size>0)
    strategy.exit(id="closelong",stop=longStopPrice)
if(strategy.position_size<0)
    strategy.exit(id="closeshort",stop=shortStopPrice)

```

> Detail

https://www.fmz.com/strategy/438454

> Last Modified

2024-01-12 11:06:28
