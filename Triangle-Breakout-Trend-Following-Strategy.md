
> Name

Triangle-Breakout-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description


## Overview 

This is a trend following strategy. It goes long when price breaks out of an ascending triangle formation, and closes position when fast EMA crosses below medium EMA. Stop loss and take profit are also set to control risks.

## Strategy Logic

1. Use fast EMA and medium EMA to determine trend direction. Fast EMA crossing above medium EMA is long signal.

2. Use highest and lowest prices of last N bars to determine if an ascending triangle is formed. Triangle formation gives long signal.

3. After entry, when fast EMA crosses below medium EMA, it indicates trend reversal and gives exit signal.

4. Set stop loss at certain percentage below entry price for stop loss exit. 

5. Set take profit target at certain percentage above entry price for partial profit taking.

6. Use 200-day EMA to determine overall trend direction, only trade when trend is up.

## Advantage Analysis

1. Triangle formation filters false breakout and improves entry accuracy.

2. Fast EMA vs medium EMA reasonably divides trend and consolidation to avoid whipsaws.

3. Reasonable stop loss and take profit settings control single trade loss.

4. Only trading in uptrend avoids choppy periods.

## Risk Analysis

1. Too narrow triangle range may miss trends, while too wide range may increase unnecessary trades. Parameter N needs to be optimized.

2. Stop loss too close tends to get stopped out prematurely, while too wide fails to control loss. Evaluate and optimize parameter. 

3. Improper partial take profit setting may lead to profit overflow. Evaluate proper ratio.

4. Wrong trend indicator parameters may lead to wrong position direction. Multi-product backtest optimization needed.

## Improvement Directions

1. Optimize parameter N for triangle determination to find optimum value.

2. Test different EMA period combinations to improve trend accuracy.

3. Optimize stop loss and take profit parameters based on product characteristics. 

4. Add other indicators like MACD pattern, Bollinger breakout etc to improve signal quality.

5. Add reopen mechanism to extend profit when trend continues.

## Summary

The strategy is overall robust with triangle formation improving signal accuracy. Large parameter optimization space exists for further enhancement. Also try adding more auxiliary indicators or improving stop loss/take profit for greater efficacy. Overall this strategy has the potential to become a quality trend following strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|9|Number of Bars|
|v_input_2|13|fast EMA|
|v_input_3|65|slow EMA|
|v_input_4|5|Stop Loss%|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee

//@version=4

strategy(title="TrianglePoint strategy", overlay=true,pyramiding=2, default_qty_value=3, default_qty_type=strategy.fixed,    initial_capital=10000, currency=currency.USD)
// variables  BEGIN

numPeriods=input(9,title="Number of Bars")
fastEMA = input(13, title="fast EMA", minval=1)
slowEMA = input(65, title="slow EMA", minval=1)

stopLoss = input(title="Stop Loss%", defval=5, minval=1)


HH = highest(close[1],numPeriods)
LL = lowest(close[1],numPeriods)
tringlePoint =  low > LL and high < HH

fastEMAval= ema(close, fastEMA)
slowEMAval= ema(close, slowEMA)
two100EMAval= ema(close, 200)

//plot emas
plot(fastEMAval, color = color.green, linewidth = 1, transp=0)
plot(slowEMAval, color = color.orange, linewidth = 1, transp=0)
plot(two100EMAval, color = color.purple, linewidth = 2, transp=0)

longCondition=fastEMAval>two100EMAval and tringlePoint

//plotshape(triP,style=shape.triangleup,text="Buy",color=color.green,location=location.belowbar)
//plotshape(longCondition,style=shape.triangleup,text="Buy",color=color.green,location=location.belowbar)

//Entry
strategy.entry(id="TBT LE", comment="TBT LE" , long=true,  when= longCondition and strategy.position_size<1)   

//Add
strategy.entry(id="TBT LE", comment="Add" , long=true,  when= longCondition and strategy.position_size>=1 and close<strategy.position_avg_price)   


//barcolor(strategy.position_size>=1 ? color.blue : na)

//Take profit
takeProfitVal=   strategy.position_size>=1 ?  (strategy.position_avg_price * (1+(stopLoss*0.01) )) : 0.00
//strategy.close(id="TBT LE", comment="Profit Exit",  qty=strategy.position_size/2,  when=close>=takeProfitVal and close<open and close<fastEMAval)   //crossunder(close,fastEMAval)
barcolor(strategy.position_size>=1  ? (close>takeProfitVal? color.purple : color.blue): na)

//Exit
strategy.close(id="TBT LE", comment="TBT Exit",   when=crossunder(fastEMAval,slowEMAval))


//stoploss
stopLossVal=   strategy.position_size>=1 ?  (strategy.position_avg_price * (1-(stopLoss*0.01) )) : 0.00

//stopLossVal= close> (strategy.position_avg_price * (1+(stopLoss*0.01) )) ? lowest(close,numPeriods) : (strategy.position_avg_price * (1-(stopLoss*0.01) ))


strategy.close(id="TBT LE", comment="SL Exit",   when= close < stopLossVal)
```

> Detail

https://www.fmz.com/strategy/427367

> Last Modified

2023-09-20 14:24:16
