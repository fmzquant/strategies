
> Name

Stop-Loss-and-Take-Profit-Strategy-Based-on-Doji-Pattern

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1151d70d1bfa465f8d0.png)

## Overview

This strategy is based on the Doji pattern. When a Doji pattern appears, a buy stop order is placed between the high of the Doji and the high of the previous candle, and a sell stop order is placed between the low of the Doji and the low of the previous candle. When the price triggers the stop orders, you can choose to exit with fixed stop loss and take profit, or use the highest and lowest price of the Doji pattern as stop loss and take profit. This strategy works well on higher timeframes like daily and weekly to filter out noise.  

## Strategy Logic

When a Doji pattern appears, it indicates a change in the supply and demand relationship, with forces becoming more balanced, which may lead to a price reversal. This strategy takes advantage of the price reversal signal indicated by Doji to capture opportunities through stop orders. Specifically, the criteria for determining a Doji pattern is:

```
body=close-open 
range=high-low
abody=abs(body)
ratio=abody/range  
data=(abs(open - close) <= (high - low) * Doji)
```

If abs(open-close) <= (high-low)*Doji parameter, it is considered a Doji pattern, and stop orders will be placed. The position of the stop orders is:  

```
longDist= longcandle[1] and range[1]>range? high: max(high,high[1])
shortDist= longcandle[1] and range[1]>range? low: min(low,low[1]) 
```

If the body of the previous candle is large, the buy stop order is placed between the high of the Doji and the high of the previous candle. If the previous candle has a small body, the buy stop order is placed at the high of the Doji. The sell stop order follows the same logic.

There are two options for exits:  

1. Fixed stop loss and take profit

```
strategy.exit("exit buy","buy stop",loss=SL, profit=TP, when=Use_SL_TP)
```

2. Use highest and lowest price of Doji as stop loss and take profit  

```
strategy.close("buy stop",when=not Use_SL_TP and close<dojilow) 
```

## Advantage Analysis 

The advantages of this strategy are:  

1. Simple to implement.  
2. Takes advantage of efficient price reversal signals from Doji pattern.
3. Customizable stop loss and take profit parameters to control risk.  
4. Works well on higher timeframes to filter out noise.

## Risk Analysis   

There are some risks with this strategy:

1. Doji pattern does not always lead to price reversal, may face stop loss. Solution is to reasonably set stop loss distance to limit loss per trade.
2. Too much noise in Doji signals on lower timeframes. Should only run on higher timeframes like daily and weekly.
3. Risk of unlimited losses without stop loss and take profit. Must use them properly.  

## Optimization Directions

Some ways to optimize the strategy:

1. Optimize Doji parameter for different trading instruments.  
2. Test different combinations of stop loss and take profit.
3. Dynamic stop loss based on ATR.
4. Combine with other indicators to determine optimal entry.


## Conclusion  

The overall performance of this strategy is good. By capturing Doji price reversal opportunities, it can generate decent trading signals. Also simple to implement and applicable across multiple instruments. With continuous testing and optimizations, better results can be expected.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|Use stop loss and take profit?|
|v_input_2|200|Take Profit in ticks|
|v_input_3|200|Stop Loss in tiks|
|v_input_4|0.05|Doji size|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-02 00:00:00
end: 2024-02-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//This is a simple strategy based on Doji star candlestick
//It places two orders: buy stop at doji star high or previous candle high and sell stop at doji star low or previous candle low.
//This strategy works very well with high time frames like Weekly TF because it eliminates the noise in doji formation.
//

strategy("Doji strategy W", overlay=true, calc_on_every_tick=true, pyramiding=0,default_qty_type=strategy.percent_of_equity,default_qty_value=100,currency=currency.USD)

//INPUTS
//MinDistance=input(100,'Minimum distance in ticks')
Use_SL_TP=input(true,'Use stop loss and take profit?')
TP=input(200,'Take Profit in ticks')
SL=input(200,'Stop Loss in tiks')
Doji = input(0.05, minval=0.01, title="Doji size", step=0.01)

//VARIABILI
body=close-open
range=high-low
abody=abs(body)
ratio=abody/range
longcandle= (ratio>0.6)

//Doji
data=(abs(open - close) <= (high - low) * Doji)
plotchar(data, title="Doji", text='Doji', color=black)
longDist= longcandle[1] and range[1]>range? high: max(high,high[1])
shortDist= longcandle[1] and range[1]>range? low: min(low,low[1])
dojilow=data==1?low:na
dojihigh=data==1?high:na

goStar=data==1?true:false
//////////////////////////////////////////////////////////////////

//STRATEGY

strategy.order("buy stop",true,stop=longDist,  oca_name="Dojy Entry",when=goStar)
strategy.order("sell stop",false,stop=shortDist, oca_name="Dojy Entry",when=goStar)

strategy.exit("exit buy","buy stop",loss=SL, profit=TP, when=Use_SL_TP)
strategy.exit("exit sell","sell stop",loss=SL,profit=TP, when=Use_SL_TP)

strategy.close("buy stop",when=not Use_SL_TP and close<dojilow)
strategy.exit("exit buy","buy stop",profit=TP, when=not Use_SL_TP)
strategy.close("sell stop",when=not Use_SL_TP and close>dojihigh)
strategy.exit("exit sell","sell stop",profit=TP, when=not Use_SL_TP)
    
    


```

> Detail

https://www.fmz.com/strategy/440857

> Last Modified

2024-02-02 17:17:38
