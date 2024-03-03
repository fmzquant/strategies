
> Name

自适应三重超级趋势策略Adaptive-Triple-Supertrend-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/173bb9ea90d80c37f90.png)
[trans]
## 概述

自适应三重超级趋势策略是一种追踪市场趋势的交易方法,它汇聚了三个超级趋势指标的力量来识别潜在的市场趋势并从中获利。这种策略注重适应性和精确性,其目标是为交易者提供清晰的入场和退出信号,同时有效地管理风险。通过结合多个超级趋势指标及其定义的参数,该策略寻求在各种市场条件下捕捉趋势,使其成为一个通用的工具,适用于寻求在传统和加密货币市场中获利机会的交易者。

## 策略原理

自适应三重超级趋势策略所依据的主要思想是结合多个超级趋势指标来识别市场趋势,在趋势一致时入场做多,在趋势反转时退出仓位。

具体来说,该策略使用了三个超级趋势指标,分别是:

1. 超级趋势1:ATR周期=12,因子=3
2. 超级趋势2:ATR周期=10,因子=1
3. 超级趋势3:ATR周期=11,因子=2

当这三个超级趋势指标同时显示多头信号(绿色)时,策略会在特定的日期范围内(2023年1月1日至2023年10月1日)开仓做多;当任意一个超级趋势指标显示空头信号(红色)时,策略会平仓退出做多头仓位。此外,策略还设置了10%的止盈和1%的止损来锁定盈利和管理风险。

所以,该策略的具体交易逻辑是:

1. 当三个超级趋势指标同时显示多头信号时,在日期范围内开仓做多
2. 在持有做多头仓位时,监控超级趋势指标的反转信号
3. 如果任一超级趋势指标转为空头,触发平仓信号,退出做多仓位
4. 止盈达到10%或止损达到1%时,以止盈或止损退出仓位

通过这样的交易逻辑,策略旨在在特定日期范围内捕捉多头趋势带来的利润,同时通过止损来控制下行风险。

## 优势分析

自适应三重超级趋势策略具有以下几个主要优势:

1. 结合多个超级趋势指标,能更准确判断市场趋势,减少假信号
2. 超级趋势本身就具有滤波噪音的功能,可减少震荡对交易的影响
3. 通过参数设置,可以自适应不同的市场环境
4. 同时设置止盈和止损,可以在趋势反转时及时止损,避免DLayer多余的风险
5. 可以在牛市中获得超额收益,也可以在熊市中避开大幅度下跌

总的来说,这种策略非常适合作为核心趋势跟踪策略,辅助手动交易。它可以提供高质量的交易信号,在大趋势中获利的同时控制风险,是量化交易的一个重要工具。

## 风险分析

尽管自适应三重超级趋势策略有许多优势,但也存在一定的风险需要注意,主要有:

1. 市场出现特大震荡时,可能导致超级趋势指标产生错误信号
2. 策略参数设置不当也会影响策略表现
3. 止损设置过小可能无法有效控制风险
4. 多头入场时机不当也可能导致亏损

对于这些风险,可以通过以下方法加以缓解:

1. 结合其他指标判断市场震荡和趋势性
2. 优化参数设置,使之适应不同市场环境
3. 适当放大止损幅度,确保止损生效
4. 利用更稳定的指标确定具体的入场时机

## 优化方向 

作为一种通用的趋势跟踪策略,自适应三重超级趋势策略还有许多优化的空间,主要方向有:

1. 动态优化超级趋势指标的参数,使之更好地自适应市场
2. 增加其他辅助指标判断入场时机
3. 根据回测结果进一步优化止盈止损的设置
4. 尝试以突破为入场信号,以超级趋势判断趋势方向
5. 将策略封装成函数,便于在其他策略中调用

通过这些优化,可以使策略在更多市场环境下保持稳定的表现,获得更高的盈利因子。这也是未来的一个研究方向。

## 总结

自适应三重超级趋势策略是一个非常有价值的量化策略。它结合多个超级趋势指标判断市场趋势,设置止盈止损控制风险,旨在稳定跟踪市场大趋势获得超额收益。尽管存在一些潜在风险,但通过参数优化和辅助指标可以很好地减轻这些风险。该策略可以作为核心策略单独使用,也可以和其他策略组合使用。它的优化空间也很大,有望获得更好的表现。所以,这是一个值得持续研究和应用的高质量策略。

||

## Overview  

The Adaptive Triple Supertrend Strategy is a trend-following trading approach that harnesses the power of three Supertrend indicators to identify potential market trends and capitalize on them. With a focus on adaptability and precision, this strategy aims to provide traders with clear entry and exit signals while managing risk effectively. By combining multiple Supertrend indicators with defined parameters, the strategy seeks to capture trends across various market conditions, making it a versatile tool for traders seeking profitable opportunities in both traditional and cryptocurrency markets.

## Strategy Logic  

The core idea behind the Adaptive Triple Supertrend Strategy is to combine multiple Supertrend indicators to identify market trends, go long when the trends agree, and exit positions when trends reverse.   

Specifically, the strategy utilizes three Supertrend indicators:  

1. Supertrend 1: ATR Period = 12, Factor = 3
2. Supertrend 2: ATR Period = 10, Factor = 1  
3. Supertrend 3: ATR Period = 11, Factor = 2

When all three Supertrend indicators simultaneously show a bullish (green) signal, the strategy will open a long position within a defined date range (Jan 1, 2023 to Oct 1, 2023). When any one of the Supertrend indicators shows a bearish (red) signal, the strategy will exit the long position. In addition, the strategy sets a 10% take profit and 1% stop loss to lock in profits and manage risk.

So the specific trade logic is:  

1. Open long when all three Supertrends show bullish signals within the date range   
2. Monitor Supertrends for reversal signals while in a long position
3. Exit long if any Supertrend turns bearish  
4. Take profit at 10% or stop loss at 1%  

This logic aims to capture profits from bull trends within the date range while controlling downside risk with the stop loss.  

## Advantage Analysis   

The Adaptive Triple Supertrend Strategy has several key advantages:

1. Combining multiple Supertrends gives more accurate trend judgement and reduces false signals  
2. Supertrend itself filters noise, reducing oscillation impacts   
3. Parameters can be tuned to adapt to different market environments  
4. Take profit and stop loss settings lock in profits and cut losses when trends reverse  
5. Can capture outsized gains in bull markets and avoid huge drawdowns in bear markets

In summary, this strategy works excellently as a core trend following strategy to assist manual trading. By providing high quality trade signals to profit from major trends while controlling risk, it is an important tool for quantitative trading.  

## Risk Analysis  

Despite its many strengths, the Adaptive Triple Supertrend Strategy has some key risks to note:  

1. Huge market swings can cause wrong signals  
2. Poor parameter tuning impacts performance   
3. Small stop loss may fail to control risk  
4. Bad long entry timing can lead to losses  

These risks can be mitigated by:

1. Adding other indicators to judge oscillations   
2. Optimizing parameters for different markets
3. Increasing stop loss percentage to ensure effectiveness  
4. Using more stable indicators for entry signals  

## Enhancement Opportunities

As a versatile trend following strategy, the Adaptive Triple Supertrend has much room for enhancement:  

1. Dynamic optimization of Supertrend parameters   
2. Adding other indicators to improve entry timing   
3. Further optimizing take profit and stop loss based on backtests
4. Trying breakout for entry with Supertrend for trend direction  
5. Packaging strategy as function for easy plug-and-play
  
With these optimizations, the strategy can maintain steady performance across more market environments and achieve higher profit factors. This presents exciting research directions going forwards.  

## Conclusion  

The Adaptive Triple Supertrend Strategy is a valuable quantitative strategy. By combining multiple Supertrend indicators to determine trends and setting take profit/stop loss to control risk, it aims to steadily track major trends for outsized gains. Despite some risks, these can be alleviated via parameter optimization and auxiliary indicators. The strategy can be used standalone or combined with others. It also has significant enhancement potential for even better performance. As such, this is a quality strategy worth continual research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_float_1|3|Factor 1|
|v_input_1|12|ATR Length 1|
|v_input_float_2|true|Factor 2|
|v_input_2|10|ATR Length 2|
|v_input_float_3|2|Factor 3|
|v_input_3|11|ATR Length 3|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-01-25 00:00:00
end: 2024-01-25 00:00:00
period: 1d
basePeriod: 1h
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Custom Supertrend Strategy", overlay=true, default_qty_type=strategy.percent_of_equity, default_qty_value=15, shorttitle="Supertrend Strategy")

// Define the parameters for Supertrend 1
factor1 = input.float(3.0, "Factor 1", step = 0.01)
atrPeriod1 = input(12, "ATR Length 1")

// Define the parameters for Supertrend 2
factor2 = input.float(1.0, "Factor 2", step = 0.01)
atrPeriod2 = input(10, "ATR Length 2")

// Define the parameters for Supertrend 3
factor3 = input.float(2.0, "Factor 3", step = 0.01)
atrPeriod3 = input(11, "ATR Length 3")

[_, direction1] = ta.supertrend(factor1, atrPeriod1)
[_, direction2] = ta.supertrend(factor2, atrPeriod2)
[_, direction3] = ta.supertrend(factor3, atrPeriod3)

// Define the start and end dates as Unix timestamps (in seconds)
start_date = timestamp("2023-01-01T00:00:00")
end_date = timestamp("2023-10-01T00:00:00")

// Determine Buy and Sell conditions within the specified date range
in_date_range = true
buy_condition = direction1 > 0 and direction2 > 0 and direction3 > 0 and in_date_range
sell_condition = direction1 < 0 or direction2 < 0 or direction3 < 0

// Track the position with a variable
var isLong = false

if buy_condition and not isLong
    strategy.entry("Long Entry", strategy.long)
    isLong := true

if sell_condition and isLong
    // Define take profit and stop loss percentages
    take_profit_percentage = 10 // Increased to 10%
    stop_loss_percentage = 1

    // Calculate take profit and stop loss levels
    take_profit_level = close * (1 + take_profit_percentage / 100)
    stop_loss_level = close * (1 - stop_loss_percentage / 100)

    // Exit the long position with take profit and stop loss
    strategy.exit("Take Profit/Stop Loss", from_entry="Long Entry", limit=take_profit_level, stop=stop_loss_level)
    isLong := false
```

> Detail

https://www.fmz.com/strategy/440109

> Last Modified

2024-01-26 16:33:37
