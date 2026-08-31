
> Name

MFI-and-MA-Based-Quantitative-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/dd711e8dcded446544.png)

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
