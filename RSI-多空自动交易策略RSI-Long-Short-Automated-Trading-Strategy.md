
> Name

RSI-多空自动交易策略RSI-Long-Short-Automated-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/b853ca8976d8b3b43d.png)


## Overview

This strategy designs an automated trading system for long and short based on the Relative Strength Index (RSI) indicator. It can automatically generate long and short signals when RSI reaches overbought or oversold levels and conduct automated trading.

## Strategy Logic

The strategy calculates the RSI values in the range of 0-100 based on the price rises and falls within a certain period. When RSI is below 30, it is oversold status. When RSI is above 70, it is overbought status. According to this rule, the strategy automatically goes long when RSI reaches the oversold zone and goes short when RSI reaches the overbought zone. 

Specifically, the strategy first calculates the 15-period RSI. When the RSI falls below 20, it is considered oversold. At this time, when the price breaks above the 200-day moving average, a long position is opened. When the RSI rises above 80, it is considered overbought. At this time, a short position is opened. After going long or short, take profit and stop loss are set to exit positions.

In addition, the strategy draws corresponding landmark lines and labels when price signals occur to make trading signals more intuitive.

## Advantages of the Strategy

- The strategy idea is clear and easy to understand and implement
- Based on the RSI indicator, the judgment of overbought and oversold is accurate
- Fully automated trading without manual intervention 
- Take profit and stop loss set to effectively control risks
- Trading signals intuitive and easy to monitor

## Risks of the Strategy

- RSI indicator has some lagging, may cause misjudgement
- Fixed overbought and oversold thresholds are not suitable for all products  
- Improper stop loss setting may cause greater losses
- Trading with the major trend in trending markets may cause losses

Risk control measures include: optimizing RSI parameters, adjusting overbought and oversold thresholds to suit different products, reasonably setting stop loss, combining with trend indicators to avoid trading against the trend.

## Directions for Strategy Optimization

- Optimize RSI parameters to improve the accuracy of judging overbought and oversold
- Confirm trading signals with other indicators such as KDJ, MACD etc.
- Optimize stop loss setting according to market conditions
- Add trend judgment to avoid reverse operations
- Set equity curve tracking stop loss
- Develop risk control module to control single and overall risks

## Summary 

Overall this is an automated trading strategy using the RSI indicator to judge overbought and oversold conditions. It generates trading signals when RSI reaches extreme overbought or oversold levels, and can automatically conduct long and short trading. The strategy idea is simple and clear, easy to implement, and suitable as a basic automated trading strategy. But RSI indicator has some lagging, so it is recommended to optimize it with other indicators to improve signal accuracy. In addition, attention should be paid to risk control, optimizing the stop loss mechanism, developing risk control modules to reduce trading risks. If optimized and verified in live trading, the strategy can become an effective automated system for long and short trading.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_timeframe_1|0|Resolution: 15|5|1H|D|W|M|
|v_input_1|1600|Reward|
|v_input_2|1600|Risk|
|v_input_3|5|length|
|v_input_4|30|overSold|
|v_input_5|70|overBought|
|v_input_6|200|EMA|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-22 00:00:00
end: 2023-10-29 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("RSI Improved strategy", overlay=true)
higherTF1 = input.timeframe('15' , "Resolution", options = ['5', '15', '1H', 'D', 'W', 'M'])
dailyopen = request.security(syminfo.tickerid, higherTF1, close)

Reward = input(1600)
Risk = input(1600)

length = input( 5 )
overSold = input( 30 )
overBought = input( 70 )
EMA = input(200)
price = close

vrsi = ta.rsi(price, length)

RSIlowest =  vrsi[1] > vrsi ? true : false
RSIhighest = vrsi[1] < vrsi ? true : false

//ro = ta.crossunder(vrsi, 20)
//ru = ta.crossover(vrsi, 80)

co = ta.crossunder(vrsi, overSold)
cu = ta.crossunder(vrsi, overBought)

plot(ta.ema(close, EMA))
plot(ta.ema(close, 50), color = color.orange)

UponEMA = close > ta.ema(close, EMA) ? true : false
belowEMA = close < ta.ema(close, EMA) ? true : false
//transfer 'float' to 'int' to 'string'
r = int(vrsi)
value = str.tostring(r)

m = int(strategy.openprofit)
money = str.tostring(m)
if (not na(vrsi))
	//when price stand up on 200ema and rsi is at oversold area, open long position 
//	if (co and UponEMA)
  //      strategy.order("Rsi long", strategy.long, 1 , comment = "Rsi long")
        
    if(vrsi < 20 and RSIlowest)
        // line1 = line.new(x1=bar_index, y1=dailyopen, x2=bar_index+1, y2=dailyopen, xloc=xloc.bar_index, style=line.style_solid,extend=extend.right, color=color.aqua, width = 2)
        // line.delete(line1[1])  // remove the previous line when new bar appears
        // label1 = label.new(x=bar_index, y=dailyopen,yloc=yloc.belowbar, text = value,textcolor = color.white, color = color.green, style = label.style_label_up)
        // label.delete(label1[1])
        strategy.order("Rsi long", strategy.long, 1 , comment = "Rsi long")
        strategy.exit("exit", "Rsi long", profit = Reward, loss = Risk, comment = "Rsi long exit")
//strategy.close("Rsi short", comment = "Rsi close")

	
	

	if(vrsi > 80 and RSIhighest)
        // line2 = line.new(x1=bar_index, y1=dailyopen, x2=bar_index+1, y2=dailyopen, xloc=xloc.bar_index, style=line.style_solid,extend=extend.right, color = #e65100, width = 2)
        // line.delete(line2[1])  // remove the previous line when new bar appears
        // label2 = label.new(x=bar_index, y=dailyopen,yloc=yloc.abovebar, text = value, textcolor = color.white, color = color.red)            
        // label.delete(label2[1])
        strategy.order("Rsi short",strategy.short, 1,  comment = "Rsi short ")
        strategy.exit("exit", "Rsi short", profit = Reward,loss = Risk, comment = "Rsi short exit")
//	if(UponEMA)
//        strategy.close("Rsi short", comment = "Rsi short close")
//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_cross)
//plotshape(confirmPH, title="Label",offset = 1,text="Bull",style=shape.labeldown,location=location.abovebar,color=color.green,textcolor=color.green)




//when Rsi reaches overbought, draw a Horizontal Ray to close prices, similarly when it comes to oversold.(accomplished)
//detects when there is more lower/higher RSI values, adjust horizontal Ray and label to new posistion.(accomplished)
```

> Detail

https://www.fmz.com/strategy/430596

> Last Modified

2023-10-30 17:13:24
