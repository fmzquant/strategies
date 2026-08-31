
> Name

双向趋势追踪策略Dual-Trend-Tracking-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview

This strategy is based on the Aroon indicator to identify and track trends in both directions. The Aroon indicator can effectively determine the direction of market trends. Combined with the RSI indicator, it forms a relatively complete tracking strategy.

## Strategy Principle 

1. Use the Aroon indicator to determine the direction of price trends. Above 0 line indicates an upward trend, while below 0 line a downward trend.

2. When the Aroon indicator crosses above 0 line from below, a buy signal is triggered.

3. If already having a position, and the close is lower than the buy price, while RSI is below 30, it is considered oversold, additional buy orders will be placed.

4. When the Aroon indicator crosses below 0 line from above, a full exit signal is triggered. 

5. A 5% stop loss is set. If the loss exceeds this point, a stop loss exit is triggered.

## Advantage Analysis

1. Using the Aroon indicator to determine the trend direction can effectively capture market rotation points.

2. The RSI indicator helps identify overbought and oversold areas, avoiding chasing new highs and selling lows during market turns.

3. Trading in both directions allows profiting in both upward and downward markets. 

4. Setting a stop loss helps control risks.

## Risk Analysis 

1. The Aroon indicator has a lagging effect, which may miss short-term and sudden reversals.

2. It cannot effectively handle range-bound markets, leading to unnecessary trades.

3. Trading in both directions increases trade frequency and commission costs.

4. Parameters need proper tuning to adapt to different timeframes and products.

## Optimization Directions

1. Combine with other indicators to filter signals and reduce errors caused by lagging.

2. Increase quantitative research to optimize parameters for different products.

3. Add profit taking strategies to increase profit factor. 

4. Consider only trading when the trend is clear to reduce ineffective trades.

## Summary

This strategy integrates the Aroon and RSI indicators to form a relatively complete dual-directional trend trading system. But further optimization of parameters and combining with other filtering indicators are still needed to reduce errors. With proper parameter tuning and risk control, this strategy has the potential to achieve relatively steady excess returns.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|169|Aroon Length|
|v_input_2|13|RSI Length|
|v_input_3|5|Stop Loss%|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-09 00:00:00
end: 2023-09-12 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee

//@version=4
// strategy(title="Aroon Oscillator Strategy", overlay=false, pyramiding=2,    initial_capital=10000, currency=currency.USD)  //default_qty_value=10, default_qty_type=strategy.fixed, 

//variables BEGIN
aroonLength=input(169,title="Aroon Length")   //square root of 13
rsiLength=input(13, title="RSI Length")
stopLoss = input(title="Stop Loss%", defval=5, minval=1)
//variables  END

//RSI 
rsi13=rsi(close,rsiLength)




// Drawings

//Aroon oscillator

arronUpper = 100 * (highestbars(high, aroonLength+1) + aroonLength)/aroonLength
aroonLower = 100 * (lowestbars(low, aroonLength+1) + aroonLength)/aroonLength

aroonOsc  = arronUpper - aroonLower

aroonMidpoint = 0
oscPlot = plot(aroonOsc, color=color.green)
midLine= plot(aroonMidpoint, color=color.green)
topLine = plot(90,style=plot.style_circles, color=color.green)
bottomLine = plot(-90,style=plot.style_circles, color=color.red)

fill(oscPlot, midLine, color=aroonOsc>0?color.green:color.red, transp=50)
fill(topLine,bottomLine, color=color.blue)


// RSI 
//plot(rsi13, title="RSI", linewidth=2, color=color.purple)
//hline(50, title="Middle Line", linestyle=hline.style_dotted)
//obLevel = hline(80, title="Overbought", linestyle=hline.style_dotted)
//osLevel = hline(30, title="Oversold", linestyle=hline.style_dotted)
//fill(obLevel, osLevel, title="Background", color=rsi13 >=30 ? color.green:color.purple, transp=65)  // longTermRSI >=50


//Entry--

strategy.entry(id="Long Entry", comment="LE",  long=true,  when= crossover(aroonOsc,0)   )     //crossover(close,ema34)  //and close>ema34  //crossover(rsi5Val,rsiBuyLine)

//Add
if(strategy.position_size>=1 and close < strategy.position_avg_price and crossover(rsi13,30))
    strategy.order(id="Long Entry", comment="Add", long=true )     //crossover(close,ema34)  //and close>ema34  //crossover(rsi5Val,rsiBuyLine)  --


stopLossVal= abs(strategy.position_size)>1 ? strategy.position_avg_price*(1-0.5) : 0.00 


//close partial
strategy.close(id="Long Entry", comment="Partial X",  qty=strategy.position_size/3, when=abs(strategy.position_size)>=1 and crossunder(aroonOsc, 90) )   //close<ema55 and rsi5Val<20 //ema34<ema55 


//close All
strategy.close(id="Long Entry", comment="Exit All",  when=abs(strategy.position_size)>=1 and crossunder(aroonOsc, 0) )   //close<ema55 and rsi5Val<20 //ema34<ema55  //close<ema89

//close All on stop loss
strategy.close(id="Long Entry", comment="Stoploss X",  when=abs(strategy.position_size)>=1 and close < stopLossVal )   //close<ema55 and rsi5Val<20 //ema34<ema55  //close<ema89

```

> Detail

https://www.fmz.com/strategy/427063

> Last Modified

2023-09-17 18:20:27
