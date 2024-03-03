
> Name

利用双向RSI突破策略Dual-RSI-Breakthrough-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1b28de5ca210cbe9cfd.png)
[trans]

## 概述

双向RSI突破策略是一个利用RSI指标识别价格反转点的算法交易策略。它通过比较RSI指标与设定的上下阈值,判断行情是否超买超卖并发出交易信号。

## 策略原理

该策略主要依赖RSI指标判断行情。RSI指标基于一定周期内收盘价的变化计算得出,它反映了股票的买卖力道。当RSI上穿设定的上阈值(默认75)时,表示股票进入超买区域;当RSI下穿设定的下阈值(默认25)时,表示股票进入超卖区域。

策略判断规则:

1. 当RSI上穿上阈值时,做空;
2. 当RSI下穿下阈值时,做多;
3. 止损或止盈后平仓。

其交易逻辑简单清晰,参考参数设定合理,可配置空间大,适合用来捕捉行情中的较大趋势。

## 优势分析

该策略具有如下优势:

1. 逻辑简单,容易理解和实现;
2. 参考参数设定合理,可进行个性化配置;
3. 可配置反转交易逻辑,灵活应对行情;
4. 能有效识别价格反转点,捕捉大趋势。

总体来说,该策略参考参数设定合理,实现简单,通过RSI指标可有效判断价格反转,适合中长线捕捉行情大趋势,是一款易于掌握使用的量化策略。

## 风险分析

尽管该策略较为简单可靠,我们也不能忽视其面临的潜在风险:

1. RSI指标发出错误信号的概率较大。RSI并不能完美预测价格反转,可能出现误判。
2. 趋势行情中连续止损的可能。RSI指标难以区分正常范围调整与趋势反转。
3. 震荡行情中亏损较多。RSI指标无法有效判断震荡走势,此环境下策略损失加大。

为控制风险,我们需要注意以下几点:

1. 适当调整参数,防止误判率过高;
2. 结合其他指标确认交易信号,提高准确性;  
3. 加大止盈比例,减小单笔止损;
4. 注意规避震荡行情的交易。

## 优化方向  

考虑到该策略主要面临反转误判和震荡行情亏损的风险,我们可以从以下几个方面进行优化:

1. 结合其他指标进行信号过滤。例如KDJ、MACD等指标可发挥过滤作用,避免误判。
2. 增加条件单次止损额度。适当放大单次止损空间,有助于策略跟大趋势运行。
3. 设定开仓频率限制。加入每定周期只做一次或N次交易的逻辑閾値,可控制过于密集开仓。
4. 设置行情状态判断。判断策略只在趋势行情下运行,避开震荡行情,可大幅优化策略收益风险比。

## 总结  

双向RSI突破策略总体而言是一个简单实用的量化策略。它通过RSI指标判断价格反转,实现了简单的趋势跟踪。尽管存在一定误判风险,但可通过参数调整和信号过滤进行优化,在捕捉中长线趋势中发挥重要作用。其逻辑简明,适合量化交易的初学者参考学习。通过优化应用,本策略可望获取较为稳定的量化收益。


||

## Overview

The dual RSI breakout strategy is an algorithmic trading strategy that identifies price reversal points using the RSI indicator. It generates trading signals by comparing the RSI indicator with preset upper and lower threshold values to determine whether the market is overbought or oversold.

## Strategy Logic

This strategy mainly relies on the RSI indicator to judge the market condition. The RSI indicator is calculated based on the changes in closing prices over a certain period, reflecting the buying and selling momentum of the stock. When the RSI crosses above the preset upper threshold (default 75), it indicates the stock has entered the overbought zone. When the RSI falls below the preset lower threshold (default 25), it indicates the stock has entered the oversold zone.  

The judgment rules are:

1. When RSI crosses above the upper threshold, go short;  
2. When RSI crosses below the lower threshold, go long;
3. Close position when reaching stop loss or take profit.

Its trading logic is simple and clear, with reasonable reference parameter settings, large configuration space, and is suitable for capturing larger trends in the market.  

## Advantage Analysis

The advantages of this strategy include:

1. Simple logic that is easy to understand and implement;
2. Reasonable reference parameter settings that can be personalized; 
3. Configurable reverse trading logic that can flexibly respond to market conditions;
4. Can effectively identify price reversal points and capture major trends.

In general, with reasonable reference parameter settings, simple implementation, and the ability to effectively determine price reversals through RSI, this strategy is suitable for medium- to long-term trend capturing and is easy to grasp and use as a quantitative strategy.

## Risk Analysis

Although this strategy is relatively simple and reliable, we cannot ignore the potential risks it faces:

1. Relatively high probability of RSI indicators triggering false signals. RSI cannot perfectly predict price reversals, which may lead to misjudgements. 
2. Possibility of continuous stop loss in a trending market. RSI finds it difficult to distinguish normal range-bound adjustments from trend reversals.  
3. More losses likely in a ranging market. RSI is unable to effectively determine ranging trends, leading to greater losses in this environment.

To control risks, we need to pay attention to the following:  

1. Adjust parameters appropriately to prevent excessive misjudgement rates.
2. Confirm trading signals with other indicators to improve accuracy.
3. Increase the profit taking ratio and reduce single stop loss size.  
4. Avoid trading in ranging markets.

## Optimization Directions   

Considering the main risks faced by this strategy are reversal misjudgements and losses in ranging markets, we can optimize from the following aspects:  

1. Filter signals with other indicators. Indicators like KDJ and MACD can play a filtering role to avoid misjudgements.
2. Increase the threshold for single stop loss amounts. Appropriately expanding the single stop loss space can help the strategy follow big trends.   
3. Set open position frequency limits. Add logic restricting entries to once or N times per certain period to control overly frequent position opening.  
4. Set market condition judgements. Ensure strategy only runs in trending markets, avoiding ranging markets, which can significantly optimize the strategy's risk-reward ratio.  

## Conclusion   

In summary, the dual RSI breakout strategy is a simple and practical quantitative strategy. It identifies price reversals via RSI to achieve simple trend following. Although certain misjudgement risks exist, optimizations like parameter tuning, signal filtering can help mitigate this and allow it to play an important role in catching medium- to long-term trends. Its logic is straightforward, making it suitable for beginner quants to reference and learn from. With further optimizations, this strategy shows promise in obtaining relatively stable quantitative returns.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|14|Period|
|v_input_2|75|Upper Threshold|
|v_input_3|25|Lower Threshold|
|v_input_4|false|Imverse Algorthim|
|v_input_5|true|Show Lines|
|v_input_6|true|Show Labels|
|v_input_7|2|Risk %|
|v_input_8|false|Is this a 2 digit pair? (JPY, XAU, XPD...|
|v_input_9|250|stop loss pips|
|v_input_10|2500|take profit pips|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-19 00:00:00
end: 2023-12-26 00:00:00
period: 3m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
strategy("RSI Algo", overlay=true)

// Calculate start/end date and time condition
DST = 1 //day light saving for usa
//--- Europe
London = iff(DST==0,"0000-0900","0100-1000")
//--- America
NewYork = iff(DST==0,"0400-1500","0500-1600")
//--- Pacific
Sydney = iff(DST==0,"1300-2200","1400-2300")
//--- Asia
Tokyo = iff(DST==0,"1500-2400","1600-0100")

//-- Time In Range
timeinrange(res, sess) => time(res, sess) != 0

london = timeinrange(timeframe.period, London)
newyork = timeinrange(timeframe.period, NewYork)

time_cond = true


myPeriod = input(defval=14, type=input.integer, title="Period")
myThresholdUp = input(defval=75, type=input.float, title="Upper Threshold")
myThresholdDn = input(defval=25, type=input.float, title="Lower Threshold")
myAlgoFlipToggle = input(defval=false, type=input.bool, title="Imverse Algorthim")
myLineToggle = input(defval=true, type=input.bool, title="Show Lines")
myLabelToggle = input(defval=true, type=input.bool, title="Show Labels")
myRSI=rsi(close, myPeriod)
buy = myAlgoFlipToggle ? falling(myRSI,1) and cross(myRSI, myThresholdDn) : rising(myRSI, 1) and cross(myRSI,myThresholdUp) //and time_cond
sell = myAlgoFlipToggle ? rising(myRSI, 1) and cross(myRSI,myThresholdUp) : falling(myRSI,1) and cross(myRSI, myThresholdDn) //and time_cond
myPosition = 0
myPosition := buy==1 ? 0 : sell==1 or myPosition[1]==1 ? 1 : 0
trendColor = buy ? color.red : sell ? color.green : na
plot(myLineToggle ? buy and myPosition[1]==1 ? low - 0.004: sell and myPosition[1]==0 ? high + 0.004 : na : na, color=trendColor, style=plot.style_line, linewidth=4, editable=false)
plotshape(myLabelToggle ? buy and myPosition[1]==1 ? low - 0.005 : na : na, style=shape.labelup, location=location.absolute, text="Buy", transp=0, textcolor = color.white, color=color.black, editable=false)
plotshape(myLabelToggle ? sell and myPosition[1]==0 ? high + 0.005 : na : na, style=shape.labeldown, location=location.absolute, text="Sell", transp=0, textcolor = color.white, color=color.black, editable=false)

strategy.initial_capital = 50000
    //Calculate the size of the next trade
balance = strategy.netprofit + strategy.initial_capital //current balance
floating = strategy.openprofit          //floating profit/loss
risk = input(2,type=input.float,title="Risk %")/100           //risk % per trade
isTwoDigit = input(false,"Is this a 2 digit pair? (JPY, XAU, XPD...")


stop = input(250, title="stop loss pips")
tp = input(2500, title="take profit pips")
if(isTwoDigit)
    stop := stop/100
    
temp01 = balance * risk     //Risk in USD
temp02 = temp01/stop        //Risk in lots
temp03 = temp02*100000      //Convert to contracts
size = 1
    
strategy.entry("long",1,size,when=buy and myPosition[1]==1 )
strategy.entry("short",0,size,when=sell and myPosition[1]==0)

strategy.exit("exit_long","long",loss=stop, profit=tp)      //Long exit (stop loss)
strategy.exit("exit_short","short",loss=stop, profit=tp)      //Short exit (stop loss)

//strategy.close_all(when= not time_cond)

```

> Detail

https://www.fmz.com/strategy/436754

> Last Modified

2023-12-27 14:33:15
