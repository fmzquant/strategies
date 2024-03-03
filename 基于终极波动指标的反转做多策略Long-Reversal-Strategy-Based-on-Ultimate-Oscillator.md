
> Name

基于终极波动指标的反转做多策略Long-Reversal-Strategy-Based-on-Ultimate-Oscillator

> Author

ChaoZhang

> Strategy Description



[trans]
本策略名称为“基于终极波动指标的反转做多策略”。该策略利用终极波动指标判断超买超卖情况,在指标达到超卖状态时进行逆市做多操作。

终极波动指标融合了多种周期的价格信息,判断市场的超买超卖水平。当指标下穿低点,表示市场步入超卖状态,预示着价格可能出现反弹。

交易逻辑如下:

1. 当终极波动指标下穿低点(如45)时,表示市场超卖,考虑做多。

2. 继续持有做多仓位,直至指标上穿中线(如70),平仓止盈。

3. 设置止损线,如价格跌破止损线则止损出场。若指标显示多头分歧,可以适当调整止损线。

4. 如果指标重新下穿低点,可以考虑加仓做多。

该策略的优势是捕捉超卖反弹机会。但指标参数需要优化,且指标本身滞后,需要结合趋势分析。止损和资金管理也尤为重要。

总体而言,利用指标判断反转时机是一个常见方法。但交易者仍需保持判断的灵活性,不可完全依赖任何单一指标。



||



This strategy is named "Long Reversal Strategy Based on Ultimate Oscillator". It uses the Ultimate Oscillator to judge overbought/oversold levels and enters counter-trend long trades when the indicator reaches oversold levels.

The Ultimate Oscillator incorporates price information across multiple periods to gauge market overbought/oversold conditions. When the indicator crosses below a low point, it signals an oversold market and hints at a possible price bounce.

The trading logic is:

1. When the Ultimate Oscillator crosses below a low level (such as 45), the market is oversold and long trades are considered.

2. Continue holding long positions until the indicator crosses above a middle level (such as 70) for taking profit. 

3. Set a stop loss line so positions are stopped out if price breaches the line. If indicator shows bullish divergence, stop can be adjusted accordingly.

4. If indicator crosses below the low point again, adding to long positions can be considered.

The advantage of this strategy is capturing oversold bounce opportunities. But optimization of parameters is needed, and the lagging nature of the indicator calls for combining trend analysis. Stop loss and money management are also critical.

In conclusion, using indicators to determine reversal timing is common. But traders still need discretion and should not purely rely on any single indicator.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|5|length1|
|v_input_2|10|length2|
|v_input_3|15|length3|
|v_input_4|9|Signal length|
|v_input_5|45|Buy Line (UO crossing up oversold at ) |
|v_input_6|70|Exit Line (UO crsossing down overbought at) |
|v_input_7|10|Risk % of capital|
|v_input_8|3|Stop Loss|
|v_input_9|false|Take Profit|
|v_input_10|75|Take Profit at RSIofUO crossing below this value |
|v_input_11|true|show Signal Line|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-11 00:00:00
end: 2023-09-12 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mohanee

//@version=4

strategy(title="Ultimate Oscillator [Long] Strategy",  shorttitle="UO" , overlay=false, pyramiding=2,     default_qty_type=strategy.percent_of_equity,  default_qty_value=20, initial_capital=10000, currency=currency.USD)  //default_qty_value=10, default_qty_type=strategy.fixed,

	
//Ultimate Oscillator logic copied from  TradingView   builtin indicator
/////////////////////////////////////////////////////////////////////////////////
length1 = input(5, minval=1), length2 = input(10, minval=1), length3 = input(15, minval=1)


//rsiUOLength = input(7, title="RSI UO length", minval=1)

signalLength = input(9, title="Signal length", minval=1)

buyLine = input (45, title="Buy Line (UO crossing up oversold at ) ")       //crossover
exitLine = input (70, title="Exit Line (UO crsossing down overbought at) ")      //crossunder


riskCapital = input(title="Risk % of capital", defval=10, minval=1)
stopLoss=input(3,title="Stop Loss",minval=1)

takeProfit=input(false, title="Take Profit")
profitExitLine = input (75, title="Take Profit at RSIofUO crossing below this value ") //crossunder


showSignalLine=input(true, "show Signal Line")
//showUO=input(false, "show Ultimate Oscialltor")


average(bp, tr_, length) => sum(bp, length) / sum(tr_, length)
high_ = max(high, close[1])
low_ = min(low, close[1])
bp = close - low_
tr_ = high_ - low_
avg7 = average(bp, tr_, length1)
avg14 = average(bp, tr_, length2)
avg28 = average(bp, tr_, length3)
ultOscVal = 100 * (4*avg7 + 2*avg14 + avg28)/7
//Ultimate Oscillator 
/////////////////////////////////////////////////////////////////////////////////

//Willimas Alligator  copied from  TradingView built in Indicator
/////////////////////////////////////////////////////////////////////////////////
smma(src, length) =>
	smma =  0.0
	smma := na(smma[1]) ? sma(src, length) : (smma[1] * (length - 1) + src) / length
	smma

//moving averages logic copied from Willimas Alligator -- builtin indicator in TradingView
sma1=smma(hl2,5)
sma2=smma(hl2,20)
sma3=smma(hl2,50)

//Willimas Alligator
/////////////////////////////////////////////////////////////////////////////////

myVwap= vwap(hlc3)

//drawings
/////////////////////////////////////////////////////////////////////////////////
hline(profitExitLine, title="Middle Line 60  [Profit Exit Here]", color=color.purple  , linestyle=hline.style_dashed)

obLevelPlot = hline(exitLine, title="Overbought",  color=color.red , linestyle=hline.style_dashed)
osLevelPlot = hline(buyLine, title="Oversold", color=color.blue, linestyle=hline.style_dashed)

//fill(obLevelPlot, osLevelPlot, title="Background", color=color.blue, transp=90)
//rsiUO = rsi(ultOscVal,rsiUOLength)

rsiUO=ultOscVal

//emaUO = ema(rsiUO, 9)

//signal line
emaUO = ema(ultOscVal , 5)     // ema(ultOscVal / rsiUO, 9)

//ultPlot=plot(showUO==true? ultOscVal : na, color=color.green, title="Oscillator")

plot(rsiUO, title = "rsiUO" ,  color=color.purple)
plot(showSignalLine ? emaUO : na , title = "emaUO [signal line]" ,  color=color.blue)  //emaUO

//drawings
/////////////////////////////////////////////////////////////////////////////////




//Strategy Logic 
/////////////////////////////////////////////////////////////////////////////////

longCond=  crossover(rsiUO, buyLine)  or crossover(rsiUO, 30)


//longCond= ( ema10>ema20 and crossover(rsiUO, buyLine) ) or ( ema10 < ema20 and crossover(rsiUO, 75)  )

//Entry--
//Echeck how many units can be purchased based on risk manage ment and stop loss
qty1 = (strategy.equity  * riskCapital / 100 ) /  (close*stopLoss/100)  

//check if cash is sufficient  to buy qty1  , if capital not available use the available capital only
qty1:= (qty1 * close >= strategy.equity ) ? (strategy.equity / close) : qty1



//strategy.entry(id="LERSIofUO", long=true,   qty=qty1,  when = close > open and  barssince(longCond)<=3  and strategy.position_size<1 )  //and sma1 > sma3)  //  and close>open and  rsiUO >= 25 )   //and


strategy.entry(id="LEUO", long=true,   qty=qty1,  when = close > open and  barssince(longCond)<=3  and strategy.position_size<1  and sma2 > sma3)  //  and close>open and  rsiUO >= 25 )   //and


//Add
//strategy.entry(id="LEUO", comment="Add" , qty=qty1/2 ,  long=true,   when = strategy.position_size>=1 and close < strategy.position_avg_price and crossover(rsiUO, 60) )  //and sma1 > sma3)  //  and close>open and  rsiUO >= 25 )   //and


//strategy.entry(id="LEUO", long=true,   qty=qty1, when = close > open and  barssince(longCond)<=10  and valuewhen(longCond , close , 1)  > close  and rsiUO>=30) //  and close>open and  rsiUO >= 25 )   //and 

//for Later versions
//also check for divergence  ... later version
//also check if close above vwap session

//strategy.entry(id="LEUO", long=false, when = sma1< sma2  and crossunder(rsiUO,60) )

//change the bar color to yellow , indicating startegy will trigger BUY
barcolor( close > open and  barssince(longCond)<=3  and strategy.position_size<1  and sma2 > sma3 ? color.orange : na)


//barcolor(abs(strategy.position_size)>=1 ? color.blue : na )
bgcolor(abs(strategy.position_size)>=1 ? color.blue : na , transp=70)

//signal for addition to existing position 
barcolor( strategy.position_size>=1 and close < strategy.position_avg_price and crossover(rsiUO, 60) ? color.yellow : na)
//bgcolor( strategy.position_size>=1 and close < strategy.position_avg_price and crossover(rsiUO, 60)  ? color.yellow : na, transp=30)

//partial exit
strategy.close(id="LEUO", comment="PExit",  qty=strategy.position_size/3, when= takeProfit and abs(strategy.position_size)>=1 and close > strategy.position_avg_price and crossunder(rsiUO,profitExitLine) )


//close the Long order
strategy.close(id="LEUO", comment="Profit is "+tostring(close - strategy.position_avg_price,  "###.##"), when=abs(strategy.position_size)>=1 and crossunder(rsiUO,exitLine) ) //and close > strategy.position_avg_price )
//strategy.close(id="LEUO", comment="CloseAll", when=abs(strategy.position_size)>=1 and crossunder(rsiUO2,40) ) //and close > strategy.position_avg_price )

// stop loss exit
stopLossVal = strategy.position_size>=1 ?  strategy.position_avg_price * ( 1 - (stopLoss/100) ) : 0.00
strategy.close(id="LEUO", comment="SL exit Loss is  "+tostring(close - strategy.position_avg_price,  "###.##") , when=abs(strategy.position_size)>=1 and close < stopLossVal and rsiUO < exitLine)   
//reason to rsiUO <30 is if price is going down , indicator should reflect it ... but indicator is above 30 means it showing divergence... so hold on it until it crossdown 30 ...that way even Stop Loss less than predefined ...


//Strategy Logic 
/////////////////////////////////////////////////////////////////////////////////


```

> Detail

https://www.fmz.com/strategy/426617

> Last Modified

2023-09-13 17:32:53
