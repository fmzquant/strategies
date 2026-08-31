
> Name

EMA-and-Cumulative-Volume-Crossover-Strategy-for-Long-Short

> Author

ChaoZhang

> Strategy Description


### Overview

This strategy combines the EMA and cumulative volume indicators, generating buy and sell signals based on their crossover situations to determine trends. It belongs to a typical trend following strategy, tracking longer timeframe market directions.

### Strategy Logic

The 50-day EMA and the 100-day cumulative volume indicators are computed. When the EMA crosses above the cumulative volume from below, a buy signal is generated to go long. When the EMA crosses below the cumulative volume from above, a sell signal is generated to go short.

During positions, fixed stop loss and take profit strategies are implemented. The stop loss is set at 8% below the entry price. The take profit is set at 8% above the entry price, with partial position closure when price hits the take profit level.

### Advantage Analysis

The strategy combines the trend indicator EMA and the fund flow indicator cumulative volume, leveraging both price and volume information to effectively identify medium-long term trends. The fixed profit taking and stop loss is efficient and helps lock in partial profits while controlling risks.

The EMA period can be freely adjusted for different products. Both long and short trades are implemented for linear trading. Backtests show good performance during trending periods.

### Risk Analysis

Overreliance on moving averages may result in whipsaws during range-bound consolidations. Fixed profit taking and stop loss may also lead to premature exits or oversized stop outs. Only price and volume factors are considered without other elements.

Expanding the moving average periods could reduce false signals. Additional indicators like volatility, RSI may also help judgements. Optimizing the profit take and stop loss mechanisms, via trail stops, dynamic exits etc could be beneficial. 

### Optimization Directions

1. Test and optimize EMA parameter combinations to find optimal settings.

2. Incorporate other technical indicators to form an ensemble system.

3. Apply machine learning to predict trends and improve EMA performance. 

4. Optimize profit taking and stop loss strategies by combining trail stops, dynamic exits etc.

5. Introduce capital management modules for dynamic position sizing.

6. Customize parameters based on product characteristics to form strategy ensemble.

### Summary

The strategy's idea of combining EMA and volume for trend identification is clear. But overreliance on moving averages and fixed exits has flaws. Adding more judgement indicators and optimizing exits can improve robustness. Overall it provides an idea of using price and volume data for trend tracking.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|50|EMA Length|
|v_input_2|100|cumulative volume Period|
|v_input_3|10|Risk % of capital|
|v_input_4|8|Stop Loss|
|v_input_5|false|take partial profits  (percentage same as stop loss)|
|v_input_6|0|Trade Direction: LONG|SHORT|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-20 00:00:00
end: 2023-09-19 00:00:00
period: 2h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee

//@version=4
strategy("EMA_cumulativeVolume_crossover[Strategy]", overlay=true, pyramiding=1, default_qty_type=strategy.percent_of_equity,  default_qty_value=20, initial_capital=10000)


emaLength= input(50, title="EMA Length", minval=1, maxval=200)
cumulativePeriod = input(100,  title="cumulative volume Period", minval=1, maxval=200)


riskCapital = input(title="Risk % of capital", defval=10, minval=1)
stopLoss=input(8,title="Stop Loss",minval=1)
takePartialProfits=input(false, title="take partial profits  (percentage same as stop loss)")

tradeDirection=input(title="Trade Direction", defval="LONG", options=["LONG", "SHORT"])

avgPrice = (high + low + close) / 3
avgPriceVolume = avgPrice * volume

cumulPriceVolume = sum(avgPriceVolume, cumulativePeriod)
cumulVolume = sum(volume, cumulativePeriod)

vwapValue = cumulPriceVolume / cumulVolume

emaVal=ema(close, emaLength)

plot(emaVal, title="EMA", color=color.green,  transp=25)
plot(vwapValue, title="Cumulate Volumne / VWAP", color=color.orange,  linewidth=2, transp=25)

bgcolor(emaVal>vwapValue?color.blue:color.purple)    

//Entry--
//Echeck how many units can be purchased based on risk manage ment and stop loss
qty1 = (strategy.equity  * riskCapital / 100 ) /  (close*stopLoss/100)  

//check if cash is sufficient  to buy qty1  , if capital not available use the available capital only
qty1:= (qty1 * close >= strategy.equity ) ? (strategy.equity / close) : qty1

strategy.entry(id="LE",comment="LE", long=true, qty=qty1, when=crossover(emaVal, vwapValue)  and (tradeDirection=="LONG") )    //emaVal>vwapValue and crossover(close , emaVal)

//stoploss
stopLossVal=  strategy.position_size>=1 ?  (strategy.position_avg_price * (1-(stopLoss*0.01) )) : 0.00

//draw initil stop loss
plot(strategy.position_size>=1 ? stopLossVal : na, color = color.purple , style=plot.style_linebr,  linewidth = 2, title = "stop loss")

//partial exits
takeProfit=  strategy.position_size>=1 ?  (strategy.position_avg_price * (1+(stopLoss*0.01) )) : ( close[1] * 2 )
if(takePartialProfits==true)
    strategy.close(id="LE", comment="Partial"+tostring(close-strategy.position_avg_price, "###.##") , qty=strategy.position_size/3 , when = (tradeDirection=="LONG" ) and close>takeProfit and crossunder(close, emaVal) )    //close<close[1] and close[1]<close[2] and close[2]<close[3])
    
strategy.close(id="LE" , comment="LE Exit Points="+tostring(close-strategy.position_avg_price, "###.##"), when=crossunder(emaVal, vwapValue) and (tradeDirection=="LONG") )

strategy.close(id="LE" , comment="SL Exit Loss="+tostring(close-strategy.position_avg_price, "###.##"), when= close < stopLossVal   and (tradeDirection=="LONG") )


//for short  you dont have to wait crossodown of ema, falling is speed , so just check if close crossing down vwapVal
strategy.entry(id="SE",comment="SE", long=false, qty=qty1, when=(close<vwapValue and close<open  and close[1] < vwapValue  and close[1]<open[1] and close<close[1])  and emaVal>=vwapValue and (tradeDirection=="SHORT") )    //emaVal>vwapValue and crossover(close , emaVal)

//stoploss
stopLossValUpside=  abs(strategy.position_size)>=1 and tradeDirection=="SHORT" ?  (strategy.position_avg_price * (1+(stopLoss*0.01) )) : 0.00

//draw initil stop loss
plot(abs(strategy.position_size)>=1 and tradeDirection=="SHORT" ? stopLossValUpside : na, color = color.purple , style=plot.style_linebr,  linewidth = 2, title = "stop loss")

//partial exits
shortTakeProfit=  abs(strategy.position_size)>=1 and tradeDirection=="SHORT" ?  (strategy.position_avg_price * (1-(stopLoss*0.01) )) : 0.00
if(takePartialProfits==true)
    strategy.close(id="SE", comment="Partial" , qty=strategy.position_size/3 , when = (tradeDirection=="SHORT"   ) and  close<shortTakeProfit )  //close<takeProfit and (emaVal - close)>8 )
  
//strategy.close(id="SE" , comment="SE Exit Points="+tostring(close-strategy.position_avg_price, "###.##"), when=crossover(emaVal, vwapValue) and (tradeDirection=="SHORT") )
strategy.close(id="SE" , comment="SE Exit Points="+tostring(close-strategy.position_avg_price, "###.##"), when= abs(strategy.position_size)>=1 and ( (emaVal<vwapValue and close>vwapValue and open>vwapValue and close>open )   or (crossover(emaVal,vwapValue))  ) and (tradeDirection=="SHORT") )

strategy.close(id="SE" , comment="SL Exit Loss="+tostring(close-strategy.position_avg_price, "###.##"), when= abs(strategy.position_size)>=1 and  close > stopLossValUpside   and (tradeDirection=="SHORT"   ) )



```

> Detail

https://www.fmz.com/strategy/427354

> Last Modified

2023-09-20 11:48:34
