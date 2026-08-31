
> Name

Exponential-Smoothed-Stochastic-Oscillator-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c66de221f3e3936631.png)

## Overview
The Exponential Smoothed Stochastic Oscillator strategy is a modified version of the traditional stochastic indicator by adding an exponential weight parameter to adjust the sensitivity of the stochastic and generate trading signals. It goes long when the indicator crosses over from overbought levels and goes short when the indicator crosses under from oversold levels. The optimized strategy can become a very stable trend following strategy.  

## Strategy Logic
The core of the Exponential Smoothed Stochastic strategy lies in the exponential weight parameter ex. The traditional stochastic is calculated as: 

```
s = 100 * (close - lowest low) / (highest high - lowest low)
```

With the exponential parameter, the formula becomes:  

```
exp = ex<10? (ex)/(10-ex) : 99   

s = 100 * (close - lowest low) / (highest high - lowest low)  

ks = s>50? math.pow(math.abs(s-50),exp)/math.pow(50,exp-1)+50   
       :-math.pow(math.abs(s-50),exp)/math.pow(50,exp-1)+50  
```

By adjusting exp, the influence of s on ks can be changed. Increasing exp makes the indicator less sensitive while decreasing exp makes it more sensitive.  

Buy signals are generated when ks crosses over from overbought levels. Sell signals are generated when ks crosses under from oversold levels.  

## Advantages
Compared to the traditional stochastic strategy, the Exponential Smoothed Stochastic Oscillator strategy has the following advantages:  

1. The sensitivity of the stochastic can be freely adjusted by changing the exponential weight to control trading frequency.  
2. The increased exponential weight can filter out some noise and generate more stable trading signals.
3. Combining indicators from different timeframes can achieve multi-timeframe confirmation and improve signal reliability.   

## Risks 
The Exponential Smoothed Stochastic Oscillator strategy also has the following risks:   

1. With a too large exponential weight, some trading opportunities may be missed due to excessive signal filtering.  
2. The indicator is prone to noise and wrong crossovers. Parameters need to be tuned to ensure reliable crossover signals.   
3. The optimal parameter range needs to be identified for different markets. Improper parameter settings may affect strategy performance.   

## Enhancement Areas
The Exponential Smoothed Stochastic Oscillator strategy can be optimized from the following aspects:  

1. Combine with other indicators like MACD and moving average to filter signals and reduce false signals.  
2. Add stop loss mechanisms to effectively control risks.   
3. Optimize the exponential weight parameter to find the optimal parameter combinations. Different parameters can be used for different markets.  
4. Increase composability, for example, combine with seasonal indicators, market structure indicators to further improve stability.   

## Conclusion  
The Exponential Smoothed Stochastic Oscillator strategy generates more reliable trading signals by adjusting the sensitivity of the stochastic indicator. It can effectively track medium-to-long term trends and can also be optimized into a short-term strategy. With further composability and parameter optimization, it has the potential to achieve more consistent profitable returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|length|
|v_input_int_2|2|exp|
|v_input_int_3|20|bot|
|v_input_int_4|80|top|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-11 00:00:00
end: 2024-01-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © faytterro

//@version=5
strategy("Exponential Stochastic Strategy", overlay=false, default_qty_type=strategy.percent_of_equity, default_qty_value=100)
len=input.int(14, "length") 
ex=input.int(2, title="exp", minval=1, maxval=10)
exp= ex<10? (ex)/(10-ex) : 99
s=100 * (close - ta.lowest(low, len)) / (ta.highest(high, len) - ta.lowest(low, len))
ks=s>50? math.pow(math.abs(s-50),exp)/math.pow(50,exp-1)+50 :
 -math.pow(math.abs(s-50),exp)/math.pow(50,exp-1)+50
plot(ks, color= color.white)
bot=input.int(20)
top=input.int(80)
longCondition = ta.crossover(ks, bot) and bar_index>0
if (longCondition)
    strategy.entry("My Long Entry Id", strategy.long)

shortCondition = ta.crossunder(ks, top) and bar_index>0
if (shortCondition)
    strategy.entry("My Short Entry Id", strategy.short)
//    strategy.close("My Long Entry Id")
alertcondition(longCondition, title = "buy")
alertcondition(shortCondition, title = "sell")
h1=hline(top)
h2=hline(bot)
h3=hline(100)
h4=hline(0)
fill(h1,h3, color= color.rgb(255,0,0,200-top*2))
fill(h2,h4, color= color.rgb(0,255,0,bot*2))
```

> Detail

https://www.fmz.com/strategy/439246

> Last Modified

2024-01-18 15:53:41
