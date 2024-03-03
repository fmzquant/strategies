
> Name

三根K线反转趋势策略Three-Candle-Reversal-Trend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/8f3663bf3e117cdf31.png)
[trans]
### 概述

三根K线反转趋势策略(Three Candle Reversal Trend Strategy)是一种短线交易策略,它通过识别三根连续的阳线或阴线,紧随其后的一根吞噬式K线来判断短线趋势的反转,结合多种技术指标来过滤入场时机。该策略以1:3的止损止盈比率进行交易,有利于获取超额收益。

### 策略原理  

该策略的核心逻辑是识别三根连续的阳线或阴线的K线形态,该形态通常预示着短期趋势的反转。当检测到三根阴线之后,待到下一根吞噬式的阳线出现时,做多;反之,当检测到三根阳线之后,待到下一根吞噬式的阴线出现时,做空。这样可以及时抓住短线趋势反转的机会。  

此外,策略还引入了多种技术指标来过滤入场时机。采用两支不同参数设置的SMA均线,仅在快线上穿越慢线时开始考虑入场。另外,通过线性回归指标判断市场的震荡与趋势状态,只有在趋势状态下才进行交易。策略也提供了一个开关,可以选择是否在均线发生黄金交叉时结合K线形态入场。通过这些指标的综合判断,可以过滤掉大部分噪音,提高入场的准确性。

在止损止盈设置上,策略要求风险回报比例不低于1:3。通过计算最近N根K线波动幅度的ATR指标,结合波动幅度的百分比进行止损位设置,进而计算出止盈位水平。这样可以在承担一定风险的前提下获取适当的超额回报。

### 策略优势

三根K线反转趋势策略具有如下优势:

1. 识别短期趋势反转点,及时把握机会
2. 多种指标过滤,提高入场准确率  
3. 止损止盈机制合理,风险回报比适中
4. 简单的参数设置,容易理解操作

### 策略风险 

该策略也存在一些风险需要注意:  

1. 短期反转不一定代表长期趋势反转,需要关注更高时间周期的趋势。可以设置更长周期的均线作为过滤条件。
2. 单一的K线形态信号可能出现误判,可以考虑加入其它辅助判断信号。
3. 停损点设置可能过于乐观,可以适当紧缩止损范围。
4. 回测数据不足,实盘表现存有一定不确定性。

### 策略优化方向

该策略可以从以下几个方向进行优化:

1. 调整均线和线性回归参数,优化判断趋势状态的效果
2. 加入stoch指标等其他辅助判断指标,优化信号的准确率  
3. 优化ATR参数和止损幅度参数的设置,平衡风险和收益
4. 增加趋势突破点追踪机制,提高获利能力  
5. 构建更为严密的资金管理策略,控制交易风险  

### 总结

整体来说,三根K线反转趋势策略利用简单的价格形态结合多种辅助指标判断,建立在适度风险收益平衡基础之上的短线交易策略。它以较低的复杂度获取了不错的表现,值得投资者关注和测试,也有许多可供改进的空间。通过参数优化和规则补充,有望成长为一种稳定ှ高效的量化交易策略。

||

### Overview  

The Three Candle Reversal Trend Strategy is a short-term trading strategy that identifies reversals in short-term trends by detecting three consecutive bullish or bearish candles followed by an engulfing candle in the opposite direction, combined with multiple technical indicators to filter entry signals. The strategy trades with a 1:3 risk-reward ratio for gaining excess returns.  

### Strategy Logic

The core logic of this strategy is to identify the pattern of three consecutive bullish or bearish candles on the chart, which usually implies an impending reversal in the short-term trend. When three bearish candles are detected, wait for the next engulfing bullish candle to go long. Conversely, when three bullish candles are detected, wait for the next engulfing bearish candle to go short. This allows capturing reversing opportunities in short-term trends in a timely manner.

In addition, multiple technical indicators are introduced to filter entry signals. Two SMA lines with different parameter settings are adopted, and entry positions are considered only when the faster SMA crosses over the slower line. Besides, the linear regression indicator is used to judge whether the market is ranging or trending, and trades are taken only in trending conditions. There is also an option to combine the candlestick pattern with SMA golden crosses for additional entry signals. Through the comprehensive judgments of these indicators, most noise can be filtered out and the entry accuracy is improved.  

For stop loss and take profit, the strategy requires a minimum 1:3 risk-reward ratio. The ATR indicator based on the price fluctuation of recent N candles is used to determine the stop loss level with an offset percentage. Take profit is then calculated accordingly to target proper excess returns for the risk taken.

### Advantages

The Three Candle Reversal Trend Strategy has the following advantages:

1. Identify reversals of short-term trends for timely opportunities
2. Enhanced entry accuracy via multiple indicator filters 
3. Reasonable risk-reward profile with appropriate stop loss and take profit  
4. Simple parameters for ease of understanding and operation

### Risks

There are also some risks to note for this strategy:

1. Short-term reversals do not necessarily imply long-term trend reversals. Higher timeframe trends should be monitored. Longer period moving averages can be added as filters.
2. Single candlestick patterns may produce false signals. Other supplementary judgments can be considered.
3. Stop loss settings could be too aggressive. Stop loss range can be tightened.  
4. Insufficient backtest data leads to uncertainty in real trading performance.

### Enhancement Directions  

The strategy can be enhanced in the following aspects:

1. Adjust parameters for moving averages and linear regression to better identify trends.
2. Add other indicators like Stoch for supplementary signal confirmation. 
3. Optimize ATR parameters and stop loss percentage to balance risk and return.
4. Introduce trend breakout tracking mechanisms to improve profitability.
5. Establish robust capital management schemes to control trading risks.

### Conclusion

In conclusion, the Three Candle Reversal Trend Strategy is a simple short-term trading strategy that capitalizes on price patterns and multiple indicators to capture reversing opportunities, built on properly balanced risk-reward profiles. It delivers respectable results with relatively low complexity, and is worth investor attention and testing. There is also ample room for improvement via parameter tuning and rule supplementation for the strategy to grow into a stable high-efficiency algo trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2011|(?Trading window)Start Year|
|v_input_int_1|true|Start Month|
|v_input_int_2|true|Start Day|
|v_input_2|2050|Finish Year|
|v_input_int_3|12|Finish Month|
|v_input_int_4|31|Finish Day|
|v_input_bool_1|true|(?Trading Options)SPY trading only|
|v_input_int_5|10|# of SPY options per trade|
|v_input_bool_2|false|reinvest profit?|
|v_input_float_3|3|Reward to Risk Ratio|
|v_input_bool_3|true|No long entry between 10 - 10:30 (Avoid 10 am dump)|
|v_input_bool_4|true|Trade 3s candle pattern|
|v_input_bool_5|true|Trade MA Cross Reversal Signal|
|v_input_int_6|14|(?Daily ATR)ATR period|
|v_input_float_1|5|% ATR to use for SL / PT|
|v_input_int_7|8|(?Moving Averages)Fast EMA|
|v_input_int_8|21|Fast SMMA|
|v_input_int_9|50|Slow SMMA|
|v_input_int_10|200|Slow SMMA|
|v_input_int_11|50|(?Linear Regression)Linear Regression Period|
|v_input_int_12|50|LR Slope Period|
|v_input_int_13|14|LR Signal Period|
|v_input_float_2|0.03|LR Threshold for Ranging vs Trending|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-31 23:59:59
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © platsn
//
// Mainly developed for SPY trading on 1 min chart. But feel free to try on other tickers.

// Basic idea of this strategy is to look for 3 candle reversal pattern within trending market structure. The 3 candle reversal pattern consist of 3 consecutive bullish or bearish candles, 
// followed by an engulfing candle in the opposite direction. This pattern usually signals a reversal of short term trend. This strategy also uses multiple moving averages to filter long or short
// entries. ie. if the 21 smoothed moving average is above the 50, only look for long (bullish) entries, and vise versa. There is option change these moving average periods to suit your needs. 
// I also choose to use Linear Regression to determine whether the market is ranging or trending. It seems the 3 candle pattern is more successful under trending market. Hence I use it as a filter.

// There is also an option to combine this strategy with moving average crossovers. The idea is to look for 3 canddle pattern right after a fast moving average crosses over a slow moving average.
// By default , 21 and 50 smoothed moving averages are used. This gives additional entry opportunites and also provides better results. 

// This strategy aims for 1:3 risk to reward ratio. Stop losses are calculated using the closest low or high values for long or short entries, respectively, with an offset using a percentage of
// the daily ATR value. This allows some price flucuation without being stopped out prematurely. Price target is calculated by multiplying the difference between the entry price and the stop loss
// by a factor of 3. When price target is reach, this strategy will set stop loss at the price target and wait for exit considion to maximize potential profit. 

// This strategy will exit an order if an opposing 3 candle pattern is detected, this could happend before stop loss or price target is reached, and may also happen after price target is reached.

// *Note that this strategy is designed for same day SPY option scalping. I haven't determined an easy way to calculate the # of contracts to represent the equivalent option values. Plus the option
// prices varies greatly depending on which strike and expiry that may suits your trading style. Therefore, please be mindful of the net profit shown. By default, each entry is approxiately equal 
// to buying 10 of same day or 1 day expiry call or puts at strike $1 - $2 OTM. This strategy will close all open trades at 3:45pm EST on Mon, Wed, and Fri. 

// **Note that this strategy also takes into account of extended market data.

// ***Note pyramiding is set to 2 by default, so it allows for multiple entries on the way towards price target. 

// Remember that market conditions are always changing. This strategy was only able to be backtested using 1 month of data. This strategy may not work the next month. Please keep that in mind. 

// *****************************************************************************************************************************************************************************************************

//@version=5
strategy("3 Candle Strike Stretegy", overlay=true, pyramiding=2, initial_capital=5000, commission_type=strategy.commission.cash_per_contract, commission_value = 0.01) 

// ******************** Period **************************************
startY = input(title='Start Year', defval=2011, group = "Trading window")
startM = input.int(title='Start Month', defval=1, minval=1, maxval=12, group = "Trading window")
startD = input.int(title='Start Day', defval=1, minval=1, maxval=31, group = "Trading window")
finishY = input(title='Finish Year', defval=2050, group = "Trading window")
finishM = input.int(title='Finish Month', defval=12, minval=1, maxval=12, group = "Trading window")
finishD = input.int(title='Finish Day', defval=31, minval=1, maxval=31, group = "Trading window")
timestart = timestamp(startY, startM, startD, 00, 00)
timefinish = timestamp(finishY, finishM, finishD, 23, 59)
t1 = time(timeframe.period, "0930-1545:23456")
window = true

// *****************************************************

isSPY = input.bool(defval=true,title="SPY trading only", group = "Trading Options")
SPY_option = input.int(defval=10,title="# of SPY options per trade", group = "Trading Options")
reinvest = input.bool(defval=false,title="reinvest profit?", group = "Trading Options")
src = close

// ***************************************************************************************************** Daily ATR *****************************************************
// Inputs
atrlen = input.int(14, minval=1, title="ATR period", group = "Daily ATR")
iPercent = input.float(5, minval=1, maxval=100, step=0.1, title="% ATR to use for SL / PT", group = "Daily ATR")
// PTPercent = input.int(100, minval=1, title="% ATR for PT")

// Logic
percentage = iPercent * 0.01
datr = request.security(syminfo.tickerid, "1D", ta.rma(ta.tr, atrlen))
datrp = datr * percentage
// datrPT = datr * PTPercent * 0.01

plot(datr,"Daily ATR")
plot(datrp, "Daily % ATR")

// ***************************************************************************************************************** Moving Averages ************************

len0 = input.int(8, minval=1, title='Fast EMA', group= "Moving Averages")
ema1 = ta.ema(src, len0)

len1 = input.int(21, minval=1, title='Fast SMMA', group= "Moving Averages")
smma1 = 0.0
sma_1 = ta.sma(src, len1)
smma1 := na(smma1[1]) ? sma_1 : (smma1[1] * (len1 - 1) + src) / len1

len2 = input.int(50, minval=1, title='Slow SMMA', group= "Moving Averages")
smma2 = 0.0
sma_2 = ta.sma(src, len2)
smma2 := na(smma2[1]) ? sma_2 : (smma2[1] * (len2 - 1) + src) / len2

len3 = input.int(200, minval=1, title='Slow SMMA', group= "Moving Averages")
smma3 = 0.0
sma_3 = ta.sma(src, len3)
smma3 := na(smma3[1]) ? sma_3 : (smma3[1] * (len3 - 1) + src) / len3

ma_bull = smma1 > smma2 and smma1 > smma1[1]
ma_bear = smma1 < smma2 and smma1 < smma1[1]

ma_bull_macro = smma1 > smma3 and smma2 > smma3
ma_bear_macro = smma1 < smma3 and smma2 < smma3

// plot(ma_bull? 1 : 0, "MA bull")
// plot(ma_bear? 1 : 0 , "MA bear")

// **************************************************************************************************************** Linear Regression *************************

//Input
clen = input.int(defval = 50, minval = 1, title = "Linear Regression Period", group = "Linear Regression")
slen = input.int(defval=50, minval=1, title="LR Slope Period" , group = "Linear Regression")
glen = input.int(defval=14, minval=1, title="LR Signal Period", group = "Linear Regression")
LR_thres = input.float(0.03, minval=0, step=0.001, title="LR Threshold for Ranging vs Trending" , group = "Linear Regression")
 
//Linear Regression Curve
lrc = ta.linreg(src, clen, 0)
//Linear Regression Slope
lrs = (lrc-lrc[1])/1
//Smooth Linear Regression Slope
slrs = ta.ema(lrs, slen)
//Signal Linear Regression Slope
alrs = ta.sma(slrs, glen)

up_accel = lrs > alrs and lrs > 0 
down_accel = lrs < alrs and lrs < 0 

LR_ranging  = math.abs(slrs) <= LR_thres
LR_trending = math.abs(slrs) > LR_thres

plot(slrs, "LR slope")
plot(LR_trending?1:0, "LR Trending")

// *********************************************************************************************************************************** Candle conditions **************************

bull_3s = close[3] <= open[3] and close[2] <= open[2] and close[1] <= open[1] and close > open[1]
bear_3s = close[3] >= open[3] and close[2] >= open[2] and close[1] >= open[1] and close < open[1]

plotshape(bull_3s, style=shape.triangleup, color=color.new(color.green, 0), location=location.belowbar, size=size.small, text='3s-Bull', title='3 Line Strike Up')
plotshape(bear_3s, style=shape.triangledown, color=color.new(color.red, 0), location=location.abovebar, size=size.small, text='3s-Bear', title='3 Line Strike Down')

// ***************************************************************************************************************************************** SL & PT ***********************************
RR = input.float(3.0, minval = 1, step = 0.1, title="Reward to Risk Ratio", group = "Trading Options")

barsSinceLastEntry()=>
    strategy.opentrades > 0 ? (bar_index - strategy.opentrades.entry_bar_index(strategy.opentrades-1)) : na

last_high = math.max(high, high[1], high[2], high[3])
last_low = math.min(low, low[1], low[2], low[3])

long_SL = last_low - datrp
short_SL = last_high + datrp

long_PT = last_high
short_PT = last_low

last_entry = strategy.opentrades.entry_price(strategy.opentrades-1)
risk = last_entry - long_SL

if strategy.opentrades > 0
    long_SL := math.min(long_SL[barsSinceLastEntry()], last_low)
    short_SL := math.max(short_SL[barsSinceLastEntry()], last_high)
    risk := last_entry - long_SL
    long_PT := last_entry + (last_entry - long_SL) * RR
    short_PT := last_entry - (short_SL - last_entry) * RR
else
    long_PT := open + (open - long_SL) * RR
    short_PT := open - (short_SL - open) * RR

// plot(short_SL,title = "Short SL", color=color.new(color.purple,30))
// plot(long_SL,title = "Long SL", color=color.new(color.purple,30))
// plot(long_PT,title = "Long PT", color=color.new(color.white,50))
// plot(short_PT,title = "Short PT", color=color.new(color.white,50))
// plot(last_entry, title = "Last entry")
// plot(risk, title = "Risk")

// **************************************************************************************************************************************** Trade Pauses ****************************************
bool trade_pause = false
bool trade_pause2 = false

if high - low > datr*0.3
    trade_pause := true
else
    trade_pause := false

no_longat10 = input.bool(true, title="No long entry between 10 - 10:30 (Avoid 10 am dump)", group = "Trading Options")

// ************************************************************************************************************************************ Entry conditions **************************

trade_3s = input.bool(title='Trade 3s candle pattern', defval=true, group = "Trading Options")
L_entry1 = bull_3s and ma_bull and LR_trending 
S_entry1 = bear_3s and ma_bear and LR_trending

trade_ma_reversal = input.bool(title='Trade MA Cross Reversal Signal', defval=true, group = "Trading Options")
L_entry2 = ma_bear_macro and ema1 > smma1 and bull_3s and ta.barssince(ta.cross(ema1,smma1)) < 10
S_entry2 = ma_bull_macro and ema1 < smma1 and bear_3s and ta.barssince(ta.cross(ema1,smma1)) < 10

// ************************************************************************************************************************************** Exit Conditions ********************************

// bsle_thres = input.int(0, "Bar since entry threshold")

// exit0 = barsSinceLastEntry() >= bsle_thres
exit0 = true

L_exit1 = bear_3s
S_exit1 = bull_3s

// ************************************************************************************************************************************ Entry and Exit orders *****************************
strategy.initial_capital = 50000
trade_amount = math.floor(strategy.initial_capital / close)

if isSPY 
    if strategy.netprofit > 0 and reinvest
        trade_amount := math.floor((strategy.initial_capital + strategy.netprofit) * 0.2 / 600) * 10 * SPY_option
    else
        trade_amount := math.floor(strategy.initial_capital * 0.2 / 600) * 10 * SPY_option


if not(trade_pause) and not(trade_pause2) and time(timeframe.period, "0930-1540:23456")
    if trade_3s
        if not(time(timeframe.period, "1000-1030:23456")) and no_longat10
            strategy.entry("Long", strategy.long, 1, when = L_entry1 and window, comment="Long 3s" + " SL=" + str.tostring(math.round(long_SL,2)) + " PT=" + str.tostring(math.round(long_PT,2)))
        strategy.entry("Short", strategy.short, 1, when = S_entry1 and window, comment = "Short 3s" + " SL=" + str.tostring(math.round(short_SL,2)) + " PT=" + str.tostring(math.round(short_PT,2)))
    if trade_ma_reversal
        strategy.entry("Long", strategy.long, 1, when = L_entry2 and window, comment="Long MA cross" + " SL=" + str.tostring(math.round(long_SL,2)) + " PT=" + str.tostring(math.round(long_PT,2)))
        strategy.entry("Short", strategy.short, 1, when = S_entry2 and window, comment = "Short MA corss" + " SL=" + str.tostring(math.round(short_SL,2)) + " PT=" + str.tostring(math.round(short_PT,2)))

if high > long_PT
    long_SL := low[1]
    strategy.exit("Exit", "Long", when = exit0 and low < long_PT, stop= long_SL, comment = "Exit Long SL/PT hit")
strategy.close("Long", when = L_exit1, comment = "Exit on Bear Signal")

if low < short_PT
    short_SL := high[1]
    strategy.exit("Exit", "Short", when= exit0 and high > short_PT, stop= short_SL, comment = "Exit Short SL/PT hit")
strategy.close("Short", when = S_exit1, comment = "Exit on Bull Signal")

if time(timeframe.period, "1545-1600:246")
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/441954

> Last Modified

2024-02-18 09:48:28
