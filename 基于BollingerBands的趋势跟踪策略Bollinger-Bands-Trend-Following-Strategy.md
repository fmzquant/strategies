
> Name

基于BollingerBands的趋势跟踪策略Bollinger-Bands-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/10759dfc4412691ca86.png)
[trans]

## 概述

这个策略名为“BollingerBands趋势跟踪策略”,它使用BollingerBands指标判断价格趋势,并在价格突破BollingerBands通道时入场做多做空。它结合均线过滤器,在突破发生时判断趋势方向,从而决定做多做空。

## 策略原理

该策略主要依赖BollingerBands指标判断价格趋势和定位入场点。BollingerBands包含三条线:

1. 中间线:n天的移动平均线
2. 上线:往上移动n天标准差的距离
3. 下线:往下移动n天标准差的距离  

当价格从下线突破上线时,认为正在形成看涨趋势;当价格从上线突破下线时,认为正在形成看跌趋势。策略在这两种突破发生时入场做多做空。

具体来说,策略逻辑是:

1. 当收盘价从Bands下线突破上线时,做多入场
2. 当收盘价从Bands上线突破下线时,做空入场

为了过滤假突破,策略加入均线判断。只有当收盘价突破Bands的同时,也突破均线时,才会触发入场。

这里使用Exponential Moving Average作为均线指标。

总之,该策略判断趋势突破的方式是:

1. 做多信号:收盘价突破Bands上线 && 收盘价突破均线
2. 做空信号:收盘价突破Bands下线 && 收盘价突破均线

入场后,止损方式为追踪中线。当价格重新触及中线时,退出止损。

## 优势分析

该策略主要具有以下优势:

1. 能捕捉中间线突破形成的新趋势。Bands通道具有容纳价格波动的空间,突破通道代表价格开始形成新的方向。
2. 结合均线过滤,避免了假突破的问题,确保真正出现趋势转折时才入场。
3. 具有内在的止损机制,当价格重新回到Bands中线时主动止损,有效控制了风险。
4. 策略逻辑简单清晰,容易理解和实现,适合量化交易的算法策略。
5. 利用Bands通道和均线指标,无需预测价格,根据事后证据判断趋势,回测效果较好。

## 风险分析

尽管该策略有一定优势,但也存在以下风险:

1. Bands参数设置不当可能导致增大交易频率和交易风险。如果参数过于敏感,会产生大量假突破造成系统频繁开仓。
2. 均线参数选择不当也可能导致错过真正趋势或者产生假信号。参数设置需要反复测试和优化。  
3. 止损依赖中线,可能会过早离场或者给予价格过多回调空间。这可能会导致错过大部分利润或者增加亏损风险。

为控制上述风险,可以从以下方面进行优化:

1. 适当调整Bands参数,增加通道宽度,减少假突破概率
2. 测试不同类型和长度的均线,找出最佳组合
3. 尝试其他止损方式,例如趋势跟踪止损或逐步移动止损

## 优化方向  

根据上面的风险分析,该策略可以从以下方面进行进一步优化:

1. **参数优化**:通过更系统的方法,如遗传算法等,寻找Bands和均线参数的最佳组合,使策略更稳定和profitable。

2. **止损优化**:测试不同的止损方式,如ATR止损,跟踪止损等,确定最佳止损机制。

3. **过滤器优化**:尝试加入其他指标,如RSI,KD等作为额外过滤条件,降低假信号概率,提高盈利率。

4. **入场条件优化**:加入例如趋势判断、异动VOLUME等其他考量因素,严格筛选入场时机,减少不必要开仓。

5. **机器学习**:收集更多历史数据,使用LSTM, RNN等深度学习模型进行建模,利用AI判断最佳入场出场点。

6. **风险与获利动态管理**:加入固定比例止盈止损、盈利目标后加大止盈幅度等方式,动态管理风险与收益。

通过上述几个方面的优化,可以使该策略的稳定性、收益率、风险调节能力等指标得到全面提高,成为可供实盘交易的算法策略。

## 总结

总体来说,该“BollingerBands趋势跟踪策略”利用Bands指标和均线判断价格趋势,在关键点位突破时入场,属于趋势跟踪类型策略。它具有判断明确,逻辑简洁,容易实现等优势,也存在一些参数优化、止损方式等可优化空间。通过进一步调整参数设置、优化止损机制、加入机器学习模型等,可以将其打造成稳定可靠的量化策略。

||

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

[/trans]

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
