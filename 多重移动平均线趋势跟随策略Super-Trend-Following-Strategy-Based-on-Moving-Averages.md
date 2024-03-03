
> Name

多重移动平均线趋势跟随策略Super-Trend-Following-Strategy-Based-on-Moving-Averages

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/102c063d41fe766561a.png)
[trans]
## 概述

该策略是一种典型的趋势跟随策略。它使用多组不同周期的移动平均线来判断市场趋势,在趋势确立时入场,在短期趋势反转时离场。

## 策略原理  

该策略采用4组移动平均线:9日线、21日线、50日线和200日线。它们分别代表不同的时间维度。

当短期移动平均线由下向上突破长期移动平均线时,认为行情进入上涨趋势;当短期移动平均线由上向下跌破长期移动平均线时,认为行情进入下跌趋势。

策略以9日线为参考,判断其他几条移动平均线的排列关系,从而判断总体趋势方向。具体逻辑是:

多头入场条件:收盘价 > 9日线 且 9日线 > 21日线 且 21日线 > 50日线 且 50日线 > 200日线  

空头入场条件:收盘价 < 9日线 且 9日线 < 21日线 且 21日线 < 50日线 且 50日线 < 200日线

其中,收盘价与9日线的关系判断最短期趋势,9日线与21日线的关系判断短期趋势,21日线与50日线的关系判断中期趋势,50日线与200日线的关系判断长期趋势。只有当四组移动平均线的关系都符合时,才判断行情趋势成立,发出交易信号。

离场条件:收盘价跌破21日移动平均线,平掉所有多单;收盘价涨破21日移动平均线,平掉所有空单。

## 策略优势

1. 使用多组移动平均线判断趋势,可有效过滤非主流走势的市场噪音,捕捉中长线趋势。

2. 入场条件严格,需要多种时间维度的趋势判断都有效,可避免被短期调整套住。

3. 及时止损,有效控制风险。

## 风险及解决方法

1. 长期横盘整理市场中,容易产生大量虚假信号,从而增加交易风险。可通过优化参数,调整移动平均线的周期数量,过滤部分噪音。

2. 在剧烈行情中,移动平均线常常发生死叉或黄叉。这时需要结合其他因素判断真实趋势。可以加入像RSI,MACD等指标进行确认,避免错过大行情。

## 优化方向  

1. 参数优化。可以测试不同参数组合,寻找最优参数。如调整移动平均线的周期数,添加或调整止损条件等。

2. 增加质量过滤。例如在入场时判断成交量是否放大,避免量能不足的跳空。或者判断波动是否放大,避免震荡整理。

3. 增加其他技术指标确认,避免在剧烈行情中发出错误信号。可以考虑加入RSI、MACD等指标进行多因素判断。

## 总结  

该策略整体来说是一种典型且实用的趋势跟随策略。它使用多组移动平均线判断趋势,入场条件严格,可以有效锁定中长线趋势。同时搭配及时止损,可以控制风险。通过参数优化、增加确认指标等手段,可以进一步提高策略的稳定性和盈利能力。它适合那些喜欢跟随趋势进行长线操作的投资者。

||

## Overview  

This strategy is a typical trend following strategy. It uses multiple sets of moving averages with different periods to determine the market trend. It enters the market when the trend is established and exits when the short-term trend reverses.   

## Strategy Principle

The strategy employs 4 groups of moving averages: 9-day, 21-day, 50-day and 200-day lines. They represent different timeframes respectively.  

When the short-term moving average crosses over the long-term one upwards, it is determined that the market enters an uptrend. When it crosses downwards, the market is seen to be in a downtrend.   

The strategy takes the 9-day MA as a reference to observe the alignment of the other MAs, thereby judging the overall trend direction. Specifically, the logic is:

Long entry conditions: Close > 9-day MA and 9-day MA > 21-day MA and 21-day MA > 50-day MA and 50-day MA > 200-day MA.  

Short entry conditions: Close < 9-day MA and 9-day MA < 21-day MA and 21-day MA < 50-day MA and 50-day MA < 200-day MA.  

Here the relationship between close price and 9-day MA determines the shortest-term trend, while that between 9-day and 21-day MA judges short-term trend, 21-day and 50-day medium-term trend, 50-day and 200-day long-term trend. Only when the relationships of all the four MA pairs conform can a valid trend be established to generate trading signals.   

Exit conditions: close price crosses below 21-day MA, flatten all long positions; crosses above 21-day MA, flatten all short positions.   

## Advantages of the Strategy   

1. Adopting multiple MAs to determine the trend can filter out market noises from non-mainstream moves and capture medium-to-long term trends.  

2. Strict entry conditions require valid judgments across different timeframes, avoiding being trapped by short-term corrections.  

3. Timely stop loss helps effectively control risks.    

## Risks and Solutions 

1. In long-term rangebound markets, excessive false signals may occur and increase trading risks. This can be avoided by optimizing parameters and adjusting MA periods to filter out some noises.  

2. During violent trends, MA crosses happen frequently. Other factors are needed then to determine real trend, e.g. combining indicators like RSI and MACD for confirmation, in case strong moves are missed.  

## Optimization Directions   

1. Parameter optimization. Test different parameter combinations to find out the optimum. Such as adjusting MA periods, adding or modifying stop loss criteria etc.  

2. Improve quality filter. For instance, check if volume surges on entry to avoid insufficient momentum, or examine volatility to avoid oscillations.  

3. Introduce confirmation from more technical indicators to avoid wrong signals amid fierce market moves. Consider applying tools like RSI and MACD for multi-factor decision-making.  

## Summary   

Overall this is a typical and practical trend following strategy. It adopts multiple MAs to determine trends, has strict entry rules to lock in medium-to-long term trends. Together with timely stop loss, it helps control risks. Further improvements on stability and profitability can be achieved through ways like parameter optimization and adding confirmation indicators. It suits investors who prefer following the trend for long-term trading.  
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_int_1|14|rsi-length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-29 00:00:00
end: 2024-02-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © shayak1

//@version=5
strategy('Super SR', overlay=true)

r = input.int(14,"rsi-length",1,100)
rsi = ta.rsi(close,r)

len1 = 9
len2 = 21
len3 = 50
len4 = 200

ema1 = ta.ema(close, len1)
ema2 = ta.ema(close, len2)
ema3 = ta.ema(close, len3)
ema4 = ta.ema(close, len4)

plot(ema1,color= color.green)
plot(ema2,color= color.yellow)
plot(ema3,color= color.orange)
plot(ema4,color= color.red)


// *** entries 
Long1 = close > ema1
Long2 = ema1 > ema2
Long3 = ema2 > ema3
Long4 = ema3 > ema4
buy_condition = Long1 and Long2 and Long3 and Long4 and strategy.position_size == 0

if (buy_condition and strategy.position_size <= 1)
    strategy.entry("B", strategy.long)

Short1 = close < ema1
Short2 = ema1< ema2
Short3 = ema2< ema3
Short4 = ema3< ema4
sell_condition = Short1 and Short2 and Short3 and Short4 and strategy.position_size == 0

//if (sell_condition)
//    strategy.entry("S", strategy.short)

// trailing SL
//Long_sl = min(strategy.position_avg_price * 0.95, strategy.pos


//EXIT CONDITIONS

exit_long = ta.crossunder(close, ema2)
exit_short = ta.crossover(close, ema2)

if(exit_long)
    strategy.close("B", "LE", qty_percent=100)
if(exit_short)
    strategy.close("S", "SE", qty_percent=100)

//==============================================================================
//INSERT SECTION
//This section is where users will be required to insert the indicators they
//would like to use for their NNFX Strategy.
//==============================================================================
//INSERT - CONFIRMATION INDICATOR 1
//==============================================================================


//==============================================================================
//INSERT - CONFIRMATION INDICATOR 2
//==============================================================================


//==============================================================================
//INSERT - VOLUME INDICATOR
//==============================================================================


//==============================================================================
//INSERT - BASELINE INDICATOR
//==============================================================================


//==============================================================================
//INSERT - EXIT INDICATOR
//==============================================================================


//==============================================================================
//INSERT - CONTINUATION TRADES INDICATOR
//==============================================================================


//==============================================================================
//COMPLETED SECTION
//This section has been optimised to work with the above indicators the user
//has inserted above. The user does not require to change any code below and
//is completed and optimised for the full NNFX strategy. Users may wish to 
//customise this section of code if they wish to alter the NNFX strategy.
//==============================================================================
//COMPLETE - BACKTEST DATE RANGE
//==============================================================================
// start_day = input.int(1,"start day",1,31)
// start_month = input.int(1,"start month",1,12)
// start_year = input.int(1,"start year",2010,2023)



//==============================================================================
//COMPLETE - CURRENCY CONVERSION
//==============================================================================


//==============================================================================
//COMPLETE - ATR MONEY MANAGEMENT
//==============================================================================


//==============================================================================
//COMPLETE - USER INPUT CONDITIONS - C1
//==============================================================================


//==============================================================================
//COMPLETE - USER INPUT CONDITIONS - C2
//==============================================================================


//==============================================================================
//COMPLETE - USER INPUT CONDITIONS - Vol
//==============================================================================


//==============================================================================
//COMPLETE - USER INPUT CONDITIONS - Bl
//==============================================================================


//==============================================================================
//COMPLETE - USER INPUT CONDITIONS - Exit
//==============================================================================


//==============================================================================
//COMPLETE - CONTINUATION TRADES
//==============================================================================


//==============================================================================
//COMPLETE - ONE CANDLE RULE
//==============================================================================


//==============================================================================
//COMPLETE - BRIDGE TOO FAR
//==============================================================================


//==============================================================================
//COMPLETE - BASELINE AND ATR RULE
//==============================================================================


//==============================================================================
//COMPLETE - ENTRY CONDITIONS
//==============================================================================


//==============================================================================
//COMPLETE - ENTRY ORDERS
//==============================================================================


//==============================================================================
//COMPLETE - TAKE PROFIT AND STOP LOSS CONDITIONS
//==============================================================================


//==============================================================================
//COMPLETE - EXIT ORDERS
//==============================================================================


//==============================================================================
//COMPLETE - CLOSE ORDERS
//==============================================================================


//==============================================================================
```

> Detail

https://www.fmz.com/strategy/441058

> Last Modified

2024-02-05 11:10:41
