
> Name

三重超趋势均线突破策略Triple-Supertrend-Breakout-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/ca653fb4b4cefec13d.png)

[trans]

## 概述

三重超趋势均线突破策略是一种比较常见的利用多个不同参数设置的超趋势均线以及 defines 趋势的 EMA 来识别趋势方向并进行交易的策略。该策略的主要思想是当至少两个超趋势均线线在 defines 大趋势的 EMA 线上方呈现多头状态时建立多头;当至少两个超趋势均线线在 defines 大趋势的 EMA 线下方呈现空头状态时建立空头。

## 策略原理

该策略通过设置三条不同参数的超趋势均线,以及一条定义大趋势方向的 EMA 来判断建仓和平仓:

1. 设置三条超趋势均线 supertrend1、supertrend2、supertrend3,颜色分别为绿色表示上涨趋势,红色表示下跌趋势。

2. 设置一条 EMA 平滑移动平均线 ematrend 来定义大趋势,当三条超趋势均线全部高于该 EMA 时定义为大盘多头行情,反之定义为空头行情。

3. 当至少两条超趋势均线在大盘多头的情况下同时显示多头(绿色),即方向值小于0时判断为多头信号;当至少两条超趋势均线在大盘空头的情况下同时显示空头(红色),即方向值大于0时判断为空头信号。

4. 随后在信号发出时开仓做多/做空。

5. 设置止损止盈条件。其中固定止盈设置为风险回报比,即盈亏比为3;设置移动止损为下跌一个ATR即止损。

6. 当止损或止盈条件触发时平仓。

## 优势分析

该策略具有以下优势:

1. 使用三重超趋势均线结合趋势判断EMA,能够有效识别趋势信号。

2. 多空条件判断规则明确,容易理解和实现。

3. 设置移动止损与固定止盈,有效控制风险。

4. 可根据需要调整超参数,优化策略。

## 风险分析

该策略也存在一定风险:

1. 超参数设置不当可能导致错失良好交易机会。可以测试不同的ATR周期、ATR倍数、EMA周期参数。

2. 突破失败的概率存在,可通过调整超参数降低概率。

3. 止损或止盈设置过于宽松会增加亏损概率。应适当缩紧止损范围。

4. 回测数据容易产生过拟合问题。应注意多市场多周期测试。


## 优化方向  

该策略可以从以下几个方面进行优化:

1. 测试最佳超参数组合。可以组合测试不同的ATR周期、ATR倍数、EMA平均线周期,找到最佳参数。

2. 增加交易品种。可以增加股票、数字货币等不同品种来验证策略有效性。

3. 结合其他指标过滤信号。例如可以添加RSI,MACD等指标避免错读趋势信号。

4. 优化止损止盈机制。可以测试追踪止损,或是基于ATR/波动率变化的止损方式。

## 总结

三重超趋势均线突破策略整体来说是一种较为简单实用的趋势跟踪策略。它同时结合多条超趋势均线以及趋势判断EMA来发掘机会,有效控制风险。通过参数优化和规则优化,可以获得更好的效果。该策略易于理解,值得学习借鉴。

||

## Overview  

The triple supertrend breakout strategy is a commonly used strategy that utilizes multiple supertrend lines with different parameter settings and a trend-defining EMA to identify trend direction and trade. The main idea of ​​this strategy is to establish long positions when at least two supertrend lines are showing an uptrend above the trend-defining EMA line, and establish short positions when at least two supertrend lines are showing a downtrend below the trend-defining EMA line.  

## Strategy Principle  

This strategy uses three supertrend lines with different parameters and an EMA line that defines the major trend to determine entries and exits:  

1. Set up three supertrend lines - supertrend1, supertrend2, supertrend3, with green color indicating an uptrend and red color indicating a downtrend.  

2. Set up an EMA line ematrend to define the major trend. When all three supertrend lines are above this EMA, the market is defined as being in an uptrend, and vice versa for downtrends.  

3. When at least two supertrend lines show an uptrend (green) simultaneously under the condition of a major uptrend market, that is, the direction value is less than 0, it is judged as a long signal; when at least two supertrend lines show a downtrend (red) simultaneously under the condition of a major downtrend market, that is, the direction value is greater than 0, it is judged as a short signal.  

4. Subsequently, open long/short positions when signals are triggered.  

5. Set stop loss and take profit conditions. Fixed take profit is set at a risk/reward ratio of 3; trailing stop loss is set at a drop of one ATR.

6. Close positions when stop loss or take profit conditions are triggered.

## Advantage Analysis   

The advantages of this strategy include:

1. Using three supertrend lines combined with a trend-judging EMA can effectively identify trend signals.  

2. The long and short conditions are clear and easy to understand and implement.

3. Setting a trailing stop loss and fixed take profit effectively manages risks.  

4. Hyperparameters can be adjusted as needed to optimize the strategy.

## Risk Analysis   

There are also some risks to this strategy:  

1. Improper parameter settings may lead to missing good trading opportunities. Different periods, multiples for ATR, and periods for EMA can be tested.  

2. There is some probability of failed breakouts. This can be reduced by adjusting parameters. 

3. Stop loss or take profit set too wide may increase loss probability. Stop loss range should be tightened properly.  

4. Backtest data can easily lead to overfitting problems. Multi-market, multi-timeframe testing should be noted.

## Optimization Directions

Some ways this strategy can be optimized:  

1. Test the optimal parameter combinations. Different combinations of ATR periods, multiples, and EMA periods can be tested to find the best.  

2. Increase trading varieties. Can add stocks, cryptocurrencies etc to test effectiveness across markets.

3. Combine with other indicators for signal filtering. For example, RSI, MACD etc can be added to avoid misreading trend signals.   

4. Optimize the stop loss and take profit mechanism. Trailing stop loss, or stop loss based on changes in ATR/volatility can be tested.  

## Conclusion  

In summary, the triple supertrend breakout strategy is a relatively simple and practical trend following strategy. It combines multiple supertrend lines and a trend-judging EMA to discover opportunities and manages risk effectively. Through parameter and logic optimization, better results can be achieved. This strategy is easy to understand and worth learning from.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|ATR Length 1|
|v_input_float_1|true|ATR Factor 1|
|v_input_2|11|ATR Length 2|
|v_input_float_2|2|ATR Factor 2|
|v_input_3|12|ATR Length 3|
|v_input_float_3|3|ATR Factor 3|
|v_input_int_1|233|Trend-EMA Length|
|v_input_4_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_2|false|Offset|
|v_input_5|timestamp(01 Apr 2016 13:30 +0000)|Backtest Start Time|
|v_input_6|false|Define the ending period for backtests (If false, will test up to most recent candle)|
|v_input_7|timestamp(19 Mar 2021 19:30 +0000)|Backtest End Time|
|v_input_8|false|Exit when Risk:Reward met|
|v_input_9|3|Risk:[Reward] (i.e. 3) for exit|
|v_input_10|true|Use trailing stop loss|
|v_input_11|2|ATR multiplier for stop loss|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-12-14 00:00:00
end: 2023-12-20 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// @version=5
// author=theasgard and moonshot-indicator (ms)
// year 2021
//
// This is a well knowen strategy by using 3 different Supertrends and a trend-defining EMA,
// feel free to play around with the settings, a backtest on 8h ETHUSDT pair brought some good results using 
// the 233EMA and investing 75% of a 10k start capital
//
// the idea is to have at least 2 supertrnds going green above the trend-EMA to go long and exit by turning 
// 2 supertrends red (idea: 1 supertrend in red could initialize a take profit)
// shorts work vice versa
// The EMA shows in green for uptrends and in red for downtrends, if it is blue no Signal will be taken because 
// the 3 supertrends are not all above or below the trendline(EMA)
//
// Update 1:
// Fixed a minor input error
// Added ATR stoploss, and commented out the percentage stop loss
// Added time window to backtest
// Added exit on risk/revard is met
// This version is only buy...wait for next update adding shorts

strategy("ms hypertrender", overlay=true)

// set up 3 supertrendlines and colour the direction up/down
atrPeriod1 = input(10, "ATR Length 1")
factor1 = input.float(1.0, "ATR Factor 1", step = 0.01)
[supertrend1, direction1] = ta.supertrend(factor1, atrPeriod1)
upTrend1 = plot(direction1 < 0 ? supertrend1 : na, "Up Trend 1", color = color.green, style=plot.style_linebr)
downTrend1 = plot(direction1 < 0? na : supertrend1, "Down Trend 1", color = color.red, style=plot.style_linebr)

atrPeriod2 = input(11, "ATR Length 2")
factor2 = input.float(2.0, "ATR Factor 2", step = 0.01)
[supertrend2, direction2] = ta.supertrend(factor2, atrPeriod2)
upTrend2 = plot(direction2 < 0 ? supertrend2 : na, "Up Trend 2", color = color.green, style=plot.style_linebr)
downTrend2 = plot(direction2 < 0? na : supertrend2, "Down Trend 2", color = color.red, style=plot.style_linebr)

atrPeriod3 = input(12, "ATR Length 3")
factor3 = input.float(3.0, "ATR Factor 3", step = 0.01)
[supertrend3, direction3] = ta.supertrend(factor3, atrPeriod3)
upTrend3 = plot(direction3 < 0 ? supertrend3 : na, "Up Trend 3", color = color.green, style=plot.style_linebr)
downTrend3 = plot(direction3 < 0? na : supertrend3, "Down Trend 3", color = color.red, style=plot.style_linebr)

//set up the trend dividing EMA and color uptrend nutreal downtrend
len = input.int(233, minval=1, title="Trend-EMA Length")
src = input(close, title="Source")
offset = input.int(title="Offset", defval=0, minval=-500, maxval=500)

//general Bull or Bear Trend? Visualized by ema
ematrend = ta.ema(src, len)
generaluptrend = supertrend1 > ematrend and supertrend2 > ematrend and supertrend3 > ematrend
generaldowntrend = supertrend1 < ematrend and supertrend2 < ematrend and supertrend3 < ematrend
emacolor = if generaluptrend
    color.green
else if generaldowntrend
    color.red
else
    color.blue
plot(ematrend, title="EMA", color=emacolor, linewidth=3, offset=offset)

// Bullish? min 2 supertrends green
bullish = (direction1 < 0 and direction2 < 0) or (direction1 < 0 and direction3 < 0) or (direction2 < 0 and direction3 < 0) and generaluptrend
extremebullish = direction1 < 0 and direction2 < 0 and direction3 < 0 and generaluptrend //all 3 green

// Bearish? min 2 supertrends red
bearish = (direction1 > 0 and direction2 > 0) or (direction1 > 0 and direction3 > 0) or (direction2 > 0 and direction3 > 0) and generaldowntrend
extremebearish = direction1 > 0 and direction2 > 0 and direction3 > 0 and generaldowntrend //all 3 red

// Open Long
//plotchar(((bullish and not bullish[1]) or (extremebullish and not extremebullish[1])) and (emacolor==color.green)? close : na, title = 'Start Long', char='▲', color = #80eb34, location = location.belowbar, size = size.small)

// TP 10% Long
TP10long = ((generaluptrend and bullish[1]) or (generaluptrend and extremebullish[1])) and (direction1 > 0 or direction2 > 0 or direction3 > 0)
//plotchar(TP10long and not TP10long[1]? close : na, title = 'TP on Long', char='┼', color = #ffd000, location = location.abovebar, size = size.tiny)

// Exit Long
//plotchar(extremebearish and not extremebearish[1] or bearish and not bearish[1]? close : na, title = 'Close all Longs', char='Ꭓ', color = #ff0037, location = location.abovebar, size = size.tiny)
stopsupertrendup = if supertrend1 < supertrend2 and supertrend1 < supertrend3
    (supertrend1)
else if supertrend2 < supertrend1 and supertrend2 < supertrend3
    (supertrend2)
else if supertrend3 < supertrend1 and supertrend3 < supertrend2
    (supertrend3)
lowestLows = ta.lowest(low, 1)
// Open Short
//plotchar(((bearish and not bearish[1]) or (extremebearish and not extremebearish[1])) and (emacolor==color.red)? close : na, title = 'Start Short', char='▼', color = #0547e3, location = location.abovebar, size = size.small)

// TP 10% Short
TP10short = ((generaldowntrend and bearish[1]) or (generaldowntrend and extremebearish[1])) and (direction1 < 0 or direction2 < 0 or direction3 < 0)
//plotchar(TP10short and not TP10short[1]? close : na, title = 'TP on Short', char='┼', color = #ffd000, location = location.belowbar, size = size.tiny)

// Exit Short
//plotchar(extremebullish and not extremebullish[1] or bullish and not bullish[1]? close : na, title = 'Close all Shorts', char='Ꭓ', color = #ff0037, location = location.belowbar, size = size.tiny)
stopsupertrenddown = if supertrend1 > supertrend2 and supertrend1 > supertrend3
    (supertrend1)
else if supertrend2 > supertrend1 and supertrend2 > supertrend3
    (supertrend2)
else if supertrend3 > supertrend1 and supertrend3 > supertrend2
    (supertrend3)
highestHighs = ta.highest(high,1)
// Set stop loss level with input options (optional)
//longLossPerc = input.float(title="Long Stop Loss (%)",
//     minval=0.0, step=0.1, defval=1) * 0.01

//shortLossPerc = input.float(title="Short Stop Loss (%)",
//     minval=0.0, step=0.1, defval=1) * 0.01
     
// Determine stop loss price
//longStopPrice  = strategy.position_avg_price * (1 - longLossPerc)
//shortStopPrice = strategy.position_avg_price * (1 + shortLossPerc)

openlong = (extremebullish and not extremebullish[1]) and (emacolor==color.green)//(((bullish and not bullish[1]) or 
openshort = (extremebearish and not extremebearish[1]) and (emacolor==color.red)//(((bearish and not bearish[1]) or 
exitlong = lowestLows<(stopsupertrendup - ((stopsupertrendup / 100) * 0.1)) //(extremebearish and not extremebearish[1] or bearish and not bearish[1]) or TP10long or 
exitshort = highestHighs>(stopsupertrenddown - ((stopsupertrenddown / 100) * 0.1)) //(extremebullish and not extremebullish[1] or bullish and not bullish[1]) or TP10short
//strategy.entry("buy", strategy.long, when=openlong)
//strategy.entry("sell", strategy.short, when=openshort)

//strategy.close("buy", when=exitlong)
//strategy.close("sell", when=exitshort)

// Submit exit orders based on calculated stop loss price
//if (strategy.position_size > 0)
//    strategy.exit(id="Long Stop", stop=longStopPrice)

//if (strategy.position_size < 0)
//    strategy.exit(id="Short Stop", stop=shortStopPrice)

backtest_timeframe_start = input(defval = timestamp("01 Apr 2016 13:30 +0000"), title = "Backtest Start Time")
USE_ENDTIME = input(false,title="Define the ending period for backtests (If false, will test up to most recent candle)")
backtest_timeframe_end = input(defval = timestamp("19 Mar 2021 19:30 +0000"), title = "Backtest End Time")
TARGET_PROFIT_MODE = input(false,title="Exit when Risk:Reward met")
REWARD_RATIO = input(3,title="Risk:[Reward] (i.e. 3) for exit")
// Trailing stop loss {
TSL_ON = input(true,title="Use trailing stop loss")
var entry_price = float(0)
ATR_multi_len = 26
ATR_multi = input(2, "ATR multiplier for stop loss")
ATR_buffer = ta.atr(ATR_multi_len) * ATR_multi
plotchar(ATR_buffer, "ATR Buffer", "A", location = location.top)
risk_reward_buffer = (ta.atr(ATR_multi_len) * ATR_multi) * REWARD_RATIO
take_profit_long = low > entry_price + risk_reward_buffer
take_profit_short = low < entry_price - risk_reward_buffer
var trailing_SL_buffer = float(0)
var stop_loss_price = float(0)
stop_loss_price := math.max(stop_loss_price, close - trailing_SL_buffer)
// plot TSL line
trail_profit_line_color = color.green
if strategy.position_size == 0  or not TSL_ON
    trail_profit_line_color := color.black
    stop_loss_price := close - trailing_SL_buffer
plot(stop_loss_price,color=trail_profit_line_color)
// }

if true
    buy_condition = openlong
    exit_condition = exitlong
    //ENTRY:
    if buy_condition
        if strategy.position_size == 0
            entry_price := close
            trailing_SL_buffer := ATR_buffer
            stop_loss_price := close - ATR_buffer
        
        msg = "entry"
        if strategy.position_size > 0
            msg := "pyramiding"
        strategy.entry("Long",strategy.long, comment=msg)

    //EXIT:
    // Case (A) hits trailing stop
    if TSL_ON and strategy.position_size > 0 and close <= stop_loss_price
        if close > entry_price
            strategy.close("Long", comment="take profit [trailing]")
        else if close <= entry_price 
            strategy.close("Long", comment="stop loss")
    // Case (B) take targeted profit relative to risk 
    if strategy.position_size > 0 and TARGET_PROFIT_MODE
        if take_profit_long
            strategy.close("Long", comment="take profits [risk:reward]")
    // Case (C)
    if strategy.position_size > 0 and exit_condition
        if take_profit_long
            strategy.close("Long", comment="exit[rsi]")
```

> Detail

https://www.fmz.com/strategy/436110

> Last Modified

2023-12-21 12:05:07
