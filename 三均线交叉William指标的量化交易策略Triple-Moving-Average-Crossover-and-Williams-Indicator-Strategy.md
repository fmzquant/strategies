
> Name

三均线交叉William指标的量化交易策略Triple-Moving-Average-Crossover-and-Williams-Indicator-Strategy

> Author

ChaoZhang

> Strategy Description

[trans]

## 概述

该策略通过结合三条平滑移动平均线、相对强弱指数(RSI)和威廉指标,识别股价的趋势方向,在趋势发生反转的时候寻找入场机会。当快中慢三条移动平均线向上(下)对齐,RSI高于(低于)50,且出现向下(上)的威廉指标信号时,做多(空)头。止损点设定为入场价格的一定百分比,止盈点为入场价格向有利方向移动一定百分比后。

## 策略原理

该策略使用了三条不同周期的平滑移动平均线,包括快线、中线和慢线。当快线上穿中线时,表示股价进入上升趋势;当快线下穿中线时,表示股价进入下跌趋势。在确定股价处于上升或下跌趋势后,策略等待首次交易机会的出现。

具体来说,在股价进入上升趋势后,策略会等待以下五个条件同时满足,才会开仓做多:
1. 快线、中线和慢线全部向上;
2. RSI高于50; 
3. 出现向下的威廉指标形态;
4. 股价上穿慢线;
5. 当前没有持仓。

在股价进入下跌趋势后,策略会等待以下五个条件同时满足,才会开仓做空:
1. 快线、中线和慢线全部向下;  
2. RSI低于50;
3. 出现向上的威廉指标形态;
4. 股价下穿慢线;
5. 当前没有持仓。

做多做空后,策略会设置止损点和止盈点来控制风险。具体来说,止损点为入场价格的一定百分比,止盈点为入场价格向有利方向移动一定百分比后的价格。

## 策略优势

1. 结合多种指标确认入场,可以有效避免假突破。三条均线确定趋势方向,威廉指标捕捉反转信号,RSI过滤震荡行情,共同提高入场的准确率。

2. 设置止盈止损点,可以很好控制每单的风险收益比,从而保证盈利的交易大于亏损的交易。

3. 策略逻辑清晰易理解,参数设置合理,适合不同级别的交易者使用。

## 策略风险

1. 在震荡行情中,指标可能发出错误信号,导致不必要的入场。可以通过优化RSI的参数来过滤掉部分震荡行情。

2. 快线中线交叉可能出现假突破,应该与其他指标搭配使用。可以考虑加入成交量指标。 

3. 停损点距离入场价太近可能会被止损出场,止损点的设置需要调整到合适的位置。

4. 止盈点距离入场价太远可能无法止盈出场,止盈点也需要调整到合适的位置。

## 策略优化方向 

1. 可以测试不同周期的参数组合,优化三条均线和RSI的参数。

2. 可以加入其他指标,如成交量指标,突破前判断成交量是否突出。

3. 可以根据不同品种分别测试该策略的参数设置。

4. 可以根据回测结果绘制收益曲线,测试止损止盈参数的设置。

5. 可以尝试在启用之前进行模拟交易,优化参数设置。

## 总结

该策略整体来说逻辑清晰,使用指标组合进行入场和出场,可以有效控制风险。策略的参数优化空间还很大,通过测试不同的参数设置,该策略可以成为一个稳定盈利的量化交易策略。但任何策略都无法完全避免损失,需要交易者保持交易纪律,做到盈利了就止盈,亏损了就止损。

||


## Overview

This strategy identifies the price trend direction by combining three smoothed moving averages, relative strength index (RSI) and Williams indicator, and seeks trading opportunities when the trend reverses. It goes long (short) when the fast, medium and slow moving averages align upward (downward), RSI is above (below) 50 and a down (up) Williams signal appears. The stop loss is set at a certain percentage of the entry price, and take profit at a certain percentage move in the favorable direction from the entry price.

## Strategy Logic

The strategy uses three moving averages with different periods, including fast, medium and slow MAs. When the fast MA crosses over the medium MA, it signals an upward price trend. When the fast MA crosses below the medium MA, it signals a downward price trend. After identifying the uptrend or downtrend, the strategy waits for the first trading opportunity. 

Specifically, after the price enters an uptrend, the strategy waits until the following five conditions are met before going long:

1. The fast, medium and slow MAs are all pointing up;

2. RSI is above 50;

3. A downside Williams pattern appears;  

4. The price crosses over the slow MA;

5. There is no current position.

After the price enters a downtrend, the strategy waits until the following five conditions are met before going short:

1. The fast, medium and slow MAs are all pointing down;

2. RSI is below 50;

3. An upside Williams pattern appears;

4. The price crosses below the slow MA; 

5. There is no current position.

After going long or short, the strategy sets a stop loss at a certain percentage below the entry price, and a take profit target at a certain percentage above the entry price.

## Advantages

1. Combining multiple indicators to confirm entries can effectively avoid false breakouts. The triple MAs identify the trend direction, Williams catches reversal signals, and RSI filters out range-bound price action, jointly improving the accuracy of entries.

2. Setting stop loss and take profit can well control the risk/reward of each trade, ensuring winning trades exceed losing trades. 

3. The strategy logic is clear and easy to understand. The parameters are reasonably set. It suits traders at different levels.

## Risks

1. Indicators may generate incorrect signals during range-bound markets, causing unnecessary entries. Optimizing RSI parameters can filter out some whipsaws.

2. The fast and medium MA crossover may have false breakouts. Using other indicators in combination, e.g. volume, is recommended.

3. If the stop loss is too close to the entry price, it may get stopped out prematurely. The stop loss should be adjusted to a proper position.

4. If the take profit is too far from the entry price, it may not get hit. The take profit also needs proper adjustment.

## Optimization Directions

1. Test different parameter combinations for the three MAs and RSI.

2. Add other indicators, like volume, to check if volume surges on breakouts. 

3. Test parameters respectively based on different products. 

4. Draw profit curves based on backtest results to optimize stop loss and take profit.

5. Try paper trading before enabling it to optimize parameters.

## Conclusion

The strategy has clear logic overall, entering and exiting positions with a combination of indicators, which effectively controls risk. There is large room for parameter optimization. By testing different parameter settings, this strategy can become a steady profitable quantitative trading strategy. However, no strategy can completely avoid losses. Traders need to follow trading disciplines - taking profits when winning and cutting losses when losing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_float_1|0.1|Stop Loss %|
|v_input_float_2|0.4|Target Profit %|
|v_input_int_1|21|(?Smooth Moving Average)Fast Length|
|v_input_int_2|50|Mid Length|
|v_input_int_3|200|Slow Length|
|v_input_int_4|14|(?RSI)length|
|v_input_int_5|2|(?Fractals)Periods|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-08-28 00:00:00
end: 2023-09-27 00:00:00
period: 3h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//This script is a combination of 3 smoothed moving averages, and RSI. When moving averages are aligned upward (downward) and RSI is above (below) 50 and a down (up) William fractal appears, it enters long (short) position. Exiting from long and short entries are defined by StopLoss and TargetProfit.

//@version=5

strategy(title="3SmmaCrossUp + Fractal + RSI", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=100, currency=currency.USD, commission_type=strategy.commission.percent, commission_value=0.03)

///////////////////////////////////////////////////////////////////////////////////////////////////////////////// inputs

// Global
src = input(close, title="Source")
stopLoss = input.float(defval = 0.1, title = "Stop Loss %", minval = 0, maxval=100, step = 0.1)
targetProfit = input.float(defval = 0.4, title = "Target Profit %", minval = 0, maxval=100, step = 0.1)

// Smooth Moving Average
fastSmmaLen = input.int(21, minval=1, title="Fast Length", group = "Smooth Moving Average")
midSmmaLen = input.int(50, minval=1, title="Mid Length",group = "Smooth Moving Average")
slowSmmaLen = input.int(200, minval=1, title="Slow Length",group = "Smooth Moving Average")

// RSI
rsiLen = input.int(defval=14, title="length", minval=1, maxval=1000, step=1, group="RSI")

// Fractals
n = input.int(title="Periods", defval=2, minval=2, group = "Fractals")

///////////////////////////////////////////////////////////////////////////////////////////////////////////////// initialization

var waitingFirstTradeInUpwardTrend = false
var waitingFirstTradeInDownwardTrend = false

///////////////////////////////////////////////////////////////////////////////////////////////////////////////// functions

smma(ma, src, len) => 
    smma = 0.0
    smma := na(smma[1]) ? ma : (smma[1] * (len - 1) + src) / len
    smma
    
fractals(n, highs, lows) =>
    // UpFractal
    bool upflagDownFrontier = true
    bool upflagUpFrontier0 = true
    bool upflagUpFrontier1 = true
    bool upflagUpFrontier2 = true
    bool upflagUpFrontier3 = true
    bool upflagUpFrontier4 = true
    for i = 1 to n
        upflagDownFrontier := upflagDownFrontier and (highs[n-i] < highs[n])
        upflagUpFrontier0 := upflagUpFrontier0 and (highs[n+i] < highs[n])
        upflagUpFrontier1 := upflagUpFrontier1 and (highs[n+1] <= highs[n] and highs[n+i + 1] < highs[n])
        upflagUpFrontier2 := upflagUpFrontier2 and (highs[n+1] <= highs[n] and highs[n+2] <= highs[n] and highs[n+i + 2] < highs[n])
        upflagUpFrontier3 := upflagUpFrontier3 and (highs[n+1] <= highs[n] and highs[n+2] <= highs[n] and highs[n+3] <= highs[n] and highs[n+i + 3] < highs[n])
        upflagUpFrontier4 := upflagUpFrontier4 and (highs[n+1] <= highs[n] and highs[n+2] <= highs[n] and highs[n+3] <= highs[n] and highs[n+4] <= highs[n] and highs[n+i + 4] < highs[n])
    flagUpFrontier = upflagUpFrontier0 or upflagUpFrontier1 or upflagUpFrontier2 or upflagUpFrontier3 or upflagUpFrontier4
    
    upFractal = (upflagDownFrontier and flagUpFrontier)
    
    // downFractal
    bool downflagDownFrontier = true
    bool downflagUpFrontier0 = true
    bool downflagUpFrontier1 = true
    bool downflagUpFrontier2 = true
    bool downflagUpFrontier3 = true
    bool downflagUpFrontier4 = true
    
    for i = 1 to n
        downflagDownFrontier := downflagDownFrontier and (lows[n-i] > lows[n])
        downflagUpFrontier0 := downflagUpFrontier0 and (lows[n+i] > lows[n])
        downflagUpFrontier1 := downflagUpFrontier1 and (lows[n+1] >= lows[n] and lows[n+i + 1] > lows[n])
        downflagUpFrontier2 := downflagUpFrontier2 and (lows[n+1] >= lows[n] and lows[n+2] >= lows[n] and lows[n+i + 2] > lows[n])
        downflagUpFrontier3 := downflagUpFrontier3 and (lows[n+1] >= lows[n] and lows[n+2] >= lows[n] and lows[n+3] >= lows[n] and lows[n+i + 3] > lows[n])
        downflagUpFrontier4 := downflagUpFrontier4 and (lows[n+1] >= lows[n] and lows[n+2] >= lows[n] and lows[n+3] >= lows[n] and lows[n+4] >= lows[n] and lows[n+i + 4] > lows[n])
    flagDownFrontier = downflagUpFrontier0 or downflagUpFrontier1 or downflagUpFrontier2 or downflagUpFrontier3 or downflagUpFrontier4
    
    downFractal = (downflagDownFrontier and flagDownFrontier)
    [upFractal, downFractal]

///////////////////////////////////////////////////////////////////////////////////////////////////////////////// calcs

[upFractal, downFractal] = fractals(n, high, low)


rsiIsHigh = ta.rsi(src, rsiLen) >= 50 


slowMa = ta.sma(src, slowSmmaLen)
midMa = ta.sma(src, midSmmaLen)
fastMa = ta.sma(src, fastSmmaLen)

slowSmma = smma(slowMa ,src, slowSmmaLen)
midSmma = smma(midMa, src, midSmmaLen)
fastSmma = smma(fastMa, src, fastSmmaLen)

isFastSmmaUpward = ta.rising(fastSmma, 1)
isMidSmmaUpward = ta.rising(midSmma, 1)
isSlowSmmaUpward = ta.rising(slowSmma, 1)

isFastSmmaDownward = ta.falling(fastSmma, 1)
isMidSmmaDownward = ta.falling(midSmma, 1)
isSlowSmmaDownward = ta.falling(slowSmma, 1)

slowMovingAveragesAreUpward = isMidSmmaUpward and isSlowSmmaUpward
slowMovingAveragesAreDownward = isMidSmmaDownward and isSlowSmmaDownward

justEnteredUpwardTrend = ta.crossover(fastSmma, midSmma) ? true : false
justEnteredDownwardTrend = ta.crossunder(fastSmma, midSmma) ? true : false

waitingFirstTradeInUpwardTrend := justEnteredUpwardTrend == true ? true : (isFastSmmaDownward or isMidSmmaDownward or isSlowSmmaDownward ? false : waitingFirstTradeInUpwardTrend)
waitingFirstTradeInDownwardTrend := justEnteredDownwardTrend == true ? true : (isFastSmmaUpward or isMidSmmaUpward or isSlowSmmaUpward ? false : waitingFirstTradeInDownwardTrend)

priceCrossedOverSlowMa = ta.crossover(close, slowSmma)
priceCrossedUnderSlowMa = ta.crossunder(close, slowSmma)

enterLongCondition = barstate.isconfirmed and low > fastSmma and rsiIsHigh and (downFractal or priceCrossedOverSlowMa) and waitingFirstTradeInUpwardTrend and strategy.position_size == 0

enterShortCondition = barstate.isconfirmed and high < fastSmma and (not rsiIsHigh) and (upFractal or priceCrossedUnderSlowMa) and waitingFirstTradeInDownwardTrend and strategy.position_size == 0

///////////////////////////////////////////////////////////////////////////////////////////////////////////////// strategy

if(enterLongCondition)
    strategy.entry(id="L", direction=strategy.long)
    waitingFirstTradeInUpwardTrend := false

if(enterShortCondition)
    strategy.entry(id="S", direction=strategy.short)
    waitingFirstTradeInDownwardTrend := false
    
if(strategy.position_size > 0)
    strategy.exit(id="EL", stop=strategy.position_avg_price * (1 - stopLoss/100), limit=strategy.position_avg_price * (1+targetProfit/100)) 
if(strategy.position_size < 0)
    strategy.exit(id="ES", stop=strategy.position_avg_price * (1 + stopLoss/100), limit=strategy.position_avg_price * (1-targetProfit/100)) 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////// plots

plot(series = slowSmma, title="Slow SMMA", linewidth=3)
plot(series = midSmma, title="Mid SMMA", linewidth=2)
plot(series = fastSmma, title="Fast SMMA", linewidth=1)
plotchar(series=rsiIsHigh, title='rsiIsHigh', char='')
plotchar(series=justEnteredUpwardTrend, title='justEnteredUpwardTrend', char='')
plotchar(series=justEnteredDownwardTrend, title='justEnteredDownwardTrend', char='')
plotchar(series=waitingFirstTradeInUpwardTrend, title='waitingFirstTradeInUpwardTrend', char='')
plotchar(series=waitingFirstTradeInDownwardTrend, title='waitingFirstTradeInDownwardTrend', char='')
plotchar(series=enterLongCondition, title='enterLongCondition' , char='')
plotchar(series=enterShortCondition, title='enterShortCondition' , char='')
plotshape(series=upFractal, title='upFractal', style=shape.triangleup, location=location.abovebar, color=#009688, size = size.tiny)
plotshape(series=downFractal, title='downFractal', style=shape.triangledown, location=location.belowbar, color=color.red, size = size.tiny)












```

> Detail

https://www.fmz.com/strategy/428052

> Last Modified

2023-09-28 10:58:16
