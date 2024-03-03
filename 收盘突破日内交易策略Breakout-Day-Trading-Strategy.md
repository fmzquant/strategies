
> Name

收盘突破日内交易策略Breakout-Day-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

### 概述

该策略是一个基于移动均线的简单日内交易策略,适用于GBPUSD 1小时时间周期图表。它只在伦敦开盘时入场,并在伦敦收盘时离场,非常适合伦敦时段的趋势突破交易。

### 策略原理

该策略使用两个移动均线,一个极快速的均线和一个极缓慢的均线。具体逻辑如下:

1. 只在伦敦开盘时(8点钟)突破进入场内。判断方式是收盘价或最高价突破快速均线即可做多,收盘价或最低价突破快速均线即可做空。

2. 同时,要求前一根K线的收盘价高于慢速均线才能做多,低于慢速均线才能做空,以过滤掉非趋势情况。

3. 止损设置为极小值,只有50-100点。

4. 不设置止盈,当伦敦收盘时(15点钟)无条件离场。

### 优势分析

这是一个非常简单的突破策略,但由于合理利用了伦敦时段的趋势特征,具有以下优势:

1. 只在趋势明确的时候入场,避免了震荡市的风险。

2. 只在伦敦时段突破交易,充分利用了这个时段波动较大的特点。

3. 采用小止损,可以承受一定程度的反弹。

4. 无条件离场,避免过夜风险。

### 风险分析

该策略也存在一些风险:

1. 伦敦时段没有明确趋势的时候,可能长时间无交易。

2. 小止损带来的被止损风险。突破后可能存在一定程度反弹造成被止损。

3. 固定离场时间带来的过早离场风险。强势趋势的时候可能需要延长持仓时间。

对策是可以适当放宽入场规则,采用移动止损来锁定盈利,以及根据市场情况适当调整离场时间。

### 优化方向

该策略可以从以下几个方面进行优化:

1. 增加其他指标过滤,如RSI,布林带等,进一步避免震荡市场。

2. 优化移动均线组合,测试不同参数的均线效果。

3. 测试不同的止损点数大小,找到最佳止损范围。

4. 根据具体行情,实时调整离场时间,而不是固定在收盘时刻离场。

5. 测试其他货币对及其他时间周期的效果。

6.加入风险控制模块,例如资金管理、交易大小计算等。

### 总结

该策略整体是一个非常简单实用的伦敦时段突破策略。优点是规则简单清晰,通过合理使用时段特征可以避免一些交易风险。同时也存在一些可优化空间,如果继续优化测试,可以进一步提高策略稳定性和盈利能力。总体来说,这个策略提供了一个高效利用伦敦时段突破交易思路的参考框架和模型。

||


## Overview

This is a simple day trading strategy based on moving averages, suitable for GBPUSD 1-hour timeframe. It only enters at the London open and exits at the London close, making it ideal for trend breakout trading during the London session.  

## Strategy Logic

The strategy uses two moving averages, one very fast and one very slow. The logic is as follows:

1. Only enter at the London open (8 AM) when price breaks the fast MA. Go long if close or high breaks above fast MA, go short if close or low breaks below fast MA.

2. Require previous bar's close to be above slow MA for long, below slow MA for short, to filter out non-trending moves. 

3. Use a very small stop loss of 50-100 points.

4. No take profit, exits unconditionally at the London close (15:00).

## Advantage Analysis 

This is a very simple breakout strategy, but by properly utilizing the London session trend characteristics, it has the following advantages:

1. Only enters in clear trends, avoiding choppy market risks. 

2. Trades breakouts only during London high volatility period.

3. Small stop loss can withstand some retracement. 

4. Unconditional exit avoids overnight risks.

## Risk Analysis

The strategy also has some risks:

1. May stay flat for long periods when London has no clear trend.

2. Stop loss risks of being stopped out on retracements.

3. Early exit risks when strong trends require extended holding periods.

Mitigations include widening entry rules, using trailing stops to lock in profits, and dynamically adjusting exit time based on market conditions.

## Optimization Directions

The strategy can be improved in several areas:

1. Add other filters like RSI, Bollinger Bands to further avoid choppy markets.

2. Optimize moving average combinations by testing different parameters. 

3. Test different stop loss sizes to find optimal range.

4. Dynamically adjust exit time based on price action rather than fixed time.

5. Test other currency pairs and timeframes. 

6. Add risk management like position sizing based on account size.

## Summary

Overall this is a very simple and practical London session breakout strategy. It benefits from avoiding certain trading risks by properly utilizing session characteristics. There are also areas for further optimizations to improve robustness and profitability. The strategy provides a useful framework and template for effectively trading London session breakouts.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|false|NY Open On|
|v_input_2|false|NY Session On|
|v_input_3|false|NY Close On|
|v_input_4|false|Aussie Open On|
|v_input_5|false|Aussie Session On|
|v_input_6|false|Aussie Close On|
|v_input_7|false|Asia Open On|
|v_input_8|false|Asia Session On|
|v_input_9|false|Asia Close On|
|v_input_10|true|Euro Open On|
|v_input_11|true|Euro Session On|
|v_input_12|true|Euro Close On|
|v_input_13|true|Show On Chart|
|v_input_14|true|From Day|
|v_input_15|true|From Month|
|v_input_16|2020|From Year|
|v_input_17|31|To Day|
|v_input_18|12|To Month|
|v_input_19|2020|To Year|
|v_input_20|2|len|
|v_input_21_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_22|200|Length slow|
|v_input_23_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_24|66|sl|
|v_input_25|true|Risk % of equity |


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-08 00:00:00
end: 2023-10-08 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4

// strategy(title="2 ma breakout",shorttitle="2 ma breakout", initial_capital=10000,overlay=true, commission_type = strategy.commission.cash_per_contract, commission_value = 0.00008 )
timeinrange(res, sess) => time(res, sess) != 0

//Change false to false = You have to turn on, won't show up by default
//****Always use lowercase letters

doNYOpen = input(defval=false, type = input.bool, title="NY Open On")
doNYSession = input(defval=false, type = input.bool, title="NY Session On")
doNYClose = input(defval=false, type = input.bool, title="NY Close On")

doAussieOpen = input(defval=false, type = input.bool, title="Aussie Open On")
doAussieSession = input(defval=false, type = input.bool, title="Aussie Session On")
doAussieClose = input(defval=false, type = input.bool, title="Aussie Close On")

doAsiaOpen = input(defval=false, type = input.bool, title="Asia Open On")
doAsiaSession = input(defval=false, type = input.bool, title="Asia Session On")
doAsiaClose = input(defval=false, type = input.bool, title="Asia Close On")

doEurOpen = input(defval=true, type = input.bool, title="Euro Open On")
doEurSession = input(defval=true, type = input.bool, title="Euro Session On")
doEurClose = input(defval=true, type = input.bool, title="Euro Close On")

//You can copy and paste these colors. white - silver - gray - maroon - red - purple - fuchsia - green - lime
//   olive - yellow - navy - blue - teal - aqua - orange 

nySessionStart = color.olive
nySession = color.olive
nySessionEnd = color.olive
asiaSessionStart = color.blue
asiaSession = color.blue
asiaSessionEnd = color.blue
europeSessionStart = color.red
europeSession = color.red
europeSessionEnd = color.red
colorwhite = color.white

//****Note ---- Use Military Times --- So 3:00PM = 1500


bgcolor(doAsiaSession and timeinrange(timeframe.period, "1800-0400") ? asiaSession : na, transp=75)
//bgcolor(timeinrange(timeframe.period, "0000-0300") ? color.white  : na, transp=75)
bgcolor(doEurSession and timeinrange(timeframe.period, "0300-1100") ? europeSession : na, transp=75)
bgcolor(doNYSession and timeinrange(timeframe.period, "0800-1600") ? nySession : na, transp=75)

active = input(true, title="Show On Chart")
pricehigh = security(syminfo.tickerid, '60', high[0])
pricelow = security(syminfo.tickerid, '60', low[0])
//Daily Plots
offs_daily = 0 
hiHighs = 0
loLows = 0
//plot(timeinrange(timeframe.period, "0000-0300") and pricehigh ? pricehigh  : na, title="Previous Daily High", style=plot.style_line, linewidth=2, color=color.gray)
//plot(timeinrange(timeframe.period, "0000-0300") and pricelow ? pricelow : na, title="Previous Daily Low", style=plot.style_linebr, linewidth=2, color=color.gray)

if(timeinrange(timeframe.period, "0000-0300"))
    hiHighs = highest(high, 3)
    loLows = lowest(low, 3)
    

// From Date Inputs
fromDay = input(defval = 1, title = "From Day", minval = 1, maxval = 31)
fromMonth = input(defval = 1, title = "From Month", minval = 1, maxval = 12)
fromYear = input(defval = 2020, title = "From Year", minval = 1970)
 
// To Date Inputs
toDay = input(defval = 31, title = "To Day", minval = 1, maxval = 31)
toMonth = input(defval = 12, title = "To Month", minval = 1, maxval = 12)
toYear = input(defval = 2020, title = "To Year", minval = 1970)
 
// Calculate start/end date and time condition
startDate = timestamp(fromYear, fromMonth, fromDay, 00, 00)
finishDate = timestamp(toYear, toMonth, toDay, 00, 00)
time_cond = true


len = input(2)
src = input(close, title="Source")
out = sma(src, len)

lena = input(200, minval=1, title="Length slow")
srca = input(close, title="Source")
outa = ema(srca, lena)

//tp = input(100, title="tp")
sl = input(66, title="sl")
// if(smabool)
//     out := sma(src, len)
// else if(emabool)
//     out := ema(src, len)
// else if(hmabool)
//     out := hma(src, len)
// else if(vmabool)
//     out := wma(src, len)  
// else if(vwmabool)
//     out := vwma(src, len)   
// else if(smmabool)
//     out := sma(src, len)  
 
plot(out, color=color.white, title="MA")
plot(outa, color=color.white, title="MA")

longC = timeinrange(timeframe.period, "0300-0400") and (crossover(close,out) or crossover(high,out)) and close[1] > outa and time_cond
shortC = timeinrange(timeframe.period, "0300-0400") and (crossunder(close,out) or crossunder(low,out)) and close[1] < outa and time_cond



//inputlondon = input(false, title="london session")
//inputny = input(false, title="new york session")

//if(inputlondon==true)

strategy.initial_capital = 50000

//MONEY MANAGEMENT--------------------------------------------------------------
balance = strategy.netprofit + strategy.initial_capital //current balance
floating = strategy.openprofit          //floating profit/loss
risk = input(1,type=input.float,title="Risk % of equity ")/100           //risk % per trade

temp01 = balance * risk     //Risk in USD
temp02 = temp01/sl        //Risk in lots
temp03 = temp02*100      //Convert to contracts
size = temp03 - temp03%1 //Normalize to 1000s (Trade size)
if(size < 1)
    size := 1         //Set min. lot size


strategy.entry("long",1,when=longC)
//strategy.close("long", when = crossunder(close,out) or not (timeinrange(timeframe.period, "0300-1000")))
strategy.close("long", when =  not (timeinrange(timeframe.period, "0300-0945")))
strategy.exit("x_long","long", loss = sl)
     
    
strategy.entry("short",0,when=shortC)
//strategy.close("short",when = crossover(close,out) or not (timeinrange(timeframe.period, "0300-1000")))
strategy.close("short",when = not (timeinrange(timeframe.period, "0300-0945")))

strategy.exit("x_short","short", loss = sl)

//strategy.exit("closelong", "RSI_BB_LONG" , profit = close * 0.01 / syminfo.mintick, loss = close * 0.01 / syminfo.mintick, alert_message = "closelong")
//strategy.exit("closeshort", "RSI_BB_SHORT" , profit = close * 0.01 / syminfo.mintick, loss = close * 0.01 / syminfo.mintick, alert_message = "closeshort")


```

> Detail

https://www.fmz.com/strategy/428812

> Last Modified

2023-10-09 16:56:21
