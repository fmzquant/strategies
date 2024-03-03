
> Name

反向开盘吞噬策略Reverse-Opening-Engulfing-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12918e9fcf2d93d72e9.png)
[trans]
## 概述
反向开盘吞噬策略是一种基于股票首个K线的简单日内交易策略。该策略的核心思路是在每天开盘后的第一个K线出现时,判断其涨跌方向,并做出反向操作。如果首个K线是红色阳线,则做多;如果首个K线是绿色阴线,则做空。该策略同时设置了止损和止盈的出场机制。

## 策略原理
该策略的原理基于开盘后的首根K线的特殊性。开盘时,多空双方的力量对抗最为激烈,行情出现反转的概率较大。判断首根K线的涨跌方向,并反其道而行之,就是该策略的核心思路。

具体来说,在新的一天开盘后,策略会记录下首个K线的开盘价、收盘价和涨跌情况。如果开盘价高于收盘价(绿色阴线),代表空头获胜,则做多;如果开盘价低于收盘价(红色阳线),代表多头获胜,则做空。通过这样的反向操作,策略试图追捕开盘后的反转机会。

同时,策略还设置了止损和止盈机制,包括做多止损价格、做多止盈价格、做空止损价格和做空止盈价格,对多空仓位进行风险和盈利控制,避免过度损失或过早割肉。

## 优势分析
反向开盘吞噬策略具有以下优势:

1. 思路简单清晰,容易理解和实现。

2. 利用了开盘时段的高预测价值特征,抓住反转机会。

3. 同时设置止损止盈,可以有效控制风险。

4. 策略思路具有普适性,适用于大部分股票。

5. 参与成本较低,易于资金控制。

## 风险分析
反向开盘吞噬策略也存在一定风险,主要包括:

1. 开盘反转失败的概率。如果首根K线的反转信号失效,可能造成较大损失。

2. 无法有效过滤低质量个股。该策略对股票的基本面分析不足,可能选中一些基本面差的烂股。

3. 无法有效控制突发事件的系统性风险,如重大负面消息面的影响。

4. 止损止盈设置不当可能导致亏损扩大或利润缩水。

## 优化方向
反向开盘吞噬策略可以从以下几个方面进行优化:

1. 增加开盘反转信号的有效性检验,避免无效信号。例如结合成交量分析。

2. 结合股票基本面和技术指标进行股票池的优选,过滤低质量个股。

3. 增加对重大事件和消息面的监控模块,控制系统性风险。

4. 运用遗传算法、机器学习等方法动态优化止损止盈的设置。

## 总结
反向开盘吞噬策略通过判断首根K线的方向并做出反向操作,试图抓住开盘后的反转机会。该策略思路简单,参与成本低,有一定的实战价值。但我们也要清醒认识到其中的风险,并在实践中不断完善与优化策略,使之更稳健可靠。

||

## Overview
The Reverse Opening Engulfing Strategy is a simple intraday trading strategy based on the first candlestick after the opening. The core idea of this strategy is to judge the uptrend or downtrend of the first candlestick when it appears after the opening every day, and take counter operations. If the first candlestick is a red yang line, go long; if the first candlestick is a green yin line, go short. The strategy also sets up stop loss and take profit mechanisms for exiting positions.

## Strategy Logic  
The principle behind this strategy is the peculiarity of the first candlestick after opening. When the market opens, the forces of longs and shorts confront most intensely, and the probability of a reversal is relatively large. Judging the uptrend or downtrend of the first candlestick and taking counter operations is the core idea of this strategy.  

Specifically, after the opening of a new day, the strategy will record the opening price, closing price and price change of the first candlestick. If the opening price is higher than the closing price (green yin line), it means the bears have won and we should long; if the opening price is lower than the closing price (red yang line), it means the bulls have won and we should short. By taking such counter operations, the strategy attempts to capture reversal opportunities after opening.

Meanwhile, the strategy also sets up stop loss and take profit mechanisms, including long stop loss price, long take profit price, short stop loss price and short take profit price, to control risks and profits of long and short positions, avoiding excessive losses or premature profit taking.

## Advantage Analysis
The Reverse Opening Engulfing Strategy has the following advantages:

1. The logic is simple and clear, easy to understand and implement.  
2. It utilizes the high predictive value of the opening segment to capture reversal opportunities.
3. The stop loss and take profit settings can effectively control risks. 
4. The strategy idea has universality and is suitable for most stocks.
5. The participation cost is relatively low and capital control is easy.

## Risk Analysis  
The Reverse Opening Engulfing Strategy also has some risks, mainly including:  

1. Probability of opening reversal failure. A failed reversal signal of the first candlestick may cause huge losses.
2. Inability to effectively filter low-quality stocks. The strategy lacks sufficient fundamental analysis and may pick some stocks with poor fundamentals.  
3. Inability to effectively control systemic risks from black swan events, such as the impact of significantly negative news.  
4. Improper stop loss and take profit settings may lead to magnified losses or narrowed profits.

## Optimization Directions
The Reverse Opening Engulfing Strategy can be optimized in the following aspects:

1. Increase the validity test of opening reversal signals to avoid invalid signals, for example, combine volume analysis.  
2. Select stock pools by integrating fundamental and technical analysis to filter low-quality stocks.
3. Add monitoring modules for major events and news to control systemic risks.  
4. Use genetic algorithms, machine learning and other methods to dynamically optimize stop loss and take profit settings.   

## Summary  
The Reverse Opening Engulfing Strategy attempts to capture reversal opportunities after opening by judging the direction of the first candlestick and taking counter operations. The strategy idea is simple with low participation costs, and has some practical value. But we should also be soberly aware of the risks, and constantly improve and optimize the strategy in practice to make it more robust and reliable.
[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|0915-1455|Market session|
|v_input_2|true|Long Take Profit (%)|
|v_input_3|true|Short Take Profit (%)|
|v_input_4|0.5|Long Stop Loss (%)|
|v_input_5|0.5|Short Stop Loss (%)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-10-22 00:00:00
end: 2023-11-21 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © vikris
//@version=4
strategy("[VJ]First Candle Strategy", overlay = true,calc_on_every_tick = true,default_qty_type=strategy.percent_of_equity,default_qty_value=100,initial_capital=750,commission_type=strategy.commission.percent, 
     commission_value=0.02)


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
bool intradaySession = barInSession(i_marketSession)

// Trade only if intraday session is active

//=================Strategy logic goes in here===========================
 
// If start of the daily session changed, then it's first bar of the new session
isNewDay = time("D") != time("D")[1]
var firstBarCloseValue = close
var firstBarOpenValue = open
if isNewDay
    firstBarCloseValue := close
    firstBarOpenValue := open


greenCandle = firstBarOpenValue < firstBarCloseValue
redCandle = firstBarOpenValue > firstBarCloseValue

buy = redCandle
sell = greenCandle


// plot(firstBarCloseValue)
// plot(firstBarOpenValue)



//Final Long/Short Condition
longCondition = buy
shortCondition =sell
 
//Long Strategy - buy condition and exits with Take profit and SL
if (longCondition and intradaySession)
    stop_level = longStopPrice
    profit_level = longExitPrice
    strategy.entry("My Long Entry Id", strategy.long)
    strategy.exit("TP/SL", "My Long Entry Id", stop=stop_level, limit=profit_level)


//Short Strategy - sell condition and exits with Take profit and SL
if (shortCondition and intradaySession)
    stop_level = shortStopPrice
    profit_level = shortExitPrice
    strategy.entry("My Short Entry Id", strategy.short)
    strategy.exit("TP/SL", "My Short Entry Id", stop=stop_level, limit=profit_level)
 
 
// Square-off position (when session is over and position is open)
squareOff = (not intradaySession) and (strategy.position_size != 0)
strategy.close_all(when = squareOff, comment = "Square-off")

// ********** Strategy - End **********
```

> Detail

https://www.fmz.com/strategy/432901

> Last Modified

2023-11-22 16:05:24
