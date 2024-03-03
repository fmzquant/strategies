
> Name

三重SuperTrend和Stoch-RSI策略Triple-SuperTrend-and-Stoch-RSI-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/129da698e581bf21627.png)
[trans]


## 概述

三重SuperTrend和Stoch RSI策略是一个结合多时间框架的趋势跟随和超买超卖指标的量化交易策略。该策略利用三重不同参数设置的SuperTrend指标判断市场趋势,并结合Stoch RSI指标的超买超卖信号发出交易信号。在具体操作中,该策略在两个较快的SuperTrend指标同时发出买入/卖出信号时,如果Stoch RSI指标也确认了该信号,就会进行相应的做多/做空操作。

## 策略原理

三重SuperTrend和Stoch RSI策略的核心逻辑是结合不同参数设置的SuperTrend指标和Stoch RSI指标进行交易信号过滤,以提高信号质量和降低错误信号率。

首先,该策略使用三组不同参数的SuperTrend指标判断市场主要趋势。这三组SuperTrend指标的参数设置不同,时间框架从快到慢,用来捕捉不同级别的趋势变化。当最快和次快的SuperTrend指标同时发出买入/卖出信号时,我们初步判断该信号具有一定的可靠性。

其次,策略引入Stoch RSI指标判断该信号是否过度超买或超卖。Stoch RSI指标结合随机指数指标RSI和随机指标Stochastic的优点,可以有效判断市场是否处于超买或超卖状态。如果最快和次快SuperTrend信号与Stoch RSI指标信号一致时,我们就可以发出最终的买入/卖出信号。

通过多指标和多时间框架的结合,三重SuperTrend和Stoch RSI策略可以有效过滤市场噪音,提高信号的可靠性,并减少错误交易的发生。

## 策略优势

三重SuperTrend和Stoch RSI策略最大的优势在于多指标和多时间框架的有效结合,这为我们带来以下益处:

1. 减少错误交易信号。三重SuperTrend指标和Stoch RSI指标的结合,可以大大减少单一指标存在的噪音信号和错误信号。

2. 提高盈利信号比率。虽然信号频率降低,但盈利信号的比例会有显著提高。

3. 适合趋势性市场。多时间框架滤波有利于捕捉中长线趋势,适合趋势较明显的市场环境。

4. 容易通过参数优化取得更好效果。三重指标为参数优化提供了更大的可能性空间。

5. 可根据个人风格调整参数。可以自由调整参数,使策略更符合自己的交易风格。

## 策略风险

三重SuperTrend和Stoch RSI策略也存在一定的风险,主要集中在以下几个方面:

1. 信号频率降低。多层过滤机制令策略的交易频率会有明显的降低。

2. 容易错过部分信号。策略的保守性会使其容易错过部分潜在机会。

3. 多指标增加参数依赖。指标和参数越多,策略优化难度也越大。

4. 跟随能力有限。多时间框架结合也限制了策略跟随趋势的灵活性。

针对上述风险,我们可以通过调整指标参数,引入更多辅助判断指标等方式进行优化,使策略在控制风险的同时,获得更高的盈利质量。

## 策略优化方向 

三重SuperTrend和Stoch RSI策略仍有进一步优化的空间,主要可以从以下几个方面入手:

1. 调整指标参数组合,找到最佳参数匹配。可以引入更多组指标参数测试,找到最优参数。

2. 增加止损止盈策略,控制单次交易风险。这可以大幅提高策略稳定性。

3. 引入更多判断指标进行信号验证。例如引入交易量指标等进行多角度判断。

4. 增加自适应功能。可以让策略自动优化和调整参数,适应市场变化。

5. 结合机器学习算法进行预测。利用AI算法预测指标信号的准确性。

通过持续优化,三重SuperTrend和Stoch RSI策略可以成长为一个稳定、高效的量化交易策略,为我们带来可观的 Alpha。

## 总结

三重SuperTrend和Stoch RSI策略成功地将多时间框架分析与超买超卖判断相结合,形成了一个独特的趋势跟随型交易策略。它同时保留了趋势跟随和指标过滤双重优势,在减少噪音信号的同时提高了盈利信号的比例。虽然该策略风险和可优化空间依然存在,但通过参数调整和策略优化,它的盈利能力和稳定性仍可得到进一步提升。总体来说,三重SuperTrend和Stoch RSI策略为量化交易实践提供了一个高质量的策略选择。

|| 

## Overview  

The Triple SuperTrend and Stoch RSI strategy is a quantitative trading strategy that combines multi-timeframe trend following of the SuperTrend indicator and overbought/oversold signals from the Stoch RSI indicator. The strategy utilizes three SuperTrend indicators with different parameter settings to determine market trends and combines Stoch RSI signals to filter trade signals. Specifically, when the two faster SuperTrend indicators give concurrent buy/sell signals, if the Stoch RSI indicator confirms, corresponding long/short positions will be taken.

## Strategy Logic

The core logic of the Triple SuperTrend and Stoch RSI strategy is to combine SuperTrend indicators with different parameters and the Stoch RSI indicator for trade signal filtering to improve signal quality and decrease false signals.

Firstly, the strategy adopts three SuperTrend indicators with varied parameter settings to determine the major market trend. The three SuperTrend indicators have parameters ranging from fast to slow timeframes, in order to capture trend changes at different levels. When the fastest and second-fastest SuperTrend indicators give concurrent buy/sell signals, we make a preliminary judgment that the signal has some reliability.  

Secondly, the Stoch RSI indicator is introduced to determine whether the market is extremely overbought or oversold when the signal occurs. The Stoch RSI indicator combines the strengths of the RSI and Stochastic indicators, enabling effective judgments on overbought/oversold market conditions. When the fastest and second fastest SuperTrend signals align with Stoch RSI signals, the final buy/sell signals can be triggered.

Through the combination of multiple indicators and timeframes, the Triple SuperTrend and Stoch RSI strategy can effectively filter out market noise, improve signal reliability, and reduce incorrect trades.

## Advantages of the Strategy

The biggest advantage of the Triple SuperTrend and Stoch RSI strategy lies in the effective combination of multiple indicators and timeframes, which brings the following benefits:

1. Reduces incorrect trade signals. The combination of the triple SuperTrend and Stoch RSI indicators can greatly decrease noise and false signals that come with individual indicators.

2. Improves profitable signal ratio. Despite decreased signal frequency, the proportion of profitable signals sees significant improvement.  

3. Suitable for trending markets. Multi-timeframe filtering facilitates capturing medium- to long-term trends, fitting trending market environments well.

4. Easy optimization for better performance. The triple indicators allow wider possibilities for parameter optimization.  

5. Customizable parameters catering to personal trading style. The parameters can be freely adjusted to better suit one's own trading style.

## Risks of the Strategy

There are also some risks associated with the Triple SuperTrend and Stoch RSI strategy:

1. Decreased signal frequency. The multilayer filter mechanism significantly decreases the trading frequency of the strategy.

2. Prone to missing some potential signals. The conservative nature makes the strategy likely to miss some profitable opportunities.

3. Increased parameter dependence. More indicators means greater difficulty in optimization.  

4. Limited trend following capability. The multi-timeframe combination also constrains the flexibility of trend following of the strategy.

To address these risks, optimization measures like adjusting indicator parameters and introducing more supplemental indicators can be adopted to enhance risk control while improving profitability quality.

## Optimization Directions

There is still room for further optimization of the Triple SuperTrend and Stoch RSI strategy:  

1. Adjust indicator parameters for best combination. More sets of parameters can be tested to find the optimum.

2. Introduce stop loss/take profit for better risk control. This can greatly improve the stability of the strategy. 

3. Incorporate more indicators for signal validation, e.g. volume indicators.

4. Build in adaptive capabilities to auto optimize parameters according to changing market dynamics. 

5. Combine machine learning algorithms for performance prediction, assessing signal accuracy.

With continuous optimization, the Triple SuperTrend and Stoch RSI strategy can evolve into a stable, efficient trading system, providing considerable alpha.


## Conclusion
The Triple SuperTrend and Stoch RSI strategy successfully combines multi-timeframe analysis and overbought/oversold judgment into a unique trend following trading strategy. It retains the dual advantages of trend following and indicator filtering, improving profitable signals while decreasing false signals. Although risks and optimization space still exist, its profitability and stability can be further enhanced through parameter tuning and strategy optimization. Overall, the Triple SuperTrend and Stoch RSI strategy provides a high-quality quantitative trading strategy choice.  

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10|(?SUPERTREND SETTINGS)Fast Supertrend ATR Length|
|v_input_2|true|Fast Supertrend ATR Multiplier|
|v_input_3|11|Medium Supertrend ATR Length|
|v_input_4|2|Medium Supertrend ATR Multiplier|
|v_input_5|12|Slow Supertrend ATR Length|
|v_input_6|3|Slow Supertrend ATR Multiplier|
|v_input_7|3|(?STOCHASTIC RSI SETTINGS)K (Stochastic Fast)|
|v_input_8|3|D (Signal Line)|
|v_input_9|14|RSI Length|
|v_input_10|14|Stochastic Length|
|v_input_11_close|0|RSI Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_12|false|Restrict crosses to overbought/oversold territory|
|v_input_13|80|Stochastic  RSI Upper Band|
|v_input_14|20|Stochastic RSI Lower Band|
|v_input_15|200|(?EMA SETTINGS)EMA Length|
|v_input_16|0|(?POSITION EXIT SETTINGS)Stop Loss Strategy: ATR Based|
|v_input_17|14|Stop Loss ATR Length|
|v_input_18|2.7|Stop Loss ATR Multiplier|
|v_input_19|0|Take Profit Strategy: ATR Based|
|v_input_20|14|Take Profit ATR Length|
|v_input_21|1.6|Take Profit ATR Multiplier|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-29 00:00:00
end: 2023-04-17 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © M3RZI

//@version=4
strategy("3x Supertrend and Stoch RSI", overlay = true, max_bars_back = 1000)

//INPUTS
STATRLENGTH1 = input(10, title = "Fast Supertrend ATR Length", type = input.integer, group = "SUPERTREND SETTINGS")
STATRMULT1 = input(1, title = "Fast Supertrend ATR Multiplier", type = input.float, group = "SUPERTREND SETTINGS")
STATRLENGTH2 = input(11, title = "Medium Supertrend ATR Length", type = input.integer, group = "SUPERTREND SETTINGS")
STATRMULT2 = input(2, title = "Medium Supertrend ATR Multiplier", type = input.float, group = "SUPERTREND SETTINGS")
STATRLENGTH3 = input(12, title = "Slow Supertrend ATR Length", type = input.integer, group = "SUPERTREND SETTINGS")
STATRMULT3 = input(3, title = "Slow Supertrend ATR Multiplier", type = input.float, group = "SUPERTREND SETTINGS")

stochK = input(3, title = "K (Stochastic Fast)", type = input.integer, group = "STOCHASTIC RSI SETTINGS")
stochD = input(3, title = "D (Signal Line)", type = input.integer, group = "STOCHASTIC RSI SETTINGS")
rsiLength = input(14, title = "RSI Length", type = input.integer, group = "STOCHASTIC RSI SETTINGS")
stochLength = input(14, title = "Stochastic Length", type = input.integer, group = "STOCHASTIC RSI SETTINGS")
rsiSource = input(close, title = "RSI Source", type = input.source, group = "STOCHASTIC RSI SETTINGS")
stochRestrictions = input(false, title = "Restrict crosses to overbought/oversold territory", type = input.bool, group = "STOCHASTIC RSI SETTINGS")
overboughtLine = input(80, title = "Stochastic  RSI Upper Band", type = input.integer, group = "STOCHASTIC RSI SETTINGS")
oversoldLine = input(20, title = "Stochastic RSI Lower Band", type = input.integer, group = "STOCHASTIC RSI SETTINGS")

EMALength  = input(200, title = "EMA Length", type = input.integer, group = "EMA SETTINGS")

SLStrategy = input("ATR Based", title = "Stop Loss Strategy", options = ["ATR Based"],type = input.string, group = "POSITION EXIT SETTINGS")
SLATRLength = input(14, title = "Stop Loss ATR Length", type = input.integer, group = "POSITION EXIT SETTINGS")
SLATRMult = input(2.7, title = "Stop Loss ATR Multiplier", type = input.float, group = "POSITION EXIT SETTINGS")
TPStrategy = input("ATR Based", title = "Take Profit Strategy", options = ["ATR Based"],type = input.string, group = "POSITION EXIT SETTINGS")
TPATRLength = input(14, title = "Take Profit ATR Length", type = input.integer, group = "POSITION EXIT SETTINGS")
TPATRMult = input(1.6, title = "Take Profit ATR Multiplier", type = input.float, group = "POSITION EXIT SETTINGS")

//SUPERTRENDS
[superTrend1,dir1] = supertrend(STATRMULT1,STATRLENGTH1)
[superTrend2,dir2] = supertrend(STATRMULT2,STATRLENGTH2)
[superTrend3,dir3] = supertrend(STATRMULT3,STATRLENGTH3)

directionST1 = dir1 == 1 and dir1[1] == 1 ? false : dir1 == -1 and dir1[1] == -1 ? true : na
directionST2 = dir2 == 1 and dir2[1] == 1 ? false : dir2 == -1 and dir2[1] == -1 ? true : na
directionST3 = dir3 == 1 and dir3[1] == 1 ? false : dir3 == -1 and dir3[1] == -1 ? true : na

//STOCH RSI
rsi = rsi(rsiSource, rsiLength)
k = sma(stoch(rsi, rsi, rsi, stochLength), stochK)
d = sma(k, stochD)

//EMA
ema = ema(close,EMALength)

//CONDITIONS LONG AND SHORT

var long = false
var longCondition = false
var short = false
var shortCondition = false
var drawing = false
var TP = 0.0
var SL = 0.0
var middle = 0.0
var initial = 0

stopSize = atr(SLATRLength) * SLATRMult
profitSize = atr(TPATRLength) * TPATRMult
longStop = close - stopSize
longProfit = close + profitSize
current = close
shortStop = close + stopSize
shortProfit = close - profitSize
barInitial = bar_index

if  stochRestrictions
    longCondition := close > ema and ((directionST1 == true and directionST2 == true)  or (directionST2 == true and directionST3 == true)) and crossover(k,d) and k < oversoldLine and not long and not drawing
    shortCondition := close < ema and ((directionST1 == false and directionST2 == false)  or (directionST2 == false and directionST3 == false)) and crossunder(k,d) and k > overboughtLine and not short and not drawing
else
    longCondition := close > ema and ((directionST1 == true and directionST2 == true)  or (directionST2 == true and directionST3 == true)) and crossover(k,d) and not long and not drawing
    shortCondition := close < ema and ((directionST1 == false and directionST2 == false)  or (directionST2 == false and directionST3 == false)) and crossunder(k,d) and not short and not drawing

if longCondition
    long := true
    short := false
    drawing := true
    TP := longProfit
    middle := current
    SL := longStop
    initial := barInitial
    strategy.entry("Long", strategy.long, 10)
    strategy.exit("Long exit","Long", limit = TP, stop = SL)
    alert("Long signal Supertrend \n Profit:"+tostring(TP)+"\Curret price:"+tostring(close)+"\Stop:"+tostring(SL),alert.freq_once_per_bar_close)
    //label.new(bar_index,low,text = "Long\nTP:"+tostring(TP)+"\nSL:"+tostring(SL)+"\nAbierto:"+tostring(current), yloc = yloc.belowbar, textcolor = color.white, color = color.green, size = size.small,  style = label.style_label_up)

if shortCondition
    short := true
    long := false
    drawing := true
    TP := shortProfit
    middle := current
    SL := shortStop
    initial := barInitial
    strategy.entry("Short", strategy.short, 10)
    strategy.exit("Short exit","Short",limit = TP , stop = SL)
    alert("Short signal Supertrend \n Profit:"+tostring(TP)+"\Curret price:"+tostring(close)+"\Stop:"+tostring(SL),alert.freq_once_per_bar_close)
    //label.new(bar_index,high,text = "Short\nTP:"+tostring(TP)+"\nSL:"+tostring(SL)+"\nAbierto:"+tostring(current), yloc = yloc.abovebar, textcolor = color.white, color = color.red, size = size.small,  style = label.style_label_down)

if long and (high[1] >= TP or low[1] <= SL)
    drawing := false
    long := false
    if high[1] >= TP
        label.new(bar_index[int((bar_index - initial)/2)],TP, text = "Win (Long)", textcolor = color.white, color = color.green, size = size.small, style = label.style_label_down)
    else
        label.new(bar_index[int((bar_index - initial)/2)],SL, text = "Lose (Long)", textcolor = color.white, color = color.red, size = size.small, style = label.style_label_up)

if short and (low[1] <= TP or high[1] >= SL)
    drawing :=  false
    short := false
    if low[1] <= TP
        label.new(bar_index[int((bar_index - initial)/2)],TP, text = "Win (short)", textcolor = color.white, color = color.green, size = size.small, style = label.style_label_up)
    else
        label.new(bar_index[int((bar_index - initial)/2)],SL, text = "Lose (short)", textcolor = color.white, color = color.red, size = size.small, style = label.style_label_down)

//STRATEGY
//strategy.entry("buy", strategy.long, 10, when = longCondition)
//strategy.exit("bracket", "buy",  10, limit = TP, stop = SL)
//strategy.entry("short", strategy.long, 10, when = shortCondition)
//strategy.exit("bracket", "short",  10, limit = TP, stop = SL)

//DRAWING
plotshape(longCondition, title = "Long Signal", location=location.belowbar, style=shape.labelup, color=color.green, textcolor=color.white, size=size.small, text="Long")
plotshape(shortCondition, title = "Short Signal", location=location.abovebar, style=shape.labeldown, color=color.red, textcolor=color.white, size=size.small, text="Short")
profitLine = plot(drawing and drawing[1] ? TP : na, title = "Take profit", color = color.green, style = plot.style_linebr)
currentLine =plot(drawing and drawing[1]  ? middle : na, title = "Middle Line", color = color.white, style = plot.style_linebr)
lossLine = plot(drawing and drawing[1]  ? SL : na, title = "Stop Loss", color = color.red, style = plot.style_linebr)
fill(currentLine,profitLine, title = "Profit Background" ,color = color.new(color.green,75))
fill(currentLine,lossLine, title = "Loss Background" ,color = color.new(color.red,75))
plot(superTrend1, title = "Fast Supertrend", color = dir1 == 1 and dir1[1] == 1 ? color.red : dir1 == -1 and dir1[1] == -1 ? color.green : na)
plot(superTrend2, title = "Medium Supertrend", color = dir2 == 1 and dir2[1] == 1 ? color.red : dir2 == -1 and dir2[1] == -1 ? color.green : na)
plot(superTrend3, title = "Slow Supertrend", color = dir3 == 1 and dir3[1] == 1 ? color.red : dir3 == -1 and dir3[1] == -1 ? color.green : na)
plot(ema, title = "EMA",color = color.yellow)
//plot(k, color = color.blue)
//plot(d, color = color.orange)
//h1 = hline(80)
//h2 = hline(20)
//fill(h1,h2, color = color.new(color.purple,60))



```

> Detail

https://www.fmz.com/strategy/434446

> Last Modified

2023-12-06 14:29:00
