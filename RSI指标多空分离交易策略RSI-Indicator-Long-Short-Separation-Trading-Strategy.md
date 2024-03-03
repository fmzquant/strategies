
> Name

RSI指标多空分离交易策略RSI-Indicator-Long-Short-Separation-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1659aa1477f9dd416a3.png)
[trans]
## 概述

该策略通过RSI指标识别多空分离现象,据此进行交易决策。其核心思想是当价格出现新低但RSI指标出现新高时,构成“多头分离”信号,表明底部已经形成,做多;当价格出现新高但RSI指标出现新低时,构成“空头分离”信号,表明顶部已经形成,做空。

## 策略原理

该策略主要运用RSI指标识别价格与RSI之间的多空分离现象,具体方法如下:

1. 使用RSI指标参数为13,源数据为收盘价
2. 定义多头分离的向左回溯范围为14天,向右回溯范围为2天
3. 定义空头分离的向左回溯范围为47天,向右回溯范围为1天  
4. 当价格创下更低的低点,但RSI指标创下更高的低点时,满足多头分离条件,产生做多信号
5. 当价格创下更高的高点,但RSI指标创下更低的高点时,满足空头分离条件,产生做空信号

通过识别价格和RSI指标之间的多空分离现象,可以提前捕捉到价格走势的转折点,据此进行交易决策。

## 策略优势

该策略主要具有以下优势:

1. 识别价格和RSI指标之间的多空分离现象,可以提前判断价格趋势的转折点,把握交易机会  
2. 由于利用的是指标分析,因此不受主观情绪影响  
3. 采用固定回溯区间识别分离现象,避免调参频繁  
4. 结合日线RSI等额外条件,可以减少误交易概率  

## 风险及解决方法

该策略也存在一定的风险:  

1. RSI指标发生背离不一定预示着价格立即反转,可能存在时间差,这会导致止损被触发的风险。解决方法是适当放宽止损幅度,给价格足够的时间去确认分离信号。  

2. 分离现象持续过长时间也会增加风险。解决方法是结合更长期的日线或周线RSI指标作为过滤条件。

3. 分离幅度过小也无法确认趋势转折,需要适当放大回溯区间来搜寻更明显的RSI分离。

## 策略优化方向  

该策略还可以从以下几个方向进行优化:

1. 优化RSI参数,寻找最佳的参数组合

2. 尝试其他的技术指标如MACD、KD等来识别多空分离现象

3. 增加适当的震荡期过滤条件,避免震荡期的增多误交易  

4. 结合更多时间周期的RSI指标,寻找最佳的组合信号

## 总结  

RSI多空分离交易策略通过识别RSI指标与价格之间的多空分离现象,判断价格走势的转折点,据此建立交易信号。该策略简单实用,通过优化参数设置和增加过滤条件,可以进一步提高盈利概率。总的来说,RSI多空分离策略是一个很有效的量化交易策略。

||

## Overview  

This strategy identifies long short separation phenomena through the RSI indicator to make trading decisions. The core idea is that when prices hit new lows but the RSI indicator hits new highs, a "bullish separation" signal is generated, indicating that the bottom has formed and going long. When prices hit new highs but the RSI indicator hits new lows, a "bearish separation" signal is generated, indicating that the top has formed and going short.

## Strategy Principles  

The strategy mainly uses the RSI indicator to identify the long short separation between prices and the RSI. The specific method is as follows:  

1. Use RSI indicator parameters of 13 and close prices as source data  
2. Define left lookback range for bullish separation as 14 days and right lookback range as 2 days
3. Define left lookback range for bearish separation as 47 days and right lookback range as 1 day
4. When prices hit lower lows but RSI hits higher lows, long separation condition is met to generate long signals  
5. When prices hit higher highs but RSI hits lower highs, short separation condition is met to generate short signals  

By identifying the long short separation between prices and RSI, it can capture the inflection points of price trends in advance for trade decision making.  

## Advantages of the Strategy  

The main advantages of this strategy are:  

1. Identifying price/RSI separation can judge trend inflections early to capture trading opportunities  
2. Use indicator analysis so less affected by emotions 
3. Use fixed lookback periods to identify separation, avoiding frequent parameter tuning
4. Additional conditions like daily RSI reduce false signals  

## Risks and Solutions  

There are still some risks:

1. RSI divergence does not necessarily mean immediate reversal, time lag may exist leading to stop loss risk. Solution is to allow wider stops to give time for divergence signal confirmation.  

2. Prolonged separation also increases risk. Solution is to add longer-term daily or weekly RSI as filter conditions.  

3. Small divergence may not confirm trend reversal, need to expand lookback periods to find more significant RSI divergence.

## Optimization Directions  

The strategy can be improved in the following aspects:  

1. Optimize RSI parameters to find best parameter combinations  

2. Try other technical indicators like MACD, KD to identify separation  

3. Add oscillation filters to reduce false signals in choppy periods 

4. Combine RSI from multiple timeframes to find best combination signals  

## Conclusion  

The RSI long short separation trading strategy judges trend inflections by identifying divergence between price and RSI to generate trading signals. The strategy is simple and practical. Further improving parameters and adding filters can increase profitability. Overall an effective quantitative trading strategy.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|13|RSI Period|
|v_input_2_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|true|Short Lookback Right|
|v_input_4|47|Short Lookback Left|
|v_input_5|2|Long Lookback Right|
|v_input_6|14|Long Lookback Left|
|v_input_7|400|Max of Lookback Range|
|v_input_8|true|Min of Lookback Range|
|v_input_9|75|Take Profit at RSI Level|
|v_input_10|25|Take Profit for Short at RSI Level|
|v_input_11|0|Long Stop Loss Type: PERC|ATR|FIB|NONE|
|v_input_12|0|Short Stop Loss Type: PERC|ATR|FIB|NONE|
|v_input_13|14|Long Stop Loss Value|
|v_input_14|5|Short Stop Loss Value|
|v_input_15|true|Plot Bullish|
|v_input_16|true|Plot Bearish|
|v_input_17|14|ATR Length (for Trailing stop loss)|
|v_input_18|3.5|ATR Multiplier (for Trailing stop loss)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © Nextep

//@version=4
strategy(title="RSI top&bottom destroy ", overlay=false, pyramiding=4, default_qty_value=2, default_qty_type=strategy.fixed, initial_capital=10000, currency=currency.USD)







// INPUT Settings --------------------------------------------------------------------------------------------------------------------------------------------------
len = input(title="RSI Period", minval=1, defval=13)
src = input(title="RSI Source", defval=close)





// defining the lookback range for shorts
lbRshort = input(title="Short Lookback Right", defval=1)
lbLshort = input(title="Short Lookback Left", defval=47)

// defining the lookback range for longs
lbRlong = input(title="Long Lookback Right", defval=2)
lbLlong = input(title="Long Lookback Left", defval=14)


rangeUpper = input(title="Max of Lookback Range", defval=400)
rangeLower = input(title="Min of Lookback Range", defval=1)

// take profit levels
takeProfitLongRSILevel = input(title="Take Profit at RSI Level", minval=0, defval=75)
takeProfitShortRSILevel = input(title="Take Profit for Short at RSI Level", minval=0, defval=25)




// Stop loss settings
longStopLossType = input("PERC", title="Long Stop Loss Type", options=['ATR','PERC', 'FIB', 'NONE'])
shortStopLossType = input("PERC", title="Short Stop Loss Type", options=['ATR','PERC', 'FIB', 'NONE'])
longStopLossValue = input(title="Long Stop Loss Value", defval=14, minval=0)
shortStopLossValue = input(title="Short Stop Loss Value", defval=5, minval=-10)








// PLOTTING THE CHARTS --------------------------------------------------------------------------------------------------------------------------------------------------
// Plotting the Divergence
plotBull = input(title="Plot Bullish", defval=true)
plotBear = input(title="Plot Bearish", defval=true)
bearColor = color.orange
bullColor = color.green
textColor = color.white
noneColor = color.new(color.white, 100)

// Adding the RSI oscillator
osc = rsi(src, len)
ma_len = 14 // Length for the moving average
rsi_ma = sma(osc, ma_len) // Calculate the moving average of RSI
plot(osc, title="RSI", linewidth=1, color=color.purple)
plot(rsi_ma, color=color.blue, title="RSI MA") // Plot the RSI MA

// Adding the lines of the RSI oscillator
plot(osc, title="RSI", linewidth=1, color=color.purple)
hline(50, title="Middle Line", linestyle=hline.style_dotted)
obLevel = hline(75, title="Overbought", linestyle=hline.style_dotted)
osLevel = hline(25, title="Oversold", linestyle=hline.style_dotted)
fill(obLevel, osLevel, title="Background", color=color.purple, transp=80)


atrLength = input(14, title="ATR Length (for Trailing stop loss)")
atrMultiplier = input(3.5, title="ATR Multiplier (for Trailing stop loss)")







// RSI PIVOTS --------------------------------------------------------------------------------------------------------------------------------------------------
// Define a condition for RSI pivot low
isFirstPivotLowlong = not na(pivotlow(osc, lbLlong, lbRlong))
// Define a condition for RSI pivot high
isFirstPivotHighlong = not na(pivothigh(osc, lbLlong, lbRlong))
// Define a condition for the first RSI value
firstPivotRSIValuelong = isFirstPivotLowlong ? osc[lbRlong] : na
// Define a condition for the second RSI value
secondPivotRSIValuelong = isFirstPivotLowlong ? valuewhen(isFirstPivotLowlong, osc[lbRlong], 1) : na


// Define a condition for RSI pivot low
isFirstPivotLowshort = not na(pivotlow(osc, lbLshort, lbRshort))
// Define a condition for RSI pivot high
isFirstPivotHighshort = not na(pivothigh(osc, lbLshort, lbRshort))
// Define a condition for the first RSI value
firstPivotRSIValueshort = isFirstPivotLowshort ? osc[lbRshort] : na
// Define a condition for the second RSI value
secondPivotRSIValueshort = isFirstPivotLowshort ? valuewhen(isFirstPivotLowshort, osc[lbRshort], 1) : na

_inRange(cond) =>
    bars = barssince(cond == true)
    rangeLower <= bars and bars <= rangeUpper









// ADDITIONAL ENTRY CRITERIA --------------------------------------------------------------------------------------------------------------------------------------------------
// RSI crosses RSI MA up by more than 2 points and subsequently down
rsiUpCross = crossover(osc, rsi_ma + 1)
rsiDownCross = crossunder(osc, rsi_ma - 1)

// Calculate the daily RSI
rsiDaily = security(syminfo.ticker, "D", rsi(src, 14))





// BULLISH CONDITIONS --------------------------------------------------------------------------------------------------------------------------------------------------

// LOWER LOW PRICE & HIGHER LOW OSC

// Price: Lower Low
priceLL = na(isFirstPivotLowlong[1]) ? false : (low[lbRlong] < valuewhen(isFirstPivotLowlong, low[lbRlong], 1))
// Osc: Higher Low
oscHL = na(isFirstPivotLowlong[1]) ? false : (osc[lbRlong] > valuewhen(isFirstPivotLowlong, osc[lbRlong], 1) and _inRange(isFirstPivotLowlong[1]))



// BULLISH PLOT
bullCond = plotBull and priceLL and oscHL and isFirstPivotLowlong
plot(
     isFirstPivotLowlong ? osc[lbRlong] : na,
     offset=-lbRlong,
     title="Regular Bullish",
     linewidth=2,
     color=(bullCond ? bullColor : noneColor),
     transp=0
     )

plotshape(
     bullCond ? osc[lbRlong] : na,
     offset=-lbRlong,
     title="Regular Bullish Label",
     text=" Bull ",
     style=shape.labelup,
     location=location.absolute,
     color=bullColor,
     textcolor=textColor,
     transp=0
     )









// BEARISH CONDITIONS --------------------------------------------------------------------------------------------------------------------------------------------------

// HIGHER HIGH PRICE & LOWER LOW OSC
// Osc: Lower High
oscLH = na(isFirstPivotHighshort[1]) ? false : (osc[lbRshort] < valuewhen(isFirstPivotHighshort, osc[lbRshort], 1) and _inRange(isFirstPivotHighshort[1]))
// Price: Higher High
priceHH = na(isFirstPivotHighshort[1]) ? false : (high[lbRshort] > valuewhen(isFirstPivotHighshort, high[lbRshort], 1))


// BEARISH PLOT
bearCond = plotBear and priceHH and oscLH and isFirstPivotHighshort

plot(
     isFirstPivotHighshort ? osc[lbRshort] : na,
     offset=-lbRshort,
     title="Regular Bearish",
     linewidth=2,
     color=(bearCond ? bearColor : noneColor),
     transp=0
     )

plotshape(
     bearCond ? osc[lbRshort] : na,
     offset=-lbRshort,
     title="Regular Bearish Label",
     text=" Bear ",
     style=shape.labeldown,
     location=location.absolute,
     color=bearColor,
     textcolor=textColor,
     transp=0
     )




// ENTRY CONDITIONS --------------------------------------------------------------------------------------------------------------------------------------------------

longCondition = false
shortCondition = false

// Entry Conditions
longCondition := bullCond
shortCondition := bearCond

// Conditions to prevent entering trades based on daily RSI
longCondition := longCondition and rsiDaily >= 23
shortCondition := shortCondition and rsiDaily <= 80




// STOPLOSS CONDITIONS --------------------------------------------------------------------------------------------------------------------------------------------------
// Stoploss Conditions
long_sl_val = 
      longStopLossType == "ATR" ? longStopLossValue * atr(atrLength) 
      : longStopLossType == "PERC" ? close * longStopLossValue / 100 : 0.00
long_trailing_sl = 0.0
long_trailing_sl := strategy.position_size >= 1 ? max(low - long_sl_val, nz(long_trailing_sl[1])) : na

// Calculate Trailing Stop Loss for Short Entries
short_sl_val = 
      shortStopLossType == "ATR" ? 1 - shortStopLossValue * atr(atrLength) 
      : shortStopLossType == "PERC" ? close * (shortStopLossValue / 100) : 0.00 //PERC = shortstoplossvalue = -21300 * 5 / 100 = -1065
short_trailing_sl = 0.0
short_trailing_sl := strategy.position_size <= -1 ? max(high + short_sl_val, nz(short_trailing_sl[1])) : na






// RSI STOP CONDITION
 
rsiStopShort = (strategy.position_avg_price != 0.0 and close <= strategy.position_avg_price * 0.90) or (strategy.position_avg_price != 0.0 and rsi(src, 14) >= 75)
 
rsiStopLong = (strategy.position_avg_price != 0.0 and close >= strategy.position_avg_price * 1.10) or (strategy.position_avg_price != 0.0 and rsi(src, 14) <= 25)


// LONG CONDITIONS --------------------------------------------------------------------------------------------------------------------------------------------------
strategy.entry(id="RSIDivLELong", long=true, when=longCondition)

strategy.entry(id="RSIDivLEShort", long=false, when=shortCondition)







// Close Conditions
shortCloseCondition = bullCond // or cross(osc, takeProfitShortRSILevel)
strategy.close(id="RSIDivLEShort", comment="Close All="+tostring(-close + strategy.position_avg_price, "####.##"), when=abs(strategy.position_size) <= -1 and shortStopLossType == "NONE" and shortCloseCondition )
strategy.close(id="RSIDivLEShort", comment="TSL="+tostring(-close + strategy.position_avg_price, "####.##"), when=abs(strategy.position_size) >= -1 and ((shortStopLossType == "PERC" or shortStopLossType == "ATR") and cross(short_trailing_sl,high))) // or rsiStopShort)// or rsiStopShort)


longCloseCondition = bearCond
strategy.close(id="RSIDivLELong", comment="Close All="+tostring(close - strategy.position_avg_price, "####.##"), when=abs(strategy.position_size) >= 1 and longStopLossType == "NONE" and longCloseCondition)
strategy.close(id="RSIDivLELong", comment="TSL="+tostring(close - strategy.position_avg_price, "####.##"), when=abs(strategy.position_size) >= 1 and ((longStopLossType == "PERC" or longStopLossType == "ATR") and cross(long_trailing_sl,low)))  //or rsiStopLong

```

> Detail

https://www.fmz.com/strategy/442833

> Last Modified

2024-02-26 13:49:25
