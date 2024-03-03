
> Name

黄金交叉交易策略-Trend-Trading-Strategy-Based-on-Golden-Cross

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/12a8d705a363ab47375.png)
[trans]


## 概述

黄金交叉交易策略是一种中长线趋势跟踪策略。它通过计算股价的SR指标和SR信号指标,识别股价的趋势方向,并结合神经网络绘制趋势通道,实现趋势跟踪操作。当SR指标上穿SR信号时生成买入信号;当SR指标下穿SR信号时生成卖出信号。该策略还使用自适应线性回归滤波技术优化通道曲线,有效抑制错误信号。

## 策略原理

该策略的核心指标是SR指标和SR信号指标。SR指标是以8周期为参数的WMA均线和SMA均线的二次合成。SR信号指标是以20周期为参数计算的SR指标。SR指标和SR信号的金叉死叉交给判断趋势方向。

该策略使用神经网络算法自动绘制股票价位的上下限,形成自适应通道。上限是以SR指标的历史极大值作为输入,下限是以历史极小值作为输入,然后分别计算出回归曲线作为通道上下限。通道曲线经过自适应线性回归滤波后更加平滑。

当SR指标上穿SR信号时,产生买入信号;当SR指标下穿SR信号时,产生卖出信号。做多做空信号发出后,股票价格与通道上下限的关系决定止损止盈位置。

## 优势分析

- 使用双线性合成技术消除价格震荡的影响, Accurately判断趋势方向;
- 自适应通道算法优化入场出场时机,避免假性突破;
- 通道曲线应用自适应线性回归滤波技术,避免曲线被极值影响;
- 止损止盈位置随通道动态变化,自动跟踪趋势获利。

## 风险分析

该策略主要 based on 趋势跟踪,存在如下主要风险:

- 震荡趋势中产生大量错误信号和过多无效操作;
- 突发事件导致 fast 向下突破通道下限造成较大亏损;
- 参数设置不当容易 caused 策略失效。

为控制风险,建议组合其他策略,避免单一策略操作;同时优化参数设置,适应不同市场环境。

## 优化方向

该策略可以从以下几个方面进行优化:

1. 优化SR指标和信号指标的参数,提高交叉信号的稳定性;

2. 优化自适应通道的长度周期,平滑通道曲线;

3. 增加其他过滤指标,避免误操作。例如量能指标、波动率指标等;

4. 结合深度学习算法实时优化通道曲线,提高自适应性。

## 总结

黄金交叉交易策略是一种有效跟踪中长线趋势的量化策略。它正确判断趋势方向的概率大、操作风险小。随着算法模型优化空间巨大,该策略有望成为跟踪股票趋势变化的有力工具。

||

## Overview

The golden cross trading strategy is a medium-to-long-term trend tracking strategy. It identifies the trend direction of stock prices by calculating the SR indicator and SR signal indicator, and implements trend tracking operations by drawing a trend channel using neural network algorithms. When the SR indicator crosses over the SR signal, a buy signal is generated. When the SR indicator crosses below the SR signal, a sell signal is generated. This strategy also uses an adaptive linear regression filter technique to optimize the channel curve, which effectively suppresses false signals.

## Principles

The core indicators of this strategy are the SR indicator and the SR signal indicator. The SR indicator is a secondary synthesis of the WMA moving average and SMA moving average with a period of 8. The SR signal indicator is the SR indicator calculated with a period of 20. The golden crosses and deaths of the SR indicator and SR signal are used to determine the trend direction.

This strategy uses a neural network algorithm to automatically plot the upper and lower limits of the stock price to form an adaptive channel. The upper limit takes the historical maximum value of the SR indicator as input, the lower limit takes the historical minimum value as input, and the regression curves are calculated as the upper and lower limits of the channel respectively. The channel curve is smoother after adaptive linear regression filtering.  

When the SR indicator crosses over the SR signal, a buy signal is generated. When the SR indicator crosses below the SR signal, a sell signal is generated. After the long and short signals are issued, the relationship between the stock price and the upper and lower limits of the channel determines the stop loss and take profit positions.

## Advantages

- Use bilinear synthesis technology to eliminate the impact of price fluctuations and accurately determine the trend direction;
- Adaptive channel algorithms optimize entry and exit timing and avoid false breakouts; 
- Channel curves apply adaptive linear regression filtering technology to avoid distortion from extremes;
- Stop loss and take profit positions change dynamically with the channel, automatically tracking trends for profit.

## Risk Analysis  

The main risks of this trend tracking strategy are:

- Generates many false signals and excessive invalid operations in oscillating trends;
- Fast break below the lower limit of channel caused by sudden events results in huge losses; 
- Improper parameter settings can easily cause strategy failure.

To control risks, it is recommended to combine with other strategies instead of relying on a single strategy; at the same time optimize parameter settings to adapt to different market environments.

## Optimization Directions

This strategy can be optimized in the following aspects:

1. Optimize parameters of SR indicator and signal indicator to improve stability of crossover signals;  

2. Optimize cycle period of adaptive channel to smooth the channel curve;

3. Add other filter indicators to avoid misoperations, such as energy indicators, volatility indicators, etc;

4. Incorporate deep learning algorithms to optimize channel curves in real time and improve adaptivity.

## Summary  

The golden cross trading strategy is an effective quantitative strategy to track medium-to-long-term trends. It has a high probability of correctly determining the trend direction and low operating risks. With huge room for optimizing the algorithm model, this strategy has the potential to become a powerful tool to track changes in stock trends.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|true|═══════════════ From ═══════════════|
|v_input_2|true|Month|
|v_input_3|true|Day|
|v_input_4|2014|Year|
|v_input_5|true|════════════════ To ════════════════|
|v_input_6|31|Month|
|v_input_7|12|Day|
|v_input_8|9999|Year|
|v_input_9|14|? Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-15 00:00:00
end: 2023-11-22 00:00:00
period: 30m
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=4
//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

strategy(title = " Strategy PyramiCover",
         shorttitle = "S-PC",
         overlay = true,
         precision = 8,
         calc_on_order_fills = true,
         calc_on_every_tick = true,
         backtest_fill_limits_assumption = 0,
         default_qty_type = strategy.fixed,
         default_qty_value = 2,
         initial_capital = 10000,
         pyramiding=50,
         currency = currency.USD,
         linktoseries = true)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

backTestSectionFrom = input(title = "═══════════════ From ═══════════════", defval = true, type = input.bool)

FromMonth         = input(defval = 1, title = "Month", minval = 1)
FromDay           = input(defval = 1, title = "Day", minval = 1)
FromYear          = input(defval = 2014, title = "Year", minval = 2014)

backTestSectionTo = input(title = "════════════════ To ════════════════", defval = true, type = input.bool)
ToMonth           = input(defval = 31, title = "Month", minval = 1)
ToDay             = input(defval = 12, title = "Day", minval = 1)
ToYear            = input(defval = 9999, title = "Year", minval = 2014)

backTestPeriod() => (time > timestamp(FromYear, FromMonth, FromDay, 00, 00)) and (time < timestamp(ToYear, ToMonth, ToDay, 23, 59))

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

per = input(14,title="? Length")
//
up = 0.0
nup= 0.0
lowl = 0.0
nin = 0.0
//
srl=wma(close,8)
srr = sma(close,8)
sr = 2*srl - srr
//
srsl=wma(close,20)
srsr= sma(close,20)
srsignal = 2*srsl - srsr
//
if sr>srsignal
    up := highest(sr,round(150))
    nup :=highest(srsignal,round(20))
else
    up := highest(srsignal,round(150))
    nup := highest(sr,round(20))
//
if sr<srsignal
    lowl := lowest(sr,round(150))
    nin := lowest(srsignal,round(20))
else
    lowl := lowest(sr,round(150))
    nin := lowest(srsignal,round(20))
//reg alexgrover
f_reg(src,length)=>
    x = bar_index
    y = src
    x_ = sma(x, length)
    y_ = sma(y, length)
    mx = stdev(x, length)
    my = stdev(y, length)
    c = correlation(x, y, length)
    slope = c * (my / mx)
    inter = y_ - slope * x_
    reg = x * slope + inter
    reg
//
up_=f_reg(up,per)
lowl_=f_reg(lowl,per)
nup_=f_reg(nup,per)
nin_=f_reg(nin,per)
//
plot(sr, title='SR', color=color.green, linewidth=2, style=plot.style_line,transp=0)
plot(srsignal, title='SR-Signal', color=color.red, linewidth=2, style=plot.style_line,transp=0)
plot(up_, title='Upper limit', color=color.blue, linewidth=3, style=plot.style_line,transp=0)
plot(lowl_, title='Lower limit', color=color.blue, linewidth=3, style=plot.style_line,transp=0)
a=plot(nup_, title='Neuronal Upper', color=color.gray, linewidth=1, style=plot.style_line,transp=0)
b=plot(nin_, title='Neuronal Lower', color=color.gray, linewidth=1, style=plot.style_line,transp=0)
fill(a, b, color=color.gray)
plotshape(crossunder(sr,nup_)? sr+atr(20):na, title="Sell", text="?", location=location.absolute, style=shape.labeldown, size=size.tiny, color=color.red, textcolor=color.black,transp=0)
plotshape(crossover(sr,nin_)? sr-atr(20):na, title="Buy", text="?", location=location.absolute, style=shape.labelup, size=size.tiny, color=color.green, textcolor=color.black,transp=0)

//
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ //

if backTestPeriod()

    strategy.entry("Buy", true, 1, when = crossover(sr,nin_)) 
    strategy.entry("Short", false, 1, when = crossunder(sr,nup_))
```

> Detail

https://www.fmz.com/strategy/432995

> Last Modified

2023-11-23 14:07:11
