
> Name

双均线金叉死叉算法交易策略Dual-Moving-Average-Crossover-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/1d1e7f29743af21ecc2.png)
[trans]
## 概述

双均线金叉死叉算法交易策略(Dual Moving Average Crossover Strategy)是一个利用均线金叉和死叉来判断入场和退出的量化交易策略。该策略同时结合不同周期的均线,形成多层过滤,可以有效降低假信号,提高交易信号的可靠性。

## 策略原理  

该策略的核心逻辑是跟踪3个时间周期(180分钟,60分钟,120分钟)的2条移动平均线(10日线和200日线)。当快线从下方向上穿过慢线时,产生金叉信号,代表品种进入多头行情;当快线从上方向下穿过慢线时,产生死叉信号,代表品种进入空头行情。

策略首先在180分钟和60分钟周期分别计算10日线和200日线。当180分钟的10日线从下方向上穿过200日线时,产生金叉信号;当从上方向下穿过时,产生死叉信号。这相当于快速周期的交易信号。

然后,策略引入120分钟周期的200日线作为控制线。只有当金叉或死叉发生时,通过判断60分钟周期的200日线是否高于或低于120分钟周期的200日线,来决定是否启动交易,以滤除部分假信号。 

举例来说,当180分钟产生金叉时,如果60分钟的200日线高于120分钟的200日线,则看多;只有在这个条件下,才会开多单。相反,如果60分钟的200日线低于120分钟的200日线,则不看多,也不会开仓。

总之,该策略通过比较不同时间周期均线的关系,形成多层过滤,从而提高信号的可靠性,属于常见的过滤型交易策略。

## 策略优势

- 多周期确认,提高信号准确率。相比单一周期判断,该策略采用180分钟、60分钟和120分钟三个周期的均线关系进行確認,可以大大减少假信号,提高交易信号质量。

- 操作频率适中。相比高频交易策略,该策略的交易频率较低,无需频繁操作,更加适合手动跟单。

- 实现简单,容易理解。该策略仅采用均线指标,没有复杂逻辑,非常容易理解实现,门槛低,适合初学者练手。

- 可根据不同周期和参数进行优化。该策略中的均线周期和类型都可以进行调整,可以研究出适合不同品种和市场环境的参数组合。

## 策略风险

- 均线系统滞后,无法及时捕捉快速反转。该策略主要依赖均线关系,对价格变化的响应有一定滞后性,容易错过快速的反转行情。

- 大幅震荡市场中容易止损。当市场出现大幅震荡时,均线关系可能频繁交叉,导致频繁开仓和止损。这会增加交易成本和亏损风险。

- 过于依赖参数优化,容易过拟合。该策略主要通过参数优化获得Alpha,这种依赖单一数据集的结果可能导致过度优化和过拟合问题。

对应风险的解决方案如下:

- 适当缩短均线参数,加快反应速度。

- 增加过滤条件,避免在震荡市场高频开仓。

- 测试不同品种和时间段的数据,评估参数稳健性。

## 策略优化方向  

该策略仍然有进一步优化的空间:

- 尝试 unterschiedlich 周期组合和均线参数,寻找更优参数。可以通过穷举优化和机器学习方法寻找更佳的参数组合。

- 增加 Volume 和大级别趋势指标的确认。这可以进一步过滤假信号,例如在Volume放量不足时不开仓。

- 结合深度学习模型预测曲线形态。利用RNN等深度学习模型对未来价格进行预测,辅助决策。

- 采用自适应均线,改进过滤逻辑。当市场进入震荡状态时,动态调整均线长度,降低开仓频率。

## 总结

双均线金叉死叉算法交易策略通过比较不同时间周期的均线关系,建立多层过滤,可以有效提高交易信号质量,是一种较为常见的过滤型算法交易策略。该策略容易实现,适合初学者学习,也可以进行多维度扩展与优化,值得深入研究与应用。

||

## Overview

The Dual Moving Average Crossover Trading Strategy is a quantitative trading strategy that uses moving average crossovers to determine entry and exit signals. This strategy combines moving averages from different timeframes to create multiple layers of filtering and reduce false signals for more reliable trade signals.

## Strategy Logic

The core logic of this strategy is to track 2 moving averages (10-day and 200-day) across 3 timeframes (180 mins, 60 mins, 120 mins). When the faster moving average crosses above the slower moving average, a golden crossover is generated, indicating the instrument is in an uptrend. When the faster moving average crosses below the slower one, a death crossover is generated, indicating a downtrend.

First, the 10-day and 200-day moving averages are calculated separately for the 180 min and 60 min timeframes. When the 10-day MA on the 180 min timeframe crosses above the 200-day MA, a golden crossover signal is generated. When it crosses below, a death crossover signal is generated. This provides the fast-cycle trading signals. 

Next, the strategy introduces the 200-day MA on the 120 min timeframe as a "controlling" moving average. Only when crossovers happen on the 180/60-min cycles, by checking if the 60-min 200-day MA is above or below the 120-min 200-day MA, will decide if trades should be placed to filter out false signals.

For example, when a golden crossover happens on the 180-min cycle, only if the 60-min 200-day MA is above the 120-min 200-day MA, the strategy will go long. The long position will only be opened when this condition is met. Conversely, if the 60-min 200-day MA is below the 120-min one, no long position will be taken.

In summary, by comparing moving average relationships across different timeframes, this strategy creates multiple layers of filtering to improve signal reliability, making it a common type of filter-based trading strategy.

## Advantages

- Improved accuracy via multi-timeframe confirmation. Compared to single-timeframe signals, using MAs from 180/60/120 mins drastically reduces false signals and improves trade signal quality.

- Reasonable operation frequency. Unlike high-frequency strategies, this strategy trades less frequently, avoiding the need to monitor the market continuously. More suitable for manual trading.

- Simple and easy to understand. By only using basic moving averages without complex logic, this strategy has a low barrier to entry and is easy to understand for beginners.

- Optimizable across periods and parameters. The MA types and periods used are adjustable. Different parameter sets can be tested for different products and market regimes. 

## Risks  

- Lagging indication and slow reaction. The core moving averages have lag by design and often fail to capture quick trend reversals. 

- High whipsaw frequency in ranging markets. When the market is ranging, the MA relationships may cross over very frequently, causing excessive entries and stop loss triggers, heightening costs and loss risks.

- Overfitting danger from parameter optimization. The alpha mainly comes from parameter tuning based on limited datasets. This likely leads to over-optimization and overfitting problems.

Solutions:

- Shorten MA periods for faster reaction 
- Add filters to avoid excessive entries during market choppiness
- Test robustness across different products and time ranges 

## Optimization Directions

There is still room for further optimizations:

- Try different combinations of timeframes and tune MA periods to find better parameters, through brute force optimization and machine learning techniques.

- Incorporate volume and higher timeframe trend analysis for additional signal confirmation, e.g. avoid entries during low trading volumes. 

- Predict curve patterns ahead of time using deep learning models like RNNs to assist decision-making. 

- Introduce adaptive moving averages to improve filtering logic. Dynamically adjust MA periods to reduce entries during market uncertainty.  

## Conclusion

The Dual Moving Average Crossover Trading Strategy compares moving average relationships across multiple timeframes to filter out false signals, improving signal reliability. This type of filter-based algorithm strategy is common and easy to implement for beginners, while also allowing for extensive optimizations across multiple dimensions, making it worth researching and applying.

[/trans]



> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-01 00:00:00
end: 2024-01-28 00:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(shorttitle = "ALGO 3-1-2", title="ALGO 3h, 1h, 2h", overlay=true)

bool startLONGBOTandDEAL = false
bool stopLONGBOTandDEAL = false
bool openLONG = false
bool closeLONG = false
bool startSHORTBOTandDEAL = false
bool stopSHORTBOTandDEAL = false
bool openSHORT = false
bool closeSHORT = false

MA1Period = ema(close, 10)
MA2Period = ema(close, 200)
MA3Period = ema(close, 200)

MA1 = security(syminfo.tickerid, "180", MA1Period)
MA2 = security(syminfo.tickerid, "60", MA2Period)
MA3 = security(syminfo.tickerid, "120", MA3Period)

MA12Crossover = crossover(MA1, MA2)
MA12Crossunder = crossunder(MA1, MA2)
MA23Crossover = crossover(MA2, MA3)
MA23Crossunder = crossunder(MA2, MA3)

if MA23Crossover
    startLONGBOTandDEAL := true //stop shortBOT and DEAL code in the TV alert as well, probably stop first w/ a delay on startlong
    lblBull = label.new(bar_index, na, ' BULL Time Open LONG', color=color.blue, textcolor=color.black, style=label.style_label_up, size=size.small)
    label.set_y(lblBull, MA2)  
    strategy.close("go Short")
    strategy.entry("go Long", strategy.long, comment="go Long")
if MA23Crossunder
    //not sure if i should set alert for stop and start each bot, or just put start appropriate bot and stop its opposite in the same alert.
    startSHORTBOTandDEAL := true
    lblBull = label.new(bar_index, na, ' BEAR Time - Open SHORT', color=color.orange, textcolor=color.black, style=label.style_label_down, size=size.small)
    label.set_y(lblBull, MA2)
    strategy.close("go Long")
    strategy.entry("go Short", strategy.short, comment="go Short")
if MA12Crossover
    if MA2 >= MA3
        openLONG := true
        lup1 = label.new(bar_index, na, ' OPEN LONG ', color=color.green, textcolor=color.white, style=label.style_label_up, size=size.small, yloc=yloc.belowbar)
        strategy.entry("go Long", strategy.long, comment="go Long")
    if MA2 <= MA3
        closeSHORT := true
        lup1 = label.new(bar_index, na, ' CLOSE SHORT ', color=color.gray, textcolor=color.black, style=label.style_label_up, size=size.small, yloc=yloc.belowbar)
        strategy.close("go Short")
    
if MA12Crossunder
    if MA2 >= MA3
        closeLONG := true
        lun1 = label.new(bar_index, na, ' CLOSE LONG ', color=color.red, textcolor=color.white, style=label.style_label_down, size=size.small, yloc=yloc.abovebar)
        strategy.close("go Long")
    if MA2 <= MA3
        openSHORT := true
        lun1 = label.new(bar_index, na, ' OPEN SHORT ', color=color.red, textcolor=color.white, style=label.style_label_down, size=size.small, yloc=yloc.abovebar)
        strategy.entry("go Short", strategy.short, comment="go Short")


plot(MA1, color=color.green, linewidth=2, title="MA1")
plot(MA2, color=color.yellow, linewidth=3, title="MA2")
plot(MA3, color=color.red, linewidth=4, title="MA3")


alertcondition(startLONGBOTandDEAL, title="Start LONG BOT and DEAL", message="Start Long Bot and Deal")
alertcondition(stopLONGBOTandDEAL, title="Stop LONG BOT and DEAL", message="Stop Long Bot and Deal")
alertcondition(openLONG, title="Open LONG DEAL", message="Open Long Deal")
alertcondition(closeLONG, title="Close LONG DEAL", message="Close Long Deal")
alertcondition(stopSHORTBOTandDEAL, title="Stop SHORT BOT and DEAL", message="Stop Short Bot and Deal")
alertcondition(openSHORT, title="Open SHORT DEAL", message="Open Short Deal")
alertcondition(closeSHORT, title="Close SHORT DEAL", message="Close Short Deal")
```

> Detail

https://www.fmz.com/strategy/440345

> Last Modified

2024-01-29 15:11:58
