
> Name

基于波动带反转的长线量化策略Long-Term-Quantitative-Strategy-Based-on-Volatility-Bands-Reversal

> Author

ChaoZhang

> Strategy Description


[trans]  

本文将详细介绍一种利用波动带识别反转进行长线量化交易的策略。该策略通过判断价格突破波动带进行买入,实现顺势跟踪操作。

一、策略原理

该策略的核心指标是波动带,具体计算步骤是:

1. 计算中轨、上轨和下轨的移动均线;

2. 当价格由下向上突破下轨时,产生买入信号;

3. 当价格突破上轨时,产生卖出信号;

4. 可选择在卖出信号时或突破上轨时止盈退出。

5. 止损设置为固定百分比止损。

这样,它可以在价格处于下行阶段时买入,随后通过止盈或止损退出,实现反转操作。

二、策略优势

该策略最大的优势是利用波动带识别反转点位,这是一种较为成熟的技术分析方法。

另一优势是设定了止损机制,可以控制单笔交易的风险。

最后,分批建仓也有助于在反转后分阶段获利。

三、潜在风险

但该策略也存在一些潜在问题:

首先,移动均线计算存在滞后,可能错过最佳买入时机。

其次,止盈和止损点的设置需要仔细测试优化。

最后,长线持仓需要承受一定的回撤压力。

四、内容总结

本文详细介绍了一种利用波动带反转的长线量化交易策略。它可以有效识别价格反转机会,实现长线持仓。但也需要防控移动均线滞后等问题,并优化止盈止损点。总体来说,它提供了一种成熟的长线交易方法。

||

This article explains in detail a long-term quantitative trading strategy using volatility bands to identify reversals. It takes long positions when prices break through the lower band to ride the upside move.

I. Strategy Logic

The core indicator is volatility bands, calculated as: 

1. Compute middle, upper and lower moving average bands.

2. A buy signal is generated when price breaks up through the lower band. 

3. A sell signal is generated when price breaks the upper band.

4. Exits can be on sell signals or upper band breaks. 

5. Stop loss is a fixed percentage.

This allows buying into downward phases, then exiting via profit taking or stops to capitalize on reversals.

II. Advantages of the Strategy

The biggest advantage is using volatility bands to identify reversal points, a mature technical analysis technique.

Another advantage is the stop loss mechanism to control risk per trade.

Finally, pyramiding also helps phase in profits after reversals. 

III. Potential Risks

However, some potential issues exist:

Firstly, moving averages have lag and may cause missed best entry timing.

Secondly, profit taking and stop loss levels require careful optimization. 

Finally, long holding periods mean enduring certain drawdowns.

IV. Summary

In summary, this article has explained a long-term quantitative trading strategy using volatility bands to capitalize on reversals. It can effectively detect reversal opportunities for long-term holdings. But risks like MA lags need prevention, and optimization is required for exits. Overall it provides a robust long-term trading approach.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|8|Band Average|
|v_input_2|13|Volatility Period|
|v_input_3|3.33|Deviation Factor|
|v_input_4|0.9|Lower Band Adjustment|
|v_input_5|10|Risk % of capital|
|v_input_6|6|Stop Loss|
|v_input_7|0|Exit on: touch_upperband|Sell_Signal|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-07 00:00:00
end: 2023-09-12 04:00:00
period: 14m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © ediks123

//strategy logic  has been borrowed from ceyhun  and tweaked the settings for back testing

//@version=4


//SPY 4 hrs settings 8, 13 , 3.33 , 0.9  on 4 hrs chart
//QQQ above settings is good , but 13, 13 has less number of bars 
//QQQ 4 hrs settings 13, 13 , 3.33 , 0.9  on 4 hrs chart

strategy(title="Volatility Bands Reversal Strategy",  shorttitle="VolatilityBandReversal" , overlay=true, pyramiding=2,     default_qty_type=strategy.percent_of_equity,  default_qty_value=20, initial_capital=10000, currency=currency.USD)  //default_qty_value=10, default_qty_type=strategy.fixed,


av = input(8, title="Band Average")
vp = input(13, title="Volatility Period")
df = input(3.33,title="Deviation Factor",minval=0.1)
lba = input(0.9,title="Lower Band Adjustment",minval=0.1)

riskCapital = input(title="Risk % of capital", defval=10, minval=1)
stopLoss=input(6,title="Stop Loss",minval=1)

exitOn=input(title="Exit on", defval="touch_upperband", options=["Sell_Signal", "touch_upperband"])



src = hlc3
typical = src >= src[1] ? src - low[1] : src[1] - low
deviation = sum( typical , vp )/ vp * df
devHigh = ema(deviation, av)
devLow = lba * devHigh
medianAvg = ema(src, av)

emaMediaAvg=ema(medianAvg, av)

upperBandVal= emaMediaAvg + devHigh
lowerbandVal= emaMediaAvg - devLow
MidLineVal=sma(medianAvg, av)

UpperBand = plot ( upperBandVal, color=#EE82EE, linewidth=2, title="UpperBand")
LowerBand = plot ( lowerbandVal , color=#EE82EE, linewidth=2, title="LowerBand")
MidLine = plot (MidLineVal, color=color.blue, linewidth=2, title="MidLine")
buyLine = plot ( (lowerbandVal + MidLineVal )/2  , color=color.blue, title="BuyLine")

up=ema(medianAvg, av) + devHigh
down=ema(medianAvg, av) - devLow


ema50=ema(hlc3,50)
plot ( ema50, color=color.orange, linewidth=2, title="ema 50")

//outer deviation

//deviation1 = sum( typical , vp )/ vp * 4
//devHigh1 = ema(deviation, av)
//devLow1 = lba * devHigh
//medianAvg1 = ema(src, av)

//UpperBand1 = plot (emaMediaAvg + devHigh1, color=color.red, linewidth=3, title="UpperBand1")
//LowerBand1 = plot (emaMediaAvg - devLow1, color=color.red, linewidth=3, title="LowerBand1")
//



///Entry Rules
//1)First candle close below the Lower Band of the volatility Band
//2)Second candle close above the lower band
//3)Third Candle closes above previous candle
Buy = close[2] < down[2] and close[1]>down[1] and close>close[1]
//plotshape(Buy,color=color.blue,style=shape.arrowup,location=location.belowbar, text="Buy")
//barcolor(close[2] < down[2] and close[1]>down[1] and close>close[1] ? color.blue :na )
//bgcolor(close[2] < down[2] and close[1]>down[1] and close>close[1] ? color.green :na )

///Exit Rules
//1)One can have a static stops initially followed by an trailing stop based on the risk the people are willing to take
//2)One can exit with human based decisions or predefined target exits. Choice of deciding the stop loss and profit targets are left to the readers.
Sell = close[2] > up[2] and close[1]<up[1] and close<close[1]
//plotshape(Sell,color=color.red,style=shape.arrowup,text="Sell")
barcolor(close[2] > up[2] and close[1]<up[1] and close<close[1] ? color.yellow :na )
bgcolor(close[2] > up[2] and close[1]<up[1] and close<close[1] ? color.red :na )

//Buyer = crossover(close,Buy)
//Seller = crossunder(close,Sell)

//alertcondition(Buyer, title="Buy Signal", message="Buy")
//alertcondition(Seller, title="Sell Signal", message="Sell")


//Entry--
//Echeck how many units can be purchased based on risk manage ment and stop loss
qty1 = (strategy.equity  * riskCapital / 100 ) /  (close*stopLoss/100)  

//check if cash is sufficient  to buy qty1  , if capital not available use the available capital only
qty1:= (qty1 * close >= strategy.equity ) ? (strategy.equity / close) : qty1

strategy.entry(id="vbLE", long=true, qty=qty1, when=Buy)

bgcolor(strategy.position_size>=1 ? color.blue : na)
// stop loss exit
stopLossVal = strategy.position_size>=1 ?  strategy.position_avg_price * ( 1 - (stopLoss/100) ) : 0.00
//draw initil stop loss
plot(strategy.position_size>=1 ? stopLossVal : na, color = color.purple , style=plot.style_linebr,  linewidth = 2, title = "stop loss") //, trackprice=true)


strategy.close(id="vbLE", comment="SL exit Loss is  "+tostring(close - strategy.position_avg_price,  "###.##") , when=abs(strategy.position_size)>=1 and close < stopLossVal )   




//close on Sell_Signal
strategy.close(id="vbLE", comment="Profit is : "+tostring(close - strategy.position_avg_price,  "###.##") , when=strategy.position_size>=1 and  exitOn=="Sell_Signal"  and Sell)

//close on touch_upperband
strategy.close(id="vbLE", comment="Profit is : "+tostring(close - strategy.position_avg_price,  "###.##") , when=strategy.position_size>=1 and  exitOn=="touch_upperband"  and (crossover(close, up) or crossover(high, up)))
```

> Detail

https://www.fmz.com/strategy/426882

> Last Modified

2023-09-15 11:34:45
