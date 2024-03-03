
> Name

基于MFI和MA的量化反转策略MFI-and-MA-Based-Quantitative-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/dd711e8dcded446544.png)
[trans]

## 概述

该策略是一个利用MFI指标识别超买超卖区域,结合MA过滤判断价格反转方向的短线交易策略。它可以在股票、外汇、商品和加密货币等市场有效。

## 策略原理

策略使用MFI指标判断市场的超买超卖现象。当MFI进入20以下的超卖区时,表示底部区域,价值被低估,此时看涨;当MFI进入80以上的超买区时,表示顶部区域,资产被高估,此时看跌。

为过滤假反转,策略还引入了MA指标判断价格趋势方向。只有当MFI反转的同时,价格站上或跌破MA均线时,才产生交易信号。

具体交易逻辑是:

1. MFI下破20以下进入超卖区,同时收盘价站上MA均线,产生买入信号
2. MFI上破80以上进入超买区,同时收盘价跌破MA均线,产生卖出信号

这样,通过双重指标过滤,可以有效识别反转机会,进场的信号较为可靠。

## 策略优势

1. 使用双重指标确认,避免假突破,信号可靠性高
2. 利用超买超卖区域反转,是经典且行之有效的交易技术
3. 结合趋势过滤,使信号更加准确可靠
4. 适用于多种市场,灵活性强

## 策略风险

1. 市场可能长期持续上涨或下跌,导致止损
2. 需要关注系统性风险,避免极端行情造成错失反转点
3. 交易频率可能较高,需要关注交易成本控制

应对方法:

1. 适当放宽止损幅度,给予策略更多空间
2. 加大仓位时注意关注更大级别图表,判断系统性风险
3. 优化参数,降低无谓交易

## 策略优化方向  

1. 优化MA参数,与交易品种特性匹配
2. 优化超买超卖参数,适应不同市场情绪
3. 增加仓位管理机制,让盈利更加可控

## 总结

该策略整合了经典分析方法与现代量化技术,通过严格的双重指标过滤,在各种品种中展现强大的适应性,是一款值得推荐的通用短线策略。

||

## Overview

This strategy utilizes the MFI indicator to identify overbought and oversold zones combined with the MA to filter the price reversal direction. It works well across stocks, forex, commodities and crypto markets.

## Strategy Logic  

The strategy leverages the MFI indicator to gauge overbought and oversold conditions in the market. When the MFI drops below 20 into the oversold zone, it signals that the asset is undervalued and a bottom is forming, implying a long signal. When the MFI rises above 80 into the overbought area, it suggests that the asset is overvalued and likely to correct lower soon, triggering a short signal.

To avoid false reversals, the strategy also employs the MA indicator to determine the trend direction. Trading signals are only generated when the MFI reversal aligns with the price breaking or standing above the MA line. 

The specific trading logic is:

1. When the MFI breaks below 20 into the oversold zone and the close stands above the MA line, a buy signal is generated.

2. When the MFI breaks above 80 into the overbought zone and the close breaks the MA line, a sell signal is triggered.

With the dual indicator confirmation, the strategy can effectively identify reversal opportunities with reliable entry signals.

## Advantages

1. Dual indicator confirmation avoids false breakouts and ensures high signal reliability.

2. Utilizing overbought/oversold reversals is a classic and time-tested trading technique.  

3. Incorporating trend filtering makes signals more accurate and reliable.

4. Applicable across various markets with strong adaptivity.

## Risks

1. The market may trend persistently higher or lower leading to stop loss.

2. Need to watch out for systematic risks in extreme market conditions causing missed reversal points.  

3. High trading frequency may lead to increased transaction costs.

Mitigations:

1. Allow wider stop loss to give the strategy more room.

2. Increase position sizing cautiously while watching higher timeframe charts for systemic risk signals.   

3. Optimize parameters to avoid unnecessary trades.


## Enhancement Opportunities

1. Optimize MA parameters to match the characteristics of the trading instrument.  

2. Fine tune the overbought/oversold levels based on varying market sentiment.

3. Incorporate position sizing rules for more controlled profits.


## Conclusion  

This strategy integrates classic analysis techniques with modern quant methods. By rigorously applying dual indicator confirmations, it demonstrates robust adaptivity across various instruments, making it a recommended generic short-term strategy.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0915-1455|Market session|
|v_input_2|true|Long Take Profit (%)|
|v_input_3|true|Short Take Profit (%)|
|v_input_4|0.5|Long Stop Loss (%)|
|v_input_5|0.5|Short Stop Loss (%)|
|v_input_6|3|MFI Length|
|v_input_7|100|Overbought Level|
|v_input_8|false|Oversold Level|
|v_input_9|0.5|Bar Body Size, 1=No Wicks|
|v_input_10|true|Use MA Trend Filter|
|v_input_11|80|MA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-19 00:00:00
end: 2023-12-26 00:00:00
period: 1m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © vikris

//@version=4
strategy("[VJ]Thor for MFI", overlay=true, calc_on_every_tick = false,pyramiding=0)

// ********** Strategy inputs - Start **********

// Used for intraday handling
// Session value should be from market start to the time you want to square-off 
// your intraday strategy
// Important: The end time should be at least 2 minutes before the intraday
// square-off time set by your broker
var i_marketSession = input(title="Market session", type=input.session, 
     defval="0915-1455", confirm=true)

// Make inputs that set the take profit % (optional)
longProfitPerc = input(title="Long Take Profit (%)",
     type=input.float, minval=0.0, step=0.1, defval=1) * 0.01

shortProfitPerc = input(title="Short Take Profit (%)",
     type=input.float, minval=0.0, step=0.1, defval=1) * 0.01
     
// Set stop loss level with input options (optional)
longLossPerc = input(title="Long Stop Loss (%)",
     type=input.float, minval=0.0, step=0.1, defval=0.5) * 0.01

shortLossPerc = input(title="Short Stop Loss (%)",
     type=input.float, minval=0.0, step=0.1, defval=0.5) * 0.01    

i_MFI = input(3, title="MFI Length")
OB=input(100, title="Overbought Level")
OS=input(0, title="Oversold Level")
barsizeThreshold=input(.5, step=.05, minval=.1, maxval=1, title="Bar Body Size, 1=No Wicks")
i_MAFilter = input(true, title="Use MA Trend Filter")
i_MALen = input(80, title="MA Length")
// ********** Strategy inputs - End **********


// ********** Supporting functions - Start **********

// A function to check whether the bar or period is in intraday session
barInSession(sess) => time(timeframe.period, sess) != 0
// Figure out take profit price
longExitPrice  = strategy.position_avg_price * (1 + longProfitPerc)
shortExitPrice = strategy.position_avg_price * (1 - shortProfitPerc)

// Determine stop loss price
longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)


// ********** Supporting functions - End **********


// ********** Strategy - Start **********
// See if intraday session is active
bool intradaySession = true

// Trade only if intraday session is active

//=================Strategy logic goes in here===========================
 

MFI=mfi(close,i_MFI)
barsize=high-low
barbodysize=close>open?(open-close)*-1:(open-close)
shortwicksbar=barbodysize>barsize*barsizeThreshold
SMA=sma(close, i_MALen)
MAFilter=close > SMA



BUY = MFI[1] == OB and close > open and shortwicksbar and (i_MAFilter ? MAFilter : true)

SELL = MFI[1] == OS and close < open and shortwicksbar and (i_MAFilter ? not MAFilter : true) 

//Final Long/Short Condition
longCondition = BUY
shortCondition = SELL
 
//Long Strategy - buy condition and exits with Take profit and SL
if (longCondition and intradaySession)
    stop_level = longStopPrice
    profit_level = longExitPrice
    strategy.entry("Buy", strategy.long)
    strategy.exit("TP/SL", "Buy", stop=stop_level, limit=profit_level)


//Short Strategy - sell condition and exits with Take profit and SL
if (shortCondition and intradaySession)
    stop_level = shortStopPrice
    profit_level = shortExitPrice
    strategy.entry("Sell", strategy.short)
    strategy.exit("TP/SL", "Sell", stop=stop_level, limit=profit_level)
 
 
// Square-off position (when session is over and position is open)
squareOff = (not intradaySession) and (strategy.position_size != 0)
strategy.close_all(when = squareOff, comment = "Square-off")

// ********** Strategy - End **********
```

> Detail

https://www.fmz.com/strategy/436756

> Last Modified

2023-12-27 14:42:16
