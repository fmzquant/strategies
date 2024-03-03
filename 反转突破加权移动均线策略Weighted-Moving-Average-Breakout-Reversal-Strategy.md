
> Name

反转突破加权移动均线策略Weighted-Moving-Average-Breakout-Reversal-Strategy

> Author

ChaoZhang

> Strategy Description

![IMG](https://www.fmz.com/upload/asset/215f2facebfa8b5fdfb.png)
[trans]

### 概述

该策略的主要思想是利用价格反转回测试加权移动均线附近的重要支持或阻力区域来建立头寸。当价格暴涨或暴跌后回调测试均线时,很可能形成支撑或压力,从而产生反转机会。

### 策略原理

该策略基于加权移动均线指标,首先计算一定长度的加权移动均线,然后监测价格是否出现一定幅度的突破。当价格突破均线达到一定距离时,绘制箭头指示并开仓建立头寸。进入多头时,价格要首先出现一定幅度的突破下跌;进入空头时,价格要首先出现一定幅度的突破上涨。这样通过突破形成反转信号,再结合移动均线的支持阻力区域,可以优化进入市场的时机。

策略通过trail参数选择是否使用追踪止损,还是使用固定止损距离。可以通过调整止损幅度来控制风险。通过限价单参数来锁定部分利润。还可以通过时间过滤来限制特定时段开仓。

### 优势分析

该策略最大的优势在于利用反转行情与均线结合,找准市场关键点进行开仓。反转策略的胜率和盈亏比通常较好,风险容易控制。同时,该策略还提供了完善的止损机制,以及部分利润的锁定方法,这些都可以帮助降低风险,提高稳定性。

由于建立在移动均线基础之上,因此参数优化空间较大,可以通过调整均线长度、突破幅度等参数来测试不同市场的适应性。

### 风险分析

该策略最大的风险在于反转失败。当价格形成反转信号后,如果不能成功触发止损或止盈,而继续原有方向运行,则会形成较大的浮亏。 

此外,对参数优化依赖较高,如果参数设置不当,容易错过价格反转时机或产生假信号。需要充分理解和测试市场行为,仔细评估参数设置。

### 优化方向

可以考虑加入更多指标来提高信号质量和准确率。例如在价格出现反转信号之前,可以检测一定时期内的增量,特别是短周期增量数据,判断价格波动特征。或者加入一定量化因子,检测价格的动量、波动率等特征值,构建多因子模型。

还可以尝试机器学习方法,通过记录历史交易信号和价格数据,训练模型判断价格下一步的可能走势。这可以帮助过滤假信号,提高信号质量。

此外,可以引入一定的自适应优化机制。根据实际交易结果,动态调整参数或规则权重,实现策略的自我优化和ENO。

### 总结

该策略整体运作稳定,在合理的参数空间和市场环境下,可以获得不错的收益。最大的优势是风险可控,同时具备一定的优化潜力。下一步工作将专注于信号质量的提升,并增加自适应优化能力。相信在持续优化后,该策略可以成为投资组合中的有力选择。

||

## Weighted Moving Average Breakout Reversal Strategy  

### Overview

The main idea of this strategy is to take positions by reversals that test important support/resistance levels around Weighted Moving Average. When prices spike up/down then pullback to test the moving average, it is likely to form support/resistance levels and generate reversal opportunities.

### Strategy Logic  

This strategy is based on the Weighted Moving Average indicator. It firstly calculates the WMA of a certain length, then monitors if the price breaks out of the WMA by some range. When the breakout distance reaches a threshold, it plots an arrow and opens positions. To go long, the price needs to break down first by some range; To go short, the price needs to break up first by some range. By forming reversal signals through breakouts and combining with WMA’s support/resistance levels, it helps to optimize the market entry timing.

The strategy provides options between trailing stop loss and fixed stop loss through the trail parameter, so risks can be controlled by adjusting stop loss range. It also locks in partial profits with limit orders. Moreover, time filters can restrict specific time periods for opening positions.

### Advantage Analysis

The biggest advantage lies in combining reversal setups with moving averages to capture key market turning points for opening positions. Reversal strategies often have good win rate and risk reward ratio, with risks being easy to control. This strategy also equipped with comprehensive stop loss mechanisms and partial profit taking methods, which further helps to reduce risks and improve stability.

As it builds on moving averages, ample room is available for parameter optimization by adjusting values like WMA length, breakout range etc to test adaptiveness across different markets.  

### Risk Analysis  

The biggest risk is failed reversals. If the price fails to trigger stop loss or take profit after forming reversal signals, and keeps running in the original direction, it would incur considerably floating losses.

Also, it relies heavily on parameter optimization. Inappropriate parameter settings may easily miss price reversal timing or generate false signals. Proper understanding of market behavior and prudent evaluation of parameter choices are required through sufficient backtests.

### Optimization Directions

More indicators could be introduced to improve signal quality and accuracy. For instance, before price reversals, incremental values in certain recent periods could be checked, especially short-term increment data, to characterize price fluctuation patterns. Or certain quantitative factors could be added to detect price momentum, volatility etc for multifactor modeling.

Machine learning methods could also be tested to forecast near-term price movement based on historical trade signals and pricing data, which helps to filter out false signals and improve signal quality.
	
In addition, some adaptive optimization mechanisms could be implemented. According to actual trade results, parameters or rule weights could be dynamically adjusted to realize self-optimization and ENO of the strategy.  

### Summary

The overall operation of this strategy is stable. Within reasonable parameter space and market environments, it can achieve considerable returns. The biggest advantage lies in the controllable risks and optimization potential. Next step efforts will be focused on improving signal quality and incorporating adaptive optimization capabilities. It is believed that on persistent enhancements, this strategy can become a compelling choice in investment portfolios.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|20|Length|
|v_input_2_close|0|Source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_3|0.003|When price drops (In Ticks) Enter Long|
|v_input_4|0.003|When price climbs (In Ticks) Enter Short|
|v_input_5|true|Trailing Stop(checked), Market stop(unchecked)|
|v_input_6|10|Stop (in ticks)|
|v_input_7|5|Limit Out|
|v_input_8|true|Limit Time of Day (Buying Side)|
|v_input_9|1600-0500|Start/Stop trades (Est time)|


> Source (PineScript)

``` pinescript
/*backtest
start: 2023-11-20 00:00:00
end: 2023-11-22 08:00:00
period: 1h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="WMA Breakout",overlay=true, initial_capital=25000, default_qty_value=1, commission_type=strategy.commission.cash_per_contract, commission_value=3.02)
len = input(20, minval=1, title="Length")
src = input(close, title="Source")
out = wma(src, len)
price_drop = input(.003, "When price drops (In Ticks) Enter Long", step=.001)
price_climb = input(.003, "When price climbs (In Ticks) Enter Short", step=.001)
trail = input(true, "Trailing Stop(checked), Market stop(unchecked)")
stop = input(10, "Stop (in ticks)", step=1)
limit = input(5, "Limit Out", step=1)
//size = input(1, "Limit Position Size (pyramiding)", minval=1)
timec = input(true, "Limit Time of Day (Buying Side)")


//Time Session
sess = input("1600-0500", "Start/Stop trades (Est time)")
t = time(timeframe.period, sess)
//plots
plot(wma(src,len))
z = if low+price_drop<out
    (out-low)
plotarrow(z, colorup=red)

a = if high-price_climb>out
    (high-out)
plotarrow(a, colorup=lime)
av=wma(src,len)

//Orders
if(timec)
    strategy.entry("Enterlong", long=true, when=z and t>1)
else
    strategy.entry("Enterlong", long=true, when=z)
if(trail)
    strategy.exit("Exit","Enterlong", profit=limit, trail_points = 0, trail_offset = stop )
else
    strategy.exit("Exit","Enterlong", profit=limit, loss = stop )
    
if(timec)
    strategy.entry("Entershort", long=false, when=a and t>1)
else
    strategy.entry("Entershort", long=false, when=a)
if(trail)
    strategy.exit("Exit","Entershort", profit=limit, trail_points = 0, trail_offset = stop )
else
    strategy.exit("Exit","Entershort", profit=limit, loss = stop )
  


```

> Detail

https://www.fmz.com/strategy/433548

> Last Modified

2023-11-28 14:11:33
