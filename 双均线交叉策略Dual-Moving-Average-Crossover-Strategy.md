
> Name

双均线交叉策略Dual-Moving-Average-Crossover-Strategy

> Author

ChaoZhang

> Strategy Description


[trans]
本策略的名称为“双均线交叉策略”,它的核心原理是使用两条不同参数的线性回归线,根据其交叉情况来产生买入和卖出信号。

该策略首先计算一短期和一长期两条线性回归线。短期线性回归线参数为100天,长期线性回归线参数为150天。当短期线性回归线从下方向上突破长期线性回归线时,产生买入信号;当短期线性回归线从上方向下跌破长期线性回归线时,产生卖出信号。

线性回归线能够反映价格的长期趋势方向。短期线性回归线参数小,对价格变化更敏感,能捕捉到短期价格反转时机;长期线性回归线参数大,代表价格的长期均衡趋势。当两条均线发生交叉时,代表短期和长期趋势发生转折,因此可以据此产生交易信号。

该策略的优点是利用了均线交叉的经典技术分析策略,加入了线性回归分析,可以同时识别长短期两个时间维度上的价格转折。但线性回归线容易受到异常数据的影响,存在一定的滞后性。此外,均线交叉本身也会产生较多的假信号。

为了过滤一些假信号,该策略加入了时间条件限制,只在指定的日期区间内执行策略交易信号。这可以一定程度上减少无效交易的次数。但时间窗口的设定也存在主观性,需要经过回测优化。

总体来说,双均线交叉策略融合多种分析方法,可以捕捉复合型的交易机会,但需要积极管理风险,防范过度交易。结合其他技术指标继续优化该策略,可以进一步提升稳定性。


||

This strategy is named "Dual Moving Average Crossover Strategy". Its core principle is using two linear regression lines with different parameters and generating trading signals based on their crossover situations.

The strategy first calculates a short-term and a long-term linear regression line. The short-term linear regression has a period of 100 days, and the long-term one has a period of 150 days. When the short-term regression line crosses above the long-term line, a buy signal is generated. When the short-term line crosses below the long-term line, a sell signal is generated.

Linear regression lines can reflect the long-term trend direction of prices. The short-term line with a smaller period is more sensitive to price changes and can capture short-term reversal timings. The long-term line with a larger period represents the long-term equilibrium trend of prices. When the two lines cross, it indicates the short-term and long-term trends are reversing, thus trading signals can be generated.

The advantage of this strategy is utilizing the classical technical analysis approach of moving average crossover, with the addition of linear regression analysis, which can identify price reversals across both long-term and short-term time dimensions. However, linear regression lines are susceptible to outlier data and exhibit some lag. Also, moving average crossovers themselves tend to generate many false signals. 

To filter out some false signals, this strategy incorporates time condition limits, executing trades only during specified date ranges. This can reduce ineffective trades to some extent. But the time window settings are subjective and require backtesting optimization.

In conclusion, the dual moving average crossover strategy combines multiple analytical techniques and can capture complex trading opportunities. But risk management is crucial to prevent overtrading. Further optimizing the strategy by incorporating other technical indicators can improve robustness.

[/trans]

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_1|100|Length|
|v_input_2|150|Length|
|v_input_3|2018|yearfrom|
|v_input_4|2019|yearuntil|
|v_input_5|true|monthfrom|
|v_input_6|12|monthuntil|
|v_input_7|true|dayfrom|
|v_input_8|31|dayuntil|


> Source (PineScript)

``` pinescript
/*backtest
start: 2022-09-12 00:00:00
end: 2023-09-12 00:00:00
period: 2d
basePeriod: 1d
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/

//@version=3
strategy(title="Linear Regression Curve CrossOver Strategy", shorttitle="LRC Crossover", overlay=true)
src = close
len1 = input(defval=100, minval=1, title="Length")
offset = 0
outfast = linreg(src, len1, offset)
plot(outfast,color=blue)

len2 = input(defval=150, minval=1, title="Length")

outslow = linreg(src, len2, offset)
plot(outslow,color=red)



yearfrom = input(2018)
yearuntil =input(2019)
monthfrom =input(1)
monthuntil =input(12)
dayfrom=input(1)
dayuntil=input(31)



if (  crossover(outfast,outslow)) 
    strategy.entry("BUY", strategy.long, stop=close, oca_name="TREND",  comment="BUY")
    
else
    strategy.cancel(id="BUY")


if ( crossover(outslow,outfast)  ) 

    strategy.entry("SELL", strategy.short,stop=close, oca_name="TREND", comment="SELL")
else
    strategy.cancel(id="SELL")
    
```

> Detail

https://www.fmz.com/strategy/426583

> Last Modified

2023-09-13 14:56:37
