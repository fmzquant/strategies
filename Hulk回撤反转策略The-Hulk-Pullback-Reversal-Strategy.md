
> Name

Hulk回撤反转策略The-Hulk-Pullback-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/150898a74e6fa95c99f.png)



## Overview

The Hulk Pullback Reversal is a strategy that utilizes moving averages, MACD, RSI and ADX to identify trend reversals during pullback phases. It specifically targets aggressive trend-followers, capitalizing on their common pullback characteristics for reversal trades.  

## Strategy Logic

The strategy uses EMAs to determine the overall trend direction, as well as building strength/weakness zones. When price pulls back from strength into weakness, the strategy identifies potential reversal opportunities.

To filter false entries, MACD is incorporated to confirm short-term reversal signals. When MACD absolute value exceeds a certain threshold, reversal probability increases. ADX is also required to be above a level, ensuring the market is trending rather than ranging.

Finally, RSI acts to avoid overbought/oversold regions. Signals are only generated when RSI values are within a defined range. 

The trade count is reset on every EMA crossover. A maximum trade limit per crossover can also be set, avoiding over-trading.

When conditions are met, orders are placed based on stop loss and take profit ratios, for executing the reversal trade.

## Advantage Analysis 

The biggest advantage of this strategy is using EMAs to build strength/weakness zones, capitalizing on pullback patterns. The multi-indicator filtering improves reliability.

Compared to single oscillator indicators, the addition of trend determination helps avoid unnecessary reversals. Controlling maximum trades per EMA crossover also prevents over-trading.

## Risk Analysis

The biggest risk is when the trend-follower doesn't pull back, breaking the EMAs directly. This would generate wrong signals and cause losses. Stop losses are required to control downside.

Improper indicator parameters can also degrade signal quality. Parameters need to be repeatedly tested and optimized for different market conditions.

Finally, oversized stop loss and continued aggression after reversal, can increase single trade loss. Reasonable stops and risk management are essential.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Test different markets and parameters so EMAs better gauge the trend.

2. Optimize MACD parameters for more accurate and reliable reversal signals.  

3. Adjust RSI range to avoid overly aggressive overbought/oversold levels.

4. Optimize stop loss and take profit ratios to reduce single trade risk.

## Conclusion

The Hulk Pullback Reversal Strategy specifically targets pullback patterns of aggressive trend-followers, effectively capturing short-term reversal opportunities. It utilizes EMAs for multi-layered trend direction and strength filtering, with MACD, RSI for high-reliability entry confirmation. Proper parameter testing and optimizations enable adaptation to varying market environments, making it a very practical trend reversal strategy.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|20|rsiLength|
|v_input_int_2|2|RsiTopInput|
|v_input_int_3|-2|RsiBotInput|
|v_input_1|14|ADX Smoothing|
|v_input_2|14|DI Length|
|v_input_int_4|33|ADX filter amount|
|v_input_int_8|50|Ema Fast Length|
|v_input_int_9|200|Ema Slow Length|
|v_input_color_1|#4affa3|StrongUpTrendCol|
|v_input_color_2|#ff4754|StrongDownTrendCol|
|v_input_int_10|6|MaxTrades|
|v_input_int_5|12|(?MACD)FastMacdLength|
|v_input_int_6|26|SlowMacdLength|
|v_input_int_7|11|SignalLength|
|v_input_float_1|5.45|Tick Amount for entry|
|v_input_timeframe_1|1|res|
|v_input_bool_1|true|(?Filters)Limit Trades Per Cross|
|v_input_float_2|0.0135|(?TP/SL)Take Profit %|
|v_input_float_3|0.011|Stop Loss %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-16 00:00:00
end: 2023-10-16 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © npietronuto1

//@version=5
strategy("Hulk Scalper x35 Leverage", shorttitle = "Smash Pullback Strat", overlay=true, initial_capital=100, default_qty_type=strategy.percent_of_equity, default_qty_value=100)


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//RSI
rsiLength = input.int(20)
RsiTopInput = input.int(2)
RsiBotInput = input.int(-2)

// toprsiLine = hline(RsiTopInput, title = "Rsi Top Line", linestyle = hline.style_solid)
// botrsiLine = hline(RsiBotInput, title = "Rsi Bottom Line", linestyle = hline.style_solid)

rsi = ta.rsi(close, rsiLength)
rsiWeighted = rsi - 50 //Zeros Rsi to look nicer


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
adxlen = input(14, title="ADX Smoothing")
dilen = input(14, title="DI Length")
dirmov(len) =>
	up = ta.change(high)
	down = -ta.change(low)
	plusDM = na(up) ? na : (up > down and up > 0 ? up : 0)
	minusDM = na(down) ? na : (down > up and down > 0 ? down : 0)
	truerange = ta.rma(ta.tr, len)
	plus = fixnan(100 * ta.rma(plusDM, len) / truerange)
	minus = fixnan(100 * ta.rma(minusDM, len) / truerange)
	[plus, minus]
adx(dilen, adxlen) =>
	[plus, minus] = dirmov(dilen)
	sum = plus + minus
	adx = 100 * ta.rma(math.abs(plus - minus) / (sum == 0 ? 1 : sum), adxlen)
sig = adx(dilen, adxlen)

ADXfilterlevel = input.int(33, title = "ADX filter amount")

// plot(sig, color=color.red, title="ADX")
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//MACD
FastMacdLength = input.int(12, group = "MACD") 
SlowMacdLength = input.int(26, group = "MACD")
SignalLength = input.int(11, group = "MACD")
MacdTickAmountNeeded = input.float(5.45, title = "Tick Amount for entry", group = "MACD")

res = input.timeframe("1", group = "MACD")


// bullishgrow_col = input.color(defval = #3179f5)
// bullishweaken_col = input.color(defval = #00e1ff)
// bearishweaken_col = input.color(defval = #ff01f1)
// bearishgrow_col = input.color(defval = #9d00e5)


[FastMacd, SlowMacd, Macdhist] = ta.macd(close, FastMacdLength, SlowMacdLength, SignalLength)

//Pull MACD from Lower timeframe
MACD = request.security(syminfo.tickerid, res, Macdhist, gaps = barmerge.gaps_on)


//Grow and Fall Color
// getgrow_fall_col(Value) =>
//     if Value >= 0
    
//         if Value >= Value[1]
//             color.new(bullishgrow_col, transp = 10)
            
//         else if Value <= Value[1]
//             color.new(bullishweaken_col, transp = 10)
            
//     else if Value <= 0
    
//         if Value <= Value[1]
//             color.new(bearishgrow_col, transp = 10)
            
//         else if Value >= Value[1]
//             color.new(bearishweaken_col, transp = 10)
            
    
    
//CONDITIONS that check if MACD is overbought or oversold
MACDisAboveBand = MACD > MacdTickAmountNeeded
MACDisBelowBand = MACD < MacdTickAmountNeeded*-1
    
    
    
//Plot
// plot(MACD, style = plot.style_columns, color = getgrow_fall_col(MACD))
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------






//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//EMAs
//Inputs
EmaFastLength = input.int(50, title = "Ema Fast Length")
EmaSlowLength = input.int(200, title = "Ema Slow Length")

StrongUpTrendCol = input.color(color.rgb(74, 255, 163))
//WeakUptrend = input.color(color.rgb(74, 255, 163, 50))
StrongDownTrendCol = input.color(color.rgb(255, 71, 84))
//WeakDownTrend = input.color(color.rgb(255, 71, 84, 50))

//Calculations


emaFast= ta.ema(close, EmaFastLength)

emaSlow= ta.ema(close, EmaSlowLength)

emaDist=emaFast-emaSlow
EmaLengthFraction = emaDist/4

emafrac5 = emaSlow + EmaLengthFraction
emafrac4 = emaSlow + EmaLengthFraction*2
emafrac3 = emaSlow + EmaLengthFraction*3
emafrac2 = emaSlow + EmaLengthFraction*4


UptrendCol_DowntrendCol= emaFast>=emaSlow ? StrongUpTrendCol:StrongDownTrendCol
//Plot
ema1p = plot(emaFast, color = color.new(#000000, transp = 100))
ema2p = plot(emafrac2, color = color.new(#000000, transp = 100))
ema3p = plot(emafrac3, color = color.new(#000000, transp = 100))
ema4p = plot(emafrac4, color = color.new(#000000, transp = 100))
ema5p = plot(emafrac5, color = color.new(#000000, transp = 100))
ema6p = plot(emaSlow, color = color.new(#000000, transp = 100))


fill(ema2p,ema3p, color = color.new(UptrendCol_DowntrendCol, 70))
fill(ema3p,ema4p, color = color.new(UptrendCol_DowntrendCol, 60))
fill(ema4p,ema5p, color = color.new(UptrendCol_DowntrendCol, 50))
fill(ema5p,ema6p, color = color.new(UptrendCol_DowntrendCol, 40))


//Conditons
FastEma_above_SlowEma = emaFast > emaSlow  
FastEma_below_SlowEma = emaFast < emaSlow

emaCrossEvent = ta.crossover(emaFast, emaSlow) or ta.crossover(emaSlow, emaFast)





//------------------------------------------------------------------------------------------------------------------------------------------------------------------------





//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Trade Cap per EMA X
//Inputs
MaxTrades_PerCross_Checkbox = input.bool(true, "Limit Trades Per Cross", group = "Filters")



TrdCount = 0//Variable that keeps current trade count

if(TrdCount[1] > 0)//Passes variable on to current candle
    TrdCount := TrdCount[1]
    
    
//Reset trade count if EMAs X    
emaXevent = ta.crossover(emaFast, emaSlow) or ta.crossover(emaSlow, emaFast) // Check for EMA cross
if(emaXevent)
    TrdCount := 0
    

//Conditions
MaxTrades = input.int(6)

IsMaxTrades_BelowCap = TrdCount[1] < MaxTrades //Condition that applies max trade count

if(not MaxTrades_PerCross_Checkbox)
    IsMaxTrades_BelowCap := true
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------




//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//STRATEGY LOGIC

//Parameters
TakeProfitInput = input.float(0.0135, title = "Take Profit %", group = "TP/SL")
StopLossInput = input.float(0.011, title = "Stop Loss %", group = "TP/SL")


//TP/SL calculations
Long_takeProfit = close * (1 + TakeProfitInput)
Long_stopLoss = close * (1 - StopLossInput)

Short_takeProfit = close * (1 - TakeProfitInput)
Short_stopLoss = close * (1 + StopLossInput)


//LONG and Short
LongConditionPt1 = close > emaSlow and MACDisBelowBand and  sig > ADXfilterlevel
LongConditionPt2 = FastEma_above_SlowEma and IsMaxTrades_BelowCap and strategy.position_size == 0
//Checks if Rsi Inbetween Lines
LongConditionPt3 = rsiWeighted < RsiTopInput and rsiWeighted > RsiBotInput



ShortConditionPt1 = close < emaSlow and MACDisAboveBand and sig > ADXfilterlevel
ShortConditionPt2 = FastEma_below_SlowEma and IsMaxTrades_BelowCap and strategy.position_size == 0
//Checks if Rsi Inbetween Lines
ShortConditionPt3 = rsiWeighted < RsiTopInput and rsiWeighted > RsiBotInput





// longCondition = FastEma_above_SlowEma and MACDisBelowBand and IsMaxTrades_BelowCap and rsiWeighted < RsiTopInput and strategy.position_size == 0
longCondition = LongConditionPt1 and LongConditionPt2 and LongConditionPt3
if(longCondition)

    strategy.entry("long", strategy.long)
    strategy.exit("exit", "long", limit = Long_takeProfit, stop = Long_stopLoss)
    
    TrdCount := TrdCount + 1//ADD to Max Trades Count
    
    alert("Go Long with TP at" + str.tostring(Long_takeProfit) + "and SL at" + str.tostring(Long_stopLoss), alert.freq_once_per_bar_close)





shortCondition = ShortConditionPt1 and ShortConditionPt2 and ShortConditionPt3
if(shortCondition )
    
    strategy.entry("short", strategy.short)
    strategy.exit("exit", "short", limit = Short_takeProfit, stop = Short_stopLoss)

    TrdCount := TrdCount + 1 //ADD to Max Trades Count
    
    alert("Go Short with TP at" + str.tostring(Short_takeProfit) + "and SL at" + str.tostring(Short_stopLoss), alert.freq_once_per_bar_close)


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

```

> Detail

https://www.fmz.com/strategy/429483

> Last Modified

2023-10-17 15:23:49
