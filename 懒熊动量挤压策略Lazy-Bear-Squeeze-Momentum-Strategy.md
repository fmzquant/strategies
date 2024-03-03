
> Name

懒熊动量挤压策略Lazy-Bear-Squeeze-Momentum-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/16fec096f9955afdc5b.png)
[trans]
## 概述

懒熊动量挤压策略是一种结合布林带、Keltner通道和动量指标的量化交易策略。它利用布林带和Keltner通道判断当前市场是否处于挤压状态,然后结合动量指标进行交易信号的产生。

该策略的主要优势是可以自动识别趋势性行情的开始,并配合动量指标判断入场时机。但是也存在一定的风险,需要针对不同品种进行参数优化。

## 策略原理

懒熊动量挤压策略基于以下三个指标进行判定:

1. 布林带(Bollinger Bands):包含中轨、上轨和下轨
2. Keltner通道(Keltner Channels):包含中轨、上轨和下轨  
3. 动量指标(Momentum Indicator):当前价格与n天前价格的差值

当布林带上轨低于Keltner通道上轨,且布林带下轨高于Keltner通道下轨时,我们认为市场处于挤压状态。这通常意味着当前趋势性行情即将开始。

为了确定入场时机,我们利用动量指标判断价格变化的速度。当动量向上突破其平均值时生成买入信号;当动量向下跌破其平均值时生成卖出信号。

## 策略优势分析

懒熊动量挤压策略的主要优势有:

1. 可以自动识别趋势开始的时机,及早入场
2. 结合多种指标进行判断,避免假信号
3. 兼顾趋势和反转两种交易方式
4. 可自定义参数,针对不同品种进行优化

## 风险分析

懒熊动量挤压策略也存在一定的风险:

1. 布林带和Keltner通道发出假信号的概率较大
2. 动量指标表现不稳定,可能错过最佳入场点
3. 需要对参数进行优化,否则效果不佳
4. 效果与交易品种相关性较大

为了降低风险,建议优化布林带和Keltner通道的长度参数,调整止损点位,选择流动性较好的交易品种,同时结合其他指标进行验证。

## 策略优化方向 

为进一步增强懒熊动量挤压策略的效果,主要的优化方向有:

1. 测试不同品种和周期的参数组合
2. 优化布林带和Keltner通道的长度
3. 优化动量指标的长度
4. 针对多头和空头制定不同的止损止盈策略
5. 增加其他指标进行信号验证

通过多方位测试与优化,可以大幅提升该策略的胜率和盈利能力。

## 总结

懒熊动量挤压策略整合多种指标判断力强,可以有效识别趋势开始的时机。但也存在一定的风险,需要针对不同交易品种进行参数优化。通过不断测试与优化,该策略可以成为高效的算法交易系统。

||

## Overview

The Lazy Bear Squeeze Momentum strategy is a quantitative trading strategy that combines Bollinger Bands, Keltner Channels and a momentum indicator. It utilizes Bollinger Bands and Keltner Channels to determine if the market is currently in a squeeze, then uses a momentum indicator to generate trading signals. 

The main advantage of this strategy is being able to automatically identify the start of trending moves and determine entry timing with the momentum indicator. However, there are also certain risks that need to be addressed through optimization across different products.

## Strategy Logic

The Lazy Bear Squeeze Momentum strategy makes judgements based on the following three indicators:

1. Bollinger Bands: Includes middle band, upper band and lower band
2. Keltner Channels: Includes middle line, upper line and lower line
3. Momentum Indicator: Current price minus price n days ago

When the Bollinger upper band is below the Keltner upper line and the Bollinger lower band is above the Keltner lower line, we determine the market is in a squeeze. This usually implies a trending move is about to start. 

To pinpoint entry timing, we use the momentum indicator to gauge the speed of price changes. A buy signal is generated when momentum crosses above its moving average, and a sell signal when momentum crosses below its moving average.

## Advantage Analysis  

The main advantages of the Lazy Bear Squeeze Momentum strategy:

1. Automatically identify early entries into new trends  
2. Combination of indicators prevents false signals
3. Captures both trend and mean-reversion
4. Customizable parameters for optimization  
5. Robust across different products

## Risk Analysis

There are also certain risks to the Lazy Bear Squeeze Momentum strategy:

1. Probability of false signals from Bollinger & Keltner
2. Momentum instability, missing best entries  
3. Poor performance without optimization
4. High correlation to product selection

To mitigate risks, recommendations include: optimizing lengths for Bollinger & Keltner, adjusting stop loss, selecting liquid products, verifying signals with other indicators.

## Optimization Directions

The main directions to further enhance performance:

1. Test combinations of parameters across products and timeframes
2. Optimize lengths for Bollinger Bands and Keltner Channels
3. Optimize length of momentum indicator
4. Different stop loss/take profit for longs and shorts
5. Additional indicators for signal verification

Through rigorous testing and optimization, the strategy's edge and profitability can be greatly improved.

## Conclusion

The Lazy Bear Squeeze Momentum strategy has strong signal generation through a multi-indicator approach, and can effectively identify new trend starts. But it also carries risks that necessitate optimization across trading instruments. With continual testing and enhancement, it can become a robust algorithmic trading system.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|Strategy Logic: Cross above 0|LazyBear|
|v_input_1|false|(?Backtesting Date Range)Custom Backtesting Date Range|
|v_input_2|timestamp(01 Jan 2022 00:01 +0000)|Backtesting Start Time|
|v_input_3|timestamp(31 Dec 2022 23:59 +0000)|Backtesting End Time|
|v_input_bool_1|true|(?SL/TP For Long Strategy)Enable Long Strategy|
|v_input_float_1|5|Stoploss %|
|v_input_float_2|5|Take Profit %|
|v_input_bool_2|true|(?SL/TP For Short Strategy)Enable Short Strategy|
|v_input_float_3|5|Stoploss %|
|v_input_float_4|5|Take Profit %|
|v_input_4|20|(?Squeeze Momentum Settings)BB Length|
|v_input_5|2|BB MultFactor|
|v_input_6|20|KC Length|
|v_input_7|1.5|KC MultFactor|
|v_input_8|true|Use TrueRange (KC)|
|v_input_9|5|Signal Length|
|v_input_10|true|Show Buy/Sell SQM Labels|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-31 00:00:00
end: 2024-02-01 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mtahreemalam original strategy by LazyBear

strategy(title = 'SQM Strategy, TP & SL',
         shorttitle = 'Squeeze.M Strat',
         overlay = true,
         pyramiding = 0,
         default_qty_type = strategy.percent_of_equity,
         default_qty_value = 100,
         initial_capital = 1000,
         commission_type=strategy.commission.percent, 
         commission_value=0.0,
         process_orders_on_close=true,
         use_bar_magnifier=true)
//Strategy logic
strategy_logic = input.string("Cross above 0", "Strategy Logic", options = ["LazyBear", "Cross above 0"])

// Date Range
testPeriodSwitch = input(false, "Custom Backtesting Date Range",group="Backtesting Date Range")
i_startTime = input(defval = timestamp("01 Jan 2022 00:01 +0000"), title = "Backtesting Start Time",group="Backtesting Date Range")
i_endTime = input(defval = timestamp("31 Dec 2022 23:59 +0000"), title = "Backtesting End Time",group="Backtesting Date Range")
timeCond = true
isPeriod = testPeriodSwitch == true ? timeCond : true

//// Stoploss and Take Profit Parameters
// Enable Long Strategy
enable_long_strategy = input.bool(true, title='Enable Long Strategy', group='SL/TP For Long Strategy', inline='1')
long_stoploss_value = input.float(defval=5, title='Stoploss %', minval=0.1, group='SL/TP For Long Strategy', inline='2')
long_stoploss_percentage = close * (long_stoploss_value / 100) / syminfo.mintick
long_takeprofit_value = input.float(defval=5, title='Take Profit %', minval=0.1, group='SL/TP For Long Strategy', inline='2')
long_takeprofit_percentage = close * (long_takeprofit_value / 100) / syminfo.mintick

// Enable Short Strategy
enable_short_strategy = input.bool(true, title='Enable Short Strategy', group='SL/TP For Short Strategy', inline='3')
short_stoploss_value = input.float(defval=5, title='Stoploss %', minval=0.1, group='SL/TP For Short Strategy', inline='4')
short_stoploss_percentage = close * (short_stoploss_value / 100) / syminfo.mintick
short_takeprofit_value = input.float(defval=5, title='Take Profit %', minval=0.1, group='SL/TP For Short Strategy', inline='4')
short_takeprofit_percentage = close * (short_takeprofit_value / 100) / syminfo.mintick

//// Inputs
//SQUEEZE MOMENTUM STRATEGY
length = input(20, title='BB Length', group = "Squeeze Momentum Settings")
mult = input(2.0, title='BB MultFactor', group = "Squeeze Momentum Settings")
source = close
lengthKC = input(20, title='KC Length', group = "Squeeze Momentum Settings")
multKC = input(1.5, title='KC MultFactor', group = "Squeeze Momentum Settings")
useTrueRange = input(true, title='Use TrueRange (KC)', group = "Squeeze Momentum Settings")
signalPeriod=input(5, title="Signal Length", group = "Squeeze Momentum Settings")
show_labels_sqm = input(title='Show Buy/Sell SQM Labels', defval=true, group = "Squeeze Momentum Settings")
h0 = hline(0)

// Defining MA
ma = ta.sma(source, length)

// Calculate BB
basis = ma
dev = mult * ta.stdev(source, length)
upperBB = basis + dev
lowerBB = basis - dev

// Calculate KC
range_1 = useTrueRange ? ta.tr : high - low
rangema = ta.sma(range_1, lengthKC)
upperKC = ma + rangema * multKC
lowerKC = ma - rangema * multKC


// SqzON | SqzOFF | noSqz
sqzOn = lowerBB > lowerKC and upperBB < upperKC
sqzOff = lowerBB < lowerKC and upperBB > upperKC
noSqz = sqzOn == false and sqzOff == false

// Momentum
val = ta.linreg(source - math.avg(math.avg(ta.highest(high, lengthKC), ta.lowest(low, lengthKC)), ta.sma(close, lengthKC)), lengthKC, 0)

red_line = ta.sma(val,signalPeriod)
blue_line = val

// lqm = if val > 0
//         if val > nz(val[1])
        // long_sqm_custom
        // if val < nz(val[1])
        // short_sqm_custom
// Plots
//plot(val, style = plot.style_line, title = "blue line", color= color.blue, linewidth=2)
//plot(ta.sma(val,SignalPeriod), style = plot.style_line, title = "red line",color = color.red, linewidth=2)

//plot(val, color=blue, linewidth=2)
//plot(0, color=color.gray, style=plot.style_cross, linewidth=2)
//plot(red_line, color=red, linewidth=2)

//LOGIC
//momentum filter
//filterMom = useMomAverage ? math.abs(val) > MomentumMin / 100000 ? true : false : true
//}

////SQM Long Short Conditions
//Lazy Bear Buy Sell Condition
// long_sqm_lazy = (blue_line>red_line)
// short_sqm_lazy = (blue_line<red_line)

long_sqm_lazy = ta.crossover(blue_line,red_line)
short_sqm_lazy = ta.crossunder(blue_line,red_line)


//Custom Buy Sell Condition
dir_sqm = val < 0 ? -1 : 1
long_sqm_custom = dir_sqm == 1 //and dir_sqm[1] == -1
short_sqm_custom = dir_sqm == -1 //and dir_sqm[1] == 1

long_sqm = strategy_logic == "LazyBear" ? long_sqm_lazy : long_sqm_custom 
short_sqm = strategy_logic == "LazyBear" ? short_sqm_lazy : short_sqm_custom 


// Plot Stoploss & Take Profit Levels
long_stoploss_price = strategy.position_avg_price * (1 - long_stoploss_value / 100)
long_takeprofit_price = strategy.position_avg_price * (1 + long_takeprofit_value / 100)
short_stoploss_price = strategy.position_avg_price * (1 + short_stoploss_value / 100)
short_takeprofit_price = strategy.position_avg_price * (1 - short_takeprofit_value / 100)
plot(enable_long_strategy and not enable_short_strategy ? long_stoploss_percentage : na, color=color.red, style=plot.style_linebr, linewidth=2, title='Long SL Level')
plot(enable_long_strategy and not enable_short_strategy ? long_takeprofit_percentage : na, color=color.green, style=plot.style_linebr, linewidth=2, title='Long TP Level')
plot(enable_short_strategy and not enable_long_strategy ? short_stoploss_price : na, color=color.red, style=plot.style_linebr, linewidth=2, title='Short SL Level')
plot(enable_short_strategy and not enable_long_strategy ? short_takeprofit_price : na, color=color.green, style=plot.style_linebr, linewidth=2, title='Short TP Level')


// Long Strategy
if long_sqm and enable_long_strategy == true
    strategy.entry('Long', strategy.long)
    strategy.exit('Long  SL/TP', from_entry='Long', loss=long_stoploss_percentage, profit=long_takeprofit_percentage)
    strategy.close('Long', comment = "L. CL")

// Short Strategy
if short_sqm and enable_short_strategy == true 
    strategy.entry('Short', strategy.short)
    strategy.exit('Short SL/TP', from_entry='Short', loss=short_stoploss_percentage, profit=short_takeprofit_percentage)
    strategy.close('Short', comment = "S.Cl")

plot_sqm_long = long_sqm and not long_sqm[1]
plot_sqm_short = short_sqm and not short_sqm[1]

plotshape(plot_sqm_long and show_labels_sqm, title='Buy', style=shape.labelup, location=location.belowbar, size=size.normal, text='Buy', textcolor=color.new(color.white, 0), color=color.new(color.green, 0))
plotshape(plot_sqm_short and show_labels_sqm, title='Sell', style=shape.labeldown, location=location.abovebar, size=size.normal, text='Sell', textcolor=color.new(color.white, 0), color=color.new(color.red, 0))

// Date Range EXIT
if (not isPeriod) 
    strategy.cancel_all()
    strategy.close_all()

```

> Detail

https://www.fmz.com/strategy/440869

> Last Modified

2024-02-02 17:42:58
