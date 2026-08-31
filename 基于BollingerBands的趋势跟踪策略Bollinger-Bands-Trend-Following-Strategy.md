
> Name

基于BollingerBands的趋势跟踪策略Bollinger-Bands-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10759dfc4412691ca86.png)

## Overview

This strategy is named "Bollinger Bands Trend Following Strategy". It uses the Bollinger Bands indicator to determine price trends and enters long or short when price breaks out of the Bollinger Bands channel. It incorporates a moving average filter to judge trend direction upon breakout, thus deciding between long and short entries.  

## Principles  

The strategy relies primarily on the Bollinger Bands indicator to determine price trend and entry points. The Bollinger Bands contains three lines:

1. Middle line: n-day moving average  
2. Upper line: n-day standard deviation upwards
3. Lower line: n-day standard deviation downwards

When price breaks out upwards from the lower line through the upper line, a bullish trend is identified. When price breaks downwards from the upper line through the lower line, a bearish trend has started. The strategy enters long or short on occurrence of these two types of breakouts.  

Specifically, the strategy logic is:

1. Enter long when close breaks out upwards from the Bands lower line.  
2. Enter short when close breaks downwards from the Bands upper line.


To avoid false breakouts, a moving average filter is added. Entry only occurs when close breaks the Bands together with breaking the moving average.  

Here the Exponential Moving Average is used as the indicator.

In summary, the criteria for determining trend breakout are:

1. Long signal: Close breaks out Bands upper line && Close breaks out moving average
2. Short signal: Close breaks out Bands lower line && Close breaks out moving average

After entry, the stop loss tracks the middle line. Exits when price touches the middle line again. 

## Strength Analysis   

The main strengths of this strategy include:

1. Catch new trends formed by middle line breakouts. Bands channel provides room for price fluctuation, breakout signals start of new direction.
2. Avoid false breakouts through moving average filter, ensures entry only on actual trend reversal.  
3. Built-in stop loss mechanism by tracking middle line, effectively controls risks.
4. Simple and clear logic, easy to understand and implement, suitable for algo trading strategies.  
5. Utilizes Bands channel and moving average indicators, no need to predict prices, identifies trends based on evidence after the facts.  

## Risk Analysis

Despite the advantages, the strategy also carries the following risks:

1. Improper Bands parameters may increase trade frequency and risks. Overly sensitive settings may cause excessive false breakouts and high system turnover.
2. Inadequate moving average parameter selection may cause missing actual trends or generating false signals. Parameter tuning through repeated testing and optimization is needed.   
3. Stop loss relies on middle line, may exit prematurely or allows too much retracement room. This could lead to missing most profits or increased loss risks.

To control the above risks, the following optimization can be done:  

1. Adjust Bands parameters properly, increase channel width to reduce false breakout probabilities.
2. Test different moving average types and lengths to find optimal combinations.  
3. Try other stop loss methods, e.g. trailing stop loss or progressive stop loss levels.

## Optimization Directions   

Based on the risk analysis, further optimizations can be done in the following areas:

1. **Parameter Optimization**: Use more systematic methods like genetic algorithms to find optimal parameter combinations for Bands and moving averages, to make the strategy more stable and profitable.

2. **Stop Loss Optimization**: Test different stop loss techniques like ATR stops, trailing stops etc, to determine the best stops mechanism.  

3. **Filter Optimization**: Try adding other indicators like RSI, KD etc as additional filters, to lower false signal probabilities and increase profitability rate.

4. **Entry Criteria Optimization**: Add other considerations like trend conditions, abnormal VOLUME etc to strictly select entry timing, avoid unnecessary entries.

5. **Machine Learning**: Collect more historical data to build LSTM, RNN and other deep learning models, so as to enable AI powered best entry and exit timing.  

6. **Dynamic risk-reward management**: Incorporate fixed ratio stops, profit target surge after reaching certain profit levels etc to dynamically control risk-payoff.

Through optimizations in above areas, key metrics like stability, profitability, risk adjustment capabilities can be improved comprehensively, transforming the strategy into a production-grade algorithm suitable for live trading.  

## Conclusion

In conclusion, the “Bollinger Bands Trend Following Strategy” identifies price trends using Bands indicator and moving averages, entering at key breakout points. It has the pros of clear logic, simplicity, ease of implementation while also has areas for improvements like parameter tuning, stop loss mechanisms. Further refinements like parameter optimization, stop loss enhancements, machine learning integrations can turn it into a robust and stable algo trading system.


> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_bool_1|true|(?Time Filters)Start date|
|v_input_1|timestamp(01 Jan 2022 00:00 UTC)|initialDate|
|v_input_bool_2|true|End date|
|v_input_2|timestamp(31 Dec 2029 23:59 UTC)|finalDate|
|v_input_bool_3|true|(?Long/Short Options ===================================)Enable Long Entrys|
|v_input_bool_4|true|Enable Short Entrys|
|v_input_int_1|20|(?Bollinger Bands ======================================)BB Length|
|v_input_float_1|2|BB StdDev|
|v_input_bool_5|true|(?Moving Average =======================================)Moving Average Filter|
|v_input_string_1|0|Type: Ema|Sma|
|v_input_source_1_close|0|  Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|100|Length|
|v_input_string_2||(?Alert Message For Bot ================================)Strategy Entry Message|
|v_input_string_3||Strategy Exit Message|
|v_input_string_4||Strategy Close Message|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-12-15 00:00:00
end: 2024-01-14 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//VERSION =================================================================================================================
//@version=5
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// This strategy is intended to study.
// It can also be used to signal a bot to open a deal by providing the Bot ID, email token and trading pair in the strategy settings screen.
// As currently written, this strategy uses a Bollinger Bands for trend folling, you can use a EMA as a filter.
//Autor Credsonb (M4TR1X_BR)

//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
//STRATEGY ================================================================================================================

strategy(title = 'BT-Bollinger Bands - Trend Following',
         shorttitle = 'BBTF',
         overlay = true )


//▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// CONFIG =================================================================================================================

// TIME INPUTS
usefromDate = input.bool(defval = true, title = 'Start date', inline = '0', group = "Time Filters")
initialDate = input(defval = timestamp('01 Jan 2022 00:00 UTC'), title = '', inline = "0",group = 'Time Filters',tooltip="This start date is in the time zone of the exchange ")
usetoDate = input.bool(defval = true, title = 'End date', inline = '1', group = "Time Filters")
finalDate = input(defval = timestamp('31 Dec 2029 23:59 UTC'), title = '', inline = "1",group = 'Time Filters',tooltip="This end date is in the time zone of the exchange")

// TIME LOGIC 
inTradeWindow = true

// ENABLE LONG SHORT OPTIONS
string entrygroup ='Long/Short Options ==================================='
checkboxLong = input.bool(defval=true, title="Enable Long Entrys",group=entrygroup)
checkboxShort = input.bool(defval=true, title="Enable Short Entrys",group=entrygroup)


// BOLLINGER BANDS INPUTS ==================================================================================================
string bbgroup ='Bollinger Bands ======================================'
bbLength = input.int(defval=20,title='BB Length', minval=1, step=5, group=bbgroup)
bbStddev = input.float(defval=2, title='BB StdDev', minval=0.5, group=bbgroup)

//BOLLINGER BANDS LOGIC
[bbMiddle, bbUpper, bbLower] = ta.bb(close, bbLength, bbStddev)


// MOVING AVERAGES INPUTS ================================================================================================
string magroup =  'Moving Average ======================================='
useEma = input.bool(defval = true, title = 'Moving Average Filter',inline='', group= magroup,tooltip='This will enable or disable Exponential Moving Average Filter on Strategy')
emaType=input.string (defval='Ema',title='Type',options=['Ema','Sma'],inline='', group= magroup)
emaSource = input.source(defval=close,title="  Source",inline="", group= magroup)
emaLength = input.int(defval=100,title="Length",minval=0,inline='', group= magroup)

// MOVING AVERAGE LOGIC
float ema = emaType=='Ema'? ta.ema(emaSource,emaLength): ta.sma(emaSource,emaLength)

// BOT MESSAGES
string msgroup='Alert Message For Bot ================================'
messageEntry = input.string("", title="Strategy Entry Message",group=msgroup)
messageExit  =input.string("",title="Strategy Exit Message",group=msgroup)
messageClose = input.string("", title="Strategy Close Message",group=msgroup)




// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// POSITIONS =============================================================================================================

//VERIFY IF THE BUY FILTERS ARE ON OR OFF 
bool emaFilterBuy = useEma? (close > ema):(close >= ema) or (close <= ema)                      

//LONG / SHORT POSITIONS LOGIC
bool openLongPosition  = (close[1] < bbUpper) and (close > bbUpper)   and (emaFilterBuy)
bool openShortPosition = (close[1] > bbLower) and (close < bbLower) and (emaFilterBuy)
//bool closeLongPosition = (close > bbMiddle)
//bool closeShortPosition= (close < bbLower)


// CHEK OPEN POSITONS =====================================================================================================
// open signal when not already into a position
bool validOpenLongPosition = openLongPosition and strategy.opentrades.size(strategy.opentrades - 1) <= 0
bool longIsActive = validOpenLongPosition or strategy.opentrades.size(strategy.opentrades - 1) > 0

bool validOpenShortPosition = openShortPosition and strategy.opentrades.size(strategy.opentrades - 1) <= 0
bool shortIsActive = validOpenShortPosition or strategy.opentrades.size(strategy.opentrades - 1) < 0

longEntryPoint = high
if (openLongPosition) and (inTradeWindow) and (checkboxLong)
    strategy.entry(id = 'Long Entry', direction = strategy.long, stop = longEntryPoint, alert_message=messageEntry)

if not (openLongPosition)
    strategy.cancel('Long Entry')

//submit exit orders for trailing take profit price 
if (longIsActive) and (inTradeWindow)
    strategy.exit(id = 'Long Exit',  stop=bbMiddle, alert_message=messageExit)

//if (closeLongPosition)
   // strategy.close(id = 'Long Entry', alert_message=messageClose)
      

shortEntryPoint = low 
if (openShortPosition) and (inTradeWindow) and (checkboxShort)
    strategy.entry(id = 'Short Entry', direction = strategy.short, stop = shortEntryPoint, alert_message=messageEntry)

if not(openShortPosition)
    strategy.cancel('Short Entry')

if (shortIsActive)
    strategy.exit(id = 'Short Exit',  stop = bbMiddle, alert_message=messageExit)

//if (closeShortPosition)
    //strategy.close(id = 'Short Close', alert_message=messageClose)

// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// PLOTS ===============================================================================================================

// TRADE WINDOW ========================================================================================================
bgcolor(color = inTradeWindow ? color.new(#089981,90):na, title = 'Time Window')

// EMA/SMA 
var emafilterColor = color.new(color.white, 0)
plot(series=useEma? ema:na, title = 'EMA Filter', color = emafilterColor, linewidth = 2, style = plot.style_line)

// BOLLINGER BANDS
plot(series=bbUpper, title = "Upper Band", color = color.aqua)//, display = display.none)
plot(series=bbMiddle, title = "MA Band", color = color.red)//, display = display.none)
plot(series=bbLower, title = "Lower Band", color = color.aqua)//, display = display.none)

// PAINT BARS COLORS
bool bulls = (close[1] < bbUpper[1]) and (close > bbUpper)
bool bears = (close[1] > bbLower [1]) and (close < bbLower)
neutral_color = color.new(color.black, 100)
barcolors = bulls ? color.green : bears ? color.red : neutral_color
barcolor(barcolors)

// ======================================================================================================================

```

> Detail

https://www.fmz.com/strategy/438804

> Last Modified

2024-01-15 14:31:21
