
> Name

连续高点突破策略N-Consecutive-Higher-Closes-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1588c4e5d3b5775d3a4.png)



## Overview

The core logic of this strategy is to detect whether the closing price of N consecutive candles keeps rising. If so, go long; otherwise, close position. This can capture the uptrend of stock price and make profit.

## Strategy Principle  

The core indicator of this strategy is nCounter. It compares the closing price and opening price of current candle to judge whether the price rises.   

Specifically, if close[1]>=open[1], nCounter adds 1, indicating rise; if close[1]<open[1], nCounter resets to 0. Thus it can count the number of consecutive rising candles.

Then compare nCounter with parameter nLength. When nCounter>=nLength, output signal C1=1; otherwise C1=0. Here nLength is the number of consecutive rising candles we defined to generate signal.  

After receiving C1=1 signal, if there is no current position, go long; if already in long position, keep holding.

In addition, this strategy sets stop loss and take profit conditions. If price falls below entry price by certain percentage, stop loss exits position; if rises above entry price by certain percentage, take profit.

## Advantage Analysis

This is a typical trend following strategy with below strengths:

1. It can seize the uptrend opportunities of stock price, suitable as long strategy
2. N consecutive rises as entry signal can effectively filter false breakout and reduce unnecessary trades  
3. Setting stop loss and take profit can limit downside risk and lock in profits
4. The logic is simple and clear, easy to understand and modify
5. Trading frequency can be controlled by adjusting nLength parameter

## Risk Analysis  

There are some risks of this strategy, mainly in below aspects:  

1. If uptrend reverses, failure to stop loss in time may lead to huge loss
2. If nLength set too large, good entry opportunities may be missed
3. It does not consider market environment. Holding long position when market crashes can lead to extra loss
4. Using unified parameters without adjusting based on different stock characteristics may not apply to some stocks  

To reduce these risks, we can set more strict stop loss, optimize nLength, add market condition rules, or test parameters separately for different stocks. Of course no strategy can completely avoid losses. It needs to match risk appetite of traders.

## Optimization Directions

Considering above risks, we can optimize the strategy from below aspects:  

1. Add moving stop loss or trailing stop loss functions. They can adjust stop loss point accordingly based on price change to reduce loss risk
2. Optimize nLength parameter. Respectively test for different types of stocks to find out more suitable parameter values  
3. Add market environment judgement. For example pause trading when market crashes to avoid extra losses in bear market
4. Add other factors like volume as auxiliary conditions. For example require enlarged volume during uptrend to ensure breakout validity
5. Set drawdown control like max allowed loss percentage, max consecutive loss times etc. to stop loss automatically controlling overall loss

## Conclusion  

This strategy captures uptrend by detecting N consecutive rising candles. It can effectively conduct trend following. The advantages are simple logic, flexible parameter tuning, filtering false breakout. But there are also some risks. It needs to add modules like stop loss, parameter optimization, environment judgement to improve. Overall speaking, this strategy provides a valuable basic model for quantitative trading. It can become a powerful trading tool after continuous improvement.

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|4|nLength|
|v_input_2|20|Take Profit pip|
|v_input_3|10|Stop Loss pip|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-01 00:00:00
end: 2023-12-07 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
////////////////////////////////////////////////////////////
//  Copyright by HPotter v1.0 05/02/2020
// Evaluates for n number of consecutive higher closes. Returns a value 
// of 1 when the condition is true or 0 when false.
//
// WARNING:
// - For purpose educate only
// - This script to change bars colors.
////////////////////////////////////////////////////////////
strategy(title="N Bars Up", shorttitle="NBU Backtest", overlay = false) 
nLength = input(4, minval=1)
input_takeprofit = input(20, title="Take Profit pip", step=0.01)
input_stoploss = input(10, title="Stop Loss pip", step=0.01)
nCounter = 0
nCounter := iff(close[1] >= open[1], nz(nCounter[1],0)+1,
             iff(close[1] < open[1], 0, nCounter))
C1 = iff(nCounter >= nLength, 1, 0)
posprice = 0.0
pos = 0
barcolor(nz(pos[1], 0) == -1 ? color.red: nz(pos[1], 0) == 1 ? color.green : color.blue ) 
posprice := iff(C1== 1, close, nz(posprice[1], 0)) 
pos := iff(posprice > 0, 1, 0)
if (pos == 0) 
    strategy.close_all()
if (pos == 1)
    strategy.entry("Long", strategy.long)
posprice := iff(low <= posprice - input_stoploss and posprice > 0, 0 ,  nz(posprice, 0))
posprice := iff(high >= posprice + input_takeprofit and posprice > 0, 0 ,  nz(posprice, 0))
plot(C1, title='NBU', color=color.green)
```

> Detail

https://www.fmz.com/strategy/434674

> Last Modified

2023-12-08 10:50:54
