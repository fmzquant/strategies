
> Name

基于RSI指标和200日SMA滤波器的间接强度指数策略Indirect-Strength-Index-Strategy-Based-on-RSI-Indicator-and-200-day-SMA-Filter

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b091ed5e4a648e54f7.png)

## Overview

This strategy mainly uses the Relative Strength Index (RSI) indicator to judge overbought and oversold situations, and uses the 200-day Simple Moving Average (200 Day SMA) as the main price trend filter. On the basis of determining the trend direction, it uses the RSI indicator to find better entry and exit timing to achieve profitability. Compared with using the RSI indicator alone, this strategy increases trend judgment and can more accurately grasp market trends, chase rises and sell declines in a bull market, and do the opposite in a bear market, thereby obtaining higher strategy returns.

## Strategy Principle 

The strategy consists mainly of two parts: the RSI indicator and the 200-day SMA filter.

The RSI indicator section mainly judges whether the price has entered the overbought or oversold zone. Its calculation formula is:

RSI = 100 - 100 / (1 + Average gain of up days in RSI / Average loss of down days in RSI)

According to empirical parameters, when RSI < 30, it is oversold; when >70, it is overbought.

The 200-day SMA filter mainly judges the overall market trend direction. When the price is above the 200-day SMA, it is a bull market, otherwise it is a bear market.

Based on the above two judgments, the strategy has the following entry and exit logic:

Long entry: RSI < 45 and Close price > 200-day SMA   

Long exit: RSI > 75 and Close price > 200-day SMA  

Short entry: RSI > 65 and Close price < 200-day SMA

Short exit: RSI < 25 and Close price < 200-day SMA

Thus, the strategy uses the precise judgment of the RSI indicator to find better entry and exit points in the overall trend and thereby achieve higher returns.

## Advantage Analysis

The biggest advantage of this strategy is using the combination of the RSI indicator and 200-day SMA filter to make the strategy more stable and precise:

1. The 200-day SMA effectively judges the overall market trend and avoids misjudgments of single RSI indicators  
2. The RSI indicator can find better entry and exit points within the overall market trend
3. The strategy operation is simple and easy to implement

In addition, the strategy also has the following advantages:  

1. Applicable to various products including stock indices, cryptocurrencies and precious metals  
2. High capital utilization efficiency
3. Can cautiously add a stop loss to effectively control single losses

## Risk Analysis  

The strategy also has some risks:

1. Sudden adjustments in the overall market may lead to greater losses  
2. There is some degree of lag in RSI and SMA indicators  
3. High trading frequency leads to higher trading costs

To control these risks, the following measures can be taken:

1. Adjust position sizing appropriately to guard against impacts of unexpected events  
2. Optimize RSI and SMA parameters to reduce lag probability   
3. Adjust trading frequency appropriately to reduce trading costs

## Optimization Directions   

The strategy can be optimized in the following aspects:   

1. Dynamically adjust RSI parameters based on market volatility  
2. Test whether other moving average indicators like EMA can bring better results
3. Increase automatic stop loss mechanism   
4. Add position sizing module to dynamically adjust positions based on capital  
5. Optimize entry and exit logic to test if better returns can be achieved 

## Conclusion

The overall performance of this strategy is good, with the advantages of accurate judgment, simple operation, and wide applicability. After adding stop loss and position sizing, it can be carefully run in live trading. Follow-up aspects like parameter optimization, stop loss optimization, position sizing can further enhance the strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|RSI lenght|
|v_input_int_2|200|  SMA Lenght|
|v_input_float_1|5| stop loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-04 00:00:00
end: 2023-12-11 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This work is licensed under a Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) https://creativecommons.org/licenses/by-nc-sa/4.0/
// © LuxAlgo

//@version=5

strategy('Relative Strength Index Extremes with 200-Day Moving Average Filte', overlay=true, pyramiding=1, initial_capital=10000, default_qty_type=strategy.cash, default_qty_value=36000, calc_on_order_fills=false, slippage=0, commission_type=strategy.commission.percent, commission_value=0.01)

// Rsi
rsi_lenght = input.int(14, title='RSI lenght', minval=0)
rsi_up = ta.rma(math.max(ta.change(close), 0), rsi_lenght)
rsi_down = ta.rma(-math.min(ta.change(close), 0), rsi_lenght)
rsi_value = rsi_down == 0 ? 100 : rsi_up == 0 ? 0 : 100 - 100 / (1 + rsi_up / rsi_down)


//Sma
Length1 = input.int(200, title='  SMA Lenght', minval=1)
SMA1 = ta.sma(close, Length1)

//Strategy Logic

Long = rsi_value < 45 and close > SMA1
Long_exit = rsi_value > 75 and close > SMA1

Short = rsi_value > 65 and close < SMA1
Short_exit = rsi_value < 25 and close < SMA1


if Long
    strategy.entry('Long', strategy.long)

if Short
    strategy.entry('Short', strategy.short)

strategy.close_all(Long_exit or Short_exit)

pera(pcnt) =>
    strategy.position_size != 0 ? math.round(pcnt / 100 * strategy.position_avg_price / syminfo.mintick) : float(na)
stoploss = input.float(title=' stop loss', defval=5, minval=0.5)
los = pera(stoploss)

strategy.exit('SL', loss=los)



//by wielkieef


```

> Detail

https://www.fmz.com/strategy/435127

> Last Modified

2023-12-12 15:26:06
