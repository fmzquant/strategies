
> Name

三重EMA顺势策略Triple-EMA-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

本策略基于SoftKill21的Amazing scalper for majors with risk management策略进行修改,使用三重指数移动平均线替代原有的简单移动平均线,以降低滞后。该策略适用于主要货币对的1分钟周期,采用趋势跟踪方法,根据快速EMA、标准EMA和缓慢EMA的黄金交叉和死叉进行买入和卖出操作。同时结合伦敦和纽约交易时段,以及风险管理原则确定仓位大小。

## 策略原理 

本策略使用三条不同周期的指数移动平均线:25周期快速EMA、50周期标准EMA和100周期缓慢EMA。当快速EMA上穿标准EMA和缓慢EMA时,产生买入信号;当快速EMA下穿标准EMA和缓慢EMA时,产生卖出信号。为降低滞后,使用二次指数平滑技术计算EMA。策略还根据伦敦和纽约时段的开市时间,分别判断是否符合进场条件。此外,策略使用账户权益的固定百分比确定每个订单的仓位大小,以控制风险。

具体来说,策略首先计算三条EMA线,然后判断快速EMA是否与标准EMA和缓慢EMA形成黄金交叉或死叉,如果同时满足与伦敦或纽约时段开市时间匹配的条件,则产生买入或卖出信号。在确定仓位大小时,策略先计算账户权益的固定百分比作为风险敞口,再转换为合约数和标准手数,从而动态调整每个订单的仓位。

## 优势分析

该策略具有以下优势:

1. 使用三重EMA,能够有效平滑价格数据,识别趋势方向。快速EMA对价格变化敏感,标准EMA稳定跟踪,慢速EMA过滤噪音。三者配合使用,能够过滤假突破,确定趋势方向。

2. 应用二次指数平滑技术计算EMA,降低滞后性,使信号更加灵敏。

3. 结合主要交易时段,避免在非主要交易时间出现误导信号。

4. 采用风险管理原则,根据账户权益调整仓位。避免单笔损失过大对账户造成冲击。

5. 策略逻辑简单清晰,容易理解实现,适合新手学习。

6. 可针对不同货币对、时间周期进行优化调整,适用面广。

## 风险分析

该策略也存在一些可能的风险:

1. EMA无法有效过滤突发事件造成的短期假突破,可能产生错误信号。建议结合其他指标进行分析过滤。

2. 固定百分比仓位无法对市场波动进行动态调整,存在仓位过大或过小的问题。可以考虑引入波动率等指标动态调整仓位。

3. 仅考虑两个主要交易时段,可能错过其他时段的交易机会。可以测试不同时段的效果。 

4. 不具备止损机制,无法有效控制单边亏损。可以设置移动止损或时间止损。

5. EMA交叉具有一定滞后性,可能错过最佳入场时机。可以考虑降低EMA周期或结合其他先行指标。

6. 效果可能受到交易成本的影响。建议适当调整止损和止盈位置。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 测试不同EMA周期参数,寻找最优参数组合。可以引入自适应EMA等技术动态优化EMA周期。

2. 增加其他过滤指标,如RSI、布林带等,提高信号的质量。

3. 引入动态仓位管理机制,根据市场波动性和盈利情况调整仓位。

4. 加入移动止损、时间止损来限制亏损。适当调整止损点位。

5. 测试不同交易时段,找到最佳交易时间。可以结合波动率等指标筛选时段。

6. 优化止盈和止损水平,平衡获利大小和胜率。引入抛物线止损等智能止损。 

7. 尝试修改改进EMA计算方式,如线性加权EMA等,降低滞后。

8. 结合自动机器学习方法寻找最优参数。

9. 对交易成本进行建模,调整系统以获得净利润最大化。

通过以上优化,可以提高系统获利能力,控制回撤,扩展适用范围,从而获得一个更强大和稳定的交易策略。

## 总结

本策略整体思路清晰,使用三重EMA识别趋势,配合主要交易时段进行操作,并采用账户比例确定仓位,属于典型的趋势跟踪型策略。策略优化空间较大,通过参数优化、机制改进、技术引入等手段,可以进一步扩展该策略在更多市场中的适用性,提高策略稳健性。作为新手学习폟榫,该策略是一个很好的起点。通过学习和改进,可以提高对量化交易系统的理解。如果处理得当,该策略可以转化为一个成熟可靠的量化策略。

|| 

## Overview

This strategy is modified from SoftKill21's Amazing scalper for majors with risk management by using triple exponential moving averages instead of simple moving averages to reduce lag. It is suitable for major currency pairs at 1-minute timeframe, adopting trend following approach based on golden cross and death cross of fast EMA, standard EMA and slow EMA. It also incorporates London and New York sessions and risk management principles to determine position sizing.

## Strategy Logic

The strategy uses three EMAs with different periods: 25-period fast EMA, 50-period standard EMA and 100-period slow EMA. When fast EMA crosses over standard EMA and slow EMA, it generates buy signal. When fast EMA crosses below standard EMA and slow EMA, it generates sell signal. To reduce lag, EMAs are calculated using double exponential smoothing technique. The strategy also checks if open market times of London or New York sessions match the entry conditions. In addition, position sizing of each order is determined dynamically by using a fixed percentage of account equity to control risk.

Specifically, the strategy first calculates the three EMA lines, then checks if fast EMA forms golden cross or death cross with standard EMA and slow EMA. If the condition also matches London or New York open market times, buy or sell signals are generated. When determining position size, the strategy calculates fixed percentage of account equity as risk exposure, then converts it to contract size and round lots to adjust position dynamically for each order.

## Advantage Analysis 

The strategy has the following advantages:

1. The triple EMAs can effectively smooth price data and identify trend direction. Fast EMA is sensitive to price changes, standard EMA steadily tracks, and slow EMA filters noise. Used together, they can filter false breakouts and determine trend direction.

2. The use of double exponential smoothing reduces lag and makes signals more sensitive. 

3. Incorporating major trading sessions avoids misleading signals during off-peak hours.

4. The risk management approach adjusts position size based on account equity, avoiding excessive loss on single trades.

5. The logic is simple and clear, easy to understand and implement, suitable for beginners.

6. The strategy can be optimized and adjusted for different currency pairs and timeframes, with wide applicability.

## Risk Analysis

The strategy also has some potential risks:

1. EMAs cannot effectively filter short-term false breakouts caused by sudden events, which may generate wrong signals. Other indicators may be added to filter and analyze.

2. Fixed percentage position sizing cannot dynamically adjust to market volatility, leading to over- or under-sized positions. Dynamic position sizing based on volatility can be considered.

3. Only two major sessions are considered, which may miss trading opportunities in other sessions. Effects of different sessions can be tested.

4. Lack of stop loss mechanism results in inability to effectively control one-sided loss. Moving or time-based stop loss can be implemented.

5. EMA crossovers have some lag and may miss best entry timing. Reducing EMA periods or incorporating leading indicators can help.

6. Performance may be affected by transaction costs. Stop loss and take profit levels should be adjusted accordingly.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Test different EMA period parameters to find optimal combinations. Adaptive EMAs can be introduced to dynamically optimize periods.

2. Add other filtering indicators like RSI, Bollinger Bands to improve signal quality.

3. Introduce dynamic position sizing based on market volatility and profitability. 

4. Add moving or time stop loss to limit losses. Fine tune stop loss levels.

5. Test different trading sessions to find the optimal times. Volatility measures can help screening.

6. Optimize take profit and stop loss levels to balance profit size and win rate. Introduce intelligent stops like parabolic SAR.

7. Try modifying EMA calculation like linear weighted EMA to reduce lag.

8. Employ machine learning to find optimal parameters.

9. Model transaction costs and adjust system for maximum net profit.

Through the above optimizations, the system's profitability can be improved, drawdowns controlled, applicability expanded, to obtain a more powerful and robust trading strategy.

## Summary

The overall logic of this strategy is clear, using triple EMAs to identify trends, combining with major sessions for execution, and adopting position sizing based on account percentage. It belongs to a typical trend following system. There is large room for optimization via parameter tuning, mechanism improvements, technology introduction etc. to further expand its applicability across more markets and improve robustness. As a learning 웽e for beginners, it provides a good starting point. With practice and enhancements, it can transform into a mature and reliable quantitative strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|25|Length|
|v_input_2|50|Length|
|v_input_3|100|Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_5|50|TP|
|v_input_6|100|SL|
|v_input_7|true|Trade london session?|
|v_input_8|true|Trade new york session?|
|v_input_9|true|Risk % of equity |


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-09-19 00:00:00
end: 2023-09-26 00:00:00
period: 15m
basePeriod: 5m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// original author SoftKill21
//@version=4
//@capam 

strategy(title="Triple EMA Scalper low lag strat", shorttitle="3EMA scalper", overlay=true)
strategy.initial_capital = 50000
len1 = input(25, minval=1, title="Length")
len2 = input(50, minval=1, title="Length")
len3 = input(100, minval=1, title="Length")

src = input(close, title="Source")
tmp1 = ema(src, len1)
tmp2 = ema(src, len2)
tmp3 = ema(src, len3)
fastemaOut = 2*tmp1 - ema(tmp1, len1)
standardemaOut = 2*tmp2 - ema(tmp2, len2)
slowemaOut = 2*tmp3 - ema(tmp3, len3)
//fastemaOut = sma(src, len1)
//standardemaOut = sma(src, len2)
//slowemaOut = sma(src, len3)

plot(fastemaOut, color=color.black, title="First EMA")
plot(standardemaOut, color=color.yellow, title="Second EMA")
plot(slowemaOut, color=color.blue, title="Third EMA")


timeinrange(res, sess) => time(res, sess) != 0


londopen = timeinrange(timeframe.period, "0300-1100") 
nyopen = timeinrange(timeframe.period, "0800-1600") 

longCondition = crossover(fastemaOut,standardemaOut) and crossover(fastemaOut,slowemaOut) and londopen //or nyopen)
shortCondition = crossunder(fastemaOut,standardemaOut) and crossunder(fastemaOut,slowemaOut) and londopen// or nyopen)

longCondition2 = crossover(fastemaOut,standardemaOut) and crossover(fastemaOut,slowemaOut) and nyopen
shortCondition2 = crossunder(fastemaOut,standardemaOut) and crossunder(fastemaOut,slowemaOut) and nyopen
tp = input(50,title="TP")
sl = input(100, title="SL")

tradeLondon =  input(title="Trade london session?", type=input.bool, defval=true)
tradeNewyork = input(title="Trade new york session?", type=input.bool, defval=true)

//MONEY MANAGEMENT--------------------------------------------------------------
balance = strategy.netprofit + strategy.initial_capital //current balance
floating = strategy.openprofit          //floating profit/loss
risk = input(1,type=input.float,title="Risk % of equity ")/100           //risk % per trade
temp01 = balance * risk     //Risk in USD
temp02 = temp01/sl        //Risk in lots
temp03 = temp02*100000      //Convert to contracts
size = temp03 - temp03%1000 //Normalize to 1000s (Trade size)
if(size < 1000)
    size := 1000        

if(tradeLondon==true)
    strategy.entry("long",1,when=longCondition)
    strategy.exit("tp/sl","long",profit=tp,loss=sl)
    
    strategy.entry("short",0,when=shortCondition)
    strategy.exit("tp/sl","short",profit=tp,loss=sl)

if(tradeNewyork==true)
    strategy.entry("long",1,when=longCondition2)
    strategy.exit("tp/sl","long",profit=tp,loss=sl)
    
    strategy.entry("short",0,when=shortCondition2)
    strategy.exit("tp/sl","short",profit=tp,loss=sl)

// strategy.risk.max_intraday_filled_orders(2) 
```

> Detail

https://www.fmz.com/strategy/428000

> Last Modified

2023-09-27 17:19:26
