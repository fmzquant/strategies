
> Name

渦涡震荡器趋势追踪策略The-Vortex-Oscillator-Trend-Following-Strategy

> Author

ChaoZhang

> Strategy Description

  ![IMG](https://www.fmz.com/upload/asset/cb2f0d5b057f404074.png)

[trans]

## 概述

渦涡震荡器趋势追踪策略是一种基于渦涡指标的趋势追踪策略。它利用多个不同周期的移动平均线构建渦涡指标,识别价格的潜在趋势,并结合更短周期的移动平均线作为辅助判断,实现低风险的趋势追踪操作。

## 策略原理

该策略的核心指标是渦涡指标。渦涡指标由多个不同周期的短期、中期和长期移动平均线构成。具体来说,策略使用了6日、27日、72日和234日四个周期的移动平均线。短期移动平均线反映了价格的最新趋势,长期移动平均线反映了价格的长期趋势。指标的核心逻辑是,当短期移动平均线上穿长期移动平均线时,表明价格上涨势头增强,该买入;当短期移动平均线下穿长期移动平均线时,表明价格上涨势头减弱,应卖出。

渦涡指标显著优点是趋势判断准确,能够有效过滤市场噪音。但其反应不够灵敏,无法及时捕捉转折点。因此,策略加入了更为敏感的6日移动平均线,构建辅助判断指标。当渦涡指标和辅助指标同向上穿零轴时买入,同向下穿零轴时卖出。这就形成渦涡指标判断趋势方向和强度,辅助指标判断买卖点的多重确认逻辑,过滤假信号的同时提高操作的灵敏度。

## 优势分析

该策略最大的优势在于判断准确、操作灵敏。渦涡指标和辅助指标的结合,实现了趋势判断和具体买卖点确定的有机统一,又各司其职避免相互干扰。多重确认机制可有效过滤市场噪音,避免错误操作。同时辅助指标的加入也保证了策略的操作灵敏度。

相比单一指标策略,该策略综合运用多个指标的优势,对市场变化的识别和应对能力更强。在大趋势不变的情况下,策略可实现稳定盈利;当大趋势发生转变时,策略也能够快速响应,降低损失。

## 风险分析

该策略主要风险在于指标参数设置不当和突发事件的影响。移动平均线参数设置需要权衡灵敏度和抗噪声干扰能力,如果参数设定不当,会导致策略行为反常。此外,重大突发事件也可能导致价格出现剧烈波动,使指标失效,从而产生错误交易。

为降低这些风险,建议优化参数组合并进行回测,使指标表现更为稳定。另外也需要关注重大事件带来的市场影响,必要时暂停策略,避免异常波动期的错误操作。当价格趋势性下降时,逐步减少仓位也是一个有效的保本手段。

## 优化方向 

该策略可从以下几个方面进行优化:

1. 优化移动平均线参数,提高指标的抗干扰能力和操作灵敏度。可以尝试不同长度参数的组合,选择平稳且敏感的指标。

2. 增加止损机制。当价格向不利方向突破关键支持位时,设置止损点,避免进一步损失。

3. 结合其他指标判断,增加策略稳定性。例如加入成交量指标,只有在成交量放大的情况下才产生交易信号。

4. 根据不同市场阶段使用不同参数组合。譬如牛市时采用更为积极的参数,熊市时则使用更稳定的设置。

## 总结

渦涡震荡器趋势追踪策略通过运用渦涡指标判断价格趋势方向和强度,并辅以更敏感的短期移动平均线确定具体买卖时机。该策略成功结合了趋势判断和交易执行两个层面,既保证了操作的稳定性,也提高了策略的灵活性。通过参数优化、止损设置以及状态机制的引入,有望进一步增强策略抗风险能力,获得更优秀的回测指标和实盘表现。

|| 

## Overview  

The Vortex Oscillator trend following strategy is a trend tracking strategy based on the Vortex Indicator. It uses moving averages of multiple timeframes to construct the Vortex Indicator to identify potential price trends, and combines with a shorter-period moving average as an auxiliary judgment to achieve low-risk trend tracking operations.

## Strategy Principle  

The core indicator of this strategy is the Vortex Indicator. The Vortex Indicator consists of short-term, medium-term and long-term moving averages of multiple timeframes. Specifically, the strategy uses moving averages of 6 days, 27 days, 72 days and 234 days. The short-term moving average reflects the latest trend of prices, while the long-term moving average reflects the long-term trend. The core logic of the indicator is that when the short-term moving average crosses above the long-term moving average, it indicates that the upside momentum is strengthening and it’s time to buy. When the short-term moving average crosses below the long-term moving average, it indicates that the upside momentum is weakening and we should sell.
  
The significant advantage of the Vortex Indicator is that it accurately judges trends and effectively filters out market noise. However, its reaction is not sensitive enough to capture turning points in a timely manner. Therefore, the strategy incorporates a more sensitive 6-day moving average to construct an auxiliary judgment indicator. Buy when both the Vortex Indicator and the auxiliary indicator cross above the zero line, and sell when both indicators cross below the zero line. This forms a multi-confirmation logic where the Vortex Indicator determines the trend direction and strength while the auxiliary indicator determines specific entry and exit points, which filters out false signals while improving the sensitivity of operations.

## Advantage Analysis   

The biggest advantage of this strategy is the accuracy of judgment and sensitivity of operations. The combination of the Vortex Indicator and auxiliary indicators achieves an organic unity of trend judgment and determination of specific entry/exit points while avoiding interference with each other. The multi-confirmation mechanism can effectively filter out market noise and avoid wrong trades. At the same time, the addition of the auxiliary indicator also ensures the sensitivity of the strategy's operations.

Compared with single indicator strategies, the advantage of this strategy is that it combines multiple indicators to achieve stronger capabilities in identifying and responding to market changes. Under an unchanged major trend, the strategy can achieve steady profits. When major trends change, the strategy can also respond quickly to reduce losses.  

## Risk Analysis

The main risks of this strategy come from improper parameter settings of indicators and the impact of extreme events. The parameters of moving averages need to balance sensitivity and noise interference resistance. Improper parameter settings will lead to abnormal strategy behavior. In addition, major events could also cause extreme price volatility that disables indicators, resulting in wrong trades.  

To mitigate these risks, parameters should be optimized and backtested to stabilize indicator performance. Also, pay close attention to market impacts from major events, pause strategies when necessary to avoid mistakes during abnormal volatility periods. As prices trend down, gradually reducing positions is also an effective capital preservation measure.  

## Optimization Directions

The strategy can be optimized in the following aspects:

1. Optimize moving average parameters to improve indicator’s noise resistance and operation sensitivity. Try different parameter combinations for lengths to select smooth yet sensitive indicators.  

2. Add stop loss mechanisms. Set stop loss points when prices break key support levels in unfavorable directions to avoid further losses.
  
3. Incorporate other indicator judgments to increase strategy stability, e.g. only taking signals when trading volumes amplify.

4. Use different parameter sets based on different market stages. For example, more aggressive parameters during bull markets, and more stable settings in bear markets.   

## Conclusion

The Vortex Oscillator Trend Following Strategy successfully combines trend judgment and execution through the Vortex Indicator determining price trend direction/strength and a sensitive short-term moving average pinpointing specific entry/exit timing. By optimizing parameters, adding stop losses, and introducing state mechanisms, the strategy has the potential to further enhance its risk resistance capabilities and achieve superior backtesting metrics and live performance.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|2017|Backtest Start Year|
|v_input_2|true|Backtest Start Month|
|v_input_3|2|Backtest Start Day|
|v_input_4|2048|Backtest Stop Year|
|v_input_5|7|Backtest Stop Month|
|v_input_6|30|Backtest Stop Day|
|v_input_7|true|Color Background?|
|v_input_8|6|short_input|
|v_input_9|27|long_input|
|v_input_10|72|longer_input|
|v_input_11|234|longest_input|
|v_input_12|3|hist_fractal|
|v_input_13|2|longhist_fractal|
|v_input_14|4|longesthist_fractal|
|v_input_15|6|Micro EMA Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-11-30 00:00:00
end: 2023-12-06 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
//swap strategy line for study line to enable backtesting
strategy(title="Vortex Ocillator" )
//study(title = "Vortex Oscillator", precision = 6)

// Component Code Start
// Example usage:
// if testPeriod()
//   strategy.entry("LE", strategy.long)
testStartYear = input(2017, "Backtest Start Year")
testStartMonth = input(01, "Backtest Start Month")
testStartDay = input(2, "Backtest Start Day")
testPeriodStart = timestamp(testStartYear,testStartMonth,testStartDay,0,0)

testStopYear = input(2048, "Backtest Stop Year")
testStopMonth = input(7, "Backtest Stop Month")
testStopDay = input(30, "Backtest Stop Day")
testPeriodStop = timestamp(testStopYear,testStopMonth,testStopDay,0,0)

// A switch to control background coloring of the test period
testPeriodBackground = input(title="Color Background?", type=bool, defval=true)
testPeriodBackgroundColor = testPeriodBackground and (time >= testPeriodStart) and (time <= testPeriodStop) ? #00FF00 : na
bgcolor(testPeriodBackgroundColor, transp=97)

testPeriod() => true
// Component Code Stop

//vortex histogram
short_input = input(6, minval = 1)
long_input = input(27, minval = 1)
longer_input = input(72, minval = 1)
longest_input = input(234, minval = 1)

short = sma(close, short_input)
long = sma(close, long_input)
longer = sma(close, longer_input)
longest = sma(close, longest_input)

hist = short - long
longhist = short - longer
longesthist = short - longest

hist_fractal = input(3, minval = 0)
longhist_fractal = input(2, minval = 0)
longesthist_fractal = input(4, minval = 0)

vortexhist = avg((hist / hist_fractal), (longhist / longhist_fractal), (longesthist / longesthist_fractal))

crossover_calc = vortexhist > 0 and vortexhist[1] < 0
crossunder_calc = vortexhist < 0 and vortexhist[1] > 0

crossover2 = crossover(vortexhist, 0)
crossunder2 = crossunder(vortexhist, 0)

hist_color = hist > 0? fuchsia : purple
longhist_color = longhist > 0? olive : orange
longesthist_color = longesthist > 0? teal : blue
vortexhist_color = vortexhist >= 0? green : red

plot(longesthist, "Longest Ocillator", style = histogram, color = longesthist_color, transp = 5)
plot(longhist, "Longer Ocillator", style = histogram, color = longhist_color, transp = 30)
plot(hist, "Short Ocillator", style = histogram, color = hist_color, transp = 30)
plot(vortexhist, "Vortex Ocillator", style = columns, color = vortexhist_color, transp = 40)
plotshape(crossover_calc,title = "Crossover",location = location.bottom, style = shape.triangleup, size = size.small, color = green)
plotshape(crossunder_calc,title = "Crossunder",location = location.bottom, style = shape.triangledown, size = size.small, color = red)

//micro
micro_ema_length = input(6,"Micro EMA Length")
micro = ema(vortexhist, micro_ema_length)
plot(micro, title = "micro", linewidth = 1, color = white)
microup = crossover(vortexhist, micro)
microdown = crossunder(vortexhist, micro)

//new micro signals
xmicroup = microup and vortexhist >=0 or crossover_calc
xmicrodown = microdown and vortexhist >=0 or crossunder_calc
plotshape(xmicroup, title = "Micro up", style = shape.circle, color = olive, location = location.bottom, size = size.tiny)
plotshape(xmicrodown, title = "Micro down", style = shape.circle, color = fuchsia, location = location.bottom, size = size.tiny)

//optional strategy options for backtesting, comment out the alertcondition rows and swap the top study row for the strategy row to compile as strategy
if testPeriod()
    strategy.entry("buy", true, 1, when = xmicroup, limit = low)
if testPeriod()
    strategy.close("buy", when = xmicrodown)

   

//if (xmicroup)
    //strategy.entry("My Long Entry Id", strategy.long)
//if (xmicroup)
    //strategy.exit("My Short Exit Id", "My Short Entry Id")
//if (xmicrodown)
    //strategy.exit("My Long Exit Id", "My Long Entry Id")

  



```

> Detail

https://www.fmz.com/strategy/434583

> Last Modified

2023-12-07 16:48:45
