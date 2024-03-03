
> Name

动量振荡枯竭策略Momentum-Exhaustion-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/17c5d7f10e1296264f7.png)
[trans]


## 概述

动量振荡枯竭策略是一种趋势跟踪策略,它利用移动平均线和价格百分比振荡指标来尽量减少下跌风险。该策略属于指数基金交易模型,可以有效控制风险。

## 策略原理

该策略的核心指标是枯竭值和枯竭均线。枯竭值是价格振荡的一个量度指标,它由收盘价、最高价和最低价计算得到。具体计算方法是:(收盘价+最高价+最低价-枯竭值的移动平均)/(枯竭值的移动平均)。枯竭均线则是枯竭值的移动平均线。当枯竭值上穿枯竭均线时,表示行情出现盘整,可能形成新的趋势;当枯竭值下穿枯竭均线时,表示趋势反转,应该考虑止盈了结。

此外,策略还利用长短期移动平均线辅助判断趋势,包括300日线、150日线和50日线。当短期移动平均线下穿长期移动平均线时,表示趋势反转,应该考虑止损。 

MACD也用于短期买卖点判断。当MACD线上穿信号线时看涨,下穿信号线时看跌。RSI低位也作为买入信号使用。

具体的入场和出场逻辑是:

买入条件:枯竭值上穿枯竭均线,且50日线高于150日线;或者RSI低于30。

短期止损条件:枯竭值下穿枯竭均线;或MACD下穿信号线。 

中长期止损条件:50日线下穿150日线;或150日线下穿300日线。

## 策略优势

该策略结合多种指标判断趋势 endtime exhaustion 来控制风险,具有以下优势:

1. 枯竭指标可以有效判断盘整和反转。及时发现趋势反转是有效控制风险的关键。

2. 运用多时间周期移动平均线判断趋势,避免被短期市场噪音误导。

3. MACD辅助确认买卖点,提高策略的实战效果。

4. RSI指标发挥低买高卖的效用,在超跌时机买入。

5. 明确的止盈止损策略,能够有效控制每次交易的风险。

## 策略风险

该策略也存在一定的风险:

1. 基于多种指标判断,参数设置不当可能导致交易信号错误。需要反复测试优化参数。

2. 枯竭指标并非完全可靠,价格出现低背离时可能失效。

3. 止损点设置不当可能造成超短线震荡而被止损。止损点要兼顾策略的长短效果。

4. 大盘整体震荡时,指标将失效,需要注意控制仓位规模。

## 策略优化方向 

该策略可以从以下几个方面进行优化:

1. 测试不同参数组合,寻找最佳参数以减少错误信号。可调节的关键参数包括均线周期、枯竭值周期等。

2. 结合波动率指标如ATR来动态调整止损幅度,在大波动时适当放宽止损幅度。

3. 优化仓位管理,不同大盘阶段可以预设不同的仓位比例规则。

4. 结合积累线、支撑线等图形指标提高策略的实战效果。

5. 增加机器学习算法,辅助判断关键指标的效力,实现动态优化。

## 总结

动量枯竭策略综合运用多种指标判断趋势反转,以控制交易风险。该策略具有趋势跟踪能力,可有效判断买卖时机。通过参数优化、止损规则设定、图形指标辅助等方式可以进一步提升策略效果。总体来说,该策略对大盘震荡有一定的适应能力,可作为风险控制型策略选项之一。

||
 

## Overview

The Momentum Exhaustion Strategy is a trend following strategy that utilizes moving averages and price percentage oscillators to minimize downside exposure. It belongs to index fund trading models and can effectively control risks.

## Strategy Logic

The core indicators of this strategy are Exhaustion and Exhaustion Moving Average. Exhaustion is a measure of price oscillation, calculated from close, high and low prices. The specific calculation is: (close+high+low-moving average of Exhaustion)/moving average of Exhaustion. The Exhaustion Moving Average is the moving average of Exhaustion. When Exhaustion crosses above Exhaustion Moving Average, it indicates consolidation in the market and a possible new trend forming. When Exhaustion crosses below Exhaustion Moving Average, it signals a trend reversal and we should consider taking profit.

In addition, the strategy also uses long and short term moving averages to assist in determining the trend, including 300-day, 150-day and 50-day lines. When the short term moving average crosses below the long term moving average, it signals a trend reversal and we should consider stopping loss.

MACD is also used for short-term buy and sell signals. When MACD line crosses above signal line, it indicates a bullish signal, and when MACD crosses below signal line, it indicates a bearish signal. RSI bottoms are also used as buy signals.

The specific entry and exit logic is:

Buy signal: Exhaustion crossing above Exhaustion Moving Average, and 50-day MA above 150-day MA; or RSI below 30. 

Short-term stop loss: Exhaustion crossing below Exhaustion Moving Average; or MACD crossing below signal line.

Mid-long term stop loss: 50-day MA crossing below 150-day MA; or 150-day MA crossing below 300-day MA.

## Advantages of the Strategy

This strategy combines multiple indicators to determine the trend exhaustion and control risks. The advantages are:

1. The Exhaustion indicator can effectively identify consolidation and reversal. Timely detecting trend reversal is key to controlling risks.

2. Using moving averages of multiple timeframes to determine the trend avoids being misled by short-term market noise.

3. MACD helps confirm buy and sell signals, improving the strategy's performance. 

4. RSI plays its role of buying low and selling high, buying at extremely oversold situations.

5. The clear profit taking and stop loss strategy can effectively control the risk of each trade.

## Risks of the Strategy

There are also some risks with this strategy:

1. Relying on multiple indicators, improper parameter settings may lead to wrong trading signals. Parameters need to be repeatedly tested and optimized.

2. The Exhaustion indicator is not completely reliable, it may fail when there is price divergence.

3. Improper stop loss placement may result in being stopped out by short-term fluctuations. Stop loss should balance long and short term effects.

4. When the overall market is ranging, the indicators may fail. Position sizing needs to be controlled.

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Test different parameter combinations to find the optimal parameters and reduce false signals. Key adjustable parameters include moving average periods, Exhaustion periods etc.

2. Incorporate volatility indicators like ATR to dynamically adjust stop loss range according to market volatility.

3. Optimize position sizing, with different position sizing rules for different market conditions. 

4. Incorporate chart patterns like trendlines, support lines to improve strategy performance.

5. Add machine learning algorithms to assist in gauging the effectiveness of key indicators, realizing dynamic optimization.

## Conclusion

The Momentum Exhaustion Strategy combines multiple indicators to identify trend reversal and control risks. It has trend following capability and can effectively determine entry and exit points. Further improvements can be made through parameter optimization, stop loss rules, incorporating chart patterns and more. Overall it has adaptability to market fluctuations and can be considered as a risk control strategy option.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|12|Fast Length|
|v_input_2|26|Slow Length|
|v_input_3_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_4|9|Signal Smoothing|
|v_input_5|false|Simple MA (Oscillator)|
|v_input_6|false|Simple MA (Signal Line)|
|v_input_7|14|Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-09 00:00:00
end: 2023-11-15 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © spiritualhealer117

//@version=4

strategy("Infiten Slope Strategy", overlay=false,calc_on_every_tick = true, default_qty_type=strategy.percent_of_equity, default_qty_value = 100)
// //TIME RESTRICT FOR BACKTESTING {
// inDateRange = (time >= timestamp(syminfo.timezone, 2003,
//          1, 1, 0, 0)) and
//      (time < timestamp(syminfo.timezone, 2021, 5, 25, 0, 0))
// //}

//OPTIMAL PARAMETERS {
daysback = 30
volumesens = 1.618
//}
//Calculating Exhaustion and Exhaustion Moving Average {
clh = close+low+high
exhaustion = (clh-sma(clh,daysback))/sma(clh,daysback)
exhaustionSma = sma(exhaustion,daysback)
//}
//Long Term Moving Averages for sell signals {
red = sma(close,300)
white = sma(close,150)
blue = sma(close,50)

plot(red,color=color.red)
plot(white,color=color.white)
plot(blue,color=color.blue)
//}
//MACD Calculation {
fast_length = input(title="Fast Length", type=input.integer, defval=12)
slow_length = input(title="Slow Length", type=input.integer, defval=26)
src = input(title="Source", type=input.source, defval=close)
signal_length = input(title="Signal Smoothing", type=input.integer, minval = 1, maxval = 50, defval = 9)
sma_source = input(title="Simple MA (Oscillator)", type=input.bool, defval=false)
sma_signal = input(title="Simple MA (Signal Line)", type=input.bool, defval=false)
// Calculating
fast_ma = sma_source ? sma(src, fast_length) : ema(src, fast_length)
slow_ma = sma_source ? sma(src, slow_length) : ema(src, slow_length)
macd = fast_ma - slow_ma
signal = sma_signal ? sma(macd, signal_length) : ema(macd, signal_length)
hist = macd - signal
//}
//SIGMOID Bottom {
timeAdjust = 300/sma(close,500)
//}
//RSI bottom {
len = input(14, minval=1, title="Length")
up = rma(max(change(src), 0), len)
down = rma(-min(change(close), 0), len)
rsi = down == 0 ? 100 : up == 0 ? 0 : 100 - (100 / (1 + up / down))
//}

//Entry and exit conditions {
//Sell conditions
bigVolume = sma(volume,30)*volumesens
sellcond1 = crossunder(exhaustion,exhaustionSma) and volume > bigVolume
sellcond2 = crossunder(macd,signal) and volume > bigVolume
midtermsellcond1 = crossunder(blue,white)
longtermsellcond1 = white < red

//Buy conditions
buycond = crossover(exhaustion,exhaustionSma) and not longtermsellcond1
buycond2 = rsi < 30
buycond3 = crossover(blue,white) and longtermsellcond1
//}

//Backtest Run Buy/Sell Commands {
strategy.entry("buycond",true, when=buycond and bigVolume)
strategy.entry("buycond2",true, when=buycond2 and bigVolume)

strategy.close_all(when=sellcond1,comment="short term sell signal 1")
strategy.close_all(when=midtermsellcond1, comment="mid term sell signal 1")
strategy.close_all(when=longtermsellcond1, comment="long term sell signal 1")
strategy.close_all(when=sellcond2, comment="short term sell signal 2")
plot(strategy.position_size)

//Sell on last tested day (only for data collection)
//strategy.close_all(when=not inDateRange)
//}


```

> Detail

https://www.fmz.com/strategy/432365

> Last Modified

2023-11-16 17:54:00
