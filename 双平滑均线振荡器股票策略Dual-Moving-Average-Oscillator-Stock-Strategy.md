
> Name

双平滑均线振荡器股票策略Dual-Moving-Average-Oscillator-Stock-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/d394aa96c57518e417.png)
[trans]
### 概述

本策略运用双平滑均线振荡器指标来判断股票的买入和卖出点。双平滑均线振荡器指数由长短两个不同参数的双指数移动平均线构成,通过计算价格变动的动量来测量超买超卖现象。

### 策略原理

本策略的核心指标是双平滑均线振荡器指数(TSI)。该指数的计算方法是:

1. 计算价格的变动pc=close-preclose

2. 对pc进行双指数平滑处理,分别取长周期12日和短周期9日指数平均。得到双平滑price change:double_smoothed_pc

3. 同样对绝对值|pc|进行双指数平滑处理,得到double_smoothed_abs_pc

4. 最终TSI指数=100*(double_smoothed_pc/double_smoothed_abs_pc)

通过计算TSI值与其信号线tsi_signal的关系,判断所处的超买超卖区域,以此决定买入和卖出。

买入信号:TSI值上穿其信号线,表明股价反转,步入超卖区域,可以买入。

卖出信号:TSI值下穿其信号线,表明股价反转,超卖区域结束,应当卖出。

### 优势分析

本策略最大的优势在于使用双平滑均线指标识别股价中的周期性特征。双平滑均线指标中同时使用长短两个周期,可以更加灵敏和准确地捕捉价格变化趋势,在判断买卖点时相比单一均线具有更强的优势。

另外,本策略选用TSI指数而不是其他常见的技术指标,原因在于TSI指数更加注重计算价格变动的动量信息。这可以更加准确地判断超买超卖现象,从而取得更佳的买卖节点选择。

### 风险分析

本策略最大的风险在于双平滑均线本身对价格变化的灵敏度较高,当股价出现震荡时,容易产生错误信号。此外,TSI指数判断超买超卖区域的标准依然比较主观,参数设置不当也会影响判断的准确性。

为控制这些风险,建议适当优化参数,调整长短均线的长度;同时结合其他指标来验证信号,避免在震荡行情中打开仓位。此外,优化止损策略,对突发事件设置风控措施也非常必要。

### 优化方向 

本策略的优化方向主要集中在两个方面:

1. 参数优化。可以通过更多的回测来测试长短均线和信号线参数的最优组合,提高指标的灵敏度。

2. 配置过滤指标。例如结合布林带、KDJ等其他指标来验证买卖信号,避免错误开仓。或者设立交易量过滤,只在交易量放大的情况下开仓。

3. 增加止损策略。设立移动止损、时间止损来控制单笔损失。同时,也可以根据大盘情况来暂停交易,控制系统性风险。

4. 优化仓位管理。设立动态调整的仓位规模和比例,能够根据市场情况来控制每笔交易的风险敞口。

### 总结

本策略利用双平滑均线振荡器指数的计算方法,同时融合长短两个周期分析价格动量变化,从而判断超买超卖区域,决定买入卖出的时机。相比单一均线,具有判断更为准确灵敏的优点。当然,仍需适当优化参数,并辅以其他指标来过滤信号,从而提高策略的稳定性和盈利能力。总的来说,本策略提供了一种有效判断买卖点的技术手段,值得实盘验证与优化。

||

### Overview

This strategy uses the Dual Moving Average Oscillator index to determine the buy and sell points of stocks. The Dual Moving Average Oscillator index consists of two exponential moving averages with different parameters, and measures the momentum of price changes to detect overbought and oversold conditions.

### Strategy Principle  

The core indicator of this strategy is the True Strength Index (TSI). The calculation method is:

1. Calculate the price change pc=close-preclose

2. Smooth pc twice using both long period of 12 days and short period of 9 days exponential moving average. Obtain double smoothed price change: double_smoothed_pc

3. Similarly, double smooth the absolute value |pc| to get double_smoothed_abs_pc

4. Finally TSI index = 100*(double_smoothed_pc/double_smoothed_abs_pc)

By comparing the TSI value with its signal line tsi_signal, we can determine overbought or oversold zones, thereby deciding buy and sell points.  

Buy signal: TSI crosses over its signal upward, indicating reversal of the stock price, marking the start of overbought zone where we should long.

Sell signal: TSI crosses below its signal downward, indicating reversal of the stock price, marking the end of overbought zone where we should sell out.

### Advantage Analysis   

The biggest advantage of this strategy lies in using the dual moving average indicator to identify cyclical features in stock prices. By simultaneously employing both long and short periods in the dual moving average, it can capture price change trends more sensitively and accurately than a single moving average, and is more effective in determining trading signals.

In addition, this strategy chooses the TSI index rather than other common technical indicators, because TSI pays more attention to calculating price change momentum, which can judge overbought/oversold conditions more precisely, resulting in better trading points. 

### Risk Analysis

The biggest risk of this strategy is that the dual moving average itself is quite sensitive to price changes. In case of price fluctuation, it can easily generate false signals. Moreover, the criteria for TSI to judge overbought/oversold zones are still subjective, and improper parameter settings also impact the accuracy.

To control such risks, it is advisable to optimize parameters appropriately by adjusting lengths of the double moving averages. Combining other indicators to verify signals is also necessary to avoid opening positions amid volatility. Furthermore, optimizing stop-loss strategies and setting up risk control measures against emergencies are quite essential.

### Optimization Directions   

The optimization directions of this strategy mainly focus on two aspects:

1. Parameter optimization. The optimal combination of parameters like lengths of long and short moving average and signal line can be backtested to improve the sensitivity.  

2. Configure filtering indicators. Such as combining Bollinger Bands, KDJ and so on to verify buy/sell signals and prevent wrong opening of positions. Trading volume filter can also be applied to open positions only when volume surges.

3. Add stop-loss strategy. Set up moving stop loss, timed exit to limit the loss of single position. Also we can suspend trading temporarily based on market condition to control systematic risk.

4. Optimize position sizing. Set up dynamic size and proportion of positions based on market condition to manage the risk exposure of every trade.

### Summary  

This strategy utilizes the calculation method of Dual Moving Average Oscillator index, integrating both long and short term analysis of price momentum changes, thereby determining overbought and oversold zones to decide entries and exits. Compared to a single moving average, it has the advantage of more accurate and sensitive judgement. Of course, proper parameter optimization is still necessary, coupled with other indicators for signal filtering, so as to enhance the stability and profitability. Overall, this strategy provides an effective technical tool to determine trading points, which is worth live testing and optimizing.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|10000|Initial Capital|
|v_input_2|true|Risk Percentage|
|v_input_3|12|Long Length|
|v_input_4|9|Short Length|
|v_input_5|12|Signal Length|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-29 00:00:00
end: 2024-02-04 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

// This Pine Script™ code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © shankardey7310

//@version=5
strategy("TSI STOCKS", shorttitle="TSI", overlay=true)

initialCapital = input(10000, title="Initial Capital")
riskPercent = input(1, title="Risk Percentage") / 100

longLength = input(12, title="Long Length")
shortLength = input(9, title="Short Length")
signalLength = input(12, title="Signal Length")

price = close
pc = ta.change(price)

double_smooth(src, long, short) =>
    first_smooth = ta.ema(src, long)
    ta.ema(first_smooth, short)

double_smoothed_pc = double_smooth(pc, longLength, shortLength)
double_smoothed_abs_pc = double_smooth(math.abs(pc), longLength, shortLength)
tsi_value = 100 * (double_smoothed_pc / double_smoothed_abs_pc)
tsi_signal = ta.ema(tsi_value, signalLength)

riskAmount = (initialCapital * riskPercent) / close

if (tsi_value > tsi_signal and tsi_value[1] <= tsi_signal[1])
    strategy.entry("Long", strategy.long)

if (tsi_value < tsi_signal and tsi_value[1] >= tsi_signal[1])
    strategy.close("Long")

plot(tsi_value, title="True Strength Index", color=#2962FF)
plot(tsi_signal, title="Signal", color=#E91E63)
hline(0, title="Zero", color=#787B86)
```

> Detail

https://www.fmz.com/strategy/441052

> Last Modified

2024-02-05 10:47:38
