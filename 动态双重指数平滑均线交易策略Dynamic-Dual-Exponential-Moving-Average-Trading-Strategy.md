
> Name

动态双重指数平滑均线交易策略Dynamic-Dual-Exponential-Moving-Average-Trading-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/c76acb0f5e9b040035.png)
[trans]
### 概述

本策略名为“动态双重指数平滑均线交易策略”,是基于双重指数平滑均线(Double Exponential Moving Average,DEMA)的量化交易策略。该策略通过计算股票的价格变化率,然后对其绝对值和非绝对值分别进行双重指数平滑处理,从而得到真实力度指数(True Strength Index,TSI)。策略根据TSI值及其信号线的金叉死叉来产生买卖信号。

### 策略原理

该策略的核心指标是真实力度指数(TSI)。TSI的计算公式为:

TSI = 100 * (PC1 / PC2)

其中,PC1和PC2分别是价格变化率的双重指数平滑均线和价格变化率绝对值的双重指数平滑均线。双重指数平滑均线的计算过程为,先对价格变化率应用一段时间的指数移动平均线,然后再对得到的指数移动平均线应用另一段更短期的指数移动平均线。这样通过双重平滑,可以更好地消除价格变化率中的随机性,从而提高TSI指标的稳定性。

在计算出TSI值之后,策略还会计算出TSI值的信号线。信号线被定义为TSI值的一定周期的指数移动平均线。在实际交易时,策略通过观察TSI值与信号线的关系来判断市场趋势和产生交易信号。当TSI值上穿信号线时看多,TSI值下穿信号线时看空。

该策略的另一个特点是交易大小是动态调整的。策略代码中设置了一个初始资金和一个风险敞口比例作为输入参数。这两个参数结合股票当时的价格,来动态计算每次的交易数量或风险敞口。这样可以更好地控制整个策略的风险。

### 优势分析

动态双指数移动平均交易策略带来了各种优势。:

1. 它使用了TSI指标，该指标应用了双重指数平滑，使其对市场噪声的敏感度降低，并能产生更准确的信号。

2. 它基于一个经过验证的原则，即交叉指标及其信号线来产生交易信号。这消除了许多假信号。

3. 该策略根据风险预算动态调整仓位大小。这有助于防止过度交易和情绪化操作。

4. 它适用于日常和周时间框架，适合摇摆交易和定位交易。

5. 由于其简单的输入/输出逻辑，很容易在机器人和其他交易系统中实施。

6. 没有太多的参数需要调整，使得优化系统变得简单。

这些优势共同使其成为股票交易者的强大且多功能的交易策略。谨慎的平滑处理和位置尺寸设定有助于防止假信号和大额损失。

### 风险分析

尽管动态双指数移动平均交易策略有许多优点，但它也存在一些固有的风险，就像大多数股票策略一样：

1. 由于TSI和信号线基于历史价格数据，总是存在错误信号的风险，特别是在市场波动性强的情况下。

2. 如果市场在TSI指标的零线周围震荡，则可能出现回调。这可能导致损失。

3. 大幅度跳空……如果趋势持续，则TSI可能过早地反转趋势，从而错过利润。

4. 由于杠杆作用，可能会产生比风险参数设定的限额更大的损失。

然而，通过应用诸如头寸大小、止损以及其他风险管理技术等方面可以缓解这些风险。此外, 参数和过滤器可以进一步优化以最大化不同市场条件下的表现。

### 优化方向

一些可以优化本策略的想法包括:

1. 测试不同的双重平滑参数组合,以寻找能产生更精确交易信号的组合。可以调整长短周期参数以优化。

2. 增加基于波动率、交易量或其它指标的过滤器,以减少不必要的交易信号。这可以降低交易频率的同时提高每笔交易的盈利能力。

3. 增加止损逻辑。如在TSI值穿越零轴时止损。这可以减少不必要的损失。

4. 评估不同的交易品种如指数、商品等在该策略下的表现。选择表现最好的品种集中交易。

5. 对交易品种进行优选过滤。例如评估品种的流动性、波动率指标,选择参数指标排名较高的品种进行交易。

6. 利用机器学习方法 如何进行向前分析 选择最佳参数组合。这可以减少人工选择带来的偏见,获得更优的参数。

7. 根据不同市场环境采用多组参数集,并动态切换。例如牛市时可以使用更积极的参数组合,熊市时则采取更保守的组合。

通过测试和优化以上各个方面,有望进一步提高该策略的稳定性和收益率。

### 总结

总的来说,本策略基于TSI指标的双重指数平滑特性,设计了一套相对稳定和可靠的股票交易策略。通过动态调整仓位规模,可以有效控制整体的风险水平。该策略同时兼具适合短线和中长线交易的优点。

当然,与大多数量化交易策略一样,本策略也存在一定的局限性,主要体现在容易受到市场剧烈波动的影响。此外,参数选择和过滤条件也需要进一步测试和优化,以在复杂多变的市场中获得更强的适应性和盈利能力。

||

### Overview

This strategy is named "Dynamic Dual Exponential Moving Average Trading Strategy". It is a quantitative trading strategy based on the dual exponential moving average (DEMA). The strategy calculates the price change rate of stocks, and then performs dual exponential smoothing on both its absolute value and non-absolute value, so as to obtain the True Strength Index (TSI). The strategy generates buy and sell signals based on the golden/dead cross of the TSI value and its signal line.

### Strategy Principle  

The core indicator of this strategy is the True Strength Index (TSI). The calculation formula of TSI is:  

TSI = 100 * (PC1 / PC2)

Where PC1 and PC2 are the dual exponential moving averages of the price change rate and the absolute value of the price change rate, respectively. The dual exponential moving average is calculated by first applying an exponential moving average with one length to the price change rate, and then applying another shorter exponential moving average to the obtained moving average. This dual smoothing can better eliminate the randomness in the price change rate and improve the stability of the TSI indicator.

After calculating the TSI value, the strategy also calculates a signal line for the TSI value. The signal line is defined as an exponential moving average of the TSI value over a certain period. In actual trading, the strategy judges market trends and generates trading signals by observing the relationship between the TSI value and its signal line. When the TSI value crosses above the signal line, it is a buy signal. When the TSI value crosses below the signal line, it is a sell signal.  

Another feature of this strategy is that the trade size is dynamically adjusted. The strategy code sets an initial capital and a risk exposure ratio as input parameters. These two parameters combine with the current price of the stock to dynamically calculate the number of contracts traded or risk exposure. This can better control the overall risk of the entire strategy.

### Advantage Analysis

The dynamic dual exponential moving average trading strategy comes with several advantages:

1. It utilizes the TSI indicator which applies dual exponential smoothing, making it less sensitive to market noise and able to generate more accurate signals.  

2. It builds upon the proven principle of crossing of an indicator and its signal line to generate trading signals. This eliminates many false signals.

3. The strategy dynamically adjusts position sizing based on the risk budget. This helps prevent overtrading and emotions.  

4. It works on daily and weekly timeframes, suitable for both swing trading and positional trading.

5. It is easy to implement in bots and other trading systems due to the simple entry/exit logic.  

6. There are not too many parameters to tune, making the system easy to optimize.

These advantages combined make it a robust and versatile trading strategy for stock traders. The careful smoothing and position sizing help prevent false signals and large losses.  

### Risk Analysis

While the dynamic dual exponential moving average trading strategy has many advantages, it also has some inherent risks like most stock strategies:

1. Since the TSI and signal line are based on historical price data, there is always the risk of incorrect signals especially during volatile market conditions.

2. Whipsaws may occur if the market oscillates around the zero line of the TSI indicator. This can lead to losses.  

3. Large gap moves may result in the strategy closing at a loss since it was not able to exit in time. 

4. If the market continues in a strong trend, the TSI may prematurely reverse the trend resulting in missed profits.

5. Due to the leverage effect, larger losses than the limit set by the risk parameters are possible.

These risks can however be mitigated by aspects like position sizing, stop losses and other risk management techniques. Also, the parameters and filters can be further optimized to maximize performance across varying market conditions.

### Optimization Directions  

Some ideas to optimize this strategy include:

1. Testing different combinations of dual smoothing parameters to find the combination that generates the most accurate trading signals. The long and short cycle parameters can be adjusted for optimization.

2. Adding filters based on volatility, trading volume or other indicators to reduce unnecessary trading signals. This can reduce trade frequency while increasing the profitability of each trade.

3. Incorporating stop loss logic. For example, stopping out when TSI value crosses the zero line. This can reduce unnecessary losses.  

4. Evaluating performance of different trading instruments like indices, commodities etc. under this strategy. Concentrate trading on instruments with best performance.

5. Selectively filtering trading instruments. For example, assess liquidity, volatility metrics of instruments and select ones with higher ranked parameters.  

6. Using machine learning methods like walk-forward analysis to select optimal parameter combinations. This can reduce human bias in selection and obtain better parameters.

7. Employing multiple parameter sets based on varying market regimes, and dynamically switch between them. For example, more aggressive parameters during bull markets, and conservative parameters during bear markets.

By testing and optimizing various aspects above, there is potential to further improve this strategy's stability and profitability.

### Summary  

In summary, this strategy leverages the dual exponential smoothing properties of the TSI indicator to design a relatively stable and reliable stock trading strategy. By dynamically adjusting position sizes, the overall risk level can be effectively controlled. The strategy combines the advantages of being suitable for both short-term and medium-long term trading.

Of course, like most quantitative trading strategies, this strategy also has some limitations, mainly reflected in being prone to effects of drastic market fluctuations. In addition, parameter selection and filtering criteria need further testing and optimization in order to obtain stronger adaptiveness and profitability in the ever-changing financial markets.

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
start: 2024-01-06 00:00:00
end: 2024-02-05 00:00:00
period: 1h
basePeriod: 15m
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

https://www.fmz.com/strategy/441134

> Last Modified

2024-02-06 09:38:32
