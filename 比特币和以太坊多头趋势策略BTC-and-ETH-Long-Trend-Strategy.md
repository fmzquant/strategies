
> Name

比特币和以太坊多头趋势策略BTC-and-ETH-Long-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略是一个基于技术指标的简单自动多头趋势策略,适用于比特币和以太坊等加密货币,旨在捕捉主要上涨趋势,降低频繁交易导致的手续费损失。

## 策略原理

1. 使用MACD判断趋势方向,MACD向上交叉时看多;

2. 计算20周期EMA,100周期SMA和200周期SMA,EMA和SMA同向上提时看多;

3. EMA高于SMA时买入做多,SMA高于SMA慢线时买入做多;

4. 设定止损线,价格跌破止损线时止损退出。

5. 当价格下跌时EMA下穿SMA时平仓退出。

该策略综合多个指标判断趋势及入场时机,通过追踪主要上涨趋势获得利润。

## 策略优势 

1. 多指标组合判断,可以有效过滤假突破等错误信号;

2. 只在趋势明确时入场,可以减少不必要交易,降低交易频率;

3. 止损策略可以有效控制单笔交易的最大亏损;

4. 回测数据显示在比特币和以太坊中可以获得较好收益;

5. 策略逻辑简单清晰,容易理解实现,适合初学者学习。

6. 可扩展性强,可以引入更多指标进行优化。

## 策略风险

1. 市场走势随机性大,判断失误风险;

2. 单一持仓方式无法规避系统性风险; 

3. 止损点设置不当可能导致过度止损;

4. 回测数据不代表实盘表现,实盘效果待验证;

5. 没有考虑交易费用的影响,实盘效果可能有所差异。

6. 没有考虑不同品种特点,需要调整优化。

## 策略优化方向

1. 测试不同参数组合,优化指标参数;

2. 增加类似KDJ等指标过滤入场信号; 

3. 优化止损策略,引入动态止损;

4. 考虑账户资金管理,调整仓位大小;

5. 区分品种特点,调整参数;

6. 结合更多时间周期指标判断;

7. 测试不同品种效果,找出最佳品种。

## 总结

该策略整体思路清晰易懂,使用多指标判断可以有效过滤错误信号。但仍需进一步优化参数、风险控制等,再结合实盘验证,方可实际应用。如果进一步扩展优化,可以成为一个非常实用的加密货币趋势跟踪策略。

||


## Overview 

This is a simple technical indicator based automated long trend strategy for cryptocurrencies like Bitcoin and Ethereum, aiming to capture major uptrends and reduce trading fee losses from frequent trading.

## Strategy Logic

1. Use MACD to determine trend direction, long when MACD crossing up;

2. Calculate 20-period EMA, 100-period SMA and 200-period SMA, go long when EMA and SMA pointing up together; 

3. Buy when EMA is higher than SMA, and SMA is higher than slow SMA;

4. Set stop loss line, stop out when price breaks stop loss.

5. Close position when price drops and EMA crosses below SMA.

This strategy combines multiple indicators to determine trend and entry timing to profit from major uptrends.

## Advantages

1. Multiple indicator combo can help filter out false breakouts and wrong signals.

2. Only enter in obvious trends can reduce unnecessary trades and lower trading frequency.

3. Stop loss can effectively limit max loss per trade.

4. Backtest shows decent profitability in BTC and ETH.

5. Simple and clear logic, easy to understand and implement, good for beginners.

6. High extensibility to include more indicators for optimization.

## Risks

1. High market randomness, wrong judgement risks.

2. Single position approach cannot hedge systematic risks.

3. Improper stop loss setting may cause overstoploss. 

4. Backtest does not represent live results, real performance is yet to be validated.

5. Trading costs impact not considered, may differ from live performance.

6. Did not consider product characteristics, parameter tuning needed.

## Optimization Directions 

1. Test different parameter combinations to optimize indicator parameters.

2. Add filters like KDJ to filter entry signals.

3. Optimize stop loss strategy, like adding dynamic stop loss.

4. Consider position sizing based on account size.

5. Distinguish product characteristics, adjust parameters accordingly. 

6. Incorporate more timeframes for analysis.

7. Test different products and find the best suited ones.

## Conclusion

The strategy logic is simple and clear. Using multiple indicators can help filter out wrong signals effectively. But further optimization on parameters, risk control etc. is needed, combined with live trading verification, before actual application. With proper extensions, it can become a very practical crypto trend following strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|1.5|StopLoss in %|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-06 00:00:00
end: 2023-10-06 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy(title="BTC Long strategy", overlay=true, max_bars_back=3000, initial_capital=1000, commission_value=0.075)

//////////// !!!!!!!!!!!!!!!! WORK BEST IN 2 HOURS for BTC, ETH and ETHXBT !!!!!!!!!!!!!!!!!!! /////////////////////


[macdLine, macdSignalLine, macdHist] = macd(close, 12, 26, 7)  

//_rsi_len = input(14, title="RSI length")
_rsi_len = 14 
 
NewValue = 0
PreviousValue = 0
leverage = 1

smaPercentageIncrease = 0.0
SMA_PERCENT_INCREASE = 0.0
float atrValue = 0
bool bPositionOpened = false
float stockPositionSize = 0 
float volatilityPercentage = 0.0
bool bDisplayArrow = false 
bool bEMAIsRising = false
bool bSMAIsRising = false
bool bSMASlowIsRising = false
bool bMACDIsRising = false
bool bMACDHistIsRising = false
bool bMACDSignalIsRising = false

float stopLoss = input (1.5, "StopLoss in %", type=input.float) //StopLoss associated with the order 
//positionSize = input (1000, "in $")
float positionSize = 1000
float currentPrice = close 
float stopLossPrice = 0
float entryPrice = 0



//-----------------------------------------------------------



// === INPUT BACKTEST RANGE ONE YEAR 
//FromDay   = input(defval = 01, title = "From Day", minval = 1, maxval = 31)
//FromMonth = input(defval = 01, title = "From Month", minval = 1, maxval = 12)
//FromYear  = input(defval = 2020, title = "From Year", minval = 2017)
FromDay   = 01
FromMonth = 01
FromYear  = 2019


//ToDay     = input(defval = 01, title = "To Day", minval = 1, maxval = 31)
//ToMonth   = input(defval = 01, title = "To Month", minval = 1, maxval = 12)
//ToYear    = input(defval = 2023, title = "To Year", minval = 2017)
ToDay     = 31
ToMonth   = 12
ToYear    = 2099

// === FUNCTION EXAMPLE ===
start     = timestamp(FromYear, FromMonth, FromDay, 00, 00)  // backtest start window
finish    = timestamp(ToYear, ToMonth, ToDay, 23, 59)        // backtest finish window
window()  => true // create function "within window of time"



//emaLength = input(20, "EMA Length")
//smaLength = input(100, "SMA Length")
//smaSlowLength = input(200, "SMA Length") 
emaLength = 20
smaLength = 100
smaSlowLength = 200
 
ema = ema(close, emaLength) 
sma = sma(close, smaLength)
smaSlow = sma(close, smaSlowLength)

plot(sma, color=color.green)
plot(smaSlow, color=color.orange)
plot(ema, color=color.yellow)

//reload previous values
stopLossPrice := na(stopLossPrice[1]) ? 0.0 : stopLossPrice[1]
entryPrice := na(entryPrice[1]) ? 0.0 : entryPrice[1]
bPositionOpened := na(bPositionOpened[1]) ? false : bPositionOpened[1]
positionSize := na(positionSize[1]) ? 50000 : positionSize[1]
stockPositionSize := na(stockPositionSize[1]) ? 0 : stockPositionSize[1]
//leverage := na(leverage[1]) ? 1 : leverage[1]
 
//ReEvaluate the direction of indicators
bEMAIsRising := rising(ema, 2) 
bSMAIsRising := rising(sma, 3)
bMACDIsRising := rising(macdLine, 3)
bMACDHistIsRising := rising(macdHist, 1)
bSMASlowIsRising := rising(smaSlow, 10)
bMACDSignalIsRising := rising(macdSignalLine, 3)

atrValue := atr(14)
volatilityPercentage := (atrValue/currentPrice)*100 //calcute the volatility. Percentage of the actual price


//There is too many signal in tranding market, to avoid this we need to make sure that the smaSlow has a mininal increase
//THIS DOES NOT WORK AT ALL!!!!!
//if bSMASlowIsRising == true
//    //calculate the percentegage difference over the last 10 bars
//    smaPercentageIncrease := ((smaSlow[0]/sma[10])-1)*100
//    if smaPercentageIncrease < SMA_PERCENT_INCREASE
//        //Not enough increase we reset the flag 
//        bSMASlowIsRising := false 
        
 
if (window()) 
    //Check if we can open a LONG
//sma > smaSlow and
    if ( volatilityPercentage < 2 and bPositionOpened == false and bSMASlowIsRising == true and bMACDIsRising == true and bEMAIsRising == true and bSMAIsRising == true and ema[0] > sma[0] and sma[0] < currentPrice)
    // add comparaison between macd and macd signal line
    //if (bPositionOpened == false and macdSignalLine < macdLine and bMACDIsRising == true and bMACDHistIsRising == true and bEMAIsRising == true and bSMAIsRising == true and ema[1] > sma[1] and sma[1] < currentPrice)
   
        //Enter in short position 
        stockPositionSize := (positionSize*leverage)/currentPrice //Calculate the position size based on the actual price and the position Size (in $) configured.
        
        //calculate exit values
        stopLossPrice := currentPrice*(1-stopLoss/100) 
        strategy.entry("myPosition", strategy.long, qty=stockPositionSize, comment="BUY at " + tostring(currentPrice))
        entryPrice := currentPrice //store the entry price
        bPositionOpened := true  
        bDisplayArrow := true 
        
    
    //if (bPositionOpened == true and (currentPrice <= stopLossPrice or crossunder(ema[1], sma[1]) or currentPrice < sma[1]))  
    if (bPositionOpened == true and (currentPrice <= stopLossPrice or crossunder(ema[1], sma[1])))
        strategy.close("myPosition", comment="" + tostring(currentPrice) ) //Stop
        //uncomment the below line to make the bot investing the full portfolio amount to test compounding effect.
        //positionSize := positionSize + ((stockPositionSize * currentPrice) - (positionSize*leverage)) 
        //reset some flags 
        bPositionOpened := false 
        bDisplayArrow := true 
        entryPrice := 0.0
        

```

> Detail

https://www.fmz.com/strategy/428579

> Last Modified

2023-10-07 10:16:09
