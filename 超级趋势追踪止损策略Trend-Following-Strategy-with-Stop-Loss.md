
> Name

超级趋势追踪止损策略Trend-Following-Strategy-with-Stop-Loss

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/14c9ca940d556058988.png)
[trans]

### 概述

本策略通过计算超级趋势指标判断价格趋势,并在趋势变化时建立做多或做空头寸。同时设置止损位和止盈位来控制风险。

### 策略原理

本策略使用ta.supertrend()函数计算超级趋势指标。超级趋势指标结合平均真实波幅和平均价格,可以判断价格是否处于上升趋势或下降趋势。当价格从下降趋势转为上升趋势时,通过ta.change()判断方向变化,建立做多头寸。当价格从上升趋势转为下降趋势时,建立做空头寸。

设置止损位stop_loss和止盈位profit,在建仓后设置止损单和止盈单,控制风险。

具体来说,策略通过以下步骤实现:

1. 计算超级趋势指标方向 
2. 判断价格是否从下降趋势转为上升趋势,如果是,建立做多单
3. 判断价格是否从上升趋势转为下降趋势,如果是,建立做空单  
4. 建仓后,为做多单设置止损价格和止盈价格
5. 建仓后,为做空单设置止损价格和止盈价格

以上步骤可以有效捕捉价格趋势的变化,在合适时机建立仓位,并设置止损止盈来控制风险,是一种较为稳定的趋势跟踪策略。

### 策略优势分析

本策略最大的优势在于可以自动跟踪价格趋势的变化,无需人工判断。超级趋势指标对价格波动具有一定的滤波效果,可以有效识别价格趋势,避免在震荡行情中频繁开仓。

同时,策略设置了止损位和止盈位,可以自动止损止盈,有效控制单笔损失,锁定盈利。这对于量化交易而言非常重要。

相比于简单的移动平均线策略,本策略判断价格趋势的效果更佳,也更适合跟踪趋势性行情。

### 风险分析

本策略最大的风险在于超级趋势指标的参数设置。如果参数设置不当,则会导致策略运算效果不佳,识别趋势变化的效果差。如果ATR周期参数设置过大或因子参数设置过小,都会导致超级趋势指标对价格波动响应迟钝,错过最佳开仓时机。

此外,止盈位和止损位的设置也会对策略收益产生很大影响。如果止损距离过小,容易被突破;如果止盈距离过大,可能错过理想退出点。这些参数的最优设置需要根据不同市场行情和交易品种进行优化。

最后,与所有趋势跟踪策略一样,当价格突然反转或进入震荡区间时,也会给本策略带来损失。这需要通过严格的资金管理来控制。

### 优化方向

本策略可以从以下几个方面进行优化:

1. 优化超级趋势指标的参数,包括ATR周期和因子参数。可以通过遍历回测获得最优参数组合。

2. 增加仓位管理机制。可以根据收益率、回撤指标动态调整仓位。

3. 增加机器学习模型判断趋势。可以训练模型辅助判断价格趋势,提高开仓准确性。

4. 结合其他指标过滤交易信号。比如结合均线、波动率指标等避免错误开仓。

5. 动态优化止盈止损距离。可以根据市场波动程度、仓位大小等调整止盈止损参数。

以上几个方向都可以进一步提高策略收益率和稳定性。

### 总结

本策略总体来说是一个非常实用的趋势跟踪策略。它可以自动跟踪价格趋势变化,合理设置止损止盈来控制风险。与简单的移动平均线策略相比,判断价格趋势的效果更佳,更适合趋势性行情。通过一定程度的参数优化与机器学习模型辅助,本策略可以进一步增强稳定性与收益表现。值得进一步研究与应用。

||

### Overview

This strategy identifies price trends by calculating the Supertrend indicator and establishes long or short positions when trends change. It also sets stop loss and take profit levels to control risks.

### Strategy Principles  

This strategy uses the ta.supertrend() function to compute the Supertrend indicator. The Supertrend combines average true range and average price to determine if prices are in an uptrend or a downtrend. When prices change from a downtrend to an uptrend, the strategy detects the change in direction using ta.change() and establishes a long position. When prices flip from an uptrend to a downtrend, a short position is taken.

The stop loss level stop_loss and take profit level profit are set to place stop loss orders and take profit orders after entering positions to control risks.

Specifically, the strategy is implemented through the following steps:

1. Calculate the direction of the Supertrend indicator  
2. Check if prices have changed from a downtrend to an uptrend and establish a long position if yes
3. Check if prices have switched from an uptrend to a downtrend and take a short position if yes
4. Set stop loss price and take profit price for the long position after it is established
5. Set stop loss price and take profit price for the short position after it is established

The above steps can effectively capture trend changes and take positions at appropriate moments. The stop loss and take profit settings help control risks. Overall it is a relatively stable trend following strategy.

### Advantage Analysis 

The biggest advantage of this strategy is the ability to automatically track trend changes without the need for manual judgement. The Supertrend indicator has a filtering effect on price fluctuations and can effectively identify trends, avoiding excessive position taking in ranging markets.

In addition, the predefined stop loss and take profit levels allow automatic stop loss and profit taking, effectively capping single trade losses and locking gains. This is very important for quantitative trading strategies.

Compared to simple moving average strategies, this strategy has superior capabilities in trend identification and is more suitable for trending markets.

### Risk Analysis

The biggest risk of this strategy comes from improper parameter tuning of the Supertrend indicator. If the parameters are not set appropriately, the effectiveness of the indicator in detecting trend changes will suffer. An ATR period that is too long or a factor that is too small can both retard the reaction of the Supertrend to price moves, causing missed entry opportunities.

Also, the stop loss and take profit levels significantly impact strategy performance. A stop loss that is too tight would easily get stopped out prematurely. A take profit that is too wide may miss ideal exit points. Extensive optimization is needed to find the optimal parameter values for different market conditions and trading instruments.

Finally, like all trend following strategies, sudden trend reversals and whipsaws can still cause losses that need to be controlled through proper money management.

### Enhancement Opportunities

The following aspects of the strategy can be enhanced:

1. Optimize the parameters of the Supertrend indicator, including the ATR period and factor through backtesting.  

2. Incorporate position sizing rules based on performance metrics like return and drawdowns.  

3. Augment with machine learning models to assist in trend identification.

4. Add filters based on other indicators like moving averages and volatility measures to avoid false signals.

5. Dynamically optimize stop loss and take profit levels based on market volatility and position sizes.

The above enhancements can improve profitability, stability and risk management of the strategy. 

### Conclusion

Overall, this is a very practical trend following strategy. It automatically tracks trend changes and uses stop loss and take profit to control risks. Compared to simple moving average strategies, it has superior trend identification capability and is more suitable for trending markets. With some parameter optimization and machine learning augmentation, this strategy can achieve even better stability and profits. It deserves further research and application.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|300|Stop Loss Amount|
|v_input_2|800|Profit Amount|
|v_input_3|10|ATR Length|
|v_input_float_1|3|Factor|


> Source (PineScript)

``` pinescript
/*backtest
start: 2024-01-04 00:00:00
end: 2024-01-11 00:00:00
period: 5m
basePeriod: 1m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=5
strategy("Supertrend Strategy", overlay=true, default_qty_type=strategy.percent_of_equity)

// Stop loss and profit amount
stop_loss = input(300, title="Stop Loss Amount")
profit = input (800, title="Profit Amount")

atrPeriod = input(10, "ATR Length")
factor = input.float(3.0, "Factor", step = 0.01)

[_, direction] = ta.supertrend(factor, atrPeriod)

long_condition = ta.change(direction) <0
short_condition = ta.change(direction) >0
long_condition_1= (long_condition)?1:0
short_condition_2 = (short_condition)?1:0

stop_price_long = ta.valuewhen(long_condition, low[0]-stop_loss,0)
profit_price_long = ta.valuewhen(long_condition, high[0]+profit,0)
stop_price_short = ta.valuewhen(short_condition, high[0]+stop_loss,0)
profit_price_short = ta.valuewhen(short_condition, low[0]-profit,0)

if (long_condition)
    strategy.entry("Michael3 Long Entry Id", strategy.long)

if (short_condition)
    strategy.entry("Michael3 Short Entry Id", strategy.short)


if (strategy.position_size>0)
    strategy.exit("exit_long",from_entry="Michael3 Long Entry Id",limit=profit_price_long,stop=stop_price_long)

if (strategy.position_size<0)
    strategy.exit("exit_short",from_entry="Michael3 Short Entry Id",limit=profit_price_short,stop=stop_price_short)    
    


//plot(strategy.equity, title="equity", color=color.red, linewidth=2, style=plot.style_areabr)
```

> Detail

https://www.fmz.com/strategy/438506

> Last Modified

2024-01-12 14:55:40
